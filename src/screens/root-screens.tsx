import { FC } from 'react'

import { RootStackParamList, Route } from '@app/shared/navigation'
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { AuthScreen } from './auth-screen'
import { MainScreens } from './main-screens'
import { SettingsScreen } from './settings-screen'
import { SignupScreen } from './signup-screen'

const RootStack = createNativeStackNavigator<RootStackParamList>()
const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
}

export const RootScreens: FC = () => {
  return (
    <RootStack.Navigator initialRouteName={Route.auth}>
      <RootStack.Screen
        component={MainScreens}
        name={Route.root}
        options={DEFAULT_SCREEN_OPTIONS}
      />
      <RootStack.Screen
        component={AuthScreen}
        name={Route.auth}
        options={{ ...DEFAULT_SCREEN_OPTIONS, gestureEnabled: false }}
      />
      <RootStack.Screen
        component={SignupScreen}
        name={Route.signup}
        options={{ ...DEFAULT_SCREEN_OPTIONS, gestureEnabled: false }}
      />
      <RootStack.Screen
        component={SettingsScreen}
        name={Route.settings}
        options={DEFAULT_SCREEN_OPTIONS}
      />
    </RootStack.Navigator>
  )
}
