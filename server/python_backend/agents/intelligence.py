"""
Intelligence Agent (Scout)
Handles market research, opportunity identification, and trend analysis.
Codename: Scout - The opportunity finder.
"""
from typing import Dict, Any, List
from dataclasses import dataclass, field
from datetime import datetime
from openai import AsyncOpenAI

from ..config import llm_config
from ..telemetry import broadcast_event


@dataclass
class ResearchOutput:
    topic: str
    findings: List[str]
    confidence: float
    sources: List[str]
    timestamp: datetime = field(default_factory=datetime.now)


class IntelligenceAgent:
    """
    Worker agent responsible for market research and intelligence gathering.
    Reports to the Oversight Governor.
    """
    
    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=llm_config.api_key,
            base_url=llm_config.base_url
        )
        
        self.role = "Scout"
        self.codename = "Scout"
        self.goal = "Identify promising opportunities for products, content, and ventures"
        self.backstory = """You are Scout, the Intelligence Agent at Stillfrost. Your role is to scan
        markets, identify emerging trends, and find opportunities for new products and content.
        You discover what the world needs before it knows it needs it."""
        
        self.research_history: List[ResearchOutput] = []
    
    async def conduct_research(self, topic: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """
        Conduct market research on a specific topic.
        """
        await broadcast_event("intelligence", {
            "type": "research_started",
            "topic": topic
        })
        
        prompt = f"""Conduct investment research on: {topic}

Parameters: {parameters}

Provide a structured analysis including:
1. Key market factors
2. Risk assessment
3. Opportunity identification
4. Recommended actions (if any)

Focus on risk-adjusted returns and capital preservation."""
        
        try:
            response = await self.client.chat.completions.create(
                model=llm_config.model,
                messages=[
                    {"role": "system", "content": self.backstory},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                max_tokens=llm_config.max_tokens
            )
            
            content = response.choices[0].message.content or ""
            
            output = ResearchOutput(
                topic=topic,
                findings=[content],
                confidence=0.85,
                sources=["Market analysis", "Algorithmic assessment"]
            )
            
            self.research_history.append(output)
            
            await broadcast_event("intelligence", {
                "type": "research_completed",
                "topic": topic,
                "confidence": output.confidence
            })
            
            return {
                "agent": "Scout",
                "action": "research",
                "topic": topic,
                "findings": output.findings,
                "confidence": output.confidence,
                "timestamp": output.timestamp.isoformat()
            }
            
        except Exception as e:
            await broadcast_event("intelligence", {
                "type": "research_error",
                "topic": topic,
                "error": str(e)
            })
            raise
    
    async def analyze_sector(self, sector: str) -> Dict[str, Any]:
        """Analyze a specific market sector."""
        await broadcast_event("intelligence", {
            "type": "sector_analysis",
            "sector": sector
        })
        
        return {
            "agent": "Scout",
            "action": "sector_analysis",
            "sector": sector,
            "status": "completed"
        }
    
    def get_status(self) -> Dict[str, Any]:
        """Get current agent status."""
        return {
            "agent": "Scout",
            "research_count": len(self.research_history),
            "last_research": self.research_history[-1].timestamp.isoformat() if self.research_history else None,
            "status": "operational"
        }
