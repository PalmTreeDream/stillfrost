"""
Stillfrost FastAPI Backend
Main application entry point with WebSocket telemetry and agent endpoints.
Includes Command & Control layer for Principal management.
"""
import os
import asyncio
from contextlib import asynccontextmanager
from datetime import datetime
from typing import Dict, Any, Optional, List
import uuid

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .agents import OversightGovernor, IntelligenceAgent, LogicAgent, SystemsAgent, ReachAgent
from .workflows import InvestmentWorkflow
from .telemetry import telemetry_manager, broadcast_event
from .feedback import FeedbackLoop
from .control import pending_store, directives_manager, notification_service, ActionStatus
from .config import stillfrost_config
from .twitter import twitter_service


oversight: Optional[OversightGovernor] = None
intelligence: Optional[IntelligenceAgent] = None
logic: Optional[LogicAgent] = None
systems: Optional[SystemsAgent] = None
reach: Optional[ReachAgent] = None
workflow: Optional[InvestmentWorkflow] = None
feedback: Optional[FeedbackLoop] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize agents on startup."""
    global oversight, intelligence, logic, systems, reach, workflow, feedback
    
    print("Initializing Stillfrost agents...")
    oversight = OversightGovernor()
    intelligence = IntelligenceAgent()
    logic = LogicAgent()
    systems = SystemsAgent()
    reach = ReachAgent()
    workflow = InvestmentWorkflow()
    feedback = FeedbackLoop()
    
    await broadcast_event("system", {
        "type": "startup",
        "message": "Stillfrost agents initialized",
        "agents": ["Governor", "Scout", "Gatekeeper", "Forge", "Signal"]
    })
    
    asyncio.create_task(demo_telemetry_loop())
    
    yield
    
    await broadcast_event("system", {
        "type": "shutdown",
        "message": "Stillfrost shutting down"
    })


app = FastAPI(
    title="Stillfrost Backend",
    description="Autonomous Holdings - Algorithmic Capital",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class WorkflowRequest(BaseModel):
    task_type: str
    parameters: Dict[str, Any] = {}


class ResearchRequest(BaseModel):
    topic: str
    parameters: Dict[str, Any] = {}


class PortfolioRequest(BaseModel):
    holdings: list = []
    constraints: Dict[str, Any] = {}


class DirectiveRequest(BaseModel):
    content: str
    priority: str = "high"


class ActionReviewRequest(BaseModel):
    notes: str = ""


@app.get("/")
async def root():
    """Root endpoint with system info."""
    return {
        "name": stillfrost_config.firm_name,
        "tagline": stillfrost_config.tagline,
        "status": "operational",
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/status")
async def get_status():
    """Get overall system status."""
    return {
        "firm": stillfrost_config.firm_name,
        "status": "operational",
        "agents": {
            "oversight": oversight.get_status() if oversight else None,
            "intelligence": intelligence.get_status() if intelligence else None,
            "logic": logic.get_status() if logic else None,
            "systems": systems.get_status() if systems else None,
            "reach": reach.get_status() if reach else None
        },
        "telemetry": telemetry_manager.get_stats(),
        "feedback": feedback.get_system_health() if feedback else None,
        "pending_actions": len(pending_store.get_pending_actions()),
        "active_directives": len(directives_manager.get_active_directives()),
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/agents")
async def list_agents():
    """List all agents and their current status."""
    return {
        "agents": [
            {"name": "Governor", "codename": "Governor", "role": "principal", "status": "operational"},
            {"name": "Scout", "codename": "Scout", "role": "worker", "status": "operational", "description": "Opportunity finder"},
            {"name": "Gatekeeper", "codename": "Gatekeeper", "role": "worker", "status": "operational", "description": "Logic and validation"},
            {"name": "Forge", "codename": "Forge", "role": "worker", "status": "operational", "description": "The builder"},
            {"name": "Signal", "codename": "Signal", "role": "worker", "status": "operational", "description": "The voice"}
        ],
        "hierarchy": {
            "principal": "Governor",
            "workers": ["Scout", "Gatekeeper", "Forge", "Signal"]
        }
    }


@app.get("/api/control/pending")
async def get_pending_actions():
    """Get all actions pending Principal approval."""
    pending = pending_store.get_pending_actions()
    return {
        "pending_actions": [a.to_dict() for a in pending],
        "count": len(pending)
    }


@app.get("/api/control/actions")
async def get_all_actions():
    """Get all actions with their status."""
    all_actions = pending_store.get_all_actions()
    return {
        "actions": [a.to_dict() for a in all_actions],
        "count": len(all_actions)
    }


@app.post("/api/control/actions/{action_id}/approve")
async def approve_action(action_id: str, request: ActionReviewRequest):
    """Approve a pending action."""
    action = pending_store.approve_action(action_id, request.notes)
    
    if not action:
        raise HTTPException(status_code=404, detail="Action not found")
    
    await broadcast_event("oversight", {
        "type": "action_approved_by_principal",
        "action_id": action_id,
        "message": f"Principal approved action {action_id}"
    })
    
    if reach and action.agent in ["Reach", "Signal"]:
        await reach.execute_approved_action(action_id)
    
    return {"status": "approved", "action": action.to_dict()}


@app.post("/api/control/actions/{action_id}/reject")
async def reject_action(action_id: str, request: ActionReviewRequest):
    """Reject a pending action."""
    action = pending_store.reject_action(action_id, request.notes)
    
    if not action:
        raise HTTPException(status_code=404, detail="Action not found")
    
    await broadcast_event("oversight", {
        "type": "action_rejected_by_principal",
        "action_id": action_id,
        "message": f"Principal rejected action {action_id}: {request.notes}"
    })
    
    return {"status": "rejected", "action": action.to_dict()}


@app.get("/api/control/directives")
async def get_directives():
    """Get all active Principal directives."""
    directives = directives_manager.get_active_directives()
    return {
        "directives": [d.to_dict() for d in directives],
        "count": len(directives)
    }


@app.post("/api/control/directives")
async def add_directive(request: DirectiveRequest):
    """Add a new Principal directive to Oversight memory."""
    directive = directives_manager.add_directive(request.content, request.priority)
    
    await broadcast_event("oversight", {
        "type": "directive_received",
        "directive_id": directive.id,
        "message": f"Principal directive injected: {request.content[:50]}..."
    })
    
    return {
        "status": "added",
        "directive": directive.to_dict()
    }


@app.delete("/api/control/directives/{directive_id}")
async def deactivate_directive(directive_id: str):
    """Deactivate a Principal directive."""
    success = directives_manager.deactivate_directive(directive_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Directive not found")
    
    await broadcast_event("oversight", {
        "type": "directive_deactivated",
        "directive_id": directive_id
    })
    
    return {"status": "deactivated", "directive_id": directive_id}


@app.post("/api/control/test-notification")
async def test_notification():
    """Test the notification webhook."""
    await notification_service.notify_secret_identified(
        "TEST-001",
        "This is a test notification from Stillfrost Command & Control."
    )
    
    return {
        "status": "sent",
        "discord_configured": bool(notification_service.discord_webhook_url),
        "telegram_configured": bool(notification_service.telegram_bot_token)
    }


class TwitterPostRequest(BaseModel):
    approval_id: str
    content: Dict[str, Any] = {}


@app.get("/api/twitter/status")
async def twitter_status():
    """Get Twitter service configuration status."""
    return twitter_service.get_status()


@app.post("/api/twitter/post")
async def post_twitter_thread(request: TwitterPostRequest):
    """Post a Twitter thread (called after Vault authorization)."""
    content = request.content
    product_name = content.get("product_name", "Stillfrost Product")
    thread_content = content.get("thread", "")
    
    if not thread_content:
        raise HTTPException(status_code=400, detail="No thread content provided")
    
    await broadcast_event("signal", {
        "type": "twitter_posting",
        "approval_id": request.approval_id,
        "product": product_name
    })
    
    result = await twitter_service.post_thread(thread_content, product_name)
    
    await broadcast_event("signal", {
        "type": "twitter_posted" if result["success"] else "twitter_failed",
        "product": product_name,
        "tweets_posted": result.get("tweets_posted", 0),
        "error": result.get("error")
    })
    
    return result


@app.post("/api/workflow/execute")
async def execute_workflow(request: WorkflowRequest):
    """Execute a full investment workflow."""
    if not workflow:
        raise HTTPException(status_code=503, detail="Workflow not initialized")
    
    task_id = str(uuid.uuid4())[:8]
    
    await broadcast_event("api", {
        "type": "workflow_request",
        "task_id": task_id,
        "task_type": request.task_type
    })
    
    result = await workflow.execute(
        task_id=task_id,
        task_type=request.task_type,
        parameters=request.parameters
    )
    
    return result


@app.post("/api/research")
async def conduct_research(request: ResearchRequest):
    """Trigger research via Intelligence Agent."""
    if not intelligence:
        raise HTTPException(status_code=503, detail="Intelligence agent not initialized")
    
    result = await intelligence.conduct_research(request.topic, request.parameters)
    
    if oversight:
        report = await oversight.review_action("Intelligence", "research", result)
        result["oversight_approved"] = report.approved
        result["friction_score"] = report.friction_score
    
    return result


@app.post("/api/optimize")
async def optimize_portfolio(request: PortfolioRequest):
    """Optimize portfolio via Logic Agent."""
    if not logic:
        raise HTTPException(status_code=503, detail="Logic agent not initialized")
    
    result = await logic.optimize_portfolio(request.holdings, request.constraints)
    
    if oversight:
        report = await oversight.review_action("Logic", "optimization", result)
        result["oversight_approved"] = report.approved
        result["friction_score"] = report.friction_score
    
    return result


@app.get("/api/health")
async def system_health():
    """Get system health check from Systems Agent."""
    if not systems:
        raise HTTPException(status_code=503, detail="Systems agent not initialized")
    
    return await systems.health_check()


@app.get("/api/feedback/health")
async def feedback_health():
    """Get feedback loop health status."""
    if not feedback:
        raise HTTPException(status_code=503, detail="Feedback loop not initialized")
    
    return feedback.get_system_health()


@app.websocket("/ws/telemetry")
async def websocket_telemetry(websocket: WebSocket):
    """WebSocket endpoint for real-time telemetry streaming."""
    await telemetry_manager.connect(websocket)
    
    await websocket.send_text('{"type": "connected", "message": "Stillfrost telemetry stream active"}')
    
    try:
        while True:
            data = await websocket.receive_text()
            
            if data == "ping":
                await websocket.send_text('{"type": "pong"}')
            elif data == "status":
                status = await get_status()
                await websocket.send_text(f'{{"type": "status", "data": {status}}}')
    except WebSocketDisconnect:
        telemetry_manager.disconnect(websocket)


async def demo_telemetry_loop():
    """Start demo telemetry events for dashboard visualization."""
    await asyncio.sleep(5)
    
    demo_events = [
        ("oversight", {"type": "thought", "message": "Initiating governance review cycle...", "phase": "review_start"}),
        ("intelligence", {"type": "thought", "message": "Scanning emerging tech sectors for opportunities...", "phase": "scanning"}),
        ("logic", {"type": "tool_call", "tool": "portfolio_optimizer", "args": {"sharpe_target": 1.8}}),
        ("systems", {"type": "thought", "message": "Running infrastructure health check...", "phase": "monitoring"}),
        ("oversight", {"type": "review_cycle", "status": "active", "active_directives": len(directives_manager.get_active_directives())}),
        ("intelligence", {"type": "scanning", "sectors": ["tech", "healthcare", "fintech"]}),
        ("logic", {"type": "optimization", "sharpe_target": 1.8, "status": "optimizing"}),
        ("systems", {"type": "health_check", "all_nominal": True}),
        ("reach", {"type": "report_scheduled", "next": "daily", "pending_count": len(pending_store.get_pending_actions())})
    ]
    
    idx = 0
    while True:
        source, data = demo_events[idx % len(demo_events)]
        data["pending_actions"] = len(pending_store.get_pending_actions())
        await broadcast_event(source, data)
        idx += 1
        await asyncio.sleep(4)


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PYTHON_BACKEND_PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)
