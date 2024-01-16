import { FC } from 'react'

import { ModalLayout } from '@app/layouts/modal-layout'
import { Section } from '@app/shared/ui'

import { ProfileQr } from './ui/profile-qr'

export const ShareProfileScreen: FC = () => {
  return (
    <ModalLayout>
      <Section isStretched>
        <ProfileQr />
      </Section>
    </ModalLayout>
  )
}
