"""
Stillfrost Standard Audit Module
Enforces compliance with the Stillfrost investment philosophy and validates agent outputs.
"""
from typing import Dict, Any, List
from dataclasses import dataclass, field
from datetime import datetime
import re

from ..config import stillfrost_config


@dataclass
class StandardViolation:
    violation_type: str
    keyword: str
    context: str
    severity: str
    timestamp: datetime = field(default_factory=datetime.now)


@dataclass
class StillfrostStandard:
    """
    The Stillfrost Standard - core investment philosophy compliance checker.
    """
    required_keywords: List[str] = field(default_factory=lambda: stillfrost_config.required_keywords)
    forbidden_keywords: List[str] = field(default_factory=lambda: stillfrost_config.forbidden_keywords)
    violations: List[StandardViolation] = field(default_factory=list)
    
    def check_compliance(self, text: str) -> Dict[str, Any]:
        """Check if text complies with Stillfrost Standard."""
        text_lower = text.lower()
        violations = []
        
        for keyword in self.forbidden_keywords:
            if keyword.lower() in text_lower:
                violation = StandardViolation(
                    violation_type="forbidden_keyword",
                    keyword=keyword,
                    context=text[:200],
                    severity="high"
                )
                violations.append(violation)
                self.violations.append(violation)
        
        keyword_presence = []
        for keyword in self.required_keywords:
            if keyword.lower() in text_lower:
                keyword_presence.append(keyword)
        
        coverage = len(keyword_presence) / max(1, len(self.required_keywords))
        
        return {
            "passed": len(violations) == 0,
            "violations": [v.keyword for v in violations],
            "keyword_coverage": coverage,
            "present_keywords": keyword_presence,
            "missing_keywords": [k for k in self.required_keywords if k not in keyword_presence]
        }


def enforce_standard(text: str) -> Dict[str, Any]:
    """
    Enforce the Stillfrost Standard on any text output.
    Returns pass/fail status and any violations found.
    """
    standard = StillfrostStandard()
    result = standard.check_compliance(text)
    
    result["enforcement_timestamp"] = datetime.now().isoformat()
    result["standard_version"] = "1.0"
    
    return result


def validate_friction(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Calculate friction score for agent actions.
    Friction represents resistance to risky or non-compliant actions.
    Higher friction = more scrutiny required.
    """
    score = 1.0
    factors = []
    
    if "amount" in data:
        amount = float(data.get("amount", 0))
        if amount > 1000000:
            score -= 0.2
            factors.append("large_transaction")
        elif amount > 100000:
            score -= 0.1
            factors.append("medium_transaction")
    
    if "risk_level" in data:
        risk = data.get("risk_level", "low")
        if risk == "high":
            score -= 0.25
            factors.append("high_risk")
        elif risk == "medium":
            score -= 0.1
            factors.append("medium_risk")
    
    if "asset_type" in data:
        asset = data.get("asset_type", "")
        volatile_assets = ["crypto", "options", "futures", "derivatives"]
        if asset.lower() in volatile_assets:
            score -= 0.15
            factors.append("volatile_asset")
    
    if "leverage" in data:
        leverage = float(data.get("leverage", 1.0))
        if leverage > 2.0:
            score -= 0.2
            factors.append("high_leverage")
        elif leverage > 1.0:
            score -= 0.1
            factors.append("leveraged")
    
    if "diversification" in data:
        div = float(data.get("diversification", 0.5))
        if div < 0.3:
            score -= 0.15
            factors.append("concentration_risk")
    
    score = max(0.0, min(1.0, score))
    
    return {
        "score": round(score, 3),
        "factors": factors,
        "threshold": stillfrost_config.friction_threshold,
        "passed": score >= stillfrost_config.friction_threshold,
        "timestamp": datetime.now().isoformat()
    }


def calculate_compliance_score(actions: List[Dict[str, Any]]) -> float:
    """Calculate overall compliance score for a series of actions."""
    if not actions:
        return 1.0
    
    scores = []
    for action in actions:
        text = str(action)
        result = enforce_standard(text)
        friction = validate_friction(action)
        
        action_score = (1.0 if result["passed"] else 0.5) * friction["score"]
        scores.append(action_score)
    
    return sum(scores) / len(scores)
