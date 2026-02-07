"""
Investment Workflow
Coordinates multi-agent investment operations using a simple state machine.
"""
from typing import Dict, Any, List
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum

from ..agents import OversightGovernor, IntelligenceAgent, LogicAgent, SystemsAgent, ReachAgent
from ..audit.standard import enforce_standard, validate_friction
from ..feedback.loop import FeedbackLoop
from ..telemetry import broadcast_event


class WorkflowPhase(Enum):
    INIT = "initialize"
    RESEARCH = "research"
    ANALYZE = "analyze"
    SYSTEM_CHECK = "system_check"
    OVERSIGHT = "oversight_review"
    REPORT = "generate_report"
    FINALIZE = "finalize"
    COMPLETE = "complete"
    REJECTED = "rejected"


@dataclass
class WorkflowState:
    task_id: str
    task_type: str
    parameters: Dict[str, Any]
    phase: WorkflowPhase = WorkflowPhase.INIT
    research: Dict[str, Any] = field(default_factory=dict)
    analysis: Dict[str, Any] = field(default_factory=dict)
    system_status: Dict[str, Any] = field(default_factory=dict)
    report: Dict[str, Any] = field(default_factory=dict)
    oversight_approval: bool = False
    friction_score: float = 0.0
    messages: List[str] = field(default_factory=list)


class InvestmentWorkflow:
    """
    Multi-agent investment workflow coordinator.
    Orchestrates research, analysis, execution, and reporting.
    """
    
    def __init__(self):
        self.oversight = OversightGovernor()
        self.intelligence = IntelligenceAgent()
        self.logic = LogicAgent()
        self.systems = SystemsAgent()
        self.reach = ReachAgent()
        self.feedback = FeedbackLoop()
    
    async def execute(self, task_id: str, task_type: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """Execute the full investment workflow."""
        state = WorkflowState(
            task_id=task_id,
            task_type=task_type,
            parameters=parameters
        )
        
        await broadcast_event("workflow", {
            "type": "workflow_started",
            "task_id": task_id,
            "task_type": task_type
        })
        
        try:
            state = await self._run_research(state)
            state = await self._run_analysis(state)
            state = await self._run_system_check(state)
            state = await self._run_oversight_review(state)
            
            if state.oversight_approval:
                state = await self._run_report_generation(state)
                state.phase = WorkflowPhase.COMPLETE
            else:
                state.phase = WorkflowPhase.REJECTED
            
            await self._finalize(state)
            
        except Exception as e:
            state.messages.append(f"Error: {str(e)}")
            await broadcast_event("workflow", {
                "type": "workflow_error",
                "task_id": task_id,
                "error": str(e)
            })
        
        return {
            "task_id": task_id,
            "status": state.phase.value,
            "oversight_approval": state.oversight_approval,
            "friction_score": state.friction_score,
            "report": state.report,
            "messages": state.messages
        }
    
    async def _run_research(self, state: WorkflowState) -> WorkflowState:
        """Execute research phase with Intelligence Agent."""
        state.phase = WorkflowPhase.RESEARCH
        await broadcast_event("workflow", {"type": "phase_started", "phase": "research"})
        
        state.research = await self.intelligence.conduct_research(
            topic=state.parameters.get("topic", "market analysis"),
            parameters=state.parameters
        )
        state.messages.append("Research phase completed")
        return state
    
    async def _run_analysis(self, state: WorkflowState) -> WorkflowState:
        """Execute analysis phase with Logic Agent."""
        state.phase = WorkflowPhase.ANALYZE
        await broadcast_event("workflow", {"type": "phase_started", "phase": "analysis"})
        
        holdings = state.parameters.get("holdings", [])
        constraints = state.parameters.get("constraints", {})
        
        state.analysis = await self.logic.optimize_portfolio(holdings, constraints)
        state.messages.append("Analysis phase completed")
        return state
    
    async def _run_system_check(self, state: WorkflowState) -> WorkflowState:
        """Execute system health check with Systems Agent."""
        state.phase = WorkflowPhase.SYSTEM_CHECK
        await broadcast_event("workflow", {"type": "phase_started", "phase": "system_check"})
        
        state.system_status = await self.systems.health_check()
        state.messages.append("System check completed")
        return state
    
    async def _run_oversight_review(self, state: WorkflowState) -> WorkflowState:
        """Oversight Governor reviews all agent outputs."""
        state.phase = WorkflowPhase.OVERSIGHT
        await broadcast_event("workflow", {"type": "phase_started", "phase": "oversight_review"})
        
        combined_data = {
            "research": state.research,
            "analysis": state.analysis,
            "parameters": state.parameters
        }
        
        report = await self.oversight.review_action(
            agent_name="Workflow",
            action="investment_decision",
            data=combined_data
        )
        
        state.oversight_approval = report.approved
        state.friction_score = report.friction_score
        state.messages.append(f"Oversight review: {'approved' if report.approved else 'rejected'}")
        return state
    
    async def _run_report_generation(self, state: WorkflowState) -> WorkflowState:
        """Generate stakeholder report with Reach Agent."""
        state.phase = WorkflowPhase.REPORT
        await broadcast_event("workflow", {"type": "phase_started", "phase": "report_generation"})
        
        report_data = {
            "task_id": state.task_id,
            "research_summary": state.research,
            "analysis_summary": state.analysis,
            "friction_score": state.friction_score
        }
        
        state.report = await self.reach.generate_report("investment_summary", report_data)
        state.messages.append("Report generated")
        return state
    
    async def _finalize(self, state: WorkflowState) -> None:
        """Record outcome to feedback loop."""
        success = state.oversight_approval
        
        await self.feedback.record_outcome(
            action_id=state.task_id,
            agent="Workflow",
            action_type=state.task_type,
            outcome=state.phase.value,
            success=success,
            context={"friction_score": state.friction_score}
        )
        
        await broadcast_event("workflow", {
            "type": "workflow_completed",
            "task_id": state.task_id,
            "success": success,
            "friction_score": state.friction_score
        })
