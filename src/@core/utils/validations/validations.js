import { extend, localize } from 'vee-validate'
import {
  required as rule_required,
  email as rule_email,
  min as rule_min,
  confirmed as rule_confirmed,
  regex as rule_regex,
  between as rule_between,
  alpha as rule_alpha,
  integer as rule_integer,
  digits as rule_digits,
  alpha_dash as rule_alpha_dash,
  alpha_num as rule_alpha_num,
  length as rule_length,
} from 'vee-validate/dist/rules'
import vi from 'vee-validate/dist/locale/vi.json'

import {
  validatorPositive,
  validatorUrlValidator,
  validatorPassword,
  validatorPassword1,
  validatorCreditCard,
  validatorNotEqual,
  validatorCode,
  validatorNumber,
  validatorPhoneNumber,
  validatorDateFormatVNI,
  validatorAge,
  validatorEqual,
  validatorIdentifyCard,
  validatorOnlineOrder,
} from './validators'

// ////////////////////////////////////////////////////////
// General
// ////////////////////////////////////////////////////////

export const required = extend('required', rule_required)

export const email = extend('email', rule_email)

export const min = extend('min', rule_min)

export const confirmed = extend('confirmed', rule_confirmed)

export const regex = extend('regex', rule_regex)

export const between = extend('between', rule_between)

export const alpha = extend('alpha', rule_alpha)

export const integer = extend('integer', rule_integer)

export const digits = extend('digits', rule_digits)

export const alphaDash = extend('alpha-dash', rule_alpha_dash)

export const alphaNum = extend('alpha-num', rule_alpha_num)

export const length = extend('length', rule_length)

export const positive = extend('positive', {
  validate: validatorPositive,
  message: 'Please enter positive number!',
})

export const credit = extend('credit-card', {
  validate: validatorCreditCard,
  message: 'It is not valid credit card!',
})

export const password = extend('password', {
  validate: validatorPassword,
  message: '{_field_} phải có độ dài tối thiểu 8 ký tự và tối đa 20 ký tự (không bao gồm khoảng trắng)',
})

export const password1 = extend('password1', {
  validate: validatorPassword1,
  message: '{_field_} phải có độ dài tối thiểu 8 ký tự và tối đa 20 ký tự, bao gồm: chữ hoa, thường, số và ký tự đặc biệt',
})

export const notEqual = extend('not-equal', {
  validate: validatorNotEqual,
  params: ['target'],
  message: '{_field_} phải khác với {target}',
})

export const equal = extend('equal', {
  validate: validatorEqual,
  params: ['target'],
  message: '{target} và {_field_} phải giống nhau ',
})

export const url = extend('url', {
  validate: validatorUrlValidator,
  message: 'URL is invalid',
})

export const code = extend('code', {
  validate: validatorCode,
  message: 'Chỉ nhập các ký tự [0-9][a-Z] dấu chấm(.), dấu gạch dưới (_).',
})

export const number = extend('number', {
  validate: validatorNumber,
  message: 'Chỉ nhập ký tự số',
})

export const phoneNumber = extend('phoneNumber', {
  validate: validatorPhoneNumber,
  message: 'Vui lòng nhập đúng số điện thoại Việt Nam (10 số)',
})

export const dateFormatVNI = extend('dateFormatVNI', {
  validate: validatorDateFormatVNI,
  message: 'Vui lòng nhập đúng định dạng Việt Nam (dd/mm/yyyy)',
})

export const age = extend('age', {
  validate: validatorAge,
  message: 'Khách hàng phải trên 15 tuổi',
})

export const identifyCard = extend('identifyCard', {
  validate: validatorIdentifyCard,
  message: 'CMND phải là số và có từ 9 đến 12 ký tự',
})

export const orderNumber = extend('orderNumber', {
  validate: validatorOnlineOrder,
  message: 'Chỉ nhập các ký tự [0-9] và [a-Z] .',
})

localize('vi', vi)
localize({
  vi: {
    messages: {
      required: field => `Vui lòng nhập ${field}`,
    },
  },
})

// ////////////////////////////////////////////////////////
// NOTE:
// Quasar validation for reference only
// Remove this note once development is finished and make sure to
// to convert all of them in veevalidate version
// ////////////////////////////////////////////////////////

// export const required = (val) => {
//   return (val && val.length > 0) || '*Field is required'
// }

// export const required_obj = (obj) => {
//   if (obj === null || obj === undefined) return '*Field is required'
//   return (Object.entries(obj).length > 0 && obj.constructor === Object) || '*Field is required'
// }

// export const no_blank_spaces_arr = (arr) => {
//   return arr.every(val => (val.trim() && val.trim().length > 0)) || 'Blank Spaces are not allowed'
// }

// export const url = val => {
//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   // Used
//   // https://stackoverflow.com/questions/4314741/url-regex-validation

//   // Other
//   // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
//   // https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
//   // https://www.geeksforgeeks.org/how-to-validate-url-using-regular-expression-in-javascript/

//   /* eslint-disable no-useless-escape */
//   const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
//   /* eslint-enable no-useless-escape */
//   return re.test(val) || 'URL is invalid'
// }

// export const date = val => {

//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   // https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js
//   return /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(val) || 'Date is invalid'
// }

// export const max = (val, max) => {

//   // If blank return
//   if (val === undefined || val === null) return true

//   return val.length <= max || `More than ${max} characters are not allowed`
// }

// export const max_arr = (val, max) => {
//   return val.length <= max || `More than ${max} values are not allowed`
// }

// export const min = (val, min) => {

//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   return val.length >= min || `Minimum ${min} characters are required`
// }

// export const num_range = (val, min, max) => {

//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   const msg = 'Value is invalid'
//   if (min === null) return val <= max || msg
//   else if (max === null) return val >= min || msg
//   else return (val >= min && val <= max) || msg
// }
