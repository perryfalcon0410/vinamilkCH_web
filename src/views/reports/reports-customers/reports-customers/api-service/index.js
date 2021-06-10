import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  // Reports
  getReportsCustomersEndpoint,
  exportReportsCustomersEndpoint,
  getCustomerTypesEndpoint,
  getShopLocationsSearchEndpoint,
} from './defaultConfig'

export default {
  // Reports
  getReportsCustomers(args) {
    return axios.get(getReportsCustomersEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReportsCustomers(args) {
    return axios.get(exportReportsCustomersEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
  getCustomerTypes(args) {
    return axios.get(getCustomerTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getShopLocationsSearch(args) {
    return axios.get(getShopLocationsSearchEndpoint, {
      params: formatURLParams(args),
    })
  },
}
