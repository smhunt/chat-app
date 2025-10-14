# Chat App (Vite + React + WebSocket)

A minimal but complete chat scaffold with React components and a Node/Express + `ws` WebSocket server.

## Quick start

```bash
cd frontend
npm i
npm run start # runs Vite dev server and Node WS server in parallel
# Frontend: http://localhost:5173, Backend WS/REST: http://localhost:3001
```

If you prefer separate terminals:

```bash
npm run dev
npm run server
```

## Key React components

- `Sidebar` — list of conversations
- `ChatWindow` — header, messages, input
- `ChatHeader` — auth widget (local only)
- `MessageList`, `MessageItem` — messages UI
- `MessageInput` — compose/send box
- `TypingIndicator` — "…typing" feedback
- `AuthContext` — simple local auth
- `useWebSocket` — WS lifecycle, message handling

## Architecture

See `architecture.png` generated in the root. It outlines client components, transport, server, and state.
