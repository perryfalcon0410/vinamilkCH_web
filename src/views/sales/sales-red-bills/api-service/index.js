import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getRedInvoiceEndpoint,
  getCustomersEndpoint,
  getBillOfSalesEndPoint,
  getBillOfSaleProductsEndPoint,
  getProductsEndPoint,
  createRedBillEndpoint,
  getInvoiceDetailEndpoint,
  deleteReDBillEndpoint,
} from './defaultConfig'

export default {
  getRedInvoices(args) {
    return axios.get(getRedInvoiceEndpoint, {
      params: formatURLParams(args),
    })
  },
  getBillOfSales(args) {
    return axios.get(getBillOfSalesEndPoint, {
      params: formatURLParams(args),
    })
  },
  getCustomers(args) {
    return axios.get(getCustomersEndpoint, {
      params: formatURLParams(args),
    })
  },
  getBillOfSaleProduct(args) {
    return axios.get(getBillOfSaleProductsEndPoint, {
      params: formatURLParams(args),
    })
  },
  getProducts(args) {
    return axios.get(`${getProductsEndPoint}`, {
      params: formatURLParams(args),
    })
  },
  createRedBill(args) {
    return axios.post(createRedBillEndpoint, args)
  },
  getInvoiceDetail(args) {
    return axios.get(`${getInvoiceDetailEndpoint}`, {
      params: formatURLParams(args),
    })
  },
  deleteRedBill(args) {
    return axios.delete(`${deleteReDBillEndpoint}`, {
      params: formatURLParams(args),
    })
  },
}
