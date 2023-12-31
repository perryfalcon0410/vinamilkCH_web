import ReportsService from '@/views/reports/reports-customers/reports-customers/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import { notificationResponseMessage } from '@core/utils/utils'

import {
  // GETTERS
  REPORT_CUSTOMERS_GETTER,
  CUSTOMER_TYPES_GETTER,
  SHOP_LOCATIONS_SEARCH_GETTER,

  // ACTIONS
  GET_REPORT_CUSTOMERS_ACTION,
  EXPORT_REPORT_CUSTOMERS_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
  GET_SHOP_LOCATIONS_SEARCH_ACTION,
} from './type'

export default {
  namespaced: true,
  // State
  state: {
    reportCustomerData: {},
    customerTypes: [],
    shopLocationsSearch: [],
  },
  // Getters
  getters: {
    [REPORT_CUSTOMERS_GETTER](state) {
      return state.reportCustomerData
    },
    [CUSTOMER_TYPES_GETTER](state) {
      return state.customerTypes
    },
    [SHOP_LOCATIONS_SEARCH_GETTER](state) {
      return state.shopLocationsSearch
    },
  },
  // Actions
  actions: {
    [GET_REPORT_CUSTOMERS_ACTION]({ state }, val) {
      ReportsService
        .getReportsCustomers(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportCustomerData = res.data || {}
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [EXPORT_REPORT_CUSTOMERS_ACTION]({}, val) {
      ReportsService
        .exportReportsCustomers(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Bao_cao_khach_hang_${moment().format('DDMMYYYY')}_${moment().locale('vi').format('HHmmss')}_${Math.floor(Math.random() * 900 + 100)}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
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
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },

    [GET_SHOP_LOCATIONS_SEARCH_ACTION]({ state }, val) {
      ReportsService
        .getShopLocationsSearch(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.shopLocationsSearch = res.data
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
