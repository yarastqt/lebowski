import { FC } from 'react'
import { Text, View } from 'react-native'

import { MainLayout } from '@app/layouts/main-layout'

export const PeopleScreen: FC = () => {
  return (
    <MainLayout>
      <Text style={{ color: '#fff' }}>people screen</Text>
    </MainLayout>
  )
}
