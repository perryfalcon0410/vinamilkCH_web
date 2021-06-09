import ReportsSalesServices from '@/views/reports/reports-sales/reports-sales/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'

import {
  // GETTERS
  REPORT_SALES_GETTER,
  PRODUCTS_GETTER,
  PRODUCT_CATS_GETTER,
  BILL_COLLECTORS_GETTER,
  PRINT_REPORT_SALES_GETTER,
  // MUTATIONS
  CLEAR_ALL_PRODUCTS_CHECKED_MUTATION,
  // ACTIONS
  GET_REPORT_SALES_ACTION,
  EXPORT_REPORT_SALES_ACTION,
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_CATS_ACTION,
  GET_BILL_COLLECTORS_ACTION,
  PRINT_REPORT_SALES_ACTION,
} from './type'

export default {
  namespaced: true,

  state: {
    reportSales: [],
    productData: {},
    productCatData: [],
    selectedProductRow: [],
    billCollectors: [],
    printReportSalesData: {},
  },

  getters: {
    [REPORT_SALES_GETTER](state) {
      return state.reportSales
    },
    [PRODUCTS_GETTER](state) {
      return state.productData
    },
    [PRODUCT_CATS_GETTER](state) {
      return state.productCatData
    },
    [BILL_COLLECTORS_GETTER](state) {
      return state.billCollectors
    },
    [PRINT_REPORT_SALES_GETTER](state) {
      return state.printReportSalesData
    },
  },

  mutations: {
    [CLEAR_ALL_PRODUCTS_CHECKED_MUTATION](state) {
      state.selectedProductRow = []
    },
  },

  actions: {
    [GET_REPORT_SALES_ACTION]({ state }, val) {
      ReportsSalesServices
        .getReportSales(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportSales = res.data.response
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_SALES_ACTION]({}, val) {
      ReportsSalesServices
        .exportReportSales(val)
        .then(response => response.data)
        .then(res => {
          const fileName = `Báo cáo bán hàng_Filled_${moment().format('DDMMYYYY')}_${moment().format('hhmm')}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCTS_ACTION]({ state }, val) {
      ReportsSalesServices
        .getProducts(val)
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

    [GET_PRODUCT_CATS_ACTION]({ state }, val) {
      ReportsSalesServices
        .getProductCats(val)
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

    [GET_BILL_COLLECTORS_ACTION]({ state }, val) {
      ReportsSalesServices
        .getBillCollectors(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.billCollectors = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [PRINT_REPORT_SALES_ACTION]({ state }, val) {
      ReportsSalesServices
        .printReportSales(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printReportSalesData = res.data
            val.onSuccess()
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
