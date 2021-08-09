import ReportsWarehousesInputOutputInventoryServices from '@/views/reports/reports-warehouses/reports-warehouses-input-output-inventory/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import commonData from '@/@db/common'
import {
  // GETTERS
  REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_GETTER,
  PRODUCT_LISTS_GETTER,
  PRODUCT_CAT_LISTS_GETTER,
  PRINT_INPUT_OUTPUT_INVENTORY_GETTER,
  WAREHOUSE_TYPES_GETTER,
  // MUTATIONS
  CLEAR_ALL_PRODUCT_LISTS_CHECKED,
  // ACTIONS
  GET_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION,
  EXPORT_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION,
  GET_PRODUCT_LISTS_ACTIONS,
  GET_PRODUCT_CAT_LISTS_ACTIONS,
  PRINT_INPUT_OUTPUT_INVENTORY_ACTION,
  GET_WAREHOUSE_TYPES_ACTION,
} from './type'

export default {
  namespaced: true,

  state: {
    warehousesInput: {},
    productData: {},
    productCatData: [],
    selectedProductRow: [],
    printInputOutputData: [],
    warehouseTypes: [],
  },

  getters: {
    [REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_GETTER](state) {
      return state.warehousesInput
    },
    [PRODUCT_LISTS_GETTER](state) {
      return state.productData
    },
    [PRODUCT_CAT_LISTS_GETTER](state) {
      return state.productCatData
    },
    [PRINT_INPUT_OUTPUT_INVENTORY_GETTER](state) {
      return state.printInputOutputData
    },
    [WAREHOUSE_TYPES_GETTER](state) {
      return state.warehouseTypes
    },
  },

  mutations: {
    [CLEAR_ALL_PRODUCT_LISTS_CHECKED](state) {
      state.selectedProductRow = []
    },
  },

  actions: {
    [GET_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION]({ state }, val) {
      ReportsWarehousesInputOutputInventoryServices
        .getWarehousesInputOutputInventory(val)
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
    [EXPORT_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION]({}, val) {
      ReportsWarehousesInputOutputInventoryServices
        .exportWarehousesInputOutputInventory(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Xuất nhập tồn_Filled_${moment().format('DDMMYYYY')}_${moment().format('hhmmss')}_${Math.floor(Math.random() * 900 + 100)}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_PRODUCT_LISTS_ACTIONS]({ state }, val) {
      ReportsWarehousesInputOutputInventoryServices
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
      ReportsWarehousesInputOutputInventoryServices
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
    [PRINT_INPUT_OUTPUT_INVENTORY_ACTION]({ state }, val) {
      ReportsWarehousesInputOutputInventoryServices
        .printOutInputInventory(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printInputOutputData = res.data
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_WAREHOUSE_TYPES_ACTION]({ state }, val) {
      ReportsWarehousesInputOutputInventoryServices
        .getWarehouseTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehouseTypes = res.data
            val.onSuccess()
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
