import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'
import { View } from 'react-native'

import { createStyles } from '@app/shared/theme'
import { ActionButton, Form, Group, TextField } from '@app/shared/ui'

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
      <Form>
        <Group>
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
        </Group>

        <ActionButton isDisabled={!isValid} isPending={isPending} onPress={onSignInPress}>
          Sign in
        </ActionButton>
      </Form>
    </View>
  )
}

const useStyles = createStyles(() => ({
  root: {
    flex: 1,
  },
}))
