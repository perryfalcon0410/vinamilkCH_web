import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getRedInvoiceEndpoint,
  getCustomersEndpoint,
  getBillOfSalesEndPoint,
  getBillOfSaleProductEndPoint,
  getProductsEndPoint,
} from './defaultConfig'

export default {
  getRedInvoices(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getRedInvoiceEndpoint}?${queryString}`)
  },
  getBillOfSales(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getBillOfSalesEndPoint}?${queryString}`)
  },
  getCustomers(args) {
    return axios.get(getCustomersEndpoint, {
      params: formatURLParams(args),
    })
  },
  getBillOfSaleProduct(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getBillOfSaleProductEndPoint}?${queryString}`)
  },
  getProducts(args) {
    return axios.get(`${getProductsEndPoint}`, {
      params: formatURLParams(args),
    })
  },
}
