import { FC, ReactNode, useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { createStyles, useTheme } from '@app/shared/theme'

export interface ListItemProps {
  after?: ReactNode
  before?: ReactNode
  description?: string
  onPress: () => void
  title: ReactNode
  variant?: 'default' | 'danger'
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { after, before, description, onPress, title, variant } = props

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
      [theme.color.defaultBgBase, theme.color.defaultBgPressed],
    ),
  }))

  const isDangerVariant = variant === 'danger'

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.root, rootStyles]}>
        {before}

        <View style={styles.heading}>
          <Text style={[styles.title, isDangerVariant && styles.title$isDanger]}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>

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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
  },

  heading: {
    gap: 2,
    flex: 1,
  },

  title: {
    ...theme.typography.textL,
    color: theme.color.textPrimary,
  },

  title$isDanger: {
    color: theme.color.statusNegative,
  },

  description: {
    ...theme.typography.textM,
    color: theme.color.textSecondary,
  },
}))
