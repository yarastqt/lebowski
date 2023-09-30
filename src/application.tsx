import { allSettled, fork } from 'effector'
import { Provider } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { RootScreens } from '@app/screens'
import { appStarted } from '@app/shared/config'
import '@app/shared/firebase'
import {
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  useFonts,
} from '@expo-google-fonts/nunito-sans'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'

const scope = fork()

export const Application: FC = () => {
  const [fontsLoaded, fontError] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
  })
  const [isAppReady, setAppReady] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      try {
        await allSettled(appStarted, { scope })
      } finally {
        setAppReady(true)
      }
    }

    prepare()
  }, [])

  if (!isAppReady || (!fontsLoaded && !fontError)) {
    return null
  }

  return (
    <Provider value={scope}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <RootScreens />
            </NavigationContainer>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  )
}
