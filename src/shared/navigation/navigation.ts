export enum Route {
  splash = 'splash',
  debts = 'debts',
  people = 'people',
  profile = 'profile',
}

export type RootStackParamList = {
  splash: undefined
  debts: undefined
  people: undefined
  profile: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
