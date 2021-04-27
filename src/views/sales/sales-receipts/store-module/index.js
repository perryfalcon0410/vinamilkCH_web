import SaleReceiptService from '@/views/sales/sales-receipts/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import {
  // GETTERS
  SALES_RECEIPTS_GETTER,
  SALES_RECEIPTS_DETAIL_GETTER,
  SALES_RECEIPTS_DETAIL_TOTAL_GETTER,
  SALES_RECEIPTS_DISCOUNT_GETTER,
  SALES_RECEIPTS_PROMOTION_GETTER,
  SALES_RECEIPTS_DETAIL_INFOS_GETTER,
  SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER,
  // ACTIONS
  GET_SALES_RECEIPTS_DETAIL_ACTION,
  GET_SALES_RECEIPTS_ACTION,
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
    [SALES_RECEIPTS_DETAIL_INFOS_GETTER](state) {
      return state.saleReceiptsInfos
    },
    [SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER](state) {
      return state.saleReceiptsDetailTotal
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
            state.saleReceipts = res.data.response.content
            state.saleReceiptsTotal = res.data.info
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
