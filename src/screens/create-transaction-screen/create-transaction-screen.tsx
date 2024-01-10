import { useGate, useUnit } from 'effector-react'
import { FC } from 'react'

import { BaseLayout } from '@app/layouts/base-layout'
import { useForm } from '@app/shared/lib/effector-form'
import { ScreenProps } from '@app/shared/navigation'
import { ActionButton, CurrencyField, Form, Section, Swiper, Text, TextField } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

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
        <Text variant="heading-m">
          <Trans>Create transaction</Trans>{' '}
          <Text variant="heading-m" color="positive">
            {route.params.currency.toUpperCase()}
          </Text>
        </Text>

        <Form>
          <CurrencyField
            {...fields.amount.props}
            errorMessage={fields.amount.error}
            isInvalid={fields.amount.isInvalid}
            label={<Trans>Amount</Trans>}
          />
          <TextField
            {...fields.comment.props}
            errorMessage={fields.comment.error}
            isInvalid={fields.comment.isInvalid}
            label={<Trans>Comment</Trans>}
            maxLength={120}
          />
          <Swiper
            from={fields.requester.displayName.value}
            to={fields.addressee.displayName.value}
            onChange={onAddresseeChange}
          />

          <ActionButton onPress={submit} isPending={isPending} isDisabled={isInvalid}>
            {isPending ? <Trans>Creating...</Trans> : <Trans>Creat</Trans>}
          </ActionButton>
        </Form>
      </Section>
    </BaseLayout>
  )
}
