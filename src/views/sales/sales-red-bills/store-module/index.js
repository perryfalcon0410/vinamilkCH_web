import RedInvoiceService from '@/views/sales/sales-red-bills/api-service'
import {
  // GETTERS
  REDINVOICES_GETTER,
  ERROR_CODE_GETTER,
  CUSTOMERS_GETTER,
  GET_BILL_OF_SALES_GETTER,
  GET_BILL_OF_SALES_SELECTED_PRODUCTS_GETTER,
  // ACTIONS
  GET_REDINVOICES_ACTION,
  GET_CUSTOMERS_ACTION,
  GET_BILL_OF_SALES_ACTION,
  GET_BILL_OF_SALE_SELECTED_PRODUCT_ACTION,
  CLEAR_ALL_BILL_OF_SALES_PRODUCTS,
  CLEAR_BILL_OF_SALE_PRODUCTS_UNCHECKED,
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
  },

  // GETTERS
  getters: {
    [REDINVOICES_GETTER](state) {
      return {
        redInvoices: state.redInvoices,
        paging: state.paging,
        info: state.info,
      }
    },
    [GET_BILL_OF_SALES_GETTER](state) {
      return {
        billOfSales: state.billOfSales,
        billOfSalesPaging: state.billOfSalesPaging,
      }
    },
    [GET_BILL_OF_SALES_SELECTED_PRODUCTS_GETTER](state) {
      return state.products
    },
    [ERROR_CODE_GETTER](state) {
      return state.errorCode
    },
    [CUSTOMERS_GETTER](state) {
      return state.customers
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
    [GET_REDINVOICES_ACTION]({ state }, val) {
      RedInvoiceService
        .getRedInvoices(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.redInvoices = res.data.response.content || []
            state.paging = {
              pageable: res.data.response.pageable,
              totalPages: res.data.response.totalPages,
              totalElements: res.data.response.totalElements,
              last: res.data.response.last,
              numberOfElements: res.data.response.numberOfElements,
            }
            state.info = res.data.info
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
    [GET_BILL_OF_SALE_SELECTED_PRODUCT_ACTION]({ state }, val) {
      RedInvoiceService
        .getBillOfSaleProduct(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            const productTemp = []
            if (res.data) {
              res.data.forEach(item => {
                productTemp.push({
                  item,
                  orderCode: val.orderCode || '',
                })
              })
            }

            state.products = [
              ...state.products,
              ...productTemp,
            ]
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
            state.customers = res.data.content
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
