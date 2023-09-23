import { FC } from 'react'
import { Text } from 'react-native'
import { Provider } from 'effector-react'
import { fork } from 'effector'

import { MainLayout } from './layouts/main-layout'

const scope = fork()

export const Application: FC = () => {
  return (
    <Provider value={scope}>
      <MainLayout>
        <Text style={{ color: '#fff' }}>Hello worl</Text>
      </MainLayout>
    </Provider>
  )
}
