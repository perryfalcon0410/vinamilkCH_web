import RedInvoiceService from '@/views/sales/sales-red-bills/api-service'
import {
  // GETTERS
  RED_INVOICES_GETTER,
  ERROR_CODE_GETTER,
  CUSTOMERS_GETTER,
  GET_BILL_OF_SALES_GETTER,
  GET_PRODUCTS_IN_SELECTED_BILL_GETTER,
  PRODUCTS_GETTER,
  GET_INVOICE_DETAIL_GETTER,
  GET_INVOICE_DETAIL_INFO_GETTER,
  // ACTIONS
  GET_RED_INVOICES_ACTION,
  GET_CUSTOMERS_ACTION,
  GET_BILL_OF_SALES_ACTION,
  GET_PRODUCTS_IN_SELECTED_BILL_ACTION,
  CLEAR_ALL_BILL_OF_SALES_PRODUCTS,
  CLEAR_BILL_OF_SALE_PRODUCTS_UNCHECKED,
  GET_PRODUCTS_ACTION,
  CREATE_RED_BILL_ACTION,
  GET_INVOICE_DETAIL_ACTION,
  DELETE_RED_INVOICE_ACTION,
  EXPORT_RED_BILLS_ACTION,
  UPDATE_RED_BILLS_ACTION,
} from './type'
import toasts from '../../../../@core/utils/toasts/toasts'

export default {
  namespaced: true,
  // STATE
  state: {
    redInvoices: [],
    errorCode: null,
    customers: [],
    paging: {},
    info: {},
    billOfSales: [],
    billOfSalesPaging: [],
    products: [],
    productOfBills: [],
    invoiceDetail: {},
    invoiceDetailInfo: {},
  },

  // GETTERS
  getters: {
    [RED_INVOICES_GETTER](state) {
      return state.redInvoices
    },
    [GET_BILL_OF_SALES_GETTER](state) {
      return {
        billOfSales: state.billOfSales,
        billOfSalesPaging: state.billOfSalesPaging,
      }
    },
    [GET_PRODUCTS_IN_SELECTED_BILL_GETTER](state) {
      return state.productOfBills
    },
    [ERROR_CODE_GETTER](state) {
      return state.errorCode
    },
    [CUSTOMERS_GETTER](state) {
      return state.customers
    },
    [PRODUCTS_GETTER](state) {
      return state.products
    },
    [GET_INVOICE_DETAIL_GETTER](state) {
      return state.invoiceDetail
    },
    [GET_INVOICE_DETAIL_INFO_GETTER](state) {
      return state.invoiceDetailInfo
    },
  },

  // MUTATIONS
  mutations: {
    [CLEAR_BILL_OF_SALE_PRODUCTS_UNCHECKED](state, val) {
      state.products = state.products.filter(item => item.orderCode !== val)
    },
    [CLEAR_ALL_BILL_OF_SALES_PRODUCTS](state) {
      state.products = []
    },
  },

  // ACTIONS
  actions: {
    [GET_RED_INVOICES_ACTION]({ state }, val) {
      RedInvoiceService
        .getRedInvoices(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.redInvoices = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_BILL_OF_SALES_ACTION]({ state }, val) {
      RedInvoiceService
        .getBillOfSales(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.billOfSales = res.data.content || []
            state.billOfSalesPaging = {
              totalPages: res.data.totalPages,
              totalElements: res.data.totalElements,
              last: res.data.last,
              numberOfElements: res.data.numberOfElements,
            }
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCTS_IN_SELECTED_BILL_ACTION]({ state }, val) {
      RedInvoiceService
        .getBillOfSaleProduct(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productOfBills = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_CUSTOMERS_ACTION]({ state }, val) {
      RedInvoiceService
        .getCustomers(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.customers = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCTS_ACTION]({ state }, val) {
      RedInvoiceService
        .getProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.products = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [CREATE_RED_BILL_ACTION]({}, val) {
      RedInvoiceService
        .createRedBill(val.paramsCreateRedInvoice)
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
    [GET_INVOICE_DETAIL_ACTION]({ state }, val) {
      RedInvoiceService
        .getInvoiceDetail(val.orderCodeList)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.invoiceDetail = res.data || {}
            val.onSuccess(state.invoiceDetail)
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [DELETE_RED_INVOICE_ACTION]({}, val) {
      RedInvoiceService
        .deleteRedBill(val)
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
    [EXPORT_RED_BILLS_ACTION]({}, val) {
      RedInvoiceService
        .exportRedBills(val)
        .then(res => {
          if (res.status === 200 && res.data != null) {
            const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' })
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, 'Hoa_don_do_Filled')
            } else {
              const elem = window.document.createElement('a')
              elem.href = window.URL.createObjectURL(blob)
              elem.download = 'Hoa_don_do_Filled'
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
    [UPDATE_RED_BILLS_ACTION]({}, val) {
      RedInvoiceService
        .updateRedBills(val.redInvoiceRequests)
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
  },
}
