import { attach, combine, createEvent, createStore, sample } from 'effector'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { $fireauth } from '@app/shared/firebase'

export const signInByPasswordModel = (() => {
  const emailChanged = createEvent<string>()
  const passwordChanged = createEvent<string>()
  const signInPressed = createEvent()
  const reset = createEvent()

  const $email = createStore('')
  const $password = createStore('')

  const $formValues = combine($email, $password, (email, password) => ({ email, password }))
  const $isValid = combine($formValues, (values) => Boolean(values.email && values.password))

  const signInByPasswordFx = attach({
    source: [$formValues, $fireauth],
    effect: async ([values, fireauth]) => {
      try {
        const result = await signInWithEmailAndPassword(fireauth, values.email, values.password)

        console.log('>>> result', result)
      } catch (error) {
        console.log('>>> error', error)
      }
    },
  })

  const $isPending = signInByPasswordFx.pending

  sample({ clock: emailChanged, target: $email })
  sample({ clock: passwordChanged, target: $password })

  sample({
    clock: signInPressed,
    source: [$isPending, $isValid],
    // TODO: Add validation.
    filter: ([isPending, isValid]) => !isPending && isValid,
    target: signInByPasswordFx,
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
      onSignInPress: signInPressed,
      onEmailChange: emailChanged,
      onPasswordChange: passwordChanged,
      password: $password,
      screenUnmounted: reset,
    }),
  }
})()
