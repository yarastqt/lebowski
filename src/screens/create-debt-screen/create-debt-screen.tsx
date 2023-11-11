import { FC } from 'react'
import { Text, View } from 'react-native'

import { BaseLayout } from '@app/layouts/base-layout'
import { ActionButton, TextField } from '@app/shared/ui'

export const CreateDebtScreen: FC = () => {
  return (
    <BaseLayout>
      <View>
        <TextField label="User" />
        <TextField label="Amount" />
        <TextField label="Comment" />

        <ActionButton>Create</ActionButton>
      </View>
    </BaseLayout>
  )
}
