import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getCustomersEndpoint,
  getCustomerByIdEndpoint,
  createCustomerEndpoint,
  updateCustomerEndpoint,
  exportCustomersEndpoint,
  getCustomerDefaultEndpoint,

  getShopLocationsSearchEndpoint,
  getShopLocationsEndpoint,
  getCustomerTypesEndpoint,
  getCustomerTypesUpdateEndpoint,
  getPrecinctsEndpoint,
  getDistrictsEndpoint,
  getProvincesEndpoint,

  getCardTypesEndpoint,
  getCloselyTypesEndpoint,
  getGendersEndpoint,
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
  getCustomerTypesUpdate(args) {
    return axios.get(getCustomerTypesUpdateEndpoint, {
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
  exportCustomers(args) {
    return axios.get(exportCustomersEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
  getShopLocationsSearch(args) {
    return axios.get(getShopLocationsSearchEndpoint, {
      params: formatURLParams(args),
    })
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
  getGenders(args) {
    return axios.get(getGendersEndpoint, {
      params: formatURLParams(args),
    })
  },
}
