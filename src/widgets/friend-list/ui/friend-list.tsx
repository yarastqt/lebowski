import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'

import { Route } from '@app/shared/navigation'
import { UserList, UserListItem } from '@app/shared/ui'
import { useNavigation } from '@react-navigation/native'

import { friendListModel } from '../model'

export const FriendList: FC = () => {
  const navigation = useNavigation()
  const { friends, onWidgetMount } = useUnit(friendListModel)

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
          onPress={() => {
            navigation.navigate(Route.friend, {
              displayName: friend.displayName,
              id: friend.id,
            })
          }}
          displayName={friend.displayName}
        />
      ))}
    </UserList>
  )
}
