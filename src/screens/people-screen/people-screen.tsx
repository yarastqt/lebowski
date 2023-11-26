import { FC } from 'react'

import { SendInviteDialog } from '@app/features/send-invite'
import { MainLayout } from '@app/layouts/main-layout'
import { FriendList } from '@app/widgets/friend-list'
import { PendingInviteList } from '@app/widgets/pending-invite-list'
import { SendedInviteList } from '@app/widgets/sended-invite-list'

export const PeopleScreen: FC = () => {
  return (
    <MainLayout>
      <PendingInviteList />
      <SendedInviteList />
      <FriendList />

      <SendInviteDialog />
    </MainLayout>
  )
}
