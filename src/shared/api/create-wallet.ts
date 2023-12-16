import {
  and,
  collection,
  doc,
  getDocs,
  limit,
  or,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'
import { sessionModel } from '@app/shared/session'

import { ApiError, ApiErrorCode } from './api-error'
import { Table } from './tables'
import {
  Currency,
  RelationshipDocument,
  RelationshipStatus,
  RelationshipWalletDocument,
  TransactionStatus,
} from './types'

export interface CreateWalletParams {
  currency: Currency
  friendId: string
}

export async function createWallet(params: CreateWalletParams) {
  if (params.currency in Currency && params.currency === Currency.Unknown) {
    throw new ApiError(
      ApiErrorCode.WalletCurrencyIsNotAllowed,
      `Currency "${params.currency}" is now allowed`,
    )
  }

  const firestore = scope.getState($firestore)
  const user = scope.getState(sessionModel.$user)

  invariant(user, 'User is not defined')

  const userRef = doc(firestore, Table.Users, user.id)
  const friendRef = doc(firestore, Table.Users, params.friendId)
  const relationshipsRef = collection(firestore, Table.Relationships)

  const relationshipQuery = query(
    relationshipsRef,
    and(
      or(
        and(where('requesterRef', '==', userRef), where('addresseeRef', '==', friendRef)),
        and(where('requesterRef', '==', friendRef), where('addresseeRef', '==', userRef)),
      ),
      where('status', '==', RelationshipStatus.Accepted),
    ),
    limit(1),
  )

  const relationshipsSnapshot = await getDocs(relationshipQuery)
  const relationshipSnapshot = relationshipsSnapshot.docs.at(0)

  invariant(relationshipSnapshot, 'Relationship document is not accepted or defined')

  const relationshipDocument = relationshipSnapshot.data() as RelationshipDocument

  if (params.currency in relationshipDocument.wallets) {
    throw new ApiError(
      ApiErrorCode.WalletIsAlreadyExists,
      `Wallet with currency "${params.currency}" is already exists`,
    )
  }

  await updateDoc(relationshipSnapshot.ref, {
    [`wallets.${params.currency}`]: {
      amount: 0,
      transactions: [],
    } satisfies RelationshipWalletDocument,
  })
}
