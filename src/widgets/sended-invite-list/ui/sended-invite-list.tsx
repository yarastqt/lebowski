import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'

import { UserList, UserListItem } from '@app/shared/ui'

import { sendedInviteListModel } from '../model'

export const SendedInviteList: FC = () => {
  const { invites, onWidgetMount } = useUnit(sendedInviteListModel)

  useEffect(() => {
    onWidgetMount()
  }, [onWidgetMount])

  if (invites.length === 0) {
    return null
  }

  return (
    <UserList title="Sended invites">
      {invites.map((invite) => (
        <UserListItem
          key={invite.id}
          description={invite.email}
          onPress={() => null}
          displayName={invite.email}
        />
      ))}
    </UserList>
  )
}
