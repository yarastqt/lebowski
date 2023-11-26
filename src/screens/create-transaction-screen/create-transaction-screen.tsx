import { useUnit } from 'effector-react'
import { FC, useCallback, useEffect } from 'react'
import invariant from 'ts-invariant'

import { BaseLayout } from '@app/layouts/base-layout'
import { useForm } from '@app/shared/lib/effector-form'
import { ScreenProps } from '@app/shared/navigation'
import { sessionModel } from '@app/shared/session'
import { ActionButton, Form, Swiper, Text, TextField } from '@app/shared/ui'

import { createTransactionScreenModel } from './create-transaction-screen-model'

export type CreateTransactionScreenProps = ScreenProps<'CreateTransaction'>

export const CreateTransactionScreen: FC<CreateTransactionScreenProps> = (props) => {
  const { route } = props

  const { fields, isInvalid, setValues, submit, values } = useForm(
    createTransactionScreenModel.form,
  )
  const { isPending } = useUnit(createTransactionScreenModel)
  const { user } = useUnit(sessionModel)

  useEffect(() => {
    invariant(user, 'User is not defined')

    setValues({
      ...values,
      requester: { id: user.id, displayName: user.displayName },
      addressee: { id: route.params.id, displayName: route.params.displayName },
    })
  }, [route.params, user, setValues])

  const onChangeAddressee = useCallback(() => {
    setValues({ ...values, requester: values.addressee, addressee: values.requester })
  }, [values, setValues])

  return (
    <BaseLayout edgets={{ top: 'off' }}>
      <Text variant="heading-m">Create transaction</Text>

      <Form>
        <TextField {...fields.amount.props} label="Amount" keyboardType="number-pad" />
        <TextField {...fields.comment.props} label="Comment" />
        <Swiper
          from={fields.requester.displayName.value}
          to={fields.addressee.displayName.value}
          onChange={onChangeAddressee}
        />

        <ActionButton onPress={submit} isPending={isPending} isDisabled={isInvalid}>
          {isPending ? 'Creating...' : 'Create'}
        </ActionButton>
      </Form>
    </BaseLayout>
  )
}
