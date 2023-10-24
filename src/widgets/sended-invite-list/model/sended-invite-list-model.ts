import { attach, createEffect, createEvent, createStore, sample } from 'effector'

import { type Invite, api } from '@app/shared/api'
import { sessionModel } from '@app/shared/session'

const widgetMounted = createEvent()
const inviteSelected = createEvent<Invite>()
const selectedInviteReseted = createEvent()
const inviteRevoked = createEvent<string>()

const $invites = createStore<Invite[]>([])
const $selectedInvite = createStore<Invite | null>(null)

const getSendedInviteListFx = attach({
  source: sessionModel.$user,
  effect: (user) =>
    api.getSendedInviteList({
      // @ts-expect-error (TODO: Add uid assert)
      userId: user.id,
    }),
})

const rejectOrRevokeInviteFx = createEffect((params: { inviteId: string }) => {
  return api.rejectOrRevokeInvite(params)
})

const $isRevokeInvitePending = rejectOrRevokeInviteFx.pending

sample({
  clock: widgetMounted,
  target: getSendedInviteListFx,
})

sample({
  clock: getSendedInviteListFx.doneData,
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

export const sendedInviteListModel = {
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
