import { FC } from 'react'
import { Text } from 'react-native'

import { ScreenLayout } from '@app/layouts/screen-layout'

export const SettingsScreen: FC = () => {
  return (
    <ScreenLayout title="Settings">
      <Text style={{ color: '#fff' }}>settings screen</Text>
    </ScreenLayout>
  )
}
