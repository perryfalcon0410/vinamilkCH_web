import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getRedInvoiceEndpoint,
  getCustomersEndpoint,
} from './defaultConfig'

export default {
  getRedInvoices(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getRedInvoiceEndpoint}?${queryString}`)
  },
  getCustomers(args) {
    return axios.get(getCustomersEndpoint, {
      params: formatURLParams(args),
    })
  },
}
