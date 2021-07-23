import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportsWarehousesInventoryEndpoint,
  exportReportInventoriesEndpoint,
  getProductCatListsEndpoint,
  getProductListsEndpoint,
  printReportInventoryEndpoint,
  getWarehouseTypesEndpoint,
} from './defaultConfig'

export default {
  getReportsWarehousesInventory(args) {
    return axios.get(getReportsWarehousesInventoryEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReportInventories(args) {
    return axios.get(exportReportInventoriesEndpoint, {
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
  printReportInventory(args) {
    return axios.get(printReportInventoryEndpoint, {
      params: formatURLParams(args),
    })
  },
  getWarehouseTypes(args) {
    return axios.get(getWarehouseTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
}
