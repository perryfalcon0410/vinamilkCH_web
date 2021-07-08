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
      formsTemp: [
        {
          id: 0,
          formCode: 'ResetPassword', // Đổi mật khẩu
          orderNumber: 0,
          controls: [],
        },
        {
          id: 0,
          formCode: 'NotAuthorized',
          orderNumber: 0,
          controls: [],
        },
        {
          id: 1,
          formCode: 'HomePage',
          formName: 'Trang chủ',
          parentFormId: null,
          type: 1,
          url: null,
          description: null,
          orderNumber: 1,
          subForms: [
            {
              id: 6,
              formCode: 'DashboardEcommerce',
              formName: 'Trang chủ - Thương mại điện tử',
              parentFormId: 1,
              type: 2,
              url: '/dashboard/ecommerce',
              description: null,
              orderNumber: 1,
              subForms: [],
              controls: [],
            },
            // {
            //   id: 7,
            //   formCode: 'DashboardAnalytics',
            //   formName: 'Phân tích',
            //   parentFormId: 1,
            //   type: 2,
            //   url: '/dashboard/analytics',
            //   description: null,
            //   orderNumber: 2,
            //   subForms: [],
            //   controls: [],
            // },
          ],
          controls: [],
        },
        {
          id: 2,
          formCode: 'Sales',
          formName: 'Bán Hàng',
          parentFormId: null,
          type: 1,
          url: null,
          description: null,
          orderNumber: 2,
          subForms: [
            {
              id: 8,
              formCode: 'Sales',
              formName: 'Bán hàng',
              parentFormId: 2,
              type: 2,
              url: '/sales/sales',
              description: null,
              orderNumber: 1,
              subForms: [],
              controls: [
                {
                  id: 1,
                  controlCode: 'SalesPay',
                  controlName: 'Thanh toán',
                  formId: 8,
                  description: 'Nút thanh toán',
                  showStatus: 2,
                },
              ],
            },
            {
              id: 9,
              formCode: 'SalesCustomers',
              formName: 'Khách hàng',
              parentFormId: 2,
              type: 2,
              url: '/sales/customers',
              description: null,
              orderNumber: 2,
              subForms: [
                {
                  id: 50,
                  formCode: 'SalesCustomersCreate',
                  formName: 'Tạo mới khách hàng',
                  parentFormId: 9,
                  type: 3,
                  url: '/sales/customers/create',
                  description: null,
                  orderNumber: 1,
                  subForms: null,
                  controls: [
                    {
                      id: 117,
                      controlCode: 'CustomersCreateSave',
                      controlName: 'Tạo mới khách hàng lưu',
                      formId: 50,
                      description: 'Nút lưu thêm mới khách hàng',
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 51,
                  formCode: 'SalesCustomersUpdate',
                  formName: 'Cập nhật khách hàng',
                  parentFormId: 9,
                  type: 3,
                  url: '/sales/customers/:id/update',
                  description: null,
                  orderNumber: 2,
                  subForms: null,
                  controls: [
                    {
                      id: 116,
                      controlCode: 'CustomersUpdateSave',
                      controlName: 'Cập nhật khách hàng lưu',
                      formId: 51,
                      description: 'Nút lưu cập nhật khách hàng',
                      showStatus: 2,
                    },
                  ],
                },
              ],
              controls: [
                {
                  id: 3,
                  controlCode: 'CustomersExcel',
                  controlName: 'Xuất excel',
                  formId: 9,
                  description: 'Nút xuất excel khách hàng',
                  showStatus: 2,
                },
                {
                  id: 4,
                  controlCode: 'CustomersUpdate',
                  controlName: 'Cập nhật',
                  formId: 9,
                  description: 'Nút cập nhật khách hàng',
                  showStatus: 2,
                },
                {
                  id: 2,
                  controlCode: 'CustomersCreate',
                  controlName: 'Thêm mới',
                  formId: 9,
                  description: 'Nút thêm mới khách hàng',
                  showStatus: 2,
                },
              ],
            },
            {
              id: 10,
              formCode: 'SalesRedBills',
              formName: 'Hoá đơn đỏ',
              parentFormId: 2,
              type: 2,
              url: '/sales/red-bills',
              description: null,
              orderNumber: 3,
              subForms: [
                {
                  id: 52,
                  formCode: 'SalesRedBillsCreate',
                  formName: 'Tạo hóa đơn đỏ',
                  parentFormId: 10,
                  type: 3,
                  url: '/sales/red-bills/create',
                  description: null,
                  orderNumber: 1,
                  subForms: null,
                  controls: [
                    {
                      id: 118,
                      controlCode: 'RedBillsCreateSave',
                      controlName: 'Lưu thêm mới hóa đơn đỏ',
                      formId: 52,
                      description: 'Nút lưu thêm mới hóa đơn đỏ',
                      showStatus: 2,
                    },
                    {
                      id: 119,
                      controlCode: 'RedBillsCreateSave&Print',
                      controlName: 'Lưu và in thêm mới hóa đơn đỏ',
                      formId: 52,
                      description: 'Nút lưu và in thêm mới hóa đơn đỏ',
                      showStatus: 2,
                    },
                  ],
                },
              ],
              controls: [
                {
                  id: 5,
                  controlCode: 'PurchasesCreate',
                  controlName: 'Thêm mới',
                  formId: 10,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 6,
                  controlCode: 'WarehousesInputCreate',
                  controlName: 'Thêm mới',
                  formId: 10,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 7,
                  controlCode: 'WarehousesInputUpdate',
                  controlName: 'Cập nhật',
                  formId: 10,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 8,
                  controlCode: 'WarehousesOutputCreate',
                  controlName: 'Thêm mới',
                  formId: 10,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 9,
                  controlCode: 'WarehousesOutputUpdate',
                  controlName: 'Cập nhật',
                  formId: 10,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 109,
                  controlCode: 'RedBillsExcel',
                  controlName: 'Xuất excel hóa đơn đỏ',
                  formId: 10,
                  description: 'Nút xuất excel hóa đơn đỏ',
                  showStatus: 2,
                },
                {
                  id: 110,
                  controlCode: 'RedBillsPrint',
                  controlName: 'In hóa đơn đỏ',
                  formId: 10,
                  description: 'Nút in hóa đơn đỏ',
                  showStatus: 2,
                },
                {
                  id: 111,
                  controlCode: 'RedBillsUpdate',
                  controlName: 'Cập nhật hóa đơn đỏ',
                  formId: 10,
                  description: 'Nút cập nhật hóa đơn đỏ',
                  showStatus: 2,
                },
                {
                  id: 112,
                  controlCode: 'RedBillsCreate',
                  controlName: 'Thêm mới hóa đơn đỏ',
                  formId: 10,
                  description: 'Nút thêm mới hóa đơn đỏ',
                  showStatus: 2,
                },
                {
                  id: 113,
                  controlCode: 'RedBillsDelete',
                  controlName: 'Xóa hóa đơn đỏ',
                  formId: 10,
                  description: 'Nút xóa hóa đơn đỏ',
                  showStatus: 2,
                },
              ],
            },
            {
              id: 11,
              formCode: 'SalesReceipts',
              formName: 'Hoá đơn bán hàng',
              parentFormId: 2,
              type: 2,
              url: '/sales/receipts',
              description: null,
              orderNumber: 4,
              subForms: [],
              controls: [
                {
                  id: 10,
                  controlCode: 'WarehousesInventoryCreate',
                  controlName: 'Thêm mới',
                  formId: 11,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 11,
                  controlCode: 'WarehousesInventoryUpdate',
                  controlName: 'Cập nhật',
                  formId: 11,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 114,
                  controlCode: 'SalesReceiptsPrint',
                  controlName: 'In hóa đơn bán hàng',
                  formId: 11,
                  description: 'Nút in hóa đơn bán hàng',
                  showStatus: 2,
                },
              ],
            },
            {
              id: 12,
              formCode: 'SalesReturnedGoods',
              formName: 'Hàng trả lại',
              parentFormId: 2,
              type: 2,
              url: '/sales/returned-goods',
              description: null,
              orderNumber: 5,
              subForms: [
                {
                  id: 53,
                  formCode: 'SalesReturnedGoodsCreate',
                  formName: 'Thêm mới hàng trả lại',
                  parentFormId: 12,
                  type: 3,
                  url: '/sales/returned-goods/create',
                  description: null,
                  orderNumber: 1,
                  subForms: null,
                  controls: [
                    {
                      id: 120,
                      controlCode: 'ReturnedGoodsCreate',
                      controlName: 'Hoàn thành trả hàng',
                      formId: 53,
                      description: 'Nút hoàn thành trả hàng',
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 79,
                  formCode: 'SalesReturnedGoodsDetail',
                  formName: 'Xem chi tiết hàng trả lại',
                  parentFormId: 12,
                  type: 3,
                  url: '/sales/returned-goods/detail/:id',
                  description: null,
                  orderNumber: 2,
                  subForms: null,
                  controls: [],
                },
              ],
              controls: [
                {
                  id: 12,
                  controlCode: 'WarehousesExchangeDamagedGoodsCreate',
                  controlName: 'Thêm mới',
                  formId: 12,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 115,
                  controlCode: 'SalesReturnedGoodsCreate',
                  controlName: 'Trả hàng thêm mới',
                  formId: 12,
                  description: 'Nút thêm mới hóa đơn trả hàng',
                  showStatus: 2,
                },
              ],
            },
          ],
          controls: [],
        },
        {
          id: 3,
          formCode: 'Purchases',
          formName: 'Mua Hàng',
          parentFormId: null,
          type: 1,
          url: '/purchases',
          description: null,
          orderNumber: 3,
          subForms: [],
          controls: [
            {
              id: 160,
              controlCode: 'PurchasesDelete',
              controlName: 'Xóa phiếu mua hàng',
              formId: 3,
              description: null,
              showStatus: 2,
            },
            {
              id: 140,
              controlCode: 'PurchasesApprove',
              controlName: 'Phê duyệt mua hàng',
              formId: 3,
              description: null,
              showStatus: 2,
            },
          ],
        },
        {
          id: 4,
          formCode: 'Warehouses',
          formName: 'Kho',
          parentFormId: null,
          type: 1,
          url: null,
          description: null,
          orderNumber: 4,
          subForms: [
            {
              id: 13,
              formCode: 'WarehousesInput',
              formName: 'Nhập hàng',
              parentFormId: 4,
              type: 2,
              url: '/warehouses/input',
              description: null,
              orderNumber: 1,
              subForms: [
                {
                  id: 70,
                  formCode: 'WarehousesInputCreate',
                  formName: 'Tạo phiệu nhập hàng',
                  parentFormId: 13,
                  type: 3,
                  url: '/warehouses/input/create',
                  description: null,
                  orderNumber: 1,
                  subForms: null,
                  controls: [
                    {
                      id: 60,
                      controlCode: 'WarehousesInputCreateSave',
                      controlName: 'Lưu thêm mới',
                      formId: 70,
                      description: 'Nhập hàng',
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 71,
                  formCode: 'WarehousesInputUpdate',
                  formName: 'Cập nhật phiếu nhập hàng',
                  parentFormId: 13,
                  type: 3,
                  url: '/warehouses/input/:id/type/:type/po/:poId/update',
                  description: null,
                  orderNumber: 1,
                  subForms: null,
                  controls: [
                    {
                      id: 64,
                      controlCode: 'WarehousesInputUpdateSave',
                      controlName: 'Lưu cập nhật',
                      formId: 71,
                      description: 'Nhập hàng',
                      showStatus: 2,
                    },
                  ],
                },
              ],
              controls: [
                {
                  id: 13,
                  controlCode: 'WarehousesComboCreate',
                  controlName: 'Thêm mới',
                  formId: 13,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 39,
                  controlCode: 'WarehousesInputCreate',
                  controlName: 'Thêm mới',
                  formId: 13,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 40,
                  controlCode: 'WarehousesInputUpdate',
                  controlName: 'Cập nhât',
                  formId: 13,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 41,
                  controlCode: 'WarehousesInputDelete',
                  controlName: 'Xóa',
                  formId: 13,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 42,
                  controlCode: 'WarehousesInputPrint',
                  controlName: 'In',
                  formId: 13,
                  description: null,
                  showStatus: 2,
                },
              ],
            },
            {
              id: 14,
              formCode: 'WarehousesOutput',
              formName: 'Xuất hàng',
              parentFormId: 4,
              type: 2,
              url: '/warehouses/output',
              description: null,
              orderNumber: 2,
              subForms: [
                {
                  id: 72,
                  formCode: 'WarehousesOutputCreate',
                  formName: 'Tạo phiếu xuất hàng',
                  parentFormId: 14,
                  type: 3,
                  url: '/warehouses/output/create',
                  description: null,
                  orderNumber: 1,
                  subForms: null,
                  controls: [
                    {
                      id: 65,
                      controlCode: 'WarehousesOutputCreateSave',
                      controlName: 'Lưu thêm mới',
                      formId: 72,
                      description: 'Xuất hàng',
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 73,
                  formCode: 'WarehousesOutputUpdate',
                  formName: 'Cập nhật phiếu xuất hàng',
                  parentFormId: 14,
                  type: 3,
                  url: '/warehouses/output/:id/type/:type/update',
                  description: null,
                  orderNumber: 2,
                  subForms: null,
                  controls: [
                    {
                      id: 66,
                      controlCode: 'WarehousesOutputUpdateSave',
                      controlName: 'Lưu cập nhật',
                      formId: 73,
                      description: 'Xuất hàng',
                      showStatus: 2,
                    },
                  ],
                },
              ],
              controls: [
                {
                  id: 43,
                  controlCode: 'WarehousesOutputCreate',
                  controlName: 'Thêm mới',
                  formId: 14,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 44,
                  controlCode: 'WarehousesOutputUpdate',
                  controlName: 'Cập nhật',
                  formId: 14,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 45,
                  controlCode: 'WarehousesOutputDelete',
                  controlName: 'Xóa',
                  formId: 14,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 46,
                  controlCode: 'WarehousesOutputPrint',
                  controlName: 'In',
                  formId: 14,
                  description: null,
                  showStatus: 2,
                },
              ],
            },
            {
              id: 15,
              formCode: 'WarehousesInventory',
              formName: 'Kiểm kê',
              parentFormId: 4,
              type: 2,
              url: '/warehouses/inventory',
              description: null,
              orderNumber: 3,
              subForms: [
                {
                  id: 74,
                  formCode: 'WarehousesInventoryCreate',
                  formName: 'Tạo phiếu kiểm kê',
                  parentFormId: 15,
                  type: 3,
                  url: '/warehouses/inventory/create',
                  description: null,
                  orderNumber: 1,
                  subForms: null,
                  controls: [
                    {
                      id: 67,
                      controlCode: 'WarehousesInventoryCreateSave',
                      controlName: 'Lưu thêm mới',
                      formId: 74,
                      description: 'Kiểm kê',
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 75,
                  formCode: 'WarehousesInventoryUpdate',
                  formName: 'Cập nhật phiếu kiểm kê',
                  parentFormId: 15,
                  type: 3,
                  url: '/warehouses/inventory/:id/update',
                  description: null,
                  orderNumber: 2,
                  subForms: null,
                  controls: [
                    {
                      id: 61,
                      controlCode: 'WarehousesInventoryUpdateSave',
                      controlName: 'Lưu cập nhật',
                      formId: 75,
                      description: 'Kiểm kê',
                      showStatus: 2,
                    },
                  ],
                },
              ],
              controls: [
                {
                  id: 47,
                  controlCode: 'WarehousesInventoryCreate',
                  controlName: 'Thêm mới',
                  formId: 15,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 48,
                  controlCode: 'WarehousesInventoryUpdate',
                  controlName: 'Cập nhật',
                  formId: 15,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 51,
                  controlCode: 'WarehousesInventoryExcel',
                  controlName: 'Xuất excel',
                  formId: 15,
                  description: null,
                  showStatus: 2,
                },
              ],
            },
            {
              id: 17,
              formCode: 'WarehousesCombo',
              formName: 'Combo',
              parentFormId: 4,
              type: 2,
              url: '/warehouses/combo',
              description: null,
              orderNumber: 5,
              subForms: [
                {
                  id: 78,
                  formCode: 'WarehousesComboCreate',
                  formName: 'Tạo mới combo',
                  parentFormId: 17,
                  type: 3,
                  url: '/warehouses/combo/create',
                  description: null,
                  orderNumber: 1,
                  subForms: null,
                  controls: [
                    {
                      id: 69,
                      controlCode: 'WarehousesComboCreateSave',
                      controlName: 'Lưu thêm mới',
                      formId: 78,
                      description: 'Xuất nhập combo',
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 79,
                  formCode: 'WarehousesComboDetail',
                  formName: 'Xem chi tiết combo',
                  parentFormId: 17,
                  type: 3,
                  url: '/warehouses/combo/detail/:id',
                  description: null,
                  orderNumber: 2,
                  subForms: null,
                  controls: [],
                },
              ],
              controls: [
                {
                  id: 55,
                  controlCode: 'WarehousesComboCreate',
                  controlName: 'Thêm mới',
                  formId: 17,
                  description: null,
                  showStatus: 2,
                },
              ],
            },
            {
              id: 18,
              formCode: 'WarehousesExchangeDamagedGoods',
              formName: 'Đổi hàng hỏng',
              parentFormId: 4,
              type: 2,
              url: '/warehouses/exchange-damaged-goods',
              description: null,
              orderNumber: 4,
              subForms: [
                {
                  id: 76,
                  formCode: 'WarehousesExchangeDamagedGoodsCreate',
                  formName: 'Tạo mới phiếu đổi hàng hỏng',
                  parentFormId: 18,
                  type: 3,
                  url: '/warehouses/exchange-damaged-goods/create',
                  description: null,
                  orderNumber: 1,
                  subForms: null,
                  controls: [
                    {
                      id: 62,
                      controlCode: 'WarehousesExchangeDamagedGoodsCreateSave',
                      controlName: 'Lưu tạo mới',
                      formId: 76,
                      description: 'Đổi hàng hỏng',
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 77,
                  formCode: 'WarehousesExchangeDamagedGoodsUpdate',
                  formName: 'Cập nhật phiếu đổi hàng hỏng',
                  parentFormId: 18,
                  type: 3,
                  url: '/warehouses/exchange-damaged-goods/update',
                  description: null,
                  orderNumber: 2,
                  subForms: null,
                  controls: [
                    {
                      id: 63,
                      controlCode: 'WarehousesExchangeDamagedGoodsUpdateSave',
                      controlName: 'Lưu cập nhật',
                      formId: 77,
                      description: 'Đổi hàng hỏng',
                      showStatus: 2,
                    },
                  ],
                },
              ],
              controls: [
                {
                  id: 53,
                  controlCode: 'WarehousesExchangeDamagedGoodsUpdate',
                  controlName: 'Cập nhật',
                  formId: 18,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 54,
                  controlCode: 'WarehousesExchangeDamagedGoodsDelete',
                  controlName: 'Xóa',
                  formId: 18,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 52,
                  controlCode: 'WarehousesExchangeDamagedGoodsCreate',
                  controlName: 'Thêm mới',
                  formId: 18,
                  description: null,
                  showStatus: 2,
                },
              ],
            },
          ],
          controls: [],
        },
        {
          id: 5,
          formCode: 'Reports',
          formName: 'Báo cáo',
          parentFormId: null,
          type: 1,
          url: null,
          description: null,
          orderNumber: 5,
          subForms: [
            {
              id: 80,
              formCode: 'ReportsReturnedGoods',
              formName: 'Hàng trả lại',
              parentFormId: 5,
              type: 2,
              url: '/reports/returned-goods',
              description: null,
              orderNumber: 1,
              subForms: [],
              controls: [
                {
                  id: 76,
                  controlCode: 'ReportsReturnedGoodsPrint',
                  controlName: 'In báo cáo hàng trả lại',
                  formId: 80,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 77,
                  controlCode: 'ReportsReturnedGoodsExcel',
                  controlName: 'Xuất excel cáo hàng trả lại',
                  formId: 80,
                  description: null,
                  showStatus: 2,
                },
              ],
            },
            {
              id: 28,
              formCode: 'ReportWarehouses',
              formName: 'Kho',
              parentFormId: 5,
              type: 2,
              url: '/reports/warehouses',
              description: null,
              orderNumber: 2,
              subForms: [
                {
                  id: 19,
                  formCode: 'ReportsWarehousesInput',
                  formName: 'Nhập hàng',
                  parentFormId: 28,
                  type: 3,
                  url: '/reports/warehouses/input',
                  description: null,
                  orderNumber: 1,
                  subForms: null,
                  controls: [
                    {
                      id: 89,
                      controlCode: 'ReportsWarehousesInputPrint',
                      controlName: 'In báo cáo nhập hàng',
                      formId: 19,
                      description: null,
                      showStatus: 2,
                    },
                    {
                      id: 90,
                      controlCode: 'ReportsWarehousesInputExcel',
                      controlName: 'Xuất excel báo cáo nhập hàng',
                      formId: 19,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 20,
                  formCode: 'ReportsWarehousesOutput',
                  formName: 'Xuất hàng',
                  parentFormId: 28,
                  type: 3,
                  url: '/reports/warehouses/output',
                  description: null,
                  orderNumber: 2,
                  subForms: null,
                  controls: [
                    {
                      id: 91,
                      controlCode: 'ReportsWarehousesOutputPrint',
                      controlName: 'In báo cáo xuất hàng',
                      formId: 20,
                      description: null,
                      showStatus: 2,
                    },
                    {
                      id: 92,
                      controlCode: 'ReportsWarehousesOutputExcel',
                      controlName: 'Xuất excel báo cáo xuất hàng',
                      formId: 20,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 21,
                  formCode: 'ReportsWarehousesInventory',
                  formName: 'Tồn kho',
                  parentFormId: 28,
                  type: 3,
                  url: '/reports/warehouses/inventory',
                  description: null,
                  orderNumber: 3,
                  subForms: null,
                  controls: [
                    {
                      id: 93,
                      controlCode: 'ReportsWarehousesInventoryPrint',
                      controlName: 'In báo cáo tồn kho',
                      formId: 21,
                      description: null,
                      showStatus: 2,
                    },
                    {
                      id: 96,
                      controlCode: 'ReportsWarehousesInventoryExcel',
                      controlName: 'Xuất excel báo cáo tồn kho',
                      formId: 21,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 22,
                  formCode: 'ReportsWarehousesInputOutputInventory',
                  formName: 'Xuất nhập tồn',
                  parentFormId: 28,
                  type: 3,
                  url: '/reports/warehouses/input-output-inventory',
                  description: null,
                  orderNumber: 4,
                  subForms: null,
                  controls: [
                    {
                      id: 94,
                      controlCode: 'ReportsWarehousesInputOutputInventoryPrint',
                      controlName: 'In báo cáo xuất nhập tồn',
                      formId: 22,
                      description: null,
                      showStatus: 2,
                    },
                    {
                      id: 95,
                      controlCode: 'ReportsWarehousesInputOutputInventoryExcel',
                      controlName: 'Xuất excel báo cáo xuất nhập tồn',
                      formId: 22,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 23,
                  formCode: 'ReportsWarehousesPromotions',
                  formName: 'Hàng khuyến mãi',
                  parentFormId: 28,
                  type: 3,
                  url: '/reports/warehouses/promotion',
                  description: null,
                  orderNumber: 5,
                  subForms: null,
                  controls: [
                    {
                      id: 97,
                      controlCode: 'ReportsWarehousesPromotionsPrint',
                      controlName: 'In báo cáo hàng khuyến mãi',
                      formId: 23,
                      description: null,
                      showStatus: 2,
                    },
                    {
                      id: 98,
                      controlCode: 'ReportsWarehousesPromotionsExcel',
                      controlName: 'Xuất excel báo cáo hàng khuyến mãi',
                      formId: 23,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 24,
                  formCode: 'ReportsWarehousesPriceDifference',
                  formName: 'Chênh lệch giá',
                  parentFormId: 28,
                  type: 3,
                  url: '/reports/warehouses/difference-price',
                  description: null,
                  orderNumber: 6,
                  subForms: null,
                  controls: [
                    {
                      id: 99,
                      controlCode: 'ReportsWarehousesPriceDifferencePrint',
                      controlName: 'In báo cáo chên lệch giá',
                      formId: 24,
                      description: null,
                      showStatus: 2,
                    },
                    {
                      id: 100,
                      controlCode: 'ReportsWarehousesPriceDifferenceExcel',
                      controlName: 'Xuất excel báo cáo chênh lệch giá',
                      formId: 24,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 25,
                  formCode: 'ReportsWarehousesExchangeDamagedGoods',
                  formName: 'Đổi hàng hỏng',
                  parentFormId: 28,
                  type: 3,
                  url: '/reports/warehouses/exchange-damaged-goods',
                  description: null,
                  orderNumber: 7,
                  subForms: null,
                  controls: [
                    {
                      id: 102,
                      controlCode: 'ReportsWarehousesExchangeDamagedGoodsExcel',
                      controlName: 'Xuất excel báo cáo đổi hàng hỏng',
                      formId: 25,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 26,
                  formCode: 'ReportsWarehousesAdjustment',
                  formName: 'Nhập xuất điều chỉnh',
                  parentFormId: 28,
                  type: 3,
                  url: '/reports/warehouses/adjustment',
                  description: null,
                  orderNumber: 8,
                  subForms: null,
                  controls: [
                    {
                      id: 103,
                      controlCode: 'ReportsWarehousesAdjustmentExcel',
                      controlName: 'Xuất excel báo cáo nhập xuất điều chỉnh',
                      formId: 26,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
              ],
              controls: [],
            },
            {
              id: 27,
              formCode: 'ReportsWarehouseInputDetails',
              formName: 'Bảng kê chi tiết đơn nhập hàng',
              parentFormId: 5,
              type: 2,
              url: '/reports/purchases',
              description: null,
              orderNumber: 3,
              subForms: [],
              controls: [
                {
                  id: 78,
                  controlCode: 'ReportsWarehouseInputDetailsPrint',
                  controlName: 'In báo cáo kê chi tiết đơn nhập hàng',
                  formId: 27,
                  description: null,
                  showStatus: 2,
                },
                {
                  id: 79,
                  controlCode: 'ReportsWarehouseInputDetailsExcel',
                  controlName: 'Xuất excel báo cáo kê chi tiết đơn nhập hàng',
                  formId: 27,
                  description: null,
                  showStatus: 2,
                },
              ],
            },
            {
              id: 29,
              formCode: 'ReportsSales',
              formName: 'Bán hàng',
              parentFormId: 5,
              type: 2,
              url: '/reports/sales',
              description: null,
              orderNumber: 4,
              subForms: [
                {
                  id: 92,
                  formCode: 'ReportsSalesSale',
                  formName: 'Báo cáo bán hàng',
                  parentFormId: 29,
                  type: 3,
                  url: null,
                  description: null,
                  orderNumber: null,
                  subForms: null,
                  controls: [
                    {
                      id: 124,
                      controlCode: 'ReportsSalesSalePrint',
                      controlName: 'In báo cáo bán hàng',
                      formId: 92,
                      description: null,
                      showStatus: 2,
                    },
                    {
                      id: 125,
                      controlCode: 'ReportsSalesSaleExcel',
                      controlName: 'Xuất excel báo cáo bán hàng',
                      formId: 92,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 93,
                  formCode: 'ReportsSalesCatSale',
                  formName: 'Báo cáo doanh số CAT',
                  parentFormId: 29,
                  type: 3,
                  url: null,
                  description: null,
                  orderNumber: null,
                  subForms: null,
                  controls: [
                    {
                      id: 126,
                      controlCode: 'ReportsSalesAmountCATExcel',
                      controlName: 'Xuất excel báo cáo doanh số CAT',
                      formId: 93,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 94,
                  formCode: 'ReportsSalesSaleReceiptPerCustomer',
                  formName: 'Báo cáo doanh số hóa đơn theo KH',
                  parentFormId: 29,
                  type: 3,
                  url: null,
                  description: null,
                  orderNumber: null,
                  subForms: null,
                  controls: [
                    {
                      id: 127,
                      controlCode: 'ReportsSalesSaleReceiptPerCustomerExcel',
                      controlName: 'Xuất excel báo cáo doanh số hóa đơn theo khách hàng',
                      formId: 94,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 95,
                  formCode: 'ReportsSalesAmountReceiptPerCustomer',
                  formName: 'Báo cáo số lượng hóa đơn theo KH',
                  parentFormId: 29,
                  type: 3,
                  url: null,
                  description: null,
                  orderNumber: null,
                  subForms: null,
                  controls: [
                    {
                      id: 128,
                      controlCode: 'ReportsSalesAmountReceiptPerCustomerExcel',
                      controlName: 'Xuất excel báo cáo số lượng hóa đơn theo khách hàng',
                      formId: 95,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 96,
                  formCode: 'ReportsSalesReceiptOnDeliveryType',
                  formName: 'Hóa đơn theo loại giao hàng',
                  parentFormId: 29,
                  type: 3,
                  url: null,
                  description: null,
                  orderNumber: null,
                  subForms: null,
                  controls: [
                    {
                      id: 129,
                      controlCode: 'ReportsSalesReceiptOnDeliveryTypeExcel',
                      controlName: 'Xuất excel báo cáo  báo cáo hóa đơn theo loại giao hàng',
                      formId: 96,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
              ],
              controls: [],
            },
            {
              id: 30,
              formCode: 'ReportsVouchers',
              formName: 'Danh sách voucher',
              parentFormId: 5,
              type: 2,
              url: null,
              description: null,
              orderNumber: 6,
              subForms: [],
              controls: [
                {
                  id: 80,
                  controlCode: 'ReportsVouchersExcel',
                  controlName: 'Xuất excel báo cáo voucher',
                  formId: 30,
                  description: null,
                  showStatus: 2,
                },
              ],
            },
            {
              id: 31,
              formCode: 'ReportsCustomers',
              formName: 'Khách hàng',
              parentFormId: 5,
              type: 2,
              url: '/reports/customers/customers',
              description: null,
              orderNumber: 5,
              subForms: [
                {
                  id: 90,
                  formCode: 'ReportsCustomersTrade',
                  formName: 'Khách hàng',
                  parentFormId: 31,
                  type: 3,
                  url: null,
                  description: null,
                  orderNumber: null,
                  subForms: null,
                  controls: [
                    {
                      id: 121,
                      controlCode: 'ReportsCustomersTradeExcel',
                      controlName: 'Xuất excel bao cáo khách hàng co giao dịch',
                      formId: 90,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
                {
                  id: 91,
                  formCode: 'ReportsCustomersNonTransactional',
                  formName: 'Khách hang không giao dịch',
                  parentFormId: 31,
                  type: 3,
                  url: null,
                  description: null,
                  orderNumber: null,
                  subForms: null,
                  controls: [
                    {
                      id: 122,
                      controlCode: 'ReportsCustomersNonTransactionalPrint',
                      controlName: 'In báo cáo khách hàng không giao dịch',
                      formId: 91,
                      description: null,
                      showStatus: 2,
                    },
                    {
                      id: 123,
                      controlCode: 'ReportsCustomersNonTransactionalExcel',
                      controlName: 'Xuất excel báo cáo khách hàng không giao dịch',
                      formId: 91,
                      description: null,
                      showStatus: 2,
                    },
                  ],
                },
              ],
              controls: [],
            },
          ],
          controls: [],
        },
      ],
      forms: [],
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
    mapSubForms(subForms) {
      subForms.forEach(subForm => {
        this.forms.push({
          action: 'manage',
          subject: subForm.formCode,
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
                // Check captcha exist
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
                  this.$bvModal.show('roleAndShopModal')
                }
              } else {
                // Check captcha exist
                if (res.data) {
                  this.checkCaptchaExist(res.data.captcha)
                }
                throw new Error(res.statusValue)
              }

              if (!res) {
                throw new Error('Server không hoạt động, vui lòng liên hệ Quản trị')
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

            this.mapSubForms(this.formsTemp)

            const userData = {
              id: data.userId,
              fullName: `${data.firstName} ${data.lastName}`,
              username: data.username,
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
        .catch(() => {
          toasts.error('Server không hoạt động, vui lòng liên hệ admin')
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
