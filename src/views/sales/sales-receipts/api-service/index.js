import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getSalesReceiptsEndpoint,
  getSalesReceiptsDetailEndpoint,
} from './defaultConfig'

export default {
  getSalesReceipts() {
    return axios.get(`${getSalesReceiptsEndpoint}`)
  },
  getSalesReceiptsDetail(args) {
    return axios.get(getSalesReceiptsDetailEndpoint, {
      params: formatURLParams(args),
    })
  },
}
