import ReceiptImportService from '@/views/warehouses/warehouses-input/api-service/index'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  RECEIPTS_GETTER,
  // ACTIONS
  GET_RECEIPTS_ACTION,
  EXPORT_RECEIPTS_ACTION,
} from './type'

export default {
  namespaced: true,

  // START - STATE
  state: {
    receipts: [],
  },

  // START - GETTERS
  getters: {
    [RECEIPTS_GETTER](state) {
      return state.receipts
    },
  },

  // START - MUTATIONS
  mutations: {},

  // START - ACTIONS
  actions: {
    // START - GET RECEIPTS
    [GET_RECEIPTS_ACTION]({ state }, val) {
      ReceiptImportService
        .getReceiptImport(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.receipts = res.data.content
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - GET RECEIPTS

    // START - EXPORT RECEIPTS
    [EXPORT_RECEIPTS_ACTION]({}, val) {
      ReceiptImportService
        .exportReceiptImport(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - EXPORT RECEIPTS
  },

}
