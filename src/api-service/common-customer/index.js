import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getCustomerTypesEndpoint,
} from './defaultConfig'

export default {
  getCustomerTypes(args) {
    return axios.get(getCustomerTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
}
