import ReceiptImportService from '@/views/warehouses/warehouses-input/api-service'
import toasts from '@core/utils/toasts/toasts'
import router from '@/router/index'
import FileSaver from 'file-saver'
import moment from 'moment'
import {
  // GETTERS
  POCONFIRM_GETTER,
  POCONFIRM_DETAILS_GETTER,
  POCONFIRM_PROMO_DETAILS_GETTER,
  IMPORT_ADJUSTMENTS_GETTER,
  IMPORT_ADJUSTMENTS_DETAILS_GETTER,
  IMPORT_BORROWINGS_GETTER,
  IMPORT_BORROWINGS_DETAILS_GETTER,
  RECEIPTS_GETTER,
  RECEIPT_BY_ID_GETTER,
  PRODUCTS_BY_ID_GETTER,
  PROMOTIONS_BY_ID_GETTER,
  PRODUCTS_GETTER,
  NOT_IMPORT_REASONS_GETTER,
  PRINT_OUT_IN_PUT_ORDER_GETTER,
  STATUS_NOT_IMPORT_GETTER,
  WAREHOUSES_LIST_GETTER,
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
  GET_RECEIPT_BY_ID_ACTION,
  GET_PRODUCTS_BY_ID_ACTION,
  GET_PRODUCTS_ACTION,
  UPDATE_RECEIPT_ACTION,
  PRINT_WAREHOUSES_INPUT_ACTION,
  GET_NOT_IMPORT_REASONS_ACTION,
  PRINT_OUT_IN_PUT_ORDER_ACTION,
  GET_IMPORT_PO_CONFIRM_ACTION,
  GET_WAREHOUSES_LIST_ACTION,
  // mutations
  CLEAR_STATUS_NOT_IMPORT_MUTATION,
  CLEAR_GRID_VIEW_MUTATION,
  CLEAR_ADJUST_GRID_VIEW_MUTATION,
  CLEAR_BORROW_GRID_VIEW_MUTATION,
} from './type'

export default {
  namespaced: true,

  // START - STATE
  state: {
    poConfirm: [],
    poConfirmDetails: {},
    poConfirmPromoDetails: {},
    importAdjustments: [],
    importAdjustmentsDetails: {},
    importBorrowings: [],
    importBorrowingsDetails: {},
    receipts: [],
    receiptById: {},
    products: [],
    promotions: [],
    suggestProducts: [],
    warehousesType: {},
    notImportReasons: [],
    printOutInputOrderData: [],
    statusNotImport: {},
    warehousesList: [],
  },

  // START - GETTERS
  getters: {
    [POCONFIRM_GETTER](state) {
      return state.poConfirm
    },
    [POCONFIRM_DETAILS_GETTER](state) {
      return state.poConfirmDetails
    },
    [POCONFIRM_PROMO_DETAILS_GETTER](state) {
      return state.poConfirmPromoDetails
    },
    [IMPORT_ADJUSTMENTS_GETTER](state) {
      return state.importAdjustments
    },
    [IMPORT_ADJUSTMENTS_DETAILS_GETTER](state) {
      return state.importAdjustmentsDetails
    },
    [IMPORT_BORROWINGS_GETTER](state) {
      return state.importBorrowings
    },
    [IMPORT_BORROWINGS_DETAILS_GETTER](state) {
      return state.importBorrowingsDetails
    },
    [RECEIPTS_GETTER](state) {
      return state.receipts
    },
    [RECEIPT_BY_ID_GETTER](state) {
      return state.receiptById
    },
    [PRODUCTS_BY_ID_GETTER](state) {
      return state.products
    },
    [PROMOTIONS_BY_ID_GETTER](state) {
      return state.promotions
    },
    [PRODUCTS_GETTER](state) {
      return state.suggestProducts
    },
    [NOT_IMPORT_REASONS_GETTER](state) {
      return state.notImportReasons
    },
    [PRINT_OUT_IN_PUT_ORDER_GETTER](state) {
      return state.printOutInputOrderData
    },
    [STATUS_NOT_IMPORT_GETTER](state) {
      return state.statusNotImport
    },
    [WAREHOUSES_LIST_GETTER](state) {
      return state.warehousesList
    },
  },

  // START - MUTATIONS
  mutations: {
    [CLEAR_STATUS_NOT_IMPORT_MUTATION](state) {
      state.statusNotImport = {}
    },
    [CLEAR_GRID_VIEW_MUTATION](state) {
      state.poConfirmDetails = {}
      state.poConfirmPromoDetails = {}
    },
    [CLEAR_ADJUST_GRID_VIEW_MUTATION](state) {
      state.importAdjustmentsDetails = {}
    },
    [CLEAR_BORROW_GRID_VIEW_MUTATION](state) {
      state.importBorrowingsDetails = {}
    },
  },

  // START - ACTIONS
  actions: {
    [GET_POCONFIRMS_ACTION]({ state }, val) {
      ReceiptImportService
        .getPoConfirm(val)
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
            state.poConfirmDetails = res.data
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
            state.poConfirmPromoDetails = res.data
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
        .then(response => response.data)
        .then(res => {
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }
          const fileName = `Danh_sach_san_pham_PO_nhap hang_${moment().format('YYYYMMDD')}_${moment().locale('vi').format('hhmmss')}.xlsx`
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_IMPORT_ADJUSTMENTS_ACTION]({ state }, val) {
      ReceiptImportService
        .getImportAdjustments(val)
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
            state.importAdjustmentsDetails = res.data
            state.importAdjustmentsDetailInfo = res.data.info || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_IMPORT_BORROWINGS_ACTION]({ state }, val) {
      ReceiptImportService
        .getImportBorrowings(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.importBorrowings = res.data || []
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
            state.importBorrowingsDetails = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [UPDATE_NOT_IMPORT_ACTION]({ state }, val) {
      ReceiptImportService
        .updateNotImport(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.statusNotImport = res.success
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
            state.receipts = res.data
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
    [GET_RECEIPT_BY_ID_ACTION]({ state }, val) {
      ReceiptImportService
        .getReceiptImportById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.receiptById = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCTS_BY_ID_ACTION]({ state }, val) {
      ReceiptImportService
        .getProductsById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.products = res.data.response
            state.promotions = res.data.info
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCTS_ACTION]({ state }, val) {
      ReceiptImportService
        .getProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.suggestProducts = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [REMOVE_RECEIPT_ACTION]({ }, val) {
      ReceiptImportService
        .removeReceipt(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [UPDATE_RECEIPT_ACTION]({}, val) {
      ReceiptImportService
        .updateReceipt(val)
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
    [PRINT_WAREHOUSES_INPUT_ACTION]({}, val) {
      ReceiptImportService
        .printWarehouseInput(val)
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
          toasts.error(error.message)
        })
    },
    [GET_NOT_IMPORT_REASONS_ACTION]({ state }, val) {
      ReceiptImportService
        .getNotImportReasons(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.notImportReasons = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [PRINT_OUT_IN_PUT_ORDER_ACTION]({ state }, val) {
      ReceiptImportService
        .printOutInputOrder(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printOutInputOrderData = res.data || {}
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_IMPORT_PO_CONFIRM_ACTION]({ }, val) {
      ReceiptImportService
        .getImportPoConfirm(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            val.onSuccess(res.data)
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_WAREHOUSES_LIST_ACTION]({ state }, val) {
      ReceiptImportService
        .getWarehousesList(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehousesList = res.data
            val.onSuccess()
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
