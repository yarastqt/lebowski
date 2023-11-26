import { NativeStackScreenProps } from '@react-navigation/native-stack'

export enum Route {
  Root = 'Root',
  Signin = 'Signin',
  Signup = 'Signup',
  Settings = 'Settings',
  Splash = 'Splash',
  Profile = 'Profile',
  Friend = 'Friend',
  CreateTransaction = 'CreateTransaction',
}

export type RootStackParamList = {
  Root: undefined
  Signin: undefined
  Signup: undefined
  Settings: undefined
  CreateTransaction: { displayName: string; id: string }
  Profile: undefined
  Friend: { displayName: string; id: string }
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
