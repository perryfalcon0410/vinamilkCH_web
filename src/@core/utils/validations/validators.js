import { formatVniDateToGlobal } from '@/@core/utils/filter'

export const validatorPositive = value => {
  if (value >= 0) {
    return true
  }
  return false
}

export const validatorPassword = password => {
  /* eslint-disable no-useless-escape */
  const regExp = /(?!.* ).{8,}/
  /* eslint-enable no-useless-escape */
  const validPassword = regExp.test(password)
  return validPassword
}

export const validatorPassword1 = password => {
  /* eslint-disable no-useless-escape */
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  /* eslint-enable no-useless-escape */
  const validPassword = regExp.test(password)
  return validPassword
}

export const validatorNotEqual = (val, { target }) => val !== target

export const validatorEqual = (val, { target }) => val === target

export const validatorCreditCard = creditnum => {
  /* eslint-disable no-useless-escape */
  const cRegExp = /^(?:3[47][0-9]{13})$/
  /* eslint-enable no-useless-escape */
  const validCreditCard = cRegExp.test(creditnum)
  return validCreditCard
}

export const validatorUrlValidator = val => {
  if (val === undefined || val === null || val.length === 0) {
    return true
  }
  /* eslint-disable no-useless-escape */
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
  /* eslint-enable no-useless-escape */
  return re.test(val)
}

export const validatorCode = val => {
  if (val === undefined || val === null || val.length === 0) {
    return true
  }
  const regex = /^([\w\\.,-]{0,40})$/
  return regex.test(val)
}

export const validatorNumber = val => {
  const regex = /^(\d{0,15})$/
  return regex.test(val)
}

export const validatorPhoneNumber = val => {
  const regex = /(0[3|5|7|8|9])+([0-9]{8})\b/
  return regex.test(val)
}

export const validatorDateFormatVNI = val => {
  // dd/mm/yyyy
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/
  return regex.test(val)
}

// Must be over or equal to 15 years old (15 years = 5479 days)
export const validatorAge = val => {
  const dt1 = new Date(formatVniDateToGlobal(val))
  const dt2 = new Date()
  const dtResult = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24))
  return dtResult >= 5479
}

export const validatorIdentifyCard = val => {
  const regex = /^(\d{9,12})$/
  return regex.test(val)
}

export const validatorOnlineOrder = val => {
  if (val === undefined || val === null || val.length === 0) {
    return true
  }
  const regex = /^[\w-0-9a-zA-Z]+$/
  return regex.test(val)
}
