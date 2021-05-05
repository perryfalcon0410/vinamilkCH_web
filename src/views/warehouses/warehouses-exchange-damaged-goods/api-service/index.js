import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getExchangeDamagedGoodsEndpoint,
} from './defaultConfig'

export default {
  getExchangeDamagedGoods(args) {
    return axios.get(`${getExchangeDamagedGoodsEndpoint}`, {
      params: formatURLParams(args),
    })
  },
}
