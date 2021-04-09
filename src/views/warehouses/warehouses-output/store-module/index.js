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
      console.log(state)
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
      console.log(state)
      WarehousesService
        .getReceiptExports(val)
        .then(response => response.data)
        .then(res => {
          // console.log(res)

          if (res.success) {
            state.receiptExports = res.data.content
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
