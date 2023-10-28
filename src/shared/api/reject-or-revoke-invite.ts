import { deleteDoc, doc } from 'firebase/firestore'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { Table } from './tables'

export async function rejectOrRevokeInvite(params: { inviteId: string }) {
  const firestore = scope.getState($firestore)

  // TOOD: Check for relationship is exists.
  const relationshipRef = doc(firestore, Table.Relationships, params.inviteId)

  await deleteDoc(relationshipRef)

  return params.inviteId
}
