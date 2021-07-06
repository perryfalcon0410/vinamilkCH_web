import toasts from '@/@core/utils/toasts/toasts'
import ReportService from '@/views/reports/reports-warehouses/reports-warehouses-adjustment/api-service/index'

import FileSaver from 'file-saver'
import moment from 'moment'
import {
  // Getters
  REPORT_WAREHOUSES_ADJUSTMENTS_GETTER,
  PRODUCT_GETTER,
  PRODUCT_CAT_GETTER,
  PRINT_REPORT_WAREHOUSES_ADJUSTMENTS_GETTER,

  // Actions
  GET_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION,
  GET_PRODUCT_ACTION,
  GET_PRODUCT_CAT_ACTION,
  EXPORT_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION,
  PRINT_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    adjustmentData: [],
    productData: [],
    productCatData: [],
    printData: {},
  },
  getters: {
    [REPORT_WAREHOUSES_ADJUSTMENTS_GETTER](state) {
      return state.adjustmentData
    },
    [PRODUCT_GETTER](state) {
      return state.productData
    },
    [PRODUCT_CAT_GETTER](state) {
      return state.productCatData
    },
    [PRINT_REPORT_WAREHOUSES_ADJUSTMENTS_GETTER](state) {
      return state.printData
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

    [GET_PRODUCT_ACTION]({ state }, val) {
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

    [GET_PRODUCT_CAT_ACTION]({ state }, val) {
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
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Bao_cao_nhap_xuat_dieu_chinh_${moment().format('DDMMYYYY')}_${moment().format('hhmm')}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [PRINT_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION]({ state }, val) {
      ReportService
        .printWarehousesAdjustment(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printData = res.data
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
