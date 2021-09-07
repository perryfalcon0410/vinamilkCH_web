<template>
  <div
    id="app"
    class="h-100"
    :class="[skinClasses]"
  >
    <component :is="layout">
      <router-view />
    </component>

    <scroll-to-top v-if="enableScrollToTop" />

    <loading
      class="d-print-none"
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      loader="spinner"
      color="#315899"
      opacity="0"
    />
  </div>
</template>

<script>
import ScrollToTop from '@core/components/scroll-to-top/ScrollToTop.vue'
import Loading from 'vue-loading-overlay'

// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { provideToast } from 'vue-toastification/composition'
import { watch } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'

import { useWindowSize, useCssVar } from '@vueuse/core'

import store from '@/store'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  CUSTOMER,
  // ACTIONS
  GET_CUSTOMER_TYPES_ACTION,
  GET_GENDERS_ACTION,
} from '@/views/sales/sales-customers/store-module/type'

import {
  APP,
  // GETTERS
  LOGIN_STATUS_GETTER,
} from '@/store/app/type'

const LayoutVertical = () => import('@/layouts/vertical/LayoutVertical.vue')
const LayoutHorizontal = () => import('@/layouts/horizontal/LayoutHorizontal.vue')
const LayoutFull = () => import('@/layouts/full/LayoutFull.vue')

export default {
  components: {

    // Layouts
    LayoutHorizontal,
    LayoutVertical,
    LayoutFull,

    ScrollToTop,

    Loading,
  },

  data() {
    return {
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
    }
  },

  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    ...mapGetters(APP, [
      LOGIN_STATUS_GETTER,
    ]),
    layout() {
      if (this.$route.meta.layout === 'full') return 'layout-full'
      return `layout-${this.contentLayoutType}`
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type
    },
    isLoading() {
      return this.$store.state.app.isLoading
    },
    isLoggedIn() {
      return this.LOGIN_STATUS_GETTER
    },
  },

  watch: {
    isLoggedIn() {
      this.getCustomerApiData()
    },
    // Hàm này chỉ đề cho customer types vì 1 số tình hướng đặc biệt
    $route(to) {
      switch (to.name) {
        case 'sales-customers-create':
          return this.getCustomerApiData(true)
        case 'sales-customers':
          return this.getCustomerApiData()

        default:
          return null
      }
    },
  },

  mounted() {
    this.getCustomerApiData()
  },

  beforeCreate() {
    // Set colors in theme
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2))
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
  },

  methods: {
    ...mapActions(CUSTOMER, [
      GET_CUSTOMER_TYPES_ACTION,
      GET_GENDERS_ACTION,
    ]),

    getCustomerApiData(isCreate) {
      if (this.isLoggedIn) {
        // Customer type (Nhóm khách hàng)
        this.GET_CUSTOMER_TYPES_ACTION({
          data: { ...this.decentralization, isCreate },
          onSuccess: () => {},
        })

        // Gender (Giới tính)
        this.GET_GENDERS_ACTION({
          data: { ...this.decentralization },
          onSuccess: () => {},
        })
      }
    },
  },

  setup() {
    const { skin, skinClasses } = useAppConfig()
    const { enableScrollToTop } = $themeConfig.layout

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout')

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 5000,
      transition: 'Vue-Toastification__fade',
    })

    // Set Window Width in store
    store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    const { width: windowWidth } = useWindowSize()
    watch(windowWidth, val => {
      store.commit('app/UPDATE_WINDOW_WIDTH', val)
    })

    return {
      skinClasses,
      enableScrollToTop,
    }
  },
}
</script>
