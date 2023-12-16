import { FC, ReactNode } from 'react'
import { View } from 'react-native'

import { createStyles } from '@app/shared/theme'

import { Text } from '../text'

export interface SectionHeadingProps {
  action?: ReactNode
  children: ReactNode
}

export const SectionHeading: FC<SectionHeadingProps> = (props) => {
  const { action, children } = props

  const styles = useStyles()

  return (
    <View style={styles.root}>
      <Text variant="heading-m">{children}</Text>
      {action}
    </View>
  )
}

const useStyles = createStyles(() => ({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}))
