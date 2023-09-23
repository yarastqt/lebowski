import type { ShadowStyleIOS } from 'react-native'

export type ColorSchemeVariant = 'light' | 'dark' | 'system'
export type ColorSchemeValue = 'light' | 'dark'

export interface Color {
  brandBgBase: string
  brandBgPressed: string
  brandTextOn: string

  lineNormal: string

  surface0: string
  surfaceSubmerged: string

  textPrimary: string
  textSecondary: string

  transparent: string
}

export interface Typography {
  displayL: {
    fontFamily: string
    fontSize: number
  }
  textXL: {
    fontFamily: string
    fontSize: number
  }
  textL: {
    fontFamily: string
    fontSize: number
  }
  textM: {
    fontFamily: string
    fontSize: number
  }
  textS: {
    fontFamily: string
    fontSize: number
  }
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
