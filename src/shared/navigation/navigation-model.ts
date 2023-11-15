import { attach, createEvent, createStore, sample } from 'effector'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import { NavigationProp, useNavigation } from '@react-navigation/native'

const back = createEvent()
const navigationAttached = createEvent<NavigationProp<ReactNavigation.RootParamList>>()
const $navigation = createStore<NavigationProp<ReactNavigation.RootParamList> | null>(null)

const backFx = attach({
  source: $navigation,
  effect: (navigation) => {
    navigation?.goBack()
  },
})

sample({
  clock: navigationAttached,
  target: $navigation,
})

sample({
  clock: back,
  target: backFx,
})

export function useAttachNavigation() {
  const navigation = useNavigation()
  const onNavigationAttach = useUnit(navigationAttached)

  useEffect(() => {
    onNavigationAttach(navigation)
  }, [navigation])
}

export const navigationModel = {
  back,
}
