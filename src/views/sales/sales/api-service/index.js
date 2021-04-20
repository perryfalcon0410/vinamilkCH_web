import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getVouchersEndpoint,
} from './defaultConfig'

export default {
  getVouchers(args) {
    return axios.get(getVouchersEndpoint, {
      params: formatURLParams(args),
    })
  },

}
