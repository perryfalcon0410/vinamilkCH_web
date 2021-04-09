import axios from '@axios'
import {
  getRedInvoiceEndpoint,
} from './defaultConfig'

export default {
  getRedInvoices(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getRedInvoiceEndpoint}?${queryString}`)
  },
}
