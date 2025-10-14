import express from 'express'
import http from 'http'
import { WebSocketServer } from 'ws'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/health', (_, res) => res.send('ok'))

const server = http.createServer(app)
const wss = new WebSocketServer({ server })

const rooms = new Map() // roomId -> { clients:Set<ws>, history:[] , typing:Set<string> }

function getRoom(id) {
  if (!rooms.has(id)) rooms.set(id, { clients: new Set(), history: [], typing: new Set() })
  return rooms.get(id)
}

wss.on('connection', (ws) => {
  let joinedRoom = null

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString())
      if (msg.type === 'join') {
        const room = getRoom(msg.conversationId || 'general')
        room.clients.add(ws)
        joinedRoom = room
        ws.send(JSON.stringify({ type: 'history', payload: room.history }))
      } else if (msg.type === 'message') {
        const payload = {
          text: msg.payload.text ?? '',
          author: msg.payload.author ?? 'Guest',
          conversationId: msg.payload.conversationId ?? 'general',
          timestamp: Date.now()
        }
        const room = getRoom(payload.conversationId)
        room.history.push(payload)
        for (const client of room.clients) {
          if (client.readyState === 1) client.send(JSON.stringify({ type: 'message', payload }))
        }
      } else if (msg.type === 'typing') {
        const { author, conversationId } = msg.payload || {}
        const room = getRoom(conversationId || 'general')
        if (author) {
          room.typing.add(author)
          // broadcast typing users, then clear after 2s
          const users = Array.from(room.typing)
          for (const client of room.clients) {
            if (client.readyState === 1) client.send(JSON.stringify({ type: 'typing', payload: users }))
          }
          setTimeout(() => {
            room.typing.delete(author)
            const users2 = Array.from(room.typing)
            for (const client of room.clients) {
              if (client.readyState === 1) client.send(JSON.stringify({ type: 'typing', payload: users2 }))
            }
          }, 2000)
        }
      }
    } catch (e) {
      console.error('bad message', e)
    }
  })

  ws.on('close', () => {
    if (!joinedRoom) return
    joinedRoom.clients.delete(ws)
  })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => console.log('Server on http://localhost:' + PORT))
