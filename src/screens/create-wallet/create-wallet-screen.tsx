import { FC } from 'react'

import { BaseLayout } from '@app/layouts/base-layout'
import { Section, Text } from '@app/shared/ui'

export const CreateWalletScreen: FC = () => {
  return (
    <BaseLayout edgets={{ top: 'off' }}>
      <Section>
        <Text variant="heading-m">Create wallet</Text>
      </Section>
    </BaseLayout>
  )
}
