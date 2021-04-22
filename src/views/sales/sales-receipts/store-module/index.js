import SaleReceiptService from '@/views/sales/sales-receipts/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import {
  SALES_RECEIPTS_GETTER,
  SALES_RECEIPT_DETAIL_GETTER,
  SALES_RECEIPT_DISCOUNT_GETTER,
  SALES_RECEIPT_PROMOTION_GETTER,
  SALES_RECEIPT_DETAIL_INFOS_GETTER,
  GET_SALES_RECEIPTS_ACTION,
  GET_SALES_RECEIPT_DETAIL_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    saleReceipt: [],
    saleReceiptDetail: [],
    saleReceiptDiscount: [],
    saleReceiptPromotion: [],
    saleReceiptInfos: [],
  },

  getters: {
    [SALES_RECEIPTS_GETTER](state) {
      return state.saleReceipt
    },
    [SALES_RECEIPT_DETAIL_GETTER](state) {
      return state.saleReceiptDetail
    },
    [SALES_RECEIPT_DISCOUNT_GETTER](state) {
      return state.saleReceiptDiscount
    },
    [SALES_RECEIPT_PROMOTION_GETTER](state) {
      return state.saleReceiptPromotion
    },
    [SALES_RECEIPT_DETAIL_INFOS_GETTER](state) {
      return state.saleReceiptInfos
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
            state.saleReceiptDetail = res.data.orderDetail
            state.saleReceiptDiscount = res.data.discount
            state.saleReceiptPromotion = res.data.promotion
            state.saleReceiptInfos = res.data.infos
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
