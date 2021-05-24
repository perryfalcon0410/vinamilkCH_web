import ReportsWarehousesInputServices from '@/views/reports/reports-warehouses/reports-warehouses-input/api-service/index'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  REPORT_WAREHOUSES_INPUT_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_INPUT_ACTION,
  EXPORT_REPORT_WAREHOUSES_INPUT_ACTION,
} from './type'

export default {
  namespaced: true,

  state: {
    warehousesInput: [],
  },

  getters: {
    [REPORT_WAREHOUSES_INPUT_GETTER](state) {
      return state.warehousesInput
    },
  },

  mutations: {},

  actions: {
    [GET_REPORT_WAREHOUSES_INPUT_ACTION]({ state }, val) {
      ReportsWarehousesInputServices
        .getWarehousesInput(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehousesInput = res.data.response
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_WAREHOUSES_INPUT_ACTION]({}, val) {
      ReportsWarehousesInputServices
        .exportWarehouseInputs(val)
        .then(res => {
          if (res.status === 200 && res.data != null) {
            const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' })
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, 'Cửa hàng nhập hàng_Filled')
            } else {
              const elem = window.document.createElement('a')
              elem.href = window.URL.createObjectURL(blob)
              elem.download = 'Cửa hàng nhập hàng_Filled'
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
  },
}
