import type { Theme } from './types'
import { typography } from './typography'

export const darkTheme: Theme = {
  colorScheme: 'dark',

  color: {
    brandBgBase: 'rgba(255, 253, 250, 1)',
    brandBgPressed: 'rgba(255, 253, 250, 0.9)',
    brandTextOn: 'rgba(20, 20, 25, 1)',

    lineNormal: 'rgba(193, 199, 200, 0.2)',

    surface0: 'rgba(20, 20, 25, 1)',
    surfaceSubmerged: 'rgba(255, 253, 250, 0.2)',

    textPrimary: 'rgba(255, 253, 250, 1)',
    textSecondary: 'rgba(255, 253, 250, 0.5)',

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
