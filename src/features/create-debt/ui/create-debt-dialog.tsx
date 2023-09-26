import { useUnit } from 'effector-react'
import { FC, useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import { Close } from '@app/shared/icons'
import { createStyles } from '@app/shared/theme'
import { IconButton } from '@app/shared/ui'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import { createDebtModel } from '../model'

const SNAP_POINTS = ['90%']

export const CreateDebtDialog: FC = () => {
  const styles = useStyles()

  const sheetRef = useRef<BottomSheetModal>(null)
  const { isOpen, close } = useUnit(createDebtModel)

  useEffect(() => {
    if (isOpen) {
      sheetRef.current.present()
    } else {
      sheetRef.current.dismiss()
    }
  }, [isOpen])

  return (
    <BottomSheetModal
      backgroundStyle={styles.root}
      enablePanDownToClose={false}
      onDismiss={close}
      ref={sheetRef}
      snapPoints={SNAP_POINTS}
      handleComponent={null}
      backdropComponent={Backdrop}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Create new debt</Text>

        <IconButton size={44} onPress={close}>
          <Close size={24} />
        </IconButton>
      </View>

      <View style={styles.content}>
        <Text style={{ color: '#fff' }}>content</Text>
      </View>
    </BottomSheetModal>
  )
}

const Backdrop: FC = () => {
  const styles = useStyles()
  const { isOpen } = useUnit(createDebtModel)

  const opacity = useSharedValue(0)
  const rootStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  useEffect(() => {
    opacity.value = withSpring(isOpen ? 1 : 0)
  }, [isOpen])

  return <Animated.View style={[rootStyles, styles.backdrop]} />
}

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.color.surfaceSubmerged,
    borderRadius: 32,
  },

  backdrop: {
    backgroundColor: theme.color.surfaceOverlay,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 14,
    alignItems: 'center',
    paddingTop: 16,
  },

  title: {
    ...theme.typography.headingM,
    color: theme.color.textPrimary,
  },

  content: {
    padding: 24,
  },
}))
