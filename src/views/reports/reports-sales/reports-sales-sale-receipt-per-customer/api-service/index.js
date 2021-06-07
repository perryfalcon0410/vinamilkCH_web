import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getCustomerTypesEndpoint,
  getReportSalesAmountEndpoint,
  exportReportSalesExcelEndpoint,
} from './defaultConfig'

export default {
  getCustomerTypes(args) {
    return axios.get(getCustomerTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getReportSalesAmount(args) {
    return axios.get(getReportSalesAmountEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReportSalesExcel(args) {
    return axios.get(exportReportSalesExcelEndpoint, {
      responseType: 'blob',
      params: formatURLParams(args),
    })
  },
}
