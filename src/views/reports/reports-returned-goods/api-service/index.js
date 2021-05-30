import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportsReturnedGoodsEndpoint,
  exportReportsReturnedGoodsEndpoint,
  getProductCatListsEndpoint,
  getProductListsEndpoint,
} from './defaultConfig'

export default {
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
