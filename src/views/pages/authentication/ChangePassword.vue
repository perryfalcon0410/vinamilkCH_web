<template>
  <b-modal
    id="modal-scoped"
    ref="my-modal"
    variant="primary"
    hide-footer
    header-bg-variant="primary"
    :visible="visible"
  >
    <template #modal-header="{}">
      <div class="w-100 text-center">
        <h2 class=" mt-1 font-weight-bold text-white">
          ĐỔI MẬT KHẨU
        </h2>
      </div>
    </template>
    <validation-observer
      ref="loginForm"
    >
      <!-- username -->
      <b-form-group
        label="Tên đăng nhập"
        label-for="login-username"
        class="mt-3 px-1"
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
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>

      <!-- password -->
      <b-form-group
        label="Mật khẩu"
        label-for="login-username"
        class="mt-3 px-1"
      >
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
              type="password"
              name="login-password"
              placeholder="Mật khẩu"
              maxlength="20"
            />
          </b-input-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>

      <!-- newPassword -->
      <b-form-group
        label="Mật khẩu mới"
        label-for="login-username"
        class="mt-3 px-1"
      >
        <validation-provider
          #default="{ errors }"
          name="new password"
          vid="password"
          rules="required"
        >
          <b-input-group
            class="input-group-merge"
            :class="errors.length > 0 ? 'is-invalid':null"
          >
            <b-form-input
              id="login-password"
              v-model="newPassword"
              :state="errors.length > 0 ? false:null"
              class="form-control-merge"
              type="password"
              name="login-password"
              placeholder="Mật khẩu mới"
              maxlength="20"
            />
          </b-input-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>

      <!-- reconfirmPassword -->
      <b-form-group
        label="Xác thực mật khẩu"
        label-for="login-username"
        class="mt-3 px-1"
      >
        <validation-provider
          #default="{ errors }"
          name="reconfirm password"
          vid="password"
          rules="required"
        >
          <b-input-group
            class="input-group-merge"
            :class="errors.length > 0 ? 'is-invalid':null"
          >
            <b-form-input
              id="login-password"
              v-model="reconfirmPassword"
              :state="errors.length > 0 ? false:null"
              class="form-control-merge"
              name="login-password"
              placeholder="Xác nhận mật khẩu"
              maxlength="20"
              type="password"
            />
          </b-input-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>
    </validation-observer>

    <b-col>
      <b-col
        class="my-3 pl-2 "
      >
        {{ data.statusValue }}
      </b-col>
    </b-col>

    <b-col>
      <b-button
        class="mt-4"
        variant="primary"
        block
        :disabled="invalid"
        @click="changePassword"
      >
        ĐỔI MẬT KHẨU
      </b-button>
      <b-button
        class="mt-1"
        block
        @click="toggleModal"
      >
        HỦY BỎ
      </b-button>
    </b-col>
    <b-col>
      <h5 class="mt-3 text-danger font-weight-light">
        Để đảm bảo an toàn, Khách hàng nên sử dụng mật khẩu mạnh: độ dài tối thiểu 8 ký tự, bao gồm: chữ hoa, thường, số và ký tự đặc biệt
      </h5>
    </b-col>
    <b-col />

    <b-navbar
      id="v-navbar"
      type="primary"
      class="mt-2"
    >
      <img
        src="../../../assets/images/banner/banner-27.jpg"
        width="60"
        height="50"
        class="mr-2"
      >
      <h6 class="font-weight-bold mr-auto">
        Copyright © Viettel
      </h6>
      <h6 class="text-primary small">
        http://viettel.com.vn
      </h6>
    </b-navbar>
  </b-modal>
</template>

<script>
import axios from '@axios'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      username: '',
      password: '',
      newPassword: '',
      reconfirmPassword: '',

      data: '',
    }
  },
  methods: {
    toggleModal() {
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    changePassword() {
      axios
        .put('user/change-password', {
          username: this.username,
          oldPassword: this.password,
          newPassword: this.newPassword,
          confirmPassword: this.reconfirmPassword,
        })
        // eslint-disable-next-line no-return-assign
        .then(response => ([
          this.data = response.data, // Data
          console.log(this.data),
        ]))
        .catch(error => {
          console.log(error)
        })
      console.log('data')
    },
  },
}
</script>
