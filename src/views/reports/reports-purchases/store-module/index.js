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
    reportInputReceiptDetailsContent: [],
    reportInputReceiptDetailsPagination: {},
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
          const fileName = `Bang_ke_chi_tiet_don_nhap_hang_${moment().format('DDMMYYYY')}_${moment().format('hhmm')}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
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
