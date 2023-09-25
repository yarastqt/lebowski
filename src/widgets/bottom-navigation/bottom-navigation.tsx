import { FC } from 'react'
import { View } from 'react-native'

import { CreditCardPlusOutline } from '@app/shared/icons'
import { createStyles } from '@app/shared/theme'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { BottomNavigationButton } from './bottom-navigation-button'

export const BottomNavigation: FC<BottomTabBarProps> = (props) => {
  const { descriptors, navigation, state } = props
  const styles = useStyles()

  const buttons = state.routes.map((route, index) => {
    const { options } = descriptors[route.key]
    const label = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : 'Unknown'

    const isActive = state.index === index
    const onPressHandler = () => {
      if (!isActive) {
        navigation.navigate(route.name)
      }
    }

    return (
      <BottomNavigationButton
        key={index}
        isActive={isActive}
        icon={options.tabBarIcon}
        onPress={onPressHandler}
      >
        {label}
      </BottomNavigationButton>
    )
  })

  return (
    <View style={styles.root}>
      {buttons}
      <BottomNavigationButton icon={CreditCardPlusOutline} isActive={false} onPress={() => null}>
        New debt
      </BottomNavigationButton>
    </View>
  )
}

const useStyles = createStyles((theme, insets) => ({
  root: {
    position: 'absolute',
    bottom: insets.bottom,
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
