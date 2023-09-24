import { FC } from 'react'
import { View } from 'react-native'
import {
  CreditCardOutline,
  CreditCardPlusOutline,
  PeopleGroupOutline,
  PersonOutline,
} from '~/shared/icons'

import { createStyles } from '../../shared/theme'
import { BottomNavigationButton } from './bottom-navigation-button'

export const BottomNavigation: FC = () => {
  const styles = useStyles()

  return (
    <View style={styles.root}>
      <BottomNavigationButton icon={CreditCardOutline} isActive onPress={() => null}>
        Debts
      </BottomNavigationButton>
      <BottomNavigationButton icon={PeopleGroupOutline} isActive={false} onPress={() => null}>
        People
      </BottomNavigationButton>
      <BottomNavigationButton icon={PersonOutline} isActive={false} onPress={() => null}>
        Profile
      </BottomNavigationButton>
      <BottomNavigationButton icon={CreditCardPlusOutline} isActive={false} onPress={() => null}>
        New debt
      </BottomNavigationButton>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    backgroundColor: theme.color.surfaceSubmerged,
    height: 80,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))
