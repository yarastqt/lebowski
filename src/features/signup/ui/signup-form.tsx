import { FC } from 'react'
import { Button, TextInput, View } from 'react-native'

export const SignupForm: FC = () => {
  return (
    <View>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={{ color: '#fff' }}
        placeholderTextColor="#fff"
      />
      <TextInput
        placeholder="Password"
        // textContentType="newPassword"
        secureTextEntry
        placeholderTextColor="#fff"
        style={{ color: '#fff' }}
      />

      <Button title="Create" />
    </View>
  )
}
