import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vi from './locales/vi/index'
import en from './locales/en/index'

Vue.use(VueI18n)
function loadLocaleMessages() {
  return {
    vi,
    en,
  }
}
export default new VueI18n({
  locale: 'vi',
  fallbackLocale: 'vi',
  messages: loadLocaleMessages(),
  silentTranslationWarn: true,
})
