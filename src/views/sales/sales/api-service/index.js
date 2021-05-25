import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getVouchersEndpoint,
  getVoucherByIdEndpoint,
  getOnlineOrdersEndpoint,
  getOnlineOrderByIdEndpoint,
  getProductsEndpoint,
  getProductInfosEndpoint,
  getProductsTopSaleEndpoint,
  getProductsHotEndpoint,
  createSaleOrderEndpoint,
  getDiscountByCodeEndpoint,
  updatePriceTypeCustomerEndpoint,
} from './defaultConfig'

export default {
  getVouchers(args) {
    return axios.get(getVouchersEndpoint, {
      params: formatURLParams(args),
    })
  },

  getVoucherById(args) {
    return axios.get((`${getVoucherByIdEndpoint}/${args}`))
  },

  getOnlineOrder(args) {
    return axios.get(getOnlineOrdersEndpoint, {
      params: formatURLParams(args),
    })
  },

  getOnlineOrderById(args) {
    return axios.get((`${getOnlineOrderByIdEndpoint}/${args}`))
  },

  getProducts(args) {
    return axios.get(getProductsEndpoint, {
      params: formatURLParams(args),
    })
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
  getProductsHot(args) {
    return axios.get(`${getProductsHotEndpoint}/${args.customerId}`)
  },

  createSaleOrder(args) {
    return axios.post(createSaleOrderEndpoint, args)
  },

  getDiscountByCode(args) {
    return axios.get((`${getDiscountByCodeEndpoint}/${args}`))
  },

  updatePriceTypeCustomer(args) {
    return axios.post(`${updatePriceTypeCustomerEndpoint}/${args.customerTypeId}`, args.listProducts)
  },
}
