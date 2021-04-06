<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">
          Kênh Cửa Hàng
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Đăng nhập"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            class="mb-1 font-weight-bold"
            title-tag="h2"
          >
            Cửa hàng giới thiệu sản phẩm! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu khám phá
          </b-card-text>

          <!-- form -->
          <validation-observer
            ref="loginForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="preLogin"
            >
              <!-- username -->
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Tên đăng nhập"
                  vid="username"
                  rules="required"
                >
                  <b-form-input
                    id="login-username"
                    v-model="username"
                    :state="errors.length > 0 ? false:null"
                    name="login-username"
                    placeholder="Tên đăng nhập"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Mật khẩu"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Mật khẩu"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <div class="d-flex flex-direction-row justify-content-between">
                  <b-form-checkbox
                    id="remember-me"
                    v-model="status"
                    name="checkbox-1"
                  >
                    Ghi nhớ mật khẩu
                  </b-form-checkbox>
                  <b-link :to="{name:'auth-reset-password'}">
                    <small>Đổi mật khẩu</small>
                  </b-link>
                </div>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid"
              >
                Đăng nhập
              </b-button>
            </b-form>
          </validation-observer>
          <hr>
          <span>Liên hệ: ch.support@vinamilk.com.vn</span>
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>

    <!-- Role And Shop Selection Success Modal-->
    <role-and-shop-selection-modal
      :visible="isShowRoleAndShopSelectionModal"
      :roles="roles"
      @onModalHidden="onModalHidden"
      @login="login"
    />
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, VBTooltip,
} from 'bootstrap-vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import toasts from '@core/utils/toasts/toasts'

import useJwt from '@/auth/jwt/useJwt'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import RoleAndShopSelectionModal from './components/RoleAndShopSelectionModal.vue'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    RoleAndShopSelectionModal,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      username: '',
      password: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),

      // validation rules
      required,

      // state
      isShowRoleAndShopSelectionModal: false,
      roles: [],
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    onModalHidden() {
      this.isShowRoleAndShopSelectionModal = false
    },
    preLogin() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          useJwt
            .preLogin({
              username: this.username,
              password: this.password,
            })
            .then(response => response.data)
            .then(response => {
              if (response.success) {
                this.roles = response.data.roles
                this.isShowRoleAndShopSelectionModal = true
              } else {
                throw new Error(response.statusValue)
              }
            })
            .catch(error => {
              toasts.warning(error.message)
            })
        }
      })
    },
    login(val) {
      const { roleSelected, shopSelected } = val

      useJwt
        .login({
          username: this.username,
          password: this.password,
          roleId: roleSelected.value,
          shopId: shopSelected.value,
        })
        .then(response => {
          const {
            success, data, token, statusValue,
          } = response.data

          console.log(JSON.stringify(response))

          if (success) {
            const userData = {
              id: data.userId,
              fullName: `${data.firstName} ${data.lastName}`,
              username: data.username,
              email: data.email,
              usedRole: data.usedRole,
              usedShop: data.usedShop,
              phoneNumber: data.phoneNumber,
              permissions: data.permissions,

              // Other
              avatar: require('@/assets/images/avatars/13-small.png'),
              role: 'admin',
              ability: [
                {
                  action: 'manage',
                  subject: 'all',
                },
              ],
              extras: {
                eCommerceCartItemsCount: 0,
              },
            }

            useJwt.setToken(token.replace('Bearer ', ''))
            useJwt.setRefreshToken(token.replace('Bearer ', ''))
            localStorage.setItem('userData', JSON.stringify(userData))
            this.$ability.update(userData.ability)

            this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
              .then(() => {
                toasts.success(`Bạn đã đăng nhập thành công với quyền ${userData.role}. Bây giờ bạn có thể bắt đầu khám phá!`)
              })
              .catch(error => {
                this.$refs.loginForm.setErrors(error.response)
              })
          } else {
            throw new Error(statusValue)
          }
        })
        .catch(error => {
          toasts.error(error.message)
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
