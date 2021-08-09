import ReportsWarehousesInputServices from '@/views/reports/reports-warehouses/reports-warehouses-input/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import commonData from '@/@db/common'
import {
  // GETTERS
  REPORT_WAREHOUSES_INPUT_GETTER,
  PRODUCT_LISTS_GETTER,
  PRODUCT_CAT_LISTS_GETTER,
  PRINT_SHOP_IMPORT_REPORT_GETTER,
  // MUTATIONS
  CLEAR_ALL_PRODUCT_LISTS_CHECKED,
  // ACTIONS
  GET_REPORT_WAREHOUSES_INPUT_ACTION,
  EXPORT_REPORT_WAREHOUSES_INPUT_ACTION,
  GET_PRODUCT_LISTS_ACTIONS,
  GET_PRODUCT_CAT_LISTS_ACTIONS,
  PRINT_SHOP_IMPORT_REPORT_ACTION,
} from './type'

export default {
  namespaced: true,

  state: {
    warehousesInput: {},
    productData: {},
    productCatData: [],
    selectedProductRow: [],
    printData: {},
  },

  getters: {
    [REPORT_WAREHOUSES_INPUT_GETTER](state) {
      return state.warehousesInput
    },
    [PRODUCT_LISTS_GETTER](state) {
      return state.productData
    },
    [PRODUCT_CAT_LISTS_GETTER](state) {
      return state.productCatData
    },
    [PRINT_SHOP_IMPORT_REPORT_GETTER](state) {
      return state.printData
    },
  },

  mutations: {
    [CLEAR_ALL_PRODUCT_LISTS_CHECKED](state) {
      state.selectedProductRow = []
    },
  },

  actions: {
    [GET_REPORT_WAREHOUSES_INPUT_ACTION]({ state }, val) {
      ReportsWarehousesInputServices
        .getWarehousesInput(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehousesInput = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [EXPORT_REPORT_WAREHOUSES_INPUT_ACTION]({}, val) {
      ReportsWarehousesInputServices
        .exportWarehouseInputs(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Cửa hàng nhập hàng_Filled_${moment().format('DDMMYYYY')}_${moment().format('hhmmss')}_${Math.floor(Math.random() * 900 + 100)}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_PRODUCT_LISTS_ACTIONS]({ state }, val) {
      ReportsWarehousesInputServices
        .getProductLists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productData = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },

    [GET_PRODUCT_CAT_LISTS_ACTIONS]({ state }, val) {
      ReportsWarehousesInputServices
        .getProductCatlists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productCatData = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },

    [PRINT_SHOP_IMPORT_REPORT_ACTION]({ state }, val) {
      ReportsWarehousesInputServices
        .printShopImportReport(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printData = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
  },
}
