"""
WebSocket Telemetry Streaming
Real-time event broadcasting for the Stillfrost dashboard.
"""
from typing import Dict, Any, List, Set
from dataclasses import dataclass, field
from datetime import datetime
import asyncio
import json
from fastapi import WebSocket


@dataclass
class TelemetryEvent:
    source: str
    event_type: str
    data: Dict[str, Any]
    timestamp: datetime = field(default_factory=datetime.now)
    
    def to_json(self) -> str:
        return json.dumps({
            "source": self.source,
            "type": self.event_type,
            "data": self.data,
            "timestamp": self.timestamp.isoformat()
        })


class TelemetryManager:
    """
    Manages WebSocket connections and broadcasts telemetry events.
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
        
        self.connections: Set[WebSocket] = set()
        self.event_buffer: List[TelemetryEvent] = []
        self.buffer_size = 100
        self._initialized = True
    
    async def connect(self, websocket: WebSocket):
        """Accept a new WebSocket connection."""
        await websocket.accept()
        self.connections.add(websocket)
        
        for event in self.event_buffer[-20:]:
            try:
                await websocket.send_text(event.to_json())
            except Exception:
                pass
    
    def disconnect(self, websocket: WebSocket):
        """Remove a WebSocket connection."""
        self.connections.discard(websocket)
    
    async def broadcast(self, source: str, data: Dict[str, Any]):
        """Broadcast an event to all connected clients."""
        event = TelemetryEvent(
            source=source,
            event_type=data.get("type", "info"),
            data=data
        )
        
        self.event_buffer.append(event)
        if len(self.event_buffer) > self.buffer_size:
            self.event_buffer = self.event_buffer[-self.buffer_size:]
        
        dead_connections = set()
        
        for websocket in self.connections:
            try:
                await websocket.send_text(event.to_json())
            except Exception:
                dead_connections.add(websocket)
        
        for ws in dead_connections:
            self.connections.discard(ws)
    
    def get_stats(self) -> Dict[str, Any]:
        """Get telemetry statistics."""
        return {
            "active_connections": len(self.connections),
            "events_buffered": len(self.event_buffer),
            "buffer_size": self.buffer_size
        }


telemetry_manager = TelemetryManager()


async def broadcast_event(source: str, data: Dict[str, Any]):
    """
    Convenience function to broadcast a telemetry event.
    Can be called from anywhere in the agent system.
    """
    await telemetry_manager.broadcast(source, data)


def format_log_entry(source: str, message: str, level: str = "INFO") -> str:
    """Format a log entry for terminal display."""
    timestamp = datetime.now().strftime("%H:%M:%S")
    return f"[{timestamp}] [{level}] [{source.upper()}] {message}"
