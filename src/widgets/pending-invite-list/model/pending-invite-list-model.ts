import { attach, createEffect, createEvent, createStore, sample, scopeBind } from 'effector'
import { invariant } from 'ts-invariant'

import { type Invite, api } from '@app/shared/api'
import { scope } from '@app/shared/config'
import { sessionModel } from '@app/shared/session'

const widgetMounted = createEvent()

const invitesUpdated = createEvent<Invite[]>()
const selectedInviteReseted = createEvent()

const selectInvitePress = createEvent<Invite>()
const acceptInvitePressed = createEvent()
const revokeInvitePressed = createEvent()

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

const acceptInviteFx = createEffect((params: { inviteId: string }) => {
  return api.acceptInvite(params)
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
  clock: selectInvitePress,
  target: $selectedInvite,
})

sample({
  clock: revokeInvitePressed,
  source: $selectedInvite,
  filter: Boolean,
  fn: (invite) => ({ inviteId: invite.id }),
  target: rejectOrRevokeInviteFx,
})

sample({
  clock: acceptInvitePressed,
  source: $selectedInvite,
  filter: Boolean,
  fn: ({ id }) => ({ inviteId: id }),
  target: acceptInviteFx,
})

sample({
  clock: [selectedInviteReseted, rejectOrRevokeInviteFx.done],
  target: [$selectedInvite.reinit],
})

export const pendingInviteListModel = {
  '@@unitShape': () => ({
    invites: $invites,
    isRevokeInvitePending: $isRevokeInvitePending,
    onAcceptInvitePress: acceptInvitePressed,
    onRevokeInvitePress: revokeInvitePressed,
    onSelectedInviteReset: selectedInviteReseted,
    onSelectInvitePress: selectInvitePress,
    onWidgetMount: widgetMounted,
    selectedInvite: $selectedInvite,
  }),
}
