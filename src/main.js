import Vue from 'vue'
import {
  ToastPlugin,
  ModalPlugin,
  BootstrapVue,
  BootstrapVueIcons,
} from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import i18n from '@/libs/i18n'
import VueGoodTablePlugin from 'vue-good-table'
import moment from 'moment'
import VueFlatPickr from 'vue-flatpickr-component'
import flatPickr from 'flatpickr'
import { Vietnamese } from 'flatpickr/dist/l10n/vn'
import vSelect from 'vue-select'
import dotenv from 'dotenv'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'

// Axios Mock Adapter
import '@/@fake-db/db'

import 'vue-loading-overlay/dist/vue-loading.css'

// import the styles
import '@core/scss/vue/libs/vue-good-table.scss'
import '@core/scss/vue/libs/vue-flatpicker.scss'
import '@core/scss/vue/libs/vue-select.scss'

dotenv.config()

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

Vue.use(VueGoodTablePlugin)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.prototype.$moment = moment
moment.locale('vi')

flatPickr.localize(Vietnamese)
Vue.component('vue-flat-pickr', VueFlatPickr)

Vue.component('v-select', vSelect)

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false
Vue.config.silent = true

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
