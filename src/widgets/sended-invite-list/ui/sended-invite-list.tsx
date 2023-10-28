import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'

import { ActionButton, BottomSheet, UserList, UserListItem } from '@app/shared/ui'

import { sendedInviteListModel } from '../model'

export const SendedInviteList: FC = () => {
  const {
    invites,
    isRevokeInvitePending,
    onRevokeInvitePress,
    onSelectedInviteReset,
    onSelectInvitePress,
    onWidgetMount,
    selectedInvite,
  } = useUnit(sendedInviteListModel)

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
          onPress={() => onSelectInvitePress(invite)}
          displayName={invite.email}
        />
      ))}

      <BottomSheet
        isOpen={selectedInvite !== null}
        onClose={onSelectedInviteReset}
        title={selectedInvite?.displayName}
      >
        <ActionButton isPending={isRevokeInvitePending} onPress={onRevokeInvitePress}>
          Revoke invite
        </ActionButton>
      </BottomSheet>
    </UserList>
  )
}
