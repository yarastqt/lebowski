import { useGate, useUnit } from 'effector-react'
import { FC } from 'react'

import { BaseLayout } from '@app/layouts/base-layout'
import { useForm } from '@app/shared/lib/effector-form'
import { ScreenProps } from '@app/shared/navigation'
import { ActionButton, Form, Section, Swiper, Text, TextField } from '@app/shared/ui'

import { createTransactionScreenModel } from './create-transaction-screen-model'

export type CreateTransactionScreenProps = ScreenProps<'CreateTransaction'>

export const CreateTransactionScreen: FC<CreateTransactionScreenProps> = (props) => {
  const { route } = props

  const { fields, isInvalid, submit } = useForm(createTransactionScreenModel.form)
  const { isPending, onAddresseeChange } = useUnit(createTransactionScreenModel)

  useGate(createTransactionScreenModel.gate, route.params)

  return (
    <BaseLayout edgets={{ top: 'off' }}>
      <Section>
        <Text variant="heading-m">Create transaction</Text>

        <Form>
          <TextField {...fields.amount.props} label="Amount" keyboardType="number-pad" />
          <TextField {...fields.comment.props} label="Comment" />
          <TextField isReadOnly defaultValue={route.params.currency} label="Currency" />
          <Swiper
            from={fields.requester.displayName.value}
            to={fields.addressee.displayName.value}
            onChange={onAddresseeChange}
          />

          <ActionButton onPress={submit} isPending={isPending} isDisabled={isInvalid}>
            {isPending ? 'Creating...' : 'Create'}
          </ActionButton>
        </Form>
      </Section>
    </BaseLayout>
  )
}
