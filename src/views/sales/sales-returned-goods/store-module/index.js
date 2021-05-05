import OderReturnService from '@/views/sales/sales-returned-goods/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import router from '@/router/index'

import {
  // GETTERS
  RETURNED_GOODS_GETTER,
  RETURNED_GOOD_CHOOSE_GETTER,
  RETURNED_GOOD_CHOOSEN_DETAIL_GETTER,
  // ACTIONS
  GET_RETURNED_GOODS_ACTION,
  GET_RETURNED_GOOD_CHOOSE_ACTION,
  GET_RETURNED_GOOD_CHOOSEN_DETAIL_ACTION,
  CREATE_RETURNED_GOOD_ACTION,
  // MUTATION
  CLEAR_RETURNED_GOODS_DATA,
} from './type'

export default {
  namespaced: true,
  state: {
    oderReturns: [],
    saleOders: [],
    products: [],
    info: {},
    paging: {},
    promotions: [],
    reasonReturn: [],
  },
  getters: {
    [RETURNED_GOODS_GETTER](state) {
      return {
        oderReturns: state.oderReturns,
        info: state.info,
        paging: state.paging,
      }
    },
    [RETURNED_GOOD_CHOOSE_GETTER](state) {
      return {
        saleOders: state.saleOders,
      }
    },
    [RETURNED_GOOD_CHOOSEN_DETAIL_GETTER](state) {
      return {
        products: state.products,
        reasonReturn: state.reasonReturn,
        promotions: state.promotions,
      }
    },
  },
  // MUTATIONS
  mutations: {
    [CLEAR_RETURNED_GOODS_DATA](state) {
      state.oderReturns = []
      state.saleOders = []
      state.products = []
      state.info = {}
      state.paging = {}
      state.promotions = []
      state.reasonReturn = []
    },
  },
  actions: {
    // START - GET RETURN GOODS
    [GET_RETURNED_GOODS_ACTION]({ state }, val) {
      OderReturnService
        .getOrderReturnedGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.oderReturns = res.data.response.content || []
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
    // END - GET RETURN GOODS

    // START - GET SALE ODERS
    [GET_RETURNED_GOOD_CHOOSE_ACTION]({ state }, val) {
      OderReturnService
        .getSaleOrders(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.saleOders = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - GET SALE ODERS

    // START - GET SALE ODERS DETAIL
    [GET_RETURNED_GOOD_CHOOSEN_DETAIL_ACTION]({ state }, val) {
      OderReturnService
        .getSaleOrderDetail(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.products = res.data.productReturn || []
            state.promotions = res.data.promotionReturn || []
            state.reasonReturn = res.data.reasonReturn || []
          } else {
            state.products = []
            state.promotions = []
            state.reasonReturn = []
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - GET SALE ODERS DETAIL
    // START - CREATE_SALE_ODER
    [CREATE_RETURNED_GOOD_ACTION]({ }, val) {
      OderReturnService
        .createOrderReturn(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            router.push({ name: 'sales-returned-goods' })
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - CREATE_SALE_ODER
  },
}
