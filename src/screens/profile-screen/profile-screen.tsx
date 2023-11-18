import { FC } from 'react'

import { ShareProfileListItem } from '@app/features/share-profile'
import { SignOutListItem } from '@app/features/sign-out'
import { MainLayout } from '@app/layouts/main-layout'
import { List } from '@app/shared/ui'
import { ProfileInfo } from '@app/widgets/profile-info'

export const ProfileScreen: FC = () => {
  return (
    <MainLayout>
      <ProfileInfo />

      <List>
        <ShareProfileListItem />
        <SignOutListItem />
      </List>
    </MainLayout>
  )
}
