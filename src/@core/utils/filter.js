import moment from 'moment'
import JSPM from 'jsprintmanager'
// eslint-disable-next-line import/no-unresolved
import html2pdf from 'html2pdf.js'
import commonData from '@/@db/common'
import saleData from '@/@db/sale'
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
// Replace , with .
export const replaceCommaWithDot = value => {
  if (!value) return value
  // equals to -1 if the value is decimal
  if (value.lastIndexOf('.') !== -1) {
    // replacing all dot to comma
    const removedDotVal = value.split(',').join('.')
    const newValue = removedDotVal.replace(/,([^,]*)$/, '.$1')
    return newValue
  }
  return value.split(',').join('.')
}

// Format number to locale
export const formatNumberToLocale = value => {
  if (!value) return value
  const valueFormated = Number(value)
  return replaceDotWithComma(valueFormated.toLocaleString('vi-VN'))
}
//  Format number to locale (Dot)
export const formatDotNumberToLocale = value => {
  if (!value) return value
  const valueFormated = Number(value)
  return replaceCommaWithDot(valueFormated.toLocaleString('vi-VN'))
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

export const formatPrintDate = date => moment(date).locale('en').format('DD/MM/YYYY - HH:mm:ss')

export const earlyMonth = () => moment().startOf('month').format('DD/MM/YYYY')

export const nowDate = () => moment().format('DD/MM/YYYY')

// call api get ip client
export const hostName = async () => {
  for (let i = 0; i < commonData.apiGetIpList.length; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(commonData.apiGetIpList[i], { mode: 'cors' })
      // eslint-disable-next-line no-await-in-loop
      const data = await response.json()
      if (data.status && data.status !== 'success') {
        // eslint-disable-next-line no-continue
        continue
      } else {
        return data
      }
    } catch (error) {
      // temp
    }
  }
  return null
}
export const checkIpClient = (ipAddress, ipAddressCurrent) => {
  if (ipAddressCurrent !== ipAddress) {
    toasts.error('Không tìm thấy máy in. Vui lòng cấu hình lại máy in!')
    return false
  }
  return true
}
// call api get ip client

// check JSPM is running
export const jspmCheckStatus = () => {
  if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open) {
    return true
  }
  if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Blocked) {
    toasts.error('JSPrintManager (JSPM) đã chặn trang web này!')
    return false
  }
  return false
}
// check JSPM is running

// START - func print type A4
export const printActions = (data, printerName, optionsPrinter) => {
  const left = optionsPrinter.x ? optionsPrinter.x : 1.07
  const opt = {
    margin: optionsPrinter.margin ? optionsPrinter.margin : 1,
    image: { type: 'jpeg', quality: 0.9 }, // type and quality image export
    pagebreak: {
      mode: optionsPrinter.pageBreak ? optionsPrinter.pageBreak : 'avoid-all', // break new page
    },
    html2canvas: {
      backgroundColor: null,
      scale: optionsPrinter.scale ? optionsPrinter.scale : 2.5, // increase quality data print
      imageTimeout: 0,
      top: 10,
      bottom: 20,
    },
    jsPDF: {
      format: optionsPrinter.format ? optionsPrinter.format : '', // format paper convert
      orientation: optionsPrinter.orientation ? optionsPrinter.orientation : 'portrait', // format orientation paper
      hotfixes: 'px_scaling',
    },
  }
  data.classList.remove('d-none')
  const dataClone = document.createElement('div')
  dataClone.appendChild(data)
  html2pdf().set(opt).from(dataClone)
    .toPdf()
    .then(() => {
      data.classList.add('d-none')
    })
    .get('pdf')
    .then(file => {
      if (optionsPrinter.isPaging) {
        const totalPages = file.internal.getNumberOfPages()
        for (let i = 1; i <= totalPages; i += 1) {
          file.setPage(i)
          file.setFontSize(10)
          file.setTextColor('#6e6b7b')
          file.text(`Trang ${i} / ${totalPages}`, file.internal.pageSize.getWidth() / left, file.internal.pageSize.getHeight() - 5)
        }
      }
    })
    .output('datauristring')
    .then(pdf => {
      const cpj = new JSPM.ClientPrintJob()
      cpj.clientPrinter = new JSPM.InstalledPrinter(printerName) // get printer
      // convert data
      const printContent = new JSPM.PrintFilePDF(pdf, JSPM.FileSourceType.URL, `${optionsPrinter.fileName}.pdf`, 1)
      // rotate pager áp dụng in ngang [RT90]
      printContent.printRotation = JSPM.PrintRotation[optionsPrinter.rotate ? optionsPrinter.rotate : 'None']
      // auto fit data print
      printContent.pageSizing = JSPM.Sizing[optionsPrinter.pageSizing ? optionsPrinter.pageSizing : 'None']
      printContent.printAsGrayscale = true // Options print black/white(=true) and color(=false)
      cpj.files.push(printContent)
      cpj.sendToClient()
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
  const yearNotValid = date.slice(6)
  if (!isValid || yearNotValid === '0000') {
    toasts.error('Ngày tháng không tồn tại')
    return false
  }
  return true
}

export const jsPdfPrint = (data, printerName, optionsPrinter) => {
  const cpj = new JSPM.ClientPrintJob()
  cpj.clientPrinter = new JSPM.InstalledPrinter(printerName)
  // convert data
  const printContent = new JSPM.PrintFilePDF(data, JSPM.FileSourceType.URL, `${optionsPrinter.fileName}.pdf`, 1)
  // rotate pager áp dụng in ngang [RT90]
  printContent.printRotation = JSPM.PrintRotation[optionsPrinter.rotate ? optionsPrinter.rotate : 'None']
  // auto fit data print
  printContent.pageSizing = JSPM.Sizing[optionsPrinter.pageSizing ? optionsPrinter.pageSizing : 'None']
  // printContent.printAsGrayscale = true // Options print black/white(=true) and color(=false)
  cpj.files.push(printContent)
  cpj.sendToClient()
}
export const preventDefaultWindowPrint = event => {
  if ((event.ctrlKey || event.metaKey) && event.keyCode === 80) {
    event.preventDefault()
    event.stopImmediatePropagation()
    return true
  }
  return false
}

export const removeVietnameseTones = (str, isRemove) => {
  let stringRemove = str
  if (!isRemove) {
    return stringRemove
  }
  stringRemove = stringRemove.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  stringRemove = stringRemove.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  stringRemove = stringRemove.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  stringRemove = stringRemove.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  stringRemove = stringRemove.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  stringRemove = stringRemove.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  stringRemove = stringRemove.replace(/đ/g, 'd')
  stringRemove = stringRemove.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  stringRemove = stringRemove.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  stringRemove = stringRemove.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  stringRemove = stringRemove.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  stringRemove = stringRemove.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  stringRemove = stringRemove.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  stringRemove = stringRemove.replace(/Đ/g, 'D')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  stringRemove = stringRemove.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  stringRemove = stringRemove.replace(/\u02C6|\u0306|\u031B/g, '') // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  stringRemove = stringRemove.replace(/ + /g, ' ')
  stringRemove = stringRemove.trim()
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  // eslint-disable-next-line no-useless-escape
  // stringRemove = stringRemove.replace(/!|@|%|\^|\*|\+|\=|\<|\>|\?|\/|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g, '')
  return stringRemove
}

export const formatTextDisplayCustomer = (text1, text2) => {
  if (text1 === '' || text1 === '0' || text2 === '' || text2 === '0') {
    return '                      '
  }

  let spaceText = ''
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < saleData.sizeTextDisplayCustomer - (text1.length + text2.length); i++) {
    spaceText += ' '
  }
  return `${text1}${spaceText}${text2}`
}
