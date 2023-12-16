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
  Amd = 'amd',
  Rub = 'rub',
  Usd = 'usd',
  Unknown = 'unknown',
}

export enum TransactionStatus {
  Initial = 'initial',
}

export interface UserSettings {
  colorScheme: ColorScheme
  defaultCurrency: Currency
  language: Language
}

export interface RelationshipTransactionDocument {
  id: string
  addresseeRef: DocumentReference
  requesterRef: DocumentReference
  ownerRef: DocumentReference
  amount: number
  comment: string
  createdAt: Timestamp | null
  status: TransactionStatus
}

export interface RelationshipWalletDocument {
  amount: number
  transactions: RelationshipTransactionDocument[]
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
  wallets: Record<string, RelationshipWalletDocument>
}

export interface RelationshipDocument extends Relationship {}

export interface RelationshipPayload {
  addresseeRef: DocumentReference
  requesterRef: DocumentReference
  createdAt: FieldValue
  status: RelationshipStatus
  wallets: Record<string, RelationshipWalletDocument>
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

export type RelationshipTransactionState = 'incoming' | 'outgoing'

export interface RelationshipTransaction {
  id: string
  addresseeName: string
  amount: number
  comment: string
  createdAt: number
  requesterName: string
  state: RelationshipTransactionState
}

export interface RelationshipWallet {
  amount: number
  currency: Currency
  transactions: RelationshipTransaction[]
}
