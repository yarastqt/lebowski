import { FC } from 'react'
import { Text, View } from 'react-native'

import { BaseLayout } from '@app/layouts/base-layout'
import { useForm } from '@app/shared/lib/effector-form'
import { ActionButton, TextField } from '@app/shared/ui'

import { createDebtScreenModel } from './create-debt-screen-model'

export const CreateDebtScreen: FC = () => {
  const { fields, submit } = useForm(createDebtScreenModel.form)

  return (
    <BaseLayout>
      <View>
        <TextField {...fields.reciverEmail.props} label="User email" />
        <TextField {...fields.amount.props} label="Amount" />
        <TextField {...fields.comment.props} label="Comment" />

        <ActionButton onPress={submit}>Create</ActionButton>
      </View>
    </BaseLayout>
  )
}
