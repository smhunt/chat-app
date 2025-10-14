import React from 'react'
export default function TypingIndicator({ users = [] }) {
  if (!users.length) return null
  const names = users.slice(0, 3).join(', ') + (users.length > 3 ? '…' : '')
  return <div className="typing">{names} typing…</div>
}
