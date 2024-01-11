import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { firebaseModel } from '@app/shared/firebase'
import { sessionModel } from '@app/shared/session'

import { Table } from './tables'
import { UserDocument } from './types'

export async function updateProfile(params: { displayName: string; avatarUrl: string }) {
  const firestore = scope.getState(firebaseModel.$firestore)
  const storage = scope.getState(firebaseModel.$storage)
  const user = scope.getState(sessionModel.$user)

  invariant(user, 'User is not defined')

  const userRef = doc(firestore, Table.Users, user.id)
  const userSnapshot = await getDoc(userRef)
  const userDocument = userSnapshot.data() as UserDocument | undefined

  invariant(userDocument)

  let avatarUrl = params.avatarUrl

  if (params.avatarUrl) {
    const avatarRef = ref(storage, `users/${user.id}.jpg`)

    const { blob, metadata } = await getAvatarBlob(params.avatarUrl)
    const uploadAvatarResult = await uploadBytes(avatarRef, blob, metadata)
    avatarUrl = await getDownloadURL(uploadAvatarResult.ref)
  }

  return updateDoc(userRef, {
    avatarUrl,
    displayName: params.displayName,
  } satisfies Pick<UserDocument, 'avatarUrl' | 'displayName'>)
}

async function getAvatarBlob(avatarUrl: string) {
  const response = await fetch(avatarUrl)
  const blob = await response.blob()

  return {
    blob,
    metadata: { contentType: 'image/jpeg' },
  }
}
