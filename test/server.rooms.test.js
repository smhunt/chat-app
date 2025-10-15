import assert from 'node:assert/strict'
import { describe, it, beforeEach } from 'node:test'
import * as rooms from '../server/rooms.js'

describe('rooms module', () => {
  beforeEach(() => {
    rooms._resetAll()
  })

  it('adds and retrieves messages with validation and caps history', () => {
    const id = 'test-room'
    // add many messages and ensure cap enforced
    for (let i = 0; i < 1200; i++) {
      rooms.addMessage(id, { text: 'msg' + i, author: 'u' + i })
    }
    const hist = rooms.getHistory(id)
    // MAX_HISTORY is 1000 in implementation; ensure we don't exceed that
    assert(hist.length <= 1000, 'history exceeds cap')
    // last message should be the last pushed
    assert(hist[hist.length - 1].text === 'msg1199')
  })

  it('truncates message text and author length', () => {
    const id = 't2'
    const longText = 'x'.repeat(5000)
    const longAuthor = 'a'.repeat(500)
    const msg = rooms.addMessage(id, { text: longText, author: longAuthor })
    assert(msg.text.length <= 2000)
    assert(msg.author.length <= 100)
  })

  it('manages typing users and clients', () => {
    const id = 't3'
    // mock socket objects
    const s1 = { id: 1 }
    const s2 = { id: 2 }
    rooms.addClient(id, s1)
    rooms.addClient(id, s2)
    let clients = rooms.getClients(id)
    assert(clients.has(s1) && clients.has(s2))
    rooms.removeClientFromAll(s1)
    clients = rooms.getClients(id)
    assert(!clients.has(s1) && clients.has(s2))

    rooms.addTyping(id, 'alice')
    rooms.addTyping(id, 'bob')
    let typing = rooms.getTyping(id)
    assert(typing.includes('alice') && typing.includes('bob'))
    rooms.removeTyping(id, 'alice')
    typing = rooms.getTyping(id)
    assert(!typing.includes('alice') && typing.includes('bob'))
  })
})
