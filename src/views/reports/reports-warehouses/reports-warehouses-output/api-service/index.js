import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getOutputGoodsEndpoint,
  exportOutputGoodsEndpoint,
  printOutputGoodsEndpoint,
  // Sales
  getProductCatListsEndpoint,
  getProductListsEndpoint,
} from './defaultConfig'

export default {
  getOutputGoods(args) {
    return axios.get(`${getOutputGoodsEndpoint}`, {
      params: formatURLParams(args),
    })
  },
  exportOutputGoods(args) {
    return axios.get(exportOutputGoodsEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
  printOutputGoods(args) {
    return axios.get(printOutputGoodsEndpoint, { // temp
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
}
