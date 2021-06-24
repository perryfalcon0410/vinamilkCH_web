/* eslint-disable no-param-reassign */
import store from '@/store'
import Vue from 'vue'
import { initialAbility } from '@/libs/acl/config'
import router from '@/router/index'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    this.axiosIns.interceptors.request.use(
      config => {
        store.commit('app/UPDATE_IS_LOADING', true)

        const accessToken = this.getToken()

        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
          config.params = {
            ...config.params,
            formId: 1,
            ctrlId: 1,
          }
        }
        return config
      },
      error => {
        store.commit('app/UPDATE_IS_LOADING', false)
        return Promise.reject(error)
      },
    )

    this.axiosIns.interceptors.response.use(
      response => {
        store.commit('app/UPDATE_IS_LOADING', false)
        if (response.data && response.data.statusCode === 408) {
          this.logout()
        }
        return response
      },
      error => {
        const { response } = error
        store.commit('app/UPDATE_IS_LOADING', false)
        return Promise.resolve(response || error)
      },
    )
  }

  logout() {
    // Remove userData from localStorage
    // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
    localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName)

    // Remove userData from localStorage
    localStorage.removeItem('userData')

    // Reset ability
    Vue.prototype.$ability.update(initialAbility)

    // Redirect to login page
    router.replace({ name: 'auth-login' })
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  preLogin(...args) {
    return this.axiosIns.post(this.jwtConfig.preLoginEndpoint, ...args)
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }

  changePassword(...args) {
    return this.axiosIns.put(this.jwtConfig.changePasswordEndpoint, ...args)
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    })
  }
}
