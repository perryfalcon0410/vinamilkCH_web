import exchangeDamagedGoodsService from '@/views/warehouses/warehouses-exchange-damaged-goods/api-service/index'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  EXCHANGE_DAMAGED_GOODS_GETTER,
  EXCHANGE_DAMAGED_GOODS_REASONS_GETTER,
  EXCHANGE_DAMAGED_GOODS_BY_ID_GETTER,
  CUSTOMERS_GETTER,
  PRODUCTS_GETTER,
  // ACTIONS
  GET_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION,
  CREATE_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_EXCHANGE_DAMAGED_GOODS_BY_ID_ACTION,
  GET_CUSTOMERS_ACTION,
  GET_PRODUCTS_ACTION,
} from './type'

export default {
  namespaced: true,

  // STATE
  state: {
    exchangeDamagedGoods: [],
    exchangeDamagedGoodsReasons: [],
    exchangeDamagedGoodsById: {},
    customers: [],
    products: [],
  },
  // GETTERS
  getters: {
    [EXCHANGE_DAMAGED_GOODS_GETTER](state) {
      return state.exchangeDamagedGoods
    },
    [EXCHANGE_DAMAGED_GOODS_REASONS_GETTER](state) {
      return state.exchangeDamagedGoodsReasons
    },
    [EXCHANGE_DAMAGED_GOODS_REASONS_GETTER](state) {
      return state.exchangeDamagedGoodsReasons
    },
    [EXCHANGE_DAMAGED_GOODS_BY_ID_GETTER](state) {
      return state.exchangeDamagedGoodsById
    },
    [CUSTOMERS_GETTER](state) {
      return state.customers
    },
    [PRODUCTS_GETTER](state) {
      return state.products
    },
  },

  // MUTATIONS
  mutations: {},
  // ACTIONS
  actions: {
    // GET EXCHANGE DAMAGED GOODS
    [GET_EXCHANGE_DAMAGED_GOODS_ACTION]({ state }, val) {
      exchangeDamagedGoodsService
        .getExchangeDamagedGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.exchangeDamagedGoods = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - GET EXCHANGE DAMAGED GOODS

    // GET EXCHANGE DAMAGED GOODS BY ID
    [GET_EXCHANGE_DAMAGED_GOODS_BY_ID_ACTION]({ state }, val) {
      exchangeDamagedGoodsService
        .getExchangeDamagedGoodsById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.exchangeDamagedGoodsById = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - GET EXCHANGE DAMAGED GOODS BY ID

    // GET EXCHANGE DAMAGED GOODS REASONS
    [GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION]({ state }) {
      exchangeDamagedGoodsService
        .getExchangeDamagedGoodsReasons()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.exchangeDamagedGoodsReasons = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - GET EXCHANGE DAMAGED GOODS REASONS
    [CREATE_EXCHANGE_DAMAGED_GOODS_ACTION]({}, val) {
      exchangeDamagedGoodsService
        .createExchangeDamagedGoods(val.damagedGoodsData)
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

    // GET CUSTOMERS
    [GET_CUSTOMERS_ACTION]({ state }, val) {
      exchangeDamagedGoodsService
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
    // END - GET CUSTOMERS

    // GET PRODUCTS
    [GET_PRODUCTS_ACTION]({ state }, val) {
      exchangeDamagedGoodsService
        .getProducts(val)
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
    // END - GET PRODUCTS
  },
}
