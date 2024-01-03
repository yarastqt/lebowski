import { FC, ReactNode } from 'react'
import { ScrollView, View } from 'react-native'

import { createStyles } from '@app/shared/theme'

export interface FormProps {
  children: ReactNode
}

export const Form: FC<FormProps> = (props) => {
  const { children } = props

  const styles = useStyles()

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.root}>{children}</View>
    </ScrollView>
  )
}

const useStyles = createStyles(() => ({
  root: {
    gap: 24,
  },
}))
