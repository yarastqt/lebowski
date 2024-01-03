import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '../theme'

export interface CheckProps {
  color?: string
  size?: number
}

export const Check: FC<CheckProps> = (props) => {
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
        d="M19.7157 4.38596C20.0571 3.95176 20.6857 3.87646 21.1199 4.21776C21.5541 4.55907 21.6294 5.18774 21.2881 5.62194L10.665 19.1363C10.6025 19.2159 10.532 19.289 10.4547 19.3544C9.82226 19.8895 8.87579 19.8106 8.34067 19.1782L3.23663 13.1462C2.87989 12.7246 2.93247 12.0936 3.35408 11.7368C3.77569 11.3801 4.40666 11.4327 4.76341 11.8543L9.47149 17.4184L19.7157 4.38596Z"
        fill="currentColor"
      />
    </Svg>
  )
}
