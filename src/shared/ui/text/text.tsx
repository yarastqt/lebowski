import { FC, ReactNode } from 'react'
import { Text as BaseText } from 'react-native'

import { useTheme } from '@app/shared/theme'
import { TypographyParams } from '@app/shared/theme/types'

type TextVariant = 'heading-m' | 'text-l' | 'text-m' | 'text-s'

export interface TextProps {
  children: ReactNode
  variant: TextVariant
}

export const Text: FC<TextProps> = (props) => {
  const { children, variant } = props

  const theme = useTheme()

  const variants: Record<TextVariant, TypographyParams> = {
    'heading-m': theme.typography.headingM,
    'text-l': theme.typography.textL,
    'text-m': theme.typography.textM,
    'text-s': theme.typography.textS,
  }

  return (
    <BaseText style={{ ...variants[variant], color: theme.color.textPrimary }}>{children}</BaseText>
  )
}
