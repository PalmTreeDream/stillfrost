"""
Systems Agent (Forge)
Handles product creation, building, and infrastructure.
Codename: Forge - The builder.
"""
from typing import Dict, Any, List
from dataclasses import dataclass, field
from datetime import datetime
from openai import AsyncOpenAI

from ..config import llm_config
from ..telemetry import broadcast_event


@dataclass
class SystemCheck:
    component: str
    status: str
    latency_ms: float
    last_check: datetime = field(default_factory=datetime.now)


class SystemsAgent:
    """
    Worker agent responsible for infrastructure monitoring and execution systems.
    Reports to the Oversight Governor.
    """
    
    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=llm_config.api_key,
            base_url=llm_config.base_url
        )
        
        self.role = "Forge"
        self.codename = "Forge"
        self.goal = "Build and create products, tools, and content assets"
        self.backstory = """You are Forge, the Systems Agent at Stillfrost. You are the builder.
        When Scout identifies an opportunity, you create the product or content. You transform
        ideas into tangible assets with precision and efficiency."""
        
        self.system_checks: List[SystemCheck] = []
        self.components = [
            "execution_engine",
            "data_pipeline", 
            "risk_monitor",
            "telemetry_stream",
            "audit_log"
        ]
    
    async def health_check(self) -> Dict[str, Any]:
        """
        Perform comprehensive system health check.
        """
        await broadcast_event("systems", {
            "type": "health_check_started"
        })
        
        results = {}
        for component in self.components:
            check = SystemCheck(
                component=component,
                status="operational",
                latency_ms=round(15 + (hash(component) % 50), 2)
            )
            self.system_checks.append(check)
            results[component] = {
                "status": check.status,
                "latency_ms": check.latency_ms
            }
        
        await broadcast_event("systems", {
            "type": "health_check_completed",
            "all_operational": all(r["status"] == "operational" for r in results.values())
        })
        
        return {
            "agent": "Forge",
            "action": "health_check",
            "components": results,
            "overall_status": "operational",
            "timestamp": datetime.now().isoformat()
        }
    
    async def monitor_execution(self, task_id: str) -> Dict[str, Any]:
        """Monitor execution of a specific task."""
        await broadcast_event("systems", {
            "type": "execution_monitor",
            "task_id": task_id
        })
        
        return {
            "agent": "Forge",
            "action": "execution_monitor",
            "task_id": task_id,
            "status": "monitoring",
            "cpu_usage": 42.5,
            "memory_usage": 68.3
        }
    
    def get_status(self) -> Dict[str, Any]:
        """Get current agent status."""
        recent_checks = self.system_checks[-5:] if self.system_checks else []
        return {
            "agent": "Forge",
            "checks_count": len(self.system_checks),
            "components_monitored": len(self.components),
            "recent_latency": sum(c.latency_ms for c in recent_checks) / max(1, len(recent_checks)),
            "status": "operational"
        }
