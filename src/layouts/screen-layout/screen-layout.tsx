import { FC, ReactNode } from 'react'
import { Edges } from 'react-native-safe-area-context'

import { BaseLayout } from '../base-layout'
import { Header } from './ui/header'

export interface ScreenLayoutProps {
  children: ReactNode
  edgets?: Edges
  title: string
}

export const ScreenLayout: FC<ScreenLayoutProps> = (props) => {
  const { children, edgets, title } = props

  return (
    <BaseLayout edgets={edgets} header={<Header>{title}</Header>}>
      {children}
    </BaseLayout>
  )
}
