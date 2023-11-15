import { collection, getDocs, query, where } from 'firebase/firestore'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'

import { ApiError } from './api-error'
import { Table } from './tables'

interface User {
  id: string
  email: string
}

export async function getUserByEmail(params: { email: string }) {
  const firestore = scope.getState($firestore)

  const ref = collection(firestore, Table.Users)
  const q = query(ref, where('email', '==', params.email))
  const snapshot = await getDocs(q)

  if (snapshot.size > 1) {
    throw new ApiError('FOUND_MANY', `Found more than one user with email "${params.email}"`)
  }

  if (snapshot.empty) {
    throw new ApiError('NOT_FOUND', `User with email "${params.email}" not found`)
  }

  const userDocument = snapshot.docs.at(0)

  invariant(userDocument)

  const user = userDocument.data()

  return { id: user.id, email: user.email } satisfies User
}
