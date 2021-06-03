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
                  <b-form-input
                    v-model="captchaCodeResponse"
                    disabled
                    class="text-center"
                  />
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
      permissions: [
        {
          id: 1,
          formCode: 'DashboardEcommerce', // Trang chủ - Thương mại điện tử
          orderNumber: 1,
          controls: [],
        },
        {
          id: 2,
          formCode: 'DashboardAnalytics', // Trang chủ - Phân tích
          orderNumber: 1,
          controls: [],
        },
        {
          id: 3,
          formCode: 'Sales', // Bán hàng
          orderNumber: 1,
          controls: [],
        },
        {
          id: 4,
          formCode: 'SalesCustomers', // Khách hàng
          orderNumber: 1,
          controls: [
            {
              id: 1,
              controlCode: 'SalesCustomersCreate', // Thêm mới
            },
            {
              id: 2,
              controlCode: 'SalesCustomersUpdate', // Cập nhật
            },
          ],
        },
        {
          id: 5,
          formCode: 'SalesRedBills', // Hoá đơn đỏ
          orderNumber: 1,
          controls: [
            {
              id: 1,
              controlCode: 'SalesRedBillsCreate', // Thêm mới
            },
          ],
        },
        {
          id: 6,
          formCode: 'SalesReceipts', // Hoá đơn bán hàng
          orderNumber: 1,
          controls: [],
        },
        {
          id: 7,
          formCode: 'SalesReturnedGoods', // Hàng trả lại
          orderNumber: 1,
          controls: [
            {
              id: 1,
              controlCode: 'SalesReturnedGoodsCreate', // Thêm mới
            },
          ],
        },
        {
          id: 8,
          formCode: 'Purchases', // Mua hàng
          orderNumber: 1,
          controls: [
            {
              id: 1,
              controlCode: 'PurchasesCreate', // Thêm mới
            },
          ],
        },
        {
          id: 9,
          formCode: 'WarehousesInput', // Nhập kho
          orderNumber: 1,
          controls: [
            {
              id: 1,
              controlCode: 'WarehousesInputCreate', // Thêm mới
            },
            {
              id: 2,
              controlCode: 'WarehousesInputUpdate', // Cập nhật
            },
          ],
        },
        {
          id: 10,
          formCode: 'WarehousesOutput', // Xuất kho
          orderNumber: 1,
          controls: [
            {
              id: 1,
              controlCode: 'WarehousesOutputCreate', // Thêm mới
            },
            {
              id: 2,
              controlCode: 'WarehousesOutputUpdate', // Cập nhật
            },
          ],
        },
        {
          id: 11,
          formCode: 'WarehousesInventory', // Kiểm kê
          orderNumber: 1,
          controls: [
            {
              id: 1,
              controlCode: 'WarehousesInventoryCreate', // Thêm mới
            },
            {
              id: 2,
              controlCode: 'WarehousesInventoryUpdate', // Cập nhật
            },
          ],
        },
        {
          id: 12,
          formCode: 'WarehousesExchangeDamagedGoods', // Đổi hàng hỏng
          orderNumber: 1,
          controls: [
            {
              id: 1,
              controlCode: 'WarehousesExchangeDamagedGoodsCreate', // Thêm mới
            },
            {
              id: 2,
              controlCode: 'WarehousesExchangeDamagedGoodsUpdate', // Cập nhật
            },
          ],
        },
        {
          id: 13,
          formCode: 'WarehousesCombo', // Combo
          orderNumber: 1,
          controls: [
            {
              id: 1,
              controlCode: 'WarehousesComboCreate', // Thêm mới
            },
            {
              id: 2,
              controlCode: 'WarehousesComboDetail', // Chi tiết
            },
          ],
        },
        {
          id: 14,
          formCode: 'ReportsReturnedGoods', // Báo cáo - Hàng trả lại
          orderNumber: 1,
          controls: [],
        },
        {
          id: 15,
          formCode: 'ReportsWarehousesInput', // Báo cáo - Kho - Nhập hàng
          orderNumber: 1,
          controls: [],
        },
        {
          id: 16,
          formCode: 'ReportsWarehousesOutput', // Báo cáo - Kho - Xuất hàng
          orderNumber: 1,
          controls: [],
        },
        {
          id: 17,
          formCode: 'ReportsWarehousesInventory', // Báo cáo - Kho - Tồn kho
          orderNumber: 1,
          controls: [],
        },
        {
          id: 18,
          formCode: 'ReportsWarehousesInputOutputInventory', // Báo cáo - Kho - Xuất nhập tồn
          orderNumber: 1,
          controls: [],
        },
        {
          id: 19,
          formCode: 'ReportsWarehousesPromotions', // Báo cáo - Kho - Hàng khuyến mãi
          orderNumber: 1,
          controls: [],
        },
        {
          id: 20,
          formCode: 'ReportsWarehousesPriceDifference', // Báo cáo - Kho - Chênh lệch giá
          orderNumber: 1,
          controls: [],
        },
        {
          id: 21,
          formCode: 'ReportsWarehousesExchangeDamagedGoods', // Báo cáo - Kho - Đổi hàng hỏng
          orderNumber: 1,
          controls: [],
        },
        {
          id: 22,
          formCode: 'ReportsWarehousesAdjustment', // Báo cáo - Kho - Nhập xuất điều chỉnh
          orderNumber: 1,
          controls: [],
        },
        {
          id: 23,
          formCode: 'ReportsPurchases', // Báo cáo - Mua hàng
          orderNumber: 1,
          controls: [],
        },
        {
          id: 24,
          formCode: 'ReportsSales', // Báo cáo - Bán hàng
          orderNumber: 1,
          controls: [],
        },
        {
          id: 25,
          formCode: 'ReportsSalesCatSale', // Báo cáo - Bán hàng - Doanh só CAT
          orderNumber: 1,
          controls: [],
        },
        {
          id: 26,
          formCode: 'ReportsSalesSaleReceiptPerCustomer', // Báo cáo - Bán hàng - Doanh số hóa đơn theo kh
          orderNumber: 1,
          controls: [],
        },
        {
          id: 27,
          formCode: 'ReportsSalesAmountReceiptPerCustomer', // Báo cáo - Bán hàng - Số lượng hóa đơn theo khách hàng
          orderNumber: 1,
          controls: [],
        },
        {
          id: 28,
          formCode: 'ReportsSalesReceiptOnDeliveryType', // Báo cáo - Bán hàng - Hóa đơn theo loại giao hàng
          orderNumber: 1,
          controls: [],
        },
        {
          id: 29,
          formCode: 'ReportsCustomers', // Báo cáo - Khách hàng
          orderNumber: 1,
          controls: [],
        },
        {
          id: 30,
          formCode: 'ReportsVouchers', // Báo cáo - Danh sách voucher
          orderNumber: 1,
          controls: [],
        },
        {
          id: 29,
          formCode: 'ReportsCustomersNonTransactional', // Báo cáo - Khách hàng không giao dịch
          orderNumber: 1,
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
    checkCaptchaExist(captcha) {
      if (captcha) {
        this.captchaCodeResponse = captcha
        this.captchaStatus = true
      } else {
        this.captchaStatus = false
      }
    },

    preLogin() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          useJwt
            .preLogin({
              username: this.username.toLowerCase(),
              password: this.password,
              captchaCode: this.captchaCodePost,
            })
            .then(response => response.data)
            .then(res => {
              if (res.success) {
                if (res.data) {
                  this.checkCaptchaExist(res.data.captcha)
                }

                if (res.data.roles.length === 1 && res.data.roles[0].shops.length === 1) {
                  this.login({
                    roleSelected: { value: res.data.roles[0].id },
                    shopSelected: { value: res.data.roles[0].shops[0].id },
                  })
                } else {
                  this.roles = res.data.roles
                  // show modal
                  this.$root.$emit('bv::toggle::modal', 'roleAndShopModal')
                }
              } else {
                if (res.data) {
                  this.checkCaptchaExist(res.data.captcha)
                }
                throw new Error(res.statusValue)
              }
            })
            .catch(error => {
              toasts.error(error.message)
            })
        }
      })
    },
    login(val) {
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

          if (success) {
            // Save password
            if (this.saveStatus) {
              localStorage.setItem('password', JSON.stringify(this.password))
            }

            const userData = {
              id: data.userId,
              fullName: `${data.firstName} ${data.lastName}`,
              username: data.username,
              email: data.email,
              usedRole: data.usedRole,
              usedShop: data.usedShop,
              phoneNumber: data.phoneNumber,

              // Other
              ability: [],
              avatar: require('@/assets/images/avatars/13-small.png'),
              role: 'admin',
              extras: {
                eCommerceCartItemsCount: 0,
              },
            }

            this.permissions.forEach(permission => {
              userData.ability.push({
                action: 'manage',
                subject: permission.formCode,
                formId: permission.id,
                ctrlId: undefined,
              })

              permission.controls.forEach(control => {
                userData.ability.push({
                  action: 'manage',
                  subject: control.controlCode,
                  formId: permission.id,
                  ctrlId: control.id,
                })
              })
            })

            useJwt.setToken(token.replace('Bearer ', ''))
            useJwt.setRefreshToken(token.replace('Bearer ', ''))
            localStorage.setItem('userData', JSON.stringify(userData))

            // this.$ability.update(userData.ability)
            this.$ability.update([{ action: 'manage', subject: 'all' }]) // => Temp

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
