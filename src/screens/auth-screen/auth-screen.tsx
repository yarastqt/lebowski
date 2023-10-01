import { FC } from 'react'
import { Button, Text } from 'react-native'

import { BaseLayout } from '@app/layouts/base-layout'
import { Route, useNavigation } from '@app/shared/navigation'

export const AuthScreen: FC = () => {
  const { navigate } = useNavigation()

  return (
    <BaseLayout>
      <Text style={{ color: '#fff' }}>Auth screen</Text>

      <Button title="Sign up" onPress={() => navigate(Route.signup)} />
    </BaseLayout>
  )
}
