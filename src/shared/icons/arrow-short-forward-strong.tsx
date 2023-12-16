import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '../theme'

export interface ArrowShortForwardStrongProps {
  color?: string
  size?: number
}

export const ArrowShortForwardStrong: FC<ArrowShortForwardStrongProps> = (props) => {
  const { color, size = 12 } = props

  const theme = useTheme()

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      color={color ?? theme.color.textPrimary}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.29436 2.29289C3.90383 2.68342 3.90383 3.31658 4.29436 3.70711L6.58725 6L4.29436 8.29289C3.90383 8.68342 3.90383 9.31658 4.29436 9.70711C4.68488 10.0976 5.31805 10.0976 5.70857 9.70711L8.70857 6.70711C9.0991 6.31658 9.0991 5.68342 8.70857 5.29289L5.70857 2.29289C5.31805 1.90237 4.68488 1.90237 4.29436 2.29289Z"
        fill="currentColor"
      />
    </Svg>
  )
}
