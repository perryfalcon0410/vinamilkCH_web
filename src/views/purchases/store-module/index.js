import PoAutoService from '@/views/purchases/api-service'
import {
  // GETTER
  GET_PO_LIST_GETTER,
  GET_PO_SEARCH_LIST_GETTER,
  GET_PO_AUTO_PRODUCT_GETTER,
  POST_CANCEL_PO_GETTER,
  POST_APPROVE_PO_GETTER,

  // ACTIONS
  GET_PO_LIST_ACTION,
  GET_PO_SEARCH_LIST_ACTION,
  GET_PO_AUTO_PRODUCT_ACTION,
  POST_CANCEL_PO_ACTION,
  POST_APPROVE_PO_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    poList: [],
    poDetailProduct: [],
    poAutoCancle: 0,
    poAutoApprove: 0,
  },
  getters: {
    [GET_PO_LIST_GETTER](state) {
      return state.poList
    },
    [GET_PO_SEARCH_LIST_GETTER](state) {
      return state.poList
    },
    [GET_PO_AUTO_PRODUCT_GETTER](state) {
      return state.poDetailProduct
    },
    [POST_CANCEL_PO_GETTER](state) {
      return state.poAutoCancle
    },
    [POST_APPROVE_PO_GETTER](state) {
      return state.poAutoApprove
    },
  },
  mutations: {},
  actions: {
    [GET_PO_LIST_ACTION]({ state }) {
      PoAutoService
        .getAllPoAuto()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.poList = res.data
          }
        })
    },

    [GET_PO_SEARCH_LIST_ACTION]({ state }, val) {
      PoAutoService
        .getSearchPoAuto(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.poList = res.data
          }
        })
    },

    [GET_PO_AUTO_PRODUCT_ACTION]({ state }, val) {
      PoAutoService
        .getPoAutoDetailProduct(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.poDetailProduct = res.data
          }
        })
    },

    [POST_CANCEL_PO_ACTION]({ state }, val) {
      PoAutoService
        .cancelPoAuto(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.poAutoCancle += res.data
          }
        })
    },

    [POST_APPROVE_PO_ACTION]({ state }, val) {
      PoAutoService
        .approvePoAUto(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.poAutoApprove += res.data
          }
        })
    },
  },
}
