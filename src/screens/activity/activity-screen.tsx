import { FC } from 'react'

import { ScreenLayout } from '@app/layouts/screen-layout'
import { Text } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

export const ActivityScreen: FC = () => {
  return (
    <ScreenLayout title={<Trans>Activity</Trans>}>
      <Text variant="heading-m">???</Text>
    </ScreenLayout>
  )
}
