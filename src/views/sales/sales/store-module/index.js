import SalesServices from '@/views/sales/sales/api-service'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  VOUCHERS_GETTER,
  ONLINEORDERS_GETTER,
  ONLINEORDERS_PAGINATION_GETTER,

  // ACTIONS
  GET_VOUCHERS_ACTION,
  GET_ONLINEORDERS_ACTION,

} from './type'

export default {
  namespaced: true,

  state: {
    vouchers: [],
    onlineOrders: [],
    onlineOrderPagination: {},
  },

  getters: {
    [VOUCHERS_GETTER](state) {
      return state.vouchers
    },
    [ONLINEORDERS_GETTER](state) {
      return state.onlineOrders
    },
    [ONLINEORDERS_PAGINATION_GETTER](state) {
      return state.onlineOrderPagination
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

    [GET_ONLINEORDERS_ACTION]({ state }, val) {
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
  },
}
