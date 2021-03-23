import axios from '@/libs/axios'
import {
  getDistrictEndpoint,
} from './defaultConfig/common.config'

export default {
  getDistrict() {
    return axios.get(`${getDistrictEndpoint}`)
  },

  // delete(args) {
  //   return axios.delete(deleteCustomerEndpoint, {
  //     data: {
  //       customerIds: args,
  //     },
  //   })
  // },
}
