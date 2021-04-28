import Vue from 'vue'

// axios
import axios from 'axios'

import store from '@/store'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_BASE_URL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

axiosIns.interceptors.request.use(config => {
  store.commit('app/UPDATE_IS_LOADING', true)
  return config
})

axiosIns.interceptors.response.use(response => {
  store.commit('app/UPDATE_IS_LOADING', false)
  return response
})

Vue.prototype.$http = axiosIns

export default axiosIns
