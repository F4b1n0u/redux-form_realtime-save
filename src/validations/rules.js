

import { get, set } from 'lodash'

export default (ruleMap, values) => {
  return Object.keys(ruleMap)
    .reduce(
      (messageMap, fieldName) => {
        const rules = ruleMap[fieldName]
        const value = get(values, fieldName)
        let message = ''

        message = rules.reduce(
          (message, rule) => {
            if (message) {
              return message
            }
            return rule(value)
          },
          message
        )

        set(messageMap, fieldName, message)

        return messageMap
      },
      {}
    )
}

export const required = value =>
  value ?
    undefined :
    'Required'

export const maxLength = max => value =>
  value && value.length > max ?
    `Must be ${max} characters or less` :
    undefined

export const number = value =>
  value && isNaN(Number(value)) ?
    'Must be a number' :
    undefined

export const minValue = min => value =>
  value && value < min ?
    `Must be at least ${min}` :
    undefined

export const tooOld = value =>
  value && value > 65 ?
    'You are too old for this shit' :
    undefined

export const atLeast = (min, label) => value =>
    value && value.length < min ?
      `you should have at least ${min} ${label}` :
      undefined

export const notMore = (max, label) => value =>
    value && value.length > max ?
      `you should have at least ${max} ${label}` :
      undefined
  