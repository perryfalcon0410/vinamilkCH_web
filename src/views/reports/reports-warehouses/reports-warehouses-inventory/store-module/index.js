import reportWarehousesInventoryService from '@/views/reports/reports-warehouses/reports-warehouses-inventory/api-service'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import {
  // GETTERS
  REPORT_WAREHOUSES_INVENTORY_GETTER,
  REPORT_WAREHOUSES_INVENTORY_INFO_GETTER,
  REPORT_WAREHOUSES_INVENTORY_PAGINATION_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_INVENTORY_ACTION,
  EXPORT_REPORT_INVENTORIES_ACTION,
} from './type'

export default {
  namespaced: true,

  // START - STATE
  state: {
    reportWarehousesInventory: [],
    reportWarehousesInventoryInfo: {},
    reportWarehousesInventoryPagination: {},
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
          const fileName = `Ton_kho_cua_hang_Filled_${moment().format('YYYYMMDD')}_${moment().format('hhmmss')}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
  },
}
