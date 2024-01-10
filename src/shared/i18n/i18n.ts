import { createEffect, sample } from 'effector'

import { Language } from '@app/shared/api'
import { sessionModel } from '@app/shared/session'
import { i18n } from '@lingui/core'

import { messages as en } from './locales/en/messages'
import { messages as ru } from './locales/ru/messages'

export { I18nProvider, useLingui } from '@lingui/react'
export { i18n }

i18n.load({ en, ru })
i18n.activate('en')

const $language = sessionModel.$user.map((user) => user?.settings.language ?? Language.En)

const changeLanguageFx = createEffect((language: Language) => {
  i18n.activate(language)
})

sample({
  clock: $language,
  target: changeLanguageFx,
})

export const i18nModel = {
  $language,
}
