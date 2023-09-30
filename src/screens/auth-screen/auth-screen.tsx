import { FC } from 'react'
import { Text } from 'react-native'

import { BaseLayout } from '@app/layouts/base-layout'

export const AuthScreen: FC = () => {
  return (
    <BaseLayout>
      <Text style={{ color: '#fff' }}>Auth screen</Text>
    </BaseLayout>
  )
}
