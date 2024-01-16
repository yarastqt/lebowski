import { FC } from 'react'

import { Qr } from '@app/shared/icons'
import { Route, useNavigation } from '@app/shared/navigation'
import { ListItem } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

export const ShareProfileListItem: FC = () => {
  const { navigate } = useNavigation()

  return (
    <ListItem
      before={<Qr size={24} />}
      onPress={() => navigate(Route.ShareProfile)}
      title={<Trans>Share profile</Trans>}
    />
  )
}
