import ReportsService from '@/views/reports/reports-returned-goods/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import {
  // GETTERS
  REPORT_RETURNED_GOODS_GETTER,
  REPORT_RETURNED_GOODS_PAGINATION_GETTER,
  REPORT_RETURNED_GOODS_TOTAL_INFO_GETTER,
  PRODUCT_LISTS_GETTER,
  PRODUCT_CAT_LISTS_GETTER,
  PRODUCTS_PAGINATION_GETTER,

  // ACTIONS
  GET_REPORT_RETURNED_GOODS_ACTION,
  EXPORT_REPORT_RETURNED_GOODS_ACTION,
  GET_PRODUCT_LISTS_ACTIONS,
  GET_PRODUCT_CAT_LISTS_ACTIONS,
} from './type'

export default {
  namespaced: true,
  state: {
    reportReturnedgoodLists: [],
    reportReturnedgoodPagination: {},
    reportReturnedgoodTotalInfo: {},
    productLists: [],
    productCatLists: [],
    productsPagination: {},
  },
  getters: {
    [REPORT_RETURNED_GOODS_GETTER](state) {
      return state.reportReturnedgoodLists
    },
    [REPORT_RETURNED_GOODS_PAGINATION_GETTER](state) {
      return state.reportReturnedgoodPagination
    },
    [REPORT_RETURNED_GOODS_TOTAL_INFO_GETTER](state) {
      return state.reportReturnedgoodTotalInfo
    },
    [PRODUCT_LISTS_GETTER](state) {
      return state.productLists
    },
    [PRODUCT_CAT_LISTS_GETTER](state) {
      return state.productCatLists
    },
    [PRODUCTS_PAGINATION_GETTER](state) {
      return state.productsPagination
    },

  },
  mutations: {},
  actions: {
    [GET_REPORT_RETURNED_GOODS_ACTION]({ state }, val) {
      ReportsService
        .getReportsReturnedGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportReturnedgoodLists = res.data.response.content
            state.reportReturnedgoodPagination = res.data.response
            state.reportReturnedgoodTotalInfo = res.data.info
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_RETURNED_GOODS_ACTION]({ state }, val) {
      ReportsService
        .exportReportsReturnedGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportReturnedgoodLists = res.data.response.content
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [GET_PRODUCT_LISTS_ACTIONS]({ state }, val) {
      ReportsService
        .getProductLists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productLists = res.data.content
            state.productsPagination = res.data
            console.log(state.productsPagination)
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [GET_PRODUCT_CAT_LISTS_ACTIONS]({ state }, val) {
      ReportsService
        .getProductCatlists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productCatLists = res.data
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
