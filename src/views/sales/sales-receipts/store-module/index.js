import SaleReceiptService from '@/views/sales/sales-receipts/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import {
  // GETTERS
  SALES_RECEIPTS_GETTER,
  SALES_RECEIPTS_DETAIL_GETTER,
  PRINT_SALES_RECEIPT_GETTER,
  // ACTIONS
  GET_SALES_RECEIPTS_DETAIL_ACTION,
  GET_SALES_RECEIPTS_ACTION,
  PRINT_SALES_RECEIPT_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    saleReceipts: {},
    saleReceiptsDetail: {},
    printSalesReceiptData: {},
  },

  getters: {
    [SALES_RECEIPTS_GETTER](state) {
      return state.saleReceipts
    },
    [SALES_RECEIPTS_DETAIL_GETTER](state) {
      return state.saleReceiptsDetail
    },
    [PRINT_SALES_RECEIPT_GETTER](state) {
      return state.printSalesReceiptData
    },
  },

  actions: {
    [GET_SALES_RECEIPTS_ACTION]({ state }, val) {
      SaleReceiptService
        .getSalesReceipts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.saleReceipts = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_SALES_RECEIPTS_DETAIL_ACTION]({ state }, val) {
      SaleReceiptService
        .getSalesReceiptsDetail(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.saleReceiptsDetail = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [PRINT_SALES_RECEIPT_ACTION]({ state }, val) {
      SaleReceiptService
        .printSalesReceipt(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printSalesReceiptData = res.data
            val.onSuccess()
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
