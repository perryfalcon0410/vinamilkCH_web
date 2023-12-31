import WarehousesService from '@/views/warehouses/warehouses-output/api-service'
import FileSaver from 'file-saver'
import router from '@/router/index'
import { notificationResponseMessage } from '@core/utils/utils'

import {
  // GETTERS
  GET_WAREHOUSES_OUTPUT_LIST_GETTER,
  GET_WAREHOUSES_OUTPUT_BY_ID_GETTER,
  GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_GETTER,
  GET_EXPORT_ADJUSTMENTS_GETTER,
  GET_EXPORT_PO_TRANS_GETTER,
  GET_EXPORT_BORROWINGS_GETTER,
  GET_EXPORT_ADJUSTMENTS_DETAIL_GETTER,
  GET_EXPORT_BORROWINGS_DETAIL_GETTER,
  GET_EXPORT_PO_TRANS_DETAIL_GETTER,
  GET_WAREHOUSE_TYPE_GETTER,
  PRINT_OUT_IN_PUT_ORDER_GETTER,
  // ACTIONS
  GET_WAREHOUSES_OUTPUT_LIST_ACTION,
  PRINT_WAREHOUSES_OUTPUT_ACTION,
  GET_WAREHOUSES_OUTPUT_BY_ID_ACTION,
  GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION,
  UPDATE_WAREHOUSES_OUTPUT_ACTION,
  GET_EXPORT_ADJUSTMENT_ACTION,
  GET_EXPORT_PO_TRANS_ACTION,
  GET_EXPORT_BORROWINGS_ACTION,
  GET_EXPORT_BORROWINGS_DETAIL_ACTION,
  GET_EXPORT_ADJUSTMENT_DETAIL_ACTION,
  GET_EXPORT_PO_TRANS_DETAIL_ACTION,
  GET_WAREHOUSE_TYPE_ACTION,
  CREATE_EXPORT_ACTION,
  DELETE_WAREHOUSES_ACTION,
  PRINT_OUT_IN_PUT_ORDER_ACTION,
} from './type'
import toasts from '../../../../@core/utils/toasts/toasts'

export default {
  namespaced: true,
  // STATE
  state: {
    warehousesOutputs: {},
    warehousesOutput: {},
    products: [], // list product of warehouses output
    poTrans: [],
    adjustmentTrans: [],
    borrowing: [],
    poProducts: {},
    wareHouseType: [],
    adjustmentProducts: [],
    borrowedProducts: [],
    printOutInputOrderData: [],
  },

  // GETTERS
  getters: {
    [GET_WAREHOUSES_OUTPUT_LIST_GETTER](state) {
      return state.warehousesOutputs
    },
    [GET_WAREHOUSES_OUTPUT_BY_ID_GETTER](state) {
      return state.warehousesOutput
    },
    [GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_GETTER](state) {
      return state.products
    },
    [GET_EXPORT_ADJUSTMENTS_GETTER](state) {
      return state.adjustmentTrans
    },
    [GET_EXPORT_PO_TRANS_GETTER](state) {
      return state.poTrans || []
    },
    [GET_EXPORT_BORROWINGS_GETTER](state) {
      return state.borrowing
    },
    [GET_EXPORT_ADJUSTMENTS_DETAIL_GETTER](state) {
      return state.adjustmentProducts
    },
    [GET_EXPORT_BORROWINGS_DETAIL_GETTER](state) {
      return state.borrowedProducts
    },
    [GET_EXPORT_PO_TRANS_DETAIL_GETTER](state) {
      return state.poProducts || {}
    },
    [GET_WAREHOUSE_TYPE_GETTER](state) {
      return state.wareHouseType
    },
    [PRINT_OUT_IN_PUT_ORDER_GETTER](state) {
      return state.printOutInputOrderData
    },
  },

  // ACTIONS
  actions: {
    [GET_WAREHOUSES_OUTPUT_LIST_ACTION]({ state }, val) {
      WarehousesService
        .getWarehouseOutputs(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehousesOutputs = res.data
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [PRINT_WAREHOUSES_OUTPUT_ACTION]({ }, val) {
      WarehousesService
        .printWarehouseOutput(val)
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `${val.transCode}.pdf`
          const blob = new Blob([res], { type: 'application/pdf' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [GET_WAREHOUSES_OUTPUT_BY_ID_ACTION]({ state }, val) {
      WarehousesService
        .getWarehouseOutputById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehousesOutput = res.data || {}
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION]({ state }, val) {
      WarehousesService
        .getProductsOfWarehouseOutput(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.products = res.data || []
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [UPDATE_WAREHOUSES_OUTPUT_ACTION]({ }, val) {
      WarehousesService
        .updateWarehouseOutput(val.updateWarehouseOutput)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            val.onSuccess()
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [GET_EXPORT_BORROWINGS_ACTION]({ state }, val) {
      WarehousesService
        .getExportBorrowing(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.borrowing = res.data || []
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [GET_EXPORT_ADJUSTMENT_ACTION]({ state }, val) {
      WarehousesService
        .getExportAdjustment(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.adjustmentTrans = res.data || []
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [GET_EXPORT_PO_TRANS_ACTION]({ state }, val) {
      WarehousesService
        .getExportPoTrans(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.poTrans = res.data
            val.onSuccess()
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [GET_EXPORT_PO_TRANS_DETAIL_ACTION]({ state }, val) {
      WarehousesService
        .getExportPoTransDetail(val.id)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.poProducts = res.data
            val.onSuccess(state.poProducts)
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [GET_EXPORT_BORROWINGS_DETAIL_ACTION]({ state }, val) {
      WarehousesService
        .getExportBorrowingDetail(val.id)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.borrowedProducts = res.data || []
            val.onSuccess(state.borrowedProducts)
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [GET_EXPORT_ADJUSTMENT_DETAIL_ACTION]({ state }, val) {
      WarehousesService
        .getExportAdjustmentDetail(val.id)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.adjustmentProducts = res.data || []
            val.onSuccess(state.adjustmentProducts)
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [GET_WAREHOUSE_TYPE_ACTION]({ state }) {
      WarehousesService
        .getWareHouseType()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.wareHouseType = res.data || {}
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [CREATE_EXPORT_ACTION]({ }, val) {
      WarehousesService
        .createExport(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            router.push({ name: 'warehouses-output' })
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [DELETE_WAREHOUSES_ACTION]({}, val) {
      WarehousesService
        .deleteWarehousesOutput(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    [PRINT_OUT_IN_PUT_ORDER_ACTION]({ state }, val) {
      WarehousesService
        .printOutInputOrder(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printOutInputOrderData = res.data || {}
            val.onSuccess()
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
