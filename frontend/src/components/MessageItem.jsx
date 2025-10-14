import React from 'react'

export default function MessageItem({ message, isSelf }) {
  return (
    <div className={`message ${isSelf ? 'me' : ''}`}>
      <div className="meta">{message.author} · {new Date(message.timestamp).toLocaleTimeString()}</div>
      <div className="message-bubble">{message.text}</div>
    </div>
  )
}
