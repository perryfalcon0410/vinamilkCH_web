import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getWarehouseInventoriesEndpoint,
  getWarehouseTypesEndpoint,
} from './defaultConfig'

export default {
  getWarehouseInventories(args) {
    return axios.get(getWarehouseInventoriesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getWarehouseTypes(args) {
    return axios.get(getWarehouseTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
}
