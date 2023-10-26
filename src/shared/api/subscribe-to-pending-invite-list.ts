import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { ApiError } from './api-error'
import { Table } from './tables'
import type { Invite, InviteDocument, User } from './types'

export async function subscribeToPendingInviteList(payload: {
  params: { userId: string }
  onData: (invites: Invite[]) => void
}) {
  const firestore = scope.getState($firestore)

  const invitesRef = collection(firestore, Table.Invites)
  const invitesQuery = query(
    invitesRef,
    where('receiverRef', '==', doc(firestore, Table.Users, payload.params.userId)),
  )

  return onSnapshot(invitesQuery, async ({ docs }) => {
    const result: Invite[] = []

    for (const doc of docs) {
      const invite = doc.data() as InviteDocument
      const senderShapshot = await getDoc(invite.senderRef)

      if (!senderShapshot.exists()) {
        throw new ApiError('SENDER_NOT_FOUND', 'Sender user not found')
      }

      const sender = senderShapshot.data() as User

      result.push({
        id: doc.id,
        displayName: sender.displayName,
        email: sender.email,
      })
    }

    payload.onData(result)
  })
}
