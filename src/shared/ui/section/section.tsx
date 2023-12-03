import { FC, ReactNode } from 'react'
import { View } from 'react-native'

import { createStyles } from '@app/shared/theme'

export interface SectionProps {
  children: ReactNode
}

export const Section: FC<SectionProps> = (props) => {
  const { children } = props

  const styles = useStyles()

  return <View style={styles.root}>{children}</View>
}

const useStyles = createStyles(() => ({
  root: {
    flex: 1,
    gap: 24,
    padding: 24,
  },
}))
