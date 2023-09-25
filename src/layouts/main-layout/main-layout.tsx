import { StatusBar } from 'expo-status-bar'
import { FC, ReactNode } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { createStyles, useTheme } from '@app/shared/theme'

import { Header } from './ui/header'

export interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props

  const { colorScheme } = useTheme()
  const styles = useStyles()

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Header />

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
