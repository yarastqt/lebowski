import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'

import { ActionButton, BottomSheet, Group, UserList, UserListItem } from '@app/shared/ui'

import { friendListModel } from '../model'

export const FriendList: FC = () => {
  const { friends, onSelectedFriendReset, onSelectFriendPress, onWidgetMount, selectedFriend } =
    useUnit(friendListModel)

  useEffect(() => {
    onWidgetMount()
  }, [onWidgetMount])

  if (friends.length === 0) {
    return null
  }

  return (
    <UserList title="Friends">
      {friends.map((friend) => (
        <UserListItem
          key={friend.id}
          description={friend.email}
          onPress={() => onSelectFriendPress(friend)}
          displayName={friend.email}
        />
      ))}

      <BottomSheet
        isOpen={selectedFriend !== null}
        onClose={onSelectedFriendReset}
        title={selectedFriend?.displayName}
      >
        <Group>
          <ActionButton onPress={() => null}>Remove from friends</ActionButton>
        </Group>
      </BottomSheet>
    </UserList>
  )
}
