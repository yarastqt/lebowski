import { useUnit } from 'effector-react'
import { FC } from 'react'

import { Plus } from '@app/shared/icons'
import { useTheme } from '@app/shared/theme'
import { TextButton } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

import { sendInviteModel } from '../model'

export const SendInviteButton: FC = () => {
  const theme = useTheme()

  const { onOpen } = useUnit(sendInviteModel.dialog)

  return (
    <TextButton after={<Plus color={theme.color.textSecondary} size={24} />} onPress={onOpen}>
      <Trans>Invite</Trans>
    </TextButton>
  )
}
