import ReceiptImportService from '@/views/warehouses/warehouses-input/api-service'
import toasts from '@core/utils/toasts/toasts'
import router from '@/router/index'
import FileSaver from 'file-saver'

import {
  // GETTERS
  POCONFIRM_GETTER,
  PODETAIL_PRODUCTS_RES_GETTER,
  PODETAIL_PRODUCTS_PROMO_RES_GETTER,
  PODETAIL_PRODUCTS_INFO_GETTER,
  PODETAIL_PRODUCTS_PROMO_INFO_GETTER,
  IMPORT_ADJUSTMENTS_GETTER,
  IMPORT_ADJUSTMENTS_DETAIL_GETTER,
  IMPORT_BORROWINGS_GETTER,
  IMPORT_BORROWINGS_DETAIL_GETTER,
  RECEIPTS_GETTER,
  // ACTIONS
  GET_RECEIPTS_ACTION,
  EXPORT_RECEIPTS_ACTION,
  GET_POCONFIRMS_ACTION,
  GET_PODETAIL_PRODUCTS_ACTION,
  GET_PODETAIL_PRODUCTS_PROMO_ACTION,
  GET_IMPORTEXCEL_ACTION,
  GET_IMPORT_ADJUSTMENTS_ACTION,
  GET_IMPORT_ADJUSTMENTS_DETAIL_ACTION,
  GET_IMPORT_BORROWINGS_ACTION,
  GET_IMPORT_BORROWINGS_DETAIL_ACTION,
  UPDATE_NOT_IMPORT_ACTION,
  CREATE_SALE_IMPORT_ACTION,
  REMOVE_RECEIPT_ACTION,
  PRINT_WAREHOUSES_INPUT_ACTION,
} from './type'

export default {
  namespaced: true,

  // START - STATE
  state: {
    poConfirm: [],
    podetail_products_res: [],
    podetail_products_info: {},
    podetail_products_promo_res: [],
    podetail_product_promo_info: {},
    importAdjustments: [],
    importAdjustmentsDetail: [],
    importBorrowings: [],
    importBorrowingsDetail: [],
    receipts: [],
  },

  // START - GETTERS
  getters: {
    [POCONFIRM_GETTER](state) {
      return state.poConfirm
    },
    [PODETAIL_PRODUCTS_RES_GETTER](state) {
      return state.podetail_products_res
    },
    [PODETAIL_PRODUCTS_PROMO_RES_GETTER](state) {
      return state.podetail_products_promo_res
    },
    [PODETAIL_PRODUCTS_INFO_GETTER](state) {
      return state.podetail_products_info
    },
    [PODETAIL_PRODUCTS_PROMO_INFO_GETTER](state) {
      return state.podetail_product_promo_info
    },
    [IMPORT_ADJUSTMENTS_GETTER](state) {
      return state.importAdjustments
    },
    [IMPORT_ADJUSTMENTS_DETAIL_GETTER](state) {
      return state.importAdjustmentsDetail
    },
    [IMPORT_BORROWINGS_GETTER](state) {
      return state.importBorrowings
    },
    [IMPORT_BORROWINGS_DETAIL_GETTER](state) {
      return state.importBorrowingsDetail
    },
    [RECEIPTS_GETTER](state) {
      return state.receipts
    },
  },

  // START - MUTATIONS
  mutations: {},

  // START - ACTIONS
  actions: {
    [GET_POCONFIRMS_ACTION]({ state }) {
      ReceiptImportService
        .getPoConfirm()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.poConfirm = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PODETAIL_PRODUCTS_ACTION]({ state }, val) {
      ReceiptImportService
        .getPoProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.podetail_products_res = res.data.response
            state.podetail_products_info = res.data.info
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PODETAIL_PRODUCTS_PROMO_ACTION]({ state }, val) {
      ReceiptImportService
        .getPoPromotionProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.podetail_products_promo_res = res.data.response
            state.podetail_product_promo_info = res.data.info
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_IMPORTEXCEL_ACTION]({}, val) {
      ReceiptImportService
        .getImportExcel(val)
        .then(res => {
          // temp
          if (res.status === 200 && res.data != null) {
            const blob = new Blob([res.data], { type: 'data:attachment/xlsx' })
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, 'PoImport')
            } else {
              const elem = window.document.createElement('a')
              elem.href = window.URL.createObjectURL(blob)
              elem.download = 'PoImport.xlsx'
              document.body.appendChild(elem)
              elem.click()
              document.body.removeChild(elem)
            }
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_IMPORT_ADJUSTMENTS_ACTION]({ state }) {
      ReceiptImportService
        .getImportAdjustments()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.importAdjustments = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_IMPORT_ADJUSTMENTS_DETAIL_ACTION]({ state }, val) {
      ReceiptImportService
        .getImportAdjustmentsDetail(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.importAdjustmentsDetail = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_IMPORT_BORROWINGS_ACTION]({ state }) {
      ReceiptImportService
        .getImportBorrowings()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.importBorrowings = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_IMPORT_BORROWINGS_DETAIL_ACTION]({ state }, val) {
      ReceiptImportService
        .getImportBorrwingsDetail(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.importBorrowingsDetail = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [UPDATE_NOT_IMPORT_ACTION]({}, val) {
      ReceiptImportService
        .updateNotImport(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [CREATE_SALE_IMPORT_ACTION]({}, val) {
      ReceiptImportService
        .createSaleImport(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            router.push({ name: 'warehouses-input' })
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // START - GET RECEIPTS
    [GET_RECEIPTS_ACTION]({ state }, val) {
      ReceiptImportService
        .getReceiptImport(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.receipts = res.data.response.content
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - GET RECEIPTS

    // START - EXPORT RECEIPTS
    [EXPORT_RECEIPTS_ACTION]({}, val) {
      ReceiptImportService
        .exportReceiptImport(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - EXPORT RECEIPTS
    [REMOVE_RECEIPT_ACTION]({}, val) {
      ReceiptImportService
        .removeReceipt(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success('Xóa phiếu nhập hàng thành công')
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [PRINT_WAREHOUSES_INPUT_ACTION]({ }, val) {
      const fileName = `${val.transCode}.pdf`
      ReceiptImportService
        .printWarehouseInput(val)
        .then(response => response.data)
        .then(res => {
          const blob = new Blob([res], { type: 'application/pdf' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
  },
}
