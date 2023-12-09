import { FC } from 'react'
import { Text, View } from 'react-native'

import { Currency } from '@app/shared/api'
import { dateFormatter } from '@app/shared/lib/date'
import { useNumberFormatter } from '@app/shared/lib/number'
import { createStyles } from '@app/shared/theme'

export interface TransactionCardProps {
  addresseeName: string
  amount: number
  comment?: string
  createdAt: number
  currency: Currency
  requesterName: string
}

export const TransactionCard: FC<TransactionCardProps> = (props) => {
  const { addresseeName, amount, comment, createdAt, currency, requesterName } = props

  const styles = useStyles()

  const currencyFormatter = useNumberFormatter({
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  })

  return (
    <View style={styles.root}>
      <Text style={styles.amount}>{currencyFormatter.format(amount)}</Text>

      {comment && <Text style={styles.comment}>{comment}</Text>}

      <View style={styles.footer}>
        <View style={styles.participants}>
          <Text style={styles.participant}>{requesterName}</Text>
          <Text style={styles.participant}>{addresseeName}</Text>
        </View>

        <Text style={styles.date}>{dateFormatter.format(createdAt)}</Text>
      </View>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    borderRadius: 20,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.color.defaultBgBase,
  },

  amount: {
    ...theme.typography.textL,
    color: theme.color.statusPositive,
  },

  comment: {
    ...theme.typography.textM,
    color: theme.color.textPrimary,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  participants: {
    flexDirection: 'row',
    gap: 4,
  },

  participant: {
    ...theme.typography.textS,
    color: theme.color.textSecondary,
  },

  date: {
    ...theme.typography.textS,
    color: theme.color.textSecondary,
  },
}))
