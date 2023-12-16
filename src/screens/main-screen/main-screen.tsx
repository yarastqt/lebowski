import { FC } from 'react'

import { SendInviteButton, SendInviteDialog } from '@app/features/send-invite'
import { MainLayout } from '@app/layouts/main-layout'
import { Section, SectionHeading } from '@app/shared/ui'
import { FriendList } from '@app/widgets/friend-list'

export const MainScreen: FC = () => {
  return (
    <MainLayout>
      <Section>
        <SectionHeading action={<SendInviteButton />}>Friends</SectionHeading>

        <FriendList />
      </Section>

      <SendInviteDialog />
    </MainLayout>
  )
}
