import { FC } from 'react'
import { Text } from 'react-native'

import { SendInviteForm } from '@app/features/send-invite'
import { MainLayout } from '@app/layouts/main-layout'

export const PeopleScreen: FC = () => {
  return (
    <MainLayout>
      <Text style={{ color: '#fff' }}>people screen</Text>
      <SendInviteForm />
    </MainLayout>
  )
}
