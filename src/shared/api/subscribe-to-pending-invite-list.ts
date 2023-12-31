import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { ApiError } from './api-error'
import { Table } from './tables'
import { type Invite, type Relationship, RelationshipStatus, type User } from './types'

export async function subscribeToPendingInviteList(payload: {
  params: { userId: string }
  onData: (invites: Invite[]) => void
}) {
  const firestore = scope.getState($firestore)

  const relationshipsRef = collection(firestore, Table.Relationships)
  const relationshipsQuery = query(
    relationshipsRef,
    where('addresseeRef', '==', doc(firestore, Table.Users, payload.params.userId)),
    where('status', '==', RelationshipStatus.Pending),
  )

  return onSnapshot(relationshipsQuery, async ({ docs }) => {
    const result: Invite[] = []

    for (const doc of docs) {
      const invite = doc.data() as Relationship
      const requesterSnapshot = await getDoc(invite.requesterRef)

      if (!requesterSnapshot.exists()) {
        throw new ApiError('REQUESTER_NOT_FOUND', 'Requester user not found')
      }

      const requester = requesterSnapshot.data() as User

      result.push({
        id: doc.id,
        displayName: requester.displayName,
        email: requester.email,
      })
    }

    payload.onData(result)
  })
}
