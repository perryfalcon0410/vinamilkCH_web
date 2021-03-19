import axios from '@/libs/axios'
import {
  getCustomerEndpoint,
  deleteCustomerEndpoint,
} from './defaultConfig/customer.config'

export default {
  getAll() {
    return axios.get(`${getCustomerEndpoint}?sort[unsorted]=true&sort[sorted]=true&paged=true&pageSize=0&pageNumber=0&unpaged=true&offset=0`)
  },

  delete(...args) {
    return axios.delete(deleteCustomerEndpoint, {
      data: {
        args,
      },
    })
  },
}
