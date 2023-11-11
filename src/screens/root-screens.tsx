import { useUnit } from 'effector-react'
import { FC } from 'react'

import { RootStackParamList, Route } from '@app/shared/navigation'
import { sessionModel } from '@app/shared/session'
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { CreateDebtScreen } from './create-debt-screen'
import { MainScreens } from './main-screens'
import { SettingsScreen } from './settings-screen'
import { SignInScreen } from './signin-screen'
import { SignupScreen } from './signup-screen'

const RootStack = createNativeStackNavigator<RootStackParamList>()
const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
}

export const RootScreens: FC = () => {
  const { isSignedIn } = useUnit(sessionModel)

  return (
    <RootStack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      {isSignedIn ? (
        <>
          <RootStack.Group>
            <RootStack.Screen component={MainScreens} name={Route.root} />
            <RootStack.Screen component={SettingsScreen} name={Route.settings} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen component={CreateDebtScreen} name={Route.createDebt} />
          </RootStack.Group>
        </>
      ) : (
        <RootStack.Group screenOptions={{ gestureEnabled: false }}>
          <RootStack.Screen component={SignInScreen} name={Route.signin} />
          <RootStack.Screen component={SignupScreen} name={Route.signup} />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  )
}
