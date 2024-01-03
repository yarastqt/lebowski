import { attach, createEvent, createStore, sample, scopeBind } from 'effector'
import { createGate } from 'effector-react'

import { RelationshipWallet, api } from '@app/shared/api'
import { scope } from '@app/shared/config'

const gate = createGate<{ friendId: string }>()

const walletsUpdated = createEvent<RelationshipWallet[]>()
const loadingFinished = createEvent()

const $wallets = createStore<RelationshipWallet[]>([])
const $isLoading = createStore(true)

const subscribeToWalletListFx = attach({
  source: [gate.state, $isLoading],
  effect: ([{ friendId }, isLoading]) => {
    // TODO: Unsub when gate is close.
    api.subscribeToRelationshipWallet({
      params: { friendId },
      onData: (wallets) => {
        if (isLoading) {
          scopeBind(loadingFinished, { scope })()
        }

        scopeBind(walletsUpdated, { scope })(wallets)
      },
    })
  },
})

sample({
  clock: gate.open,
  target: subscribeToWalletListFx,
})

sample({
  clock: loadingFinished,
  fn: () => false,
  target: $isLoading,
})

sample({
  clock: walletsUpdated,
  target: $wallets,
})

export const friendScreenModel = {
  gate,

  '@@unitShape': () => ({
    isLoading: $isLoading,
    wallets: $wallets,
  }),
}
