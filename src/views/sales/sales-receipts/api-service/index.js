import axios from '@axios'
import { formatURLParams, formatSortUrl, sortFilterParams } from '@/@core/utils/utils'
import {
  getSalesReceiptsEndpoint,
  getSalesReceiptsDetailEndpoint,
  printSalesReceipt,
} from './defaultConfig'

export default {
  getSalesReceipts(args) {
    return axios.get(`${getSalesReceiptsEndpoint}${formatSortUrl(args)}`, {
      params: formatURLParams(sortFilterParams(args)),
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
