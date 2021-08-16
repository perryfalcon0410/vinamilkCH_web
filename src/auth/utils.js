import useJwt from '@/auth/jwt/useJwt'
import store from '@/store'
import CryptoJS from 'crypto-js'
import {
  APP,
  // ACTIONS
  UPDATE_LOGIN_STATUS_ACTIONS,
} from '@/store/app/type'
/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => {
  if (localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)) {
    store.commit(`${APP}/${UPDATE_LOGIN_STATUS_ACTIONS}`, true)
    return true
  }
  store.commit(`${APP}/${UPDATE_LOGIN_STATUS_ACTIONS}`, false)
  return false
}

export const getUserData = keyword => {
  switch (keyword) {
    case 'password':
      if (localStorage.getItem('password')) {
        return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('password'), process.env.VUE_APP_AES_SECRET_KEY).toString(CryptoJS.enc.Utf8))
      }
      break

    default:
      if (localStorage.getItem('userData')) {
        return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('userData'), process.env.VUE_APP_AES_SECRET_KEY).toString(CryptoJS.enc.Utf8))
      }
  }

  return null
}

/**
 * This function is used for demo purpose route navigation
 * In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 * Please note role field is just for showing purpose it's not used by anything in frontend
 * We are checking role just for ease
 * NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return '/'
  return { name: 'auth-login' }
}
