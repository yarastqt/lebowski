import { i18n } from '@lingui/core'

import { messages as en } from './locales/en/messages'

i18n.loadAndActivate({ locale: 'en', messages: en })

export { I18nProvider } from '@lingui/react'
export { i18n }
