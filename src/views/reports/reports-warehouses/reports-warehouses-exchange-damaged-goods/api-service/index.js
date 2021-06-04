import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportExchangeDamagedGoodListEndpoint,
  getReasonExchangeEndpoint,
  exportReportExchangeDamagedGoodsEndpoint,
  getProductCatListsEndpoint,
  getProductListsEndpoint,
} from './defaultConfig'

export default {
  getReportExchangeDamagedGoodList(args) {
    return axios.get(getReportExchangeDamagedGoodListEndpoint, {
      params: formatURLParams(args),
    })
  },
  getReasonExchange(args) {
    return axios.get(getReasonExchangeEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReportExchangeDamagedGoods(args) {
    return axios.get(exportReportExchangeDamagedGoodsEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
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

}
