import Vue from 'vue'

// axios
import axios from 'axios'

import store from '@/store'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://kch-testing.imt-soft.com/api',
  // baseURL: 'http://192.168.100.112:2407/api',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

axiosIns.interceptors.request.use(config => {
  store.commit('app/UPDATE_IS_LOADING', true)
  return config
}, () => {
  // Handle errors
})

axiosIns.interceptors.response.use(response => {
  store.commit('app/UPDATE_IS_LOADING', false)
  return response
}, () => {
  // Handle errors
})

Vue.prototype.$http = axiosIns

export default axiosIns
