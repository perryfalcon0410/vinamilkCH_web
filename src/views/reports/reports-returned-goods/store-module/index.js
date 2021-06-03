import ReportsService from '@/views/reports/reports-returned-goods/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import {
  // GETTERS
  REPORT_RETURNED_GOODS_GETTER,
  PRODUCT_LISTS_GETTER,
  PRODUCT_CAT_LISTS_GETTER,
  PRINT_INPUT_ORDER_DETIAL_GETTER, // temp
  PRINT_SELLS_GETTER, // temp
  PRINT_RETURN_GOODS_GETTER,
  // MUTATIONS
  CLEAR_ALL_PRODUCT_LISTS_CHECKED,
  // ACTIONS
  GET_REPORT_RETURNED_GOODS_ACTION,
  EXPORT_REPORT_RETURNED_GOODS_ACTION,
  GET_PRODUCT_LISTS_ACTIONS,
  GET_PRODUCT_CAT_LISTS_ACTIONS,
  PRINT_INPUT_ORDER_DETIAL_ACTION, // temp
  PRINT_SELLS_ACTION, // temp
  PRINT_RETURN_GOODS_ACTION,
} from './type'

export default {
  namespaced: true,
  // State
  state: {
    reportReturnedgoodData: {},
    productData: {},
    productCatData: [],
    selectedProductRow: [],
    printInputOrderDetailData: [], // temp
    printSellsData: [], // temp
    printReturnGoodsData: [], // temp
  },
  // Getters
  getters: {
    [REPORT_RETURNED_GOODS_GETTER](state) {
      return state.reportReturnedgoodData
    },
    [PRODUCT_LISTS_GETTER](state) {
      return state.productData
    },
    [PRODUCT_CAT_LISTS_GETTER](state) {
      return state.productCatData
    },
    [PRINT_INPUT_ORDER_DETIAL_GETTER](state) { // temp
      return state.printInputOrderDetailData
    },
    [PRINT_SELLS_GETTER](state) { // temp
      return state.printSellsData
    },
    [PRINT_RETURN_GOODS_GETTER](state) { // temp
      return state.printReturnGoodsData
    },

  },
  // Mutations
  mutations: {
    [CLEAR_ALL_PRODUCT_LISTS_CHECKED](state) {
      state.selectedProductRow = []
    },
  },
  // Actions
  actions: {
    [GET_REPORT_RETURNED_GOODS_ACTION]({ state }, val) {
      ReportsService
        .getReportsReturnedGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportReturnedgoodData = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_RETURNED_GOODS_ACTION]({ }, val) {
      ReportsService
        .exportReportsReturnedGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            const fileName = `Bao_cao_hang_tra_lai_${moment().format('DDMMYYYY')}_${moment().format('hhmm')}.xlsx`
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

    [GET_PRODUCT_LISTS_ACTIONS]({ state }, val) {
      ReportsService
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
      ReportsService
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
    [PRINT_INPUT_ORDER_DETIAL_ACTION]({ state }, val) { // temp
      ReportsService
        .printInputOrderDetail(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printInputOrderDetailData = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [PRINT_SELLS_ACTION]({ state }, val) { // temp
      ReportsService
        .printSells(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printSellsData = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [PRINT_RETURN_GOODS_ACTION]({ state }, val) {
      ReportsService
        .printReturnGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printReturnGoodsData = res.data || {}
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
