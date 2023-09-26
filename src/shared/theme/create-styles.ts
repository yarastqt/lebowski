import { useMemo } from 'react'
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import type { Theme } from './types'
import { useTheme } from './use-theme'

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export function createStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  creator: (theme: Theme) => T | NamedStyles<T>,
) {
  const useStyles = () => {
    const theme = useTheme()

    const styles = useMemo(() => {
      return StyleSheet.create(creator(theme))
    }, [theme])

    return styles
  }

  return useStyles
}
