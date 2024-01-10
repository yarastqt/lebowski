import { useGate, useUnit } from 'effector-react'
import { FC } from 'react'

import { CreateTransactionButton } from '@app/features/create-transaction'
import { CreateWalletButton } from '@app/features/create-wallet'
import { ScreenLayout } from '@app/layouts/screen-layout'
import { ScreenProps } from '@app/shared/navigation'
import { Pager, Section, SectionHeading } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

import { friendScreenModel } from './friend-screen-model'
import { BalanceCard } from './ui/balance-card'
import { TransactionList } from './ui/transaction-list'

export type FriendScreenProps = ScreenProps<'Friend'>

export const FriendScreen: FC<FriendScreenProps> = (props) => {
  const { route } = props

  const { isLoading, wallets } = useUnit(friendScreenModel)

  useGate(friendScreenModel.gate, { friendId: route.params.id })

  return (
    <ScreenLayout
      actions={<CreateWalletButton friendId={route.params.id} />}
      title={route.params.displayName}
      edgets={{ top: 'maximum', bottom: 'off' }}
    >
      <Pager>
        {wallets.map((wallet) => (
          <Section key={wallet.currency}>
            <BalanceCard isLoading={isLoading} currency={wallet.currency}>
              {wallet.amount}
            </BalanceCard>

            <SectionHeading
              action={
                <CreateTransactionButton
                  currency={wallet.currency}
                  friendDisplayName={route.params.displayName}
                  friendId={route.params.id}
                />
              }
            >
              <Trans>Transactions</Trans>
            </SectionHeading>

            <TransactionList
              currency={wallet.currency}
              data={wallet.transactions}
              isLoading={isLoading}
            />
          </Section>
        ))}
      </Pager>
    </ScreenLayout>
  )
}
