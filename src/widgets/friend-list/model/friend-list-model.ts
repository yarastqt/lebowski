import { attach, createEvent, createStore, sample, scopeBind } from 'effector'
import { invariant } from 'ts-invariant'

import { Friend, api } from '@app/shared/api'
import { scope } from '@app/shared/config'
import { sessionModel } from '@app/shared/session'

const widgetMounted = createEvent()

const selectedFriendReseted = createEvent()
const selectFriendPressed = createEvent<Friend>()

const friendsUpdated = createEvent<Friend[]>()
const loadingFinished = createEvent()

const $friends = createStore<Friend[]>([])
const $selectedFriend = createStore<Friend | null>(null)
const $isLoading = createStore(true)

const subscribeToPendingInviteListFx = attach({
  source: [sessionModel.$user, $isLoading],
  effect: ([user, isLoading]) => {
    invariant(user?.id, 'User is not defined')

    api.subscribeToFriendList({
      params: { userId: user.id },
      onData: (friends) => {
        if (isLoading) {
          scopeBind(loadingFinished, { scope })()
        }

        scopeBind(friendsUpdated, { scope })(friends)
      },
    })
  },
})

sample({
  clock: widgetMounted,
  target: subscribeToPendingInviteListFx,
})

sample({
  clock: loadingFinished,
  fn: () => false,
  target: $isLoading,
})

sample({
  clock: friendsUpdated,
  target: $friends,
})

sample({
  clock: selectFriendPressed,
  target: $selectedFriend,
})

sample({
  clock: [selectedFriendReseted],
  target: [$selectedFriend.reinit],
})

export const friendListModel = {
  '@@unitShape': () => ({
    friends: $friends,
    isLoading: $isLoading,
    onSelectedFriendReset: selectedFriendReseted,
    onSelectFriendPress: selectFriendPressed,
    onWidgetMount: widgetMounted,
    selectedFriend: $selectedFriend,
  }),
}
