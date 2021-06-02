import DifferencePriceServices from '@/views/reports/reports-warehouses/report-warehouses-price-difference/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'

import {
  // GETTERS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER,
  PRODUCT_LISTS_GETTER,
  PRODUCT_CAT_LISTS_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
  GET_PRODUCT_LISTS_ACTION,
  GET_PRODUCT_CAT_LISTS_ACTION,
  EXPORT_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
} from './type'

export default {
  namespaced: true,

  state: {
    differencePrices: {},
    productData: {},
    productCatData: [],
  },

  getters: {
    [GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER](state) {
      return state.differencePrices
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

    [GET_PRODUCT_LISTS_ACTION]({ state }, val) {
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

    [GET_PRODUCT_CAT_LISTS_ACTION]({ state }, val) {
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
