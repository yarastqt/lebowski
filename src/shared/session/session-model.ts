import { attach, combine, createEvent, createStore, sample, scopeBind } from 'effector'
import { onAuthStateChanged } from 'firebase/auth'
import { QueryDocumentSnapshot, doc, getDoc } from 'firebase/firestore'

import { scope } from '@app/shared/config'
import { $fireauth, $firestore, firebaseAttached } from '@app/shared/firebase'

export interface User {
  id: string
  email: string
  displayName: string
}

export const sessionModel = (() => {
  const signedIn = createEvent<User>()
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
          const userRef = doc(firestore, 'users', payload.uid).withConverter({
            toFirestore: () => {
              throw new Error('Not implemented')
            },

            fromFirestore: (snapshot: QueryDocumentSnapshot): User => {
              const data = snapshot.data()

              return {
                id: data.id,
                email: data.email,
                displayName: data.displayName,
              }
            },
          })
          const userSnapshot = await getDoc(userRef)

          if (!userSnapshot.exists()) {
            throw new Error(`Cannot find user with uid: ${payload.uid}`)
          }

          const user = userSnapshot.data()

          scopeBind(signedIn, { scope })(user)
        } else {
          scopeBind(signedOut, { scope })()
        }

        scopeBind(loadComplete, { scope })()
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
