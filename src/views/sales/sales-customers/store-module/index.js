import CustomerService from '@/views/sales/sales-customers/api-service'
import {
  // GETTERS
  CUSTOMERS_GETTER,
  SHOP_LOCATIONS_GETTER,
  ERROR_CODE_GETTER,
  CUSTOMER_TYPES_GETTER,
  PROVINCES_GETTER,
  DISTRICTS_GETTER,
  PRECINCTS_GETTER,
  // ACTIONS
  DELETE_CUSTOMERS_ACTION,
  GET_CUSTOMERS_ACTION,
  CREATE_CUSTOMER_ACTION,
  GET_SHOP_LOCATIONS_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
  GET_PROVINCES_ACTION,
  GET_DISTRICTS_ACTION,
  GET_PRECINCTS_ACTION,

} from './type'

export default {
  namespaced: true,
  // STATE
  state: {
    customers: [],
    shopLocations: [],
    customerTypes: [],
    provinces: [],
    districts: [],
    precincts: [],
    errorCode: null,
  },

  // GETTERS
  getters: {
    [CUSTOMERS_GETTER](state) {
      return state.customers
    },
    [CUSTOMER_TYPES_GETTER](state) {
      return state.customerTypes
    },
    [SHOP_LOCATIONS_GETTER](state) {
      return state.shopLocations
    },
    [ERROR_CODE_GETTER](state) {
      return state.errorCode
    },
    [PROVINCES_GETTER](state) {
      return state.provinces
    },
    [DISTRICTS_GETTER](state) {
      return state.districts
    },
    [PRECINCTS_GETTER](state) {
      return state.precincts
    },
  },

  // MUTATIONS
  mutations: {},

  // ACTIONS
  actions: {
    [GET_CUSTOMERS_ACTION]({ state }, val) {
      CustomerService
        .getCustomers(val)
        .then(response => response.data)
        .then(res => {
          console.log(res)

          if (res.success) {
            state.customers = res.data.content
          } else {
            // Temp
            console.log(res)
          }
        })
        .catch(error => {
          // Temp
          console.log(error)
        })
    },
    [CREATE_CUSTOMER_ACTION]({ state }, val) {
      CustomerService
        .createCustomer(val)
        .then(response => response.data)
        .then(res => {
          state.errorCode = res.statusCode
          if (res.success) {
            // Temp
            console.log('Temp')
          } else {
            // Temp
            console.log('Temp')
          }
        })
        .catch(error => {
          // Temp
          console.log(error)
        })
    },
    [DELETE_CUSTOMERS_ACTION]({ dispatch }, val) {
      CustomerService
        .deleteCustomers(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            dispatch(GET_CUSTOMERS_ACTION, '')
            console.log('Temp')
          } else {
            // Temp
            console.log('Temp')
          }
        })
        .catch(() => {
          // Temp
          console.log('Temp')
        })
    },
    [GET_SHOP_LOCATIONS_ACTION]({ state }, val) {
      CustomerService
        .getShopLocations(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.shopLocations = res.data
          } else {
            // Temp
            console.log(res)
          }
        })
        .catch(() => {
          // Temp
          console.log('Temp')
        })
    },
    [GET_CUSTOMER_TYPES_ACTION]({ state }) {
      CustomerService
        .getCustomerTypes()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.customerTypes = res.data
          } else {
            // Temp
            console.log(res)
          }
        })
        .catch(() => {
          // Temp
          console.log('Temp')
        })
    },
    [GET_PROVINCES_ACTION]({ state }) {
      CustomerService
        .getProvinces()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.provinces = res.data
          } else {
            // Temp
            console.log(res)
          }
        })
        .catch(() => {
          // Temp
          console.log('Temp')
        })
    },
    [GET_DISTRICTS_ACTION]({ state }, val) {
      CustomerService
        .getDistricts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.districts = res.data
          } else {
            // Temp
            console.log(res)
          }
        })
        .catch(() => {
          // Temp
          console.log('Temp')
        })
    },
    [GET_PRECINCTS_ACTION]({ state }, val) {
      CustomerService
        .getPrecincts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.precincts = res.data
          } else {
            // Temp
            console.log(res)
          }
        })
        .catch(() => {
          // Temp
          console.log('Temp')
        })
    },
  },
}
