import WarehousesService from '@/views/warehouses/warehouses-output/api-service'
import {
  // GETTERS
  RECEIPTEXPORTS_GETTER,
  ERROR_CODE_GETTER,
  // ACTIONS
  GET_RECEIPTEXPORTS_ACTION,
} from './type'
import toasts from '../../../../@core/utils/toasts/toasts'

export default {
  namespaced: true,
  // STATE
  state: {
    receiptExports: [],
    errorCode: null,
  },

  // GETTERS
  getters: {
    [RECEIPTEXPORTS_GETTER](state) {
      return state.receiptExports
    },
    [ERROR_CODE_GETTER](state) {
      return state.errorCode
    },
  },

  // MUTATIONS
  mutations: {},

  // ACTIONS
  actions: {
    [GET_RECEIPTEXPORTS_ACTION]({ state }, val) {
      WarehousesService
        .getReceiptExports(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.receiptExports = res.data.content
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
