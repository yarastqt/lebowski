export enum Route {
  root = 'root',
  signin = 'signin',
  signup = 'signup',
  settings = 'settings',
  splash = 'splash',
  profile = 'profile',
  createDebt = 'createDebt',
}

export type RootStackParamList = {
  root: undefined
  signin: undefined
  signup: undefined
  settings: undefined
  createDebt: undefined
  profile: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
