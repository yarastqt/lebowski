import { FC, ReactNode } from 'react'

import { BaseLayout } from '../base-layout'
import { Header } from './ui/header'

export interface MainLayoutProps {
  children: ReactNode
  headerActions?: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children, headerActions } = props

  return <BaseLayout header={<Header actions={headerActions} />}>{children}</BaseLayout>
}
