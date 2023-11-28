import { and, collection, doc, getDoc, onSnapshot, or, query, where } from 'firebase/firestore'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { sessionModel } from '../session'
import { Table } from './tables'
import { type Transaction, TransactionDocument, User } from './types'

export async function subscribeToTransactionList(payload: {
  params: { friendId: string }
  onData: (transactions: Transaction[]) => void
}) {
  const firestore = scope.getState($firestore)
  const user = scope.getState(sessionModel.$user)

  invariant(user, 'User is not defined')

  const transactionsRef = collection(firestore, Table.Transactions)
  const userRef = doc(firestore, Table.Users, user.id)
  const friendRef = doc(firestore, Table.Users, payload.params.friendId)

  const friendSnapshot = await getDoc(friendRef)
  const friend = friendSnapshot.data() as User | undefined

  invariant(friend, 'Friend is not defined')

  const transactionsQuery = query(
    transactionsRef,
    or(
      and(where('requesterRef', '==', userRef), where('addresseeRef', '==', friendRef)),
      and(where('requesterRef', '==', friendRef), where('addresseeRef', '==', userRef)),
    ),
  )

  return onSnapshot(transactionsQuery, async ({ docs }) => {
    const result: Transaction[] = []

    for (const doc of docs) {
      const transaction = doc.data() as TransactionDocument

      const requesterName =
        transaction.requesterRef.id === userRef.id ? user.displayName : friend.displayName
      const addresseeName =
        transaction.addresseeRef.id === userRef.id ? user.displayName : friend.displayName

      result.push({
        id: doc.id,
        comment: transaction.comment !== '' ? transaction.comment : undefined,
        amount: transaction.amount,
        status: transaction.status,
        requesterName,
        addresseeName,
        // TODO: Fix createdAt nullable.
        createdAt: (transaction.createdAt?.seconds ?? 0) * 1000,
      })
    }

    // TODO: Add sort for firebase collection.
    payload.onData(result.sort((a, b) => b.createdAt - a.createdAt))
  })
}
