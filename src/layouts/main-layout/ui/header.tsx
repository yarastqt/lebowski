import { FC } from 'react'
import { View } from 'react-native'

import { CircleGroupOutline } from '@app/shared/icons'
import { createStyles } from '@app/shared/theme'
import { IconButton } from '@app/shared/ui'

import { Logo } from './logo'

export const Header: FC = () => {
  const styles = useStyles()

  return (
    <View style={styles.root}>
      <Logo />

      <IconButton size={44} onPress={() => null}>
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
