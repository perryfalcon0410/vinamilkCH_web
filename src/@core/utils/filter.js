export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

export const title = (value, replacer = ' ') => {
  if (!value) return ''
  const str = value.toString()

  const arr = str.split(replacer)
  const capitalizedArray = []
  arr.forEach(word => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    capitalizedArray.push(capitalized)
  })
  return capitalizedArray.join(' ')
}

export const avatarText = value => {
  if (!value) return ''
  const nameArray = value.split(' ')
  return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}

/**
 * Format and return date in Humanize format
 * Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 * Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Date(value).toLocaleDateString('en-US', formatting)
}

// Format yyyy-mm-dd|iso|timestamp to dd/mm/yyyy
export const formatDateToLocale = (value, formatting = { day: '2-digit', month: '2-digit', year: 'numeric' }) => {
  if (!value) return value
  return new Date(value).toLocaleDateString('vi-VN', formatting)
}

export const formatISOtoVNI = (isoTime, includeTime, includeText) => {
  if (!isoTime) return isoTime

  if (isoTime.length === 19) {
    // eslint-disable-next-line no-param-reassign
    isoTime = `${isoTime}.000Z`
  } else if (isoTime.length === 23) {
    // eslint-disable-next-line no-param-reassign
    isoTime = `${isoTime}Z`
  }

  const date1 = new Date(isoTime)
  const dateObj = new Date(date1.getTime() + (date1.getTimezoneOffset() * 60000))

  const date = (`0${dateObj.getDate()}`).slice(-2)
  const month = (`0${dateObj.getMonth() + 1}`).slice(-2)
  const year = dateObj.getFullYear()
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  const seconds = dateObj.getSeconds()

  if (includeTime !== undefined && includeTime) {
    return `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`
  }
  if (includeText !== undefined && includeText) {
    return `${date}/${month}/${year} lúc ${hours}:${minutes}`
  }

  return `${date}/${month}/${year}`
}

// Format dd/mm/yyyy to 2021-04-15T03:32:47.519Z
export const formatVniDateToISO = value => {
  if (!value) return value
  const arrayDate = value.split('/')
  const expected = new Date(Number(arrayDate[2]), Number(arrayDate[1]) - 1, Number(arrayDate[0]))

  let current = new Date()
  current.setHours(0, 0, 0, 0)

  if (current.getTime() === expected.getTime()) {
    current = new Date()
  } else {
    current = expected
  }
  const tzoffset = expected.getTimezoneOffset() * 60000 // offset in milliseconds

  return (new Date(current - tzoffset)).toISOString().slice(0, -1)
}

// Replace . with ,
export const replaceDotWithComma = value => {
  if (!value) return value
  return value.split('.').join(',')
}

// Format number to locale
export const formatNumberToLocale = value => {
  if (!value) return value
  const valueFormated = Number(value)
  return replaceDotWithComma(valueFormated.toLocaleString('vi-VN'))
}

// Format from dd/mm/yyyy to yyyy-mm-dd
export const formatVniDateToGlobal = value => {
  if (value) {
    return value.split('/').reverse().join('-')
  }
  return null
}

// Format from dd/mm/yyyy to yyyy/mm/dd
export const reverseVniDate = value => {
  if (value) {
    return value.split('/').reverse().join('/')
  }
  return null
}

/**
 * Return short human friendly month representation of date
 * Can also convert date to only time if date is of today (Better UX)
 * @param {String} value date to format
 * @param {Boolean} toTimeForCurrentDay Shall convert to time if day is today/current
 */

// Strip all the tags from markup and return plain text
export const filterTags = value => value.replace(/<\/?[^>]+(>|$)/g, '')

export const getTimeOfDate = value => {
  const formatting = { hour: 'numeric', minute: 'numeric', hour12: false }

  return new Intl.DateTimeFormat('vi-VN', formatting).format(new Date(value))
}

export const getHourToSecondOfDate = value => {
  const formatting = {
    hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false,
  }

  return new Intl.DateTimeFormat('vi-VN', formatting).format(new Date(value))
}

// count from isoDate to now
export const countDays = isoDate => {
  const now = new Date()

  const yearNow = now.getYear()
  const monthNow = now.getMonth()
  const dateNow = now.getDate()

  const dateString = formatISOtoVNI(isoDate)
  const dateParts = dateString.split('/')
  const dob = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])

  const yearDob = dob.getYear()
  const monthDob = dob.getMonth()
  const dateDob = dob.getDate()
  let age = {}
  let ageString = ''
  let yearString = ''
  let monthString = ''
  let dayString = ''

  let yearAge = yearNow - yearDob
  let monthAge
  let dateAge
  if (monthNow >= monthDob) {
    monthAge = monthNow - monthDob
  } else {
    yearAge -= 1
    monthAge = 12 + monthNow - monthDob
  }

  if (dateNow >= dateDob) {
    dateAge = dateNow - dateDob
  } else {
    monthAge -= 1
    dateAge = 31 + dateNow - dateDob

    if (monthAge < 0) {
      monthAge = 11
      yearAge -= 1
    }
  }

  age = {
    years: yearAge,
    months: monthAge,
    days: dateAge,
  }

  if (age.years > 0) yearString = ' năm'
  if (age.months > 0) monthString = ' tháng'
  if (age.days > 0) dayString = ' ngày'

  if ((age.years > 0) && (age.months > 0) && (age.days > 0)) ageString = `${age.years + yearString} ${age.months}${monthString} ${age.days}${dayString}`
  else if ((age.years === 0) && (age.months === 0) && (age.days > 0)) ageString = `${age.days}${dayString}`
  else if ((age.years > 0) && (age.months === 0) && (age.days === 0)) ageString = `${age.years + yearString}`
  else if ((age.years > 0) && (age.months > 0) && (age.days === 0)) ageString = `${age.years + yearString} ${age.months}${monthString}`
  else if ((age.years === 0) && (age.months > 0) && (age.days > 0)) ageString = `${age.months + monthString} ${age.days}${dayString}`
  else if ((age.years > 0) && (age.months === 0) && (age.days > 0)) ageString = `${age.years + yearString} ${age.days}${dayString}`
  else if ((age.years === 0) && (age.months > 0) && (age.days === 0)) ageString = `${age.months + monthString}`
  else ageString = ''

  return ageString
}
