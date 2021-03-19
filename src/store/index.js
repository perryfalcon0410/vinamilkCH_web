import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import customer from './customer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    customer,
    'app-ecommerce': ecommerceStoreModule,
  },
  strict: process.env.DEV,
})
