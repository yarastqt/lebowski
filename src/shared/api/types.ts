import { DocumentReference, FieldValue, Timestamp } from 'firebase/firestore'

export enum Language {
  En = 'en',
}

export enum ColorScheme {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}

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

export interface UserSettings {
  colorScheme: ColorScheme
  defaultCurrency: Currency
  language: Language
}

export interface RelationshipWallet {
  currency: Currency
  amount: number
}

export interface User {
  id: string
  createdAt: Timestamp
  displayName: string
  email: string
  settings: UserSettings
}

export interface UserPyload extends Omit<User, 'createdAt'> {
  createdAt: FieldValue
}

export interface UserDocument extends User {}

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
  wallets: RelationshipWallet[]
}

export interface RelationshipPayload {
  addresseeRef: DocumentReference
  requesterRef: DocumentReference
  createdAt: FieldValue
  status: RelationshipStatus
  wallets: RelationshipWallet[]
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
