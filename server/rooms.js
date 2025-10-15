// Lightweight room management with caps and validation
import { randomUUID } from 'crypto'

const MAX_HISTORY = 1000

// Map roomId -> { clients: Set, history: Array, typing: Set }
const rooms = new Map()

function ensure(id) {
  if (!rooms.has(id)) rooms.set(id, { clients: new Set(), history: [], typing: new Set() })
  return rooms.get(id)
}

export function addClient(id, ws) {
  const room = ensure(id)
  room.clients.add(ws)
}

export function getClients(id) {
  const room = rooms.get(id)
  return room ? new Set(room.clients) : new Set()
}

export function removeClientFromAll(ws) {
  for (const [id, room] of rooms.entries()) {
    if (room.clients.has(ws)) room.clients.delete(ws)
  }
}

export function addMessage(id, { text = '', author = 'Guest' } = {}) {
  // basic validation and sanitization
  const cleanText = String(text ?? '').slice(0, 2000)
  const cleanAuthor = String(author ?? 'Guest').slice(0, 100)
  const msg = { id: randomUUID(), text: cleanText, author: cleanAuthor, conversationId: id, timestamp: Date.now() }
  const room = ensure(id)
  room.history.push(msg)
  if (room.history.length > MAX_HISTORY) room.history.shift()
  return msg
}

export function getHistory(id) {
  const room = rooms.get(id)
  return room ? [...room.history] : []
}

export function addTyping(id, author) {
  const room = ensure(id)
  room.typing.add(String(author))
}

export function removeTyping(id, author) {
  const room = rooms.get(id)
  if (!room) return
  room.typing.delete(String(author))
}

export function getTyping(id) {
  const room = rooms.get(id)
  return room ? Array.from(room.typing) : []
}

// helper for tests
export function _resetAll() { rooms.clear() }
