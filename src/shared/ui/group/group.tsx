import { FC, ReactNode } from 'react'
import { View } from 'react-native'

import { createStyles } from '@app/shared/theme'

export interface GroupProps {
  children: ReactNode
}

export const Group: FC<GroupProps> = (props) => {
  const { children } = props

  const styles = useStyles()

  return <View style={styles.root}>{children}</View>
}

const useStyles = createStyles(() => ({
  root: {
    gap: 16,
  },
}))
