import { getIn } from 'effector-react-form'

import type { Rule } from './types'
import { config } from './validate'

const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[а-яА-Яa-zA-Z0-9](?:[а-яА-Яa-zA-Z0-9-]{0,61}[а-яА-Яa-zA-Z0-9])?(?:\.[а-яА-Яa-zA-Z0-9](?:[а-яА-Яa-zA-Z0-9-]{0,61}[а-яА-Яa-zA-Z0-9])?)*$/

const URL_REGEXP = /([\wА-я\-]+\.)+([\wА-я]{2,}\.?)/

export const rules = {
  // Common
  required:
    (message: string): Rule<unknown> =>
    (value) => {
      if (typeof value === 'string') {
        return value.trim().length > 0 ? null : message
      }

      if (Array.isArray(value)) {
        return value.length > 0 ? null : message
      }

      if (value === null || value === undefined) {
        return message
      }

      return null
    },

  not:
    <T>(errorValue: T, message: string) =>
    (value: T) => {
      return errorValue === value ? message : null
    },

  // Strings
  string: {
    length:
      (length: number, message: string): Rule<string> =>
      (value) => {
        return value.length === length ? null : message
      },

    min:
      (length: number, message: string): Rule<string> =>
      (value) => {
        return value.length >= length ? null : message
      },

    max:
      (length: number, message: string): Rule<string> =>
      (value) => {
        return value.length <= length ? null : message
      },

    range:
      (min: number, max: number, message: string): Rule<string> =>
      (value) => {
        return value.length >= min && value.length <= max ? null : message
      },

    email:
      (message: string): Rule<string> =>
      (value) => {
        if (value.length > 0) {
          return EMAIL_REGEXP.test(value) ? null : message
        }

        return null
      },

    url:
      (message: string): Rule<string> =>
      (value) => {
        if (value.length > 0) {
          return URL_REGEXP.test(value) ? null : message
        }

        return null
      },
  },

  // Numbers
  number: {
    range:
      (min: number, max: number, message: string): Rule<string> =>
      (value) => {
        return Number(value) >= min && Number(value) <= max ? null : message
      },
  },

  // Utils
  config,

  when:
    <T, U>(path: string, condition: (refValue: T, value: U) => boolean) =>
    (rule: Rule, elseVariant?: Rule): Rule<U> =>
    (value, payload) => {
      let computedPath = path

      for (let i = 0; i <= payload.indexes.length; i++) {
        computedPath = computedPath.replace(/\.\*\.?/, (match) =>
          match === '.*.' ? `.${payload.indexes[i]}.` : `.${payload.indexes[i]}`,
        )
      }

      const refValue = getIn(payload.values, computedPath)

      if (condition(refValue as T, value)) {
        return rule(value, payload)
      } else if (elseVariant) {
        return elseVariant(value, payload)
      }

      return null
    },

  combine:
    <T>(...rules: Rule<T>[]): Rule<T> =>
    (value, payload) => {
      const result = rules.reduce<string | null>((acc, rule) => acc ?? rule(value, payload), null)

      return result
    },
}
