import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportsReturnedGoodsEndpoint,
  exportReportsReturnedGoodsEndpoint,
} from './defaultConfig'

export default {
  getReportsReturnedGoods(args) {
    return axios.get(getReportsReturnedGoodsEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReportsReturnedGoods(args) {
    return axios.get(exportReportsReturnedGoodsEndpoint, {
      params: formatURLParams(args),
    })
  },

}
