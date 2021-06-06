import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportsCustomersNonTransactionalEndpoint,
  exportReportsCustomersNonTransactionalEndpoint,
} from './defaultConfig'

export default {
  getReportsCustomersNonTransactional(args) {
    return axios.get(getReportsCustomersNonTransactionalEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReportsCustomersNonTransactional(args) {
    return axios.get(exportReportsCustomersNonTransactionalEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
}
