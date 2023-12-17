import { FC } from 'react'
import { Text, View } from 'react-native'

import { Currency, RelationshipTransactionState } from '@app/shared/api'
import { ArrowShortForwardStrong } from '@app/shared/icons'
import { dateFormatter } from '@app/shared/lib/date'
import { useNumberFormatter } from '@app/shared/lib/number'
import { createStyles, useTheme } from '@app/shared/theme'

export interface TransactionCardProps {
  addresseeName: string
  amount: number
  comment?: string
  createdAt: number
  currency: Currency
  requesterName: string
  state: RelationshipTransactionState
}

export const TransactionCard: FC<TransactionCardProps> = (props) => {
  const { addresseeName, amount, comment, createdAt, currency, requesterName, state } = props

  const theme = useTheme()
  const styles = useStyles()

  const currencyFormatter = useNumberFormatter({
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  })

  const isIncoming = state === 'incoming'

  return (
    <View style={styles.root}>
      <Text
        style={[
          styles.amount,
          { color: isIncoming ? theme.color.statusNegative : theme.color.statusPositive },
        ]}
      >
        {currencyFormatter.format(amount)}
      </Text>

      {comment && <Text style={styles.comment}>{comment}</Text>}

      <View style={styles.footer}>
        <View style={styles.participants}>
          <Text style={styles.participant}>{requesterName}</Text>
          <ArrowShortForwardStrong color={theme.color.textSecondary} size={12} />
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
    alignItems: 'center',
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
