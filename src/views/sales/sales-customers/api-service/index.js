import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getCustomersEndpoint,
  getCustomerByIdEndpoint,
  createCustomerEndpoint,
  updateCustomerEndpoint,
  exportCustomersEndpoint,
  getCustomerDefaultEndpoint,

  getShopLocationsEndpoint,
  getCustomerTypesEndpoint,
  getPrecinctsEndpoint,
  getDistrictsEndpoint,
  getProvincesEndpoint,

  getCardTypesEndpoint,
  getCloselyTypesEndpoint,

  getSalemtPromotionObjectTypeEndpoint,
  getSalemtDeliveryTypeEndpoint,
  getSalemtPaymentTypeEndpoint,
} from './defaultConfig'

export default {
  getCustomers(args) {
    return axios.get(getCustomersEndpoint, {
      params: formatURLParams(args),
    })
  },
  getCustomerById(args) {
    return axios.get((`${getCustomerByIdEndpoint}/${args}`))
  },
  getCustomerTypes(args) {
    return axios.get(getCustomerTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getCustomerDefault(args) {
    return axios.get(getCustomerDefaultEndpoint, {
      params: formatURLParams(args),
    })
  },
  createCustomer(args) {
    return axios.post(createCustomerEndpoint, args)
  },
  updateCustomer(args) {
    return axios.patch(`${updateCustomerEndpoint}/${args.id}`, args)
  },
  exportCustomers() {
    return axios.get(exportCustomersEndpoint)
  },
  getShopLocations(args) {
    return axios.get(getShopLocationsEndpoint, {
      params: formatURLParams(args),
    })
  },
  getProvinces(args) {
    return axios.get(getProvincesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getDistricts(args) {
    return axios.get(getDistrictsEndpoint, {
      params: formatURLParams(args),
    })
  },
  getPrecincts(args) {
    return axios.get(getPrecinctsEndpoint, {
      params: formatURLParams(args),
    })
  },
  getCardTypes(args) {
    return axios.get(getCardTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getCloselyTypes(args) {
    return axios.get(getCloselyTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getSalemtPromotionObjects(args) {
    return axios.get(getSalemtPromotionObjectTypeEndpoint, {
      params: formatURLParams(args),
    })
  },
  getSalemtDeliveryTypes(args) {
    return axios.get(getSalemtDeliveryTypeEndpoint, {
      params: formatURLParams(args),
    })
  },
  getSalemtPaymentTypes(args) {
    return axios.get(getSalemtPaymentTypeEndpoint, {
      params: formatURLParams(args),
    })
  },
}
