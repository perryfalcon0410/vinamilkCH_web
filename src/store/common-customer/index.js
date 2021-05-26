import CustomerService from '@/api-service/common-customer'
import toasts from '@core/utils/toasts/toasts'

import {
  // GETTERS
  CUSTOMER_TYPES_GETTER,
  // ACTIONS
  GET_CUSTOMER_TYPES_ACTION,
} from './type'

export default {
  namespaced: true,
  // STATE
  state: {
    customerTypes: [],
  },

  // GETTERS
  getters: {
    [CUSTOMER_TYPES_GETTER](state) {
      return state.customerTypes
    },
  },

  // MUTATIONS
  mutations: {},

  // ACTIONS
  actions: {
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
  },
}
