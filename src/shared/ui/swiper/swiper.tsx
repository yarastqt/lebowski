import * as Haptics from 'expo-haptics'
import { FC, useCallback, useState } from 'react'
import { Insets, Pressable } from 'react-native'
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  RotateInUpRight,
  RotateOutUpRight,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { Swap } from '@app/shared/icons'
import { createStyles, useTheme } from '@app/shared/theme'

export interface SwiperProps {
  from: string
  to: string
  onChange: (payload: { from: string; to: string }) => void
}

const PRESS_HIT_SLOP: Insets = { bottom: 20, left: 48, right: 48, top: 20 }

export const Swiper: FC<SwiperProps> = (props) => {
  const { from, to, onChange } = props

  const theme = useTheme()
  const styles = useStyles()

  const [keys, setKeys] = useState({ from: 0, to: 1 })
  const backgroundColor = useSharedValue(0)

  const onPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    setKeys((keys) => ({ from: ~keys.from, to: ~keys.to }))

    onChange({ from: to, to: from })
  }, [from, to])

  const onPressIn = useCallback(() => {
    backgroundColor.value = withSpring(1)
  }, [])

  const onPressOut = useCallback(() => {
    backgroundColor.value = withSpring(0)
  }, [])

  const rootStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundColor.value,
      [0, 1],
      [theme.color.defaultBgBase, theme.color.defaultBgPressed],
    ),
  }))

  return (
    <Animated.View style={[styles.root, rootStyles]}>
      <Animated.Text
        ellipsizeMode="tail"
        entering={FadeInRight}
        exiting={FadeOutRight}
        key={`${from}${keys.from}`}
        numberOfLines={1}
        style={styles.text}
      >
        {from}
      </Animated.Text>

      <Pressable
        hitSlop={PRESS_HIT_SLOP}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.swap}
      >
        <Animated.View
          entering={RotateInUpRight}
          exiting={RotateOutUpRight}
          key={`${keys.from}${keys.to}`}
        >
          <Swap color={theme.color.textSecondary} size={24} />
        </Animated.View>
      </Pressable>

      <Animated.Text
        ellipsizeMode="tail"
        entering={FadeInLeft}
        exiting={FadeOutLeft}
        key={`${to}${keys.to}`}
        numberOfLines={1}
        style={styles.text}
      >
        {to}
      </Animated.Text>
    </Animated.View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 16,
    height: 64,
    paddingHorizontal: 20,
  },

  swap: {
    position: 'relative',
    zIndex: 1,
  },

  text: {
    ...theme.typography.textM,
    color: theme.color.textPrimary,
    flex: 1,
    flexGrow: 1,
    textAlign: 'center',
  },
}))
