import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'
import { sessionModel } from '@app/shared/session'

import { Table } from './tables'
import { Currency, TransactionStatus } from './types'

export interface CreateTransactionParams {
  addresseeId: string
  requesterId: string
  amount: number
  comment?: string
  currency: Currency
}

export async function createTransaction(params: CreateTransactionParams) {
  const firestore = scope.getState($firestore)
  const user = scope.getState(sessionModel.$user)

  invariant(user, 'User is not defined')

  const ownerRef = doc(firestore, Table.Users, user.id)
  const requesterRef = doc(firestore, Table.Users, params.requesterId)
  const addresseeRef = doc(firestore, Table.Users, params.addresseeId)
  const transactionsRef = collection(firestore, Table.Transactions)

  // TOOD: Add validation:
  // 1. User is friend.
  // 2. Requester and addressee is exists.

  return addDoc(transactionsRef, {
    ownerRef,
    requesterRef,
    addresseeRef,

    amount: params.amount,
    comment: params.comment,
    currency: params.currency,

    status: TransactionStatus.Initial,
    createdAt: serverTimestamp(),
  })
}
