import { attach, sample } from 'effector'

import { Currency, api } from '@app/shared/api'
import { createForm, rules } from '@app/shared/lib/effector-form'
import { navigationModel } from '@app/shared/navigation'

interface FormValues {
  addressee: { id: string; displayName: string }
  amount: string
  comment: string
  currency: Currency
  requester: { id: string; displayName: string }
}

const form = createForm<FormValues>({
  initialValues: {
    addressee: { id: '', displayName: '' },
    amount: '',
    comment: '',
    currency: Currency.Amd,
    requester: { id: '', displayName: '' },
  },
  validate: rules.config(() => ({
    amount: rules.required('Amount is required'),
  })),
})

const createDebtFx = attach({
  source: form.$values,
  effect: (values) =>
    api.createTransaction({
      addresseeId: values.addressee.id,
      requesterId: values.requester.id,
      amount: Number(values.amount),
      comment: values.comment,
      currency: values.currency,
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

export const createTransactionScreenModel = {
  form,

  '@@unitShape': () => ({
    isPending: $isPending,
  }),
}
