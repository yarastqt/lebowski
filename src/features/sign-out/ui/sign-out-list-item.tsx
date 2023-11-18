import { useUnit } from 'effector-react'
import { FC } from 'react'

import { SignOut } from '@app/shared/icons'
import { useTheme } from '@app/shared/theme'
import { ListItem } from '@app/shared/ui'

import { signOutModel } from '../model'

export const SignOutListItem: FC = () => {
  const { onSignOutPress } = useUnit(signOutModel)

  const theme = useTheme()

  return (
    <ListItem
      before={<SignOut color={theme.color.statusNegative} size={24} />}
      onPress={onSignOutPress}
      title="Sign out"
      variant="danger"
    />
  )
}
