import { useState, useEffect } from "react"
import { useAuthContext } from "./useAuthContext"
import { projectAuth } from "../firebase/config"

export const useLogin = () => {
  const [canceled, setCanceled] = useState(false)
  const {dispatch} = useAuthContext()
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)

  const login = async (email, password) => {
    setError(null)
    setPending(true)

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password)
      dispatch({type: "LOGIN", payload: res.user })
      if (!canceled) {
        setPending(false)
        setError(null)
      }
    } catch (error) {
      if (!canceled) {
        setError('Email or password incorrect')
        setPending(false)
      }
    }

  }

  useEffect(() => {
    return () => setCanceled(true)
  }, [])
  
  return { login, error, pending }
}