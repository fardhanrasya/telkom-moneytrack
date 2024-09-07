import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer =  (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {success: false, isPending: true, error:null, document:null}
    case "SUCCESS":
      return {success: true, isPending: false, error:null, document:action.payload}
    case "DELETE":
      return {success: true, isPending: false, error:null, document:null}
    case "ERROR":
      return {success: false, isPending: false, error:action.payload, document:null}
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [canceled, setCanceled] = useState(false)

  const ref = projectFirestore.collection(collection)

  const dispatchIfNotCancelled = (action) => {
    if (!canceled) {
      dispatch(action)
    }
  }

  const addDocument = async (doc) => {
    dispatchIfNotCancelled({type: "IS_PENDING"})
    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({...doc, createdAt})
      dispatchIfNotCancelled({type: "SUCCESS", payload: addedDocument})
    } catch (err) {
      dispatchIfNotCancelled({type: "ERROR", payload: err.message})
    }
  }

  const deleteDocument = async (id) => {
    dispatchIfNotCancelled({type: 'IS_PENDING'})

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({type: 'DELETE'})
    } catch (error) {
      dispatchIfNotCancelled({type: 'ERROR', payload: 'could not delete'})
    }
  }

  useEffect(() => {
    return () => setCanceled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}