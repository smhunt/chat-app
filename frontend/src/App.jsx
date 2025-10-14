import React, { useState } from 'react'
import { AuthProvider } from './context/AuthContext.jsx'
import Sidebar from './components/Sidebar.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import './styles.css'

export default function App() {
  const [activeConversationId, setActiveConversationId] = useState('general')
  const [conversations, setConversations] = useState([
    { id: 'general', name: 'General' },
    { id: 'random', name: 'Random' },
    { id: 'support', name: 'Support' }
  ])

  return (
    <AuthProvider>
      <div className="layout">
        <Sidebar
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={setActiveConversationId}
        />
        <ChatWindow conversationId={activeConversationId} />
      </div>
    </AuthProvider>
  )
}
