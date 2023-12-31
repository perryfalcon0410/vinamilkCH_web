import ReportVouchersService from '@/views/reports/reports-vouchers/api-service'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import { notificationResponseMessage } from '@core/utils/utils'

import {
  // GETTERS
  REPORT_VOUCHERS_USED_GETTER,
  // ACTIONS
  GET_REPORT_VOUCHERS_USED_ACTION,
  EXPORT_REPORT_VOUCHERS_USED_ACTION,
} from './type'

export default {
  namespaced: true,
  // State
  state: {
    reportVouchersUsed: {},
  },
  // Getters
  getters: {
    [REPORT_VOUCHERS_USED_GETTER](state) {
      return state.reportVouchersUsed || {}
    },
  },

  // Actions
  actions: {
    [GET_REPORT_VOUCHERS_USED_ACTION]({ state }, val) {
      ReportVouchersService
        .getReportVouchersUsed(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportVouchersUsed = res.data
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [EXPORT_REPORT_VOUCHERS_USED_ACTION]({ }, val) {
      ReportVouchersService
        .exportVouchersExcelEndpoint(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Báo cáo danh sách voucher_${moment().format('DDMMYYYY')}_${moment().locale('vi').format('HHmmss')}_${Math.floor(Math.random() * 1000)}.xlsx`
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
  },
}
