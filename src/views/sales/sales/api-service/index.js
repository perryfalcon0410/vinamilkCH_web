import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getVouchersEndpoint,
  getOnlineOrdersEndpoint,
  getProductsEndpoint,
  getProductInfosEndpoint,
  getProductsTopSaleEndpoint,
} from './defaultConfig'

export default {
  getVouchers(args) {
    return axios.get(getVouchersEndpoint, {
      params: formatURLParams(args),
    })
  },

  getOnlineOrder(args) {
    return axios.get(getOnlineOrdersEndpoint, {
      params: formatURLParams(args),
    })
  },
  getProducts(args) {
    return axios.get(getProductsEndpoint, {
      params: formatURLParams(args),
    })
  },
  getProductById(args) {
    return axios.get(`${getProductsEndpoint}/${args}`)
  },
  getProductsTopSale(args) {
    return axios.get(getProductsTopSaleEndpoint, {
      params: formatURLParams(args),
    })
  },
  getProductInfos(args) {
    return axios.get(getProductInfosEndpoint, {
      params: formatURLParams(args),
    })
  },
}
