import type { ShadowStyleIOS } from 'react-native'

export type ColorSchemeVariant = 'light' | 'dark' | 'system'
export type ColorSchemeValue = 'light' | 'dark'

export interface Color {
  brandBgBase: string
  brandBgPressed: string
  brandTextOn: string
  mutedBg: string
  defaultBgBase: string
  defaultBgPressed: string

  defaultBorder: string
  brandBorder: string

  lineNormal: string

  surface0: string
  surfaceSubmerged: string
  surfaceOverlay: string

  statusPositive: string
  statusNegative: string

  textPrimary: string
  textSecondary: string
  mutedText: string

  transparent: string
}

export interface TypographyParams {
  fontFamily: string
  lineHeight: number
  fontSize: number
}

export interface Typography {
  headingM: TypographyParams
  textS: TypographyParams
  textM: TypographyParams
  textL: TypographyParams
}

export interface Shadow {
  elevated50: ShadowStyleIOS
}

export type Theme = {
  colorScheme: ColorSchemeValue
  color: Color
  typography: Typography
  shadow: Shadow
}
