import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { sessionModel } from '../session'
import { ApiError } from './api-error'
import { getUserByEmail } from './get-user-by-email'
import { Table } from './tables'
import { RelationshipPayload, RelationshipStatus } from './types'

export async function sendInvite(params: { receiverEmail: string }) {
  const firestore = scope.getState($firestore)
  const user = scope.getState(sessionModel.$user)

  invariant(user, 'User is not defined')

  // TODO: Add check for invite already sended.
  // TODO: Add check for user already friend.
  const receiverUser = await getUserByEmail({ email: params.receiverEmail })

  if (user.id === receiverUser.id) {
    throw new ApiError('SELF_INVITE', 'Cannot send invite to self')
  }

  const relationshipsRef = collection(firestore, Table.Relationships)

  return addDoc(relationshipsRef, {
    requesterRef: doc(firestore, Table.Users, user.id),
    addresseeRef: doc(firestore, Table.Users, receiverUser.id),
    createdAt: serverTimestamp(),
    status: RelationshipStatus.Pending,
    wallets: {
      [user.settings.defaultCurrency]: { amount: 0, transactions: [] },
      [receiverUser.settings.defaultCurrency]: { amount: 0, transactions: [] },
    },
  } satisfies RelationshipPayload)
}
