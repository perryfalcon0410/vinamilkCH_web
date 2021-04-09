import axios from '@axios'
import {
  getReceiptExportEndpoint,
  printReceiptExportEndpoint,
} from './defaultConfig'

export default {
  getReceiptExports(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getReceiptExportEndpoint}?${queryString}`)
  },
  printReceiptExports(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${printReceiptExportEndpoint}?${queryString}`)
  },
}
