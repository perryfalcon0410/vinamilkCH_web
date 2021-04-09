import WarehousesService from '@/views/warehouses/warehouses-output/api-service'
// import FileSaver from 'file-saver'
import {
  // GETTERS
  RECEIPTEXPORTS_GETTER,
  ERROR_CODE_GETTER,
  // ACTIONS
  GET_RECEIPTEXPORTS_ACTION,
  PRINT_RECEIPTEXPORT_ACTION,
} from './type'
import toasts from '../../../../@core/utils/toasts/toasts'

export default {
  namespaced: true,
  // STATE
  state: {
    receiptExports: [],
    printReceipt: [],
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
            // Temp
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          // Temp
          toasts.error(error.message)
        })
    },
    [PRINT_RECEIPTEXPORT_ACTION]({ state }, val) {
      console.log(state)
      const fileName = `${val.transCode}${val.shopId}.pdf`
      console.log(fileName)
      WarehousesService
        .printReceiptExports(val)
        .then(response => {
          console.log(response)
          return response.data
        })
        .then(res => {
          console.log(res)

          if (res.success) {
            // console.log(res.data)
            // response.data is a blob type
            // FileSaver.saveAs(res.data, fileName)
            // state.receiptExports = res.data.content
            // console.log(state.receiptexports)
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
