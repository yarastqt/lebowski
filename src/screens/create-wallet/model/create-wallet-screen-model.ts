import { attach, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { Currency, api } from '@app/shared/api'
import { createForm } from '@app/shared/lib/effector-form'
import { navigationModel } from '@app/shared/navigation'

interface FormValues {
  currency: Currency
  friendId: string
}

const gate = createGate<{ friendId: string }>()

const form = createForm<FormValues>({
  initialValues: {
    currency: Currency.Unknown,
    friendId: '',
  },
})

const $availableWallets = createStore([Currency.Amd, Currency.Rub, Currency.Usd])

const createWalletFx = attach({
  source: form.$values,
  effect: (values) =>
    api.createWallet({
      currency: values.currency,
      friendId: values.friendId,
    }),
})

const $isPending = createWalletFx.pending

sample({
  clock: gate.open,
  fn: ({ friendId }) => ({ field: 'friendId', value: friendId }),
  target: form.setValue,
})

sample({
  clock: form.validated,
  filter: $isPending.map((isPending) => !isPending),
  target: createWalletFx,
})

sample({
  clock: createWalletFx.done,
  target: navigationModel.back,
})

createWalletFx.failData.watch((error) => {
  console.log('>>> error', error)
})

export const createWalletScreenModel = {
  form,
  gate,
  $isPending,
  $availableWallets,
}
