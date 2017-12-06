import validator, {
  atLeast,
  maxLength,
  minValue,
  notMore,
  number,
  required,
  tooOld,
} from './rules'

const erroRules = {
  name: [required, maxLength(20)],
  age: [required, number, minValue(18)],
  favoriteColors: [notMore(5, 'colors')]
}

const warningRules = {
  age: [tooOld],
  favoriteColors: [atLeast(3, 'colors')]
}

export const errors = validator.bind(null, erroRules)
export const warnings = validator.bind(null, warningRules)