import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getWarehousesInputEndpoint,
  exportExcelEndpoint,
  getProductCatListsEndpoint,
  getProductListsEndpoint,
  printShopImportReportEndpoint,
} from './defaultConfig'

export default {
  getWarehousesInput(args) {
    return axios.get(getWarehousesInputEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportWarehouseInputs(args) {
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
  printShopImportReport(args) {
    return axios.get(printShopImportReportEndpoint, {
      params: formatURLParams(args),
    })
  },
}
