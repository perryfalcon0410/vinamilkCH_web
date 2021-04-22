import SaleReceiptService from '@/views/sales/sales-receipts/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import {
  SALES_RECEIPTS_GETTER,
  SALES_RECEIPTS_DETAIL_GETTER,
<<<<<<< HEAD
  SALES_RECEIPTS_DISCOUNT_GETTER,
  SALES_RECEIPTS_PROMOTION_GETTER,
  SALES_RECEIPTS_DETAIL_INFOS_GETTER,
  SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER,
<<<<<<< HEAD
  GET_SALES_RECEIPTS_ACTION,
  GET_SALES_RECEIPT_DETAIL_ACTION,
=======
  SALES_RECEIPTS_DETAIL_TOTAL_GETTER,
  SALES_RECEIPTS_DISCOUNT_GETTER,
  SALES_RECEIPTS_PROMOTION_GETTER,
  SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER,
  GET_SALES_RECEIPTS_ACTION,
  GET_SALES_RECEIPTS_DETAIL_ACTION,
>>>>>>> b99cf2a (- Update code complete task 281)
=======
  GET_SALES_RECEIPT_ACTION,
  GET_SALES_RECEIPT_DETAIL_ACTION,
>>>>>>> 5b840e4 (+ change currency format)
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
    saleReceiptsInfos: {},
  },

  getters: {
    [SALES_RECEIPTS_GETTER](state) {
      return state.saleReceipt
    },
    [SALES_RECEIPTS_DETAIL_GETTER](state) {
      return state.saleReceiptDetail
    },
    [SALES_RECEIPTS_DETAIL_TOTAL_GETTER](state) {
      return state.saleReceiptDiscount
    },
    [SALES_RECEIPTS_DISCOUNT_GETTER](state) {
      return state.saleReceiptPromotion
    },
    [SALES_RECEIPTS_PROMOTION_GETTER](state) {
      return state.saleReceiptInfos
    },
    [SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER](state) {
      return state.saleReceiptsDetailTotal
    },
  },
  mutations: {},
  actions: {
    [GET_SALES_RECEIPT_ACTION]({ state }) {
      SaleReceiptService
        .getSalesReceipts()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            // console.log(res)
            state.saleReceipt = res.data.response.content
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_SALES_RECEIPT_DETAIL_ACTION]({ state }, val) {
      SaleReceiptService
        .getSaleOrderDetail(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.saleReceiptsDetail = res.data.orderDetail.response
            state.saleReceiptsDetailTotal = res.data.orderDetail.info
            state.saleReceiptsDiscount = res.data.discount
            state.saleReceiptsPromotion = res.data.promotion
            state.saleReceiptsInfos = res.data.infos
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
