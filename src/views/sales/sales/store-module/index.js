import SalesServices from '@/views/sales/sales/api-service'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  VOUCHERS_GETTER,
  ONLINE_ORDERS_GETTER,
  ONLINE_ORDERS_PAGINATION_GETTER,
  GET_PRODUCTS_GETTER,
  GET_PRODUCT_INFOS_GETTER,
  GET_PRODUCTS_TOP_SALE_GETTER,

  // ACTIONS
  GET_VOUCHERS_ACTION,
  GET_ONLINE_ORDERS_ACTION,
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_INFOS_ACTION,
  GET_PRODUCTS_TOP_SALE_ACTION,
} from './type'

export default {
  namespaced: true,

  state: {
    vouchers: [],
    onlineOrders: [],
    onlineOrderPagination: {},
    products: [],
    productInfos: [],
    productsTopSale: [],
  },

  getters: {
    [VOUCHERS_GETTER](state) {
      return state.vouchers
    },
    [ONLINE_ORDERS_GETTER](state) {
      return state.onlineOrders
    },
    [ONLINE_ORDERS_PAGINATION_GETTER](state) {
      return state.onlineOrderPagination
    },
    [GET_PRODUCTS_GETTER](state) {
      return state.products
    },
    [GET_PRODUCT_INFOS_GETTER](state) {
      return state.productInfos
    },
    [GET_PRODUCTS_TOP_SALE_GETTER](state) {
      return state.productsTopSale
    },
  },

  mutations: {},

  actions: {
    [GET_VOUCHERS_ACTION]({ state }, val) {
      SalesServices
        .getVouchers(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.vouchers = res.data.content
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [GET_ONLINE_ORDERS_ACTION]({ state }, val) {
      SalesServices
        .getOnlineOrder(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.onlineOrders = res.data.content
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCTS_ACTION]({ state }, val) {
      SalesServices
        .getProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.products = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCT_INFOS_ACTION]({ state }, val) {
      SalesServices
        .getProductInfos(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productInfos = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCTS_TOP_SALE_ACTION]({ state }, val) {
      SalesServices
        .getProductsTopSale(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productsTopSale = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
  },
}
