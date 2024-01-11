import { FC, useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { createStyles, useTheme } from '@app/shared/theme'

import { Avatar } from '../avatar'

export interface UserListItemProps {
  avatarUrl: string
  description: string
  displayName: string
  onPress: () => void
}

export const UserListItem: FC<UserListItemProps> = (props) => {
  const { avatarUrl, description, onPress, displayName } = props

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
        <Avatar displayName={displayName} size={48} url={avatarUrl} />

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
