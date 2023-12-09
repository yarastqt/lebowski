import { useUnit } from 'effector-react'
import { FC } from 'react'

import { RootStackParamList, Route, useAttachNavigation } from '@app/shared/navigation'
import { sessionModel } from '@app/shared/session'
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { ActivityScreen } from './activity'
import { CreateTransactionScreen } from './create-transaction-screen'
import { CreateWalletScreen } from './create-wallet'
import { FriendScreen } from './friend-screen'
import { MainScreen } from './main-screen'
import { ProfileScreen } from './profile-screen'
import { SettingsScreen } from './settings-screen'
import { SignInScreen } from './signin-screen'
import { SignupScreen } from './signup-screen'

const RootStack = createNativeStackNavigator<RootStackParamList>()
const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
}

export const RootScreens: FC = () => {
  const { isSignedIn } = useUnit(sessionModel)

  useAttachNavigation()

  return (
    <RootStack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      {isSignedIn ? (
        <>
          <RootStack.Group>
            <RootStack.Screen component={MainScreen} name={Route.Root} />
            <RootStack.Screen component={FriendScreen} name={Route.Friend} />
            <RootStack.Screen component={ProfileScreen} name={Route.Profile} />
            <RootStack.Screen component={ActivityScreen} name={Route.Activity} />
            <RootStack.Screen component={SettingsScreen} name={Route.Settings} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen component={CreateTransactionScreen} name={Route.CreateTransaction} />
            <RootStack.Screen component={CreateWalletScreen} name={Route.CreateWallet} />
          </RootStack.Group>
        </>
      ) : (
        <RootStack.Group>
          <RootStack.Screen component={SignInScreen} name={Route.Signin} />
          <RootStack.Screen component={SignupScreen} name={Route.Signup} />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  )
}
