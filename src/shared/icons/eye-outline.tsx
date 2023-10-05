import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '../theme'

export interface EyeOutlineProps {
  color?: string
  size?: number
}

export const EyeOutline: FC<EyeOutlineProps> = (props) => {
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
        d="M12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4.5C5.25 4.5 1.5 9.75 1.5 12C1.5 14.25 5.25 19.5 12 19.5C18.75 19.5 22.5 14.25 22.5 12C22.5 9.75 18.75 4.5 12 4.5ZM5.55234 15.1033C4.28143 13.9661 3.5 12.5836 3.5 12C3.5 11.4164 4.28143 10.0339 5.55234 8.89673C7.23072 7.39502 9.43844 6.5 12 6.5C14.5616 6.5 16.7693 7.39502 18.4477 8.89673C19.7186 10.0339 20.5 11.4164 20.5 12C20.5 12.5836 19.7186 13.9661 18.4477 15.1033C16.7693 16.605 14.5616 17.5 12 17.5C9.43844 17.5 7.23072 16.605 5.55234 15.1033Z"
        fill="currentColor"
      />
    </Svg>
  )
}
