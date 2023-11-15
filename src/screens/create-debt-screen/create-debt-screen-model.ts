import { attach, sample } from 'effector'

import { Currency, api } from '@app/shared/api'
import { createForm, rules } from '@app/shared/lib/effector-form'
import { navigationModel } from '@app/shared/navigation'

interface FormValues {
  reciverEmail: string
  amount: string
  currency: Currency
  comment: string
}

const form = createForm<FormValues>({
  initialValues: {
    reciverEmail: '',
    amount: '',
    currency: Currency.Amd,
    comment: '',
  },
  validate: rules.config(() => ({
    reciverEmail: rules.required('Email is required'),
    amount: rules.required('Amount is required'),
  })),
})

const createDebtFx = attach({
  source: form.$values,
  effect: (values) =>
    api.createDebt({
      receiverEmail: values.reciverEmail,
      amount: Number(values.amount),
      currency: values.currency,
      comment: values.comment,
    }),
})

const $isPending = createDebtFx.pending

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

export const createDebtScreenModel = {
  form,

  '@@unitShape': () => ({
    isPending: $isPending,
  }),
}
