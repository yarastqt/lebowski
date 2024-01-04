import { attach, combine, createEvent, createStore, sample, scopeBind } from 'effector'
import { onAuthStateChanged } from 'firebase/auth'
import { QueryDocumentSnapshot, doc, getDoc, onSnapshot } from 'firebase/firestore'
import invariant from 'ts-invariant'

import { User, UserDocument } from '@app/shared/api'
import { scope } from '@app/shared/config'
import { $fireauth, $firestore, firebaseAttached } from '@app/shared/firebase'

export const sessionModel = (() => {
  const userUpdated = createEvent<User>()
  const signedOut = createEvent()
  const loadComplete = createEvent()

  const $user = createStore<User | null>(null)
  const $isSignedIn = combine($user, (user) => user !== null)
  const $isLoaded = createStore(false)

  const attachAuthStateFx = attach({
    source: [$fireauth, $firestore],
    effect: ([fireauth, firestore]) => {
      onAuthStateChanged(fireauth, async (payload) => {
        if (payload) {
          const userRef = doc(firestore, 'users', payload.uid)

          onSnapshot(userRef, (snapshot) => {
            const userDocument = snapshot.data() as UserDocument | undefined

            invariant(userDocument, `Cannot find user with uid: ${payload.uid}`)

            // TODO: Refactor all code.
            scopeBind(userUpdated, { scope })(userDocument)
            scopeBind(loadComplete, { scope })()
          })
        } else {
          scopeBind(signedOut, { scope })()
          scopeBind(loadComplete, { scope })()
        }
      })
    },
  })

  sample({
    clock: firebaseAttached,
    target: attachAuthStateFx,
  })

  sample({
    clock: userUpdated,
    target: $user,
  })

  sample({
    clock: loadComplete,
    fn: () => true,
    target: $isLoaded,
  })

  sample({
    clock: signedOut,
    target: [$user.reinit],
  })

  return {
    $user,

    '@@unitShape': () => ({
      isSessionLoaded: $isLoaded,
      isSignedIn: $isSignedIn,
      user: $user,
    }),
  }
})()
