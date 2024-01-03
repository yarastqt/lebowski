import { FC } from 'react'
import Skeleton, { Rect } from 'react-content-loader/native'

import { useTheme } from '@app/shared/theme'

export const TransactionCardSkeleton: FC = () => {
  const theme = useTheme()

  return (
    <Skeleton
      animate
      backgroundColor={theme.color.skeletonBg}
      foregroundColor={theme.color.surface0}
      height={74}
    >
      <Rect x="0" y="0" rx="20" ry="20" width="100%" height="74" />
    </Skeleton>
  )
}
