import { FC } from 'react'
import { View } from 'react-native'

import { CircleGroupOutline } from '@app/shared/icons'
import { Route, useNavigation } from '@app/shared/navigation'
import { createStyles } from '@app/shared/theme'
import { IconButton } from '@app/shared/ui'

import { Logo } from './logo'

export const Header: FC = () => {
  const navigation = useNavigation()
  const styles = useStyles()

  const onSettingsPress = () => {
    navigation.navigate(Route.settings)
  }

  return (
    <View style={styles.root}>
      <Logo />

      <IconButton size={44} onPress={onSettingsPress}>
        <CircleGroupOutline size={24} />
      </IconButton>
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
}))
