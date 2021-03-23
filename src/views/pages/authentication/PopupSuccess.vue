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
    <b-row class="p-1">
      Vai trò (
      <b-card-text class="text-danger">
        *
      </b-card-text>
      )
    </b-row>

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

    <b-row class="p-1">
      Cửa hàng (
      <b-card-text class="text-danger">
        *
      </b-card-text>
      )
    </b-row>
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

    <template #modal-footer="{}">
      <div class="d-flex align-items-end justify-content-center w-100">
        <b-button
          variant="primary"
          class="text-white mr-3"
          :disabled="selectedRole !=null ? false:true"
          @click="login()"
        >
          Đồng ý
        </b-button>
        <b-button
          class="text-white"
          @click="cancel()"
        >
          Đóng
        </b-button>
      </div>
    </template>
  </b-modal>
  <!-- POPUP LOGIN END -->
</template>

<script>
import useJwt from '@/auth/jwt/useJwt'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { required, email } from '@validations'

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
    role: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
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
      valueShowModalChangPass: false,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    optionsRole() {
      return this.role.map(e => (
        { text: e.role, value: e.id }
      ))
    },
  },
  methods: {
    // reloads the page, bringing the user back to the login page
    cancel() {
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    },

    login() {
      useJwt.login(this.selectedRole, {
        username: this.username,
        password: this.password,
      })
        .then(response => {
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
