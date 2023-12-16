import { FC } from 'react'

import { CreditCardPlusOutline } from '@app/shared/icons'
import { Route, useNavigation } from '@app/shared/navigation'
import { IconButton } from '@app/shared/ui'

export interface CreateWalletButtonProps {
  friendId: string
}

export const CreateWalletButton: FC<CreateWalletButtonProps> = (props) => {
  const { friendId } = props

  const navigation = useNavigation()

  return (
    <IconButton size={44} onPress={() => navigation.navigate(Route.CreateWallet, { friendId })}>
      <CreditCardPlusOutline size={24} />
    </IconButton>
  )
}
