import { attach, createEvent, createStore, sample, scopeBind } from 'effector'
import { createGate } from 'effector-react'

import { Transaction, api } from '@app/shared/api'
import { scope } from '@app/shared/config'

const gate = createGate<{ friendId: string }>()

const transactionUpdated = createEvent<Transaction[]>()
const $transactions = createStore<Transaction[]>([])

const subscribeToTransactionListFx = attach({
  source: gate.state,
  effect: ({ friendId }) => {
    // TODO: Unsub when gate is close.
    api.subscribeToTransactionList({
      params: { friendId },
      onData: (transactions) => {
        scopeBind(transactionUpdated, { scope })(transactions)
      },
    })
  },
})

sample({
  clock: gate.open,
  target: subscribeToTransactionListFx,
})

sample({
  clock: transactionUpdated,
  target: $transactions,
})

export const transactionScreenModel = {
  gate,

  '@@unitShape': () => ({
    transactions: $transactions,
  }),
}
