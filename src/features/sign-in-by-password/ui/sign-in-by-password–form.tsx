import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'

import { createStyles } from '@app/shared/theme'
import { ActionButton, TextField } from '@app/shared/ui'

import { signInByPasswordModel } from '../sign-in-by-password-model'

export const SignInByPasswordForm: FC = () => {
  const styles = useStyles()

  const {
    email,
    isPending,
    isValid,
    onSignInPress,
    onEmailChange,
    onPasswordChange,
    password,
    screenUnmounted,
  } = useUnit(signInByPasswordModel)

  useEffect(() => {
    return screenUnmounted
  }, [screenUnmounted])

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView behavior="padding" style={styles.content}>
        <TextField
          keyboardType="email-address"
          label="Email"
          onChange={onEmailChange}
          value={email}
        />
        <TextField
          keyboardType="ascii-capable"
          label="Password"
          onChange={onPasswordChange}
          secureTextEntry
          value={password}
        />
      </KeyboardAvoidingView>

      <View style={styles.button}>
        <ActionButton isDisabled={!isValid} isPending={isPending} onPress={onSignInPress}>
          Sign in
        </ActionButton>
      </View>
    </View>
  )
}

const useStyles = createStyles(() => ({
  root: {
    flex: 1,
  },

  content: {
    marginTop: 'auto',
    gap: 16,
    flex: 1,
    justifyContent: 'center',
  },

  button: {
    marginTop: 'auto',
  },
}))
