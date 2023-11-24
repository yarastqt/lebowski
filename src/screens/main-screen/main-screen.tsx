import { FC } from 'react'

import { SendInviteDialog } from '@app/features/send-invite'
import { MainLayout } from '@app/layouts/main-layout'
import { FriendList } from '@app/widgets/friend-list'

export const MainScreen: FC = () => {
  return (
    <MainLayout>
      <FriendList />

      <SendInviteDialog />
    </MainLayout>
  )
}
