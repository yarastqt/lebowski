import { useUnit } from 'effector-react'
import { FC, useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { MoreVertical } from '@app/shared/icons'
import { sessionModel } from '@app/shared/session'
import { createStyles, useTheme } from '@app/shared/theme'
import { Avatar } from '@app/shared/ui'

export const ProfileInfo: FC = () => {
  const theme = useTheme()
  const styles = useStyles()

  const { user } = useUnit(sessionModel)

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
      [theme.color.defaultBgBase, theme.color.defaultBgPressed],
    ),
  }))

  if (!user) {
    return null
  }

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.root, rootStyles]}>
        <Avatar displayName={user.displayName} size={64} />

        <View style={styles.heading}>
          <Text style={styles.displayName}>{user.displayName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <MoreVertical size={24} color={theme.color.textSecondary} />
      </Animated.View>
    </Pressable>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  heading: {
    gap: 2,
    marginRight: 'auto',
  },

  displayName: {
    ...theme.typography.textL,
    color: theme.color.textPrimary,
  },

  email: {
    ...theme.typography.textM,
    color: theme.color.textSecondary,
  },
}))
