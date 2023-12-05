import * as Haptics from 'expo-haptics'
import { FC, useEffect, useRef, useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { EyeOffOutline, EyeOutline } from '@app/shared/icons'
import { createStyles, useTheme } from '@app/shared/theme'
import { useBottomSheetInternal } from '@gorhom/bottom-sheet'

import { IconButton } from '../icon-button'

export interface TextFieldProps
  extends Pick<
    TextInputProps,
    'secureTextEntry' | 'keyboardType' | 'value' | 'autoFocus' | 'defaultValue'
  > {
  isReadOnly?: boolean
  label: string
  onChange?: (value: string) => void
}

export const TextField: FC<TextFieldProps> = (props) => {
  const { defaultValue, isReadOnly, label, onChange, secureTextEntry, value, ...otherProps } = props

  const bottomSheetInternal = useBottomSheetInternal(true)

  const theme = useTheme()
  const styles = useStyles()

  const [isSecureText, setSecureText] = useState(secureTextEntry)
  const inputRef = useRef<TextInput>(null)

  const borderColor = useSharedValue(0)
  const labelPosition = useSharedValue(0)

  const onFocus = () => {
    if (bottomSheetInternal) {
      bottomSheetInternal.shouldHandleKeyboardEvents.value = true
    }

    borderColor.value = withSpring(1)
    labelPosition.value = withSpring(1)
  }

  const onBlur = () => {
    if (bottomSheetInternal) {
      bottomSheetInternal.shouldHandleKeyboardEvents.value = false
    }

    borderColor.value = withSpring(0)
    labelPosition.value = withSpring(value ? 1 : 0, {
      stiffness: 180,
      damping: 25,
      mass: 1,
    })
  }

  const togglePasswordVisibility = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    setSecureText(!isSecureText)
    inputRef.current?.focus()
  }

  const rootStyles = useAnimatedStyle(() => ({
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

  useEffect(() => {
    if (defaultValue) {
      labelPosition.value = withSpring(1)
    }
  }, [defaultValue])

  const EyeIcon = isSecureText ? EyeOutline : EyeOffOutline

  return (
    <Animated.View style={[styles.root, rootStyles]}>
      <Animated.Text style={[styles.label, labelStyles]}>{label}</Animated.Text>

      <TextInput
        {...otherProps}
        autoCapitalize="none"
        defaultValue={defaultValue}
        editable={!isReadOnly}
        keyboardAppearance={theme.colorScheme}
        onBlur={onBlur}
        onChangeText={onChange}
        onFocus={onFocus}
        ref={inputRef}
        secureTextEntry={isSecureText}
        selectionColor={theme.color.textPrimary}
        style={styles.input}
        value={value}
      />

      {secureTextEntry && (
        <View style={styles.after}>
          <IconButton onPress={togglePasswordVisibility} size={44}>
            <EyeIcon size={24} color={theme.color.textSecondary} />
          </IconButton>
        </View>
      )}
    </Animated.View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    height: 64,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.color.defaultBorder,
  },

  label: {
    ...theme.typography.textM,
    color: theme.color.textSecondary,
    position: 'absolute',
  },

  input: {
    ...theme.typography.textM,
    borderRadius: 18,
    color: theme.color.textPrimary,
    height: 52,
    paddingHorizontal: 20,
    paddingTop: 29,
  },

  after: {
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 0,
  },
}))
