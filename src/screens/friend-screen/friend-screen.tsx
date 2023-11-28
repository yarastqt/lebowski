import { useGate, useUnit } from 'effector-react'
import { FC } from 'react'

import { ScreenLayout } from '@app/layouts/screen-layout'
import { Route, ScreenProps, useNavigation } from '@app/shared/navigation'
import { ActionButton, List, Text, TransactionCard } from '@app/shared/ui'

import { transactionScreenModel } from './friend-screen-model'

export type FriendScreenProps = ScreenProps<'Friend'>

export const FriendScreen: FC<FriendScreenProps> = (props) => {
  const { route } = props

  const navigation = useNavigation()
  const { transactions } = useUnit(transactionScreenModel)

  useGate(transactionScreenModel.gate, { friendId: route.params.id })

  return (
    <ScreenLayout title={route.params.displayName} edgets={{ top: 'maximum', bottom: 'off' }}>
      <ActionButton
        onPress={() => {
          navigation.navigate(Route.CreateTransaction, {
            displayName: route.params.displayName,
            id: route.params.id,
          })
        }}
      >
        Create transaction
      </ActionButton>

      <Text variant="heading-m">Transactions</Text>

      <List listStyle="fill">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            addresseeName={transaction.addresseeName}
            amount={transaction.amount}
            comment={transaction.comment}
            createdAt={transaction.createdAt}
            requesterName={transaction.requesterName}
          />
        ))}
      </List>
    </ScreenLayout>
  )
}
