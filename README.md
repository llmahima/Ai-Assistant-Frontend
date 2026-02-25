# AI-Powered Support Assistant — Frontend

React-based chat interface for the AI Support Assistant with a landing page and session-based conversation management.

## Tech Stack

- **React 19** + Vite
- **Tailwind CSS v4**
- **Framer Motion** — animations
- **React Router** — navigation
- **Lucide React** — icons

## Setup

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173` by default.

## Environment Variables

Create a `.env` file (optional):

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3001` | Backend API base URL |

## Pages

### Landing Page (`/`)
Product landing page with hero section, features grid, and "how it works" steps. Animated with Framer Motion.

### Chat Page (`/chat`)
Full chat interface with:
- **Sidebar**: Session list, "New Chat" button
- **Chat area**: Message bubbles, typing indicator, auto-scroll
- **Session management**: UUID-based sessions stored in localStorage

## Project Structure

```
src/
├── components/ui/    # Reusable UI components (Button, Input, Card)
├── pages/            # LandingPage, ChatPage
├── services/         # API client
├── utils/            # Session management
└── lib/              # Utilities (cn)
```

## API Integration

The frontend expects the backend to be running with these endpoints:

- `POST /api/chat` — Send message, get AI reply
- `GET /api/conversations/:sessionId` — Fetch conversation history
- `GET /api/sessions` — List all sessions

## Assumptions

- Backend runs on port 3001 by default
- Sessions are identified by UUIDs stored in browser localStorage
- Dark theme only (no light mode toggle)
