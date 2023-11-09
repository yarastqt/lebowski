import { FC } from 'react'
import { Text, View } from 'react-native'

import { createStyles } from '@app/shared/theme'

export interface AvatarProps {
  displayName: string
  size: number
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { displayName, size } = props

  const styles = useStyles()

  return (
    <View style={[styles.avatar, { width: size, height: size }]}>
      <Text style={styles.avatarText}>{getAvatarText(displayName)}</Text>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  avatar: {
    backgroundColor: theme.color.statusPositive,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    ...theme.typography.headingM,
    color: theme.color.textPrimary,
    lineHeight: 50,
  },
}))

function getAvatarText(displayName: string) {
  return displayName.at(0)?.toLocaleUpperCase()
}
