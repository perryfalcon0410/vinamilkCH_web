import SalesServices from '@/views/sales/sales/api-service'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  VOUCHERS_GETTER,
  ONLINE_ORDERS_GETTER,
  ONLINE_ORDERS_PAGINATION_GETTER,
  ONLINE_ORDER_BY_ID_GETTER,
  GET_PRODUCTS_GETTER,
  GET_PRODUCT_INFOS_GETTER,
  GET_TOP_SALE_PRODUCTS_GETTER,
  GET_HOT_PRODUCTS_GETTER,
  GET_ALL_PRODUCT_GETTER,

  // ACTIONS
  GET_VOUCHERS_ACTION,
  GET_ONLINE_ORDERS_ACTION,
  GET_ONLINE_ORDER_BY_ID_ACTION,
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_INFOS_ACTION,
  GET_TOP_SALE_PRODUCTS_ACTION,
  GET_HOT_PRODUCTS_ACTION,
  GET_ALL_PRODUCT_ACTION,
} from './type'

export default {
  namespaced: true,

  state: {
    vouchers: [],
    onlineOrders: [],
    onlineOrderByIds: [],
    onlineOrderPagination: {},
    products: [],
    productInfos: [],
    topSaleProducts: [],
    hotProducts: [],
    allProduct: [],
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
    [ONLINE_ORDER_BY_ID_GETTER](state) {
      return state.onlineOrderByIds
    },
    [GET_PRODUCTS_GETTER](state) {
      return state.products
    },
    [GET_PRODUCT_INFOS_GETTER](state) {
      return state.productInfos
    },
    [GET_TOP_SALE_PRODUCTS_GETTER](state) {
      return state.topSaleProducts
    },
    [GET_HOT_PRODUCTS_GETTER](state) {
      return state.hotProducts
    },
    [GET_ALL_PRODUCT_GETTER](state) {
      return state.allProduct
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
    [GET_ONLINE_ORDER_BY_ID_ACTION]({ state }, val) {
      SalesServices
        .getOnlineOrderById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.onlineOrderByIds = res.data.products
            console.log('state.onlineOrderById', state.onlineOrderByIds)
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
    [GET_TOP_SALE_PRODUCTS_ACTION]({ state }, val) {
      SalesServices
        .getProductsTopSale(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.topSaleProducts = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_HOT_PRODUCTS_ACTION]({ state }, val) {
      SalesServices
        .getProductsHot(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.hotProducts = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_ALL_PRODUCT_ACTION]({ state }, val) {
      SalesServices
        .getProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.allProduct = res.data.content || []
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
