import {
  and,
  collection,
  doc,
  getDocs,
  limit,
  or,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'
import { sessionModel } from '@app/shared/session'

import { Table } from './tables'
import { Currency, RelationshipStatus, TransactionStatus } from './types'

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
  const relationshipsRef = collection(firestore, Table.Relationships)

  const relationshipQuery = query(
    relationshipsRef,
    and(
      or(
        and(where('requesterRef', '==', requesterRef), where('addresseeRef', '==', addresseeRef)),
        and(where('requesterRef', '==', addresseeRef), where('addresseeRef', '==', requesterRef)),
      ),
      where('status', '==', RelationshipStatus.Accepted),
    ),
    limit(1),
  )

  const relationshipsSnapshot = await getDocs(relationshipQuery)
  const relationshipSnapshot = relationshipsSnapshot.docs.at(0)

  invariant(relationshipSnapshot, 'Relationship document is not accepted or defined')

  const transactionId = doc(collection(firestore, 'transaction')).id

  await updateDoc(relationshipSnapshot.ref, {
    [`wallets.${params.currency}.transactions.${transactionId}`]: {
      id: transactionId,
      addresseeRef,
      requesterRef,
      ownerRef,
      amount: params.amount,
      comment: params.comment ?? '',
      status: TransactionStatus.Initial,
      createdAt: serverTimestamp(),
    },
  })
}
