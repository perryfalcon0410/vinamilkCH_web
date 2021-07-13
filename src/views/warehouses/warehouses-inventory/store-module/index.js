import WarehousesInventoryService from '@/views/warehouses/warehouses-inventory/api-service'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  WAREHOUSE_INVENTORIES_GETTER,
  WAREHOUSE_TYPES_GETTER,
  WAREHOUSE_INVENTORY_STOCKS_GETTER,
  IS_EXISTED_WAREHOUSE_INVENTORY_GETTER,
  WAREHOUSE_INVENTORY_DATA_GETTER,
  WAREHOUSE_INVENTORY_IMPORT_DATA_GETTER,
  WAREHOUSE_INVENTORY_DETAIL_GETTER,
  // ACTIONS
  GET_WAREHOUSE_INVENTORIES_ACTION,
  GET_WAREHOUSE_TYPES_ACTION,
  GET_WAREHOUSE_INVENTORY_STOCKS_ACTION,
  EXPORT_FILLED_STOCKS_ACTION,
  CREATE_WAREHOUSE_INVENTORY_ACTION,
  IMPORT_FILLED_STOCKS_ACTION,
  CHECK_EXISTED_WAREHOUSE_INVENTORY_ACTION,
  GET_SAMPLE_IMPORT_FILE_ACTION,
  GET_FAILED_IMPORT_FILE_ACTION,
  GET_WAREHOUSE_INVENTORY_DETAIL_ACTION,
  UPDATE_WAREHOUSE_INVENTORY_ACTION,
} from './type'

export default {
  namespaced: true,

  // START - STATE
  state: {
    warehouseInventories: [],
    warehouseTypes: [],
    warehouseInventoryStocks: [],
    warehouseInventoryStatusCode: null,
    isExistedWarehouseInventory: null,
    warehouseInventoryData: {},
    warehouseInventoryImportData: {},
    warehouseInventoryDetail: {},
  },

  // START - GETTERS
  getters: {
    [WAREHOUSE_INVENTORIES_GETTER](state) {
      return state.warehouseInventories
    },
    [WAREHOUSE_TYPES_GETTER](state) {
      return state.warehouseTypes
    },
    [WAREHOUSE_INVENTORY_STOCKS_GETTER](state) {
      return state.warehouseInventoryStocks
    },
    [IS_EXISTED_WAREHOUSE_INVENTORY_GETTER](state) {
      return state.isExistedWarehouseInventory
    },
    [WAREHOUSE_INVENTORY_DATA_GETTER](state) {
      return state.warehouseInventoryData
    },
    [WAREHOUSE_INVENTORY_IMPORT_DATA_GETTER](state) {
      return state.warehouseInventoryImportData
    },
    [WAREHOUSE_INVENTORY_DETAIL_GETTER](state) {
      return state.warehouseInventoryDetail
    },
  },

  // START - MUTATIONS
  mutations: {},

  // START - ACTIONS
  actions: {
    [GET_WAREHOUSE_INVENTORIES_ACTION]({ state }, val) {
      WarehousesInventoryService
        .getWarehouseInventories(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehouseInventories = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_WAREHOUSE_TYPES_ACTION]({ state }, val) {
      WarehousesInventoryService
        .getWarehouseTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehouseTypes = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_WAREHOUSE_INVENTORY_STOCKS_ACTION]({ state }, val) {
      WarehousesInventoryService
        .getWarehouseInventoryStocks(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehouseInventoryStocks = res.data
            state.warehouseInventoryStatusCode = res.statusCode
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_FILLED_STOCKS_ACTION]({}, val) {
      WarehousesInventoryService
        .exportFilledStocks(val)
        .then(res => {
          if (res.status === 200 && res.data != null) {
            const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' })
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, `Kiểm kê hàng_Filled_${val.date}`)
            } else {
              const elem = window.document.createElement('a')
              elem.href = window.URL.createObjectURL(blob)
              elem.download = `Kiểm kê hàng_Filled_${val.date}`
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
    [CREATE_WAREHOUSE_INVENTORY_ACTION]({ state }, val) {
      WarehousesInventoryService
        .createWarehouseInventory(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            state.warehouseInventoryStatusCode = res.statusCode
            state.warehouseInventoryData = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [IMPORT_FILLED_STOCKS_ACTION]({ state }, val) {
      WarehousesInventoryService
        .importFilledStocks(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehouseInventoryImportData = res.data
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [CHECK_EXISTED_WAREHOUSE_INVENTORY_ACTION]({ state }, val) {
      WarehousesInventoryService
        .checkExistedWarehouseInventory(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.isExistedWarehouseInventory = !res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_SAMPLE_IMPORT_FILE_ACTION]({}) {
      WarehousesInventoryService
        .getSampleImportFile()
        .then(res => {
          if (res.status === 200 && res.data != null) {
            const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' })
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, 'Mau_Import')
            } else {
              const elem = window.document.createElement('a')
              elem.href = window.URL.createObjectURL(blob)
              elem.download = 'Mau_Import'
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
    [GET_FAILED_IMPORT_FILE_ACTION]({}, val) {
      WarehousesInventoryService
        .getFailedImportFile(val.data)
        .then(res => {
          if (res.status === 200 && res.data != null) {
            const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' })
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, `Kiểm kê hàng_Filled_${val.date}`)
            } else {
              const elem = window.document.createElement('a')
              elem.href = window.URL.createObjectURL(blob)
              elem.download = `Kiểm kê hàng_Filled_${val.date}`
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
    [GET_WAREHOUSE_INVENTORY_DETAIL_ACTION]({ state }, val) {
      WarehousesInventoryService
        .getWarehouseInventoryDetail(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehouseInventoryDetail = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [UPDATE_WAREHOUSE_INVENTORY_ACTION]({ state }, val) {
      WarehousesInventoryService
        .updateWarehouseInventory(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            state.warehouseInventoryStatusCode = res.statusCode
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
