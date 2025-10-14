import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function ChatHeader({ title }) {
  const { user, logout, login } = useAuth()
  return (
    <div className="chat-header">
      <div><strong>{title}</strong></div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>Signed in as {user.name}</span>
            <button onClick={logout}>Sign out</button>
          </>
        ) : (
          <button onClick={() => {
            const name = window.prompt('Enter a display name')
            if (name) login({ name })
          }}>Sign in</button>
        )}
      </div>
    </div>
  )
}
