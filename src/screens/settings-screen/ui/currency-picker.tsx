import { useUnit } from 'effector-react'
import { FC } from 'react'

import { Currency } from '@app/shared/api'
import { Picker } from '@app/shared/ui/next'
import { Trans } from '@lingui/macro'

import { currencyPickerModel } from '../model'

export const CurrencyPicker: FC = () => {
  const { defaultCurrency, onCurrencyChange } = useUnit({
    defaultCurrency: currencyPickerModel.$defaultCurrency,
    onCurrencyChange: currencyPickerModel.currencyChanged,
  })

  return (
    <Picker
      title={<Trans>Select default currency</Trans>}
      label={<Trans>Default currency</Trans>}
      items={[
        { id: Currency.Amd, title: 'AMD' },
        { id: Currency.Rub, title: 'RUB' },
        { id: Currency.Usd, title: 'USD' },
      ]}
      onChange={onCurrencyChange}
      value={defaultCurrency}
    />
  )
}
