import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  // Reports
  getReportsReturnedGoodsEndpoint,
  exportReportsReturnedGoodsEndpoint,
  printInputOrderDetailEndpoint, // temp
  printSellsEndpoint, // temp
  printReturnGoodsEndpoint,
  getReasonReturnGoodsEndpoint,
  // Sales
  getProductCatListsEndpoint,
  getProductListsEndpoint,
} from './defaultConfig'

export default {
  // Reports
  getReportsReturnedGoods(args) {
    return axios.get(getReportsReturnedGoodsEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReportsReturnedGoods(args) {
    return axios.get(exportReportsReturnedGoodsEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
  printInputOrderDetail(args) {
    return axios.get(printInputOrderDetailEndpoint, { // temp
      params: formatURLParams(args),
    })
  },
  printSells(args) {
    return axios.get(printSellsEndpoint, { // temp
      params: formatURLParams(args),
    })
  },
  printReturnGoods(args) {
    return axios.get(printReturnGoodsEndpoint, {
      params: formatURLParams(args),
    })
  },
  // Sales
  getProductLists(args) {
    return axios.get(getProductListsEndpoint, {
      params: formatURLParams(args),
    })
  },
  getProductCatlists(args) {
    return axios.get(getProductCatListsEndpoint, {
      params: formatURLParams(args),
    })
  },
  getReasonReturnGoods(args) {
    return axios.get(getReasonReturnGoodsEndpoint, {
      params: formatURLParams(args),
    })
  },
}
