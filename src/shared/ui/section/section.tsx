import { FC, ReactNode } from 'react'
import { View } from 'react-native'

import { createStyles } from '@app/shared/theme'

export interface SectionProps {
  children: ReactNode
  isStretched?: boolean
}

export const Section: FC<SectionProps> = (props) => {
  const { children, isStretched } = props

  const styles = useStyles()

  return <View style={styles.root({ isStretched })}>{children}</View>
}

const useStyles = createStyles(() => ({
  root: (props: Pick<SectionProps, 'isStretched'>) => ({
    flex: props.isStretched ? 1 : 0,
    gap: 24,
    padding: 24,
  }),
}))
