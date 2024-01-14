import { useUnit } from 'effector-react'
import { FC } from 'react'

import { BaseLayout } from '@app/layouts/base-layout'
import { useForm } from '@app/shared/lib/effector-form'
import { ActionButton, Form, Section, Text, TextField } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

import { sendInviteScreenModel } from './model'

export const SendInviteScreen: FC = () => {
  const { fields, isInvalid, submit } = useForm(sendInviteScreenModel.form)
  const { isSending } = useUnit({ isSending: sendInviteScreenModel.$isSending })

  return (
    <BaseLayout edgets={{ top: 'off' }}>
      <Section>
        <Text variant="heading-m">
          <Trans>Add friend</Trans>
        </Text>

        <Form>
          <TextField
            {...fields.email.props}
            autoFocus
            errorMessage={fields.email.error}
            isInvalid={fields.email.isInvalid}
            keyboardType="email-address"
            label={<Trans>Email</Trans>}
          />

          <ActionButton isDisabled={isInvalid} isPending={isSending} onPress={submit}>
            {isSending ? <Trans>Sending...</Trans> : <Trans>Send invite</Trans>}
          </ActionButton>
        </Form>
      </Section>
    </BaseLayout>
  )
}
