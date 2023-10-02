import { attach, combine, createEvent, createStore, sample } from 'effector'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { $fireauth } from '@app/shared/firebase'

export const signupModel = (() => {
  const emailChanged = createEvent<string>()
  const passwordChanged = createEvent<string>()
  const createPressed = createEvent()

  const $email = createStore('')
  const $password = createStore('')

  const $formValues = combine($email, $password, (email, password) => ({ email, password }))

  const createUserFx = attach({
    source: [$formValues, $fireauth],
    effect: async ([values, fireauth]) => {
      try {
        const result = await createUserWithEmailAndPassword(fireauth, values.email, values.password)

        console.log('>>> result', result)
      } catch (error) {
        console.log('>>> error', error)
      }
    },
  })

  sample({ clock: emailChanged, target: $email })
  sample({ clock: passwordChanged, target: $password })

  sample({
    clock: createPressed,
    source: $formValues,
    // TODO: Add validation.
    filter: (values) => Boolean(values.email && values.password),
    target: createUserFx,
  })

  return {
    '@@unitShape': () => ({
      email: $email,
      onCreatePress: createPressed,
      onEmailChange: emailChanged,
      onPasswordChange: passwordChanged,
      password: $password,
    }),
  }
})()
