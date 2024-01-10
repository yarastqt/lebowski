import { FC } from 'react'

import { ShareProfileListItem } from '@app/features/share-profile'
import { SignOutListItem } from '@app/features/sign-out'
import { ScreenLayout } from '@app/layouts/screen-layout'
import { SettingsOutline } from '@app/shared/icons'
import { Route } from '@app/shared/navigation'
import { List, ListItem, Section } from '@app/shared/ui'
import { ProfileInfo } from '@app/widgets/profile-info'
import { Trans } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'

export const ProfileScreen: FC = () => {
  const navigation = useNavigation()

  return (
    <ScreenLayout title={<Trans>Profile</Trans>}>
      <Section>
        <ProfileInfo />

        <List>
          <ListItem
            before={<SettingsOutline size={24} />}
            title={<Trans>Settings</Trans>}
            onPress={() => navigation.navigate(Route.Settings)}
          />
          <ShareProfileListItem />
          <SignOutListItem />
        </List>
      </Section>
    </ScreenLayout>
  )
}
