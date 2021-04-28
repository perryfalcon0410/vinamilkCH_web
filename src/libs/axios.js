import Vue from 'vue'

// axios
import axios from 'axios'

import store from '@/store'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://kch-testing.imt-soft.com/api/v1',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

axiosIns.interceptors.request.use(config => {
  store.commit('app/UPDATE_IS_LOADING', true)
  return config
}, () => {
  store.commit('app/UPDATE_IS_LOADING', false)
})

axiosIns.interceptors.response.use(response => {
  store.commit('app/UPDATE_IS_LOADING', false)
  return response
}, () => {
  store.commit('app/UPDATE_IS_LOADING', false)
})

Vue.prototype.$http = axiosIns

export default axiosIns
