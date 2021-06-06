import toasts from '@/@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import ReportsService from '@/views/reports/reports-customers/reports-customers-non-transactional/api-service/index'
import {
  REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER,
  GET_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION,
  EXPORT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION,
} from './type'

export default {
  namespaced: true,
  // State
  state: {
    reportCustomersData: {},
  },
  // Getters
  getters: {
    [REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER](state) {
      return state.reportCustomersData
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
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION]({ }, val) {
      ReportsService
        .exportReportsCustomersNonTransactional(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            const fileName = `Bao_cao_hang_tra_lai_${moment().format('DDMMYYYY')}_${moment().format('hhmm')}.xlsx`
            const blob = new Blob([res], { type: 'data:application/xlsx' })
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
