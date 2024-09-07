import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {  
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)
  const [canceled, setCanceled] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setPending(true)

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)
      if (!res) {
        throw new Error("Could not complete signup");
      }

      // add display name to user
      await res.user.updateProfile({ displayName })

      // add user to context state
      dispatch({type: "LOGIN", payload: res.user})

      if (!canceled) {
        setPending(false)
        setError(null)
      }

    } catch (error) {
      if (!canceled) {
        setError(error.message)
        setPending(false)
      }
    }

  }
  
  useEffect(() => {
    return () => setCanceled(true)
  }, [])

  return { error, pending, signup }
}