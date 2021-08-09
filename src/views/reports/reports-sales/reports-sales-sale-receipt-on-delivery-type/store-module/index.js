import reportSalesSaleOnDeliveryTypeService from '@/views/reports/reports-sales/reports-sales-sale-receipt-on-delivery-type/api-service'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'

import {
  // GETTERS
  REPORT_SALES_SALE_ON_DELIVERY_TYPE_GETTER,
  REPORT_SALES_DELIVERY_TYPES_CONTENT_GETTER,
  REPORT_SALES_DELIVERY_TYPES_GETTER,
  // ACTIONS
  GET_SALE_ON_DELIVERY_TYPE_ACTION,
  GET_SALES_DELIVERY_TYPES_ACTION,
  EXPORT_REPORT_SALE_ON_DELIVERY_TYPE_ACTION,
} from './type'

export default {
  namespaced: true,

  // STATE
  state: {
    reportSalesSaleOnDeliveryType: [],
    reportSalesSaleOnDeliveryTypeContent: [],
    reportSalesDeliveryType: [],
  },

  // GETTERS
  getters: {
    [REPORT_SALES_SALE_ON_DELIVERY_TYPE_GETTER](state) {
      return state.reportSalesSaleOnDeliveryType
    },
    [REPORT_SALES_DELIVERY_TYPES_CONTENT_GETTER](state) {
      return state.reportSalesSaleOnDeliveryTypeContent
    },
    [REPORT_SALES_DELIVERY_TYPES_GETTER](state) {
      return state.reportSalesDeliveryType
    },
  },

  // ACTIONS
  actions: {
    [GET_SALE_ON_DELIVERY_TYPE_ACTION]({ state }, val) {
      reportSalesSaleOnDeliveryTypeService
        .getReportSalesOnDeliveryType(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportSalesSaleOnDeliveryType = res.data
            state.reportSalesSaleOnDeliveryTypeContent = res.data.response.content
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_SALES_DELIVERY_TYPES_ACTION]({ state }, val) {
      reportSalesSaleOnDeliveryTypeService
        .getDeliveryTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reportSalesDeliveryType = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [EXPORT_REPORT_SALE_ON_DELIVERY_TYPE_ACTION]({ }, val) {
      reportSalesSaleOnDeliveryTypeService
        .exportReportSalesOnDeliveryType(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Bao_cao_doanh_so_theo_loai_giao_hang_${moment().format('YYYYMMDD')}_${moment().format('hhmmss')}.xlsx`
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
  },
}
