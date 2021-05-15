import WareHouseComboService from '@/views/warehouses/warehouses-combo/api-service'
import toasts from '@core/utils/toasts/toasts'

import {
  // getter
  GET_WAREHOUSE_COMBO_DETAIL_GETTER,
  WAREHOUSES_COMBO_GETTER,
  WAREHOUSES_COMBO_PAGINATION_GETTER,
  WAREHOUSES_COMBO_TOTAL_INFO_GETTER,
  COMBO_PRODUCTS_GETTER,
  COMBO_PRODUCTS_DETAILS_GETTER,
  COMBO_PRODUCTS_INFO_GETTER,

  // Action
  GET_WAREHOUSES_COMBO_ACTIONS,
  GET_WAREHOUSE_COMBO_DETAIL_ACTION,
  GET_COMBO_PRODUCTS_ACTION,
  GET_COMBO_PRODUCTS_DETAILS_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    wareHouseComboDetail: {},
    warehousesComboLists: [],
    warehousesComboPagination: {},
    totalInfo: {},
    comboProducts: [],
    comboProductsInfo: {},
    comboProductsDetails: [],
  },

  // getter
  getters: {
    [GET_WAREHOUSE_COMBO_DETAIL_GETTER](state) {
      return state.wareHouseComboDetail
    },
    [WAREHOUSES_COMBO_GETTER](state) {
      return state.warehousesComboLists
    },
    [WAREHOUSES_COMBO_PAGINATION_GETTER](state) {
      return state.warehousesComboPagination
    },
    [WAREHOUSES_COMBO_TOTAL_INFO_GETTER](state) {
      return state.totalInfo
    },
    [COMBO_PRODUCTS_GETTER](state) {
      return state.comboProducts
    },
    [COMBO_PRODUCTS_DETAILS_GETTER](state) {
      return state.comboProductsDetails
    },
    [COMBO_PRODUCTS_INFO_GETTER](state) {
      return state.comboProductsInfo
    },
  },

  // mutations
  mutations: {},

  // actions
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
    [GET_WAREHOUSES_COMBO_ACTIONS]({ state }, val) {
      WareHouseComboService
        .getWarehousesCombo(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehousesComboLists = res.data.response.content || []
            state.warehousesComboPagination = res.data.response || {}
            state.totalInfo = res.data.info || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_COMBO_PRODUCTS_ACTION]({ state }, val) {
      WareHouseComboService
        .getComboProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.comboProducts = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_COMBO_PRODUCTS_DETAILS_ACTION]({ state }, val) {
      WareHouseComboService
        .getComboProductsDetails(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.comboProductsInfo = res.data
            state.comboProductsDetails = res.data.details
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
