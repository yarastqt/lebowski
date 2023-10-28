import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { ApiError } from './api-error'
import { Table } from './tables'
import { type Invite, type Relationship, RelationshipStatus, type User } from './types'

export async function subscribeToSendedInviteList(payload: {
  params: { userId: string }
  onData: (invites: Invite[]) => void
}) {
  const firestore = scope.getState($firestore)

  const relationshipsRef = collection(firestore, Table.Relationships)
  const relationshipsQuery = query(
    relationshipsRef,
    where('requesterRef', '==', doc(firestore, Table.Users, payload.params.userId)),
    where('status', '==', RelationshipStatus.Pending),
  )

  return onSnapshot(relationshipsQuery, async ({ docs }) => {
    const result: Invite[] = []

    for (const doc of docs) {
      const invite = doc.data() as Relationship
      const addresseeSnapshot = await getDoc(invite.addresseeRef)

      if (!addresseeSnapshot.exists()) {
        throw new ApiError('ADDRESSEE_NOT_FOUND', 'Addressee user not found')
      }

      const addressee = addresseeSnapshot.data() as User

      result.push({
        id: doc.id,
        displayName: addressee.displayName,
        email: addressee.email,
      })
    }

    payload.onData(result)
  })
}
