import { FC } from 'react'

import { MainLayout } from '@app/layouts/main-layout'
import { ProfileInfo } from '@app/widgets/profile-info'

export const ProfileScreen: FC = () => {
  return (
    <MainLayout>
      <ProfileInfo />
    </MainLayout>
  )
}
