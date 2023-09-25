import { FC } from 'react'
import { Text, View } from 'react-native'

import { createStyles } from '@app/shared/theme'

export const Header: FC = () => {
  const styles = useStyles()

  return (
    <View style={styles.root}>
      <Text style={{ color: '#fff' }}>Leboski</Text>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    height: 64,
    justifyContent: 'center',
    paddingLeft: 24,
    paddingRight: 14,
  },
}))
