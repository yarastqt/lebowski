import type { Theme } from './types'
import { typography } from './typography'

export const lightTheme: Theme = {
  colorScheme: 'light',

  color: {
    brandBgBase: 'rgba(20, 20, 25, 1)',
    brandBgPressed: 'rgba(20, 20, 25, 0.9)',
    brandTextOn: 'rgba(255, 253, 250, 1)',
    mutedBg: '',

    defaultBgBase: '',
    defaultBgPressed: '',

    defaultBorder: '',
    brandBorder: '',

    lineNormal: 'rgba(20, 20, 25, 0.1)',

    surface0: 'rgba(255, 253, 250, 1)',
    surfaceSubmerged: 'rgba(20, 20, 25, 0.05)',
    surfaceOverlay: '',

    statusPositive: '',

    textPrimary: 'rgba(20, 20, 25, 1)',
    textSecondary: 'rgba(20, 20, 25, 0.5)',
    mutedText: '',

    transparent: 'transparent',
  },

  typography,

  shadow: {
    elevated50: {
      shadowColor: 'rgba(20, 20, 25, 0.1)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 6,
    },
  },
}
