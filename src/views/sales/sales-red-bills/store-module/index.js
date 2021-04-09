import RedInvoiceService from '@/views/sales/sales-red-bills/api-service'
import {
  // GETTERS
  REDINVOICES_GETTER,
  ERROR_CODE_GETTER,
  // ACTIONS
  GET_REDINVOICES_ACTION,
} from './type'
import toasts from '../../../../@core/utils/toasts/toasts'

export default {
  namespaced: true,
  // STATE
  state: {
    redInvoices: [],
    errorCode: null,
  },

  // GETTERS
  getters: {
    [REDINVOICES_GETTER](state) {
      console.log(state)
      return state.redInvoices
    },
    [ERROR_CODE_GETTER](state) {
      return state.errorCode
    },
  },

  // MUTATIONS
  mutations: {},

  // ACTIONS
  actions: {
    [GET_REDINVOICES_ACTION]({ state }, val) {
      console.log(state)
      RedInvoiceService
        .getRedInvoices(val)
        .then(response => response.data)
        .then(res => {
          // console.log(res)

          if (res.success) {
            state.redInvoices = res.data.content
            // console.log(state.receiptexports)
          } else {
            // Temp
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          // Temp
          toasts.error(error.message)
        })
    },
  },
}
