import { fork } from 'effector'
import { Provider } from 'effector-react'
import { FC } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { DebtsScreen } from '@app/screens/debts-screen'
import { PeopleScreen } from '@app/screens/people-screen'
import { ProfileScreen } from '@app/screens/profile-screen'
import { CreditCardOutline, PeopleGroupOutline, PersonOutline } from '@app/shared/icons'
import { RootStackParamList, Route } from '@app/shared/navigation'
import { BottomNavigation } from '@app/widgets/bottom-navigation'
import { NunitoSans_400Regular, useFonts } from '@expo-google-fonts/nunito-sans'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

const Tab = createBottomTabNavigator<RootStackParamList>()
const DEFAULT_SCREEN_OPTIONS: BottomTabNavigationOptions = {
  headerShown: false,
}

const scope = fork()

export const Application: FC = () => {
  let [fontsLoaded, fontError] = useFonts({
    NunitoSans_400Regular,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <Provider value={scope}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={Route.debts}
            tabBar={(props) => <BottomNavigation {...props} />}
          >
            <Tab.Screen
              component={DebtsScreen}
              name={Route.debts}
              options={{
                ...DEFAULT_SCREEN_OPTIONS,
                tabBarLabel: 'Debts',
                tabBarIcon: CreditCardOutline,
              }}
            />
            <Tab.Screen
              component={PeopleScreen}
              name={Route.people}
              options={{
                ...DEFAULT_SCREEN_OPTIONS,
                tabBarLabel: 'People',
                tabBarIcon: PeopleGroupOutline,
              }}
            />
            <Tab.Screen
              component={ProfileScreen}
              name={Route.profile}
              options={{
                ...DEFAULT_SCREEN_OPTIONS,
                tabBarLabel: 'Profile',
                tabBarIcon: PersonOutline,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
