<script>
import useJwt from '@/auth/jwt/useJwt'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { required, email } from '@validations'
// import store from '@/store/index'

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
    },
    username: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    validate: {
      type: String,
      default: '',
    },

  },
  data() {
    return {
      status: '',
      // eslint-disable-next-line global-require
      sideImg: require('@/assets/images/pages/login-v2.svg'),

      // validation rules
      required,
      email,

      selectedStore: null,
      optionsStore: [
        { text: 'Cửa hàng A' },
        { text: 'Cửa hàng B' },
      ],
      selectedRole: null,
      optionsRole: [
        { text: 'Quản lý 1 cửa hàng' },
        { text: 'Quản lý nhiều cửa hàng' },
      ],
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    toggleModal() {
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    ok() {
      this.$router.push({ name: 'navbar' })
    },
    login() {
      useJwt.login({
        username: this.username,
        password: this.password,
      })
        .then(response => {
          console.log(this.username)
          const { data } = response.data
          this.data = response.data
          const userData = {
            id: 1,
            fullName: `${data.firstName} ${data.lastName}`,
            username: this.username,
            // eslint-disable-next-line global-require
            avatar: require('@/assets/images/avatars/13-small.png'),
            email: data.email,
            role: 'admin',
            ability: [
              {
                action: 'manage',
                subject: 'all',
              },
            ],
            extras: {
              eCommerceCartItemsCount: 5,
            },
          }
          useJwt.setToken(response.data.token.replace('Bearer ', ''))
          useJwt.setRefreshToken(response.data.token.replace('Bearer ', ''))
          localStorage.setItem('userData', JSON.stringify(userData))
          this.$ability.update(userData.ability)

          // ? This is just for demo purpose as well.
          // ? Because we are showing eCommerce app's cart items count in navbar
          this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', userData.extras.eCommerceCartItemsCount)

          // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
          this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: `Welcome ${userData.fullName || userData.username}`,
                  icon: 'CoffeeIcon',
                  variant: 'success',
                  text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
                },
              })
            })
            .catch(error => {
              this.$refs.loginForm.setErrors(error.response)
            })
        })
    },
  },
}
</script>

<template>
  <!-- POPUP LOGIN START -->
  <b-modal
    id="modal-scoped"
    :visible="visible"
  >
    <template #modal-header="{ close }">
      <h3 class="w-100">
        Chọn vai trò và cửa hàng thao tác
      </h3>
      <b-button
        class="bg-light"
        size="sm"
        variant="light"
        @click="close()"
      >
        <b-icon
          icon="x"
          class="round"
          variant="danger"
          aria-hidden="true"
        />
      </b-button>
    </template>
    <p>Vai trò (*)</p>
    <b-form-select
      v-model="selectedRole"
      :options="optionsRole"
      class="mb-3"
    >
      <template #first>
        <b-form-select-option
          :value="null"
          disabled
        >
          Chọn vai trò
        </b-form-select-option>
      </template>
    </b-form-select>
    <p>Cửa hàng (*)</p>
    <b-form-select
      v-model="selectedStore"
      :options="optionsStore"
      class="mb-3"
    >
      <template #first>
        <b-form-select-option
          :value="null"
          disabled
        >
          Chọn cửa hàng
        </b-form-select-option>
      </template>
    </b-form-select>
    <template #modal-footer="{ cancel}">
      <div class="d-flex align-items-end justify-content-center w-100">
        <b-button
          size="md"
          variant="primary"
          @click="login()"
        >
          <h5 class="text-white">
            Đồng ý
          </h5>
        </b-button>
        <div class="w-25 bg-error" />
        <b-button
          size="md"
          @click="cancel()"
        >
          <h5 class="text-white">
            Đóng
          </h5>
        </b-button>
      </div>
    </template>
  </b-modal>
  <!-- POPUP LOGIN END -->
</template>
