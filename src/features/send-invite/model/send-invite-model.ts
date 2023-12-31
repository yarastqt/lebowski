import { attach, combine, createEvent, createStore, sample } from 'effector'

import { api } from '@app/shared/api'
import { createDialog } from '@app/shared/lib/dialog'

const dialog = createDialog()

const emailChanged = createEvent<string>()
const sendInviteSubmitted = createEvent()

const $email = createStore('')

const $formValues = combine($email, (email) => ({ email }))
const $isValid = combine($formValues, (values) => Boolean(values.email))

const sendInviteFx = attach({
  source: $formValues,
  effect: (formValues) => {
    return api.sendInvite({
      receiverEmail: formValues.email,
    })
  },
})

const $isPending = sendInviteFx.pending

sample({
  clock: emailChanged,
  target: $email,
})

sample({
  clock: sendInviteSubmitted,
  source: [$isPending, $isValid],
  // TODO: Add validation.
  filter: ([isPending, isValid]) => !isPending && isValid,
  target: sendInviteFx,
})

sample({
  clock: sendInviteFx.done,
  target: dialog.close,
})

sample({
  clock: dialog.close,
  target: [$email.reinit],
})

sendInviteFx.done.watch(() => {
  console.log('>>> invite sended')
})

sendInviteFx.failData.watch((error) => {
  console.log('>>> fail to send invite', error)
})

export const sendInviteModel = {
  dialog,
  '@@unitShape': () => ({
    email: $email,
    isPending: $isPending,
    isValid: $isValid,
    onEmailChange: emailChanged,
    sendInviteSubmit: sendInviteSubmitted,
  }),
}
