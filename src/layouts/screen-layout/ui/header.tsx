import { FC, ReactNode } from 'react'
import { Text, View } from 'react-native'

import { ArrowShortLeft } from '@app/shared/icons'
import { useNavigation } from '@app/shared/navigation'
import { createStyles } from '@app/shared/theme'
import { IconButton } from '@app/shared/ui'

export interface HeaderProps {
  actions?: ReactNode
  children: ReactNode
}

export const Header: FC<HeaderProps> = (props) => {
  const { actions, children } = props

  const navigation = useNavigation()
  const styles = useStyles()

  const isHasActions = actions !== undefined

  return (
    <View style={[styles.root, isHasActions && styles.rootWithActions]}>
      <IconButton size={44} onPress={() => navigation.goBack()}>
        <ArrowShortLeft size={24} />
      </IconButton>

      <Text style={[styles.title, isHasActions && styles.titleWithActions]}>{children}</Text>

      <View style={styles.actions}>{actions}</View>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 24,
  },

  rootWithActions: {
    paddingRight: 14,
  },

  title: {
    ...theme.typography.headingM,
    color: theme.color.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginRight: 34,
  },

  titleWithActions: {
    marginRight: 0,
  },

  actions: {
    flexDirection: 'row',
  },
}))
