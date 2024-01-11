import { and, collection, doc, getDoc, onSnapshot, or, query, where } from 'firebase/firestore'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { ApiError, ApiErrorCode } from './api-error'
import { Table } from './tables'
import { Friend, type Relationship, RelationshipStatus, type User } from './types'

export async function subscribeToFriendList(payload: {
  params: { userId: string }
  onData: (friends: Friend[]) => void
}) {
  const firestore = scope.getState($firestore)

  const relationshipsRef = collection(firestore, Table.Relationships)
  const userRef = doc(firestore, Table.Users, payload.params.userId)
  const relationshipsQuery = query(
    relationshipsRef,
    and(
      or(where('requesterRef', '==', userRef), where('addresseeRef', '==', userRef)),
      where('status', '==', RelationshipStatus.Accepted),
    ),
  )

  return onSnapshot(relationshipsQuery, async ({ docs }) => {
    const result: Friend[] = []

    for (const doc of docs) {
      const relationship = doc.data() as Relationship
      const requesterSnapshot = await getDoc(relationship.requesterRef)
      const addresseeSnapshot = await getDoc(relationship.addresseeRef)

      if (!requesterSnapshot.exists()) {
        throw new ApiError(ApiErrorCode.RequesterNotFound, 'Requester user not found')
      }

      if (!addresseeSnapshot.exists()) {
        throw new ApiError(ApiErrorCode.AddresseeNotFound, 'Addressee user not found')
      }

      const requester = requesterSnapshot.data() as User
      const addressee = addresseeSnapshot.data() as User

      const user = requester.id === payload.params.userId ? addressee : requester

      result.push({
        id: user.id,
        avatarUrl: user.avatarUrl,
        displayName: user.displayName,
        email: user.email,
      })
    }

    payload.onData(result)
  })
}
