import { DocumentReference } from 'firebase/firestore'

export enum RelationshipStatus {
  Pending = 'pending',
  Accepted = 'accepted',
}

export enum Currency {
  Rub = 'rub',
  Usd = 'usd',
  Amd = 'amd',
}

export enum DebtStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Completed = 'completed',
}

export interface User {
  id: string
  email: string
  displayName: string
}

export interface Invite {
  id: string
  email: string
  displayName: string
}

export interface Friend {
  id: string
  email: string
  displayName: string
}

export interface Relationship {
  addresseeRef: DocumentReference
  requesterRef: DocumentReference
  status: RelationshipStatus
}
