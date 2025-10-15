import express from 'express'
import http from 'http'
import { WebSocketServer } from 'ws'
import cors from 'cors'
import * as rooms from './rooms.js'
import { createRateLimiter } from './rateLimiter.js'

const app = express()

// CORS: allowlist via env CORS_ORIGINS (comma-separated). If not set, allow all (dev).
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser requests (e.g. curl, server-to-server) when origin is undefined
    if (!origin) return callback(null, true)
    if (allowedOrigins.length === 0) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('CORS origin not allowed'))
  }
}))

const allowRate = createRateLimiter()

app.get('/health', (_, res) => res.send('ok'))

const server = http.createServer(app)
const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
  let joinedRoomId = null

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString())
      if (msg.type === 'join') {
        const id = msg.conversationId || 'general'
        rooms.addClient(id, ws)
        joinedRoomId = id
        ws.send(JSON.stringify({ type: 'history', payload: rooms.getHistory(id) }))
      } else if (msg.type === 'message') {
        // rate-limit messages per-socket
        if (!allowRate(ws, 'message')) {
          try { ws.send(JSON.stringify({ type: 'error', payload: { message: 'rate_limited' } })) } catch (e) {}
          return
        }
        const raw = msg.payload || {}
        // basic validation
        if (typeof raw.text !== 'string' || raw.text.length === 0) {
          try { ws.send(JSON.stringify({ type: 'error', payload: { message: 'invalid_payload' } })) } catch (e) {}
          return
        }
        const payload = rooms.addMessage(raw.conversationId || 'general', {
          text: raw.text,
          author: raw.author
        })
        // broadcast to clients in room
        const clients = rooms.getClients(payload.conversationId)
        for (const client of clients) {
          if (client.readyState === 1) client.send(JSON.stringify({ type: 'message', payload }))
        }
      } else if (msg.type === 'typing') {
        const { author, conversationId } = msg.payload || {}
        // rate-limit typing (lightweight)
        if (!allowRate(ws, 'typing')) return
        const id = conversationId || 'general'
        if (author) {
          rooms.addTyping(id, author)
          const users = rooms.getTyping(id)
          const clients = rooms.getClients(id)
          for (const client of clients) {
            if (client.readyState === 1) client.send(JSON.stringify({ type: 'typing', payload: users }))
          }
          setTimeout(() => {
            rooms.removeTyping(id, author)
            const users2 = rooms.getTyping(id)
            for (const client of clients) {
              if (client.readyState === 1) client.send(JSON.stringify({ type: 'typing', payload: users2 }))
            }
          }, 2000)
        }
      }
    } catch (e) {
      // guard: don't let a bad client crash the server
      console.error('bad message', e)
    }
  })

  ws.on('close', () => {
    // remove socket from any rooms it may be in
    rooms.removeClientFromAll(ws)
  })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => console.log('Server on http://localhost:' + PORT))
