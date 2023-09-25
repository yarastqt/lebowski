import { FC, ReactNode, useCallback } from 'react'
import { Text } from 'react-native'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { createStyles, useTheme } from '~/shared/theme'

export interface BottomNavigationButtonProps {
  children: ReactNode
  icon: FC<{ size: number; color: string }>
  isActive: boolean
  onPress: () => void
}

export const BottomNavigationButton: FC<BottomNavigationButtonProps> = (props) => {
  const { children, icon: ButtonIcon, isActive, onPress } = props

  const styles = useStyles()
  const theme = useTheme()

  const scale = useSharedValue(1)

  const onPressIn = useCallback(() => {
    if (!isActive) {
      scale.value = withSpring(0.9)
    }
  }, [isActive])

  const onPressOut = useCallback(() => {
    if (!isActive) {
      scale.value = withSpring(1)
    }
  }, [isActive])

  const rootStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  }, [])

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={styles.root}>
      <Animated.View style={[styles.inner, rootStyles]}>
        <ButtonIcon
          size={24}
          color={isActive ? theme.color.statusPositive : theme.color.textSecondary}
        />
        <Text style={[styles.text, isActive && styles.text$isActive]}>{children}</Text>
      </Animated.View>
    </Pressable>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    flex: 1,
  },

  inner: {
    alignItems: 'center',
    gap: 4,
    height: 58,
    justifyContent: 'center',
    width: '100%',
  },

  text: {
    ...theme.typography.textS,
    color: theme.color.textSecondary,
  },

  text$isActive: {
    color: theme.color.statusPositive,
  },
}))
