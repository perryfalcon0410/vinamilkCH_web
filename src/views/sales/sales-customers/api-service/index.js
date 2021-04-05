import axios from '@axios'
import {
  getCustomersEndpoint,
  deleteCustomersEndpoint,
  createCustomerEndpoint,
  getShopLocationsEndpoint,
  getCustomerTypesEndpoint,
  getPrecinctsEndpoint,
  getDistrictsEndpoint,
  getProvincesEndpoint,
} from './defaultConfig'

export default {
  getCustomers(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getCustomersEndpoint}?${queryString}`)
  },
  getCustomerTypes() {
    return axios.get(`${getCustomerTypesEndpoint}`)
  },
  createCustomer(args) {
    return axios.post(createCustomerEndpoint, args)
  },
  deleteCustomers(args) {
    return axios.delete(deleteCustomersEndpoint, {
      data: {
        customerIds: args,
      },
    })
  },
  getShopLocations(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getShopLocationsEndpoint}?${queryString}`)
  },
  getProvinces() {
    return axios.get(`${getProvincesEndpoint}`)
  },
  getDistricts(args) {
    return axios.get(`${getDistrictsEndpoint}?provinceId=${args}`)
  },
  getPrecincts(args) {
    return axios.get(`${getPrecinctsEndpoint}?districtId=${args}`)
  },
}
