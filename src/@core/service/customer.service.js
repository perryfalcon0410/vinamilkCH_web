import axios from '@/libs/axios'
import {
  getCustomerEndpoint,
  deleteCustomerEndpoint,
  locationCustomerEndpoint,
} from './defaultConfig/customer.config'

export default {
  getAll(args) {
    return axios.get(`${getCustomerEndpoint}${args}`)
  },

  delete(args) {
    return axios.delete(deleteCustomerEndpoint, {
      data: {
        customerIds: args,
      },
    })
  },

  getLocationShop(args) {
    return axios.get(`${locationCustomerEndpoint}?shopId=${args}`)
  },
}
