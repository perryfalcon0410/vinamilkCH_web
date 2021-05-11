import WareHouseComboService from '@/views/warehouses/warehouses-combo/api-service'
import toasts from '@core/utils/toasts/toasts'

import {
  // getter
  GET_WAREHOUSE_COMBO_DETAIL_GETTER,

  // Action
  GET_WAREHOUSE_COMBO_DETAIL_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    wareHouseComboDetail: {},
  },
  getters: {
    [GET_WAREHOUSE_COMBO_DETAIL_GETTER](state) {
      return state.wareHouseComboDetail
    },
  },
  mutations: {},
  actions: {
    [GET_WAREHOUSE_COMBO_DETAIL_ACTION]({ state }, val) {
      WareHouseComboService
        .getWareHouseComboDetail(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.wareHouseComboDetail = res.data || {}
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
