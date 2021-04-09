import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReceiptsEndpoint,
  exportReceiptsEndpoint,
} from './defaultConfig'

export default {
  getReceiptImport(args) {
    return axios.get(getReceiptsEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReceiptImport(args) {
    return axios.get(`${exportReceiptsEndpoint}${args}`)
  },
}
