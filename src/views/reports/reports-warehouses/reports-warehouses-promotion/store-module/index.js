import toasts from '@/@core/utils/toasts/toasts'
import ReportService from '@/views/reports/reports-warehouses/reports-warehouses-promotion/api-service/index'
import {
  // Getters
  REPORT_WAREHOUSES_PROMOTIONS_GETTER,

  // Actions
  GET_REPORT_WAREHOUSES_PROMOTIONS_ACTIONS,
} from './type'

export default {
  namespaced: true,
  state: {
    promotionLists: [],
    promotionPagination: {},
    promotionInfo: {},
  },
  getters: {
    [REPORT_WAREHOUSES_PROMOTIONS_GETTER](state) {
      return {
        promotionLists: state.promotionLists,
        promotionPagination: state.promotionPagination,
        promotionInfo: state.promotionInfo,
      }
    },
  },
  mutations: {},
  actions: {
    [GET_REPORT_WAREHOUSES_PROMOTIONS_ACTIONS]({ state }, val) {
      ReportService
        .getReportsWarehousesPromotion(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.promotionLists = res.data.response.content || []
            state.promotionPagination = {
              totalPages: res.data.response.totalPages,
              totalElements: res.data.response.totalElements,
              pageable: res.data.response.pageable,
              numberOfElements: res.data.response.numberOfElements,
            } || {}
            console.log(state.promotionPagination)
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error)
        })
    },
  },
}
