import CustomerService from '@/views/sales/sales-customers/api-service'
import toasts from '@core/utils/toasts/toasts'
import FileSaver from 'file-saver'
import moment from 'moment'

import {
  // GETTERS
  CUSTOMERS_GETTER,
  CUSTOMER_BY_ID_GETTER,
  CREATE_CUSTOMER_GETTER,
  SHOP_LOCATIONS_SEARCH_GETTER,
  SHOP_LOCATIONS_GETTER,
  CUSTOMER_TYPES_GETTER,
  CUSTOMER_TYPES_LABEL_GETTER,
  CUSTOMER_TYPES_UPDATE_GETTER,
  CUSTOMER_DEFAULT_GETTER,
  PROVINCES_GETTER,
  DISTRICTS_GETTER,
  PRECINCTS_GETTER,
  CARD_TYPES_GETTER,
  CLOSELY_TYPES_GETTER,
  GENDERS_GETTER,
  // ACTIONS
  GET_CUSTOMERS_ACTION,
  GET_CUSTOMER_BY_ID_ACTION,
  CREATE_CUSTOMER_ACTION,
  UPDATE_CUSTOMER_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
  GET_CUSTOMER_TYPES_UPDATE_ACTION,
  EXPORT_CUSTOMERS_ACTION,
  GET_CUSTOMER_DEFAULT_ACTION,

  GET_SHOP_LOCATIONS_SEARCH_ACTION,
  GET_SHOP_LOCATIONS_ACTION,
  GET_PROVINCES_ACTION,
  GET_DISTRICTS_ACTION,
  GET_PRECINCTS_ACTION,

  GET_CARD_TYPES_ACTION,
  GET_CLOSELY_TYPES_ACTION,
  GET_GENDERS_ACTION,

} from './type'

export default {
  namespaced: true,
  // STATE
  state: {
    customerData: {},
    customerById: {},
    customerDefault: {},
    customerCreate: {},
    shopLocationsSearch: [],
    shopLocations: [],
    customerTypes: [],
    customerTypesUpdate: [],
    provinces: [],
    districts: [],
    precincts: [],
    cardTypes: [],
    closelyTypes: [],
    genders: [],
  },

  // GETTERS
  getters: {
    [CUSTOMERS_GETTER](state) {
      return state.customerData
    },
    [CREATE_CUSTOMER_GETTER](state) {
      return state.customerCreate
    },
    [CUSTOMER_BY_ID_GETTER](state) {
      return state.customerById
    },
    [CUSTOMER_TYPES_GETTER](state) {
      return state.customerTypes
    },
    [CUSTOMER_TYPES_LABEL_GETTER]: state => id => {
      if (state.customerTypes) {
        const customerDataFound = state.customerTypes.find(item => `${item.id}` === `${id}`)
        return customerDataFound ? customerDataFound.name : 'label customer types'
      }
      return id
    },
    [CUSTOMER_TYPES_UPDATE_GETTER](state) {
      return state.customerTypesUpdate
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

    [GENDERS_GETTER](state) {
      return state.genders
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
    [CREATE_CUSTOMER_ACTION]({ state }, val) {
      CustomerService
        .createCustomer(val.customer)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            toasts.success(res.statusValue)
            val.onSuccess()
            state.customerCreate = res.data || {}
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
    // Dùng để load vị trí các shop cho thanh tìm kiếm
    [GET_SHOP_LOCATIONS_SEARCH_ACTION]({ state }, val) {
      CustomerService
        .getShopLocationsSearch(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.shopLocationsSearch = res.data
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    // Dùng để load vị trí mặc định của shop hiện tại trong form
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
          if (res.type === 'application/json') {
            throw new Error('Không có dữ liệu xuất')
          }

          const fileName = `Danh_sach_khach_hang_${moment().format('DDMMYYYY')}_${moment().format('hhmmss')}_${Math.floor(Math.random() * 900 + 100)}.xlsx`
          const blob = new Blob([res], { type: 'data:application/xlsx' })
          FileSaver.saveAs(blob, fileName)
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },

    [GET_CUSTOMER_TYPES_ACTION]({ state }, val) {
      CustomerService
        .getCustomerTypes(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.customerTypes = res.data
            val.onSuccess(res.data)
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
    [GET_CUSTOMER_TYPES_UPDATE_ACTION]({ state }, val) {
      CustomerService
        .getCustomerTypesUpdate(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.customerTypesUpdate = res.data
            val.onSuccess()
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
        .getDistricts(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.districts = res.data
            val.onSuccess()
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
        .getPrecincts(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.precincts = res.data
            val.onSuccess()
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
    [GET_GENDERS_ACTION]({ state }, val) {
      CustomerService
        .getGenders(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.genders = res.data
            val.onSuccess(res.data)
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
