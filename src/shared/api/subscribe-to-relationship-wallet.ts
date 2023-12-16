import {
  and,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  or,
  query,
  where,
} from 'firebase/firestore'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { sessionModel } from '../session'
import { Table } from './tables'
import {
  type Currency,
  type RelationshipDocument,
  RelationshipStatus,
  RelationshipTransaction,
  RelationshipWallet,
  User,
} from './types'

export async function subscribeToRelationshipWallet(payload: {
  params: { friendId: string }
  onData: (transactions: RelationshipWallet[]) => void
}) {
  const firestore = scope.getState($firestore)
  const user = scope.getState(sessionModel.$user)

  invariant(user, 'User is not defined')

  const relationshipsRef = collection(firestore, Table.Relationships)
  const userRef = doc(firestore, Table.Users, user.id)
  const friendRef = doc(firestore, Table.Users, payload.params.friendId)

  const friendSnapshot = await getDoc(friendRef)
  const friend = friendSnapshot.data() as User | undefined

  invariant(friend, 'Friend is not defined')

  const relationshipQuery = query(
    relationshipsRef,
    and(
      or(
        and(where('requesterRef', '==', userRef), where('addresseeRef', '==', friendRef)),
        and(where('requesterRef', '==', friendRef), where('addresseeRef', '==', userRef)),
      ),
      where('status', '==', RelationshipStatus.Accepted),
    ),
    limit(1),
  )

  return onSnapshot(relationshipQuery, ({ docs }) => {
    const doc = docs.at(0)

    invariant(doc, 'Relationship document is not defined')

    const relationship = doc.data() as RelationshipDocument
    const wallets = Object.entries(relationship.wallets)
      .map<RelationshipWallet>(([currency, wallet]) => ({
        currency: currency as Currency,
        amount: wallet.amount,
        transactions: Object.values(wallet.transactions)
          .map<RelationshipTransaction>((transaction) => ({
            id: transaction.id,
            amount: transaction.amount,
            comment: transaction.comment,
            createdAt: (transaction.createdAt?.toDate() ?? new Date()).getTime(),
            requesterName:
              transaction.requesterRef.id === userRef.id ? user.displayName : friend.displayName,
            addresseeName:
              transaction.addresseeRef.id === userRef.id ? user.displayName : friend.displayName,
            state: transaction.requesterRef.id === userRef.id ? 'outgoing' : 'incoming',
          }))
          .sort((a, b) => b.createdAt - a.createdAt),
      }))
      .sort((a, b) => a.currency.localeCompare(b.currency))

    payload.onData(wallets)
  })
}
