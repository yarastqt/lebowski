import { createEffect, createEvent, sample } from 'effector'

import { Language, api } from '@app/shared/api'
import { i18nModel } from '@app/shared/i18n'

const languageChanged = createEvent<Language>()

const updateLanguageFx = createEffect((language: Language) => {
  return api.updateSettings({ language })
})

sample({
  clock: languageChanged,
  target: updateLanguageFx,
})

export const languagePickerModel = {
  '@@unitShape': () => ({
    language: i18nModel.$language,
    onLanguageChange: languageChanged,
  }),
}
