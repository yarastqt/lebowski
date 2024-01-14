import { attach, sample } from 'effector'
import { createGate } from 'effector-react'

import { api } from '@app/shared/api'
import { createForm, rules } from '@app/shared/lib/effector-form'
import { navigationModel } from '@app/shared/navigation'
import { sessionModel } from '@app/shared/session'

interface FormValues {
  displayName: string
  avatarUrl: string
}

const gate = createGate()

const form = createForm<FormValues>({
  initialValues: {
    displayName: '',
    avatarUrl: '',
  },
  validate: rules.config(() => ({
    displayName: rules.combine(
      rules.required('Display name is required'),
      rules.string.max(40, 'Display name is too long'),
    ),
  })),
})

const updateProfileFx = attach({
  source: form.$values,
  effect: (values) =>
    api.updateProfile({ displayName: values.displayName, avatarUrl: values.avatarUrl }),
})

const $isUpdating = updateProfileFx.pending

sample({
  clock: gate.open,
  source: sessionModel.$user,
  filter: Boolean,
  fn: (user): FormValues => ({
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
  }),
  target: form.setValues,
})

sample({
  clock: form.validated,
  source: $isUpdating,
  filter: (isUpdating) => !isUpdating,
  target: updateProfileFx,
})

sample({
  clock: updateProfileFx.done,
  target: navigationModel.back,
})

updateProfileFx.failData.watch((error) => {
  console.log('>>> error', error)
})

export const profileEditorModel = {
  form,
  gate,
  $isUpdating,
}
