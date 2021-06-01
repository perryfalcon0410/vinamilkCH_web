import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportsWarehousesInventoryEndpoint,
  exportReportInventoriesEndpoint,
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

}
