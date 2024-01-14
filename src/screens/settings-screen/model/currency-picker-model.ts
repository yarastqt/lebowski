import { createEffect, createEvent, sample } from 'effector'

import { Currency, api } from '@app/shared/api'
import { sessionModel } from '@app/shared/session'

const currencyChanged = createEvent<Currency>()

const $defaultCurrency = sessionModel.$user.map(
  (user) => user?.settings.defaultCurrency ?? Currency.Unknown,
)

const updateCurrencyFx = createEffect((currency: Currency) => {
  return api.updateSettings({ defaultCurrency: currency })
})

sample({
  clock: currencyChanged,
  target: updateCurrencyFx,
})

export const currencyPickerModel = {
  $defaultCurrency,
  currencyChanged,
}
