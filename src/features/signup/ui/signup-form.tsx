import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'
import { View } from 'react-native'

import { createStyles } from '@app/shared/theme'
import { ActionButton, Form, Group, TextField } from '@app/shared/ui'

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

        <ActionButton isDisabled={!isValid} isPending={isPending} onPress={onCreatePress}>
          Continue
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
