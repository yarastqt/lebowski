import { useGate, useUnit } from 'effector-react'
import { FC } from 'react'

import { BaseLayout } from '@app/layouts/base-layout'
import { useForm } from '@app/shared/lib/effector-form'
import { ScreenProps } from '@app/shared/navigation'
import { ActionButton, Form, Picker, Section, Text } from '@app/shared/ui'

import { createWalletScreenModel } from './create-wallet-screen-model'

export type CreateWalletScreenProps = ScreenProps<'CreateWallet'>

export const CreateWalletScreen: FC<CreateWalletScreenProps> = (props) => {
  const { route } = props

  const { fields, submit } = useForm(createWalletScreenModel.form)
  const { isPending, availableWallets } = useUnit(createWalletScreenModel)

  useGate(createWalletScreenModel.gate, { friendId: route.params.friendId })

  return (
    <BaseLayout edgets={{ top: 'off' }}>
      <Section>
        <Text variant="heading-m">Create new wallet</Text>

        <Form>
          <Picker {...fields.currency.props}>
            {availableWallets.map((currency) => (
              <Picker.Item key={currency} value={currency} label={currency} />
            ))}
          </Picker>

          <ActionButton onPress={submit} isPending={isPending}>
            {isPending ? 'Creating...' : 'Create'}
          </ActionButton>
        </Form>
      </Section>
    </BaseLayout>
  )
}
