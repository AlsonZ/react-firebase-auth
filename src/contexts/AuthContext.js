import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider(props) {
  const [user, setUser] = useState();

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}
