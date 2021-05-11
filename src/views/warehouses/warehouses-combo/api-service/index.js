import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getWareHouseComboDetailEndPoint,
} from './defaultConfig'

export default {
  getWareHouseComboDetail(args) {
    return axios.get(`${getWareHouseComboDetailEndPoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
}
