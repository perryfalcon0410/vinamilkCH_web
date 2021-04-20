import RedInvoiceService from '@/views/sales/sales-red-bills/api-service'
import {
  // GETTERS
  REDINVOICES_GETTER,
  ERROR_CODE_GETTER,
  CUSTOMERS_GETTER,
  // ACTIONS
  GET_REDINVOICES_ACTION,
  GET_CUSTOMERS_ACTION,
} from './type'
import toasts from '../../../../@core/utils/toasts/toasts'

export default {
  namespaced: true,
  // STATE
  state: {
    redInvoices: [],
    errorCode: null,
    customers: [],
  },

  // GETTERS
  getters: {
    [REDINVOICES_GETTER](state) {
      return state.redInvoices
    },
    [ERROR_CODE_GETTER](state) {
      return state.errorCode
    },
    [CUSTOMERS_GETTER](state) {
      return state.customers
    },
  },

  // MUTATIONS
  mutations: {},

  // ACTIONS
  actions: {
    [GET_REDINVOICES_ACTION]({ state }, val) {
      RedInvoiceService
        .getRedInvoices(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.redInvoices = res.data.content
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_CUSTOMERS_ACTION]({ state }, val) {
      RedInvoiceService
        .getCustomers(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.customers = res.data.content
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
