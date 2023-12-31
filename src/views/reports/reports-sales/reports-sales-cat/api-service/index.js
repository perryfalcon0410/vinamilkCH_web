import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  // Reports
  getReportsSalesCatEndpoint,
  exportReportsSalesCatEndpoint,
  getCustomerTypesEndpoint,
  printReportEndpoint,
} from './defaultConfig'

export default {
  // Reports
  getReportsSalesCat(args) {
    return axios.get(getReportsSalesCatEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReportsSalesCat(args) {
    return axios.get(exportReportsSalesCatEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
  getCustomerTypes(args) {
    return axios.get(getCustomerTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
  printReport(args) {
    return axios.get(printReportEndpoint, {
      params: formatURLParams(args),
    })
  },
}
