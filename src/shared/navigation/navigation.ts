export enum Route {
  root = 'root',
  settings = 'settings',

  splash = 'splash',
  debts = 'debts',
  people = 'people',
  profile = 'profile',
}

export type MainTabParamList = {
  splash: undefined
  debts: undefined
  people: undefined
  profile: undefined
}

export type RootStackParamList = {
  root: undefined
  settings: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainTabParamList, RootStackParamList {}
  }
}
