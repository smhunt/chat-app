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

  const { messages, sendMessage, sendTyping, status } = useWebSocket({
    url: 'ws://localhost:3001',
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
