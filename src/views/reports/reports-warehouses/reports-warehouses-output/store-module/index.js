import outputGoodsService from '@/views/reports/reports-warehouses/reports-warehouses-output/api-service/index'
import toasts from '@/@core/utils/toasts/toasts'

import {
  // GETTERS
  OUTPUT_GOODS_GETTER,

  // ACTIONS
  GET_OUTPUT_GOODS_ACTION,
} from './type'

export default {
  namespaced: true,

  // STATE
  state: {
    outputGoods: [],
  },

  // GETTERS
  getters: {
    [OUTPUT_GOODS_GETTER](state) {
      return state.outputGoods
    },
  },

  // ACTIONS
  actions: {
    // GET OUTPUT GOODS
    [GET_OUTPUT_GOODS_ACTION]({ state }, val) {
      outputGoodsService
        .getOutputGoods(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.outputGoods = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    // END - GET OUTPUT GOODS
  },
}
