import { useUnit } from 'effector-react'
import { FC } from 'react'
import { Button, TextInput, View } from 'react-native'

import { signupModel } from '../signup-model'

export const SignupForm: FC = () => {
  const { email, password, onEmailChange, onPasswordChange, onCreatePress } = useUnit(signupModel)

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={onEmailChange}
        placeholder="Email"
        keyboardType="email-address"
        style={{ color: '#fff' }}
        placeholderTextColor="#fff"
      />
      <TextInput
        value={password}
        onChangeText={onPasswordChange}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#fff"
        style={{ color: '#fff' }}
      />

      <Button title="Create" onPress={onCreatePress} />
    </View>
  )
}
