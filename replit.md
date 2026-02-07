# Stillfrost - Autonomous Venture Studio

## Overview
Stillfrost is an autonomous venture studio run by multi-agent AI systems. Users initiate tasks (e.g., "create a product" or "write an article"), and the agents collaborate to research, build, and complete them. Once finished, products are automatically marketed on Twitter after Principal approval.

The system features:
- **Public Landing Page** (/) with animated multi-agent workflow visualization
- **Dashboard** (/dashboard) showing "The Lab" (active incubation) and live operations feed
- **Registry** (/registry) displaying operational assets as a high-status portfolio
- **The Vault** (/control) for Principal authorization of deployments and Twitter posts

## Project Architecture

### Frontend (React + TypeScript)
- **Location**: `client/src/`
- **Port**: 5000
- **Design**: Black/zinc dark theme with Playfair Display typography
- **Key Pages**:
  - `home.tsx` - Animated landing page with agent workflow visualization
  - `dashboard.tsx` - The Lab (incubation) + live operations feed
  - `registry.tsx` - Portfolio of operational assets
  - `control.tsx` - The Vault for Principal authorization

### Python Backend (FastAPI)
- **Location**: `server/python_backend/`
- **Port**: 8001
- **Key Modules**:
  - `agents/` - 5 hierarchical agents with codenames
  - `twitter/` - Twitter/X API integration for thread posting
  - `telemetry/` - WebSocket streaming for real-time updates
  - `control/` - Command & Control layer for Principal management

### Agent Hierarchy (Codenames)
1. **Governor** - Oversight agent, reviews all outputs and enforces standards
2. **Scout** (Intelligence) - Opportunity finder, market research
3. **Gatekeeper** (Logic) - Validation and portfolio optimization
4. **Forge** (Systems) - The builder, creates products and content
5. **Signal** (Reach) - The voice, Twitter threads and marketing

### Database Schema (PostgreSQL)
- `active_tasks` - Tasks in The Lab (incubation stage)
- `registry_assets` - Operational assets in The Registry
- `pending_approvals` - Items awaiting Principal authorization in The Vault
- `users` / `sessions` - Replit Auth for protected routes

### API Endpoints
- `GET /api/lab/tasks` - Get active incubation tasks
- `GET /api/registry/assets` - Get operational assets
- `GET /api/vault/pending` - Get pending approvals (authenticated)
- `POST /api/vault/authorize/:id` - Authorize an item (moves products to registry, posts Twitter threads)
- `POST /api/vault/reject/:id` - Reject an item
- `GET /api/twitter/status` - Check Twitter API configuration

## Environment Variables
- `AI_INTEGRATIONS_OPENAI_API_KEY` - OpenAI API key (via Replit AI Integrations)
- `AI_INTEGRATIONS_OPENAI_BASE_URL` - OpenAI API base URL
- `TWITTER_API_KEY` - Twitter API key (for thread posting)
- `TWITTER_API_SECRET` - Twitter API secret
- `TWITTER_ACCESS_TOKEN` - Twitter access token
- `TWITTER_ACCESS_SECRET` - Twitter access token secret
- `DISCORD_WEBHOOK_URL` - (Optional) Discord webhook for notifications
- `TELEGRAM_BOT_TOKEN` - (Optional) Telegram bot token

## Running the Application
1. Frontend: `npm run dev` (port 5000)
2. Python Backend: `python -m server.python_backend.main` (port 8001)

## Workflow
1. User initiates a task → Scout identifies opportunity
2. Forge builds the product/content
3. Signal drafts a Twitter thread for launch
4. All outputs go to Governor for validation
5. Validated items appear in The Vault for Principal approval
6. On authorization: products move to Registry, Twitter threads are posted

## Recent Changes
- Redesigned UI with black/zinc theme and Playfair Display typography
- Created animated landing page with multi-agent workflow visualization
- Built The Lab view on dashboard for active incubation
- Created The Registry page for operational assets
- Implemented The Vault for Principal authorization
- Added Twitter API integration with OAuth 1.0a
- Updated agent codenames (Scout, Forge, Signal, Gatekeeper, Governor)
- Express server routes for Vault and Lab/Registry APIs

## User Preferences
- Black background with zinc accent colors
- Maximum whitespace and sophisticated typography (Playfair Display)
- Fully autonomous agent operations with human-in-the-loop for final approval
