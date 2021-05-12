import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getWareHouseComboDetailEndPoint,
  getWarehousesComboEndPoint,
  getComboProductsEndpoint,
} from './defaultConfig'

export default {
  getWareHouseComboDetail(args) {
    return axios.get(`${getWareHouseComboDetailEndPoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
  getWarehousesCombo(args) {
    return axios.get(getWarehousesComboEndPoint, {
      params: formatURLParams(args),
    })
  },
  getComboProducts(args) {
    return axios.get(getComboProductsEndpoint, {
      params: formatURLParams(args),
    })
  },
}
