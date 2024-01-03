import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '../theme'

export interface ArrowShortBottomProps {
  color?: string
  size?: number
}

export const ArrowShortBottom: FC<ArrowShortBottomProps> = (props) => {
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
        d="M12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L13.0607 16.3536C12.4749 16.9393 11.5251 16.9393 10.9393 16.3536L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858Z"
        fill="currentColor"
      />
    </Svg>
  )
}
