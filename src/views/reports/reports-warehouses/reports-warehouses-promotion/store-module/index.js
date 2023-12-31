import toasts from '@/@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import ReportService from '@/views/reports/reports-warehouses/reports-warehouses-promotion/api-service/index'
import { notificationResponseMessage } from '@core/utils/utils'

import {
  // Getters
  REPORT_WAREHOUSES_PROMOTIONS_GETTER,
  PRODUCT_GETTER,
  PRODUCT_CAT_GETTER,
  PRINT_REPORT_PROMOTION_GETTER,

  // Actions
  GET_REPORT_WAREHOUSES_PROMOTIONS_ACTIONS,
  GET_PRODUCT_ACTION,
  GET_PRODUCT_CAT_ACTION,
  EXPORT_REPORT_WAREHOUSES_PROMOTIONS_ACTION,
  PRINT_REPORT_PROMOTION_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    promotionData: [],
    productData: [],
    productCatData: [],
    printData: {},
  },
  getters: {
    [REPORT_WAREHOUSES_PROMOTIONS_GETTER](state) {
      return state.promotionData
    },
    [PRODUCT_GETTER](state) {
      return state.productData
    },
    [PRODUCT_CAT_GETTER](state) {
      return state.productCatData
    },
    [PRINT_REPORT_PROMOTION_GETTER](state) {
      return state.printData
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
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },

    [GET_PRODUCT_ACTION]({ state }, val) {
      ReportService
        .getProductLists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productData = res.data || {}
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },

    [GET_PRODUCT_CAT_ACTION]({ state }, val) {
      ReportService
        .getProductCatlists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productCatData = res.data || {}
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [EXPORT_REPORT_WAREHOUSES_PROMOTIONS_ACTION]({ }, val) {
      ReportService
        .exportsWarehousesPromotion(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Bao_cao_hang_khuyen_mai_${moment().format('DDMMYYYY')}_${moment().locale('vi').format('HHmmss')}_${Math.floor(Math.random() * 900 + 100)}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [PRINT_REPORT_PROMOTION_ACTION]({ state }, val) {
      ReportService
        .printReportPromotion(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printData = res.data || {}
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
  },
}
