import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getCustomersEndpoint,
  getCustomerByIdEndpoint,
  createCustomerEndpoint,
  updateCustomerEndpoint,
  exportCustomersEndpoint,

  getShopLocationsEndpoint,
  getCustomerTypesEndpoint,
  getPrecinctsEndpoint,
  getDistrictsEndpoint,
  getProvincesEndpoint,

  getCardTypesEndpoint,
  getCloselyTypesEndpoint,
} from './defaultConfig'

export default {
  // getCustomers(args) {
  //   return axios.get(getCustomersEndpoint, {
  //     params: formatURLParams(args),
  //   })
  // },
  getCustomers(args) {
    return axios.get(getCustomersEndpoint, {
      data: formatURLParams(args),
    })
  },
  getCustomerById(args) {
    return axios.get(`${getCustomerByIdEndpoint}/${args}`)
  },
  getCustomerTypes() {
    return axios.get(`${getCustomerTypesEndpoint}`)
  },
  createCustomer(args) {
    return axios.post(createCustomerEndpoint, args)
  },
  updateCustomer(id, args) {
    return axios.patch(`${updateCustomerEndpoint}/${id}`, args)
  },
  exportCustomers() {
    return axios.get(`${exportCustomersEndpoint}`)
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
  getCardTypes() {
    return axios.get(`${getCardTypesEndpoint}`)
  },
  getCloselyTypes() {
    return axios.get(`${getCloselyTypesEndpoint}`)
  },
}