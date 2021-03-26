import ServiceCustomer from '@/@core/service/customer.service'
import {
  LIST_CUSTOMER,
  DELETE,
  GET_ALL,
  LOADING_STATUS,
  CREATE,
  CREATE_CODE_ERROR,
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
    create: {
      success: false,
      errorCode: null,
      // 65000 - IDENTITY_CARD_CODE_HAVE_EXISTED
      // 40005 - CUSTOMER_CODE_HAVE_EXISTED
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

    [CREATE_CODE_ERROR](state) {
      return state.create.errorCode
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
    [GET_ALL]({ commit, state }) {
      commit(LOADING_STATUS, true)

      ServiceCustomer.getAll().then(response => {
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

    // START - Create
    [CREATE]({ commit, state }, val) {
      commit(LOADING_STATUS, true)

      ServiceCustomer.create(val).then(response => {
        const res = response.data
        commit(LOADING_STATUS, false)
        console.log(`${res.statusCode}abc`)
        if (res.success) {
          state.create.errorCode = res.statusCode
        } else {
          state.create.errorCode = res.statusCode
        }
      }).catch(() => {
        // state.getAll.errorCode = error.response.status
      })
    },
    // END - Create

    // START - Delete
    [DELETE]({ dispatch, commit, state }, val) {
      commit(LOADING_STATUS, true)

      ServiceCustomer.delete(val).then(response => {
        commit(LOADING_STATUS, false)
        const res = response.data

        if (res.success) {
          state.delete.success = true
          dispatch(GET_ALL)
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
