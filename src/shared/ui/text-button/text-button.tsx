import { FC, ReactNode, useCallback } from 'react'
import { Insets, Pressable, Text } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import { createStyles } from '@app/shared/theme'

export interface TextButtonProps {
  after?: ReactNode
  children: ReactNode
  onPress: () => void
}

const PRESS_HIT_SLOP: Insets = { bottom: 16, left: 16, right: 16, top: 16 }

export const TextButton: FC<TextButtonProps> = (props) => {
  const { after, children, onPress } = props

  const styles = useStyles()
  const scale = useSharedValue(1)

  const onPressIn = useCallback(() => {
    scale.value = withSpring(0.9)
  }, [])

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1)
  }, [])

  const rootStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  return (
    <Pressable
      hitSlop={PRESS_HIT_SLOP}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[rootStyles, styles.root]}>
        <Text style={styles.text}>{children}</Text>
        {after}
      </Animated.View>
    </Pressable>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  text: {
    ...theme.typography.textM,
    color: theme.color.textSecondary,
  },
}))
