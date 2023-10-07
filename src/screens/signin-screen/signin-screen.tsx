import { FC } from 'react'
import { Text, View } from 'react-native'

import { SignInByPasswordForm } from '@app/features/sign-in-by-password'
import { BaseLayout } from '@app/layouts/base-layout'
import { Route, useNavigation } from '@app/shared/navigation'
import { createStyles } from '@app/shared/theme'
import { IconButton } from '@app/shared/ui'

export const SignInScreen: FC = () => {
  const styles = useStyles()
  const { navigate } = useNavigation()

  return (
    <BaseLayout>
      <SignInByPasswordForm />

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>

        <IconButton onPress={() => navigate(Route.signup)}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </IconButton>
      </View>
    </BaseLayout>
  )
}

const useStyles = createStyles((theme) => ({
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },

  signupText: {
    ...theme.typography.textM,
    color: theme.color.textSecondary,
  },

  signupButtonText: {
    ...theme.typography.textM,
    color: theme.color.textPrimary,
  },
}))
