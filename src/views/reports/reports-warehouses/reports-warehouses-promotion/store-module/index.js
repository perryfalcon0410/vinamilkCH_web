import toasts from '@/@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import ReportService from '@/views/reports/reports-warehouses/reports-warehouses-promotion/api-service/index'
import {
  // Getters
  REPORT_WAREHOUSES_PROMOTIONS_GETTER,
  PRODUCT_LISTS_GETTER,
  PRODUCT_CAT_LISTS_GETTER,

  // Actions
  GET_REPORT_WAREHOUSES_PROMOTIONS_ACTIONS,
  GET_PRODUCT_LISTS_ACTIONS,
  GET_PRODUCT_CAT_LISTS_ACTIONS,
  EXPORT_REPORT_WAREHOUSES_PROMOTIONS_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    promotionData: [],
    productData: [],
    productCatData: [],
  },
  getters: {
    [REPORT_WAREHOUSES_PROMOTIONS_GETTER](state) {
      return state.promotionData
    },
    [PRODUCT_LISTS_GETTER](state) {
      return state.productData
    },
    [PRODUCT_CAT_LISTS_GETTER](state) {
      return state.productCatData
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
            state.promotionData = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error)
        })
    },

    [GET_PRODUCT_LISTS_ACTIONS]({ state }, val) {
      ReportService
        .getProductLists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productData = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [GET_PRODUCT_CAT_LISTS_ACTIONS]({ state }, val) {
      ReportService
        .getProductCatlists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productCatData = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_WAREHOUSES_PROMOTIONS_ACTION]({ }, val) {
      ReportService
        .exportsWarehousesPromotion(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            const fileName = `Bao_cao_hang_khuyen_mai_${moment().format('DDMMYYYY')}_${moment().format('hhmm')}.xlsx`
            const blob = new Blob([res], { type: 'data:application/xlsx' })
            FileSaver.saveAs(blob, fileName)
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
