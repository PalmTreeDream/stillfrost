"""
Twitter/X API Service
Handles posting threads to Twitter/X when approved by the Principal.
Uses OAuth 1.0a for user-context authentication.
"""
import os
import re
import asyncio
import hmac
import hashlib
import base64
import time
import secrets
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from urllib.parse import quote
import httpx


@dataclass
class TweetResult:
    tweet_id: str
    text: str
    success: bool
    error: Optional[str] = None


class TwitterService:
    """
    Service for posting threads to Twitter/X.
    Uses OAuth 1.0a for user-context posting.
    """
    
    def __init__(self):
        self.api_key = os.getenv("TWITTER_API_KEY", "")
        self.api_secret = os.getenv("TWITTER_API_SECRET", "")
        self.access_token = os.getenv("TWITTER_ACCESS_TOKEN", "")
        self.access_secret = os.getenv("TWITTER_ACCESS_SECRET", "")
        
        self.base_url = "https://api.twitter.com/2"
        
    @property
    def is_configured(self) -> bool:
        """Check if Twitter credentials are configured."""
        return all([self.api_key, self.api_secret, self.access_token, self.access_secret])
    
    def _generate_oauth_signature(self, method: str, url: str, params: Dict[str, str]) -> str:
        """Generate OAuth 1.0a signature."""
        sorted_params = sorted(params.items())
        param_string = "&".join(f"{quote(k, safe='')}" + "=" + f"{quote(v, safe='')}" for k, v in sorted_params)
        
        base_string = "&".join([
            method.upper(),
            quote(url, safe=''),
            quote(param_string, safe='')
        ])
        
        signing_key = f"{quote(self.api_secret, safe='')}&{quote(self.access_secret, safe='')}"
        
        signature = hmac.new(
            signing_key.encode('utf-8'),
            base_string.encode('utf-8'),
            hashlib.sha1
        ).digest()
        
        return base64.b64encode(signature).decode('utf-8')
    
    def _get_oauth_header(self, method: str, url: str) -> str:
        """Generate OAuth 1.0a Authorization header."""
        oauth_params = {
            "oauth_consumer_key": self.api_key,
            "oauth_nonce": secrets.token_hex(16),
            "oauth_signature_method": "HMAC-SHA1",
            "oauth_timestamp": str(int(time.time())),
            "oauth_token": self.access_token,
            "oauth_version": "1.0"
        }
        
        signature = self._generate_oauth_signature(method, url, oauth_params)
        oauth_params["oauth_signature"] = signature
        
        header_parts = [f'{quote(k, safe="")}="{quote(v, safe="")}"' for k, v in sorted(oauth_params.items())]
        return "OAuth " + ", ".join(header_parts)
    
    def parse_thread(self, thread_content: str) -> List[str]:
        """
        Parse thread content into individual tweets.
        Handles numbered format like "1/ Tweet content"
        """
        lines = thread_content.strip().split('\n')
        tweets: List[str] = []
        current_tweet: List[str] = []
        
        for line in lines:
            stripped = line.strip()
            if not stripped:
                continue
                
            if re.match(r'^\d+[/.]', stripped):
                if current_tweet:
                    tweets.append(' '.join(current_tweet))
                cleaned = re.sub(r'^\d+[/.]\s*', '', stripped)
                current_tweet = [cleaned] if cleaned else []
            else:
                current_tweet.append(stripped)
        
        if current_tweet:
            tweets.append(' '.join(current_tweet))
            
        return [t for t in tweets if t and len(t) <= 280]
    
    async def post_thread(self, thread_content: str, product_name: str) -> Dict[str, Any]:
        """
        Post a thread to Twitter/X.
        Each tweet is posted as a reply to the previous one.
        """
        if not self.is_configured:
            return {
                "success": False,
                "error": "Twitter API not configured. Please add TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, and TWITTER_ACCESS_SECRET.",
                "tweets_posted": 0
            }
        
        tweets = self.parse_thread(thread_content)
        if not tweets:
            return {
                "success": False,
                "error": "No valid tweets parsed from thread content",
                "tweets_posted": 0
            }
        
        results: List[TweetResult] = []
        reply_to_id: Optional[str] = None
        
        async with httpx.AsyncClient() as client:
            for i, tweet_text in enumerate(tweets):
                try:
                    url = f"{self.base_url}/tweets"
                    payload: Dict[str, Any] = {"text": tweet_text}
                    if reply_to_id:
                        payload["reply"] = {"in_reply_to_tweet_id": reply_to_id}
                    
                    oauth_header = self._get_oauth_header("POST", url)
                    
                    headers = {
                        "Authorization": oauth_header,
                        "Content-Type": "application/json"
                    }
                    
                    response = await client.post(
                        url,
                        json=payload,
                        headers=headers,
                        timeout=30.0
                    )
                    
                    if response.status_code == 201:
                        data = response.json()
                        tweet_id = data.get("data", {}).get("id", "")
                        reply_to_id = tweet_id
                        results.append(TweetResult(
                            tweet_id=tweet_id,
                            text=tweet_text,
                            success=True
                        ))
                    else:
                        error_msg = f"HTTP {response.status_code}: {response.text}"
                        results.append(TweetResult(
                            tweet_id="",
                            text=tweet_text,
                            success=False,
                            error=error_msg
                        ))
                        
                    if i < len(tweets) - 1:
                        await asyncio.sleep(1)
                        
                except Exception as e:
                    results.append(TweetResult(
                        tweet_id="",
                        text=tweet_text,
                        success=False,
                        error=str(e)
                    ))
        
        successful = [r for r in results if r.success]
        failed = [r for r in results if not r.success]
        
        return {
            "success": len(failed) == 0,
            "product": product_name,
            "tweets_posted": len(successful),
            "total_tweets": len(tweets),
            "thread_url": f"https://twitter.com/i/status/{results[0].tweet_id}" if successful else None,
            "errors": [{"tweet": r.text, "error": r.error} for r in failed] if failed else None
        }
    
    def get_status(self) -> Dict[str, Any]:
        """Get Twitter service status."""
        return {
            "configured": self.is_configured,
            "has_api_key": bool(self.api_key),
            "has_api_secret": bool(self.api_secret),
            "has_access_token": bool(self.access_token),
            "has_access_secret": bool(self.access_secret)
        }


twitter_service = TwitterService()
