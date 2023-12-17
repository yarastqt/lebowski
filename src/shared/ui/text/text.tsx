import { FC, ReactNode } from 'react'
import { Text as BaseText } from 'react-native'

import { useTheme } from '@app/shared/theme'
import { TypographyParams } from '@app/shared/theme/types'

type TextVariant = 'heading-m' | 'text-l' | 'text-m' | 'text-s'
type TextColor = 'primary' | 'secondary' | 'positive' | 'negative'

export interface TextProps {
  children: ReactNode
  color?: TextColor
  variant?: TextVariant
}

export const Text: FC<TextProps> = (props) => {
  const { children, color = 'primary', variant = 'text-m' } = props

  const theme = useTheme()

  const variants: Record<TextVariant, TypographyParams> = {
    'heading-m': theme.typography.headingM,
    'text-l': theme.typography.textL,
    'text-m': theme.typography.textM,
    'text-s': theme.typography.textS,
  }

  const colors: Record<TextColor, string> = {
    primary: theme.color.textPrimary,
    secondary: theme.color.textSecondary,
    positive: theme.color.statusPositive,
    negative: theme.color.statusNegative,
  }

  return <BaseText style={{ ...variants[variant], color: colors[color] }}>{children}</BaseText>
}
