import { useUnit } from 'effector-react'
import { FC } from 'react'

import { BaseLayout } from '@app/layouts/base-layout'
import { useForm } from '@app/shared/lib/effector-form'
import { ActionButton, Form, Text, TextField } from '@app/shared/ui'

import { createTransactionScreenModel } from './create-transaction-screen-model'

export const CreateTransactionScreen: FC = () => {
  const { fields, submit, isInvalid } = useForm(createTransactionScreenModel.form)
  const { isPending } = useUnit(createTransactionScreenModel)

  return (
    <BaseLayout edgets={{ top: 'off' }}>
      <Form>
        <Text variant="heading-m">Create new debt</Text>

        <TextField {...fields.reciverEmail.props} label="User email" />
        <TextField {...fields.amount.props} label="Amount" />
        <TextField {...fields.comment.props} label="Comment" />

        <ActionButton onPress={submit} isPending={isPending} isDisabled={isInvalid}>
          {isPending ? 'Creating...' : 'Create'}
        </ActionButton>
      </Form>
    </BaseLayout>
  )
}
