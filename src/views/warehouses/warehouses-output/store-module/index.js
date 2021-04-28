import WarehousesService from '@/views/warehouses/warehouses-output/api-service'
import FileSaver from 'file-saver'
import router from '@/router/index'
import {
  // GETTERS
  GET_WAREHOUSES_OUTPUT_LIST_GETTER,
  GET_WAREHOUSES_OUTPUT_BY_ID_GETTER,
  GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_GETTER,
  // ACTIONS
  GET_WAREHOUSES_OUTPUT_LIST_ACTION,
  PRINT_WAREHOUSES_OUTPUT_ACTION,
  GET_WAREHOUSES_OUTPUT_BY_ID_ACTION,
  GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION,
  UPDATE_WAREHOUSES_OUTPUT_ACTION,
} from './type'
import toasts from '../../../../@core/utils/toasts/toasts'

export default {
  namespaced: true,
  // STATE
  state: {
    warehousesOutputs: [],
    warehousesOutput: {},
    products: [], // list product of warehouses output
  },

  // GETTERS
  getters: {
    [GET_WAREHOUSES_OUTPUT_LIST_GETTER](state) {
      return state.warehousesOutputs
    },
    [GET_WAREHOUSES_OUTPUT_BY_ID_GETTER](state) {
      return state.warehousesOutput
    },
    [GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_GETTER](state) {
      return state.products
    },
  },

  // MUTATIONS
  mutations: {},

  // ACTIONS
  actions: {
    [GET_WAREHOUSES_OUTPUT_LIST_ACTION]({ state }, val) {
      WarehousesService
        .getWarehouseOutputs(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehousesOutputs = res.data.response.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [PRINT_WAREHOUSES_OUTPUT_ACTION]({ }, val) {
      const fileName = `${val.transCode}.pdf`
      WarehousesService
        .printWarehouseOutput(val)
        .then(response => response.data)
        .then(res => {
          const blob = new Blob([res], { type: 'application/pdf' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_WAREHOUSES_OUTPUT_BY_ID_ACTION]({ state }, val) {
      WarehousesService
        .getWarehouseOutputById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.warehousesOutput = res.data || {}
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION]({ state }, val) {
      WarehousesService
        .getProductsOfWarehouseOutput(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.products = res.data.response || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [UPDATE_WAREHOUSES_OUTPUT_ACTION]({}, val) {
      WarehousesService
        .updateWarehouseOutput(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            router.push({ name: 'warehouses-output-list' })
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
