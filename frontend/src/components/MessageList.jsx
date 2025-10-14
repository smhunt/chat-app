import React, { useEffect, useRef } from 'react'
import MessageItem from './MessageItem.jsx'

export default function MessageList({ messages, selfName }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight)
  }, [messages])

  return (
    <div className="message-list" ref={ref}>
      {messages.map((m, i) => (
        <MessageItem key={i} message={m} isSelf={m.author === selfName} />
      ))}
    </div>
  )
}
