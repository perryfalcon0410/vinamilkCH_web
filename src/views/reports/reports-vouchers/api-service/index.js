import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportVouchersUsedEndpoint,
  exportVouchersExcelEndpoint,
} from './defaultConfig'

export default {
  getReportVouchersUsed(args) {
    return axios.get(getReportVouchersUsedEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportVouchersExcelEndpoint(args) {
    return axios.get(exportVouchersExcelEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
      config: {
        header: {
          'Content-Type': 'application/json',
        },
      },
    })
  },
}
