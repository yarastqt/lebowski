import { FC } from 'react'

import { SendInviteButton, SendInviteDialog } from '@app/features/send-invite'
import { MainLayout } from '@app/layouts/main-layout'
import { Section } from '@app/shared/ui'
import { FriendList } from '@app/widgets/friend-list'

export const MainScreen: FC = () => {
  return (
    <MainLayout>
      <Section>
        <FriendList />
        <SendInviteButton />
      </Section>

      <SendInviteDialog />
    </MainLayout>
  )
}
