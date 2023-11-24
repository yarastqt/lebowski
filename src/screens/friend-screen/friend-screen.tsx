import { FC } from 'react'

import { ScreenLayout } from '@app/layouts/screen-layout'
import { ScreenProps } from '@app/shared/navigation'

export type FriendScreenProps = ScreenProps<'friend'>

export const FriendScreen: FC<FriendScreenProps> = (props) => {
  const { route } = props

  return <ScreenLayout title={route.params.displayName}>{/*  */}</ScreenLayout>
}
