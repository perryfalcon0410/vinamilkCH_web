import WarehousesInventoryService from '@/views/warehouses/warehouses-inventory/api-service'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  WAREHOUSE_INVENTORIES_GETTER,
  WAREHOUSE_INVENTORY_PAGINATION_GETTER,
  WAREHOUSE_TYPES_GETTER,
  // ACTIONS
  GET_WAREHOUSE_INVENTORIES_ACTION,
  GET_WAREHOUSE_TYPES_ACTION,
} from './type'

export default {
  namespaced: true,

  // START - STATE
  state: {
    warehouseInventories: [],
    warehouseInventoryPagination: {},
    warehouseTypes: [],
  },

  // START - GETTERS
  getters: {
    [WAREHOUSE_INVENTORIES_GETTER](state) {
      return state.warehouseInventories
    },
    [WAREHOUSE_INVENTORY_PAGINATION_GETTER](state) {
      return state.warehouseInventoryPagination
    },
    [WAREHOUSE_TYPES_GETTER](state) {
      return state.warehouseTypes
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
            state.warehouseInventories = res.data.content
            state.warehouseInventoryPagination = res.data
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
  },
}
