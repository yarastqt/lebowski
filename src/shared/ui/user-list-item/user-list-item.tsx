import { FC, useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { createStyles, useTheme } from '@app/shared/theme'

export interface UserListItemProps {
  description: string
  onPress: () => void
  displayName: string
}

export const UserListItem: FC<UserListItemProps> = (props) => {
  const { description, onPress, displayName } = props

  const theme = useTheme()
  const styles = useStyles()

  const backgroundColor = useSharedValue(0)

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
      [theme.color.transparent, theme.color.defaultBgPressed],
    ),
  }))

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.root, rootStyles]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getAvatarText(displayName)}</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.title}>{displayName}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Animated.View>
    </Pressable>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  avatar: {
    height: 48,
    width: 48,
    backgroundColor: theme.color.statusPositive,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    ...theme.typography.headingM,
    color: theme.color.textPrimary,
    lineHeight: 50,
  },

  heading: {
    gap: 2,
  },

  title: {
    ...theme.typography.textL,
    color: theme.color.textPrimary,
  },

  description: {
    ...theme.typography.textM,
    color: theme.color.textSecondary,
  },
}))

function getAvatarText(displayName: string) {
  return displayName.at(0).toLocaleUpperCase()
}
