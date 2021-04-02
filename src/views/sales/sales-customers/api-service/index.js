import axios from '@axios'
import {
  getCustomersEndpoint,
  deleteCustomersEndpoint,
  createCustomerEndpoint,
  getShopLocationsEndpoint,
} from './defaultConfig'

export default {
  getCustomers(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getCustomersEndpoint}?${queryString}`)
  },
  createCustomer(args) {
    return axios.post(createCustomerEndpoint, args)
  },
  deleteCustomers(args) {
    return axios.delete(deleteCustomersEndpoint, {
      data: args,
    })
  },
  getShopLocations(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getShopLocationsEndpoint}?${queryString}`)
  },
}
