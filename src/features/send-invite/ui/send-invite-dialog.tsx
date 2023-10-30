import { useUnit } from 'effector-react'
import { FC } from 'react'

import { ActionButton, BottomSheet, Group, TextField } from '@app/shared/ui'

import { sendInviteModel } from '../model'

export const SendInviteDialog: FC = () => {
  const { isOpen, onClose } = useUnit(sendInviteModel.dialog)
  const { sendInviteSubmit, email, isPending, isValid, onEmailChange } = useUnit(sendInviteModel)

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Add friend">
      <Group>
        <TextField
          autoFocus
          keyboardType="email-address"
          label="Email"
          onChange={onEmailChange}
          value={email}
        />

        <ActionButton isDisabled={!isValid} isPending={isPending} onPress={sendInviteSubmit}>
          Send invite
        </ActionButton>
      </Group>
    </BottomSheet>
  )
}
