import { FC } from 'react'

import { Currency } from '@app/shared/api'
import { Plus } from '@app/shared/icons'
import { Route, useNavigation } from '@app/shared/navigation'
import { useTheme } from '@app/shared/theme'
import { TextButton } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

export interface CreateTransactionButtonProps {
  currency: Currency
  friendDisplayName: string
  friendId: string
}

export const CreateTransactionButton: FC<CreateTransactionButtonProps> = (props) => {
  const { currency, friendDisplayName, friendId } = props

  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <TextButton
      after={<Plus color={theme.color.textSecondary} size={24} />}
      onPress={() => {
        navigation.navigate(Route.CreateTransaction, {
          displayName: friendDisplayName,
          id: friendId,
          currency: currency,
        })
      }}
    >
      <Trans>Create</Trans>
    </TextButton>
  )
}
