import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getReportsWarehousesInventoryEndpoint,
} from './defaultConfig'

export default {
  getReportsWarehousesInventory(args) {
    return axios.get(getReportsWarehousesInventoryEndpoint, {
      params: formatURLParams(args),
    })
  },

}
