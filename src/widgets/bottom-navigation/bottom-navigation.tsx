import { useUnit } from 'effector-react'
import { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { CreateDebtDialog, createDebtModel } from '@app/features/create-debt'
import { CreditCardPlusOutline } from '@app/shared/icons'
import { createStyles } from '@app/shared/theme'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { BottomNavigationButton } from './bottom-navigation-button'

export const BottomNavigation: FC<BottomTabBarProps> = (props) => {
  const { descriptors, navigation, state } = props
  const safeAriaInsets = useSafeAreaInsets()
  const styles = useStyles()
  const { open } = useUnit(createDebtModel)

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
    <>
      <View style={[styles.root, { bottom: safeAriaInsets.bottom }]}>
        {buttons}
        <BottomNavigationButton icon={CreditCardPlusOutline} isActive={false} onPress={open}>
          New debt
        </BottomNavigationButton>
      </View>

      <CreateDebtDialog />
    </>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'absolute',
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
