import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'

import { ActionButton, BottomSheet, UserList, UserListItem } from '@app/shared/ui'

import { sendedInviteListModel } from '../model'

export const SendedInviteList: FC = () => {
  const {
    invites,
    isRevokeInvitePending,
    onInviteRevoke,
    onInviteSelect,
    onSelectedInviteReset,
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
          onPress={() => onInviteSelect(invite)}
          displayName={invite.email}
        />
      ))}

      <BottomSheet
        isOpen={selectedInvite !== null}
        onClose={onSelectedInviteReset}
        title={selectedInvite?.displayName}
      >
        <ActionButton
          isPending={isRevokeInvitePending}
          // @ts-expect-error (TODO: Create component with content)
          onPress={() => onInviteRevoke(selectedInvite?.id)}
        >
          Revoke invite
        </ActionButton>
      </BottomSheet>
    </UserList>
  )
}
