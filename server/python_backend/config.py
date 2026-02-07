"""
Stillfrost Configuration
Central configuration for LLM settings and Stillfrost Standard keywords
"""
import os
from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class LLMConfig:
    model: str = "gpt-4o"
    temperature: float = 0.7
    max_tokens: int = 4096
    api_key: str = ""
    base_url: str = ""
    
    def __post_init__(self):
        self.api_key = os.environ.get("AI_INTEGRATIONS_OPENAI_API_KEY", "")
        self.base_url = os.environ.get("AI_INTEGRATIONS_OPENAI_BASE_URL", "https://api.openai.com/v1")

@dataclass 
class StillfrostConfig:
    firm_name: str = "Stillfrost"
    tagline: str = "Autonomous Holdings • Algorithmic Capital"
    
    required_keywords: List[str] = field(default_factory=lambda: [
        "risk-adjusted",
        "capital preservation",
        "asymmetric returns",
        "downside protection",
        "portfolio optimization"
    ])
    forbidden_keywords: List[str] = field(default_factory=lambda: [
        "guaranteed returns",
        "no risk",
        "100% safe",
        "moon",
        "to the moon",
        "YOLO"
    ])
    
    friction_threshold: float = 0.85
    max_retries: int = 3
    telemetry_interval: float = 0.5

llm_config = LLMConfig()
stillfrost_config = StillfrostConfig()
