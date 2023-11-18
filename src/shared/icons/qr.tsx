import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '../theme'

export interface QrProps {
  color?: string
  size?: number
}

export const Qr: FC<QrProps> = (props) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 7.50451C21 8.33294 20.3284 9.00451 19.5 9.00451H16.5C15.6716 9.00451 15 8.33294 15 7.50451V4.5C15 3.67157 15.6716 3 16.5 3H19.5C20.3284 3 21 3.67157 21 4.5V7.50451ZM19 5V7.00451H17V5H19Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 7.5V4.50395C9 3.67618 8.32946 3.00488 7.50169 3.00395L4.50169 3.00057C3.67326 2.99963 3.00094 3.67045 3 4.50057V7.5C3 8.32843 3.67157 9 4.5 9H7.5C8.32843 9 9 8.32843 9 7.5ZM5 7V5.00113L7 5.00339V7H5Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.49831 15.004L7.49831 15.0006C8.32843 15.0006 9 15.6721 9 16.5006V19.5C9 20.3284 8.32843 21 7.5 21H4.5C3.67157 21 3 20.3284 3 19.5V16.504C3 15.6762 3.67054 15.0049 4.49831 15.004ZM7 19H5V17.0034L7 17.0011V19Z"
        fill="currentColor"
      />
      <Path
        d="M19 16C19 15.4477 19.4477 15 20 15C20.5523 15 21 15.4477 21 16V19.5006C21 20.3283 20.3295 20.9996 19.5017 21.0006L16.0011 21.0045C15.4488 21.0051 15.0006 20.5579 15 20.0056C14.9994 19.4534 15.4466 19.0051 15.9989 19.0045L19 19.0011V16Z"
        fill="currentColor"
      />
      <Path
        d="M11 4V11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H12C12.5523 13 13 12.5523 13 12V4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4Z"
        fill="currentColor"
      />
      <Path
        d="M13 20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16V20Z"
        fill="currentColor"
      />
      <Path
        d="M16 17C16.5523 17 17 16.5523 17 16V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H16C15.4477 11 15 11.4477 15 12V16C15 16.5523 15.4477 17 16 17Z"
        fill="currentColor"
      />
    </Svg>
  )
}
