import WarehousesService from '@/views/warehouses/warehouses-output/api-service'
import FileSaver from 'file-saver'
import {
  // GETTERS
  GET_EXPORTS_GETTER,
  ERROR_CODE_GETTER,
  GET_EXPORT_BY_ID_GETTER,
  GET_PRODUCTS_OF_EXPORT_GETTER,
  // ACTIONS
  GET_EXPORTS_ACTION,
  PRINT_EXPORT_ACTION,
  GET_EXPORT_BY_ID_ACTION,
  GET_PRODUCTS_OF_EXPORT_ACTION,
} from './type'
import toasts from '../../../../@core/utils/toasts/toasts'

export default {
  namespaced: true,
  // STATE
  state: {
    receiptExports: [],
    printReceipt: [],
    errorCode: null,
    export: {},
    exportProducts: [],
  },

  // GETTERS
  getters: {
    [GET_EXPORTS_GETTER](state) {
      return state.receiptExports
    },
    [ERROR_CODE_GETTER](state) {
      return state.errorCode
    },
    [GET_EXPORT_BY_ID_GETTER](state) {
      return state.export
    },
    [GET_PRODUCTS_OF_EXPORT_GETTER](state) {
      return state.exportProducts
    },
  },

  // MUTATIONS
  mutations: {},

  // ACTIONS
  actions: {
    [GET_EXPORTS_ACTION]({ state }, val) {
      WarehousesService
        .getReceiptExports(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.receiptExports = res.data.response.content
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [PRINT_EXPORT_ACTION]({ }, val) {
      const fileName = `${val.transCode}.pdf`
      WarehousesService
        .printReceiptExports(val)
        .then(response => response.data)
        .then(res => {
          const blob = new Blob([res], { type: 'application/pdf' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_EXPORT_BY_ID_ACTION]({ state }, val) {
      WarehousesService
        .getExportById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.export = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCTS_OF_EXPORT_ACTION]({ state }, val) {
      WarehousesService
        .getProductsOfExport(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.exportProducts = res.data.response
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
