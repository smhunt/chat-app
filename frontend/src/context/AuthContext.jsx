import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const cached = localStorage.getItem('user')
    if (cached) setUser(JSON.parse(cached))
  }, [])

  const login = (u) => { setUser(u); localStorage.setItem('user', JSON.stringify(u)) }
  const logout = () => { setUser(null); localStorage.removeItem('user') }

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
