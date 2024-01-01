import { FC } from 'react'
import { Text, View } from 'react-native'

import { Currency } from '@app/shared/api'
import { useNumberFormatter } from '@app/shared/lib/number'
import { createStyles, useTheme } from '@app/shared/theme'

export interface BalanceCardProps {
  children: number
  currency: Currency
}

export const BalanceCard: FC<BalanceCardProps> = (props) => {
  const { children, currency } = props

  const theme = useTheme()
  const styles = useStyles()
  const currencyFormatter = useNumberFormatter({
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  })

  const amountColor = (() => {
    if (children == 0) {
      return theme.color.textSecondary
    }

    if (children > 0) {
      return theme.color.statusPositive
    }

    return theme.color.statusNegative
  })()

  return (
    <View style={styles.root}>
      <Text style={[styles.amount, { color: amountColor }]}>
        {currencyFormatter.format(children)}
      </Text>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    height: 72,
    backgroundColor: theme.color.defaultBgBase,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  amount: {
    ...theme.typography.headingM,
    lineHeight: 72,
  },
}))
