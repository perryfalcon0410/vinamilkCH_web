import ReportsSalesServices from '@/views/reports/reports-sales/reports-sales/api-service/index'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  REPORT_SALES_GETTER,
  PRODUCTS_GETTER,
  PRODUCT_CATS_GETTER,
  // MUTATIONS
  CLEAR_ALL_PRODUCTS_CHECKED_MUTATION,
  // ACTIONS
  GET_REPORT_SALES_ACTION,
  EXPORT_REPORT_SALES_ACTION,
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_CATS_ACTION,
} from './type'

export default {
  namespaced: true,

  state: {
    reportSales: [],
    productData: {},
    productCatData: [],
    selectedProductRow: [],
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
            state.Sales = res.data.response
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
        .then(res => {
          if (res.status === 200 && res.data != null) {
            const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' })
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, 'Bán hàng_Filled')
            } else {
              const elem = window.document.createElement('a')
              elem.href = window.URL.createObjectURL(blob)
              elem.download = 'Bán hàng_Filled'
              document.body.appendChild(elem)
              elem.click()
              document.body.removeChild(elem)
            }
          }
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
  },
}
