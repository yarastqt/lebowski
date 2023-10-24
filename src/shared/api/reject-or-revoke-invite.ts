import { deleteDoc, doc } from 'firebase/firestore'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { Table } from './tables'

export async function rejectOrRevokeInvite(params: { inviteId: string }) {
  const firestore = scope.getState($firestore)

  const inviteRef = doc(firestore, Table.Invites, params.inviteId)
  await deleteDoc(inviteRef)

  return params.inviteId
}
