export enum Route {
  root = 'root',
  signin = 'signin',
  signup = 'signup',
  settings = 'settings',
  splash = 'splash',
  debts = 'debts',
  people = 'people',
  profile = 'profile',
  createDebt = 'createDebt',
}

export type MainTabParamList = {
  splash: undefined
  debts: undefined
  people: undefined
  profile: undefined
}

export type RootStackParamList = {
  root: undefined
  signin: undefined
  signup: undefined
  settings: undefined
  createDebt: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainTabParamList, RootStackParamList {}
  }
}
