import { FC } from 'react'
import { View } from 'react-native'

import { ScreenLayout } from '@app/layouts/screen-layout'
import { createStyles } from '@app/shared/theme'
import { Section, SectionHeading } from '@app/shared/ui'
import { Trans } from '@lingui/macro'

import { AppVersion } from './ui/app-version'
import { CurrencyPicker } from './ui/currency-picker'
import { LanguagePicker } from './ui/language-picker'

export const SettingsScreen: FC = () => {
  const styles = useStyles()

  return (
    <ScreenLayout title={<Trans>Settings</Trans>}>
      <Section>
        <SectionHeading>
          <Trans>General</Trans>
        </SectionHeading>
        <CurrencyPicker />
      </Section>

      <Section>
        <SectionHeading>
          <Trans>Interface</Trans>
        </SectionHeading>
        <LanguagePicker />
      </Section>

      <Section>
        <View style={styles.footer}>
          <AppVersion />
        </View>
      </Section>
    </ScreenLayout>
  )
}

const useStyles = createStyles(() => ({
  footer: {
    marginTop: 'auto',
  },
}))
