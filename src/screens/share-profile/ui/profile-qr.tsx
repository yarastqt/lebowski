import { FC, useEffect, useState } from 'react'
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg'

import { createStyles, useTheme } from '@app/shared/theme'
import QR from '@vkontakte/vk-qr'

export const ProfileQr: FC = () => {
  const theme = useTheme()
  const styles = useStyles()

  const [data, setData] = useState<string | null>(null)

  useEffect(() => {
    setData(QR.createQR('profile-id', { qrSize: 256, foregroundColor: theme.color.textPrimary }))
  }, [theme])

  if (!data) {
    return null
  }

  return (
    <View style={styles.root}>
      <SvgXml xml={data} />
    </View>
  )
}

const useStyles = createStyles(() => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
