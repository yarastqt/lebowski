import { useGate, useUnit } from 'effector-react'
import { FC } from 'react'

import { CreateWalletButton } from '@app/features/create-wallet'
import { ScreenLayout } from '@app/layouts/screen-layout'
import { Route, ScreenProps, useNavigation } from '@app/shared/navigation'
import { ActionButton, List, Pager, Section, Text, TransactionCard } from '@app/shared/ui'

import { friendScreenModel } from './friend-screen-model'

export type FriendScreenProps = ScreenProps<'Friend'>

export const FriendScreen: FC<FriendScreenProps> = (props) => {
  const { route } = props

  const navigation = useNavigation()
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
            <ActionButton
              onPress={() => {
                navigation.navigate(Route.CreateTransaction, {
                  displayName: route.params.displayName,
                  id: route.params.id,
                  currency: wallet.currency,
                })
              }}
            >
              Create transaction
            </ActionButton>

            <Text variant="heading-m">Transactions</Text>

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
                />
              ))}
            </List>
          </Section>
        ))}
      </Pager>
    </ScreenLayout>
  )
}
