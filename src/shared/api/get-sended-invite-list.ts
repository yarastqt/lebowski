import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { ApiError } from './api-error'
import { Table } from './tables'
import type { InviteDocument, User } from './types'

export async function getSendedInviteList(params: { userId: string }) {
  const firestore = scope.getState($firestore)

  const invitesRef = collection(firestore, Table.Invites)
  const invitesQuery = query(
    invitesRef,
    where('senderRef', '==', doc(firestore, Table.Users, params.userId)),
  )
  const invitesSnapshot = await getDocs(invitesQuery)

  const result: User[] = []

  for (const doc of invitesSnapshot.docs) {
    const invite = doc.data() as InviteDocument
    const receiverShapshot = await getDoc(invite.receiverRef)

    if (!receiverShapshot.exists()) {
      throw new ApiError('RECEIVER_NOT_FOUND', 'Receiver user not found')
    }

    const receiver = receiverShapshot.data() as User

    result.push({
      id: doc.id,
      displayName: receiver.displayName,
      email: receiver.email,
    })
  }

  return result
}
