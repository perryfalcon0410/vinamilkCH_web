import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportSalesEndpoint,
  exportExcelEndpoint,
  getProductCatsEndpoint,
  getProductsEndpoint,
  getBillCollectorsEndpoint,
  printReportSalesEndpoint,
  getSalesChannelEndpoint,
} from './defaultConfig'

export default {
  getReportSales(args) {
    return axios.get(getReportSalesEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReportSales(args) {
    return axios.get(exportExcelEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
  getProducts(args) {
    return axios.get(getProductsEndpoint, {
      params: formatURLParams(args),
    })
  },
  getProductCats(args) {
    return axios.get(getProductCatsEndpoint, {
      params: formatURLParams(args),
    })
  },
  getBillCollectors(args) {
    return axios.get(getBillCollectorsEndpoint, {
      params: formatURLParams(args),
    })
  },
  printReportSales(args) {
    return axios.get(printReportSalesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getSalesChannel(args) {
    return axios.get(getSalesChannelEndpoint, {
      params: formatURLParams(args),
    })
  },
}
