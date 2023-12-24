import { attach, createEvent, sample } from 'effector'
import { createGate } from 'effector-react'
import invariant from 'ts-invariant'

import { Currency, api } from '@app/shared/api'
import { createForm, rules } from '@app/shared/lib/effector-form'
import { toNormalizedNumber } from '@app/shared/lib/number'
import { navigationModel } from '@app/shared/navigation'
import { sessionModel } from '@app/shared/session'

interface FormValues {
  addressee: { id: string; displayName: string }
  amount: string
  comment: string
  currency: Currency
  requester: { id: string; displayName: string }
}

const gate = createGate<{ displayName: string; id: string; currency: Currency }>()

const form = createForm<FormValues>({
  initialValues: {
    addressee: { id: '', displayName: '' },
    amount: '',
    comment: '',
    currency: Currency.Unknown,
    requester: { id: '', displayName: '' },
  },
  validate: rules.config(() => ({
    amount: rules.combine(
      rules.required('Amount is required'),
      rules.not('0', 'Amount is required'),
    ),
  })),
})

const addresseeChanged = createEvent()

const createDebtFx = attach({
  source: form.$values,
  effect: (values) =>
    api.createTransaction({
      addresseeId: values.addressee.id,
      requesterId: values.requester.id,
      amount: toNormalizedNumber(values.amount),
      comment: values.comment,
      currency: values.currency,
    }),
})

const $isPending = createDebtFx.pending

sample({
  clock: gate.open,
  source: { values: form.$values, user: sessionModel.$user },
  fn: ({ values, user }, payload): FormValues => {
    invariant(user, 'User is not defined')

    return {
      ...values,
      addressee: { displayName: payload.displayName, id: payload.id },
      requester: { displayName: user.displayName, id: user.id },
      currency: payload.currency,
    }
  },
  target: form.setValues,
})

sample({
  clock: gate.close,
  target: form.reset,
})

sample({
  clock: addresseeChanged,
  source: form.$values,
  fn: (values) => ({
    ...values,
    addressee: values.requester,
    requester: values.addressee,
  }),
  target: form.setValues,
})

sample({
  clock: form.validated,
  target: createDebtFx,
})

sample({
  clock: createDebtFx.done,
  target: navigationModel.back,
})

createDebtFx.failData.watch((error) => {
  console.log('>>> error', error)
})

export const createTransactionScreenModel = {
  gate,
  form,

  '@@unitShape': () => ({
    isPending: $isPending,
    onAddresseeChange: addresseeChanged,
  }),
}
