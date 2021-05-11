import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getSalesReceiptsEndpoint,
  getSalesReceiptsDetailEndpoint,
} from './defaultConfig'

export default {
  getSalesReceipts(args) {
    return axios.get(`${getSalesReceiptsEndpoint}`, {
      params: formatURLParams(args),
    })
  },
  getSalesReceiptsDetail(args) {
    return axios.get(getSalesReceiptsDetailEndpoint, {
      params: formatURLParams(args),
    })
  },
}
