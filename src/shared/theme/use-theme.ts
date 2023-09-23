import { useUnit } from 'effector-react'

import { darkTheme } from './dark-theme'
import { lightTheme } from './light-theme'
import { $$theme } from './model'

export function useTheme() {
  const colorScheme = useUnit($$theme.$colorScheme)

  return colorScheme === 'light' ? lightTheme : darkTheme
}
