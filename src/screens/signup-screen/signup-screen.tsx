import { FC } from 'react'
import { View } from 'react-native'

import { SignupForm } from '@app/features/signup'
import { ScreenLayout } from '@app/layouts/screen-layout'
import { createStyles } from '@app/shared/theme'
import { Logo } from '@app/shared/ui'

export const SignupScreen: FC = () => {
  const styles = useStyles()

  return (
    <ScreenLayout title="Sign Up">
      <View style={styles.logo}>
        <Logo width={190} height={48} />
      </View>

      <SignupForm />
    </ScreenLayout>
  )
}

const useStyles = createStyles(() => ({
  logo: {
    alignItems: 'center',
    marginTop: 64,
  },
}))
