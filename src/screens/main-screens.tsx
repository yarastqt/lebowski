import { FC } from 'react'

import { CreditCardOutline, PeopleGroupOutline, PersonOutline } from '@app/shared/icons'
import { MainTabParamList, Route } from '@app/shared/navigation'
import { BottomNavigation } from '@app/widgets/bottom-navigation'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { DebtsScreen } from './debts-screen'
import { PeopleScreen } from './people-screen'
import { ProfileScreen } from './profile-screen'

const MainTab = createBottomTabNavigator<MainTabParamList>()
const DEFAULT_SCREEN_OPTIONS: BottomTabNavigationOptions = {
  headerShown: false,
}

export const MainScreens: FC = () => {
  return (
    <MainTab.Navigator
      initialRouteName={Route.debts}
      tabBar={(props) => <BottomNavigation {...props} />}
    >
      <MainTab.Screen
        component={DebtsScreen}
        name={Route.debts}
        options={{
          ...DEFAULT_SCREEN_OPTIONS,
          tabBarLabel: 'Debts',
          tabBarIcon: CreditCardOutline,
        }}
      />
      <MainTab.Screen
        component={PeopleScreen}
        name={Route.people}
        options={{
          ...DEFAULT_SCREEN_OPTIONS,
          tabBarLabel: 'People',
          tabBarIcon: PeopleGroupOutline,
        }}
      />
      <MainTab.Screen
        component={ProfileScreen}
        name={Route.profile}
        options={{
          ...DEFAULT_SCREEN_OPTIONS,
          tabBarLabel: 'Profile',
          tabBarIcon: PersonOutline,
        }}
      />
    </MainTab.Navigator>
  )
}
