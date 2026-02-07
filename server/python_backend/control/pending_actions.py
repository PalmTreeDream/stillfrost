"""
Pending Actions Store
Manages actions awaiting Principal approval (Human-in-the-Loop Gate).
"""
from typing import Dict, Any, List, Optional
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
import uuid
import json
import os


class ActionStatus(str, Enum):
    PENDING_APPROVAL = "pending_approval"
    APPROVED = "approved"
    REJECTED = "rejected"
    EXPIRED = "expired"


@dataclass
class PendingAction:
    id: str
    agent: str
    action_type: str
    content: Dict[str, Any]
    created_at: datetime
    status: ActionStatus = ActionStatus.PENDING_APPROVAL
    reviewed_at: Optional[datetime] = None
    reviewer_notes: Optional[str] = None
    priority: str = "normal"
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "agent": self.agent,
            "action_type": self.action_type,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
            "status": self.status.value,
            "reviewed_at": self.reviewed_at.isoformat() if self.reviewed_at else None,
            "reviewer_notes": self.reviewer_notes,
            "priority": self.priority
        }


class PendingActionsStore:
    """
    Singleton store for pending actions requiring Principal approval.
    """
    
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if self._initialized:
            return
        
        self.actions: Dict[str, PendingAction] = {}
        self.storage_path = "data/pending_actions.json"
        self._load_from_disk()
        self._initialized = True
    
    def _load_from_disk(self):
        """Load pending actions from disk."""
        if os.path.exists(self.storage_path):
            try:
                with open(self.storage_path, "r") as f:
                    data = json.load(f)
                    for action_data in data.get("actions", []):
                        action = PendingAction(
                            id=action_data["id"],
                            agent=action_data["agent"],
                            action_type=action_data["action_type"],
                            content=action_data["content"],
                            created_at=datetime.fromisoformat(action_data["created_at"]),
                            status=ActionStatus(action_data["status"]),
                            priority=action_data.get("priority", "normal")
                        )
                        self.actions[action.id] = action
            except Exception:
                pass
    
    def _save_to_disk(self):
        """Persist pending actions to disk."""
        os.makedirs(os.path.dirname(self.storage_path), exist_ok=True)
        with open(self.storage_path, "w") as f:
            json.dump({
                "actions": [a.to_dict() for a in self.actions.values()]
            }, f, indent=2)
    
    def create_action(
        self, 
        agent: str, 
        action_type: str, 
        content: Dict[str, Any],
        priority: str = "normal"
    ) -> PendingAction:
        """Create a new pending action."""
        action = PendingAction(
            id=str(uuid.uuid4())[:8],
            agent=agent,
            action_type=action_type,
            content=content,
            created_at=datetime.now(),
            priority=priority
        )
        self.actions[action.id] = action
        self._save_to_disk()
        return action
    
    def approve_action(self, action_id: str, notes: Optional[str] = None) -> Optional[PendingAction]:
        """Approve a pending action."""
        if action_id in self.actions:
            action = self.actions[action_id]
            action.status = ActionStatus.APPROVED
            action.reviewed_at = datetime.now()
            action.reviewer_notes = notes
            self._save_to_disk()
            return action
        return None
    
    def reject_action(self, action_id: str, notes: Optional[str] = None) -> Optional[PendingAction]:
        """Reject a pending action."""
        if action_id in self.actions:
            action = self.actions[action_id]
            action.status = ActionStatus.REJECTED
            action.reviewed_at = datetime.now()
            action.reviewer_notes = notes
            self._save_to_disk()
            return action
        return None
    
    def get_pending_actions(self) -> List[PendingAction]:
        """Get all pending actions."""
        return [
            a for a in self.actions.values() 
            if a.status == ActionStatus.PENDING_APPROVAL
        ]
    
    def get_action(self, action_id: str) -> Optional[PendingAction]:
        """Get a specific action by ID."""
        return self.actions.get(action_id)
    
    def get_all_actions(self) -> List[PendingAction]:
        """Get all actions regardless of status."""
        return list(self.actions.values())


pending_store = PendingActionsStore()
