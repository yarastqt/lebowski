import { FC } from 'react'

import { Currency, RelationshipTransaction } from '@app/shared/api'
import { List, TransactionCard, TransactionCardSkeleton } from '@app/shared/ui'

export interface TransactionListProps {
  currency: Currency
  data: RelationshipTransaction[]
  isLoading: boolean
}

export const TransactionList: FC<TransactionListProps> = (props) => {
  const { currency, data, isLoading } = props

  if (isLoading) {
    return (
      <List listStyle="fill">
        <TransactionCardSkeleton />
        <TransactionCardSkeleton />
        <TransactionCardSkeleton />
      </List>
    )
  }

  return (
    <List listStyle="fill">
      {data.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          addresseeName={transaction.addresseeName}
          amount={transaction.amount}
          comment={transaction.comment}
          createdAt={transaction.createdAt}
          currency={currency}
          requesterName={transaction.requesterName}
          state={transaction.state}
        />
      ))}
    </List>
  )
}
