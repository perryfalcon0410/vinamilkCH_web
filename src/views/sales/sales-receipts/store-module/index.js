import SaleReceiptService from '@/views/sales/sales-receipts/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import {
  SALES_RECEIPTS_GETTER,
  SALES_RECEIPTS_INFO_GETTER,
  GET_SALES_RECEIPTS_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    saleReceipt: [],
    saleReceiptInfo: [],
  },

  getters: {
    [SALES_RECEIPTS_GETTER](state) {
      return state.saleReceipt
    },
    [SALES_RECEIPTS_INFO_GETTER](state) {
      return state.saleReceiptInfo
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
            console.log(res)
            state.saleReceipt = res.data.response.content
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
