import CustomerService from '@/views/sales/sales-customers/api-service'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'

import {
  // GETTERS
  CUSTOMERS_GETTER,
  CUSTOMER_BY_ID_GETTER,
  SHOP_LOCATIONS_SEARCH_GETTER,
  SHOP_LOCATIONS_GETTER,
  ERROR_CODE_GETTER,
  CUSTOMER_TYPES_GETTER,
  CUSTOMER_DEFAULT_GETTER,
  PROVINCES_GETTER,
  DISTRICTS_GETTER,
  PRECINCTS_GETTER,
  CARD_TYPES_GETTER,
  CLOSELY_TYPES_GETTER,
  SALEMT_PROMOTION_OBJECT_GETTER,
  SALEMT_DELIVERY_TYPE_GETTER,
  SALEMT_PAYMENT_TYPE_GETTER,
  // ACTIONS
  GET_CUSTOMERS_ACTION,
  GET_CUSTOMER_BY_ID_ACTION,
  CREATE_CUSTOMER_ACTION,
  UPDATE_CUSTOMER_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
  EXPORT_CUSTOMERS_ACTION,
  GET_CUSTOMER_DEFAULT_ACTION,

  GET_SHOP_LOCATIONS_SEARCH_ACTION,
  GET_SHOP_LOCATIONS_ACTION,
  GET_PROVINCES_ACTION,
  GET_DISTRICTS_ACTION,
  GET_PRECINCTS_ACTION,

  GET_CARD_TYPES_ACTION,
  GET_CLOSELY_TYPES_ACTION,

  GET_SALEMT_PROMOTION_OBJECT_ACTION,
  GET_SALEMT_DELIVERY_TYPE_ACTION,
  GET_SALEMT_PAYMENT_TYPE_ACTION,

} from './type'

export default {
  namespaced: true,
  // STATE
  state: {
    errorCode: null,

    customerData: {},
    customerById: {},
    customerDefault: {},
    shopLocationsSearch: [],
    shopLocations: [],
    customerTypes: [],
    provinces: [],
    districts: [],
    precincts: [],
    cardTypes: [],
    closelyTypes: [],
    salemtPromotions: [],
    salemtDeliveries: [],
    salemtPayments: [],
  },

  // GETTERS
  getters: {
    [CUSTOMERS_GETTER](state) {
      return state.customerData
    },
    [CUSTOMER_BY_ID_GETTER](state) {
      return state.customerById
    },
    [CUSTOMER_TYPES_GETTER](state) {
      return state.customerTypes
    },
    [CUSTOMER_DEFAULT_GETTER](state) {
      return state.customerDefault
    },
    [SHOP_LOCATIONS_SEARCH_GETTER](state) {
      return state.shopLocationsSearch
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
    [CARD_TYPES_GETTER](state) {
      return state.cardTypes
    },
    [CLOSELY_TYPES_GETTER](state) {
      return state.closelyTypes
    },
    [SALEMT_PROMOTION_OBJECT_GETTER](state) {
      return state.salemtPromotions
    },
    [SALEMT_DELIVERY_TYPE_GETTER](state) {
      return state.salemtDeliveries
    },
    [SALEMT_PAYMENT_TYPE_GETTER](state) {
      return state.salemtPayments
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
            state.customerData = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_CUSTOMER_BY_ID_ACTION]({ state }, val) {
      CustomerService
        .getCustomerById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.customerById = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [CREATE_CUSTOMER_ACTION]({}, val) {
      CustomerService
        .createCustomer(val.customer)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [UPDATE_CUSTOMER_ACTION]({}, val) {
      CustomerService
        .updateCustomer(val.customer)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_CUSTOMER_DEFAULT_ACTION]({ state }, val) {
      CustomerService
        .getCustomerDefault(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.customerDefault = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [GET_SHOP_LOCATIONS_SEARCH_ACTION]({ state }, val) {
      CustomerService
        .getShopLocationsSearch(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.shopLocationsSearch = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
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
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [EXPORT_CUSTOMERS_ACTION]({ }, val) {
      CustomerService
        .exportCustomers(val)
        .then(response => response.data)
        .then(res => {
          const fileName = `Danh_sach_khach_hang_${moment().format('DDMMYYYY')}_${moment().format('hhmm')}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [GET_CUSTOMER_TYPES_ACTION]({ state }, val) {
      CustomerService
        .getCustomerTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.customerTypes = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_PROVINCES_ACTION]({ state }, val) {
      CustomerService
        .getProvinces(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.provinces = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
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
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
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
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_CARD_TYPES_ACTION]({ state }, val) {
      CustomerService
        .getCardTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.cardTypes = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_CLOSELY_TYPES_ACTION]({ state }, val) {
      CustomerService
        .getCloselyTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.closelyTypes = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_SALEMT_PROMOTION_OBJECT_ACTION]({ state }, val) {
      CustomerService
        .getSalemtPromotionObjects(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.salemtPromotions = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_SALEMT_DELIVERY_TYPE_ACTION]({ state }, val) {
      CustomerService
        .getSalemtDeliveryTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.salemtDeliveries = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_SALEMT_PAYMENT_TYPE_ACTION]({ state }, val) {
      CustomerService
        .getSalemtPaymentTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.salemtPayments = res.data
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
