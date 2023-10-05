import { FC } from 'react'

import { SignupForm } from '@app/features/signup'
import { ScreenLayout } from '@app/layouts/screen-layout'

export const SignupScreen: FC = () => {
  return (
    <ScreenLayout title="Sign Up">
      <SignupForm />
    </ScreenLayout>
  )
}
