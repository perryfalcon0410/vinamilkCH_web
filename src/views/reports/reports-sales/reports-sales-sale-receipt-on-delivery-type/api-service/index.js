import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getDeliveryTypesEndpoint,
  getReportSalesOnDeliveryTypeEndpoint,
  exportReportSalesOnDeliveryTypeEndpoint,
} from './defaultConfig'

export default {
  getDeliveryTypes(args) {
    return axios.get(getDeliveryTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getReportSalesOnDeliveryType(args) {
    return axios.get(getReportSalesOnDeliveryTypeEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReportSalesOnDeliveryType(args) {
    return axios.get(exportReportSalesOnDeliveryTypeEndpoint, {
      responseType: 'blob',
      params: formatURLParams(args),
    })
  },
}
