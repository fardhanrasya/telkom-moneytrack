import { useState, useEffect } from "react"
import { useAuthContext } from "./useAuthContext"
import { projectAuth } from "../firebase/config"

export const useLogout = () => {
  const [canceled, setCanceled] = useState(false)
  const {dispatch} = useAuthContext()
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)

  const logout = async () => {
    setError(null)
    setPending(true)

    try {
      await projectAuth.signOut()
      dispatch({type: "LOGOUT"})
      if (!canceled) {
        setPending(false)
        setError(null)
      }
    } catch (error) {
      if (!canceled) {
        setError(error)
        setPending(false)
      }
    }

  }

  useEffect(() => {
    return () => setCanceled(true)
  }, [])
  
  return { logout, error, pending }
}