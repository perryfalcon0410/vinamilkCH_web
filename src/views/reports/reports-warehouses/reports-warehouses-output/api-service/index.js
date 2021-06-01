import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getOutputGoodsEndpoint,
} from './defaultConfig'

export default {
  getOutputGoods(args) {
    return axios.get(`${getOutputGoodsEndpoint}`, {
      params: formatURLParams(args),
    })
  },
}
