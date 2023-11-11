import { FormValidateParams, getIn } from 'effector-react-form'

import type { FormErrors, ValidationSchema } from './types'

export function config<Values>(validationConfig: () => ValidationSchema<Values>) {
  return (payload: FormValidateParams<Values, any>) => {
    const errors = validateRulesRecord(validationConfig(), payload.values)
    const filteredErrors = filterErrors(errors)

    return filteredErrors
  }
}

function validateRulesRecord<T>(
  rules: ValidationSchema<T>,
  values: T,
  path = '',
  errors: FormErrors = {},
  indexes: number[] = [],
) {
  if (typeof rules !== 'object' || rules === null) {
    return errors
  }

  return Object.keys(rules).reduce((acc, ruleKey) => {
    let isArrayValidation = false

    const rule = (rules as Record<string, any>)[ruleKey]
    const rulePath = `${path === '' ? '' : `${path}.`}${ruleKey}`
    const value = getIn(values, rulePath)

    if (typeof rule === 'function') {
      acc[rulePath] = rule(value, { values, indexes })
    }

    if (Array.isArray(value)) {
      isArrayValidation = true

      for (let index = 0; index < value.length; index++) {
        validateRulesRecord(rule, values, `${rulePath}.${index}`, acc, [...indexes, index])
      }
    }

    if (typeof rule === 'object' && typeof value === 'object' && value !== null) {
      if (!isArrayValidation) {
        validateRulesRecord(rule, values, rulePath, acc, indexes)
      }
    }

    return acc
  }, errors)
}

function filterErrors(errors: FormErrors) {
  if (errors === null || typeof errors !== 'object') {
    return {}
  }

  return Object.keys(errors).reduce<FormErrors>((acc, key) => {
    const errorValue = errors[key]

    if (typeof errorValue === 'string') {
      acc[key] = errorValue
    }

    return acc
  }, {})
}
