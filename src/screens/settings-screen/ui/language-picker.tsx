import { useUnit } from 'effector-react'
import { FC } from 'react'

import { Picker } from '@app/shared/ui/next'
import { Trans } from '@lingui/macro'

import { languagePickerModel } from '../model'

export const LanguagePicker: FC = () => {
  const { language, onLanguageChange } = useUnit(languagePickerModel)

  return (
    <Picker
      title={<Trans>Select language</Trans>}
      label={<Trans>Language</Trans>}
      items={[
        { id: 'ru', title: 'Russian' },
        { id: 'en', title: 'English' },
      ]}
      onChange={onLanguageChange}
      value={language}
    />
  )
}
