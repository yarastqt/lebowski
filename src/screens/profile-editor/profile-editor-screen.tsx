import { FC } from 'react'

import { BaseLayout } from '@app/layouts/base-layout'
import { ActionButton, Form, Section, Text, TextField } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

export const ProfileEditorScreen: FC = () => {
  return (
    <BaseLayout edgets={{ top: 'off' }}>
      <Section>
        <Text variant="heading-m">
          <Trans>Edit profile</Trans>
        </Text>

        <Form>
          <TextField label={<Trans>Display name</Trans>} maxLength={120} />

          <ActionButton>
            <Trans>Update</Trans>
          </ActionButton>
        </Form>
      </Section>
    </BaseLayout>
  )
}
