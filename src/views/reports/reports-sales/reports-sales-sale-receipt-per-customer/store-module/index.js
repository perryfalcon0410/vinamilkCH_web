import reportSalesService from '@/views/reports/reports-sales/reports-sales-sale-receipt-per-customer/api-service'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'

import {
  // GETTERS
  REPORT_SALES_SALE_RECEIPT_GETTER,
  REPORT_SALES_CUSTOMER_TYPES_GETTER,
  REPORT_SALES_SALE_RECEIPT_CONTENT_GETTER,
  // ACTIONS
  GET_CUSTOMERS_TYPES_ACTION,
  GET_SALE_RECEIPTS_ACTION,
  EXPORT_REPORT_SALE_RECEIPT_AMOUNT,
} from './type'

export default {
  namespaced: true,

  // STATE
  state: {
    reportSalesSaleReceipt: [],
    reportSalesSaleReceiptContent: [],
    reportSalesCustomerType: [],
  },

  // GETTERS
  getters: {
    [REPORT_SALES_CUSTOMER_TYPES_GETTER](state) {
      return state.reportSalesCustomerType
    },
    [REPORT_SALES_SALE_RECEIPT_GETTER](state) {
      return state.reportSalesSaleReceipt
    },
    [REPORT_SALES_SALE_RECEIPT_CONTENT_GETTER](state) {
      return state.reportSalesSaleReceiptContent
    },
  },

  // ACTIONS
  actions: {
    [GET_SALE_RECEIPTS_ACTION]({ state }, val) {
      reportSalesService
        .getReportSalesAmount(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportSalesSaleReceipt = res.data
            state.reportSalesSaleReceiptContent = res.data.response.content
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
    [EXPORT_REPORT_SALE_RECEIPT_AMOUNT]({ }, val) {
      reportSalesService
        .exportReportSalesExcel(val)
        .then(response => response.data)
        .then(res => {
          const fileName = `Bao_cao_doanh_so_theo_hoa_don_Filled_${moment().format('YYYYMMDD')}_${moment().format('hhmmss')}.xlsx`
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
  },
}