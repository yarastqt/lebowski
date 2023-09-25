import { FC } from 'react'
import { Text } from 'react-native'

import { MainLayout } from '@app/layouts/main-layout'

export const ProfileScreen: FC = () => {
  return (
    <MainLayout>
      <Text style={{ color: '#fff' }}>profile screen</Text>
    </MainLayout>
  )
}
