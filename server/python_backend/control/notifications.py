"""
Notification Service
Sends webhook notifications to Discord/Telegram for important events.
"""
from typing import Dict, Any, Optional
from datetime import datetime
import httpx
import asyncio
import os


class NotificationService:
    """
    Sends notifications via webhooks when important events occur.
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
        
        self.discord_webhook_url = os.environ.get("DISCORD_WEBHOOK_URL")
        self.telegram_bot_token = os.environ.get("TELEGRAM_BOT_TOKEN")
        self.telegram_chat_id = os.environ.get("TELEGRAM_CHAT_ID")
        self._initialized = True
    
    async def send_discord(self, title: str, message: str, color: int = 0x5865F2) -> bool:
        """Send a Discord webhook notification."""
        if not self.discord_webhook_url:
            return False
        
        payload = {
            "embeds": [{
                "title": f"🔔 {title}",
                "description": message,
                "color": color,
                "timestamp": datetime.utcnow().isoformat(),
                "footer": {
                    "text": "Stillfrost Command & Control"
                }
            }]
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.discord_webhook_url,
                    json=payload,
                    timeout=10.0
                )
                return response.status_code == 204
        except Exception:
            return False
    
    async def send_telegram(self, message: str) -> bool:
        """Send a Telegram notification."""
        if not self.telegram_bot_token or not self.telegram_chat_id:
            return False
        
        url = f"https://api.telegram.org/bot{self.telegram_bot_token}/sendMessage"
        payload = {
            "chat_id": self.telegram_chat_id,
            "text": f"🔔 *Stillfrost Alert*\n\n{message}",
            "parse_mode": "Markdown"
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(url, json=payload, timeout=10.0)
                return response.status_code == 200
        except Exception:
            return False
    
    async def notify_secret_identified(self, secret_name: str, details: str):
        """Notify when a high-value secret/opportunity is identified."""
        title = "High-Value Secret Identified"
        message = f"**Secret:** {secret_name}\n\n{details}"
        
        await asyncio.gather(
            self.send_discord(title, message, color=0xFFD700),
            self.send_telegram(f"🔑 {title}\n\nSecret: {secret_name}\n{details}")
        )
    
    async def notify_node_response(self, node_name: str, response_summary: str):
        """Notify when a target node responds."""
        title = "Node Response Received"
        message = f"**Node:** {node_name}\n\n{response_summary}"
        
        await asyncio.gather(
            self.send_discord(title, message, color=0x00FF00),
            self.send_telegram(f"📨 {title}\n\nNode: {node_name}\n{response_summary}")
        )
    
    async def notify_action_pending(self, action_id: str, agent: str, action_type: str):
        """Notify when an action requires Principal approval."""
        title = "Action Requires Approval"
        message = f"**Action ID:** {action_id}\n**Agent:** {agent}\n**Type:** {action_type}"
        
        await asyncio.gather(
            self.send_discord(title, message, color=0xFFA500),
            self.send_telegram(f"⏳ {title}\n\nID: {action_id}\nAgent: {agent}\nType: {action_type}")
        )


notification_service = NotificationService()
