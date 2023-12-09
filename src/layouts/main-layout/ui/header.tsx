import { FC } from 'react'
import { View } from 'react-native'

import { Bell, PersonOutline } from '@app/shared/icons'
import { Route, useNavigation } from '@app/shared/navigation'
import { createStyles } from '@app/shared/theme'
import { IconButton, Logo } from '@app/shared/ui'

export const Header: FC = () => {
  const navigation = useNavigation()
  const styles = useStyles()

  return (
    <View style={styles.root}>
      <Logo />

      <View style={styles.actions}>
        <IconButton size={44} onPress={() => navigation.navigate(Route.Activity)}>
          <Bell size={24} />
        </IconButton>
        <IconButton size={44} onPress={() => navigation.navigate(Route.Profile)}>
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
