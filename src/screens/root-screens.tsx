import { FC } from 'react'

import { RootStackParamList, Route } from '@app/shared/navigation'
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { MainScreens } from './main-screens'
import { SettingsScreen } from './settings-screen'
import { SignInScreen } from './signin-screen'
import { SignupScreen } from './signup-screen'

const RootStack = createNativeStackNavigator<RootStackParamList>()
const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
}

export const RootScreens: FC = () => {
  return (
    <RootStack.Navigator initialRouteName={Route.signin}>
      <RootStack.Screen
        component={MainScreens}
        name={Route.root}
        options={DEFAULT_SCREEN_OPTIONS}
      />
      <RootStack.Screen
        component={SignInScreen}
        name={Route.signin}
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
