<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ userData.fullName || userData.username || null }}
        </p>
        <span class="user-status">{{ userData.usedRole.roleName }}</span>
      </div>
      <b-avatar
        size="40"
        :src="userData.avatar"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon
          v-if="!userData.fullName"
          icon="UserIcon"
          size="22"
        />
      </b-avatar>
    </template>

    <b-dropdown-item
      @click="navigateToChangePassword"
    >
      <b-icon-lock
        class="mr-50"
        scale="1.2"
      />
      <span>Đổi mật khẩu</span>
    </b-dropdown-item>
    <!-- system print -->
    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="onClickPrintConfiguration"
    >
      <b-icon-printer
        class="mr-50"
        scale="1.2"
      />
      <span>Cấu hình máy in</span>
    </b-dropdown-item>

    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="onClickGuideline"
    >
      <b-icon-book-half
        class="mr-50"
        scale="1.2"
      />
      <span>Hướng dẫn</span>
    </b-dropdown-item>

    <!-- system print -->
    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="logout"
    >
      <feather-icon
        size="16"
        icon="LogOutIcon"
        class="mr-50"
      />
      <span>Đăng xuất</span>
    </b-dropdown-item>
    <printer-configuration-modal
      :visible="isVisible"
      :ip-address="ipAddress"
      :is-open-configuration-modal="isOpenConfigurationModal"
      @cancel="cancel"
      @getIpClient="getIpClient"
    />
    <guideline-modal
      :show="isShow"
      :is-open-guideline-modal="isOpenGuidelineModal"
      @cancelGuideline="cancelGuideline"
    />
  </b-nav-item-dropdown>
</template>

<script>

import {
  mapActions,
} from 'vuex'
import {
  avatarText,
  hostName,
} from '@/@core/utils/filter'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'

import { getUserData } from '@/auth/utils'
import {
  PRINTERCONFIG,
  GET_PRINTER_CLIENT_ACTIONS,
} from '@/views/auth/printer-configuration-modal/store-module/type'
import PrinterConfigurationModal from '@/views/auth/printer-configuration-modal/PrinterConfigurationModal.vue'
import GuidelineModal from '@/views/dashboard/guideline/GuidelineModal.vue'

export default {
  components: {
    PrinterConfigurationModal,
    GuidelineModal,
  },

  data() {
    return {
      userData: getUserData(),
      avatarText,
      isVisible: false,
      ipAddress: '',
      isOpenConfigurationModal: false,
      isShow: false,
      isOpenGuidelineModal: false,
    }
  },
  watch: {
    ipAddress() {
      this.GET_PRINTER_CLIENT_ACTIONS({
        data: {
          clientId: this.ipAddress,
          ...this.decentralization,
        },
        onSuccess: () => {},
      })
    },
  },
  methods: {
    ...mapActions(PRINTERCONFIG, [
      GET_PRINTER_CLIENT_ACTIONS,
    ]),

    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.replace({ name: 'auth-login' })
      this.$router.go()
    },

    navigateToChangePassword() {
      this.$router.push({ name: 'auth-reset-password' })
    },
    onClickPrintConfiguration() {
      hostName().then(res => {
        if (res) {
          this.ipAddress = res.ip || res.query || res.geoplugin_request
        } else {
          this.ipAddress = null
        }
      })
      this.isVisible = true
      this.isOpenConfigurationModal = true
    },
    onClickGuideline() {
      this.isShow = true
      this.isOpenGuidelineModal = true
    },
    cancel() {
      this.isVisible = false
    },
    cancelGuideline() {
      this.isShow = false
    },
    getIpClient(ip) {
      this.ipAddress = ip
    },
  },
}
</script>
