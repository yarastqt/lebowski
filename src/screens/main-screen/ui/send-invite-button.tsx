import { FC } from 'react'

import { Plus } from '@app/shared/icons'
import { Route, useNavigation } from '@app/shared/navigation'
import { useTheme } from '@app/shared/theme'
import { TextButton } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

export const SendInviteButton: FC = () => {
  const theme = useTheme()

  const { navigate } = useNavigation()

  return (
    <TextButton
      after={<Plus color={theme.color.textSecondary} size={24} />}
      onPress={() => navigate(Route.SendInvite)}
    >
      <Trans>Invite</Trans>
    </TextButton>
  )
}
