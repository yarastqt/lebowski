import { fork } from 'effector'
import { Provider } from 'effector-react'
import { FC } from 'react'
import { Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { NunitoSans_400Regular, useFonts } from '@expo-google-fonts/nunito-sans'

import { MainLayout } from './layouts/main-layout'
import { BottomNavigation } from './widgets/bottom-navigation'

const scope = fork()

export const Application: FC = () => {
  let [fontsLoaded, fontError] = useFonts({
    NunitoSans_400Regular,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <Provider value={scope}>
      <SafeAreaProvider>
        <MainLayout>
          <Text style={{ color: '#fff' }}>Hello worl</Text>

          <BottomNavigation />
        </MainLayout>
      </SafeAreaProvider>
    </Provider>
  )
}
