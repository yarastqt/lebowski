import { FC } from 'react'
import { View } from 'react-native'

import { ScreenLayout } from '@app/layouts/screen-layout'
import { createStyles } from '@app/shared/theme'

import { AppVersion } from './ui/app-version'

export const SettingsScreen: FC = () => {
  const styles = useStyles()

  return (
    <ScreenLayout title="Settings">
      <View style={styles.footer}>
        <AppVersion />
      </View>
    </ScreenLayout>
  )
}

const useStyles = createStyles(() => ({
  footer: {
    marginTop: 'auto',
  },
}))
