import exchangeDamagedGoodsService from '@/views/warehouses/warehouses-exchange-damaged-goods/api-service/index'
import toasts from '@core/utils/toasts/toasts'
import commonData from '@/@db/common'
import {
  // GETTERS
  EXCHANGE_DAMAGED_GOODS_GETTER,
  EXCHANGE_DAMAGED_GOODS_REASONS_GETTER,
  EXCHANGE_DAMAGED_GOODS_BY_ID_GETTER,
  CUSTOMERS_GETTER,
  PRODUCTS_GETTER,
  DAMAGED_GOODS_GETTER,
  UPDATE_PRICE_PRODUCT_GETTER,
  // ACTIONS
  GET_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION,
  CREATE_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_EXCHANGE_DAMAGED_GOODS_BY_ID_ACTION,
  GET_CUSTOMERS_ACTION,
  GET_PRODUCTS_ACTION,
  UPDATE_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_DAMAGED_GOODS_ACTION,
  REMOVE_EXCHANGE_DAMAGED_GOODS_ACTION,
  UPDATE_PRICE_PRODUCT_ACTION,
} from './type'

export default {
  namespaced: true,

  // STATE
  state: {
    exchangeDamagedGoods: [],
    exchangeDamagedGoodsReasons: [],
    exchangeDamagedGoodsById: {},
    damagedGoodsById: {},
    customers: [],
    products: [],
    customerTypeProducts: [],
  },
  // GETTERS
  getters: {
    [EXCHANGE_DAMAGED_GOODS_GETTER](state) {
      return state.exchangeDamagedGoods
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
    [DAMAGED_GOODS_GETTER](state) {
      return state.damagedGoodsById
    },
    [UPDATE_PRICE_PRODUCT_GETTER](state) {
      return state.customerTypeProducts
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
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
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
            state.exchangeDamagedGoodsById = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
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
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
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
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
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
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
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
            state.products = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    // END - GET PRODUCTS

    // REMOVE DAMAGED GOODS BY ID
    [REMOVE_EXCHANGE_DAMAGED_GOODS_ACTION]({}, val) {
      exchangeDamagedGoodsService
        .removeExchangeDamagedGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    // END - REMOVE DAMAGED GOODS BY ID

    // START UPDATE EXCHANGE GOODS
    [UPDATE_EXCHANGE_DAMAGED_GOODS_ACTION]({}, val) {
      exchangeDamagedGoodsService
        .updateExchangeDamagedGoods(val.exchangeDamagedGoods)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    // END UPDATE EXCHANGE GOODS

    // GET DAMAGED GOODS BY ID
    [GET_DAMAGED_GOODS_ACTION]({ state }, val) {
      exchangeDamagedGoodsService
        .getExchangeDamagedGoodsById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.damagedGoodsById = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    // END - GET DAMAGED GOODS BY ID
    [UPDATE_PRICE_PRODUCT_ACTION]({ state }, val) {
      exchangeDamagedGoodsService
        .updatePriceProduct(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.customerTypeProducts = res.data.products
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },

  },
}
