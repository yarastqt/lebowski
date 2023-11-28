import { DocumentReference, Timestamp } from 'firebase/firestore'

export enum RelationshipStatus {
  Pending = 'pending',
  Accepted = 'accepted',
}

export enum Currency {
  Rub = 'rub',
  Usd = 'usd',
  Amd = 'amd',
}

export enum TransactionStatus {
  Initial = 'initial',
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

export interface Transaction {
  id: string
  addresseeName: string
  amount: number
  comment?: string
  createdAt: number
  requesterName: string
  status: TransactionStatus
}

export interface TransactionDocument {
  addresseeRef: DocumentReference
  requesterRef: DocumentReference
  amount: number
  comment: string
  createdAt: Timestamp | null
  status: TransactionStatus
}
