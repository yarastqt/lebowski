import { FC } from 'react'
import { Image, Text, View } from 'react-native'

import { createStyles, useTheme } from '@app/shared/theme'

export interface AvatarProps {
  displayName: string
  size: number
  url?: string
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { displayName, size, url } = props

  const theme = useTheme()
  const styles = useStyles()

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: url ? undefined : theme.color.statusPositive,
          height: size,
          width: size,
        },
      ]}
    >
      {url ? (
        <Image height={size} source={{ uri: url }} style={styles.avatar} width={size} />
      ) : (
        <Text style={styles.avatarText}>{getAvatarText(displayName)}</Text>
      )}
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    borderRadius: 100,
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
