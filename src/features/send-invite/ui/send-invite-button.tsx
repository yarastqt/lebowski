import { useUnit } from 'effector-react'
import { FC } from 'react'

import { UserPlus } from '@app/shared/icons'
import { IconButton } from '@app/shared/ui'

import { sendInviteModel } from '../model'
import { SendInviteDialog } from './send-invite-dialog'

export const SendInviteButton: FC = () => {
  const { onOpen } = useUnit(sendInviteModel.dialog)

  return (
    <>
      <IconButton size={44} onPress={onOpen}>
        <UserPlus size={24} />
      </IconButton>

      <SendInviteDialog />
    </>
  )
}
