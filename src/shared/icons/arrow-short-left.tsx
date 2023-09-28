import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '../theme'

export interface ArrowShortLeftProps {
  color?: string
  size?: number
}

export const ArrowShortLeft: FC<ArrowShortLeftProps> = (props) => {
  const { color, size = 24 } = props

  const theme = useTheme()

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      color={color ?? theme.color.textPrimary}
    >
      <Path
        d="M15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.64643 13.0607C7.06065 12.4749 7.06065 11.5251 7.64643 10.9393L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.4142 12L15.7071 18.2929Z"
        fill="currentColor"
      />
    </Svg>
  )
}
