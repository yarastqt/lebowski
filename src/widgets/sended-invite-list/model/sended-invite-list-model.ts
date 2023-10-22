import { attach, createEvent, createStore, sample } from 'effector'

import { type Invite, api } from '@app/shared/api'
import { sessionModel } from '@app/shared/session'

const widgetMounted = createEvent()

const $invites = createStore<Invite[]>([])

const getSendedInviteListFx = attach({
  source: sessionModel.$user,
  effect: (user) =>
    api.getSendedInviteList({
      userId: user.id,
    }),
})

sample({
  clock: widgetMounted,
  target: getSendedInviteListFx,
})

sample({
  clock: getSendedInviteListFx.doneData,
  target: $invites,
})

export const sendedInviteListModel = {
  '@@unitShape': () => ({
    invites: $invites,
    onWidgetMount: widgetMounted,
  }),
}
