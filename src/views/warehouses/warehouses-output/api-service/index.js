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
    return axios(`${printReceiptExportEndpoint}?${queryString}`, {
      method: 'GET',
      responseType: 'blob', // Force to receive data in a Blob Format
    })
  },
}
