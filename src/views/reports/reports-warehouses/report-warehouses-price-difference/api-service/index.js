import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getDifferencePriceEndPoint,
  getProductListsEndpoint,
  getProductCatListsEndpoint,
  exportDifferencePriceEndPoint,
} from './defaultConfig'

export default {
  getDifferencePrice(args) {
    return axios.get(getDifferencePriceEndPoint, {
      params: formatURLParams(args),
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
  exportDifferencePrice(args) {
    return axios.get(exportDifferencePriceEndPoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
}
