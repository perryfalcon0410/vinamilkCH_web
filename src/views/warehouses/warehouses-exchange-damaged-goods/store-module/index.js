import ExchangeDamagedGoodsService from '@/views/warehouses/warehouses-exchange-damaged-goods/api-service/index'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  EXCHANGE_DAMAGED_GOODS_GETTER,
  EXCHANGE_DAMAGED_GOODS_PAGINATION_GETTER,
  // ACTIONS
  GET_EXCHANGE_DAMAGED_GOODS_ACTION,
} from './type'

export default {
  namespaced: true,

  // STATE
  state: {
    exchangeDamagedGoods: [],
    exchangeDamagedGoodsPagination: {},
  },

  // GETTERS
  getters: {
    [EXCHANGE_DAMAGED_GOODS_GETTER](state) {
      return state.exchangeDamagedGoods
    },
    [EXCHANGE_DAMAGED_GOODS_PAGINATION_GETTER](state) {
      return state.exchangeDamagedGoodsPagination
    },
  },

  // MUTATIONS
  mutations: {},

  // ACTIONS
  actions: {
    // GET EXCHANGE DAMAGED GOODS
    [GET_EXCHANGE_DAMAGED_GOODS_ACTION]({ state }, val) {
      ExchangeDamagedGoodsService
        .getExchangeDamagedGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.exchangeDamagedGoods = res.data.content || []
            state.exchangeDamagedGoodsPagination = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - GET EXCHANGE DAMAGED GOODS
  },
}
