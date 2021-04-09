import axios from '@axios'
import {
  getReceiptExportEndpoint,
} from './defaultConfig'

export default {
  getReceiptExports(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getReceiptExportEndpoint}?${queryString}`)
  },
}
