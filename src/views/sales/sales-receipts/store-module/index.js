import SaleReceiptService from '@/views/sales/sales-receipts/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import {
  SALES_RECEIPTS_GETTER,
  GET_SALES_RECEIPTS_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    saleReceipt: [],
  },

  getters: {
    [SALES_RECEIPTS_GETTER](state) {
      return state.saleReceipt
    },
  },
  mutations: {},
  actions: {
    [GET_SALES_RECEIPTS_ACTION]({ state }) {
      SaleReceiptService
        .getSalesReceipts()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.saleReceipt = res.data.content
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
