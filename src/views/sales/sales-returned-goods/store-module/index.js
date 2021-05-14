import OderReturnService from '@/views/sales/sales-returned-goods/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import router from '@/router/index'

import {
  // GETTERS
  RETURNED_GOODS_GETTER,
  RETURNED_GOOD_CHOOSE_GETTER,
  RETURNED_GOOD_CHOOSEN_DETAIL_GETTER,
  RETURN_GOODS_DETAIL_PRODUCTS_GETTER,
  RETURN_GOODS_DETAIL_SALES_OFF_GETTER,
  RETURN_GOODS_DETAIL_TOTAL_INFO_GETTER,

  // ACTIONS
  GET_RETURNED_GOODS_ACTION,
  GET_RETURNED_GOOD_CHOOSE_ACTION,
  GET_RETURNED_GOOD_CHOOSEN_DETAIL_ACTION,
  CREATE_RETURNED_GOOD_ACTION,
  GET_RETURN_GOODS_DETAIL_ACTION,
  // MUTATION
  CLEAR_RETURNED_GOODS_MUTATION,
} from './type'

export default {
  namespaced: true,
  state: {
    oderReturns: [],
    saleOders: [],
    saleOdersInfo: {},
    products: [],
    info: {},
    paging: {},
    promotions: [],
    reasonReturn: [],
    productReturns: [],
    promotionReturns: [],
    totalInfo: {},
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
        saleOdersInfo: state.saleOdersInfo,
      }
    },
    [RETURNED_GOOD_CHOOSEN_DETAIL_GETTER](state) {
      return {
        products: state.products,
        reasonReturn: state.reasonReturn,
        promotions: state.promotions,
      }
    },
    // reutrn goods detail
    [RETURN_GOODS_DETAIL_PRODUCTS_GETTER](state) {
      return state.productReturns
    },
    [RETURN_GOODS_DETAIL_SALES_OFF_GETTER](state) {
      return state.promotionReturns
    },
    [RETURN_GOODS_DETAIL_TOTAL_INFO_GETTER](state) {
      return state.totalInfos
    },
  },
  // MUTATIONS
  mutations: {
    [CLEAR_RETURNED_GOODS_MUTATION](state) {
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
            state.saleOders = res.data.response || []
            state.saleOdersInfo = res.data.info || {}
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

    // START - RETURN GOODS DETAIL
    [GET_RETURN_GOODS_DETAIL_ACTION]({ state }, val) {
      OderReturnService
        .getReturnGoodDetail(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productReturns = res.data.productReturn || []
            state.promotionReturns = res.data.promotionReturn || []
            state.totalInfo = res.data.infos || {}
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
