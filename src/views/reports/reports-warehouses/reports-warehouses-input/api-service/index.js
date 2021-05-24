import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getWarehousesInputEndpoint,
  exportExcelEndpoint,
} from './defaultConfig'

export default {
  getWarehousesInput(args) {
    return axios.get(getWarehousesInputEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportWarehouseInputs(args) {
    return axios.post(exportExcelEndpoint, args, {
      responseType: 'blob',
    })
  },
}
