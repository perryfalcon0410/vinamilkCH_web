import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getVouchersEndpoint,
  getOnlineOrderEndpoint,
} from './defaultConfig'

export default {
  getVouchers(args) {
    return axios.get(getVouchersEndpoint, {
      params: formatURLParams(args),
    })
  },

  getOnlineOrder(args) {
    return axios.get(getOnlineOrderEndpoint, {
      params: formatURLParams(args),
    })
  },
}
