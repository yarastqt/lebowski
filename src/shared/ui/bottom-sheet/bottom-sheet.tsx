import { FC, ReactNode, useEffect, useRef } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Close } from '@app/shared/icons'
import { createStyles } from '@app/shared/theme'
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheet,
} from '@gorhom/bottom-sheet'

import { IconButton } from '../icon-button'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export interface BottomSheetProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  title?: string
}

export const BottomSheet: FC<BottomSheetProps> = (props) => {
  const { children, isOpen, onClose, title } = props

  const safeAriaInsets = useSafeAreaInsets()
  const styles = useStyles()

  const sheetRef = useRef<BottomSheetModal>(null)

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.present()
    } else {
      sheetRef.current?.dismiss()
    }
  }, [isOpen])

  return (
    <BottomSheetModal
      backgroundStyle={styles.root}
      onDismiss={onClose}
      ref={sheetRef}
      enableDynamicSizing
      handleComponent={null}
      backdropComponent={Backdrop}
    >
      <BottomSheetView>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>

          <IconButton size={44} onPress={onClose}>
            <Close size={24} />
          </IconButton>
        </View>

        <View style={[styles.content, { paddingBottom: safeAriaInsets.bottom }]}>{children}</View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const Backdrop: FC<BottomSheetBackdropProps> = (props) => {
  const { animatedIndex } = props

  const styles = useStyles()

  const { close } = useBottomSheet()

  const rootStyles = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [-1, 0], [0, 1], Extrapolate.CLAMP),
  }))

  return <AnimatedPressable style={[styles.backdrop, rootStyles]} onPress={() => close()} />
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
