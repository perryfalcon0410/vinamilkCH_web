import axios from '@/libs/axios'
import {
  getCustomerEndpoint,
  deleteCustomerEndpoint,
} from './defaultConfig/customer.config'

export default {
  getAll() {
    return axios.get(`${getCustomerEndpoint}`)
  },

  delete(args) {
    return axios.delete(deleteCustomerEndpoint, {
      data: {
        customerIds: args,
      },
    })
  },
}
