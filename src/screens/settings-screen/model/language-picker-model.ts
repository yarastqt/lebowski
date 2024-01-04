import { createEffect, createEvent, sample } from 'effector'

import { Language, api } from '@app/shared/api'
import { sessionModel } from '@app/shared/session'

const languageChanged = createEvent<Language>()

const $language = sessionModel.$user.map((user) => user?.settings.language ?? Language.En)

const updateLanguageFx = createEffect((language: Language) => {
  return api.updateSettings({ language })
})

sample({
  clock: languageChanged,
  target: [updateLanguageFx],
})

export const languagePickerModel = {
  '@@unitShape': () => ({
    language: $language,
    onLanguageChange: languageChanged,
  }),
}
