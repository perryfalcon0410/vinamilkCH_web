import ReportsService from '@/views/reports/reports-returned-goods/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import {
  // GETTERS
  REPORT_RETURNED_GOODS_GETTER,
  PRODUCT_GETTER,
  PRODUCT_CAT_GETTER,
  PRINT_INPUT_ORDER_DETIAL_GETTER, // temp
  PRINT_SELLS_GETTER, // temp
  PRINT_RETURN_GOODS_GETTER,
  REASON_RETURN_GOODS_GETTER,
  // MUTATIONS
  CLEAR_ALL_PRODUCT_LISTS_CHECKED,
  // ACTIONS
  GET_REPORT_RETURNED_GOODS_ACTION,
  EXPORT_REPORT_RETURNED_GOODS_ACTION,
  GET_PRODUCT_ACTION,
  GET_PRODUCT_CAT_ACTION,
  PRINT_INPUT_ORDER_DETIAL_ACTION, // temp
  PRINT_SELLS_ACTION, // temp
  PRINT_RETURN_GOODS_ACTION,
  GET_REASON_RETURN_GOODS_ACTION,
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
    printReturnGoodsData: [],
    reasonType: [],
  },
  // Getters
  getters: {
    [REPORT_RETURNED_GOODS_GETTER](state) {
      return state.reportReturnedgoodData
    },
    [PRODUCT_GETTER](state) {
      return state.productData
    },
    [PRODUCT_CAT_GETTER](state) {
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
    [REASON_RETURN_GOODS_GETTER](state) {
      return state.reasonType
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
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Bao_cao_hang_tra_lai_${moment().format('DDMMYYYY')}_${moment().format('hhmmss')}_${Math.floor(Math.random() * 900 + 100)}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [GET_REASON_RETURN_GOODS_ACTION]({ state }, val) {
      ReportsService
        .getReasonReturnGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reasonType = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [GET_PRODUCT_ACTION]({ state }, val) {
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

    [GET_PRODUCT_CAT_ACTION]({ state }, val) {
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
