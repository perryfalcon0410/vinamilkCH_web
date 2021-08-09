import WareHouseComboService from '@/views/warehouses/warehouses-combo/api-service'
import toasts from '@core/utils/toasts/toasts'
import router from '@/router/index'
import {
  // getter
  GET_WAREHOUSE_COMBO_DETAIL_GETTER,
  WAREHOUSES_COMBO_GETTER,
  COMBO_PRODUCTS_GETTER,
  COMBO_PRODUCTS_DETAILS_GETTER,
  COMBO_PRODUCTS_INFO_GETTER,
  WAREHOUSES_TYPE_GETTER,

  // Action
  GET_WAREHOUSES_COMBO_ACTIONS,
  GET_WAREHOUSE_COMBO_DETAIL_ACTION,
  GET_COMBO_PRODUCTS_ACTION,
  GET_COMBO_PRODUCTS_DETAILS_ACTION,
  CREATE_COMBO_PRODUCT_ACTION,
  GET_WAREHOUSES_TYPE_ACTION,
} from './type'

export default {
  namespaced: true,
  state: {
    wareHouseComboDetail: {},
    warehousesComboData: [],
    warehousesComboPagination: {},
    totalInfo: {},
    comboProducts: [],
    comboProductsInfo: {},
    comboProductsDetails: [],
    warehouseTypes: [],
  },

  // getter
  getters: {
    [GET_WAREHOUSE_COMBO_DETAIL_GETTER](state) {
      return state.wareHouseComboDetail
    },
    [WAREHOUSES_COMBO_GETTER](state) {
      return state.warehousesComboData
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
    [WAREHOUSES_TYPE_GETTER](state) {
      return state.warehouseTypes
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
            state.warehousesComboData = res.data || {}
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
        .getComboProductsDetails(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.comboProductsInfo = res.data
            state.comboProductsDetails = res.data.details
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [CREATE_COMBO_PRODUCT_ACTION]({}, val) {
      WareHouseComboService
        .createComboProduct(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            router.push({ name: 'warehouses-combo' })
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_WAREHOUSES_TYPE_ACTION]({ state }, val) {
      WareHouseComboService
        .getWarehouseTypes(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehouseTypes = res.data
            val.onSuccess()
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
