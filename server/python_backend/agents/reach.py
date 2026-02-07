"""
Reach Agent (Signal)
Handles external communications, Twitter marketing, and product launches.
Codename: Signal - The voice of Stillfrost.
All outreach actions require Principal approval (Human-in-the-Loop Gate).
"""
from typing import Dict, Any, List
from dataclasses import dataclass, field
from datetime import datetime
from openai import AsyncOpenAI

from ..config import llm_config, stillfrost_config
from ..telemetry import broadcast_event
from ..control import pending_store, notification_service, ActionStatus


@dataclass
class Communication:
    comm_type: str
    recipient: str
    content: str
    timestamp: datetime = field(default_factory=datetime.now)
    status: str = "pending_approval"
    action_id: str = ""


class ReachAgent:
    """
    Worker agent responsible for external communications and stakeholder management.
    Reports to the Oversight Governor.
    
    IMPORTANT: All outreach actions are held for Principal approval.
    """
    
    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=llm_config.api_key,
            base_url=llm_config.base_url
        )
        
        self.role = "Signal"
        self.codename = "Signal"
        self.goal = "Craft and deploy marketing content, Twitter threads, and product launches"
        self.backstory = """You are Signal, the Reach Agent at Stillfrost. You are the voice.
        When Forge creates something, you announce it to the world. You craft compelling
        Twitter threads, launch products, and build audience with precision storytelling."""
        
        self.communications: List[Communication] = []
    
    async def generate_report(self, report_type: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate a stakeholder report and hold for Principal approval.
        """
        await broadcast_event("reach", {
            "type": "thought",
            "message": f"Initiating {report_type} report generation...",
            "phase": "planning"
        })
        
        await broadcast_event("reach", {
            "type": "tool_call",
            "tool": "llm_completion",
            "args": {"report_type": report_type}
        })
        
        prompt = f"""Generate a professional investment report for {stillfrost_config.firm_name}.

Report Type: {report_type}
Data: {data}

The report should reflect institutional professionalism and include:
1. Executive summary
2. Key metrics and performance
3. Risk assessment
4. Forward outlook

Maintain a tone of cold elegance and algorithmic precision."""
        
        try:
            await broadcast_event("reach", {
                "type": "thought",
                "message": "Querying language model for report content...",
                "phase": "execution"
            })
            
            response = await self.client.chat.completions.create(
                model=llm_config.model,
                messages=[
                    {"role": "system", "content": self.backstory},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.6,
                max_tokens=llm_config.max_tokens
            )
            
            content = response.choices[0].message.content or ""
            
            await broadcast_event("reach", {
                "type": "thought",
                "message": "Report generated. Creating pending action for Principal approval.",
                "phase": "finalization"
            })
            
            pending_action = pending_store.create_action(
                agent="Signal",
                action_type="report_distribution",
                content={
                    "report_type": report_type,
                    "draft": content,
                    "recipient": "stakeholders",
                    "data_summary": str(data)[:200]
                },
                priority="high" if report_type == "quarterly" else "normal"
            )
            
            comm = Communication(
                comm_type=report_type,
                recipient="stakeholders",
                content=content,
                status="pending_approval",
                action_id=pending_action.id
            )
            self.communications.append(comm)
            
            await notification_service.notify_action_pending(
                pending_action.id, "Reach", "report_distribution"
            )
            
            await broadcast_event("reach", {
                "type": "action_pending",
                "action_id": pending_action.id,
                "message": f"Report held for Principal approval: {pending_action.id}"
            })
            
            return {
                "agent": "Signal",
                "action": "report_generation",
                "report_type": report_type,
                "status": "PENDING_APPROVAL",
                "action_id": pending_action.id,
                "draft_preview": content[:300] + "...",
                "timestamp": comm.timestamp.isoformat()
            }
            
        except Exception as e:
            await broadcast_event("reach", {
                "type": "error",
                "error": str(e)
            })
            raise
    
    async def send_update(self, recipient: str, message: str) -> Dict[str, Any]:
        """Create a stakeholder update and hold for Principal approval."""
        await broadcast_event("reach", {
            "type": "thought",
            "message": f"Preparing update for {recipient}...",
            "phase": "planning"
        })
        
        pending_action = pending_store.create_action(
            agent="Signal",
            action_type="stakeholder_update",
            content={
                "recipient": recipient,
                "message": message
            },
            priority="normal"
        )
        
        comm = Communication(
            comm_type="update",
            recipient=recipient,
            content=message,
            status="pending_approval",
            action_id=pending_action.id
        )
        self.communications.append(comm)
        
        await notification_service.notify_action_pending(
            pending_action.id, "Reach", "stakeholder_update"
        )
        
        await broadcast_event("reach", {
            "type": "action_pending",
            "action_id": pending_action.id,
            "message": f"Update held for Principal approval: {pending_action.id}"
        })
        
        return {
            "agent": "Signal",
            "action": "send_update",
            "recipient": recipient,
            "status": "PENDING_APPROVAL",
            "action_id": pending_action.id
        }
    
    async def execute_approved_action(self, action_id: str) -> Dict[str, Any]:
        """Execute an action that has been approved by the Principal."""
        action = pending_store.get_action(action_id)
        
        if not action:
            return {"error": "Action not found"}
        
        if action.status != ActionStatus.APPROVED:
            return {"error": f"Action status is {action.status.value}, not approved"}
        
        await broadcast_event("reach", {
            "type": "action_executed",
            "action_id": action_id,
            "message": f"Executing approved action: {action.action_type}"
        })
        
        for comm in self.communications:
            if comm.action_id == action_id:
                comm.status = "delivered"
        
        return {
            "agent": "Signal",
            "action": "execute_approved",
            "action_id": action_id,
            "status": "delivered"
        }
    
    async def generate_twitter_thread(self, product_name: str, product_description: str, 
                                       key_features: List[str]) -> Dict[str, Any]:
        """
        Generate a Twitter thread for product launch.
        Thread is held for Principal approval before posting.
        """
        await broadcast_event("reach", {
            "type": "thought",
            "message": f"Crafting Twitter thread for {product_name}...",
            "phase": "planning"
        })
        
        prompt = f"""Create a compelling Twitter thread (5-7 tweets) to announce:

Product: {product_name}
Description: {product_description}
Key Features: {', '.join(key_features)}

The thread should:
1. Hook readers with an intriguing opening
2. Explain the problem being solved
3. Highlight key features (one per tweet)
4. Include a clear call-to-action
5. Use a confident, slightly mysterious tone

Format each tweet on its own line, numbered 1/, 2/, etc.
Keep each under 280 characters. No hashtags."""
        
        try:
            await broadcast_event("reach", {
                "type": "tool_call",
                "tool": "llm_completion",
                "args": {"action": "twitter_thread_generation"}
            })
            
            response = await self.client.chat.completions.create(
                model=llm_config.model,
                messages=[
                    {"role": "system", "content": self.backstory},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=llm_config.max_tokens
            )
            
            thread_content = response.choices[0].message.content or ""
            
            await broadcast_event("reach", {
                "type": "thought",
                "message": "Thread generated. Creating pending action for Principal approval.",
                "phase": "finalization"
            })
            
            pending_action = pending_store.create_action(
                agent="Signal",
                action_type="twitter_thread",
                content={
                    "product_name": product_name,
                    "thread": thread_content,
                    "tweet_count": len([t for t in thread_content.split('\n') if t.strip()])
                },
                priority="high"
            )
            
            comm = Communication(
                comm_type="twitter_thread",
                recipient="twitter",
                content=thread_content,
                status="pending_approval",
                action_id=pending_action.id
            )
            self.communications.append(comm)
            
            await notification_service.notify_action_pending(
                pending_action.id, "Signal", "twitter_thread"
            )
            
            await broadcast_event("reach", {
                "type": "action_pending",
                "action_id": pending_action.id,
                "message": f"Twitter thread held for Principal approval: {pending_action.id}"
            })
            
            return {
                "agent": "Signal",
                "action": "twitter_thread",
                "product": product_name,
                "status": "PENDING_APPROVAL",
                "action_id": pending_action.id,
                "thread_preview": thread_content[:500] + "..."
            }
            
        except Exception as e:
            await broadcast_event("reach", {
                "type": "error",
                "error": str(e)
            })
            raise
    
    def get_status(self) -> Dict[str, Any]:
        """Get current agent status."""
        pending_count = len([c for c in self.communications if c.status == "pending_approval"])
        return {
            "agent": "Signal",
            "communications_count": len(self.communications),
            "pending_approval": pending_count,
            "last_communication": self.communications[-1].timestamp.isoformat() if self.communications else None,
            "status": "operational"
        }
