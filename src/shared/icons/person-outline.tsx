import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '../theme'

export interface PersonOutlineProps {
  color?: string
  size?: number
}

export const PersonOutline: FC<PersonOutlineProps> = (props) => {
  const { color, size = 24 } = props

  const theme = useTheme()

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 14.35C8.75 14.35 7 11.1754 7 7.625C7 4.15 9 2 12 2C15 2 17 4.15 17 7.625C17 11.1754 15.25 14.35 12 14.35ZM12 12.35C13.7395 12.35 15 10.5013 15 7.625C15 5.24619 13.878 4 12 4C10.122 4 9 5.24619 9 7.625C9 10.5013 10.2606 12.35 12 12.35Z"
        fill={color ?? theme.color.textPrimary}
      />
      <Path
        d="M4.94011 21.9982C5.4914 22.0313 5.96513 21.6112 5.99821 21.0599C6.11353 19.1378 8.04129 18 12.0038 18C15.9644 18 17.8868 19.1363 18.0035 21.0606C18.0369 21.6118 18.511 22.0316 19.0622 21.9982C19.6135 21.9647 20.0333 21.4907 19.9998 20.9394C19.8047 17.7224 16.8907 16 12.0038 16C7.11482 16 4.19479 17.7235 4.0018 20.9401C3.96872 21.4914 4.38882 21.9651 4.94011 21.9982Z"
        fill={color ?? theme.color.textPrimary}
      />
    </Svg>
  )
}
