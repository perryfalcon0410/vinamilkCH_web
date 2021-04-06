import CustomerService from '@/views/sales/sales-customers/api-service'
import {
  // GETTERS
  CUSTOMERS_GETTER,
  CUSTOMER_BY_ID_GETTER,
  SHOP_LOCATIONS_GETTER,
  ERROR_CODE_GETTER,
  CUSTOMER_TYPES_GETTER,
  PROVINCES_GETTER,
  DISTRICTS_GETTER,
  PRECINCTS_GETTER,
  MEMBER_CARDS_GETTER,
  CARD_TYPES_GETTER,
  CLOSELY_TYPES_GETTER,
  // ACTIONS
  GET_CUSTOMERS_ACTION,
  GET_CUSTOMER_BY_ID_ACTION,
  CREATE_CUSTOMER_ACTION,
  UPDATE_CUSTOMER_ACTION,
  GET_SHOP_LOCATIONS_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
  GET_PROVINCES_ACTION,
  GET_DISTRICTS_ACTION,
  GET_PRECINCTS_ACTION,
  GET_MEMBER_CARDS_ACTION,
  GET_CARD_TYPES_ACTION,
  GET_CLOSELY_TYPES_ACTION,

} from './type'

export default {
  namespaced: true,
  // STATE
  state: {
    errorCode: null,

    customers: [],
    customerById: {},
    shopLocations: [],
    customerTypes: [],
    provinces: [],
    districts: [],
    precincts: [],
    memberCards: [],
    cardTypes: [],
    closelyTypes: [],
  },

  // GETTERS
  getters: {
    [CUSTOMERS_GETTER](state) {
      return state.customers
    },
    [CUSTOMER_BY_ID_GETTER](state) {
      return state.customerById
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
    [MEMBER_CARDS_GETTER](state) {
      return state.memberCards
    },
    [CARD_TYPES_GETTER](state) {
      return state.cardTypes
    },
    [CLOSELY_TYPES_GETTER](state) {
      return state.closelyTypes
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
          if (res.success) {
            state.customers = res.data.content
          } else {
            // Temp

          }
        })
        .catch(() => {
          // Temp
        })
    },
    [GET_CUSTOMER_BY_ID_ACTION]({ state }, val) {
      CustomerService
        .getCustomerById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.customerById = res.data
            console.log(res.data)
          } else {
            // Temp
          }
        })
        .catch(() => {
          // Temp
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
          } else {
            // Temp
          }
        })
        .catch(() => {
          // Temp
        })
    },
    [UPDATE_CUSTOMER_ACTION]({ state }, id, val) {
      CustomerService
        .updateCustomer(id, val)
        .then(response => response.data)
        .then(res => {
          state.errorCode = res.statusCode
          if (res.success) {
            // Temp
          } else {
            // Temp
          }
        })
        .catch(() => {
          // Temp
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

          }
        })
        .catch(() => {
          // Temp

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

          }
        })
        .catch(() => {
          // Temp

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

          }
        })
        .catch(() => {
          // Temp

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

          }
        })
        .catch(() => {
          // Temp

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

          }
        })
        .catch(() => {
          // Temp

        })
    },
    [GET_MEMBER_CARDS_ACTION]({ state }, val) {
      CustomerService
        .getMemberCards(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.memberCards = res.data
          } else {
            // Temp

          }
        })
        .catch(() => {
          // Temp

        })
    },
    [GET_CARD_TYPES_ACTION]({ state }) {
      CustomerService
        .getCardTypes()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.cardTypes = res.data
          } else {
            // Temp

          }
        })
        .catch(() => {
          // Temp

        })
    },
    [GET_CLOSELY_TYPES_ACTION]({ state }) {
      CustomerService
        .getCloselyTypes()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.closelyTypes = res.data
          } else {
            // Temp

          }
        })
        .catch(() => {
          // Temp

        })
    },
  },
}
