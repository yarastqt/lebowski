import { DocumentReference } from 'firebase/firestore'

export interface User {
  id: string
  email: string
  displayName: string
}

export interface InviteDocument {
  senderRef: DocumentReference
  receiverRef: DocumentReference
}

export interface Invite {
  id: string
  email: string
  displayName: string
}
