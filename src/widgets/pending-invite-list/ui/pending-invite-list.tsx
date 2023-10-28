import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'

import { ActionButton, BottomSheet, Group, UserList, UserListItem } from '@app/shared/ui'

import { pendingInviteListModel } from '../model'

export const PendingInviteList: FC = () => {
  const {
    invites,
    isAcceptInvitePending,
    isRevokeInvitePending,
    onAcceptInvitePress,
    onRevokeInvitePress,
    onSelectedInviteReset,
    onSelectInvitePress,
    onWidgetMount,
    selectedInvite,
  } = useUnit(pendingInviteListModel)

  useEffect(() => {
    onWidgetMount()
  }, [onWidgetMount])

  if (invites.length === 0) {
    return null
  }

  return (
    <UserList title="Pending invites">
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
        <Group>
          <ActionButton isPending={isAcceptInvitePending} onPress={onAcceptInvitePress}>
            Accept invite
          </ActionButton>
          <ActionButton isPending={isRevokeInvitePending} onPress={onRevokeInvitePress}>
            Reject invite
          </ActionButton>
        </Group>
      </BottomSheet>
    </UserList>
  )
}
