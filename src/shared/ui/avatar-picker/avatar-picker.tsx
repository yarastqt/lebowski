import { launchImageLibraryAsync } from 'expo-image-picker'
import { FC, useCallback } from 'react'
import { Pressable, View } from 'react-native'

import { createStyles } from '@app/shared/theme'

import { Avatar } from '../avatar/avatar'

export interface AvatarPickerProps {
  avatarUrl: string
  displayName: string
  onChange: (imageUrl: string) => void
}

export const AvatarPicker: FC<AvatarPickerProps> = (props) => {
  const { avatarUrl, displayName, onChange } = props

  const styles = useStyles()

  const onSelectImage = useCallback(async () => {
    // TODO: Add image resize.
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    })

    const asset = result.assets?.at(0)

    if (asset) {
      onChange(asset.uri)
    }
  }, [onChange])

  return (
    <Pressable onPress={onSelectImage}>
      <View style={styles.root}>
        <Avatar url={avatarUrl} displayName={displayName} size={112} />
      </View>
    </Pressable>
  )
}

const useStyles = createStyles(() => ({
  root: {
    alignItems: 'center',
  },
}))
