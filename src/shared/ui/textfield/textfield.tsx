import * as Haptics from 'expo-haptics'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native'
import Animated, {
  FadeInUp,
  FadeOutUp,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { ErrorTrinagleStrong, EyeOffOutline, EyeOutline } from '@app/shared/icons'
import { createStyles, useTheme } from '@app/shared/theme'
import { useBottomSheetInternal } from '@gorhom/bottom-sheet'

import { IconButton } from '../icon-button'

export interface TextFieldProps
  extends Pick<
    TextInputProps,
    | 'autoFocus'
    | 'contextMenuHidden'
    | 'defaultValue'
    | 'keyboardType'
    | 'maxLength'
    | 'onBlur'
    | 'onFocus'
    | 'secureTextEntry'
  > {
  errorMessage?: string
  isInvalid?: boolean
  isReadOnly?: boolean
  label: ReactNode
  onChange: (value: string) => void
  value: string
}

export const TextField: FC<TextFieldProps> = (props) => {
  const {
    defaultValue,
    errorMessage,
    isInvalid,
    isReadOnly,
    label,
    onBlur,
    onChange,
    onFocus,
    secureTextEntry,
    value,
    ...otherProps
  } = props

  const bottomSheetInternal = useBottomSheetInternal(true)

  const theme = useTheme()
  const styles = useStyles()

  const [isSecureText, setSecureText] = useState(secureTextEntry)
  const inputRef = useRef<TextInput>(null)

  const borderColor = useSharedValue(0)
  const labelPosition = useSharedValue(0)

  const onFocusHandler = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (bottomSheetInternal) {
      bottomSheetInternal.shouldHandleKeyboardEvents.value = true
    }

    borderColor.value = withSpring(1)
    labelPosition.value = withSpring(1)

    onFocus?.(event)
  }

  const onBlurHandler = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (bottomSheetInternal) {
      bottomSheetInternal.shouldHandleKeyboardEvents.value = false
    }

    borderColor.value = withSpring(0)
    labelPosition.value = withSpring(value ? 1 : 0, {
      stiffness: 180,
      damping: 25,
      mass: 1,
    })

    onBlur?.(event)
  }

  const togglePasswordVisibility = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    setSecureText(!isSecureText)
    inputRef.current?.focus()
  }

  const fieldStyles = useAnimatedStyle(() => ({
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
    if (defaultValue || value) {
      labelPosition.value = withSpring(1)
    }
  }, [defaultValue, value])

  const EyeIcon = isSecureText ? EyeOutline : EyeOffOutline

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.field, fieldStyles]}>
        <Animated.Text style={[styles.label, labelStyles]}>{label}</Animated.Text>

        <TextInput
          {...otherProps}
          autoCapitalize="none"
          defaultValue={defaultValue}
          editable={!isReadOnly}
          keyboardAppearance={theme.colorScheme}
          onBlur={onBlurHandler}
          onChangeText={onChange}
          onFocus={onFocusHandler}
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

      {isInvalid && errorMessage && (
        <Animated.View entering={FadeInUp} exiting={FadeOutUp} style={styles.hint}>
          <ErrorTrinagleStrong color={theme.color.statusNegative} size={16} />
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </Animated.View>
      )}
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    gap: 8,
  },

  field: {
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

  hint: {
    flexDirection: 'row',
    gap: 6,
  },

  errorMessage: {
    ...theme.typography.textS,
    color: theme.color.statusNegative,
  },
}))
