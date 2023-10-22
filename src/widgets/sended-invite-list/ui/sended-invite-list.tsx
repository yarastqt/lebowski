import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'
import { Text, View } from 'react-native'

import { sendedInviteListModel } from '../model'

export const SendedInviteList: FC = () => {
  const { invites, onWidgetMount } = useUnit(sendedInviteListModel)

  useEffect(() => {
    onWidgetMount()
  }, [onWidgetMount])

  return (
    <View>
      <Text>Sended invites</Text>

      {invites.map((invite) => (
        <View key={invite.id}>
          <Text style={{ color: '#fff' }}>{invite.email}</Text>
        </View>
      ))}
    </View>
  )
}
