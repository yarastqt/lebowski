import { FC, ReactNode } from 'react'

import { createStyles, useTheme } from '@app/shared/theme'
import { Picker as PickerBase } from '@react-native-picker/picker'

export interface PickerProps<T> {
  children: ReactNode
  onChange: (value: T) => void
  value: T
}

function Picker<T extends string>(props: PickerProps<T>) {
  const { children, onChange, value } = props

  const theme = useTheme()
  const styles = useStyles()

  return (
    <PickerBase
      itemStyle={styles.item}
      style={styles.root}
      selectionColor={theme.color.defaultBgBase}
      selectedValue={value}
      onValueChange={onChange}
    >
      {children}
    </PickerBase>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    borderColor: theme.color.defaultBorder,
    borderWidth: 2,
    borderRadius: 20,
  },

  item: {
    ...theme.typography.textM,
    color: theme.color.textPrimary,
  },
}))

const _Picker = Object.assign(Picker, { Item: PickerBase.Item })

export { _Picker as Picker }
