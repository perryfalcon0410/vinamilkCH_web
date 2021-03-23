import ServiceCustomer from '@/@core/service/customer.service'
import {
  LIST_CUSTOMER,
  DELETE,
  GET_ALL,
  LOADING_STATUS,
} from '@/store/customer/type'

export default {
  namespaced: true,
  // State
  state: {
    loading: false,
    getAll: {
      list: [],
      success: false,
      errorCode: null,
    },
    delete: {
      success: false,
      listDelete: [],
      errorCode: null,
    },
  },

  // Getters
  getters: {
    [LIST_CUSTOMER](state) {
      return state.getAll.list
    },
  },

  // Mutations
  mutations: {
    [LOADING_STATUS](state, val) {
      state.loading = val
    },
  },

  // Actions
  actions: {
    // START - Get all
    [GET_ALL]({ commit, state }, val) {
      commit(LOADING_STATUS, true)
      ServiceCustomer.getAll(val).then(response => {
        const res = response.data
        commit(LOADING_STATUS, false)

        if (res.success) {
          state.getAll.list = res.data.content
        } else {
          state.getAll.errorCode = res.statusCode
        }
      }).catch(error => {
        state.getAll.errorCode = error.response.status
      })
    },
    // END - Get all

    // START - Delete
    [DELETE]({ dispatch, commit, state }, val) {
      commit(LOADING_STATUS, true)

      ServiceCustomer.delete(val).then(response => {
        commit(LOADING_STATUS, false)
        const res = response.data

        if (res.success) {
          state.delete.success = true
          dispatch(GET_ALL, '')
        } else {
          state.delete.success = false
          state.delete.errorCode = res.statusCode
        }
      }).catch(() => {
        state.delete.success = false
      })
    },
    // END - Delete

  },
}
