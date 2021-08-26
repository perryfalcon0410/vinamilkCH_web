import axios from '@axios'
import { formatURLParams, formatSortUrl, sortFilterParams } from '@/@core/utils/utils'
import {
  getWareHouseComboDetailEndPoint,
  getWarehousesComboEndPoint,
  getComboProductsEndpoint,
  getComboProductsDetailsEndpoint,
  createComboProductEndpoit,
  getWarehouseTypesEndpoint,
} from './defaultConfig'

export default {
  getWareHouseComboDetail(args) {
    return axios.get(`${getWareHouseComboDetailEndPoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
  getWarehousesCombo(args) {
    return axios.get(`${getWarehousesComboEndPoint}${formatSortUrl(args)}`, {
      params: formatURLParams(sortFilterParams(args)),
    })
  },
  getComboProducts(args) {
    return axios.get(getComboProductsEndpoint, {
      params: formatURLParams(args),
    })
  },
  getComboProductsDetails(args) {
    return axios.get(`${getComboProductsDetailsEndpoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
  createComboProduct(args) {
    return axios.post(createComboProductEndpoit, args)
  },
  getWarehouseTypes(args) {
    return axios.get(getWarehouseTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
}
