import ServiceCustomer from '@/@core/service/customer.service'
import {
  // LIST_CUSTOMER,
  DELETE,
  GET_ALL,
  LOADING_STATUS,
} from '@/store/customer/type'
import ToastificationContent from '@/@core/components/toastification/ToastificationContent.vue'

export default {
  namespaced: true,
  state: {
    index: {
      list: [],
      loading: false,
      errorCode: null,
      success: false,
    },
  },
  getters: {
    LIST_CUSTOMER(state) {
      console.log(state.index.list)
      return state.index.list
    },
  },
  mutations: {
    [LOADING_STATUS](state, val) {
      state.index.loading = val
    },
  },
  actions: {
    GET_ALL({ commit, state }) {
      commit(LOADING_STATUS, true)

      ServiceCustomer.getAll().then(response => {
        const res = response.data
        commit(LOADING_STATUS, false)
        if (res.success) {
          state.index.list = res.data.content
        } else {
          state.index.errorCode = res.statusCode
        }
      }).catch(error => {
        state.index.errorCode = error.response.status
      })
    },

    [DELETE]({ dispatch, commit }, val) {
      commit(LOADING_STATUS, true)

      ServiceCustomer.delete(val).then(() => {
        dispatch(GET_ALL)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Thông báo',
            icon: 'BellIcon',
            variant: 'success',
            text: 'Xóa thành công!',
          },
        })
      })
    },

  },
}
