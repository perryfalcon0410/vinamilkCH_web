import axios from '@axios'
import {
  getSalesOrderListEndpoint,
} from './defaultConfig'

export default {
  getSalesOrderList() {
    return axios.get(`${getSalesOrderListEndpoint}`)
  },
}
