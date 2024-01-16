import { useMemo } from 'react'
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import type { Theme } from './types'
import { useTheme } from './use-theme'

type Styles = ViewStyle | TextStyle | ImageStyle
type NamedStyles = {
  [styleName: string]: Styles | ((...args: any) => Styles)
}
type StylesheetCreator = (theme: Theme) => NamedStyles

// TODO: Expose theme from hook.
export function createStyles<S extends StylesheetCreator>(creator: S) {
  const useStyles = () => {
    const theme = useTheme()

    const styles = useMemo(() => {
      return StyleSheet.create(creator(theme) as unknown as Record<string, Styles>) as ReturnType<S>
    }, [theme])

    return styles
  }

  return useStyles
}
