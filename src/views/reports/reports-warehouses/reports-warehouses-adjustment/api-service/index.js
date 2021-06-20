import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportsWarehousesAdjustmentEndpoint,
  getProductCatListsEndpoint,
  getProductListsEndpoint,
  exportsWarehousesAdjustmentEndpoint,
  printWarehousesAdjustmentEndpoint,
} from './defaultConfig'

export default {
  getReportsWarehousesAdjustment(args) {
    return axios.get(getReportsWarehousesAdjustmentEndpoint, {
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

  exportsWarehousesAdjustment(args) {
    return axios.get(exportsWarehousesAdjustmentEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
  printWarehousesAdjustment(args) {
    return axios.get(printWarehousesAdjustmentEndpoint, {
      params: formatURLParams(args),
    })
  },
}
