import { doc, getDoc, updateDoc } from 'firebase/firestore'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'
import { sessionModel } from '@app/shared/session'

import { Table } from './tables'
import { UserDocument } from './types'

export async function updateProfile(params: { displayName: string; avatarUrl: string }) {
  const firestore = scope.getState($firestore)
  const user = scope.getState(sessionModel.$user)

  invariant(user, 'User is not defined')

  const userRef = doc(firestore, Table.Users, user.id)
  const userSnapshot = await getDoc(userRef)
  const userDocument = userSnapshot.data() as UserDocument | undefined

  invariant(userDocument)

  return updateDoc(userRef, {
    displayName: params.displayName,
  } satisfies Pick<UserDocument, 'displayName'>)
}
