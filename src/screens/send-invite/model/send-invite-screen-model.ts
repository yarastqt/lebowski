import { attach, sample } from 'effector'

import { api } from '@app/shared/api'
import { createForm, rules } from '@app/shared/lib/effector-form'
import { navigationModel } from '@app/shared/navigation'

interface FormValues {
  email: string
}

const form = createForm<FormValues>({
  initialValues: {
    email: '',
  },
  validate: rules.config(() => ({
    email: rules.required('Email is required'),
  })),
})

const sendInviteFx = attach({
  source: form.$values,
  effect: (values) =>
    api.sendInvite({
      receiverEmail: values.email,
    }),
})

const $isSending = sendInviteFx.pending

sample({
  clock: form.validated,
  source: $isSending,
  filter: (isSending) => !isSending,
  target: sendInviteFx,
})

sample({
  clock: sendInviteFx.done,
  target: navigationModel.back,
})

sendInviteFx.failData.watch((error) => {
  console.log('>>> fail to send invite', error)
})

export const sendInviteScreenModel = {
  form,
  $isSending,
}
