import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      //checks if there is a user, and then loading is set to false, as initially there is null users
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
      {/* {props.children} */}
    </AuthContext.Provider>
  )
}