import { FC, ReactNode } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn, FadeInLeft, FadeInRight } from 'react-native-reanimated'

import { ArrowShortLeft } from '@app/shared/icons'
import { useNavigation } from '@app/shared/navigation'
import { createStyles } from '@app/shared/theme'
import { IconButton } from '@app/shared/ui'

export interface HeaderProps {
  actions?: ReactNode
  children: ReactNode
}

export const Header: FC<HeaderProps> = (props) => {
  const { actions, children } = props

  const navigation = useNavigation()
  const styles = useStyles()

  const isHasActions = actions !== undefined

  return (
    <View style={[styles.root, isHasActions && styles.rootWithActions]}>
      <Animated.View entering={FadeInRight.delay(150).springify()}>
        <IconButton size={44} onPress={() => navigation.goBack()}>
          <ArrowShortLeft size={24} />
        </IconButton>
      </Animated.View>

      <Animated.Text
        entering={FadeIn.delay(300).springify()}
        style={[styles.title, isHasActions && styles.titleWithActions]}
      >
        {children}
      </Animated.Text>

      <Animated.View entering={FadeInLeft.delay(150).springify()} style={styles.actions}>
        {actions}
      </Animated.View>
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

  rootWithActions: {
    paddingRight: 14,
  },

  title: {
    ...theme.typography.headingM,
    color: theme.color.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginRight: 34,
  },

  titleWithActions: {
    marginRight: 0,
  },

  actions: {
    flexDirection: 'row',
  },
}))
