import { FC } from 'react'
import Skeleton, { Circle, Rect } from 'react-content-loader/native'

import { useTheme } from '@app/shared/theme'

export const UserListItemSkeleton: FC = () => {
  const theme = useTheme()

  return (
    <Skeleton
      animate
      backgroundColor={theme.color.skeletonBg}
      foregroundColor={theme.color.surface0}
      style={{ height: 66 }}
    >
      <Circle cx="40" cy="36" r="24" />
      <Rect x="72" y="16" rx="9" ry="9" width="128" height="18" />
      <Rect x="72" y="42" rx="8" ry="8" width="192" height="16" />
    </Skeleton>
  )
}
