import Vue from 'vue'
import {
  BootstrapVue,
  BootstrapVueIcons,
} from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import {
  isEmpty,
  onlyNumberInput,
  onlyDateInput,
  // labels
  getInputTypeslabel,
  getWarehousesStatuslabel,
  getOutputTypeslabel,
} from '@core/utils/utils'
import {
  formatNumberToLocale,
  formatISOtoVNI,
  formatVniDateToISO,
  formatPrintDate,
} from '@/@core/utils/filter'
import { permission } from '@/libs/acl/ability'
import VueBarcodeScanner from 'vue-barcode-scanner'

import i18n from '@/libs/i18n'
import VueGoodTablePlugin from 'vue-good-table'
import moment from 'moment'
import VueFlatPickr from 'vue-flatpickr-component'
import flatPickr from 'flatpickr'
import { Vietnamese } from 'flatpickr/dist/l10n/vn'
import TreeSelect from '@riophae/vue-treeselect'
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

// import the styles
import '@core/scss/vue/libs/vue-good-table.scss'
import '@core/scss/vue/libs/vue-flatpicker.scss'
import '@core/scss/vue/libs/vue-select.scss'
import 'vue-loading-overlay/dist/vue-loading.css'
import '@core/scss/vue/libs/vue-treeselect.scss'
import '@core/scss/vue/libs/vue-autosuggest.scss'

dotenv.config()

// BSV Plugin Registration
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

// Composition API
Vue.use(VueCompositionAPI)

// vue-good-table
Vue.use(VueGoodTablePlugin)

// inject vue barcode scanner
const optionsVueBarcodeScanner = {
  sensitivity: 0, // default is 100
  // *requiredAttr: set to "true" you need to specific some input field with "data-barcode" and then only this input response to scanner
  requiredAttr: true, // default is false
  // *controlSequenceKeys: when a control key in this list is encountered in a scan sequence, it will be replaced with tags for easy string replacement
  controlSequenceKeys: ['NumLock', 'Clear'], // default is null
  // *callbackAfterTimeout: this will fire the callback defined in the component once sensitivity ms has elapsed, following the last character in the barcode sequence.
  // *This is useful for scanners that don't end their sequences with ENTER and is backwards compatible with scanners that do.
  callbackAfterTimeout: true, // default is false
}
Vue.use(VueBarcodeScanner, optionsVueBarcodeScanner)
// moment
Vue.prototype.$moment = moment
moment.locale('vi')

// Ultils
Vue.prototype.$isEmpty = isEmpty
Vue.prototype.$onlyNumberInput = onlyNumberInput
Vue.prototype.$onlyDateInput = onlyDateInput
Vue.prototype.$getInputTypeslabel = getInputTypeslabel
Vue.prototype.$getOutputTypeslabel = getOutputTypeslabel
Vue.prototype.$getWarehousesStatuslabel = getWarehousesStatuslabel

// filter
Vue.prototype.$formatNumberToLocale = formatNumberToLocale
Vue.prototype.$formatISOtoVNI = formatISOtoVNI
Vue.prototype.$formatVniDateToISO = formatVniDateToISO
Vue.prototype.$formatPrintDate = formatPrintDate

Vue.prototype.$permission = permission

// flatPickr
flatPickr.localize(Vietnamese)
Vue.component('vue-flat-pickr', VueFlatPickr)

// vue-select
Vue.component('tree-select', TreeSelect)

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
