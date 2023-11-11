import { useUnit } from 'effector-react'
import { Form } from 'effector-react-form'
import { useEffect, useMemo } from 'react'

import { FieldHandler, createFormFields } from './create-form-fields'
import type { FormFields } from './types'

type SetError = (payload: { field: string; error: string }) => void
type SetValue<Values> = (payload: { field: keyof Values; value: unknown }) => void
type SetValues<Values> = (values: Values) => void

export interface FormProps<Values extends Record<string, any>> {
  fields: FormFields<Values>
  isDirty: boolean
  isInvalid: boolean
  reset: () => void
  setError: SetError
  setValue: SetValue<Values>
  setValues: SetValues<Values>
  submit: () => void
  values: Values
}

export interface FormConfig {
  resetAfterUnmount: boolean
}

const defaultFormConfig: FormConfig = {
  resetAfterUnmount: true,
}

export function useForm<Values extends Record<string, any>>(
  form: Form<Values>,
  config = defaultFormConfig,
): FormProps<Values> {
  const { resetAfterUnmount } = config
  const values = useUnit(form.$values)
  const state = useUnit(form.$allFormState)

  const reset = useUnit(form.reset)
  const setError = useUnit(form.setOrDeleteOuterError)
  const setValue = useUnit(form.setValue) as SetValue<Values>
  const setValues = useUnit(form.setValues)

  const submit = useUnit(form.submit) as () => void
  const validate = useUnit(form.validateForm)

  const onChangeFieldBrowser = useUnit(form.onChangeFieldBrowser) as FieldHandler
  const onFocusFieldBrowser = useUnit(form.onFocusFieldBrowser) as FieldHandler
  const onBlurFieldBrowser = useUnit(form.onBlurFieldBrowser) as FieldHandler

  const fields = useMemo(() => {
    return createFormFields({
      handlers: {
        onChangeFieldBrowser,
        onFocusFieldBrowser,
        onBlurFieldBrowser,
      },
      value: state.values,
      state: state,
    }) as FormFields<Values>
  }, [onBlurFieldBrowser, onChangeFieldBrowser, onFocusFieldBrowser, state])

  useEffect(() => {
    validate({})

    return () => {
      if (resetAfterUnmount) {
        reset()
      }
    }
  }, [resetAfterUnmount, validate, reset])

  const isDirty = Object.values(state.fieldsInline).some((field) => field.changed)

  return {
    fields,
    isDirty,
    isInvalid: state.form.hasError,
    reset,
    setError,
    setValue,
    setValues,
    submit,
    values,
  }
}
