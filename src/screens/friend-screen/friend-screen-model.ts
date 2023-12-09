import { attach, createEvent, createStore, sample, scopeBind } from 'effector'
import { createGate } from 'effector-react'

import { RelationshipWallet, api } from '@app/shared/api'
import { scope } from '@app/shared/config'

const gate = createGate<{ friendId: string }>()

const walletsUpdated = createEvent<RelationshipWallet[]>()
const $wallets = createStore<RelationshipWallet[]>([])

const subscribeToWalletListFx = attach({
  source: gate.state,
  effect: ({ friendId }) => {
    // TODO: Unsub when gate is close.
    api.subscribeToRelationshipWallet({
      params: { friendId },
      onData: (wallets) => {
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
  clock: walletsUpdated,
  target: $wallets,
})

export const friendScreenModel = {
  gate,

  '@@unitShape': () => ({
    wallets: $wallets,
  }),
}
