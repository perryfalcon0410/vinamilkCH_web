import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getVouchersEndpoint,
  getOnlineOrdersEndpoint,
} from './defaultConfig'

export default {
  getVouchers(args) {
    return axios.get(getVouchersEndpoint, {
      params: formatURLParams(args),
    })
  },

  getOnlineOrder(args) {
    return axios.get(getOnlineOrdersEndpoint, {
      params: formatURLParams(args),
    })
  },
}
