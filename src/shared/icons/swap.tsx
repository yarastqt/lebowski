import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '../theme'

export interface SwapProps {
  color?: string
  size?: number
}

export const Swap: FC<SwapProps> = (props) => {
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
        d="M16 3.93007C16 3.32507 16.6795 2.96905 17.1769 3.31342L21.6093 6.382C22.0401 6.68024 22.0401 7.31705 21.6093 7.61528L17.1769 10.6839C16.6795 11.0282 16 10.6722 16 10.0672V8H4C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6H16V3.93007Z"
        fill="currentColor"
      />
      <Path
        d="M6.82309 13.3134C7.32052 12.9691 8 13.3251 8 13.9301V16H20C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18H8V20.0672C8 20.6722 7.32052 21.0282 6.82309 20.6839L2.39071 17.6153C1.95992 17.317 1.95992 16.6802 2.39071 16.382L6.82309 13.3134Z"
        fill="currentColor"
      />
    </Svg>
  )
}
