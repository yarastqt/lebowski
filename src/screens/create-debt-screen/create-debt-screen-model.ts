import { attach, sample } from 'effector'

import { Currency, api } from '@app/shared/api'
import { createForm } from '@app/shared/lib/effector-form'
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

sample({
  clock: form.validated,
  target: createDebtFx,
})

sample({
  clock: createDebtFx.done,
  target: navigationModel.back,
})

export const createDebtScreenModel = {
  form,
}
