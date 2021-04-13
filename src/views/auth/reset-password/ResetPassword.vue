<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Reset Password -->
      <b-card class="mb-0">

        <!-- logo -->
        <b-link class="brand-logo">
          <vuexy-logo />

          <h2 class="brand-text text-primary ml-1">
            Kênh Cửa Hàng
          </h2>
        </b-link>

        <b-card-title class="mb-1">
          Đổi Mật Khẩu 🔒
        </b-card-title>
        <b-card-text class="mb-2">
          Để đảm bảo an toàn, Khách hàng nên sử dụng mật khẩu mạnh: độ dài tối thiểu 8 ký tự, bao gồm: chữ hoa, thường, số và ký tự đặc biệt
        </b-card-text>

        <!-- form -->
        <validation-observer
          ref="resetPasswordForm"
          #default="{invalid}"
        >
          <b-form
            method="POST"
            class="auth-reset-password-form mt-2"
            @submit.prevent="validationForm"
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
                  v-model="username"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Tên đăng nhập"
                  maxlength="20"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- old password -->
            <b-form-group>
              <validation-provider
                #default="{ errors }"
                name="Mật khẩu cũ"
                vid="oldPassword"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    v-model="oldPassword"
                    :type="passwordOFieldType"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    placeholder="Mật khẩu cũ"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordOToggleIcon"
                      @click="togglePasswordOVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- new password -->
            <b-form-group>
              <validation-provider
                #default="{ errors }"
                name="Mật khẩu mới"
                vid="newPassword"
                rules="required|not-equal:@oldPassword|password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    v-model="newPassword"
                    :type="passwordNFieldType"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    placeholder="Mật khẩu mới"
                    maxlength="20"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordNToggleIcon"
                      @click="togglePasswordNVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- confirm password -->
            <b-form-group>
              <validation-provider
                #default="{ errors }"
                name="Xác nhận mật khẩu mới"
                rules="required|confirmed:newPassword"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    v-model="cPassword"
                    :type="password2FieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Xác nhận mật khẩu"
                    maxlength="20"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordCToggleIcon"
                      @click="togglePasswordCVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button
              block
              type="submit"
              :disabled="invalid"
              variant="primary"
            >
              Đổi Mật Khẩu
            </b-button>
          </b-form>
        </validation-observer>

        <p class="text-center mt-2">
          <b-link :to="{name:'auth-login'}">
            <feather-icon icon="ChevronLeftIcon" /> Huỷ bỏ
          </b-link>
        </p>

      </b-card>
    <!-- /Reset Password -->
    </div>
  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  required, notEqual, confirmed, password,
} from '@core/utils/validations/validations'
import toasts from '@core/utils/toasts/toasts'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      username: '',
      oldPassword: '',
      newPassword: '',
      cPassword: '',

      // validation
      required,
      notEqual,
      confirmed,
      password,

      // Toggle Password
      passwordOFieldType: 'password',
      passwordNFieldType: 'password',
      passwordCFieldType: 'password',
    }
  },
  computed: {
    passwordOToggleIcon() {
      return this.passwordOFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordNToggleIcon() {
      return this.passwordNFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordCToggleIcon() {
      return this.passwordCFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePasswordOVisibility() {
      this.passwordOFieldType = this.passwordOFieldType === 'password' ? 'text' : 'password'
    },
    togglePasswordNVisibility() {
      this.passwordNFieldType = this.passwordNFieldType === 'password' ? 'text' : 'password'
    },
    togglePasswordCVisibility() {
      this.passwordCFieldType = this.passwordCFieldType === 'password' ? 'text' : 'password'
    },
    validationForm() {
      this.$refs.resetPasswordForm.validate().then(success => {
        if (success) {
          useJwt
            .changePassword({
              username: this.username,
              oldPassword: this.oldPassword,
              newPassword: this.newPassword,
              confirmPassword: this.cPassword,
            })
            .then(response => response.data)
            .then(response => {
              if (response.success) {
                this.navigateToLoginPage()
                toasts.success(response.statusValue)
              } else {
                throw new Error(response.statusValue)
              }
            })
            .catch(error => {
              toasts.error(error.message)
            })
        }
      })
    },
    navigateToLoginPage() {
      this.$router.push({ name: 'auth-login' })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
