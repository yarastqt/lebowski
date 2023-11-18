import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'

import { createStyles } from '@app/shared/theme'
import { ActionButton, Group, TextField } from '@app/shared/ui'

import { signupModel } from '../signup-model'

export const SignupForm: FC = () => {
  const styles = useStyles()

  const {
    email,
    isPending,
    isValid,
    onCreatePress,
    onEmailChange,
    onPasswordChange,
    password,
    screenUnmounted,
  } = useUnit(signupModel)

  useEffect(() => {
    return screenUnmounted
  }, [screenUnmounted])

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView behavior="padding">
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
      </KeyboardAvoidingView>

      <View style={styles.button}>
        <ActionButton isDisabled={!isValid} isPending={isPending} onPress={onCreatePress}>
          Continue
        </ActionButton>
      </View>
    </View>
  )
}

const useStyles = createStyles(() => ({
  root: {
    flex: 1,
  },

  button: {
    marginTop: 'auto',
  },
}))
