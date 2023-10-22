import { useUnit } from 'effector-react'
import { FC } from 'react'
import { View } from 'react-native'

import { ActionButton, TextField } from '@app/shared/ui'

import { sendInviteModel } from '../model'

export const SendInviteForm: FC = () => {
  const { sendInvitePress, email, isPending, isValid, onEmailChange } = useUnit(sendInviteModel)

  return (
    <View
      style={{
        gap: 24,
        borderWidth: 1,
        borderColor: '#fff',
        padding: 8,
        borderRadius: 24,
        borderStyle: 'dashed',
      }}
    >
      <TextField
        keyboardType="email-address"
        label="Email"
        onChange={onEmailChange}
        value={email}
      />

      <ActionButton isDisabled={!isValid} isPending={isPending} onPress={sendInvitePress}>
        Send invite
      </ActionButton>
    </View>
  )
}
