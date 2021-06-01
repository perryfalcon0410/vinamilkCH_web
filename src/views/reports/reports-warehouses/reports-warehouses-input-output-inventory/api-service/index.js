import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getWarehousesInputOutputInventoryEndpoint,
  exportExcelEndpoint,
  getProductCatListsEndpoint,
  getProductListsEndpoint,
} from './defaultConfig'

export default {
  getWarehousesInputOutputInventory(args) {
    return axios.get(getWarehousesInputOutputInventoryEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportWarehousesInputOutputInventory(args) {
    return axios.get(exportExcelEndpoint, {
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
