import { doc, getDoc, updateDoc } from 'firebase/firestore'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { $firestore } from '@app/shared/firebase'
import { sessionModel } from '@app/shared/session'

import { Table } from './tables'
import { ColorScheme, Currency, Language, UserDocument } from './types'

export async function updateSettings(params: {
  colorScheme?: ColorScheme
  defaultCurrency?: Currency
  language?: Language
}) {
  const firestore = scope.getState($firestore)
  const user = scope.getState(sessionModel.$user)

  invariant(user, 'User is not defined')

  const userRef = doc(firestore, Table.Users, user.id)
  const userSnapshot = await getDoc(userRef)
  const userDocument = userSnapshot.data() as UserDocument | undefined

  invariant(userDocument)

  return updateDoc(userRef, {
    settings: {
      colorScheme: params.colorScheme ?? userDocument.settings.colorScheme,
      defaultCurrency: params.defaultCurrency ?? userDocument.settings.defaultCurrency,
      language: params.language ?? userDocument.settings.language,
    },
  } satisfies Pick<UserDocument, 'settings'>)
}
