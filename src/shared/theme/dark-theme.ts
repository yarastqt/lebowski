import type { Theme } from './types'
import { typography } from './typography'

export const darkTheme: Theme = {
  colorScheme: 'dark',

  color: {
    brandBgBase: 'rgba(255, 253, 250, 1)',
    brandBgPressed: 'rgba(255, 253, 250, 0.9)',
    brandTextOn: 'rgba(20, 20, 25, 1)',

    defaultBgBase: 'rgba(250, 250, 255, 0.08)',
    defaultBgPressed: 'rgba(250, 250, 255, 0.14)',

    mutedBg: 'rgba(250, 250, 255, 0.06)',

    defaultBorder: 'rgba(250, 250, 255, 0.14)',
    brandBorder: 'rgba(250, 250, 255, 1)',

    lineNormal: 'rgba(193, 199, 200, 0.2)',

    surface0: 'rgba(0, 0, 0, 1)',
    surfaceSubmerged: 'rgba(18, 18, 18, 1)',
    surfaceOverlay: 'rgba(14, 14, 15, 0.88)',

    statusPositive: 'rgba(165, 255, 213, 1)',
    statusNegative: 'rgba(251, 92, 86, 1)',

    textPrimary: 'rgba(255, 253, 250, 1)',
    textSecondary: 'rgba(255, 253, 250, 0.5)',
    mutedText: 'rgba(250, 250, 255, 0.24)',

    skeletonBg: 'rgba(35, 35, 36, 1)',

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
