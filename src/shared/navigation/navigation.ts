import { NativeStackScreenProps } from '@react-navigation/native-stack'

export enum Route {
  root = 'root',
  signin = 'signin',
  signup = 'signup',
  settings = 'settings',
  splash = 'splash',
  profile = 'profile',
  friend = 'friend',
  createTransaction = 'createTransaction',
}

export type RootStackParamList = {
  root: undefined
  signin: undefined
  signup: undefined
  settings: undefined
  createTransaction: undefined
  profile: undefined
  friend: { displayName: string; id: string }
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
