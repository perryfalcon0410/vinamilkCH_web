import reportSalesService from '@/views/reports/reports-sales/reports-sales-amount-receipt-per-customers/api-service'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'

import {
  // GETTERS
  REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER,
  REPORT_SALES_CUSTOMER_TYPES_GETTER,
  REPORT_SALES_QUANTITY_SALE_RECEIPT_CONTENT_GETTER,
  // ACTIONS
  GET_CUSTOMERS_TYPES_ACTION,
  GET_REPORT_SALES_QUANTITY_SALE_RECEIPTS_ACTION,
  EXPORT_REPORT_SALES_QUANTITY_RECEIPT_ACTION,
} from './type'

export default {
  namespaced: true,

  // STATE
  state: {
    reportSalesQuantityReceipt: [],
    reportSalesQuantityReceiptContent: [],
    reportSalesCustomerType: [],
  },

  // GETTERS
  getters: {
    [REPORT_SALES_CUSTOMER_TYPES_GETTER](state) {
      return state.reportSalesCustomerType
    },
    [REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER](state) {
      return state.reportSalesQuantityReceipt
    },
    [REPORT_SALES_QUANTITY_SALE_RECEIPT_CONTENT_GETTER](state) {
      return state.reportSalesQuantityReceiptContent
    },
  },

  // ACTIONS
  actions: {
    [GET_REPORT_SALES_QUANTITY_SALE_RECEIPTS_ACTION]({ state }, val) {
      reportSalesService
        .getReportSalesQuantityReceipts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportSalesQuantityReceipt = res.data
            state.reportSalesQuantityReceiptContent = res.data.response.content
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_CUSTOMERS_TYPES_ACTION]({ state }, val) {
      reportSalesService
        .getCustomerTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportSalesCustomerType = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_SALES_QUANTITY_RECEIPT_ACTION]({ }, val) {
      reportSalesService
        .exportReportSalesQuantityReceipts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            const fileName = `Bao_cao_so_luong_ha_don_theo_khach_hang_Filled_${moment().format('YYYYMMDD')}_${moment().format('hhmmss')}.xlsx`
            const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            FileSaver.saveAs(blob, fileName)
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
