"""
Directives Manager
Manages Principal's directives that are injected into Oversight memory.
"""
from typing import Dict, Any, List, Optional
from dataclasses import dataclass, field
from datetime import datetime
import json
import os


@dataclass
class Directive:
    id: str
    content: str
    priority: str
    created_at: datetime
    active: bool = True
    expires_at: Optional[datetime] = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "content": self.content,
            "priority": self.priority,
            "created_at": self.created_at.isoformat(),
            "active": self.active,
            "expires_at": self.expires_at.isoformat() if self.expires_at else None
        }


class DirectivesManager:
    """
    Manages Principal directives for Oversight agent memory injection.
    """
    
    _instance = None
    _counter = 0
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if self._initialized:
            return
        
        self.directives: List[Directive] = []
        self.storage_path = "data/directives.json"
        self._load_from_disk()
        self._initialized = True
    
    def _load_from_disk(self):
        """Load directives from disk."""
        if os.path.exists(self.storage_path):
            try:
                with open(self.storage_path, "r") as f:
                    data = json.load(f)
                    for d in data.get("directives", []):
                        directive = Directive(
                            id=d["id"],
                            content=d["content"],
                            priority=d["priority"],
                            created_at=datetime.fromisoformat(d["created_at"]),
                            active=d.get("active", True)
                        )
                        self.directives.append(directive)
            except Exception:
                pass
    
    def _save_to_disk(self):
        """Persist directives to disk."""
        os.makedirs(os.path.dirname(self.storage_path), exist_ok=True)
        with open(self.storage_path, "w") as f:
            json.dump({
                "directives": [d.to_dict() for d in self.directives]
            }, f, indent=2)
    
    def add_directive(self, content: str, priority: str = "high") -> Directive:
        """Add a new Principal directive."""
        DirectivesManager._counter += 1
        directive = Directive(
            id=f"DIR-{DirectivesManager._counter:04d}",
            content=content,
            priority=priority,
            created_at=datetime.now()
        )
        self.directives.append(directive)
        self._save_to_disk()
        return directive
    
    def get_active_directives(self) -> List[Directive]:
        """Get all active directives for Oversight injection."""
        now = datetime.now()
        return [
            d for d in self.directives 
            if d.active and (d.expires_at is None or d.expires_at > now)
        ]
    
    def deactivate_directive(self, directive_id: str) -> bool:
        """Deactivate a directive."""
        for d in self.directives:
            if d.id == directive_id:
                d.active = False
                self._save_to_disk()
                return True
        return False
    
    def get_directive_prompt(self) -> str:
        """
        Generate a prompt section containing all active directives
        for injection into Oversight agent memory.
        """
        active = self.get_active_directives()
        if not active:
            return ""
        
        lines = ["[PRINCIPAL DIRECTIVES - HIGH PRIORITY CONSTRAINTS]"]
        for d in active:
            lines.append(f"- [{d.priority.upper()}] {d.content}")
        lines.append("[END DIRECTIVES]")
        
        return "\n".join(lines)


directives_manager = DirectivesManager()
