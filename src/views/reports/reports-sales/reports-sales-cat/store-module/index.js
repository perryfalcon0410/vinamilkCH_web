import ReportsService from '@/views/reports/reports-sales/reports-sales-cat/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import commonData from '@/@db/common'
import {
  // GETTERS
  REPORT_SALES_CAT_GETTER,
  CUSTOMER_TYPES_GETTER,
  PRINT_REPORT_GETTER,

  // ACTIONS
  GET_REPORT_SALES_CAT_ACTION,
  EXPORT_REPORT_SALES_CAT_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
  PRINT_REPORT_ACTION,
} from './type'

export default {
  namespaced: true,
  // State
  state: {
    reportCustomerData: {},
    customerTypes: [],
    shopLocationsSearch: [],
    printReportData: [],
  },
  // Getters
  getters: {
    [REPORT_SALES_CAT_GETTER](state) {
      return state.reportCustomerData
    },
    [CUSTOMER_TYPES_GETTER](state) {
      return state.customerTypes
    },
    [PRINT_REPORT_GETTER](state) { // temp
      return state.printReportData
    },
  },
  // Actions
  actions: {
    [GET_REPORT_SALES_CAT_ACTION]({ state }, val) {
      ReportsService
        .getReportsSalesCat(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportCustomerData = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [EXPORT_REPORT_SALES_CAT_ACTION]({}, val) {
      ReportsService
        .exportReportsSalesCat(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Báo cáo bán hàng theo CAT_Filled_${moment().format('YYYYMMDD')}_${moment().format('hhmmss')}_${Math.floor(Math.random() * 1000)}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_CUSTOMER_TYPES_ACTION]({ state }, val) {
      ReportsService
        .getCustomerTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.customerTypes = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [PRINT_REPORT_ACTION]({ state }, val) {
      ReportsService
        .printReport(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printReportData = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
  },
}
