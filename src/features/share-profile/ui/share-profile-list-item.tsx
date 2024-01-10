import { FC } from 'react'

import { Qr } from '@app/shared/icons'
import { ListItem } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

export const ShareProfileListItem: FC = () => {
  return (
    <ListItem before={<Qr size={24} />} title={<Trans>Share profile</Trans>} onPress={() => null} />
  )
}
