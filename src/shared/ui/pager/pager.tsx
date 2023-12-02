import { Children, FC, ReactNode, useCallback, useState } from 'react'
import { NativeSyntheticEvent, View } from 'react-native'
import PagerView from 'react-native-pager-view'

import { createStyles } from '@app/shared/theme'

export interface PagerProps {
  children: ReactNode
  initialPageIndex: number
  onChangePage: (pageIndex: number) => void
}

export const Pager: FC<PagerProps> = (props) => {
  const { children, initialPageIndex, onChangePage } = props

  const styles = useStyles()
  const [activePageIndex, setActivePageIndex] = useState(initialPageIndex)

  const onPageSelected = useCallback((event: NativeSyntheticEvent<{ position: number }>) => {
    const nextPageIndex = event.nativeEvent.position

    setActivePageIndex(nextPageIndex)
    onChangePage(nextPageIndex)
  }, [])

  const pages = Children.toArray(children)

  return (
    <View style={styles.root}>
      <View style={styles.navigation}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, index === activePageIndex && styles.indicatorIsActive]}
          />
        ))}
      </View>

      <PagerView
        initialPage={initialPageIndex}
        onPageSelected={onPageSelected}
        style={styles.content}
      >
        {pages}
      </PagerView>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    flex: 1,
    gap: 16,
  },

  navigation: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },

  indicator: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: theme.color.textSecondary,
  },

  indicatorIsActive: {
    width: 6 * 3,
    backgroundColor: theme.color.textPrimary,
  },

  content: {
    flex: 1,
  },
}))
