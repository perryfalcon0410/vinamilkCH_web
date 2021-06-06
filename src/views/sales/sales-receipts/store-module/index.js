import SaleReceiptService from '@/views/sales/sales-receipts/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import {
  // GETTERS
  SALES_RECEIPTS_GETTER,
  SALES_RECEIPTS_DETAIL_GETTER,
  SALES_RECEIPTS_DETAIL_TOTAL_GETTER,
  SALES_RECEIPTS_DISCOUNT_GETTER,
  SALES_RECEIPTS_PROMOTION_GETTER,
  SALES_RECEIPT_DETAIL_INFOS_GETTER,
  SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER,
  SALES_RECEIPTS_PAGINATION_GETTER,
  PRINT_SALES_RECEIPT_GETTER,
  // ACTIONS
  GET_SALES_RECEIPTS_DETAIL_ACTION,
  GET_SALES_RECEIPTS_ACTION,
  PRINT_SALES_RECEIPT_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    saleReceipts: [],
    saleReceiptsTotal: [],
    saleReceiptsDetail: [],
    saleReceiptsDetailTotal: [],
    saleReceiptsDiscount: [],
    saleReceiptsPromotion: [],
    saleReceiptInfos: {},
    saleReceiptsPagnigation: {},
    printSalesReceiptData: {},
  },

  getters: {
    [SALES_RECEIPTS_GETTER](state) {
      return state.saleReceipts
    },
    [SALES_RECEIPTS_DETAIL_GETTER](state) {
      return state.saleReceiptsDetail
    },
    [SALES_RECEIPTS_DETAIL_TOTAL_GETTER](state) {
      return state.saleReceiptsTotal
    },
    [SALES_RECEIPTS_DISCOUNT_GETTER](state) {
      return state.saleReceiptsDiscount
    },
    [SALES_RECEIPTS_PROMOTION_GETTER](state) {
      return state.saleReceiptsPromotion
    },
    [SALES_RECEIPT_DETAIL_INFOS_GETTER](state) {
      return state.saleReceiptInfos
    },
    [SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER](state) {
      return state.saleReceiptsDetailTotal
    },
    [SALES_RECEIPTS_PAGINATION_GETTER](state) {
      return state.saleReceiptsPagnigation
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
            state.saleReceipts = res.data.response.content
            state.saleReceiptsTotal = res.data.info
            state.saleReceiptsPagnigation = res.data.response
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
            state.saleReceiptsDetail = res.data.orderDetail.response
            state.saleReceiptsDetailTotal = res.data.orderDetail.info
            state.saleReceiptsDiscount = res.data.discount
            state.saleReceiptsPromotion = res.data.promotion
            state.saleReceiptInfos = res.data.infos
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
