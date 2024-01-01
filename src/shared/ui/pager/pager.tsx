import { Children, FC, ReactNode, useCallback, useState } from 'react'
import { NativeSyntheticEvent, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { createStyles } from '@app/shared/theme'

export interface PagerProps {
  children: ReactNode
}

export const Pager: FC<PagerProps> = (props) => {
  const { children } = props

  const insets = useSafeAreaInsets()
  const styles = useStyles()
  const [activePageIndex, setActivePageIndex] = useState(0)

  const onPageSelected = useCallback((event: NativeSyntheticEvent<{ position: number }>) => {
    const nextPageIndex = event.nativeEvent.position

    setActivePageIndex(nextPageIndex)
  }, [])

  const pages = Children.toArray(children)

  return (
    <View style={styles.root}>
      <View style={[styles.navigation, { bottom: insets.bottom + 24 }]}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, index === activePageIndex && styles.indicatorIsActive]}
          />
        ))}
      </View>

      <PagerView
        initialPage={activePageIndex}
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
  },

  navigation: {
    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    backgroundColor: theme.color.surfaceOverlay,
    padding: 4,
    borderRadius: 8,
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
