import { FC, ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { createStyles } from '@app/shared/theme'

export type ListStyle = 'default' | 'fill' | 'plain'

export interface ListProps {
  children: ReactNode
  listStyle?: ListStyle
}

export const List: FC<ListProps> = (props) => {
  const { children, listStyle = 'default' } = props

  const styles = useStyles()
  const insets = useSafeAreaInsets()

  const margins = {
    default: 0,
    fill: -12,
    plain: -16,
  } satisfies Record<ListStyle, number>

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: -insets.bottom, marginHorizontal: margins[listStyle] }}
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
