import { FocusEventHandler } from 'react'

export type FormErrors = Record<string, string>

export type Rule<Value = any> = (
  value: Value,
  payload: { values: Record<string, unknown>; indexes: number[] },
) => string | null

export type ValidationSchema<Values, InitValues = Values> = Partial<{
  [Key in keyof Values]: FormRule<Values[Key], InitValues>
}>

type FormRule<Value, Values> = NonNullable<Value> extends Array<infer ListValue>
  ?
      | Partial<{
          [Key in keyof ListValue]: ListValue[Key] extends Array<infer NestedListItem>
            ? ValidationSchema<NestedListItem> | Rule<ListValue[Key]>
            : ValidationSchema<ListValue[Key]> | Rule<ListValue[Key]>
        }>
      | Rule<Value>
  : NonNullable<Value> extends Record<string, any>
  ? ValidationSchema<Value, Values> | Rule<Value>
  : Rule<Value>

export interface FieldInputProps<T> {
  onBlur: FocusEventHandler<HTMLElement>
  onChange: (value: T) => void
  onFocus: FocusEventHandler<HTMLElement>
  value: T
}

export interface FieldProps<T> {
  error: string
  isInvalid: boolean
  props: FieldInputProps<T>
  validationState: 'invalid' | 'valid'
  value: T
}

type AnyObject = Record<string, any>

type HasNullable<T> = null extends T ? never : undefined extends T ? never : T

type NullableFormField<T, TField> = HasNullable<T> extends never ? FieldProps<T> | TField : TField

type ArrayFormField<T> = NonNullable<T> extends Array<infer U>
  ? NullableFormField<T, FormField<U>[]>
  : never

type ObjectFormField<T extends AnyObject> = {
  [P in keyof T]: FormField<T[P]>
}

export type FormField<T> = NonNullable<T> extends any[]
  ? ArrayFormField<T>
  : NonNullable<T> extends AnyObject
  ? NonNullable<T> extends File | Blob
    ? FieldProps<T>
    : NullableFormField<T, ObjectFormField<NonNullable<T>>>
  : FieldProps<T>

export type FormFields<T extends AnyObject> = ObjectFormField<T>

export type FormFilterFunction<Value> = (value: Value) => boolean

export type FormFilters<Values extends object = any> = {
  [Key in keyof Values]?: Values[Key] extends AnyObject
    ? FormFilters<Values[Key]>
    : FormFilterFunction<Values[Key]>
}

export type FormFieldInputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export interface FormFieldInput {
  event: unknown
  name: string
}
