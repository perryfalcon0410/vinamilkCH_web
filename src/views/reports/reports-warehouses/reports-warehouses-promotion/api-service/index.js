import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportsWarehousesPromotionEndpoint,
  getProductCatListsEndpoint,
  getProductListsEndpoint,
  exportsWarehousesPromotionEndpoint,
} from './defaultConfig'

export default {
  getReportsWarehousesPromotion(args) {
    return axios.get(getReportsWarehousesPromotionEndpoint, {
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
  exportsWarehousesPromotion(args) {
    return axios.get(exportsWarehousesPromotionEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
}
