import { FC } from 'react'

import { MainLayout } from '@app/layouts/main-layout'
import { Section, SectionHeading } from '@app/shared/ui'
import { FriendList } from '@app/widgets/friend-list'
import { Trans } from '@lingui/macro'

import { SendInviteButton } from './ui/send-invite-button'

export const MainScreen: FC = () => {
  return (
    <MainLayout>
      <Section>
        <SectionHeading action={<SendInviteButton />}>
          <Trans>Friends</Trans>
        </SectionHeading>

        <FriendList />
      </Section>
    </MainLayout>
  )
}
