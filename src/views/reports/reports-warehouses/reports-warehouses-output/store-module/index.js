import outputGoodsService from '@/views/reports/reports-warehouses/reports-warehouses-output/api-service/index'
import toasts from '@/@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'
import { notificationResponseMessage } from '@core/utils/utils'

import {
  // GETTERS
  OUTPUT_GOODS_GETTER,
  PRODUCT_GETTER,
  PRODUCT_CAT_GETTER,
  PRINT_OUTPUT_GOODS_GETTER,

  // ACTIONS
  GET_OUTPUT_GOODS_ACTION,
  GET_PRODUCT_ACTION,
  GET_PRODUCT_CAT_ACTION,
  PRINT_OUTPUT_GOODS_ACTION,
  EXPORT_OUTPUT_GOODS_ACTION,
} from './type'

export default {
  namespaced: true,

  // STATE
  state: {
    outputGoods: [],
    productData: {},
    productCatData: [],
    printData: {},
  },

  // GETTERS
  getters: {
    [OUTPUT_GOODS_GETTER](state) {
      return state.outputGoods
    },
    [PRODUCT_GETTER](state) {
      return state.productData
    },
    [PRODUCT_CAT_GETTER](state) {
      return state.productCatData
    },
    [PRINT_OUTPUT_GOODS_GETTER](state) {
      return state.printData
    },
  },

  // ACTIONS
  actions: {
    // GET OUTPUT GOODS
    [GET_OUTPUT_GOODS_ACTION]({ state }, val) {
      outputGoodsService
        .getOutputGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.outputGoods = res.data || []
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    // END - GET OUTPUT GOODS
    [EXPORT_OUTPUT_GOODS_ACTION]({ }, val) {
      outputGoodsService
        .exportOutputGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Cửa hàng xuất hàng_Filled_${moment().format('DDMMYYYY')}_${moment().locale('vi').format('HHmmss')}_${Math.floor(Math.random() * 900 + 100)}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [PRINT_OUTPUT_GOODS_ACTION]({ state }, val) {
      outputGoodsService
        .printOutputGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printData = res.data || {}
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },

    [GET_PRODUCT_ACTION]({ state }, val) {
      outputGoodsService
        .getProductLists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productData = res.data || {}
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },

    [GET_PRODUCT_CAT_ACTION]({ state }, val) {
      outputGoodsService
        .getProductCatlists(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productCatData = res.data || []
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
