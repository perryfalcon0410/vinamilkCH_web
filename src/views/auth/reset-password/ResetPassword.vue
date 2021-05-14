<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Reset Password -->
      <b-card class="mb-0">

        <!-- logo -->
        <b-row
          class="brand-logo"
          align-v="center"
        >
          <!-- <kch-logo /> -->
          <b-img
            :src="appLogoImage"
            alt="logo"
            width="40px"
          />

          <h2 class="brand-text text-brand-1 ml-1 mt-1">
            {{ appName }}
          </h2>
        </b-row>

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
                name="tên đăng nhập"
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
                name="mật khẩu cũ"
                vid="oldPassword"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    v-model="oldPassword"
                    :type="isOldPasswordShow ? 'text' : 'password'"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    placeholder="Mật khẩu cũ"
                    maxlength="20"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="isOldPasswordShow ? 'EyeIcon' : 'EyeOffIcon'"
                      @click="isOldPasswordShow = !isOldPasswordShow"
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
                name="mật khẩu mới"
                vid="newPassword"
                rules="required|not-equal:@oldPassword|password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    v-model="newPassword"
                    :type="isNewPasswordShow ? 'text' : 'password'"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    placeholder="Mật khẩu mới"
                    maxlength="20"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="isNewPasswordShow ? 'EyeIcon' : 'EyeOffIcon'"
                      @click="isNewPasswordShow = !isNewPasswordShow"
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
                name="xác nhận mật khẩu"
                rules="required|equal:@newPassword"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    v-model="confirmPassword"
                    :type="isConfirmPasswordShow ? 'text' : 'password'"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Xác nhận mật khẩu"
                    maxlength="20"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="isConfirmPasswordShow ? 'EyeIcon' : 'EyeOffIcon'"
                      @click="isConfirmPasswordShow = !isConfirmPasswordShow"
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
              class="btn-brand-1"
              :disabled="invalid"
              variant="someThing"
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

        <hr>
        <b-row
          class="mx-0"
          style="font-size: 14px"
          align-h="between"
          align-v="center"
        >
          <b-row
            class="mx-0"
            align-v="center"
          >
            <b-img
              src="@/assets/images/logo/viettel-logo.svg"
              alt="Viettel logo"
              width="100px"
              fluid
            />
            <div class="mx-1">
              © Viettel
            </div>
          </b-row>

          <a href="https://viettel.com.vn">https://viettel.com.vn</a>
        </b-row>

      </b-card>
    <!-- /Reset Password -->
    </div>
  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  required, notEqual, confirmed, password, equal,
} from '@core/utils/validations/validations'
import toasts from '@core/utils/toasts/toasts'
import useJwt from '@/auth/jwt/useJwt'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      username: null,
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,

      // validation
      required,
      notEqual,
      confirmed,
      password,
      equal,

      // Toggle Password Status
      isOldPasswordShow: false,
      isNewPasswordShow: false,
      isConfirmPasswordShow: false,
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

  methods: {
    validationForm() {
      this.$refs.resetPasswordForm.validate().then(success => {
        if (success) {
          useJwt
            .changePassword({
              username: this.username.toLowerCase()?.trim(),
              oldPassword: this.oldPassword?.trim(),
              newPassword: this.newPassword?.trim(),
              confirmPassword: this.confirmPassword?.trim(),
            })
            .then(response => response.data)
            .then(res => {
              if (res.success) {
                this.navigateToLoginPage()
                toasts.success(res.statusValue)
              } else {
                throw new Error(res.statusValue)
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
