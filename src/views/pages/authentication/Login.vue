<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">
          VINAMILK KÊNH CỬA HÀNG
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
            alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5 "
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto  border rounded"
        >
          <!-- form -->
          <validation-observer
            ref="loginForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-login-form mt-3 "
              @submit.prevent="login"
            >
              <!-- user -->
              <b-form-group
                label="Tên đăng nhập"
                label-for="login-username"
              >
                <validation-provider
                  #default="{ errors }"
                  name="username"
                  vid="username"
                  rules="required"
                >
                  <b-form-input
                    id="login-username"
                    v-model="username"
                    :state="errors.length > 0 ? false:null"
                    name="login-username"
                    placeholder="Tên đăng nhập"
                    maxlength="20"
                    @click="error"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between mt-2">
                  <label for="login-password">Mật khẩu</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="password"
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
                      maxlength="20"
                      @click="error"
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
              <div class="d-flex justify-content-between my-3">
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Ghi nhớ mật khẩu
                </b-form-checkbox>
                <b-link
                  variant="outline-light"
                  class="text-primary"
                  @click="showModalChangePass()"
                >
                  <small>Đổi mật khẩu</small>
                </b-link>
              </div>
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
          <b-form-group
            class="mt-4"
            label="Liên hệ: email@..."
          />
          <b-col
            sm="8"
            md="6"
            lg="12"
            class="px-xl-2 mx-auto  border rounded"
          />

          <h5 class="mt-2">
            © Copyright Tập đoàn Công nghiệp Viễn thông Quân đội
          </h5>
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
    <change-password :visible="valueShowModalChangPass" />
    <popup-success
      :visible="valueShowModalSuccess"
      :username="username"
      :password="password"
      :roles="roles"
      :shops="shops"
    />
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BImg, BForm, BButton, VBTooltip,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import ChangePassword from './ChangePassword.vue'
import PopupSuccess from './PopupSuccess.vue'

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
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,

    ChangePassword,
    PopupSuccess,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      username: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),

      // validation rules
      required,
      email,

      errored: true,
      valueShowModalChangPass: false,
      valueShowModalSuccess: false,
      roles: [],
      shops: [],
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
    showModalChangePass() {
      if (this.valueShowModalChangPass === true) {
        this.valueShowModalChangPass = false
      } else {
        this.valueShowModalChangPass = true
      }
    },
    error() {
      this.errored = true
    },
    login() {
      useJwt.preLogin({
        username: this.username,
        password: this.password,
      })
      // eslint-disable-next-line no-return-assign
        .then(response => ([
          this.roles = response.data.data.roles, // Role
          this.shops = response.data.data.shops, // Role
          this.errored = response.data.success, // Show text error username password
          this.valueShowModalSuccess = this.errored, // Show popup login success
        ]))
        .catch(error => {
          console.log(error)
          // alert('Thất bại')
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Tài khoảng mật khẩu không chính xác',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Vui lòng đăng nhập lại',
            },
          })
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
