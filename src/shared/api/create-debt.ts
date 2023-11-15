import {
  addDoc,
  and,
  collection,
  doc,
  getDocs,
  limit,
  or,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'
import { sessionModel } from '@app/shared/session'

import { ApiError, ApiErrorCode } from './api-error'
import { getUserByEmail } from './get-user-by-email'
import { Table } from './tables'
import { Currency, DebtStatus, RelationshipStatus } from './types'

export interface CreateDebtParams {
  amount: number
  comment?: string
  currency: Currency
  receiverEmail: string
}

export async function createDebt(params: CreateDebtParams) {
  const firestore = scope.getState($firestore)
  const user = scope.getState(sessionModel.$user)

  invariant(user, 'User is not defined')

  const addresseeUser = await getUserByEmail({ email: params.receiverEmail })

  const relationshipsRef = collection(firestore, Table.Relationships)
  const requesterRef = doc(firestore, Table.Users, user.id)
  const addresseeRef = doc(firestore, Table.Users, addresseeUser.id)
  const relationshipsQuery = query(
    relationshipsRef,
    and(
      or(where('requesterRef', '==', requesterRef), where('addresseeRef', '==', requesterRef)),
      or(where('requesterRef', '==', addresseeRef), where('addresseeRef', '==', addresseeRef)),
      where('status', '==', RelationshipStatus.Accepted),
    ),
    limit(1),
  )

  const relationshipsSnapshot = await getDocs(relationshipsQuery)
  const relationshipDocument = relationshipsSnapshot.docs.at(0)

  if (!relationshipDocument?.exists()) {
    throw new ApiError(
      ApiErrorCode.UserIsNotFriend,
      `User with id ${addresseeUser.id} is not friend`,
    )
  }

  const debtsRef = collection(firestore, Table.Debts)

  return addDoc(debtsRef, {
    requesterRef,
    addresseeRef,
    amount: params.amount,
    comment: params.comment,
    currency: params.currency,
    status: DebtStatus.Pending,
    createdAt: serverTimestamp(),
  })
}
