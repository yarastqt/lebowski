import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '../theme'

export interface ErrorTrinagleStrongProps {
  color?: string
  size?: number
}

export const ErrorTrinagleStrong: FC<ErrorTrinagleStrongProps> = (props) => {
  const { color, size = 16 } = props

  const theme = useTheme()

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      color={color ?? theme.color.textPrimary}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.67551 1.63185C6.70849 -0.157314 9.29092 -0.157312 10.3239 1.63185L15.6363 10.8333C16.6693 12.6224 15.3781 14.8589 13.3121 14.8589H2.68726C0.621311 14.8589 -0.669905 12.6224 0.36307 10.8333L5.67551 1.63185ZM8.42143 4.25604H7.57893C7.13521 4.25604 6.7885 4.63916 6.83265 5.08068L7.20515 8.80529C7.23071 9.06089 7.4458 9.25554 7.70267 9.25554H8.29769C8.55457 9.25554 8.76965 9.06089 8.79521 8.80529L9.16771 5.08068C9.21187 4.63916 8.86515 4.25604 8.42143 4.25604ZM6.86029 11.2868C6.86029 10.6148 7.35229 10.1468 8.00029 10.1468C8.64829 10.1468 9.14029 10.6148 9.14029 11.2868C9.14029 11.9588 8.64829 12.4268 8.00029 12.4268C7.35229 12.4268 6.86029 11.9588 6.86029 11.2868Z"
        fill="currentColor"
      />
    </Svg>
  )
}
