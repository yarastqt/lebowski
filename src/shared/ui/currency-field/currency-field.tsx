import { FC, useCallback, useState } from 'react'
import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'

import { toNormalizedNumber, useNumberFormatter } from '@app/shared/lib/number'

import { TextField, TextFieldProps } from '../textfield'

export const CurrencyField: FC<TextFieldProps> = (props) => {
  const { onBlur, onFocus, value, ...otherProps } = props

  const [formattedValue, setFormattedValue] = useState<string | null>(null)
  const numberFormatter = useNumberFormatter({ maximumFractionDigits: 2 })

  const onFocusHandler = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFormattedValue(null)
    onFocus?.(event)
  }, [])

  const onBlurHandler = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (value !== '') {
        setFormattedValue(numberFormatter.format(toNormalizedNumber(value)))
      }
      onBlur?.(event)
    },
    [value],
  )

  const valueHasSaparator = value.match(/,|\./) !== null
  const keyboardType: KeyboardTypeOptions = valueHasSaparator ? 'number-pad' : 'decimal-pad'

  return (
    <TextField
      {...otherProps}
      contextMenuHidden
      keyboardType={keyboardType}
      onBlur={onBlurHandler}
      onFocus={onFocusHandler}
      value={formattedValue ?? value}
    />
  )
}
