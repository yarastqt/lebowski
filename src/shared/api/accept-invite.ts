import { doc, updateDoc } from 'firebase/firestore'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { Table } from './tables'
import { RelationshipStatus } from './types'

export async function acceptInvite(params: { inviteId: string }) {
  const firestore = scope.getState($firestore)

  const relationshipsRef = doc(firestore, Table.Relationships, params.inviteId)

  await updateDoc(relationshipsRef, { status: RelationshipStatus.Accepted })

  return params.inviteId
}
