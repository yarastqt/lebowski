import { FC } from 'react'
import { Button, Text } from 'react-native'

import { SignupForm } from '@app/features/signup'
import { BaseLayout } from '@app/layouts/base-layout'
import { Route, useNavigation } from '@app/shared/navigation'

export const SignupScreen: FC = () => {
  const { navigate } = useNavigation()

  return (
    <BaseLayout>
      <Text style={{ color: '#fff' }}>Signup screen</Text>

      <SignupForm />

      <Button title="Sign in" onPress={() => navigate(Route.auth)} />
    </BaseLayout>
  )
}
