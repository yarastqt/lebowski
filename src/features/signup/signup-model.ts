import { attach, combine, createEvent, createStore, sample } from 'effector'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import { $fireauth, $firestore } from '@app/shared/firebase'
import { User } from '@app/shared/session'

export const signupModel = (() => {
  const emailChanged = createEvent<string>()
  const passwordChanged = createEvent<string>()
  const createPressed = createEvent()
  const reset = createEvent()

  const $email = createStore('')
  const $password = createStore('')

  const $formValues = combine($email, $password, (email, password) => ({ email, password }))
  const $isValid = combine($formValues, (values) => Boolean(values.email && values.password))

  const createUserFx = attach({
    source: [$formValues, $fireauth, $firestore],
    effect: async ([values, fireauth, firestore]) => {
      try {
        const result = await createUserWithEmailAndPassword(fireauth, values.email, values.password)
        const userRef = doc(firestore, 'users', result.user.uid)

        await setDoc(userRef, {
          id: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          createdAt: serverTimestamp(),
          // TODO: Add extended type for User.
        } satisfies User & { createdAt: unknown })

        console.log('>>> result', result)
      } catch (error) {
        console.log('>>> error', error)
      }
    },
  })

  const $isPending = createUserFx.pending

  sample({ clock: emailChanged, target: $email })
  sample({ clock: passwordChanged, target: $password })

  sample({
    clock: createPressed,
    source: [$isPending, $isValid],
    // TODO: Add validation.
    filter: ([isPending, isValid]) => !isPending && isValid,
    target: createUserFx,
  })

  sample({
    clock: reset,
    target: [$email.reinit, $password.reinit],
  })

  return {
    '@@unitShape': () => ({
      email: $email,
      isPending: $isPending,
      isValid: $isValid,
      onCreatePress: createPressed,
      onEmailChange: emailChanged,
      onPasswordChange: passwordChanged,
      password: $password,
      screenUnmounted: reset,
    }),
  }
})()
