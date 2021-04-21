import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getSalesReceiptsEndpoint,
  getSaleOrderDetailEndpoint,
} from './defaultConfig'

export default {
  getSalesReceipts() {
    return axios.get(`${getSalesReceiptsEndpoint}`)
  },
  getSaleOrderDetail(args) {
    return axios.get(getSaleOrderDetailEndpoint, {
      params: formatURLParams(args),
    })
  },
}
