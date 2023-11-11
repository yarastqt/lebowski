import { StoreValue } from 'effector'
import { FieldState, Form } from 'effector-react-form'
import { SyntheticEvent } from 'react'

export interface FieldHandler {
  (payload: { event: EventOrValuePayload; name: string }): void
}

type AllFormState = StoreValue<Form['$allFormState']>
type EventOrValuePayload = SyntheticEvent | unknown

type FieldHandlers = {
  onChangeFieldBrowser: FieldHandler
  onFocusFieldBrowser: FieldHandler
  onBlurFieldBrowser: FieldHandler
}

interface CreateFormFieldsConfig {
  handlers: FieldHandlers
  path?: Array<string>
  state: AllFormState
  value: unknown
}

interface CreateFieldPropsConfig {
  handlers: FieldHandlers
  name: string
  state: AllFormState
  value: unknown
}

const INITIAL_FIELD_STATE: FieldState = {
  _type: 'fieldMeta',
  active: false,
  touched: false,
  changed: false,
  blurred: false,
  touchedAfterOuterError: false,
  changedAfterOuterError: false,
  blurredAfterOuterError: false,
}

export function createFormFields(config: CreateFormFieldsConfig): unknown {
  const { path = [], value } = config

  if (Array.isArray(value)) {
    const fields = []

    for (const index in value) {
      const currentValue = value[index]

      fields.push(
        createFormFields({
          ...config,
          value: currentValue,
          path: [...path, index],
        }),
      )
    }

    return fields
  } else if (typeof value === 'object' && value !== null && !isFile(value) && !isBlob(value)) {
    const fields: Record<string, unknown> = {}

    for (const [key, currentValue] of Object.entries(value)) {
      fields[key] = createFormFields({
        ...config,
        value: currentValue,
        path: [...path, key],
      })
    }

    return fields
  }

  return createFieldProps({ ...config, value, name: path.join('.') })
}

function createFieldProps(config: CreateFieldPropsConfig) {
  const { name, value, handlers, state } = config

  const innerError = state.errorsInline[name]
  const outerError = state.outerErrorsInline[name]
  const inlineField = state.fieldsInline[name] ?? INITIAL_FIELD_STATE

  const isInnerInvalid = Boolean(
    (state.form.submitted || (inlineField.blurred && inlineField.changed)) && innerError,
  )
  const isOuterInvalid = Boolean(!inlineField.changedAfterOuterError && outerError)

  const isInvalid = isInnerInvalid || isOuterInvalid
  const validationState = isInvalid ? 'invalid' : 'valid'

  const error = isInvalid ? innerError || outerError : undefined

  return {
    error,
    isInvalid,
    validationState,
    value,

    props: {
      value,
      onChange: (event: EventOrValuePayload) => {
        handlers.onChangeFieldBrowser({ event, name })
      },
      onFocus: (event: EventOrValuePayload) => {
        handlers.onFocusFieldBrowser({ event, name })
      },
      onBlur: (event: EventOrValuePayload) => {
        handlers.onBlurFieldBrowser({ event, name })
      },
    },
  }
}

function isFile(value: unknown): value is File {
  return typeof File === 'function' && value instanceof File
}

function isBlob(value: unknown): value is Blob {
  return typeof Blob === 'function' && value instanceof Blob
}
