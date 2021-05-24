import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportsWarehousesPromotionEndpoint,
} from './defaultConfig'

export default {
  getReportsWarehousesPromotion(args) {
    return axios.get(getReportsWarehousesPromotionEndpoint, {
      params: formatURLParams(args),
    })
  },
}
