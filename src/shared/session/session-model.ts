import { attach, combine, createEvent, createStore, sample, scopeBind } from 'effector'
import { onAuthStateChanged } from 'firebase/auth'

import { scope } from '@app/shared/config'
import { $fireauth, firebaseAttached } from '@app/shared/firebase'

export interface User {
  email: string
  displayName?: string
}

export const sessionModel = (() => {
  const signedIn = createEvent<User>()
  const signedOut = createEvent()

  const $user = createStore<User | null>(null)
  const $isSignedIn = combine($user, (user) => user !== null)

  const attachAuthStateFx = attach({
    source: $fireauth,
    effect: (fireauth) => {
      onAuthStateChanged(fireauth, (user) => {
        if (user) {
          scopeBind(signedIn, { scope })({ displayName: user.displayName, email: user.email })
        } else {
          scopeBind(signedOut, { scope })
        }
      })
    },
  })

  sample({
    clock: firebaseAttached,
    target: attachAuthStateFx,
  })

  sample({
    clock: signedIn,
    target: $user,
  })

  sample({
    clock: signedOut,
    target: $user.reinit,
  })

  return {
    '@@unitShape': () => ({
      isSignedIn: $isSignedIn,
      user: $user,
    }),
  }
})()
