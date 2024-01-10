import { ReactNode, useEffect, useState } from 'react'
import { Dimensions, Modal, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native'
import Animated, {
  Easing,
  FadeIn,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { ArrowShortBottom, Check } from '@app/shared/icons'
import { createStyles, useTheme } from '@app/shared/theme'

import { List } from '../../list'
import { ListItem } from '../../list-item'

export interface PickerProps<T> {
  items: { id: string; title: string }[]
  label: ReactNode
  onChange: (value: T) => void
  title: ReactNode
  value: T
}

export function Picker<T>(props: PickerProps<T>) {
  const { items, label, onChange, title, value } = props

  const theme = useTheme()
  const styles = useStyles()

  const [isOpen, setOpen] = useState(false)

  const borderColor = useSharedValue(0)
  const backgroundColor = useSharedValue(0)
  const labelPosition = useSharedValue(0)
  const chevronPosition = useSharedValue(0)

  const onSelect = (id: string) => {
    setOpen(false)

    if (id !== value) {
      onChange(id as T)
    }
  }

  const onPressIn = () => {
    backgroundColor.value = withTiming(1, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    })
  }

  const onPressOut = () => {
    backgroundColor.value = withTiming(0, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    })
  }

  const fieldStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundColor.value,
      [0, 1],
      [theme.color.transparent, theme.color.defaultBgPressed],
    ),
    borderColor: interpolateColor(
      borderColor.value,
      [0, 1],
      [theme.color.defaultBorder, theme.color.brandBorder],
    ),
  }))

  const labelStyles = useAnimatedStyle(() => ({
    top: interpolate(labelPosition.value, [0, 1], [20, 10]),
    left: interpolate(labelPosition.value, [0, 1], [20, 16]),
    transform: [{ scale: interpolate(labelPosition.value, [0, 1], [1, 0.875]) }],
  }))

  const chevronStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(chevronPosition.value, [0, 1], [0, 180])}deg` }],
  }))

  const displayValue = items.find((item) => item.id === value)

  useEffect(() => {
    if (displayValue) {
      labelPosition.value = withTiming(1, {
        duration: 150,
        easing: Easing.inOut(Easing.ease),
      })
    }
  }, [displayValue])

  useEffect(() => {
    borderColor.value = withTiming(isOpen ? 1 : 0, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    })
    chevronPosition.value = withTiming(isOpen ? 1 : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    })
  }, [isOpen])

  return (
    <View style={styles.root}>
      <Pressable onPress={() => setOpen(true)} onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[styles.field, fieldStyles]}>
          <Animated.Text style={[styles.label, labelStyles]}>{label}</Animated.Text>
          {displayValue && <Animated.Text style={styles.value}>{displayValue.title}</Animated.Text>}

          <Animated.View style={chevronStyles}>
            <ArrowShortBottom size={24} color={theme.color.textSecondary} />
          </Animated.View>
        </Animated.View>
      </Pressable>

      <Modal animationType="slide" visible={isOpen} transparent>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <Animated.View entering={FadeIn.delay(200)} style={styles.underlay} />
        </TouchableWithoutFeedback>

        <View style={styles.container}>
          <Text style={styles.heading}>{title}</Text>
          <List listStyle="plain">
            {items.map((item) => (
              <ListItem
                after={value === item.id && <Check size={24} />}
                key={item.id}
                onPress={() => onSelect(item.id)}
                title={item.title}
                variant="default"
              />
            ))}
          </List>
        </View>
      </Modal>
    </View>
  )
}

const WINDOW_HEIGHT = Dimensions.get('window').height

const useStyles = createStyles((theme) => ({
  root: {
    gap: 8,
  },

  field: {
    alignItems: 'center',
    borderColor: theme.color.defaultBorder,
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  label: {
    ...theme.typography.textM,
    color: theme.color.textSecondary,
    position: 'absolute',
  },

  value: {
    ...theme.typography.textM,
    color: theme.color.textPrimary,
    marginTop: 20,
  },

  underlay: {
    backgroundColor: theme.color.surfaceOverlay,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  container: {
    backgroundColor: theme.color.surfaceSubmerged,
    // TODO: Use built in radius.
    borderBottomEndRadius: 42,
    borderBottomStartRadius: 42,
    borderRadius: 32,
    bottom: 8,
    left: 8,
    maxHeight: WINDOW_HEIGHT * 0.6,
    overflow: 'hidden',
    padding: 24,
    position: 'absolute',
    right: 8,
  },

  heading: {
    ...theme.typography.headingM,
    color: theme.color.textPrimary,
    paddingBottom: 16,
  },
}))
