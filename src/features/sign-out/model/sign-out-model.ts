import { attach, createEvent, sample } from 'effector'
import { signOut } from 'firebase/auth'

import { $fireauth } from '@app/shared/firebase'

const signOutPressed = createEvent()

const signOutFx = attach({
  source: $fireauth,
  effect: (fireauth) => signOut(fireauth),
})

sample({
  clock: signOutPressed,
  target: signOutFx,
})

export const signOutModel = {
  '@@unitShape': () => ({
    onSignOutPress: signOutPressed,
  }),
}
