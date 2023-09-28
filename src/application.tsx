import { fork } from 'effector'
import { Provider } from 'effector-react'
import { FC } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  useFonts,
} from '@expo-google-fonts/nunito-sans'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'

import { RootScreens } from './screens'

const scope = fork()

export const Application: FC = () => {
  let [fontsLoaded, fontError] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
  })

  if (!fontsLoaded && !fontError) {
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
