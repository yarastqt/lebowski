import { FC } from 'react'
import { Text, View } from 'react-native'

import { createStyles } from '@app/shared/theme'

export interface TransactionCardProps {
  amount: string
  comment: string
  date: number
  requesterName: string
  addresseeName: string
}

export const TransactionCard: FC<TransactionCardProps> = (props) => {
  const { amount, comment, date, requesterName, addresseeName } = props

  const styles = useStyles()

  return (
    <View style={styles.root}>
      <Text style={styles.amount}>{amount}</Text>
      <Text style={styles.comment}>{comment}</Text>

      <View style={styles.footer}>
        <View style={styles.participants}>
          <Text style={styles.participant}>{requesterName}</Text>
          <Text style={styles.participant}>{addresseeName}</Text>
        </View>

        <Text style={styles.date}>{date}</Text>
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
