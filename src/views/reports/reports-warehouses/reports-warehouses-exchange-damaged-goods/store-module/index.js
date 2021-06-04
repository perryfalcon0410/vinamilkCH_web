import reportExchangeDamagedGoodsService from '@/views/reports/reports-warehouses/reports-warehouses-exchange-damaged-goods/api-service'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import {
  // GETTERS
  REPORT_EXCHANGE_DAMAGED_GOODS_GETTER,
  REPORT_EXCHANGE_DAMAGED_GOODS_INFO_GETTER,
  REPORT_EXCHANGE_DAMAGED_GOODS_PAGINATION_GETTER,
  REASON_EXCHANGE_DAMAGED_GOODS_GETTER,
  PRODUCT_LIST_GETTER,
  PRODUCT_LIST_PAGINATION_GETTER,
  PRODUCT_CAT_LIST_GETTER,
  // ACTIONS
  GET_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_REASON_EXCHANGE_DAMAGED_GOODS_ACTION,
  EXPORT_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_PRODUCT_LIST_ACTION,
  GET_PRODUCT_CAT_LIST_ACTION,
} from './type'

export default {
  namespaced: true,

  // START - STATE
  state: {
    reportExchangeDamagedGoods: [],
    reportExchangeDamagedGoodsInfo: {},
    reportExchangeDamagedGoodsPagination: {},
    reportReasonExchangeDamagedGoods: [],
    productList: [],
    productListPagination: {},
    productCatList: [],
  },

  // START - GETTERS
  getters: {
    [REPORT_EXCHANGE_DAMAGED_GOODS_GETTER](state) {
      return state.reportExchangeDamagedGoods
    },
    [REPORT_EXCHANGE_DAMAGED_GOODS_INFO_GETTER](state) {
      return state.reportExchangeDamagedGoodsInfo
    },
    [REPORT_EXCHANGE_DAMAGED_GOODS_PAGINATION_GETTER](state) {
      return state.reportExchangeDamagedGoodsPagination
    },
    [REASON_EXCHANGE_DAMAGED_GOODS_GETTER](state) {
      return state.reportReasonExchangeDamagedGoods
    },
    [PRODUCT_LIST_GETTER](state) {
      return state.productList
    },
    [PRODUCT_LIST_PAGINATION_GETTER](state) {
      return state.productListPagination
    },
    [PRODUCT_CAT_LIST_GETTER](state) {
      return state.productCatList
    },
  },

  // START - MUTATIONS
  mutations: {},

  // START - ACTIONS
  actions: {
    [GET_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION]({ state }, val) {
      reportExchangeDamagedGoodsService
        .getReportExchangeDamagedGoodList(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportExchangeDamagedGoods = res.data.response.content
            state.reportExchangeDamagedGoodsInfo = res.data.info
            state.reportExchangeDamagedGoodsPagination = res.data.response
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_REASON_EXCHANGE_DAMAGED_GOODS_ACTION]({ state }, val) {
      reportExchangeDamagedGoodsService
        .getReasonExchange(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportReasonExchangeDamagedGoods = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION]({ }, val) {
      reportExchangeDamagedGoodsService
        .exportReportExchangeDamagedGoods(val)
        .then(response => response.data)
        .then(res => {
          const fileName = `DB_BC_doi_hang_hong_Filled_${moment().format('YYYYMMDD')}_${moment().format('hhmmss')}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCT_LIST_ACTION]({ state }, val) {
      reportExchangeDamagedGoodsService
        .getProductLists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productList = res.data.content
            state.productListPagination = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCT_CAT_LIST_ACTION]({ state }, val) {
      reportExchangeDamagedGoodsService
        .getProductCatlists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productCatList = res.data
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
