import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { ApiError } from './api-error'
import { getUserByEmail } from './get-user-by-email'
import { Table } from './tables'
import { RelationshipStatus } from './types'

export async function sendInvite(params: { senderId: string; receiverEmail: string }) {
  const firestore = scope.getState($firestore)

  // TODO: Add check for invite already sended.
  // TODO: Add check for user already friend.
  const receiverUser = await getUserByEmail({ email: params.receiverEmail })

  if (params.senderId === receiverUser.id) {
    throw new ApiError('SELF_INVITE', 'Cannot send invite to self')
  }

  const relationshipsRef = collection(firestore, Table.Relationships)

  return addDoc(relationshipsRef, {
    requesterRef: doc(firestore, Table.Users, params.senderId),
    addresseeRef: doc(firestore, Table.Users, receiverUser.id),
    createdAt: serverTimestamp(),
    status: RelationshipStatus.Pending,
  })
}
