import { FC, ReactNode } from 'react'

import { BaseLayout } from '../base-layout'
import { Header } from './ui/header'

export interface ScreenLayoutProps {
  children: ReactNode
  title: string
}

export const ScreenLayout: FC<ScreenLayoutProps> = (props) => {
  const { children, title } = props

  return <BaseLayout header={<Header>{title}</Header>}>{children}</BaseLayout>
}
