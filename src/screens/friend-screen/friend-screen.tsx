import { FC } from 'react'

import { ScreenLayout } from '@app/layouts/screen-layout'
import { Route, ScreenProps, useNavigation } from '@app/shared/navigation'
import { ActionButton } from '@app/shared/ui'

export type FriendScreenProps = ScreenProps<'Friend'>

export const FriendScreen: FC<FriendScreenProps> = (props) => {
  const { route } = props

  const navigation = useNavigation()

  return (
    <ScreenLayout title={route.params.displayName}>
      <ActionButton
        onPress={() => {
          navigation.navigate(Route.CreateTransaction, {
            displayName: route.params.displayName,
            id: route.params.id,
          })
        }}
      >
        Create transaction
      </ActionButton>
    </ScreenLayout>
  )
}
