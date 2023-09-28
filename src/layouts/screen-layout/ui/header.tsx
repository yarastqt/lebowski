import { FC, ReactNode } from 'react'
import { Text, View } from 'react-native'

import { ArrowShortLeft } from '@app/shared/icons'
import { useNavigation } from '@app/shared/navigation'
import { createStyles } from '@app/shared/theme'
import { IconButton } from '@app/shared/ui'

export interface HeaderProps {
  children: ReactNode
}

export const Header: FC<HeaderProps> = (props) => {
  const { children } = props

  const navigation = useNavigation()
  const styles = useStyles()

  const onBackPress = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.root}>
      <IconButton size={44} onPress={onBackPress}>
        <ArrowShortLeft size={24} />
      </IconButton>

      <Text style={styles.title}>{children}</Text>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 24,
  },

  title: {
    ...theme.typography.headingM,
    color: theme.color.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginRight: 34,
  },
}))
