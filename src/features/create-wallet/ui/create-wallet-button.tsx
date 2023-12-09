import { FC } from 'react'

import { CreditCardPlusOutline } from '@app/shared/icons'
import { Route, useNavigation } from '@app/shared/navigation'
import { IconButton } from '@app/shared/ui'

export const CreateWalletButton: FC = () => {
  const navigation = useNavigation()

  return (
    <IconButton size={44} onPress={() => navigation.navigate(Route.CreateWallet)}>
      <CreditCardPlusOutline size={24} />
    </IconButton>
  )
}
