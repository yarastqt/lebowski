import { allSettled } from 'effector'
import { Provider } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { RootScreens } from '@app/screens'
import { appStarted, scope } from '@app/shared/config'
import '@app/shared/firebase'
import '@app/shared/session'
import { useLoadFonts } from '@app/shared/theme'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'

export const Application: FC = () => {
  const { isFontsLoaded } = useLoadFonts()
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
