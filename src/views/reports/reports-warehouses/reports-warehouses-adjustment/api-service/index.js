import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportsWarehousesAdjustmentEndpoint,
} from './defaultConfig'

export default {
  getReportsWarehousesAdjustment(args) {
    return axios.get(getReportsWarehousesAdjustmentEndpoint, {
      param: formatURLParams(args),
    })
  },
}
