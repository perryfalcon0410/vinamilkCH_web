<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
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
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="sideImg"
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
                  name="tên đăng nhập"
                  vid="username"
                  rules="required"
                >
                  <b-form-input
                    v-model.trim="username"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Tên đăng nhập"
                    maxlength="20"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="mật khẩu"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      v-model.trim="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      placeholder="Mật khẩu"
                      maxlength="20"
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

              <!-- Captcha -->
              <b-row
                v-if="captchaStatus"
                class="mb-1"
              >
                <b-col>
                  <b-input-group
                    class="input-group-merge"
                  >
                    <b-form-input
                      v-model="captchaCodeResponse"
                      disabled
                      class="text-center cursor-not-allowed"
                    />
                    <b-input-group-append
                      is-text
                      class="cursor-pointer"
                      @click="onReloadCaptchaButtonClick()"
                    >
                      <b-icon-arrow-repeat />
                    </b-input-group-append>
                  </b-input-group>
                </b-col>

                <b-col>
                  <validation-provider
                    #default="{ errors }"
                    name="captcha"
                    rules="required"
                  >
                    <b-form-input
                      v-model.trim="captchaCodePost"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Mã Captcha"
                      maxlength="20"
                      @paste.prevent
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>

                </b-col>
              </b-row>

              <!-- checkbox -->
              <b-form-group>
                <b-row
                  class="mx-0"
                  align-v="center"
                >
                  <b-form-checkbox
                    v-model="saveStatus"
                  >
                    Ghi nhớ mật khẩu
                  </b-form-checkbox>
                </b-row>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="someThing"
                class="btn-brand-1"
                block
                :disabled="invalid"
              >
                Đăng nhập
              </b-button>
            </b-form>
          </validation-observer>
          <hr>
          <div>Liên hệ: ch.support@vinamilk.com.vn</div>
          <div class="my-1 text-center">
            © Tập đoàn Công nghiệp Viễn thông Quân đội
          </div>
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>

    <!-- Role and shop modal-->
    <role-and-shop-selection-modal
      :roles="roles"
      @login="login"
    />
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import toasts from '@core/utils/toasts/toasts'
import useJwt from '@/auth/jwt/useJwt'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import { $themeConfig } from '@themeConfig'
import CryptoJS from 'crypto-js'
import RoleAndShopSelectionModal from './components/RoleAndShopSelectionModal.vue'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    RoleAndShopSelectionModal,
  },

  mixins: [togglePasswordVisibility],

  data() {
    return {
      saveStatus: localStorage.getItem('saveStatus') ? JSON.parse(localStorage.getItem('saveStatus')) : null,
      username: localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')) : null,
      password: localStorage.getItem('password') ? JSON.parse(localStorage.getItem('password')) : null,
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      captchaStatus: false,
      captchaCodeResponse: '',
      captchaCodePost: '',

      // validation rules
      required,

      roles: [],
      // Note: Role
      forms: [
        {
          action: 'manage',
          subject: 'RESETPASSWORD',
          controls: [],
        },
        {
          action: 'manage',
          subject: 'NOTAUTHORIZED',
          controls: [],
        },
      ],
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
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeOffIcon' : 'EyeIcon'
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
    // Note: Role
    mapSubForms(subForms) {
      subForms.forEach(subForm => {
        this.forms.push({
          action: 'manage',
          subject: subForm.formCode.toUpperCase(),
          controls: subForm.controls
            ? [...subForm.controls.map(control => ({
              controlCode: control.controlCode,
              showStatus: control.showStatus,
            }))]
            : [],
        })

        if (subForm.subForms && subForm.subForms.length > 0) {
          this.mapSubForms(subForm.subForms)
        }
      })
    },

    onReloadCaptchaButtonClick() {
      useJwt.reloadCaptcha(this.username)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            this.captchaCodeResponse = res.data
          } else {
            throw new Error(res.statusValue)
          }
        }).catch(error => toasts.error(error.message))
    },

    checkCaptchaExist(captcha) {
      if (captcha) {
        this.captchaCodeResponse = captcha
        this.captchaStatus = true
      } else {
        this.captchaStatus = false
      }
    },

    loginAction(success, data, token, statusValue) {
      if (success) {
        // Save password
        if (this.saveStatus) {
          localStorage.setItem('password', JSON.stringify(this.password))
        }

        this.mapSubForms(data.forms || [])

        const userData = {
          id: data.userId,
          fullName: `${data.firstName} ${data.lastName}`,
          username: data.userAccount,
          email: data.email,
          usedRole: data.usedRole,
          usedShop: data.usedShop,
          phoneNumber: data.phoneNumber,

          // Other
          ability: this.forms,
          avatar: require('@/assets/images/avatars/13-small.png'),
          role: 'admin',
          extras: {
            eCommerceCartItemsCount: 0,
          },
        }
        useJwt.setToken(token.replace('Bearer ', ''))
        useJwt.setRefreshToken(token.replace('Bearer ', ''))
        localStorage.setItem('userData', CryptoJS.AES.encrypt(JSON.stringify(userData), process.env.VUE_APP_AES_SECRET_KEY).toString())

        this.$ability.update(userData.ability)
        // this.$ability.update([{ action: 'manage', subject: 'all' }]) // => Temp

        this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
          .then(() => {
            toasts.success(`Chào mừng bạn trở lại, ${userData.fullName}.`)
          })
          .catch(error => {
            this.$refs.loginForm.setErrors(error.response)
          })
      } else {
        throw new Error(statusValue)
      }
    },

    saveAccountToLocal() {
      // Save account
      if (this.saveStatus) {
        localStorage.setItem('username', JSON.stringify(this.username))
        localStorage.setItem('saveStatus', JSON.stringify(this.saveStatus))
      } else {
        // Clean account
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        localStorage.removeItem('saveStatus')
      }
    },

    preLogin() {
      this.$refs.loginForm.validate().then(valid => {
        if (valid) {
          useJwt
            .preLogin({
              username: this.username.toLowerCase(),
              password: this.password,
              captchaCode: this.captchaCodePost,
            })
            .then(res => {
              const {
                success, data, token, statusValue,
              } = res.data

              if (!res) {
                throw new Error('Server không hoạt động, vui lòng liên hệ Quản trị')
              }

              if (success) {
                // Check captcha exist
                if (data) {
                  this.checkCaptchaExist(data.captcha)
                }

                if (data.roles.length === 1 && data.roles[0].shops.length === 1) {
                  this.saveAccountToLocal()

                  this.loginAction(success, data, token, statusValue)
                } else {
                  this.roles = data.roles
                  // show modal
                  this.$bvModal.show('roleAndShopModal')
                }
              } else {
                // Check captcha exist
                if (data) {
                  this.checkCaptchaExist(data.captcha)
                }
                throw new Error(statusValue)
              }
            })
            .catch(error => {
              toasts.error(error.message)
            })
        }
      })
    },

    login(val) {
      this.saveAccountToLocal()

      const { roleSelected, shopSelected } = val

      useJwt
        .login({
          username: this.username.toLowerCase(),
          password: this.password,
          roleId: roleSelected,
          shopId: shopSelected,
        })
        .then(response => {
          const {
            success, data, token, statusValue,
          } = response.data

          this.loginAction(success, data, token, statusValue)
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
