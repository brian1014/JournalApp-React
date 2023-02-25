import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseBD } from '../firebase/config'

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('El UID del usuario no existe')

  const collectionsRef = collection(FirebaseBD, `${uid}/journal/notes`)
  const docs = await getDocs(collectionsRef)

  const notes = []
  docs.forEach(doc => {
    notes.push({id: doc.id, ...doc.data()})
  })
  
  return notes
}