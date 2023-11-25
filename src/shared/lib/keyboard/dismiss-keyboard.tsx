import { FC, ReactNode } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

export interface DismissKeyboardProps {
  children: ReactNode
}

export const DismissKeyboard: FC<DismissKeyboardProps> = (props) => {
  const { children } = props

  return <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
}
