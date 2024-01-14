import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics'
import { FC, useEffect } from 'react'
import { Insets, Pressable } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { createStyles, useTheme } from '@app/shared/theme'

export interface SwitchProps {
  isSelected: boolean
  onChange: (isSelected: boolean) => void
}

const PRESS_HIT_SLOP: Insets = { bottom: 16, left: 16, right: 16, top: 16 }

export const Switch: FC<SwitchProps> = (props) => {
  const { isSelected, onChange } = props

  const theme = useTheme()
  const styles = useStyles()

  const selected = useSharedValue(0)
  const pressed = useSharedValue(0)

  const onPress = () => {
    impactAsync(ImpactFeedbackStyle.Light)

    onChange(!isSelected)
  }

  const onPressIn = () => {
    pressed.value = withTiming(1, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    })
  }

  const onPressOut = () => {
    pressed.value = withTiming(0, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    })
  }

  const thumbStyles = useAnimatedStyle(() => ({
    left: interpolate(selected.value, [0, 1], [2, 26]),
    backgroundColor: interpolateColor(
      selected.value,
      [0, 1],
      [theme.color.textPrimary, theme.color.brandTextOn],
    ),
    width: interpolate(pressed.value, [0, 1], [28, 32]),
    transform: [
      {
        translateX: interpolate(pressed.value, [0, 1], [0, isSelected ? -4 : 0]),
      },
    ],
  }))

  const rootStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      selected.value,
      [0, 1],
      [theme.color.brandTextOn, theme.color.textPrimary],
    ),
  }))

  useEffect(() => {
    selected.value = withTiming(isSelected ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    })
  }, [isSelected])

  return (
    <Pressable
      hitSlop={PRESS_HIT_SLOP}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.root, rootStyles]}>
        <Animated.View style={[styles.thumb, thumbStyles]} />
      </Animated.View>
    </Pressable>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    height: 32,
    width: 56,
    borderRadius: 16,
  },

  thumb: {
    ...theme.shadow.elevated50,
    top: 2,
    bottom: 2,
    height: 28,
    borderRadius: 14,
  },
}))
