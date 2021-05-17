import ReportsService from '@/views/reports/reports-returned-goods/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import {
  // GETTERS
  REPORT_RETURNED_GOODS_GETTER,
  PRODUCT_LISTS_GETTER,
  PRODUCT_CAT_LISTS_GETTER,

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
    reportReturnedgoodsPagination: {},
    reportReturnedgoodsTotalInfo: {},
    productLists: [],
    productCatLists: [],
    productsPagination: {},
  },
  getters: {
    [REPORT_RETURNED_GOODS_GETTER](state) {
      return {
        reportReturnedgoodLists: state.reportReturnedgoodLists,
        reportReturnedgoodsPagination: state.reportReturnedgoodsPagination,
        reportReturnedgoodsTotalInfo: state.reportReturnedgoodsTotalInfo,
      }
    },
    [PRODUCT_LISTS_GETTER](state) {
      return {
        productLists: state.productLists,
        productsPagination: state.productsPagination,
      }
    },
    [PRODUCT_CAT_LISTS_GETTER](state) {
      return state.productCatLists
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
            state.reportReturnedgoodLists = res.data.response.content || []
            state.reportReturnedgoodsTotalInfo = res.data.info
            state.reportReturnedgoodsPagination = {
              totalPages: res.data.response.totalPages,
              totalElements: res.data.response.totalElements,
              pageable: res.data.response.pageable,
              numberOfElements: res.data.response.numberOfElements,
            }
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
            state.reportReturnedgoodLists = res.data.response.content || []
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
            state.productLists = res.data.content || []
            state.productsPagination = {
              totalPages: res.data.totalPages,
              totalElements: res.data.totalElements,
              numberOfElements: res.data.numberOfElements,
              pageable: res.data.pageable,
            }
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
            state.productCatLists = res.data || []
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
