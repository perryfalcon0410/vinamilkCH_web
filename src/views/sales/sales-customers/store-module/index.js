import CustomerService from '@/views/sales/sales-customers/api-service'
import {
  CUSTOMERS_GETTER,
  DELETE_CUSTOMERS_ACTION,
  GET_CUSTOMERS_ACTION,
  CREATE_CUSTOMER_ACTION,
  GET_SHOP_LOCATIONS_ACTION,
  SHOP_LOCATIONS_GETTER,
} from './type'

export default {
  namespaced: true,
  state: {
    customers: [],
    shopLocations: [],
  },
  getters: {
    [CUSTOMERS_GETTER](state) {
      return state.customers
    },
    [SHOP_LOCATIONS_GETTER](state) {
      return state.shopLocations
    },
  },
  mutations: {},
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
    [CREATE_CUSTOMER_ACTION]({ }, val) {
      CustomerService
        .createCustomer(val)
        .then(response => response.data)
        .then(res => {
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
    [DELETE_CUSTOMERS_ACTION]({ }, val) {
      CustomerService
        .deleteCustomers(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            // Temp
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
  },
}
