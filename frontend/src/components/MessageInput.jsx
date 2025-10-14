import React, { useState } from 'react'

export default function MessageInput({ onSend, onTyping, connected = true }) {
  const [text, setText] = useState('')
  return (
    <div className="input">
      <input
        value={text}
        placeholder="Type a message…"
        onChange={(e) => { setText(e.target.value); onTyping?.() }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (!connected) return
            onSend?.(text)
            setText('')
          }
        }}
      />
      <button disabled={!connected} onClick={() => { if (!connected) return; onSend?.(text); setText('') }}>Send</button>
    </div>
  )
}
