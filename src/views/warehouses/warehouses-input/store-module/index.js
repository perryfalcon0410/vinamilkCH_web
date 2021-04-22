import ReceiptImportService from '@/views/warehouses/warehouses-input/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import router from '@/router/index'

import {
  // GETTERS
  POCONFIRM_GETTER,
  PODETAIL_0_GETTER_RES,
  PODETAIL_1_GETTER_RES,
  PODETAIL_0_GETTER_INFO,
  PODETAIL_1_GETTER_INFO,
  IMPORT_ADJUSTMENTS_GETTER,
  IMPORT_ADJUSTMENTS_DETAIL_GETTER,
  IMPORT_BORROWINGS_GETTER,
  IMPORT_BORROWINGS_DETAIL_GETTER,
  RECEIPTS_GETTER,
  // ACTIONS
  GET_RECEIPTS_ACTION,
  EXPORT_RECEIPTS_ACTION,
  GET_POCONFIRMS_ACTION,
  GET_PODETAIL_0_ACTION,
  GET_PODETAIL_1_ACTION,
  GET_IMPORTEXCEL_ACTION,
  GET_IMPORT_ADJUSTMENTS_ACTION,
  GET_IMPORT_ADJUSTMENTS_DETAIL_ACTION,
  GET_IMPORT_BORROWINGS_ACTION,
  GET_IMPORT_BORROWINGS_DETAIL_ACTION,
  PUT_NOT_IMPORT_ACTION,
  POST_SALE_IMPORT_ACTION,
} from './type'

export default {
  namespaced: true,

  // START - STATE
  state: {
    poConfirm: [],
    podetail_0_res: [],
    podetail_0_info: {},
    podetail_1_res: [],
    podetail_1_info: {},
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
    [PODETAIL_0_GETTER_RES](state) {
      return state.podetail_0_res
    },
    [PODETAIL_1_GETTER_RES](state) {
      return state.podetail_1_res
    },
    [PODETAIL_0_GETTER_INFO](state) {
      return state.podetail_0_info
    },
    [PODETAIL_1_GETTER_INFO](state) {
      return state.podetail_1_info
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
    [GET_PODETAIL_0_ACTION]({ state }, val) {
      ReceiptImportService
        .getPoProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.podetail_0_res = res.data.response
            state.podetail_0_info = res.data.info
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PODETAIL_1_ACTION]({ state }, val) {
      ReceiptImportService
        .getPoPromotionProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.podetail_1_res = res.data.response
            state.podetail_1_info = res.data.info
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
    [PUT_NOT_IMPORT_ACTION]({}, val) {
      ReceiptImportService
        .putNotImport(val)
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
    [POST_SALE_IMPORT_ACTION]({}, val) {
      ReceiptImportService
        .postSaleImport(val)
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
            state.receipts = res.data.content
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
  },

}
