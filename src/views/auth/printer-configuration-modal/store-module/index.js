import PrintService from '@/views/auth/printer-configuration-modal/api-service'
import toasts from '@core/utils/toasts/toasts'
import { notificationResponseMessage } from '@core/utils/utils'

import {
  PRINTER_CLIENT_GETTER,
  GET_PRINTER_CLIENT_ACTIONS,
  CREATE_PRINTER_CLIENT_ACTIONS,
  UPDATE_PRINTER_CLIENT_ACTIONS,
} from './type'

export default {
  namespaced: true,
  // STATE
  state: {
    printConfigData: [],
  },
  getters: {
    [PRINTER_CLIENT_GETTER](state) {
      return state.printConfigData
    },
  },
  // ACTIONS
  actions: {
    [GET_PRINTER_CLIENT_ACTIONS]({ state }, val) {
      PrintService
        .getPrinterClient(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printConfigData = res.data
            val.onSuccess()
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },

    [CREATE_PRINTER_CLIENT_ACTIONS]({}, val) {
      PrintService
        .createPrinterClient(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success('Lưu cấu hình in thành công')
            val.onSuccess()
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },

    [UPDATE_PRINTER_CLIENT_ACTIONS]({}, val) {
      PrintService
        .updatePrinterClient(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success('Cập nhật cấu hình in thành công')
            val.onSuccess()
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
  },
}
