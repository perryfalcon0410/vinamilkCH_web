import DifferencePriceServices from '@/views/reports/reports-warehouses/report-warehouses-price-difference/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'

import {
  // GETTERS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER,
  PRODUCT_GETTER,
  PRODUCT_CAT_GETTER,
  PRINT_REPORT_DIFFERENCE_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
  GET_PRODUCT_ACTION,
  GET_PRODUCT_CAT_ACTION,
  EXPORT_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
  PRINT_REPORT_DIFFERENCE_ACTION,
} from './type'

export default {
  namespaced: true,

  state: {
    differencePrices: {},
    productData: {},
    productCatData: [],
    printData: {},
  },

  getters: {
    [GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER](state) {
      return state.differencePrices
    },
    [PRODUCT_GETTER](state) {
      return state.productData
    },
    [PRODUCT_CAT_GETTER](state) {
      return state.productCatData
    },
    [PRINT_REPORT_DIFFERENCE_GETTER](state) {
      return state.printData
    },
  },

  mutations: {},

  actions: {
    [GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION]({ state }, val) {
      DifferencePriceServices
        .getDifferencePrice(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.differencePrices = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [GET_PRODUCT_ACTION]({ state }, val) {
      DifferencePriceServices
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

    [GET_PRODUCT_CAT_ACTION]({ state }, val) {
      DifferencePriceServices
        .getProductCatlists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productCatData = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION]({ }, val) {
      DifferencePriceServices
        .exportDifferencePrice(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Chênh lệch giá Filled_${moment().format('DDMMYYYY')}_${moment().format('hhmmss')}_${Math.floor(Math.random() * 900 + 100)}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [PRINT_REPORT_DIFFERENCE_ACTION]({ state }, val) {
      DifferencePriceServices
        .printReportDifferencePrice(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printData = res.data || {}
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
