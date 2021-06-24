import { $themeBreakpoints } from '@themeConfig'
import {
  // GETTERS
  LOGIN_STATUS_GETTER,
  // ACTIONS
  UPDATE_LOGIN_STATUS_ACTIONS,
} from './type'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    loginStatus: false,
    windowWidth: 0,
    shallShowOverlay: false,
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
    [LOGIN_STATUS_GETTER](state) {
      return state.loginStatus
    },
  },
  mutations: {
    UPDATE_IS_LOADING(state, val) {
      state.isLoading = val
    },
    [UPDATE_LOGIN_STATUS_ACTIONS](state, val) {
      state.loginStatus = val
    },
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
  },
  actions: {},
}
