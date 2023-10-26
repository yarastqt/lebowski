import { attach, createEffect, createEvent, createStore, sample, scopeBind } from 'effector'
import { invariant } from 'ts-invariant'

import { type Invite, api } from '@app/shared/api'
import { scope } from '@app/shared/config'
import { sessionModel } from '@app/shared/session'

const widgetMounted = createEvent()

const invitesUpdated = createEvent<Invite[]>()
const inviteSelected = createEvent<Invite>()
const selectedInviteReseted = createEvent()
const inviteRevoked = createEvent<string>()

const $invites = createStore<Invite[]>([])
const $selectedInvite = createStore<Invite | null>(null)

const subscribeToPendingInviteListFx = attach({
  source: sessionModel.$user,
  effect: (user) => {
    invariant(user?.id, 'User is not defined')

    api.subscribeToPendingInviteList({
      params: { userId: user.id },
      onData: (invites) => {
        scopeBind(invitesUpdated, { scope })(invites)
      },
    })
  },
})

const rejectOrRevokeInviteFx = createEffect((params: { inviteId: string }) => {
  return api.rejectOrRevokeInvite(params)
})

const $isRevokeInvitePending = rejectOrRevokeInviteFx.pending

sample({
  clock: widgetMounted,
  target: subscribeToPendingInviteListFx,
})

sample({
  clock: invitesUpdated,
  target: $invites,
})

sample({
  clock: inviteSelected,
  target: $selectedInvite,
})

sample({
  clock: inviteRevoked,
  fn: (inviteId) => ({ inviteId }),
  target: rejectOrRevokeInviteFx,
})

sample({
  clock: [selectedInviteReseted, rejectOrRevokeInviteFx.done],
  target: [$selectedInvite.reinit],
})

export const pendingInviteListModel = {
  '@@unitShape': () => ({
    invites: $invites,
    isRevokeInvitePending: $isRevokeInvitePending,
    onInviteRevoke: inviteRevoked,
    onInviteSelect: inviteSelected,
    onSelectedInviteReset: selectedInviteReseted,
    onWidgetMount: widgetMounted,
    selectedInvite: $selectedInvite,
  }),
}
