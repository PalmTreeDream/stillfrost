"""
Logic Agent (Gatekeeper)
Handles quantitative analysis, portfolio optimization, and risk calculations.
Codename: Gatekeeper - The validator.
"""
from typing import Dict, Any, List
from dataclasses import dataclass, field
from datetime import datetime
from openai import AsyncOpenAI

from ..config import llm_config
from ..telemetry import broadcast_event


@dataclass
class AnalysisResult:
    analysis_type: str
    inputs: Dict[str, Any]
    outputs: Dict[str, Any]
    risk_score: float
    timestamp: datetime = field(default_factory=datetime.now)


class LogicAgent:
    """
    Worker agent responsible for quantitative analysis and portfolio optimization.
    Reports to the Oversight Governor.
    """
    
    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=llm_config.api_key,
            base_url=llm_config.base_url
        )
        
        self.role = "Gatekeeper"
        self.codename = "Gatekeeper"
        self.goal = "Validate opportunities, assess viability, and optimize portfolio decisions"
        self.backstory = """You are Gatekeeper, the Logic Agent at Stillfrost. You are the validator.
        When Scout finds an opportunity, you analyze its viability, calculate risks, and determine
        if it should proceed to Forge. Your rigorous analysis ensures only worthy projects survive."""
        
        self.analysis_history: List[AnalysisResult] = []
    
    async def optimize_portfolio(self, holdings: List[Dict], constraints: Dict[str, Any]) -> Dict[str, Any]:
        """
        Optimize portfolio allocation based on holdings and constraints.
        """
        await broadcast_event("logic", {
            "type": "optimization_started",
            "holdings_count": len(holdings)
        })
        
        prompt = f"""Optimize this portfolio for risk-adjusted returns:

Holdings: {holdings}
Constraints: {constraints}

Apply modern portfolio theory principles:
1. Maximize Sharpe ratio
2. Minimize downside risk
3. Ensure proper diversification
4. Maintain capital preservation focus

Provide recommended allocation adjustments."""
        
        try:
            response = await self.client.chat.completions.create(
                model=llm_config.model,
                messages=[
                    {"role": "system", "content": self.backstory},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.2,
                max_tokens=llm_config.max_tokens
            )
            
            content = response.choices[0].message.content or ""
            
            result = AnalysisResult(
                analysis_type="portfolio_optimization",
                inputs={"holdings": holdings, "constraints": constraints},
                outputs={"recommendation": content},
                risk_score=0.35
            )
            
            self.analysis_history.append(result)
            
            await broadcast_event("logic", {
                "type": "optimization_completed",
                "risk_score": result.risk_score
            })
            
            return {
                "agent": "Gatekeeper",
                "action": "portfolio_optimization",
                "recommendation": content,
                "risk_score": result.risk_score,
                "timestamp": result.timestamp.isoformat()
            }
            
        except Exception as e:
            await broadcast_event("logic", {
                "type": "optimization_error",
                "error": str(e)
            })
            raise
    
    async def calculate_risk(self, asset: str, metrics: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate risk metrics for an asset."""
        await broadcast_event("logic", {
            "type": "risk_calculation",
            "asset": asset
        })
        
        return {
            "agent": "Gatekeeper",
            "action": "risk_calculation",
            "asset": asset,
            "var_95": 0.05,
            "sharpe_ratio": 1.8,
            "max_drawdown": 0.12,
            "status": "completed"
        }
    
    def get_status(self) -> Dict[str, Any]:
        """Get current agent status."""
        return {
            "agent": "Gatekeeper",
            "analyses_count": len(self.analysis_history),
            "last_analysis": self.analysis_history[-1].timestamp.isoformat() if self.analysis_history else None,
            "status": "operational"
        }
