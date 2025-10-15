import React, { useMemo, useState } from 'react'
import ChatHeader from './ChatHeader.jsx'
import MessageList from './MessageList.jsx'
import MessageInput from './MessageInput.jsx'
import TypingIndicator from './TypingIndicator.jsx'
import useWebSocket from '../hooks/useWebSocket.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function ChatWindow({ conversationId }) {
  const { user } = useAuth()
  const [typingUsers, setTypingUsers] = useState([])

  // Default to backend websocket port (3001) when no explicit VITE_WS_URL is set.
  // Using location.host caused the client to attempt to connect to the Vite dev server (5173)
  // which does not accept app WebSocket connections.
  const defaultHost = (typeof window !== 'undefined') ? location.hostname : 'localhost'
  const defaultWs = ((typeof window !== 'undefined' && location.protocol === 'https:') ? 'wss://' : 'ws://') + defaultHost + ':3001'
  const wsUrl = import.meta.env.VITE_WS_URL || defaultWs

  const { messages, sendMessage, sendTyping, status } = useWebSocket({
    url: wsUrl,
    conversationId,
    onTyping(users) { setTypingUsers(users) }
  })

  const title = useMemo(() => conversationId.charAt(0).toUpperCase() + conversationId.slice(1), [conversationId])

  return (
    <section className="chat">
      <ChatHeader title={title} />
      <MessageList messages={messages} selfName={user?.name} />
      <TypingIndicator users={typingUsers} />
      <MessageInput
        connected={status === 'open'}
        onSend={(text) => {
          if (!text.trim()) return
          sendMessage({ text, author: user?.name || 'Guest', conversationId })
        }}
        onTyping={() => sendTyping(user?.name || 'Guest')}
      />
    </section>
  )
}
