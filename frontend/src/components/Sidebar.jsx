import React from 'react'

export default function Sidebar({ conversations, activeId, onSelect }) {
  return (
    <aside className="sidebar">
      <h2>Conversations</h2>
      {conversations.map(c => (
        <div
          key={c.id}
          className={`conv ${c.id === activeId ? 'active' : ''}`}
          onClick={() => onSelect(c.id)}
        >
          {c.name}
        </div>
      ))}
    </aside>
  )
}
