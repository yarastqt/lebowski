import { FC, ReactNode } from 'react'

import { BaseLayout } from '../base-layout'

export interface ModalLayoutProps {
  children: ReactNode
}

export const ModalLayout: FC<ModalLayoutProps> = (props) => {
  const { children } = props

  return <BaseLayout edgets={{ top: 'off' }}>{children}</BaseLayout>
}
