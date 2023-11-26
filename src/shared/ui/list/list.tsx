import { FC, ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { createStyles } from '@app/shared/theme'

export interface ListProps {
  children: ReactNode
  listStyle?: 'fill' | 'plain'
}

export const List: FC<ListProps> = (props) => {
  const { children, listStyle } = props

  const styles = useStyles()
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: -insets.bottom, marginHorizontal: listStyle === 'fill' ? -12 : 0 }}
    >
      <View style={styles.root}>{children}</View>
      <View style={{ height: insets.bottom }} />
    </ScrollView>
  )
}

const useStyles = createStyles(() => ({
  root: {
    gap: 12,
  },
}))
