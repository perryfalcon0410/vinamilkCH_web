import axios from '@axios'
import {
  getSalesReceiptsEndpoint,
} from './defaultConfig'

export default {
  getSalesReceipts() {
    return axios.get(`${getSalesReceiptsEndpoint}`)
  },
}
