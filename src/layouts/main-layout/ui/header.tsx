import { FC, ReactNode } from 'react'
import { View } from 'react-native'

import { PersonOutline } from '@app/shared/icons'
import { Route, useNavigation } from '@app/shared/navigation'
import { createStyles } from '@app/shared/theme'
import { IconButton, Logo } from '@app/shared/ui'

export interface HeaderProps {
  actions?: ReactNode
}

export const Header: FC<HeaderProps> = (props) => {
  const { actions } = props

  const navigation = useNavigation()
  const styles = useStyles()

  const onProfilePress = () => {
    navigation.navigate(Route.Profile)
  }

  return (
    <View style={styles.root}>
      <Logo />

      <View style={styles.actions}>
        {actions}

        <IconButton size={44} onPress={onProfilePress}>
          <PersonOutline size={24} />
        </IconButton>
      </View>
    </View>
  )
}

const useStyles = createStyles(() => ({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 14,
  },

  actions: {
    flexDirection: 'row',
  },
}))
