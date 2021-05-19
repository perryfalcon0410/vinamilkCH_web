import DifferencePriceServices from '@/views/reports/reports-warehouses/report-warehouses-price-difference/api-service/index'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER,
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_PRODUCT_CATS_GETTER,
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_PRODUCT_CATS_ACTION,
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_ACTION,
} from './type'

export default {
  namespaced: true,

  state: {
    differencePrices: [],
    paging: {},
    info: {},
    cats: [],
    products: [],
  },

  getters: {
    [GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER](state) {
      return {
        differencePrices: state.differencePrices,
        info: state.info,
        paging: state.paging,
      }
    },
    [GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_PRODUCT_CATS_GETTER](state) {
      return state.cats
    },
    [GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_GETTER](state) {
      return state.products
    },
  },

  mutations: {},

  actions: {
    [GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION]({ state }, val) {
      DifferencePriceServices
        .getDifferencePrice(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.differencePrices = res.data.response.content || []
            state.info = res.data.info
            state.paging = {
              pageable: res.data.response.pageable,
              totalPages: res.data.response.totalPages,
              totalElements: res.data.response.totalElements,
              last: res.data.response.last,
              numberOfElements: res.data.response.numberOfElements,
            }
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_PRODUCT_CATS_ACTION]({ state }, val) {
      DifferencePriceServices
        .getDifferencePriceProductCats(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.cats = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_ACTION]({ state }, val) {
      DifferencePriceServices
        .getDifferencePriceChooseProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.products = res.data.content || []
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
