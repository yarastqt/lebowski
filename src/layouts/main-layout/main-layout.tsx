import { FC, ReactNode } from 'react'

import { BaseLayout } from '../base-layout'
import { Header } from './ui/header'

export interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props

  return <BaseLayout header={<Header />}>{children}</BaseLayout>
}
