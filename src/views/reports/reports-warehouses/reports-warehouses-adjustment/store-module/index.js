import toasts from '@/@core/utils/toasts/toasts'
import ReportService from '@/views/reports/reports-warehouses/reports-warehouses-adjustment/api-service/index'
import {
  // Getters
  REPORT_WAREHOUSES_ADJUSTMENTS_GETTER,

  // Actions
  GET_REPORT_WAREHOUSES_ADJUSTMENTS_ACTIONS,
} from './type'

export default {
  namespaced: true,
  state: {
    adjustmentLists: [],
    adjustmentPanigation: {},
    adjustmentInfo: {},
  },
  getters: {
    [REPORT_WAREHOUSES_ADJUSTMENTS_GETTER](state) {
      return {
        adjustmentLists: state.adjustmentLists,
        adjustmentPanigation: state.adjustmentPanigation,
        adjustmentInfo: state.adjustmentInfo,
      }
    },
  },
  mutations: {},
  actions: {
    [GET_REPORT_WAREHOUSES_ADJUSTMENTS_ACTIONS]({ state }, val) {
      ReportService
        .getReportsWarehousesAdjustment(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.adjustmentLists = res.data.response.content
            state.adjustmentPanigation = {
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
          toasts.error(error)
        })
    },
  },
}
