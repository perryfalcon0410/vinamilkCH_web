import moment from 'moment'
import JSPM from 'jsprintmanager'
// eslint-disable-next-line import/no-unresolved
import html2pdf from 'html2pdf.js'
import html2canvas from 'html2canvas'
import toasts from './toasts/toasts'

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
  const hours = (`0${dateObj.getHours()}`).slice(-2)
  const minutes = (`0${dateObj.getMinutes()}`).slice(-2)
  const seconds = (`0${dateObj.getSeconds()}`).slice(-2)

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
  // equals to -1 if the value is decimal
  if (value.lastIndexOf(',') !== -1) {
    // replacing all dot to comma
    const removedDotVal = value.split('.').join(',')
    const newValue = removedDotVal.replace(/,([^,]*)$/, '.$1')
    return newValue
  }
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

export const formatPrintDate = date => moment(date).locale('en').format('DD/MM/YYYY - HH:mm:ss A')

export const earlyMonth = () => moment().startOf('month').format('DD/MM/YYYY')

export const nowDate = () => moment().format('DD/MM/YYYY')

// call api get ip client
export const hostName = async () => {
  const response = await fetch('https://jsonip.com', { mode: 'cors' })
  const data = await response.json()
  return data
}
// call api get ip client

// check JSPM is running
export const jspmCheckStatus = () => {
  if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open) {
    return true
  }
  if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Closed) {
    toasts.error('JSPrintManager (JSPM) chưa được cài đặt hoặc chưa được mở')
    return false
  }
  if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Blocked) {
    toasts.error('JSPrintManager (JSPM) đã chặn trang web này!')
    return false
  }
  return false
}
export const printBillInvoiceActions = (data, printerName) => {
  html2canvas(data).then(canvas => {
    const cpj = new JSPM.ClientPrintJob()
    cpj.clientPrinter = new JSPM.InstalledPrinter(printerName)
    const b64Prefix = 'data:image/png;base64,'
    const imgBase64DataUri = canvas.toDataURL('image/png')
    const imgBase64Content = imgBase64DataUri.substring(b64Prefix.length, imgBase64DataUri.length)
    const printContent = new JSPM.PrintFile(imgBase64Content, JSPM.FileSourceType.Base64, 'printNow.png', 1)
    cpj.files.push(printContent)
    cpj.sendToClient()
  })
}
// check JSPM is running

// START - func print type A4
export const printActions = (data, printerName, optionsPrinter) => {
  const opt = {
    margin: 1,
    image: { type: 'jpeg', quality: 1 }, // type and quality image export
    pagebreak: { mode: 'avoid-all' }, // break new page
    jsPDF: {
      format: optionsPrinter.format ? optionsPrinter.format : '', // format paper
      orientation: optionsPrinter.orientation ? optionsPrinter.orientation : 'portrait', // format orientation paper
      hotfixes: 'px_scaling',
    },
  }
  data.classList.remove('d-none')
  html2pdf().set(opt).from(data).output('datauristring')
    .then(pdf => {
      const cpj = new JSPM.ClientPrintJob()
      cpj.clientPrinter = new JSPM.InstalledPrinter(printerName) // get printer
      const b64Prefix = 'data:application/pdf;base64,'
      const imgBase64Content = pdf.substring(b64Prefix.length, pdf.length)
      // convert data
      const printContent = new JSPM.PrintFilePDF(imgBase64Content, JSPM.FileSourceType.Base64, `${optionsPrinter.fileName}.pdf`, 1)
      // rotate pager áp dụng in ngang [RT90]
      printContent.printRotation = JSPM.PrintRotation[optionsPrinter.rotate ? optionsPrinter.rotate : 'None']
      // auto fit data print
      printContent.pageSizing = JSPM.Sizing[optionsPrinter.pageSizing ? optionsPrinter.pageSizing : 'None']
      cpj.files.push(printContent)
      cpj.sendToClient()
      data.classList.add('d-none')
    })
}
// END - func print type A4

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
  else if ((age.years === 0) && (age.months > 0) && (age.days > 0)) ageString = `${age.months + monthString}`
  else if ((age.years > 0) && (age.months === 0) && (age.days > 0)) ageString = `${age.years + yearString}`
  else if ((age.years === 0) && (age.months > 0) && (age.days === 0)) ageString = `${age.months + monthString}`
  else ageString = ''

  return ageString
}

export const checkingDateInput = date => {
  const isValid = moment(date, 'DD/MM/YYYY', true).isValid()
  if (!isValid) {
    toasts.error('Ngày tháng không tồn tại')
    return false
  }
  return true
}
