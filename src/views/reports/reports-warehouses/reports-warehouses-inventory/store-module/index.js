import reportWarehousesInventoryService from '@/views/reports/reports-warehouses/reports-warehouses-inventory/api-service'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  REPORT_WAREHOUSES_INVENTORY_GETTER,
  REPORT_WAREHOUSES_INVENTORY_INFO_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_INVENTORY_ACTION,
} from './type'

export default {
  namespaced: true,

  // START - STATE
  state: {
    reportWarehousesInventory: [],
    reportWarehousesInventoryInfo: {},
  },

  // START - GETTERS
  getters: {
    [REPORT_WAREHOUSES_INVENTORY_GETTER](state) {
      return state.reportWarehousesInventory
    },
    [REPORT_WAREHOUSES_INVENTORY_INFO_GETTER](state) {
      return state.reportWarehousesInventoryInfo
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
            console.log(res.data)
            state.reportWarehousesInventory = res.data.response.content
            state.reportWarehousesInventoryInfo = res.data.info
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
