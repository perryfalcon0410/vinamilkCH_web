<template>
  <b-col
    lg="4"
    class="d-print-none bg-white shadow rounded mt-sm-1 mt-lg-0 py-1"
  >
    <validation-observer
      ref="formContainer"
      class="d-print-none"
    >
      <b-form>
        <!-- START - Date and name -->
        <b-row
          class="mb-1"
          align-h="between"
        >
          <!-- START - Date  -->
          <b-col
            class="mx-0"
            cols="5"
            align-h="between"
            align-v="center"
          >
            <b-icon-alarm-fill
              class="margin-block"
              font-scale="1.7"
            />
            {{ currentDate }}
          </b-col>
          <!-- END - Date  -->

          <!-- START - Name  -->
          <b-col
            class="mx-0 mt-md-1 mt-xl-0 pr-1 pl-0 word-wrap text-right"
            cols="7"
            align-v="center"
          >
            <b-icon-person-fill
              font-scale="1.7"
              class="mr-1"
            />
            {{ customer.fullName }}
          </b-col>
        <!-- END - Name  -->

        </b-row>
        <!-- END - Date and name -->

        <!-- START - Section customer -->
        <b-row
          v-b-toggle.collapseCustomer
          align-v="center"
          class="bg-light"
          @click="onCollapseCustomersClick()"
        >
          <b-icon-people
            font-scale="1.7"
            class="mx-1 margin-icon"
          />
          Khách hàng
          <b-icon-chevron-down
            :class="isCheckRotate ? 'rotate' : 'rotate-down'"
            class="ml-auto mx-1"
          />
        </b-row>

        <b-collapse
          id="collapseCustomer"
          visible
        >
          <b-col
            class="px-0 h7"
            md="12"
          >
            <!-- START - Search -->
            <!-- <b-row class="px-0 mx-0">
              <b-form-checkbox
                v-model="customerOfShop"
                class="mt-2 mr-2"
              >
                Khách hàng của cửa hàng
              </b-form-checkbox>
              <b-form-checkbox
                v-model="searchPhoneOnly"
                class="mt-2"
              >
                Chỉ tìm theo SĐT
              </b-form-checkbox>
            </b-row> -->
            <b-row
              class="px-0 mx-0"
            >
              <b-input-group class="input-group-merge mt-1">
                <b-input-group-prepend
                  is-text
                  style="position: absolute; height: 100%"
                >
                  <b-icon-search
                    v-b-popover.hover.top="'Tìm kiếm khách hàng'"
                    class="cursor-pointer"
                    @click="showSearchModal"
                  />
                </b-input-group-prepend>
                <vue-autosuggest
                  ref="search"
                  v-model="search"
                  :suggestions="customersSearch"
                  autofocus
                  class="w-100"
                  align-v="center"
                  :input-props="{
                    id:'autosuggest__input',
                    class:'form-control pl-4',
                    placeholder:'Tìm khách hàng (F4) - Vui lòng nhập ít nhất 4 kí tự',
                  }"
                  @selected="onclickChooseCustomer"
                  @keyup.enter="onChangeKeyWord"
                  @input="changeInput"
                  @focus="focusInput"
                >
                  <template
                    slot-scope="{ suggestion }"
                  >
                    <b-row class="mx-0">

                      <!-- START - Section Label -->
                      <b-col>
                        <b-col
                          class="text-dark font-weight-bold"
                          md="10"
                        >
                          {{ suggestion.item.fullName }}
                        </b-col>
                        <b-col
                          class="text-dark font-weight-bold border-bottom"
                        >
                          {{ suggestion.item.code }} - {{ suggestion.item.phoneNumber }}
                        </b-col>
                      </b-col>
                    <!-- END - Section Label -->
                    </b-row>
                  </template>
                </vue-autosuggest>
                <b-input-group-append
                  is-text
                  style="position: absolute; right: 0px; height: 100%;"
                >
                  <b-icon-plus
                    v-b-popover.hover.top="'Thêm mới khách hàng'"
                    class="cursor-pointer"
                    @click="showModalCreate"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-row>

            <!-- END - Search -->

            <!-- START - Phone Number -->
            <b-row
              class="m-top text-brand-3"
              align-v="center"
            >
              <b-col cols="5">
                Điện thoại
              </b-col>
              <b-col>
                {{ customer.phoneNumber }}
              </b-col>
            </b-row>
            <!-- END - Phone Number -->

            <!-- START - Cumulative points -->
            <b-row
              class="m-top text-brand-3"
              align-v="center"
            >
              <b-col cols="5">
                Doanh số tích lũy
              </b-col>
              <b-col>
                {{ $formatNumberToLocale(customer.totalBill) }}
              </b-col>
            </b-row>
            <!-- END - Cumulative points -->

            <!-- START - Address -->
            <b-row
              class="m-top word-wrap text-brand-3"
              align-v="center"
            >
              <b-col cols="5">
                Địa chỉ
              </b-col>
              <b-col>
                {{ customer.address }}
              </b-col>
            <!-- END - Address -->

            </b-row>
          <!-- END - Address -->
          </b-col>
        </b-collapse>
        <!-- END - Section customer -->

        <!-- START - Section delivery -->
        <b-row
          v-b-toggle.collapseDelivery
          align-v="center"
          class="bg-light m-top"
          @click="onCollapseClick()"
        >
          <b-icon-truck
            font-scale="1.7"
            class="mx-1 margin-icon"
          />
          Giao hàng
          <b-icon-chevron-down
            :class="isClickRotate ? 'rotate' : 'rotate-down'"
            class="ml-auto mx-1"
          />
        </b-row>

        <b-collapse
          id="collapseDelivery"
          visible
        >
          <b-col class="px-0 h7">
            <!-- START - Order type -->
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Loại đơn hàng"
            >
              <b-row
                class="m-top"
                align-v="center"
              >
                <b-col
                  cols="5"
                  class="text-brand-3"
                >
                  Loại đơn hàng
                </b-col>
                <b-col>
                  <tree-select
                    v-model="salemtPromotionObjectSelected"
                    :options="getSalemtPromotionObjectOptions"
                    placeholder="Chọn loại đơn hàng"
                    :disabled="orderOnline.onlineOrderId !== null && editManualPermission === false && editOnlinePermission === false"
                    @select="selectOrderNumber"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-col>
              </b-row>
            </validation-provider>

            <!-- END - Order type -->

            <!-- START - Online order number -->
            <validation-provider
              v-slot="{ errors, passed, touched }"
              rules="required|min:6|orderNumber"
              name="Số đơn online"
            >
              <b-row
                class="m-top h7"
                align-v="center"
              >

                <b-col
                  cols="5"
                  class="text-brand-3"
                >
                  Số đơn online
                </b-col>
                <b-col>
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      v-model="orderOnline.orderNumber"
                      maxlength="50"
                      :state="(!checkApParramCode && touched) ? passed : null"
                      :disabled="checkApParramCode
                        || salemtPromotionObjectSelected === undefined
                        || (orderOnline.onlineOrderId === null && editManualPermission === false)
                        || (orderOnline.onlineOrderId !== null && editOnlinePermission === false)"
                      @input="getOrderNumber"
                    />
                    <b-input-group-append
                      v-b-popover.hover.top="'Chọn đơn online'"
                      is-text
                      class="cursor-pointer"
                      @click="showNotifyModal"
                    >
                      <b-icon-three-dots-vertical />
                    </b-input-group-append>
                  </b-input-group>
                  <small
                    v-if="!checkApParramCode"
                    class="text-danger"
                  >{{ errors[0] }}</small>
                </b-col>
              </b-row>
            </validation-provider>

            <!-- END - Online order number -->

            <!-- START - Delivery type -->
            <validation-provider
              v-slot="{ errors, passed, touched }"
              rules="required"
              name="Loại giao hàng"
            >
              <b-row
                class="m-top h7"
                align-v="center"
              >

                <b-col
                  cols="5"
                  class="text-brand-3"
                >
                  Loại giao hàng
                </b-col>
                <b-col>
                  <tree-select
                    v-model="salemtDeliveryTypeSelected"
                    :state="touched ? passed : null"
                    :options="salemtDeliveryTypeOptions"
                    placeholder="Chọn loại giao hàng"
                    @select="getDeliveryType"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-col>
              </b-row>
            </validation-provider>
            <!-- END - Delivery type -->
          </b-col>
        </b-collapse>
        <!-- END - Section delivery -->

        <!-- START - Section pay -->
        <b-row
          align-v="center"
          class="bg-light m-top"
        >
          <b-icon-cash-stack
            font-scale="1.7"
            class="mx-1 margin-icon"
          />
          Thanh toán
        </b-row>

        <b-col class="px-0">
          <!-- START - Product amount -->
          <b-row
            class="m-top text-brand-3"
            align-v="center"
          >
            <b-col cols="5">
              Số lượng sản phẩm
            </b-col>
            <b-col
              cols="7"
              class="pr-0"
            >
              <div class="text-center h5 text-brand-3 font-weight-bold bg-light rounded padding-input">
                {{ totalQuantity }}
              </div>
            </b-col>
          </b-row>
          <!-- END - Product amount -->

          <!-- START - Temporary calculation -->
          <b-row
            class="m-top text-brand-3"
            align-v="center"
          >
            <b-col cols="5">
              Tạm tính
            </b-col>
            <b-col
              cols="7"
              class="pr-0"
            >
              <div class="h5 text-center text-brand-3 font-weight-bold bg-light rounded padding-input">
                {{ totalOrderPrice }}
              </div>
            </b-col>
          </b-row>
          <!-- END - Temporary calculation -->

          <!-- START - Note -->
          <b-col class="px-0 m-top h7">
            <b-input-group class="input-group-merge">

              <b-input-group-prepend is-text>
                <b-icon-pencil-fill />
              </b-input-group-prepend>
              <b-form-input
                v-model="orderOnline.note"
                placeholder="Ghi chú"
                maxlength="4000"
                @input="getOrderNumber"
              />

            </b-input-group>
          </b-col>
          <!-- END - Note -->

          <!-- START - Button pay -->
          <b-button
            v-if="statusPayButton().show"
            :disabled="statusPayButton().disabled || isDisabled || disableNotPermissionManual"
            variant="someThing"
            class="w-100 btn-brand-1 mt-1 aligns-items-button-center"
            @click="onPayButtonClick"
          >
            <b-icon-cash-stack
              font-scale="1.7"
              class="mr-1"
            />
            Thanh toán (F8)
          </b-button>
          <!-- END - Button pay -->
        </b-col>
        <!-- END - Section pay -->
      </b-form>
    </validation-observer>

    <!-- START - Pay modal -->
    <pay-modal
      ref="payModal"
      :order-products="productsHaveQuantity"
      :order-selected="salemtPromotionObjectSelected"
      :delivery-selected="salemtDeliveryTypeSelected"
      :customer="customer"
      :order-online="orderOnline"
      :edit-online-permission="editOnlinePermission"
      :bills="bills"
      :is-open-pay-modal="isOpenPayModal"
      @deleteSaveBill="deleteSaveBill"
      @changeStateOpenPayModal="changeStateOpenPayModal"
    />
    <!-- END - Pay modal -->

    <!-- START - Notify Modal Close -->
    <b-modal
      ref="salesNotifyModal"
      title="Thông báo"
    >
      Chọn đơn online sẽ xóa dữ liệu đơn hàng hiện tại
      <template #modal-footer>
        <b-button
          variant="something"
          class="btn-brand-1"
          @click="onClickAgreeButton()"
        >
          Đồng ý
        </b-button>
        <b-button @click="closeNotifyModal">
          Đóng
        </b-button>
      </template>
    </b-modal>
    <!-- END - Notify Modal Close -->

    <!-- START - Notify Modal Pay -->
    <b-modal
      ref="salesNotifyPayModal"
      title="Thông báo"
    >
      Bạn có muốn tạo đơn hàng khuyến mãi tay không?
      <template #modal-footer>
        <b-button
          variant="something"
          class="btn-brand-1"
          @click="onClickAgreePayButton()"
        >
          Xác nhận
        </b-button>
        <b-button @click="closeNotifyPayModal">
          Đóng
        </b-button>
      </template>
    </b-modal>
    <!-- END - Notify Modal Pay -->

    <!-- START - Sales Create Modal -->
    <sales-create-modal
      ref="salesCreateModal"
      :customer-default="customerDefault"
      @getCreateInfo="getCreateInfo"
    />
    <!-- END - Sales Create Modal -->

    <!-- START - Sales Online Order Modal -->
    <sales-online-orders-modal
      ref="salesOnlineOrderModal"
      @getOnlineOrderInfo="getOnlineOrderInfo"
    />
    <!-- END - Sales Online Order Modal -->

    <!-- START - Sales Search Modal -->
    <sales-search-modal
      ref="salesSearchModal"
      :online-order-customers="onlineOrderCustomers"
      :order-online="orderOnline"
      :open-popup="openPopup"
      :order-current-id="orderCurrentId"
      :bills="bills"
      :is-new-button="isNewButton"
      @getCustomerInfo="getCustomerInfo"
      @getSearchOption="getSearchOption"
    />
    <!-- END - Sales Search Modal -->
  </b-col>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import saleData from '@/@db/sale'
import commonData from '@/@db/common'
import {
  formatDateToLocale,
  getTimeOfDate,
  earlyMonth,
  nowDate,
  reverseVniDate,
} from '@core/utils/filter'
import {
  orderNumber,
} from '@/@core/utils/validations/validations'
import {
  validatorOnlineOrder,
} from '@/@core/utils/validations/validators'
import { getCurrentTime } from '@core/utils/utils'
import { getUserData } from '@/auth/utils'
import { VueAutosuggest } from 'vue-autosuggest'
import toasts from '@/@core/utils/toasts/toasts'
import customerData from '@/@db/customer'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMER_BY_ID_GETTER,
  CUSTOMER_DEFAULT_GETTER,
  CUSTOMERS_GETTER,
  // ACTIONS
  GET_CUSTOMER_BY_ID_ACTION,
  GET_CUSTOMER_DEFAULT_ACTION,
} from '../../../sales-customers/store-module/type'
import {
  SALES,
  // Getter
  ONLINE_ORDER_BY_ID_GETTER,
  ONLINE_ORDER_COINCIDE_ID_GETTER,
  CUSTOMERS_SALE_GETTER,
  GET_PROMOTION_PROGRAMS_GETTER,
  SALEMT_PROMOTION_OBJECT_GETTER,
  SALEMT_DELIVERY_TYPE_GETTER,
  GET_SCORECUMULATED_CUSTOMER_BY_ID_GETTER,
  // Action
  GET_ONLINE_ORDER_BY_ID_ACTION,
  GET_ONLINE_ORDER_COINCIDE_ID_ACTION,
  GET_ONLINE_ORDERS_ACTION,
  GET_PROMOTION_PROGRAMS_ACTION,
  GET_CUSTOMERS_SALE_ACTION,
  GET_SALEMT_PROMOTION_OBJECT_ACTION,
  GET_SALEMT_DELIVERY_TYPE_ACTION,
  GET_SCORECUMULATED_CUSTOMER_BY_ID_ACTION,
} from '../../store-module/type'
import SalesCreateModal from './SalesCreateModal.vue'
import SalesSearchModal from './SalesSearchModal.vue'
import SalesOnlineOrdersModal from './SalesOnlineOrdersModal.vue'
import PayModal from '../../components/pay_modal/PayModal.vue'

export default {
  components: {
    SalesCreateModal,
    SalesSearchModal,
    SalesOnlineOrdersModal,
    PayModal,
    VueAutosuggest,
    ValidationObserver,
    ValidationProvider,
  },

  props: {
    orderProducts: {
      type: Array,
      default: () => [],
    },
    editOnlinePermission: {
      type: Boolean,
      default: true,
    },
    editManualPermission: {
      type: Boolean,
      default: true,
    },
    bills: {
      type: Array,
      default: () => [],
    },
    isDisabledOrder: {
      type: Boolean,
      defautl: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    orderNumberBill: {
      type: String,
      default: String,
    },
    orderCurrentId: {
      type: Number,
      default: Number,
    },
    isNewButton: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // validation rules
      orderNumber,
      validatorOnlineOrder,

      isCheckRotate: false,
      isShowSalesSearchModal: false,
      item: {},
      customersSearch: [
        { data: '' },
      ],
      minSearch: commonData.minSearchLength,
      minOnlineOrder: commonData.minOnlineOrderLength,
      salemtPromotionId: '1',
      isCheckmanualCreate: true,
      currentCustomer: {},
      isSelected: false,
      currentDate: getCurrentTime(),
      pagination: {
        size: 50,
      },
      decentralization: {
        formId: 1,
        ctrlId: 4,
      },

      // customer
      customer: {
        id: null,
        code: null,
        shopId: null,
        firstName: null,
        lastName: null,
        fullName: null,
        phoneNumber: null,
        email: null,
        address: null,
        noted: null,
        totalBill: null,
        scoreCumulated: null,
        amountCumulated: null,
        isDefault: null,
        status: null,
        typeId: null,
        createdAt: null,
      },
      onlineOrderCustomers: [],
      billButtons: [],

      // online order
      searchData: {
        fromDate: reverseVniDate(earlyMonth()),
        toDate: reverseVniDate(nowDate()),
        synStatus: saleData.synStatus[0].id,
      },
      orderOnline: {
        onlineOrderId: null,
        orderNumber: null,
        discountCode: null,
        discountValue: null,
        note: null,
        type: {
          value: null,
          apParamCode: null,
          apParamName: null,
        },
        success: true,
        message: null,
      },

      quantity: null,
      totalPrice: null,
      salemtPromotionObjectSelected: null,
      salemtDeliveryTypeSelected: null,
      data: null,

      // products
      tableProductId: null,
      tableProductAmount: null,
      tableProductUnitPrice: null,
      tableProductCode: null,
      products: [],
      productsHaveQuantity: [],
      promotionPrograms: [],
      isClickRotate: false,

      salemtPromotionObjectOptions: [],
      checkApParramCode: false, // check disabled so hoa don

      isOpenPayModal: false,
      status: customerData.status[0].id,

      search: '',
      newSearch: '',
      oldSearch: '',
      customerOfShop: false,
      searchPhoneOnly: false,
      openPopup: false,
      allowCallAPI: true,
      disableNotPermissionManual: false,
      hover: false,
    }
  },

  computed: {
    ...mapGetters(CUSTOMER, {
      CUSTOMER_BY_ID_GETTER,
      CUSTOMER_DEFAULT_GETTER,
      CUSTOMERS_GETTER,
    }),

    ...mapGetters(SALES, {
      ONLINE_ORDER_BY_ID_GETTER,
      ONLINE_ORDER_COINCIDE_ID_GETTER,
      GET_PROMOTION_PROGRAMS_GETTER,
      CUSTOMERS_SALE_GETTER,
      SALEMT_PROMOTION_OBJECT_GETTER,
      SALEMT_DELIVERY_TYPE_GETTER,
      GET_SCORECUMULATED_CUSTOMER_BY_ID_GETTER,
    }),

    getCustomerSearch() {
      if (this.CUSTOMERS_SALE_GETTER.content) {
        return [{
          data: this.CUSTOMERS_SALE_GETTER.content.map(data => ({
            name: '',
            id: data.id,
            shopId: data.shopId,
            code: data.customerCode,
            fullName: data.fullName,
            phoneNumber: data.mobiPhone,
            birthDay: formatDateToLocale(data.dob),
            date: formatDateToLocale(data.createdAt),
            address: data.address,
            email: data.email,
            status: data.status,
            idNo: data.idNo,
            noted: data.noted,
            totalBill: data.totalBill,
            customerTypeId: data.customerTypeId,
            scoreCumulated: data.scoreCumulated,
            amountCumulated: data.amountCumulated,
            feature: '',
          })),
        }]
      }
      return []
    },
    getCustomerPopup() {
      if (this.CUSTOMERS_GETTER.content) {
        return this.CUSTOMERS_GETTER.content.map(data => ({
          id: data.id,
          shopId: data.shopId,
          code: data.customerCode,
          fullName: `${data.lastName} ${data.firstName}`,
          phoneNumber: data.mobiPhone,
          birthDay: formatDateToLocale(data.dob),
          date: formatDateToLocale(data.createdAt),
          address: data.address,
          idNo: data.idNo,
          feature: '',
          totalBill: data.totalBill,
          customerTypeId: data.customerTypeId,
          scoreCumulated: data.scoreCumulated,
        }))
      }
      return []
    },
    customerDefault() {
      return this.CUSTOMER_DEFAULT_GETTER
    },
    getSalemtPromotionObjectOptions() {
      return this.SALEMT_PROMOTION_OBJECT_GETTER.map(data => ({
        id: data.value,
        label: data.apParamName,
        apParamCode: data.apParamCode,
      }))
    },
    salemtDeliveryTypeOptions() {
      return this.SALEMT_DELIVERY_TYPE_GETTER.map(data => ({
        id: data.value,
        label: data.apParamName,
        apParamCode: data.apParamCode,
      }))
    },
    onlineOrder() {
      if (this.ONLINE_ORDER_BY_ID_GETTER.data !== null) {
        return this.ONLINE_ORDER_BY_ID_GETTER
      }
      return {}
    },
    scoreCumulatedCustomer() {
      return this.GET_SCORECUMULATED_CUSTOMER_BY_ID_GETTER
    },
    onlineOrderCoincideId() {
      return this.ONLINE_ORDER_COINCIDE_ID_GETTER
    },
    getOnlineOrderProducts() {
      if (this.ONLINE_ORDER_BY_ID_GETTER.products) {
        return this.ONLINE_ORDER_BY_ID_GETTER.products.map(data => ({
          productId: data.productId,
          productCode: data.productCode,
          productName: data.productName,
          productUnit: data.uom1,
          productInventory: data.stockTotal,
          quantity: data.quantity,
          productUnitPrice: data.price,
          sumProductUnitPrice: data.price,
          productTotalPrice: data.totalPrice,
          sumProductTotalPrice: data.totalPrice,
        }))
      }
      return []
    },
    getOnlineOrderCustomers() {
      if (this.ONLINE_ORDER_BY_ID_GETTER.customers) {
        return this.ONLINE_ORDER_BY_ID_GETTER.customers.map(data => ({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: data.fullName,
          shopId: data.shopId,
          customerCode: data.customerCode,
          customerTypeId: data.customerTypeId,
          status: data.status,
          phoneNumber: data.mobiPhone,
          address: data.address,
          isDefault: data.isDefault,
          noted: data.noted,
          totalBill: data.totalBill,
          amountCumulated: data.amountCumulated,
          createdAt: data.createdAt,
        }))
      }
      return []
    },

    totalQuantity() {
      return this.$formatNumberToLocale(this.orderProducts.reduce((sum, item) => sum + Number(item.quantity), 0))
    },

    totalOrderPrice() {
      return this.$formatNumberToLocale(this.orderProducts.reduce((sum, item) => sum + Number(item.productTotalPrice), 0))
    },

    loginInfo() {
      const login = getUserData()
      return login
    },
  },

  watch: {
    customerDefault() {
      this.customer = { ...this.customerDefault }
      this.getCustomerDefault()
      this.$refs.search.$el.querySelector('input').focus()
    },
    getCustomerInfo() {
      this.customer = { ...this.getCustomerInfo }
    },
    getCreateInfo() {
      this.customer = { ...this.getCreateInfo }
    },
    getCustomerSearch() {
      this.customersSearch = [...this.getCustomerSearch]
      if (this.customersSearch[0].data && this.customersSearch[0].data.length === 1) {
        this.$nextTick(() => document.getElementById('autosuggest__input').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })))
      }
    },
    onlineOrder() {
      this.getOnlineOrderById()
    },
    onlineOrderCoincideId() {
      this.checkOnlineOrderId()
    },
    scoreCumulatedCustomer() {
      this.getscoreCumulatedById()
    },
    getOnlineOrderProducts() {
      this.orderProducts = [...this.getOnlineOrderProducts]
      this.$emit('getOnlineOrderInfoForm', this.orderProducts)
    },
    getOnlineOrderCustomers() {
      this.onlineOrderCustomers = [...this.getOnlineOrderCustomers]

      if (this.onlineOrderCustomers.length > 1) {
        this.$bvModal.show('sales-search-modal')
      } else {
        const arrayToString = JSON.stringify(...this.onlineOrderCustomers)
        const customerOnline = JSON.parse(arrayToString)
        this.customer = { ...customerOnline }
        this.$emit('getOnlineCustomer', this.customer)
        this.$emit('currentCustomer', this.customer)
      }
    },
    getSalemtPromotionObjectOptions() {
      this.salemtPromotionObjectOptions = [...this.getSalemtPromotionObjectOptions]
      this.getDefaultPromotionObjectSelected()
      this.$emit('getSalemtPOOptions', this.salemtPromotionObjectOptions)
      this.$emit('defaultPromotionObjectSelected', this.salemtPromotionObjectSelected)
    },
    salemtDeliveryTypeOptions() {
      this.getSalemtDeliveryTypeDefault()
      this.$emit('defaultDeliveryTypeSelected', this.salemtDeliveryTypeSelected)
    },
    salemtPromotionObjectSelected() {
      if (this.salemtPromotionObjectSelected) {
        const apParramCode = this.salemtPromotionObjectOptions.find(data => data.id === this.salemtPromotionObjectSelected).apParamCode
        if (apParramCode.includes('ONLINE')) {
          this.checkApParramCode = false
          if (this.orderOnline.onlineOrderId === null) {
            if (this.editManualPermission === false) {
              this.disableNotPermissionManual = true
              this.checkApParramCode = true
            }
          } else {
            this.disableNotPermissionManual = false
          }
        } else {
          this.checkApParramCode = true
        }
        this.$emit('checkApParramCode', this.checkApParramCode)
      }
    },
    bills() {
      this.billButtons = [...this.bills]
      if (this.bills[0].id && this.orderOnline.onlineOrderId !== null) {
        this.GET_ONLINE_ORDER_COINCIDE_ID_ACTION(`${this.orderOnline.orderNumber}`)
      }
    },
    orderCurrentId: {
      handler() {
        const bill = this.bills.find(b => b.id === this.orderCurrentId)
        this.salemtPromotionObjectSelected = bill.orderType.value
        this.salemtDeliveryTypeSelected = bill.deliveryType.value
        this.orderOnline.orderNumber = bill.orderNumber
        this.GET_ONLINE_ORDER_COINCIDE_ID_ACTION(`${this.orderOnline.orderNumber}`)
      },
      deep: true,
    },
    search(newSearch, oldSearch) {
      this.newSearch = newSearch
      this.oldSearch = oldSearch
    },
    orderProducts: {
      handler() {
        this.productsHaveQuantity = this.orderProducts.filter(item => item.quantity > 0)
      },
      deep: true,
    },
  },

  mounted() {
    this.GET_SALEMT_PROMOTION_OBJECT_ACTION({ ...this.decentralization })
    this.GET_SALEMT_DELIVERY_TYPE_ACTION({ ...this.decentralization, salemtDeliveryTypeSelected: this.salemtDeliveryTypeSelected })
    this.GET_CUSTOMER_DEFAULT_ACTION({ ...this.decentralization })
    this.$refs.search.$el.querySelector('input').focus()

    window.addEventListener('keydown', e => {
      if (e.key === 'F4') {
        this.$refs.search.$el.querySelector('input').focus()
      }

      if (e.key === 'F8' && !this.isOpenPayModal) {
        // check valid type selected online and permission online
        if (this.salemtDeliveryTypeSelected === undefined
          || this.salemtPromotionObjectSelected === undefined
          || (!this.checkApParramCode && this.orderOnline.orderNumber === '')
          || this.isDisabled
          || this.disableNotPermissionManual
        ) {
          this.isOpenPayModal = false
          this.hidePayModal()
        } else if (this.orderOnline.success === true) {
          this.checkPayModal()
        } else {
          toasts.error(this.orderOnline.statusValue)
          this.hidePayModal()
        }
      }
    })
  },

  methods: {
    ...mapActions(CUSTOMER, [
      GET_CUSTOMER_BY_ID_ACTION,
      GET_CUSTOMER_DEFAULT_ACTION,
    ]),

    ...mapActions(SALES, [
      GET_ONLINE_ORDER_BY_ID_ACTION,
      GET_ONLINE_ORDER_COINCIDE_ID_ACTION,
      GET_PROMOTION_PROGRAMS_ACTION,
      GET_CUSTOMERS_SALE_ACTION,
      GET_ONLINE_ORDERS_ACTION,
      GET_SALEMT_PROMOTION_OBJECT_ACTION,
      GET_SALEMT_DELIVERY_TYPE_ACTION,
      GET_SCORECUMULATED_CUSTOMER_BY_ID_ACTION,
    ]),

    statusPayButton() {
      return this.$permission('Sales', 'SalesPay')
    },

    showModalCreate() {
      this.$refs.salesCreateModal.$refs.salesCreateModal.show()
    },

    showSearchModal() {
      this.$bvModal.show('sales-search-modal')
      this.openPopup = true
    },

    showSearchOnlineModal() {
      this.$refs.salesOnlineOrderModal.$refs.salesOnlineOrderModal.show()
    },

    onPayButtonClick() {
      // check online number coincide
      if (this.orderOnline.success === true) {
        this.checkPayModal()
      } else {
        toasts.error(this.orderOnline.statusValue)
        this.hidePayModal()
      }
    },

    showPayModal() {
      this.$bvModal.show('pay-modal')
    },

    hidePayModal() {
      this.$bvModal.hide('pay-modal')
    },

    checkPayModal() {
      // check valid type selected online
      if (this.salemtDeliveryTypeSelected !== undefined) {
        if (this.checkApParramCode && this.salemtPromotionObjectSelected !== undefined) {
          this.isOpenPayModal = true
          // check quantity product when pay
          if (this.totalQuantity === null || this.totalQuantity === 0) {
            this.$refs.salesNotifyPayModal.show()
          } else {
            this.showPayModal()
          }
        } else if (this.salemtPromotionObjectSelected !== undefined) {
          // check valid condition online number
          this.$refs.formContainer.validate().then(success => {
            if (success) {
              // check permission online manual
              if (this.orderOnline.onlineOrderId === null && this.orderOnline.orderNumber.length > 0) {
                if (this.editManualPermission) {
                  this.isOpenPayModal = true
                  this.showPayModal()
                } else {
                  toasts.error('Bạn không có quyền tạo đơn Online tay. Vui lòng chọn đơn Online đang có trên hệ thống.')
                }
              } else {
                this.isOpenPayModal = true
                this.showPayModal()
              }
            }
          })
        }
      }
    },

    showNotifyModal() {
      this.$refs.salesNotifyModal.show()
      this.GET_ONLINE_ORDERS_ACTION({ ...this.searchData })
    },

    closeNotifyModal() {
      this.$refs.salesNotifyModal.hide()
    },

    closeNotifyPayModal() {
      this.$refs.salesNotifyPayModal.hide()
    },

    totalPriceProducts(amount, price) {
      return amount * (price || 0)
    },

    getCustomerInfo(val) {
      this.customer.id = val.data.id
      this.customer.shopId = val.data.shopId
      this.customer.code = val.data.code
      this.customer.email = val.data.email
      this.customer.fullName = val.data.fullName
      this.customer.typeId = val.data.customerTypeId
      this.customer.phoneNumber = val.data.phoneNumber
      this.customer.address = val.data.address
      this.customer.totalBill = val.data.totalBill ?? 0
      this.customer.scoreCumulated = val.data.scoreCumulated
      this.customer.amountCumulated = val.data.amountCumulated
      this.$emit('getCustomerTypeInfo', val.data)
      this.$emit('getCustomerIdInfo', val.data.id)
      this.$emit('currentCustomer', this.customer)
      this.GET_SCORECUMULATED_CUSTOMER_BY_ID_ACTION(`${this.customer.id}`)
    },

    getOnlineOrderInfo(id) {
      this.GET_ONLINE_ORDER_BY_ID_ACTION(`${id}`)
    },

    getCreateInfo(val) {
      this.customer.id = val.id
      this.customer.shopId = val.shopId
      this.customer.fullName = `${val.lastName} ${val.firstName}`
      this.customer.phoneNumber = val.phoneNumber
      this.customer.address = val.address
      this.customer.totalBill = val.totalBill ?? 0
      this.customer.scoreCumulated = val.scoreCumulated
      this.customer.amountCumulated = val.amountCumulated
      this.customer.typeId = val.customerTypeId
      this.$emit('getCustomerCreate', this.customer)
    },

    onClickAgreeButton() {
      this.showSearchOnlineModal()
      this.closeNotifyModal()
    },

    onClickAgreePayButton() {
      this.showPayModal()
      this.closeNotifyPayModal()
    },

    getCustomerDefault() {
      this.customer.id = this.customerDefault.id
      this.customer.shopId = this.customerDefault.shopId
      this.customer.firstName = this.customerDefault.firstName
      this.customer.lastName = this.customerDefault.lastName
      this.customer.fullName = `${this.customer.lastName} ${this.customer.firstName}`
      this.customer.phoneNumber = this.customerDefault.mobiPhone
      this.customer.address = this.customerDefault.address
      this.customer.noted = this.customerDefault.noted
      this.customer.totalBill = this.customerDefault.totalBill ?? 0
      this.customer.scoreCumulated = this.customerDefault.amountCumulated
      this.customer.amountCumulated = this.customerDefault.amountCumulated
      this.customer.isDefault = this.customerDefault.isDefault
      this.customer.status = this.customerDefault.status
      this.customer.typeId = this.customerDefault.customerTypeId
      this.customer.createdAt = `${formatDateToLocale(this.customerDefault.createdAt)} ${getTimeOfDate(this.customerDefault.createdAt)}`
      this.$emit('getCustomerDefault', this.customerDefault)
      this.$emit('currentCustomer', this.customer)

      // Check manualcreate
      const { usedShop } = this.loginInfo
      if (this.customer.shopId === usedShop.id) {
        if (usedShop.manuallyCreatable) {
          this.isCheckmanualCreate = true
        } else {
          this.isCheckmanualCreate = false
        }
      }
    },

    getOnlineOrderById() {
      this.orderOnline.onlineOrderId = this.onlineOrder.id
      this.orderOnline.orderNumber = this.onlineOrder.orderNumber
      this.orderOnline.discountCode = this.onlineOrder.discountCode
      this.orderOnline.discountValue = this.onlineOrder.discountValue
      this.orderOnline.note = this.onlineOrder.note
      this.orderOnline.type.value = this.onlineOrder.type.value
      this.orderOnline.type.apParamCode = this.onlineOrder.type.apParamCode
      this.orderOnline.type.apParamName = this.onlineOrder.type.apParamName
      this.salemtPromotionObjectSelected = this.onlineOrder.type.value
      this.quantity = this.onlineOrder.quantity
      this.totalPrice = this.onlineOrder.totalPrice
      if (this.orderOnline.onlineOrderId !== null && this.orderOnline.orderNumber !== null) {
        this.disableNotPermissionManual = false
      }
      this.$emit('getOrderNumber', this.orderOnline)
    },

    getscoreCumulatedById() {
      this.customer.scoreCumulated = this.scoreCumulatedCustomer.data
    },

    checkOnlineOrderId() {
      this.orderOnline.success = this.onlineOrderCoincideId.success
      this.orderOnline.statusValue = this.onlineOrderCoincideId.statusValue
    },

    changeInput() {
      if (this.newSearch !== this.oldSearch) {
        this.allowCallAPI = true
      }
    },

    onChangeKeyWord() {
      if (this.search && this.allowCallAPI === true) {
        this.GET_CUSTOMERS_SALE_ACTION({
          ...this.pagination,
          customerOfShop: 0,
          searchPhoneOnly: 0,
          searchKeywords: this.search.trim(),
        })
        this.$refs.search.$el.querySelector('input').click()
      }
      this.allowCallAPI = false
    },

    selectOrderNumber(item) {
      this.$emit('getSalemtPOSelected', item)
      this.salemtPromotionObjectSelected = item.id
      const apParramCode = this.salemtPromotionObjectOptions.find(data => data.id === this.salemtPromotionObjectSelected).apParamCode
      // check order number is Online or Offline
      if (apParramCode.includes('ONLINE')) {
        this.checkApParramCode = false
        // check orderNumber not permission edit manual
        if (this.orderOnline.onlineOrderId === null) {
          if (this.editManualPermission === false) {
            toasts.error('Vui lòng vào chức năng "Đơn online" trên màn hình Bán hàng để chọn đơn hàng online cần xử lý!')
            this.disableNotPermissionManual = true
            this.checkApParramCode = true
          }
        } else {
          this.disableNotPermissionManual = false
          this.checkApParramCode = false
        }
      } else {
        this.orderOnline.orderNumber = null
        this.orderOnline.onlineOrderId = null
        this.orderOnline.discountCode = null
        this.orderOnline.discountValue = null
        this.disableNotPermissionManual = false
        this.checkApParramCode = true
        this.GET_ONLINE_ORDER_COINCIDE_ID_ACTION(`${this.orderOnline.orderNumber}`)
      }
    },

    getDeliveryType(item) {
      this.$emit('salemtDeliveryTypeSelected', item)
    },
    focusInput() {
      if (this.isSelected) {
        this.customersSearch = [{ data: null }]
        this.search = ''
        this.isSelected = false
      }
    },

    onclickChooseCustomer(suggestion) {
      if (suggestion) {
        this.GET_SCORECUMULATED_CUSTOMER_BY_ID_ACTION(`${suggestion.item.id}`)
        this.customer.id = suggestion.item.id
        this.customer.code = suggestion.item.code
        this.customer.email = suggestion.item.email
        this.customer.shopId = suggestion.item.shopId
        this.customer.fullName = suggestion.item.fullName
        this.customer.phoneNumber = suggestion.item.phoneNumber
        this.customer.address = suggestion.item.address
        this.customer.totalBill = suggestion.item.totalBill ?? 0
        this.customer.scoreCumulated = suggestion.item.scoreCumulated
        this.customer.amountCumulated = suggestion.item.amountCumulated
        this.customer.status = suggestion.item.status
        this.customer.typeId = suggestion.item.customerTypeId
        this.isSelected = true
        this.$emit('getIdCustomer', suggestion.item)
        this.$refs.search.$el.querySelector('input').blur()
      }
    },
    getDefaultPromotionObjectSelected() {
      if (this.salemtPromotionObjectOptions.find(data => data.apParamCode === 'OFFLINE')) {
        this.salemtPromotionObjectSelected = this.salemtPromotionObjectOptions.find(data => data.apParamCode === 'OFFLINE').id
      } else {
        this.salemtPromotionObjectSelected = this.salemtPromotionObjectOptions[0].id
      }
    },
    getSalemtDeliveryTypeDefault() {
      if (this.salemtDeliveryTypeOptions.find(data => data.apParamCode === 'DELIVERY_001')) {
        this.salemtDeliveryTypeSelected = this.salemtDeliveryTypeOptions.find(data => data.apParamCode === 'DELIVERY_001').id
      } else {
        this.salemtDeliveryTypeSelected = this.salemtDeliveryTypeOptions[0].id
      }
    },
    onCollapseCustomersClick() {
      this.isCheckRotate = !this.isCheckRotate
    },
    onCollapseClick() {
      this.isClickRotate = !this.isClickRotate
    },
    deleteSaveBill() {
      this.isOpenPayModal = false
      this.$emit('deleteSaveBill')
    },
    getOrderNumber() {
      this.GET_ONLINE_ORDER_COINCIDE_ID_ACTION(`${this.orderOnline.orderNumber}`)
      this.$emit('getOrderNumber', this.orderOnline)
    },
    changeStateOpenPayModal(isOpened) {
      this.isOpenPayModal = isOpened
    },
    getSearchOption(val) {
      const searchOption = val
      this.$emit('getSearchOption', searchOption)
    },
  },
}
</script>
<style lang="scss" scoped>
  .margin-icon {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .margin-block {
    margin-right: 0.5rem !important;
  }
  .rotate {
    transition: all 0.5s;
    transform: rotate(180deg);
  }
  .rotate-down {
    transition: all 0.5s;
  }
  .m-top {
    margin-top: 0.5rem !important;
  }
  .padding-input {
    padding-bottom: 0.5rem !important;
    padding-top: 0.5rem !important;
  }
</style>
