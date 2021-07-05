import reportWarehousesInventoryService from '@/views/reports/reports-warehouses/reports-warehouses-inventory/api-service'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import {
  // GETTERS
  REPORT_WAREHOUSES_INVENTORY_GETTER,
  REPORT_WAREHOUSES_INVENTORY_INFO_GETTER,
  REPORT_WAREHOUSES_INVENTORY_PAGINATION_GETTER,
  PRODUCT_LIST_GETTER,
  PRODUCT_LIST_PAGINATION_GETTER,
  PRODUCT_CAT_LIST_GETTER,
  PRINT_REPORT_INVENTORY_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_INVENTORY_ACTION,
  EXPORT_REPORT_INVENTORIES_ACTION,
  GET_PRODUCT_LIST_ACTION,
  GET_PRODUCT_CAT_LIST_ACTION,
  PRINT_REPORT_INVENTORY_ACTION,
} from './type'

export default {
  namespaced: true,

  // START - STATE
  state: {
    reportWarehousesInventory: [],
    reportWarehousesInventoryInfo: {},
    reportWarehousesInventoryPagination: {},
    productList: [],
    productListPagination: {},
    productCatList: [],
    printData: {},
  },

  // START - GETTERS
  getters: {
    [REPORT_WAREHOUSES_INVENTORY_GETTER](state) {
      return state.reportWarehousesInventory
    },
    [REPORT_WAREHOUSES_INVENTORY_INFO_GETTER](state) {
      return state.reportWarehousesInventoryInfo
    },
    [REPORT_WAREHOUSES_INVENTORY_PAGINATION_GETTER](state) {
      return state.reportWarehousesInventoryPagination
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
    [PRINT_REPORT_INVENTORY_GETTER](state) {
      return state.printData
    },
  },

  // START - MUTATIONS
  mutations: {},

  // START - ACTIONS
  actions: {
    [GET_REPORT_WAREHOUSES_INVENTORY_ACTION]({ state }, val) {
      reportWarehousesInventoryService
        .getReportsWarehousesInventory(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportWarehousesInventory = res.data.response.content
            state.reportWarehousesInventoryInfo = res.data.info
            state.reportWarehousesInventoryPagination = res.data.response
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_INVENTORIES_ACTION]({ }, val) {
      reportWarehousesInventoryService
        .exportReportInventories(val)
        .then(response => response.data)
        .then(res => {
          const fileName = `Tồn kho cửa hàng_Filled_${moment().format('YYYYMMDD')}_${moment().format('hhmmss')}_${Math.floor(Math.random() * 1000)}.xlsx`
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCT_LIST_ACTION]({ state }, val) {
      reportWarehousesInventoryService
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
      reportWarehousesInventoryService
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
    [PRINT_REPORT_INVENTORY_ACTION]({ state }, val) {
      reportWarehousesInventoryService
        .printReportInventory(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printData = res.data
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
