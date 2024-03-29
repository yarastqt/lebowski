import { Currency } from '@app/shared/api'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export enum Route {
  Root = 'Root',
  Signin = 'Signin',
  Signup = 'Signup',
  Settings = 'Settings',
  Activity = 'Activity',
  Splash = 'Splash',
  Profile = 'Profile',
  Friend = 'Friend',
  CreateTransaction = 'CreateTransaction',
  CreateWallet = 'CreateWallet',
  ProfileEditor = 'ProfileEditor',
  SendInvite = 'SendInvite',
  ShareProfile = 'ShareProfile',
}

export type RootStackParamList = {
  Root: undefined
  Signin: undefined
  Signup: undefined
  Settings: undefined
  Activity: undefined
  CreateTransaction: { displayName: string; id: string; currency: Currency }
  CreateWallet: { friendId: string }
  Profile: undefined
  Friend: { displayName: string; id: string }
  ProfileEditor: undefined
  SendInvite: undefined
  ShareProfile: undefined
}

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
