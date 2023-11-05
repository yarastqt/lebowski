import { FC } from 'react'
import { Text } from 'react-native'

import { createStyles } from '@app/shared/theme'

import appConfig from '../../../../app.json'

export const AppVersion: FC = () => {
  const styles = useStyles()

  return (
    <Text style={styles.root}>
      {appConfig.expo.name} {appConfig.expo.version}
    </Text>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    ...theme.typography.textS,
    color: theme.color.textSecondary,
    textAlign: 'center',
  },
}))
