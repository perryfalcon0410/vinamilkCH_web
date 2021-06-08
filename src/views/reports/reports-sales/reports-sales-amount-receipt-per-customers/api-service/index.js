import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getCustomerTypesEndpoint,
  getReportSalesQuantityReceiptsEndpoint,
  exportReportSalesQuantityReceiptsEndpoint,
} from './defaultConfig'

export default {
  getCustomerTypes(args) {
    return axios.get(getCustomerTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getReportSalesQuantityReceipts(args) {
    return axios.get(getReportSalesQuantityReceiptsEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReportSalesQuantityReceipts(args) {
    return axios.get(exportReportSalesQuantityReceiptsEndpoint, {
      responseType: 'blob',
      params: formatURLParams(args),
    })
  },
}
