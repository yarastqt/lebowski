import { attach, combine, createEvent, createStore, sample } from 'effector'

import { api } from '@app/shared/api'
import { sessionModel } from '@app/shared/session'

const emailChanged = createEvent<string>()
const sendInvitePressed = createEvent()
const reset = createEvent()

const $email = createStore('')

const $formValues = combine($email, (email) => ({ email }))
const $isValid = combine($formValues, (values) => Boolean(values.email))

const sendInviteFx = attach({
  source: [$formValues, sessionModel.$user],
  effect: ([formValues, user]) => {
    return api.sendInvite({ senderId: user.id, receiverEmail: formValues.email })
  },
})

const $isPending = sendInviteFx.pending

sample({
  clock: emailChanged,
  target: $email,
})

sample({
  clock: sendInvitePressed,
  source: [$isPending, $isValid],
  // TODO: Add validation.
  filter: ([isPending, isValid]) => !isPending && isValid,
  target: sendInviteFx,
})

sample({
  clock: reset,
  target: [$email.reinit],
})

sendInviteFx.done.watch(() => {
  console.log('>>> invite sended')
})

sendInviteFx.failData.watch((error) => {
  console.log('>>> fail to send invite', error)
})

export const sendInviteModel = {
  '@@unitShape': () => ({
    email: $email,
    isPending: $isPending,
    isValid: $isValid,
    onEmailChange: emailChanged,
    screenUnmounted: reset,
    sendInvitePress: sendInvitePressed,
  }),
}
