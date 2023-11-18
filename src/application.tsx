import { allSettled } from 'effector'
import { Provider, useUnit } from 'effector-react'
import * as SplashScreen from 'expo-splash-screen'
import { FC, useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { RootScreens } from '@app/screens'
import { appStarted, scope } from '@app/shared/config'
import '@app/shared/firebase'
import { sessionModel } from '@app/shared/session'
import { useLoadFonts } from '@app/shared/theme'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'

SplashScreen.preventAutoHideAsync()

export const Application: FC = () => {
  const { isFontsLoaded } = useLoadFonts()
  const { isSessionLoaded } = useUnit(sessionModel)
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

  useEffect(() => {
    if (isAppReady && isFontsLoaded && isSessionLoaded) {
      // TODO: Improve this behavior.
      setTimeout(() => {
        SplashScreen.hideAsync()
      }, 550)
    }
  }, [isAppReady, isFontsLoaded, isSessionLoaded])

  if (!isAppReady || !isFontsLoaded) {
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
