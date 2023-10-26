import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'

import { ActionButton, BottomSheet, Group, UserList, UserListItem } from '@app/shared/ui'

import { pendingInviteListModel } from '../model'

export const PendingInviteList: FC = () => {
  const {
    invites,
    isRevokeInvitePending,
    onInviteRevoke,
    onInviteSelect,
    onSelectedInviteReset,
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
          onPress={() => onInviteSelect(invite)}
          displayName={invite.email}
        />
      ))}

      <BottomSheet
        isOpen={selectedInvite !== null}
        onClose={onSelectedInviteReset}
        title={selectedInvite?.displayName}
      >
        <Group>
          <ActionButton isPending={isRevokeInvitePending} onPress={() => null}>
            Accept invite
          </ActionButton>
          <ActionButton
            isPending={isRevokeInvitePending}
            // @ts-expect-error (TODO: Create component with content)
            onPress={() => onInviteRevoke(selectedInvite?.id)}
          >
            Reject invite
          </ActionButton>
        </Group>
      </BottomSheet>
    </UserList>
  )
}
