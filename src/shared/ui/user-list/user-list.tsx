import { FC, ReactNode } from 'react'
import { Text, View } from 'react-native'

import { createStyles } from '@app/shared/theme'

export interface UserListProps {
  children: ReactNode
  title: string
}

export const UserList: FC<UserListProps> = (props) => {
  const { children, title } = props

  const styles = useStyles()

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.list}>{children}</View>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    gap: 16,
  },

  title: {
    ...theme.typography.headingM,
    color: theme.color.textPrimary,
  },

  list: {
    marginHorizontal: -16,
  },
}))
