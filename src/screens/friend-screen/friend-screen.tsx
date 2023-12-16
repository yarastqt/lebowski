import { useGate, useUnit } from 'effector-react'
import { FC } from 'react'

import { CreateTransactionButton } from '@app/features/create-transaction'
import { CreateWalletButton } from '@app/features/create-wallet'
import { ScreenLayout } from '@app/layouts/screen-layout'
import { ScreenProps } from '@app/shared/navigation'
import { List, Pager, Section, SectionHeading, TransactionCard } from '@app/shared/ui'

import { friendScreenModel } from './friend-screen-model'

export type FriendScreenProps = ScreenProps<'Friend'>

export const FriendScreen: FC<FriendScreenProps> = (props) => {
  const { route } = props

  const { wallets } = useUnit(friendScreenModel)

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
            <SectionHeading
              action={
                <CreateTransactionButton
                  currency={wallet.currency}
                  friendDisplayName={route.params.displayName}
                  friendId={route.params.id}
                />
              }
            >
              Transactions
            </SectionHeading>

            <List listStyle="fill">
              {wallet.transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  addresseeName={transaction.addresseeName}
                  amount={transaction.amount}
                  comment={transaction.comment}
                  createdAt={transaction.createdAt}
                  currency={wallet.currency}
                  requesterName={transaction.requesterName}
                  state={transaction.state}
                />
              ))}
            </List>
          </Section>
        ))}
      </Pager>
    </ScreenLayout>
  )
}
