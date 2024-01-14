import { useGate, useUnit } from 'effector-react'
import { FC } from 'react'

import { BaseLayout } from '@app/layouts/base-layout'
import { useForm } from '@app/shared/lib/effector-form'
import { ActionButton, AvatarPicker, Form, Section, Text, TextField } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

import { profileEditorModel } from './model'

export const ProfileEditorScreen: FC = () => {
  const { fields, submit, isInvalid } = useForm(profileEditorModel.form)
  const { isUpdating } = useUnit({ isUpdating: profileEditorModel.$isUpdating })

  useGate(profileEditorModel.gate)

  return (
    <BaseLayout edgets={{ top: 'off' }}>
      <Section>
        <Text variant="heading-m">
          <Trans>Edit profile</Trans>
        </Text>

        <Form>
          <AvatarPicker
            avatarUrl={fields.avatarUrl.value}
            displayName={fields.displayName.value}
            onChange={fields.avatarUrl.props.onChange}
          />

          <TextField
            {...fields.displayName.props}
            errorMessage={fields.displayName.error}
            isInvalid={fields.displayName.isInvalid}
            label={<Trans>Display name</Trans>}
            maxLength={40}
          />

          <ActionButton onPress={submit} isPending={isUpdating} isDisabled={isInvalid}>
            {isUpdating ? <Trans>Updating...</Trans> : <Trans>Update</Trans>}
          </ActionButton>
        </Form>
      </Section>
    </BaseLayout>
  )
}
