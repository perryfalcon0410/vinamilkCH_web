import ReportsService from '@/views/reports/reports-returned-goods/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import {
  // GETTERS
  REPORT_RETURNED_GOODS_GETTER,
  REPORT_RETURNED_GOODS_PAGINATION_GETTER,
  REPORT_RETURNED_GOODS_TOTAL_INFO_GETTER,

  // ACTIONS
  GET_REPORT_RETURNED_GOODS_ACTION,
  EXPORT_REPORT_RETURNED_GOODS_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    reportReturnedgoodLists: [],
    reportReturnedgoodPagination: {},
    reportReturnedgoodTotalInfo: {},
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
          toasts.error(error.massage)
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
          toasts.error(error.massage)
        })
    },
  },
}
