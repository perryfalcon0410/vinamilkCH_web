import toasts from '@/@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import commonData from '@/@db/common'
import ReportsService from '@/views/reports/reports-customers/reports-customers-non-transactional/api-service/index'
import {
  REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER,
  PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER,
  GET_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION,
  EXPORT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION,
  PRINT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION,
} from './type'

export default {
  namespaced: true,
  // State
  state: {
    reportCustomersData: {},
    printCustomersNotTradeData: {},
  },
  // Getters
  getters: {
    [REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER](state) {
      return state.reportCustomersData
    },
    [PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER](state) {
      return state.printCustomersNotTradeData
    },
  },
  // Mutations
  mutations: {
  },
  // Actions
  actions: {
    [GET_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION]({ state }, val) {
      ReportsService
        .getReportsCustomersNonTransactional(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportCustomersData = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [EXPORT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION]({ }, val) {
      ReportsService
        .exportReportsCustomersNonTransactional(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Bao_cao_khach_hang_khong_giao_dich_${moment().format('DDMMYYYY')}_${moment().format('hhmm')}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [PRINT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION]({ state }, val) {
      ReportsService
        .printReportsCustomersNonTransactional(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printCustomersNotTradeData = res.data
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
