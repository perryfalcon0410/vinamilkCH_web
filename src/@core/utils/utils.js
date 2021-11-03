import router from '@/router'
import {
  reactive,
  getCurrentInstance,
  watch,
  toRefs,
} from '@vue/composition-api'

import customerData from '@/@db/customer'
import commonData from '@/@db/common'
import warehousesData from '@/@db/warehouses'
import reportsData from '@/@db/report'
import salesData from '@/@db/sale'
import systemData from '@/@db/system'
import JSPM from 'jsprintmanager'
import Serial from '@core/libs/serial'
import {
  jspmCheckStatus,
} from '@core/utils/filter'
import toasts from '@/@core/utils/toasts/toasts'
import moment from 'moment'

export const isObject = obj => typeof obj === 'object' && obj !== null

export const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

const getRandomFromArray = array => array[Math.floor(Math.random() * array.length)]

// ? Light and Dark variant is not included
// prettier-ignore
export const getRandomBsVariant = () => getRandomFromArray(['primary', 'secondary', 'success', 'warning', 'danger', 'info'])

export const isDynamicRouteActive = route => {
  const { route: resolvedRoute } = router.resolve(route)
  return resolvedRoute.path === router.currentRoute.path
}

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
export const useRouter = () => {
  const vm = getCurrentInstance().proxy
  const state = reactive({
    route: vm.$route,
  })

  watch(
    () => vm.$route,
    r => {
      state.route = r
    },
  )

  return { ...toRefs(state), router: vm.$router }
}

export const getGenderLabel = id => {
  const commonDataFound = commonData.genders.find(item => `${item.id}` === `${id}`)
  return commonDataFound ? commonDataFound.label : null
}

export const getCustomerStatusLabel = id => {
  const customerDataFound = customerData.status.find(item => `${item.id}` === `${id}`)
  return customerDataFound ? customerDataFound.label : null
}

export const getWarehousesStatuslabel = id => {
  const warehousesDataFound = warehousesData.transTypes.find(item => `${item.id}` === `${id}`)
  return warehousesDataFound ? warehousesDataFound.label : null
}

export const getInputTypeslabel = id => {
  const warehousesDataFound = warehousesData.inputTypes.find(item => `${item.id}` === `${id}`)
  return warehousesDataFound ? warehousesDataFound.label : null
}

export const getOutputTypeslabel = id => {
  const warehousesDataFound = warehousesData.outputTypes.find(item => `${item.id}` === `${id}`)
  return warehousesDataFound ? warehousesDataFound.label : null
}

export const getReportReasonTypeslabel = id => {
  const reportsDataFound = reportsData.reasonTypes.find(item => `${item.id}` === `${id}`)
  return reportsDataFound ? reportsDataFound.label : null
}

export const getSaleDeliveryTypeslabel = id => {
  const salesDataFound = salesData.salemtDeliveryType.find(item => `${item.id}` === `${id}`)
  return salesDataFound ? salesDataFound.label : null
}

export const formatURLParams = obj => {
  // eslint-disable-next-line no-restricted-syntax
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      // eslint-disable-next-line no-param-reassign
      delete obj[propName]
    }
  }
  return obj
}

export const capitalizeFirstLetter = string => {
  if (string) {
    const sentence = string.toLowerCase()
    const titleCaseSentence = sentence.replace(/^[a-zA-Z]/, string[0].toUpperCase())
    return titleCaseSentence
  }
  return string
}

export const getNow = () => {
  const date = moment().format('DD/MM/YYYY')
  const time = moment().format('LT')
  const dateTime = `${date} lúc ${time}`
  return dateTime
}

export const getCurrentTime = () => {
  const date = moment().format('DD/MM/YYYY')
  const time = moment().format('LT')
  const dateTime = `${date} ${time}`
  return dateTime
}

export const isEmpty = value => value === undefined || value === '' || value === null

export const onlyNumberInput = e => {
  const char = String.fromCharCode(e.keyCode)
  if (/[0-9]+/.test(char)) {
    return true
  }
  return e.preventDefault()
}
export const preventPasteSpecialChars = value => value.replace(/[^0-9]/gi, '')

export const onlyDateInput = e => {
  const char = String.fromCharCode(e.keyCode)
  if (/[0-9/]+/.test(char)) {
    return true
  }
  return e.preventDefault()
}

export const formatSortUrl = args => {
  let url = ''
  if (args.sort !== undefined && args.sort !== null && typeof (args.sort) !== 'string') {
    url = args.sort.reduce((prev, curr) => {
      if (prev.field) {
        return `?sort=${prev.field},${prev.type}&sort=${curr.field},${curr.type}`
      }
      return `${prev}&sort=${curr.field},${curr.type}`
    })
  }
  return url
}

export const sortFilterParams = args => {
  if (args.sort !== null && typeof (args.sort) !== 'string') {
    const filtered = Object.keys(args)
      .filter(key => key !== 'sort')
      .reduce((obj, key) => ({
        ...obj,
        [key]: args[key],
      }), {})
    return filtered
  }
  return args
}

export const resizeAbleTable = () => {
  let thElm
  let startOffset

  Array.prototype.forEach.call(
    document.querySelectorAll('table th'),
    th => {
      // eslint-disable-next-line no-param-reassign
      th.style.position = 'relative'

      const grip = document.createElement('div')
      grip.innerHTML = '&nbsp;'
      grip.style.top = 0
      grip.style.right = 0
      grip.style.bottom = 0
      grip.style.width = '5px'
      grip.style.position = 'absolute'
      grip.style.cursor = 'col-resize'
      grip.addEventListener('mousedown', e => {
        thElm = th
        startOffset = th.offsetWidth - e.pageX
      })
      th.appendChild(grip)
    },
  )

  document.addEventListener('mousemove', e => {
    if (thElm) {
      thElm.style.width = `${startOffset + e.pageX}px`
    }
  })

  document.addEventListener('mouseup', () => {
    thElm = undefined
  })
}

export const getJSPMDownloadInfo = () => {
  const { platform, userAgent } = window.navigator

  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64']
  const isWin64OS = userAgent.indexOf('WOW64') || platform === 'Win64'
  let os = null
  let link = null

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'MacOS'
    link = systemData.jspmDownloadLinks.macOS
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows'

    if (isWin64OS) {
      link = systemData.jspmDownloadLinks.win64
    } else {
      link = systemData.jspmDownloadLinks.win32
    }
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux'
    link = systemData.jspmDownloadLinks.linux
  }

  return {
    os,
    link,
  }
}

export const printFile = (fileName, printerName, pdf) => {
  JSPM.JSPrintManager.auto_reconnect = true
  let checkConnect = false
  for (let i = 0; i < 3; i += 1) {
    if ((JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open) && (printerName !== '' && printerName !== null && printerName !== undefined)) {
      if (jspmCheckStatus()) {
        if (printerName.includes('PDF')) {
          pdf.save(fileName)
        } else {
          // setup printer
          const cpj = new JSPM.ClientPrintJob()
          cpj.clientPrinter = new JSPM.InstalledPrinter(printerName) // get printer
          const printContent = new JSPM.PrintFilePDF(pdf.output('datauristring'), JSPM.FileSourceType.URL, fileName, 1)
          printContent.printAsGrayscale = false // Options print black/white(=true) and color(=false)
          cpj.files.push(printContent)
          cpj.sendToClient()
        }
        checkConnect = true
        break
      }
    }
  }
  if (!checkConnect) {
    toasts.error('Bạn hãy vào cấu hình máy in trước khi in.')
    pdf.autoPrint()
    const hiddFrame = document.createElement('iframe')
    hiddFrame.style.position = 'fixed'
    // "visibility: hidden" would trigger safety rules in some browsers like safari，
    // in which the iframe display in a pretty small size instead of hidden.
    // here is some little hack ~
    hiddFrame.style.width = '1px'
    hiddFrame.style.height = '1px'
    hiddFrame.style.opacity = '0.01'
    const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)
    if (isSafari) {
    // fallback in safari
      hiddFrame.onload = () => {
        try {
          hiddFrame.contentWindow.document.execCommand('print', false, null)
        } catch (e) {
          hiddFrame.contentWindow.print()
        }
      }
    }
    hiddFrame.src = pdf.output('bloburl')
    document.body.appendChild(hiddFrame)
  }
}

export const formatTextCustomerDisplay = (textParam, isLeft) => {
  let text = '                        '
  if (isLeft) {
    text = textParam + text
    return text.slice(0, 20)
  }
  text += textParam
  return text.slice(text.length - 20, text.length)
}

let serial = null
export const sendToCustomerDisplay = async (textData, isLeft) => {
  let initText = textData
  if (initText === '' || initText === null || initText === undefined) {
    initText = 'Xin kinh chao quy khach.'
  }
  initText = formatTextCustomerDisplay(initText, isLeft)
  if ('serial' in navigator) {
    if (serial === null) {
      serial = new Serial()
    }
    if (!serial.isOpen()) {
      // await serial.connectAndOpen()
      const checkConnect = await serial.autoConnectAndOpenPreviouslyApprovedPort()
      if (checkConnect) {
        // serial.write(initText)
        setTimeout(() => {
          serial.write(initText)
        }, 500)
      }
    } else { // no error
      serial.write(initText)
    }
  }
  // else {
  //   toasts.error('Trình duyệt không hỗ trợ kết nối với máy hiển thị.')
  // }
}

export const notificationResponseMessage = (statusCode, message) => {
  let responseMessage = ''
  if (statusCode) {
    switch (statusCode) {
      case 200:
        responseMessage = 'Ok'
        break
      case 201:
        responseMessage = 'Cập nhật thành công'
        break
      case 400:
        responseMessage = 'Yêu cầu không đúng định dạng'
        break
      case 401:
        responseMessage = 'Không được phép truy cập'
        break
      case 404:
        responseMessage = 'Không tìm thấy dữ liệu'
        break
      case 500:
        responseMessage = 'Không thực hiện được yêu cầu'
        break
      case 501:
        responseMessage = 'Không xác định được yêu cầu từ máy khách hàng'
        break
      case 504:
        responseMessage = 'Vượt quá thời gian yêu cầu'
        break
      case 2002:
        responseMessage = 'Hệ thống bị lỗi.'
        break
      case 6010:
        responseMessage = 'Token quên mật khẩu đã hết hạn'
        break
      case 5003:
        responseMessage = 'Hệ thống bị lỗi'
        break
      default:
        responseMessage = message
    }
  } else {
    responseMessage = 'Không kết nối được với server.'
  }

  return responseMessage
}
