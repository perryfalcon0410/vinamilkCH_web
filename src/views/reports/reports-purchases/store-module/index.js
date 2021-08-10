import ReportsPurchasesSerivce from '@/views/reports/reports-purchases/api-service'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import {
  // GETTERS
  REPORT_INPUT_RECEIPT_DETAILS_GETTER,
  PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER,
  // ACTIONS
  GET_REPORT_INPUT_RECEIPT_DETAILS_ACTION,
  EXPORT_REPORT_INPUT_RECEIPT_DETAILS_ACTION,
  PRINT_REPORT_INPUT_RECEIPT_DETAILS_ACTION,
} from './type'

export default {
  namespaced: true,
  // State
  state: {
    reportInputReceiptDetails: {},
    printInputReceiptDetails: [],
  },
  // Getters
  getters: {
    [REPORT_INPUT_RECEIPT_DETAILS_GETTER](state) {
      return state.reportInputReceiptDetails || {}
    },
    [PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER](state) {
      return state.printInputReceiptDetails || []
    },
  },

  // Actions
  actions: {
    [GET_REPORT_INPUT_RECEIPT_DETAILS_ACTION]({ state }, val) {
      ReportsPurchasesSerivce
        .getInputReceiptDetails(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportInputReceiptDetails = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_INPUT_RECEIPT_DETAILS_ACTION]({ }, val) {
      ReportsPurchasesSerivce
        .exportInputReceiptDetailExcel(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Bảng kê chi tiết hóa đơn nhập hàng_${moment().format('DDMMYYYY')}_${moment().format('hhmmss')}_${Math.floor(Math.random() * 1000)}.xlsx`
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [PRINT_REPORT_INPUT_RECEIPT_DETAILS_ACTION]({ state }, val) {
      ReportsPurchasesSerivce
        .printInputReceiptDetails(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printInputReceiptDetails = res.data
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
