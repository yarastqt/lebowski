import { FC, ReactNode, useCallback, useEffect } from 'react'
import { Pressable, Text } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { createStyles, useTheme } from '@app/shared/theme'

export interface ActionButtonProps {
  children: ReactNode
  isDisabled?: boolean
  isPending?: boolean
  onPress: () => void
}

export const ActionButton: FC<ActionButtonProps> = (props) => {
  const { children, isDisabled, isPending, onPress } = props

  const theme = useTheme()
  const styles = useStyles()

  const scale = useSharedValue(1)
  const backgroundColor = useSharedValue(0)
  const textColor = useSharedValue(0)

  const onPressIn = useCallback(() => {
    scale.value = withSpring(0.975)
    backgroundColor.value = withSpring(1)
  }, [])

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1)
    backgroundColor.value = withSpring(0)
  }, [])

  const rootStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      backgroundColor.value,
      [0, 1, 3],
      [theme.color.brandBgBase, theme.color.brandBgPressed, theme.color.mutedBg],
    ),
  }))

  const textStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      textColor.value,
      [0, 1],
      [theme.color.brandTextOn, theme.color.mutedText],
    ),
  }))

  const onPressHandler = useCallback(() => {
    if (!isDisabled && !isPending) {
      onPress()
    }
  }, [isDisabled, isPending, onPress])

  useEffect(() => {
    backgroundColor.value = withSpring(isDisabled || isPending ? 3 : 0)
    textColor.value = withSpring(isDisabled || isPending ? 1 : 0)
  }, [isDisabled, isPending])

  return (
    <Pressable
      disabled={isDisabled || isPending}
      onPress={onPressHandler}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.root, rootStyles]}>
        <Animated.Text style={[styles.text, textStyles]}>{children}</Animated.Text>
      </Animated.View>
    </Pressable>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    height: 56,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    ...theme.typography.textL,
  },
}))
