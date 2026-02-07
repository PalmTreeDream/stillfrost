"""
Self-Correcting Feedback Loop
Implements post-mortem analysis and continuous improvement for agent actions.
"""
from typing import Dict, Any, List, Optional
from dataclasses import dataclass, field
from datetime import datetime
import json
import os


@dataclass
class PostMortem:
    action_id: str
    agent: str
    action_type: str
    outcome: str
    success: bool
    lessons: List[str]
    corrections: List[str]
    timestamp: datetime = field(default_factory=datetime.now)


class FeedbackLoop:
    """
    Self-correcting feedback loop that learns from agent actions.
    Stores post-mortems and provides improvement recommendations.
    """
    
    def __init__(self, storage_path: str = "/tmp/stillfrost_feedback.json"):
        self.storage_path = storage_path
        self.post_mortems: List[PostMortem] = []
        self.correction_rules: Dict[str, List[str]] = {}
        self._load_history()
    
    def _load_history(self):
        """Load historical post-mortems from storage."""
        try:
            if os.path.exists(self.storage_path):
                with open(self.storage_path, 'r') as f:
                    data = json.load(f)
                    for pm in data.get("post_mortems", []):
                        self.post_mortems.append(PostMortem(
                            action_id=pm["action_id"],
                            agent=pm["agent"],
                            action_type=pm["action_type"],
                            outcome=pm["outcome"],
                            success=pm["success"],
                            lessons=pm["lessons"],
                            corrections=pm["corrections"],
                            timestamp=datetime.fromisoformat(pm["timestamp"])
                        ))
                    self.correction_rules = data.get("correction_rules", {})
        except Exception:
            pass
    
    def _save_history(self):
        """Save post-mortems to storage."""
        try:
            data = {
                "post_mortems": [
                    {
                        "action_id": pm.action_id,
                        "agent": pm.agent,
                        "action_type": pm.action_type,
                        "outcome": pm.outcome,
                        "success": pm.success,
                        "lessons": pm.lessons,
                        "corrections": pm.corrections,
                        "timestamp": pm.timestamp.isoformat()
                    }
                    for pm in self.post_mortems[-100:]
                ],
                "correction_rules": self.correction_rules
            }
            with open(self.storage_path, 'w') as f:
                json.dump(data, f)
        except Exception:
            pass
    
    async def record_outcome(
        self,
        action_id: str,
        agent: str,
        action_type: str,
        outcome: str,
        success: bool,
        context: Optional[Dict[str, Any]] = None
    ) -> PostMortem:
        """
        Record the outcome of an agent action for post-mortem analysis.
        """
        lessons = []
        corrections = []
        
        if not success:
            lessons.append(f"Action {action_type} by {agent} failed with outcome: {outcome}")
            
            similar_failures = [
                pm for pm in self.post_mortems
                if pm.agent == agent and pm.action_type == action_type and not pm.success
            ]
            
            if len(similar_failures) >= 2:
                corrections.append(f"Pattern detected: {agent} has repeated failures on {action_type}")
                corrections.append("Recommend: Increase oversight scrutiny for this action type")
            
            if context:
                if context.get("friction_score", 1.0) < 0.7:
                    corrections.append("Low friction score correlated with failure - tighten thresholds")
        else:
            lessons.append(f"Successful {action_type} execution by {agent}")
        
        post_mortem = PostMortem(
            action_id=action_id,
            agent=agent,
            action_type=action_type,
            outcome=outcome,
            success=success,
            lessons=lessons,
            corrections=corrections
        )
        
        self.post_mortems.append(post_mortem)
        self._save_history()
        
        return post_mortem
    
    def get_recommendations(self, agent: str, action_type: str) -> List[str]:
        """
        Get recommendations based on historical post-mortems.
        """
        recommendations = []
        
        relevant = [
            pm for pm in self.post_mortems
            if pm.agent == agent or pm.action_type == action_type
        ]
        
        if not relevant:
            return ["No historical data - proceed with standard protocols"]
        
        success_rate = sum(1 for pm in relevant if pm.success) / len(relevant)
        
        if success_rate < 0.7:
            recommendations.append(f"Warning: Historical success rate is {success_rate:.0%}")
        
        recent_failures = [
            pm for pm in relevant[-10:]
            if not pm.success
        ]
        
        for pm in recent_failures:
            recommendations.extend(pm.corrections)
        
        return list(set(recommendations)) or ["No specific recommendations - proceed normally"]
    
    def get_agent_stats(self, agent: str) -> Dict[str, Any]:
        """Get statistics for a specific agent."""
        agent_actions = [pm for pm in self.post_mortems if pm.agent == agent]
        
        if not agent_actions:
            return {
                "agent": agent,
                "total_actions": 0,
                "success_rate": None,
                "status": "no_data"
            }
        
        return {
            "agent": agent,
            "total_actions": len(agent_actions),
            "success_rate": sum(1 for pm in agent_actions if pm.success) / len(agent_actions),
            "recent_failures": sum(1 for pm in agent_actions[-10:] if not pm.success),
            "status": "tracked"
        }
    
    def get_system_health(self) -> Dict[str, Any]:
        """Get overall system health based on feedback data."""
        if not self.post_mortems:
            return {
                "health": "unknown",
                "total_actions": 0,
                "message": "Insufficient data for health assessment"
            }
        
        recent = self.post_mortems[-50:]
        success_rate = sum(1 for pm in recent if pm.success) / len(recent)
        
        if success_rate >= 0.9:
            health = "excellent"
        elif success_rate >= 0.75:
            health = "good"
        elif success_rate >= 0.6:
            health = "fair"
        else:
            health = "needs_attention"
        
        return {
            "health": health,
            "total_actions": len(self.post_mortems),
            "recent_success_rate": success_rate,
            "pending_corrections": len([pm for pm in recent if pm.corrections])
        }
