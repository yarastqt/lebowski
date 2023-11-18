import { StatusBar } from 'expo-status-bar'
import { FC, ReactNode } from 'react'
import { View } from 'react-native'
import { Edges, SafeAreaView } from 'react-native-safe-area-context'

import { createStyles, useTheme } from '@app/shared/theme'

export interface BaseLayoutProps {
  children: ReactNode
  edgets?: Edges
  header?: ReactNode
}

export const BaseLayout: FC<BaseLayoutProps> = (props) => {
  const { children, edgets, header } = props

  const { colorScheme } = useTheme()
  const styles = useStyles()

  return (
    <SafeAreaView style={styles.root} edges={edgets}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {header}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.color.surface0,
  },

  content: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
}))
