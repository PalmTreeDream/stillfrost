"""
Oversight Governor Agent (Governor)
The hierarchical governor that supervises all worker agents and enforces the Stillfrost Standard.
Codename: Governor - The overseer.
Includes Principal directive injection for high-priority constraints.
"""
from typing import Dict, Any, List
from dataclasses import dataclass, field
from datetime import datetime
import json
from openai import AsyncOpenAI

from ..config import llm_config, stillfrost_config
from ..audit.standard import enforce_standard, validate_friction
from ..telemetry import broadcast_event
from ..control import directives_manager


@dataclass
class AgentReport:
    agent_name: str
    action: str
    result: Any
    timestamp: datetime = field(default_factory=datetime.now)
    approved: bool = False
    friction_score: float = 0.0
    notes: str = ""


class OversightGovernor:
    """
    Principal-level oversight agent that governs all worker agents.
    Enforces the Stillfrost Standard and manages hierarchical decision-making.
    
    Supports Principal directive injection for real-time control.
    """
    
    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=llm_config.api_key,
            base_url=llm_config.base_url
        )
        
        self.role = "Governor"
        self.codename = "Governor"
        self.goal = "Ensure all outputs align with Stillfrost's standards and are Principal-approved"
        self.base_backstory = """You are Governor, the principal oversight agent at Stillfrost.
        You supervise all worker agents (Scout, Gatekeeper, Forge, Signal) and ensure every
        output meets the Stillfrost Standard. You review all products, content, and communications
        before they go to The Vault for Principal authorization."""
        
        self.pending_reviews: List[AgentReport] = []
        self.approved_actions: List[AgentReport] = []
        self.rejected_actions: List[AgentReport] = []
    
    def get_backstory_with_directives(self) -> str:
        """Get backstory enhanced with active Principal directives."""
        directives_prompt = directives_manager.get_directive_prompt()
        if directives_prompt:
            return f"{self.base_backstory}\n\n{directives_prompt}"
        return self.base_backstory
    
    async def review_action(self, agent_name: str, action: str, data: Dict[str, Any]) -> AgentReport:
        """
        Review an action from a worker agent before execution.
        Enforces the Stillfrost Standard and calculates friction score.
        Now includes Principal directive awareness.
        """
        await broadcast_event("oversight", {
            "type": "thought",
            "message": f"Initiating review of {agent_name} action: {action}",
            "phase": "review_start"
        })
        
        active_directives = directives_manager.get_active_directives()
        if active_directives:
            await broadcast_event("oversight", {
                "type": "thought",
                "message": f"Applying {len(active_directives)} Principal directive(s) to review",
                "phase": "directive_check"
            })
        
        await broadcast_event("oversight", {
            "type": "review_started",
            "agent": agent_name,
            "action": action,
            "active_directives": len(active_directives)
        })
        
        report = AgentReport(
            agent_name=agent_name,
            action=action,
            result=data
        )
        
        action_text = json.dumps(data, default=str)
        
        await broadcast_event("oversight", {
            "type": "tool_call",
            "tool": "enforce_standard",
            "args": {"action_length": len(action_text)}
        })
        
        standard_check = enforce_standard(action_text)
        
        await broadcast_event("oversight", {
            "type": "tool_call",
            "tool": "validate_friction",
            "args": {"data_keys": list(data.keys()) if isinstance(data, dict) else []}
        })
        
        friction_result = validate_friction(data)
        
        report.friction_score = friction_result["score"]
        
        directive_violation = await self._check_directive_compliance(action_text, active_directives)
        
        if directive_violation:
            report.approved = False
            report.notes = f"Principal directive violation: {directive_violation}"
            self.rejected_actions.append(report)
            
            await broadcast_event("oversight", {
                "type": "action_rejected",
                "agent": agent_name,
                "action": action,
                "reason": report.notes,
                "friction_score": report.friction_score
            })
        elif not standard_check["passed"]:
            report.approved = False
            report.notes = f"Stillfrost Standard violation: {standard_check['violations']}"
            self.rejected_actions.append(report)
            
            await broadcast_event("oversight", {
                "type": "action_rejected",
                "agent": agent_name,
                "action": action,
                "reason": report.notes,
                "friction_score": report.friction_score
            })
        elif report.friction_score < stillfrost_config.friction_threshold:
            report.approved = False
            report.notes = f"Friction score {report.friction_score:.2f} below threshold {stillfrost_config.friction_threshold}"
            self.rejected_actions.append(report)
            
            await broadcast_event("oversight", {
                "type": "action_rejected",
                "agent": agent_name,
                "action": action,
                "reason": report.notes,
                "friction_score": report.friction_score
            })
        else:
            report.approved = True
            report.notes = "Action approved by Governor"
            self.approved_actions.append(report)
            
            await broadcast_event("oversight", {
                "type": "thought",
                "message": f"Action approved with friction score {report.friction_score:.2f}",
                "phase": "approval"
            })
            
            await broadcast_event("oversight", {
                "type": "action_approved",
                "agent": agent_name,
                "action": action,
                "friction_score": report.friction_score
            })
        
        return report
    
    async def _check_directive_compliance(self, action_text: str, directives: List) -> str:
        """Check if action complies with active Principal directives."""
        if not directives:
            return ""
        
        for directive in directives:
            if "avoid" in directive.content.lower() or "do not" in directive.content.lower():
                keywords = directive.content.lower().replace("avoid", "").replace("do not", "").strip().split()
                for keyword in keywords:
                    if len(keyword) > 3 and keyword in action_text.lower():
                        return f"Contains '{keyword}' which conflicts with directive: {directive.content}"
        
        return ""
    
    async def delegate_task(self, task_type: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """
        Delegate a task to the appropriate worker agent.
        """
        await broadcast_event("oversight", {
            "type": "thought",
            "message": f"Analyzing task delegation for: {task_type}",
            "phase": "delegation"
        })
        
        await broadcast_event("oversight", {
            "type": "task_delegated",
            "task_type": task_type,
            "parameters": parameters
        })
        
        delegation_map = {
            "research": "Scout",
            "analysis": "Gatekeeper", 
            "infrastructure": "Forge",
            "communication": "Signal"
        }
        
        target_agent = delegation_map.get(task_type, "Scout")
        
        await broadcast_event("oversight", {
            "type": "thought",
            "message": f"Delegating to {target_agent} agent",
            "phase": "delegation_complete"
        })
        
        return {
            "delegated_to": target_agent,
            "task_type": task_type,
            "parameters": parameters,
            "status": "delegated"
        }
    
    def get_status(self) -> Dict[str, Any]:
        """Get current oversight status and metrics."""
        active_directives = directives_manager.get_active_directives()
        return {
            "pending_reviews": len(self.pending_reviews),
            "approved_count": len(self.approved_actions),
            "rejected_count": len(self.rejected_actions),
            "approval_rate": len(self.approved_actions) / max(1, len(self.approved_actions) + len(self.rejected_actions)),
            "active_directives": len(active_directives),
            "last_review": self.approved_actions[-1].timestamp.isoformat() if self.approved_actions else None
        }
