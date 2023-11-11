import {
  CreateFormParams as CreateBaseFormParams,
  createForm as createBaseForm,
  createFieldArray,
} from 'effector-react-form'

import { FormFilters } from './types'

export interface CreateFormParams<Values extends object, MappedValues, Meta>
  extends CreateBaseFormParams<Values, MappedValues, Meta> {
  filters?: FormFilters<Values>
}

export function createForm<Values extends object = any, Meta = any>(
  config: CreateFormParams<Values, Values, Meta>,
) {
  const form = createBaseForm(config)

  const fields = createFieldArray<Values>({ form })

  const $isInvalid = form.$form.map((formState) => formState.hasError)

  const $isChanged = form.$fieldsInline.map((fields) =>
    Object.values(fields).some((field) => field.changed),
  )

  return Object.assign(form, {
    $isChanged,
    $isInvalid,
    fields,
    submitted: form.submit,
    validated: form.onSubmit,
  })
}
