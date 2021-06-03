import toasts from '@/@core/utils/toasts/toasts'
import ReportService from '@/views/reports/reports-warehouses/reports-warehouses-adjustment/api-service/index'

import FileSaver from 'file-saver'
import moment from 'moment'
import {
  // Getters
  REPORT_WAREHOUSES_ADJUSTMENTS_GETTER,
  PRODUCT_LISTS_GETTER,
  PRODUCT_CAT_LISTS_GETTER,

  // Actions
  GET_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION,
  GET_PRODUCT_LISTS_ACTION,
  GET_PRODUCT_CAT_LISTS_ACTION,
  EXPORT_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    adjustmentData: [],
    productData: [],
    productCatData: [],
  },
  getters: {
    [REPORT_WAREHOUSES_ADJUSTMENTS_GETTER](state) {
      return state.adjustmentData
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
    [GET_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION]({ state }, val) {
      ReportService
        .getReportsWarehousesAdjustment(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.adjustmentData = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error)
        })
    },

    [GET_PRODUCT_LISTS_ACTION]({ state }, val) {
      ReportService
        .getProductLists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productData = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [GET_PRODUCT_CAT_LISTS_ACTION]({ state }, val) {
      ReportService
        .getProductCatlists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productCatData = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION]({ }, val) {
      ReportService
        .exportsWarehousesAdjustment(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            const fileName = `Bao_cao_nhap_xuat_dieu_chinh_${moment().format('DDMMYYYY')}_${moment().format('hhmm')}.xlsx`
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
