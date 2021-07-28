<template>
  <div class="misc-wrapper">
    <b-row
      class="brand-logo"
      align-v="center"
    >
      <b-img
        :src="appLogoImage"
        alt="logo"
        width="40px"
      />
      <h2 class="brand-text text-brand-1 ml-1 mt-1">
        {{ appName }}
      </h2>
    </b-row>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          Bạn không được ủy quyền! 🔐
        </h2>
        <p class="mb-2">
          Bạn không có quyền truy cập trang này. Trở về!!
        </p>
        <b-button
          variant="someThing"
          class="btn-brand-1 aligns-items-button-center"
          :to="loginRoute()"
        >Trở về Trang chủ</b-button>
        <b-img
          fluid
          :src="imgUrl"
          alt="Trang không được ủy quyền"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import store from '@/store/index'
import { getHomeRouteForLoggedInUser, getUserData } from '@/auth/utils'
import { $themeConfig } from '@themeConfig'

export default {
  data() {
    return {
      downImg: require('@/assets/images/pages/not-authorized.svg'),
    }
  },

  setup() {
    // App Name
    const { appLogoImage, appName } = $themeConfig.app
    return {
      appName,
      appLogoImage,
    }
  },

  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/not-authorized-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },

  methods: {
    loginRoute() {
      const user = getUserData()
      return getHomeRouteForLoggedInUser(user ? user.role : null)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
