import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getSalesReceiptsEndpoint,
  getSalesReceiptsDetailEndpoint,
  printSalesReceipt,
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
  printSalesReceipt(args) {
    return axios.get(`${printSalesReceipt}/${args.salesReceiptId}`, {
      params: formatURLParams(args.params),
    })
  },
}
