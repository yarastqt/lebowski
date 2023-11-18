import { FC } from 'react'

import { Qr } from '@app/shared/icons'
import { ListItem } from '@app/shared/ui'

export const ShareProfileListItem: FC = () => {
  return <ListItem before={<Qr size={24} />} title="Share profile" onPress={() => null} />
}
