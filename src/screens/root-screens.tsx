import { FC } from 'react'

import { RootStackParamList, Route } from '@app/shared/navigation'
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { MainScreens } from './main-screens'
import { SettingsScreen } from './settings-screen'

const RootStack = createNativeStackNavigator<RootStackParamList>()
const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
}

export const RootScreens: FC = () => {
  return (
    <RootStack.Navigator initialRouteName={Route.root}>
      <RootStack.Screen
        component={MainScreens}
        name={Route.root}
        options={DEFAULT_SCREEN_OPTIONS}
      />
      <RootStack.Screen
        component={SettingsScreen}
        name={Route.settings}
        options={DEFAULT_SCREEN_OPTIONS}
      />
    </RootStack.Navigator>
  )
}
