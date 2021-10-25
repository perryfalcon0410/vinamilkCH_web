import OderReturnService from '@/views/sales/sales-returned-goods/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import router from '@/router/index'
import { notificationResponseMessage } from '@core/utils/utils'

import {
  // GETTERS
  RETURNED_GOODS_GETTER,
  RETURNED_GOOD_CHOOSE_GETTER,
  RETURNED_GOOD_CHOOSEN_DETAIL_GETTER,
  RETURN_GOODS_DETAIL_GETTER,
  REASON_RETURN_GOODS_GETTER,

  // ACTIONS
  GET_RETURNED_GOODS_ACTION,
  GET_RETURNED_GOOD_CHOOSE_ACTION,
  GET_RETURNED_GOOD_CHOOSEN_DETAIL_ACTION,
  CREATE_RETURNED_GOOD_ACTION,
  GET_RETURN_GOODS_DETAIL_ACTION,
  GET_REASON_RETURN_GOODS_ACTION,
  // MUTATION
  CLEAR_RETURNED_GOODS_MUTATION,
} from './type'

export default {
  namespaced: true,
  state: {
    orderReturnData: {},
    saleOders: [],
    salesOrderData: {},
    chooseProductData: {},
    productDetailData: {},
    reasonType: [],
  },
  getters: {
    [RETURNED_GOODS_GETTER](state) {
      return state.orderReturnData
    },
    [RETURNED_GOOD_CHOOSE_GETTER](state) {
      return state.salesOrderData
    },
    [RETURNED_GOOD_CHOOSEN_DETAIL_GETTER](state) {
      return state.chooseProductData
    },
    // reutrn goods detail
    [RETURN_GOODS_DETAIL_GETTER](state) {
      return state.productDetailData
    },
    [REASON_RETURN_GOODS_GETTER](state) {
      return state.reasonType
    },
  },
  // MUTATIONS
  mutations: {
    [CLEAR_RETURNED_GOODS_MUTATION](state) {
      state.orderReturnData = {}
      state.saleOders = []
      state.products = []
      state.info = {}
      state.paging = {}
      state.promotions = []
      state.reasonReturn = []
      state.chooseProductData = {}
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
            state.orderReturnData = res.data || {}
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    // END - GET RETURN GOODS

    // START - GET SALE ODERS
    [GET_RETURNED_GOOD_CHOOSE_ACTION]({ state }, val) {
      OderReturnService
        .getSaleOrders(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.salesOrderData = res.data
            val.onSuccess()
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
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
            state.chooseProductData = res.data || {}
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
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
            toasts.success(notificationResponseMessage(res.statusCode, res.statusValue))
            router.push({ name: 'sales-returned-goods' })
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },
    // END - CREATE_SALE_ODER

    // START - RETURN GOODS DETAIL
    [GET_RETURN_GOODS_DETAIL_ACTION]({ state }, val) {
      OderReturnService
        .getReturnGoodDetail(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productDetailData = res.data || {}
            val.onSuccess()
          } else {
            toasts.error(notificationResponseMessage(res.statusCode, res.statusValue))
          }
        })
        .catch(error => {
          toasts.error(notificationResponseMessage(null, error.message))
        })
    },

    [GET_REASON_RETURN_GOODS_ACTION]({ state }, val) {
      OderReturnService
        .getReasonReturnGoods(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.reasonType = res.data
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
