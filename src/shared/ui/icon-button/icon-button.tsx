import { FC, ReactNode, useCallback } from 'react'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import { createStyles } from '@app/shared/theme'

export interface IconButtonProps {
  children: ReactNode
  onPress: () => void
  size?: number
}

export const IconButton: FC<IconButtonProps> = (props) => {
  const { children, onPress, size } = props

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
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[rootStyles, styles.root, { width: size, height: size }]}>
        {children}
      </Animated.View>
    </Pressable>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
