import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getInputReceiptDetailsEndpoint,
  exportInputReceiptDetailExcelEndpoint,
  printInputReceiptDetailsEndpoint,
} from './defaultConfig'

export default {
  getInputReceiptDetails(args) {
    return axios.get(getInputReceiptDetailsEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportInputReceiptDetailExcel(args) {
    return axios.get(exportInputReceiptDetailExcelEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
      config: {
        header: {
          'Content-Type': 'application/json',
        },
      },
    })
  },
  printInputReceiptDetails(args) {
    return axios.get(printInputReceiptDetailsEndpoint, {
      params: formatURLParams(args),
    })
  },
}
