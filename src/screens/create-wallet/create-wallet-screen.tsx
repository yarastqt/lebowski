import { useGate, useUnit } from 'effector-react'
import { FC } from 'react'

import { ModalLayout } from '@app/layouts/modal-layout'
import { useForm } from '@app/shared/lib/effector-form'
import { ScreenProps } from '@app/shared/navigation'
import { ActionButton, Form, Section, SectionHeading } from '@app/shared/ui'
import { Picker } from '@app/shared/ui/next'
import { Trans } from '@lingui/macro'

import { createWalletScreenModel } from './model'

export type CreateWalletScreenProps = ScreenProps<'CreateWallet'>

export const CreateWalletScreen: FC<CreateWalletScreenProps> = (props) => {
  const { route } = props

  const { fields, submit } = useForm(createWalletScreenModel.form)
  const { isPending, availableWallets } = useUnit({
    availableWallets: createWalletScreenModel.$availableWallets,
    isPending: createWalletScreenModel.$isPending,
  })

  useGate(createWalletScreenModel.gate, { friendId: route.params.friendId })

  return (
    <ModalLayout>
      <Section>
        <SectionHeading>
          <Trans>Create new wallet</Trans>
        </SectionHeading>

        <Form>
          <Picker
            {...fields.currency.props}
            title={<Trans>Select new wallet currency</Trans>}
            label={<Trans>Wallet currency</Trans>}
            items={availableWallets.map((currency) => ({
              id: currency,
              title: currency.toLocaleUpperCase(),
            }))}
          />

          <ActionButton onPress={submit} isPending={isPending}>
            {isPending ? <Trans>Creating...</Trans> : <Trans>Create</Trans>}
          </ActionButton>
        </Form>
      </Section>
    </ModalLayout>
  )
}
