<template>
  <b-col
    lg="4"
    class="d-print-none bg-white shadow rounded mt-sm-1 mt-lg-0"
  >
    <validation-observer
      ref="formContainer"
      class="d-print-none"
    >
      <b-form>
        <!-- START - Date and name -->
        <b-row
          class="my-1"
          align-h="between"
        >
          <!-- START - Date  -->
          <b-col
            class="mx-0 "
            cols="6"
            align-h="between"
            align-v="center"
          >
            <b-icon-alarm-fill
              font-scale="1.7"
              class="mr-1"
            />
            {{ currentDate }}
          </b-col>
          <!-- END - Date  -->

          <!-- START - Name  -->
          <b-col
            class="mx-0 mt-md-1 mt-xl-0 px-1 word-wrap text-right"
            cols="6"
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
            <b-row
              class="px-0 mx-0 "
            >
              <b-input-group class="input-group-merge mt-1">
                <b-input-group-prepend
                  is-text
                  style="position: absolute; height: 100%"
                >
                  <b-icon-search />
                </b-input-group-prepend>
                <vue-autosuggest
                  ref="search"
                  v-model="search"
                  :suggestions="customersSearch"
                  class="w-100"
                  align-v="center"
                  :input-props="{
                    id:'autosuggest__input',
                    class:'form-control pl-4',
                    placeholder:'Tìm khách hàng (F4)',
                  }"
                  @input="onChangeKeyWord"
                  @selected="onclickChooseCustomer"
                  @keyup.enter="showSearchModal"
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
                  style="position: absolute; right: 0px; height: 100%"
                >
                  <b-icon-plus
                    v-b-popover.hover="'Thêm mới'"
                    @click="showModalCreate"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-row>

            <!-- END - Search -->

            <!-- START - Phone Number -->
            <b-row
              class="mt-1"
              align-v="center"
            >
              <b-col cols="4">
                Điện thoại
              </b-col>
              <b-col>
                {{ customer.phoneNumber }}
              </b-col>
            </b-row>
            <!-- END - Phone Number -->

            <!-- START - Cumulative points -->
            <b-row
              class="mt-1"
              align-v="center"
            >
              <b-col cols="4">
                Doanh số tích lũy
              </b-col>
              <b-col>
                {{ $formatNumberToLocale(customer.totalBill) }}
              </b-col>
            </b-row>
            <!-- END - Cumulative points -->

            <!-- START - Address -->
            <b-row
              class="mt-1 word-wrap"
              align-v="center"
            >
              <b-col cols="4">
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
          class="bg-light mt-1"
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
                class="mt-1"
                align-v="center"
              >
                <b-col cols="4">
                  Loại đơn hàng
                </b-col>
                <b-col>
                  <tree-select
                    v-model="salemtPromotionObjectSelected"
                    :options="salemtPromotionObjectOptions"
                    @select="resetOrderNumber"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-col>
              </b-row>
            </validation-provider>

            <!-- END - Order type -->

            <!-- START - Delivery type -->
            <b-row
              class="mt-1"
              align-v="center"
            >
              <b-col
                cols="4"
                class="h7"
              >
                Loại giao hàng
              </b-col>
              <b-col>
                <tree-select
                  v-model="salemtDeliveryTypeSelected"
                  :options="salemtDeliveryTypeOptions"
                />
              </b-col>
            </b-row>
            <!-- END - Delivery type -->

            <!-- START - Online order number -->
            <validation-provider
              v-slot="{ errors, passed, touched }"
              rules="required"
              name="Số đơn online"
            >
              <b-row
                class="mt-1 h7"
                align-v="center"
              >

                <b-col cols="4">
                  Số đơn online
                </b-col>
                <b-col>
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      v-model="orderOnline.orderNumber"
                      maxlength="50"
                      :state="touched ? passed : null"
                      :disabled="salemtPromotionObjectSelected === salemtPromotionId || salemtPromotionObjectSelected === undefined || (orderOnline.onlineOrderId != null && orderOnline.orderNumber.length > 0) || isDisabledOrder === true"
                    />
                    <b-input-group-append is-text>
                      <b-icon-three-dots-vertical
                        @click="showNotifyModal"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-col>
              </b-row>
            </validation-provider>

          <!-- END - Online order number -->
          </b-col>
        </b-collapse>
        <!-- END - Section delivery -->

        <!-- START - Section pay -->
        <b-row
          align-v="center"
          class="bg-light mt-1"
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
            class="mt-1 text-brand-3"
            align-v="center"
          >
            <b-col>
              Số lượng sản phẩm
            </b-col>
            <b-col class="text-center text-dark font-weight-bold bg-light rounded py-1">
              {{ totalQuantity }}
            </b-col>
          </b-row>
          <!-- END - Product amount -->

          <!-- START - Temporary calculation -->
          <b-row
            class="mt-1 text-brand-3"
            align-v="center"
          >
            <b-col>
              Tạm tính
            </b-col>
            <b-col class="text-center text-dark font-weight-bold bg-light rounded py-1">
              {{ totalOrderPrice }}
            </b-col>
          </b-row>
          <!-- END - Temporary calculation -->

          <!-- START - Note -->
          <b-col class="px-0 mt-1 h7">
            <b-input-group class="input-group-merge">

              <b-input-group-prepend is-text>
                <b-icon-pencil-fill />
              </b-input-group-prepend>
              <b-form-input
                v-model="orderOnline.orderNote"
                placeholder="Ghi chú"
                maxlength="4000"
              />

            </b-input-group>
          </b-col>
          <!-- END - Note -->

          <!-- START - Button pay -->
          <b-button
            variant="someThing"
            class="btn-brand-1 d-flex w-100 my-1 align-items-center justify-content-center"
            :disabled="totalQuantity === 0"
            @click="showPayModal"
          >
            <b-icon-cash-stack
              font-scale="1.7"
              class="mr-1"
            />
            Thanh toán (F8)
            <pay-modal
              ref="payModal"
              :order-products="orderProducts"
              :order-selected="salemtPromotionObjectSelected"
              :delivery-selected="salemtDeliveryTypeSelected"
              :customer="customer"
              :order-online="orderOnline"
              :edit-online-permission="editOnlinePermission"
            />
          </b-button>
          <!-- END - Button pay -->

          <!-- START - Notify Modal Close -->
          <b-modal
            ref="salesNotifyModal"
            title="Thông báo"
          >
            Chọn đơn online sẽ xóa dữ liệu đơn hàng hiện tại
            <template #modal-footer>
              <b-button
                variant="primary"
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
        </b-col>
        <!-- END - Section pay -->

        <!-- START - Sales Create Modal -->
        <sales-create-modal
          ref="salesCreateModal"
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
          @getCustomerInfo="getCustomerInfo"
        />
      <!-- END - Sales Search Modal -->

      </b-form>
    </validation-observer>
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
} from '@core/utils/filter'
import { getCurrentTime } from '@core/utils/utils'
import { VueAutosuggest } from 'vue-autosuggest'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMER_BY_ID_GETTER,
  SALEMT_PROMOTION_OBJECT_GETTER,
  SALEMT_DELIVERY_TYPE_GETTER,
  CUSTOMER_DEFAULT_GETTER,
  // ACTIONS
  GET_CUSTOMER_BY_ID_ACTION,
  GET_SALEMT_PROMOTION_OBJECT_ACTION,
  GET_SALEMT_DELIVERY_TYPE_ACTION,
  GET_CUSTOMER_DEFAULT_ACTION,
} from '../../../sales-customers/store-module/type'
import {
  SALES,
  // Getter
  ONLINE_ORDER_BY_ID_GETTER,
  CUSTOMERS_SALE_GETTER,
  GET_PROMOTION_PROGRAMS_GETTER,
  // Action
  GET_ONLINE_ORDER_BY_ID_ACTION,
  GET_ONLINE_ORDERS_ACTION,
  GET_PROMOTION_PROGRAMS_ACTION,
  GET_CUSTOMERS_SALE_ACTION,
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
    bills: {
      type: Array,
      default: () => [],
    },
    isDisabledOrder: {
      type: Boolean,
      defautl: false,
    },
  },
  data() {
    return {
      isCheckRotate: false,
      isShowSalesSearchModal: false,
      item: {},
      customersSearch: [
        { data: '' },
      ],
      search: '',
      minSearch: commonData.minSearchLength,
      minOnlineOrder: commonData.minOnlineOrderLength,
      salemtPromotionId: '1',
      isCheckmanualCreate: true,
      currentCustomer: {},
      currentDate: getCurrentTime(),
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
        totalBill: null,
        scoreCumulated: null,
        amountCumulated: null,
        isDefault: null,
        status: null,
        typeId: null,
        createdAt: null,
      },
      onlineOrderCustomers: [],

      // online order
      searchData: {
        fromDate: earlyMonth(),
        toDate: nowDate(),
        synStatus: saleData.synStatus[0].id,
      },
      orderOnline: {
        onlineOrderId: null,
        orderNumber: '',
        orderNote: '',
        discountCode: null,
        discountValue: null,
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
      tableProductTotalPrice: null,
      tableProductCode: null,
      products: [],
      promotionPrograms: [],
      isClickRotate: false,
      columns: [
        {
          label: '',
          field: 'tableProductId',
          sortable: false,
          hidden: true,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã sản phẩm',
          field: 'tableProductCode',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tên sản phẩm',
          field: 'tableProductName',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'ĐVT',
          field: 'tableProductUnit',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tồn kho',
          field: 'tableProductInventory',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng',
          field: 'tableProductAmount',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Đơn giá',
          field: 'tableProductUnitPrice',
          sortable: false,
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'tableProductTotalPrice',
          sortable: false,
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Chức năng',
          field: 'tableProductFeature',
          sortable: false,
        },
      ],

      salemtPromotionObjectOptions: [],
    }
  },
  computed: {
    ...mapGetters(CUSTOMER, {
      CUSTOMER_BY_ID_GETTER,
      SALEMT_PROMOTION_OBJECT_GETTER,
      SALEMT_DELIVERY_TYPE_GETTER,
      CUSTOMER_DEFAULT_GETTER,
    }),

    ...mapGetters(SALES, {
      ONLINE_ORDER_BY_ID_GETTER,
      GET_PROMOTION_PROGRAMS_GETTER,
      CUSTOMERS_SALE_GETTER,
    }),

    getCustomerSearch() {
      if (this.CUSTOMERS_SALE_GETTER.content) {
        return [{
          data: this.CUSTOMERS_SALE_GETTER.content.map(data => ({
            name: '',
            id: data.id,
            shopId: data.shopId,
            code: data.customerCode,
            fullName: `${data.lastName} ${data.firstName}`,
            phoneNumber: data.mobiPhone,
            birthDay: formatDateToLocale(data.dob),
            date: formatDateToLocale(data.createdAt),
            address: data.address,
            email: data.email,
            status: data.status,
            idNo: data.idNo,
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
      return this.ONLINE_ORDER_BY_ID_GETTER
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
          productUnitPrice: this.$formatNumberToLocale(data.price),
          sumProductUnitPrice: data.price,
          productTotalPrice: this.$formatNumberToLocale(this.totalPriceProducts(1, Number(data.price))),
          sumProductTotalPrice: this.totalPriceProducts(1, Number(data.price)),
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
      return this.$formatNumberToLocale(this.orderProducts.reduce((sum, item) => sum + Number(item.sumProductTotalPrice), 0))
    },
    getPromotionPrograms() {
      if (this.GET_PROMOTION_PROGRAMS_GETTER) {
        return this.GET_PROMOTION_PROGRAMS_GETTER
      }
      return []
    },

    loginInfo() {
      const login = JSON.parse(localStorage.getItem('userData'))
      return login
    },
  },
  watch: {
    customerDefault() {
      this.customer = { ...this.customerDefault }
      this.getCustomerDefault()
    },
    getCustomerSearch() {
      this.customersSearch = [...this.getCustomerSearch]
    },
    onlineOrder() {
      this.getOnlineOrderById()
    },
    getOnlineOrderProducts() {
      this.orderProducts = [...this.getOnlineOrderProducts]
      this.$emit('getOnlineOrderInfoForm', this.orderProducts)
    },
    getOnlineOrderCustomers() {
      this.onlineOrderCustomers = [...this.getOnlineOrderCustomers]

      if (this.onlineOrderCustomers.length > 1) {
        this.$refs.salesSearchModal.$refs.salesSearchModal.show()
      } else {
        const arrayToString = JSON.stringify(...this.onlineOrderCustomers)
        this.customer = JSON.parse(arrayToString)
        this.$emit('getOnlineCustomer', this.customer)
      }
    },
    getSalemtPromotionObjectOptions() {
      this.salemtPromotionObjectOptions = [...this.getSalemtPromotionObjectOptions]
      this.getDefaultPromotionObjectSelected()
    },
    salemtDeliveryTypeOptions() {
      this.GetSalemtDeliveryTypeDefault()
    },
  },
  mounted() {
    this.GET_SALEMT_PROMOTION_OBJECT_ACTION({ ...this.decentralization })
    this.GET_SALEMT_DELIVERY_TYPE_ACTION({ ...this.decentralization, salemtDeliveryTypeSelected: this.salemtDeliveryTypeSelected })
    this.GET_CUSTOMER_DEFAULT_ACTION({ ...this.decentralization })

    window.addEventListener('keydown', e => {
      if (e.key === 'F4') {
        this.$refs.search.$el.querySelector('input').focus()
      }

      if (e.key === 'F8') {
        if (this.totalQuantity === 0 || this.editOnlinePermission === false || this.salemtPromotionObjectSelected === undefined || (this.salemtPromotionObjectSelected === saleData.salemtPromotionObject[1].id && this.orderOnline.orderNumber === '')) {
          this.$bvModal.hide('pay-modal')
        } else {
          this.$bvModal.show('pay-modal')
        }
      }
    })
  },
  created() {
  },
  methods: {
    ...mapActions(CUSTOMER, [
      GET_CUSTOMER_BY_ID_ACTION,
      GET_SALEMT_PROMOTION_OBJECT_ACTION,
      GET_SALEMT_DELIVERY_TYPE_ACTION,
      GET_CUSTOMER_DEFAULT_ACTION,
    ]),

    ...mapActions(SALES, [
      GET_ONLINE_ORDER_BY_ID_ACTION,
      GET_PROMOTION_PROGRAMS_ACTION,
      GET_CUSTOMERS_SALE_ACTION,
      GET_ONLINE_ORDERS_ACTION,
    ]),

    showModalCreate() {
      this.$refs.salesCreateModal.$refs.salesCreateModal.show()
    },

    showSearchModal() {
      if (this.search.length < this.minSearch) {
        this.$refs.salesSearchModal.$refs.salesSearchModal.show()
      }
    },

    showSearchOnlineModal() {
      this.$refs.salesOnlineOrderModal.$refs.salesOnlineOrderModal.show()
    },

    showPayModal() {
      if (this.salemtPromotionObjectSelected === saleData.salemtPromotionObject[0].id) {
        this.$bvModal.show('pay-modal')
      }

      if (this.salemtPromotionObjectSelected === saleData.salemtPromotionObject[1].id || this.salemtPromotionObjectSelected === saleData.salemtPromotionObject[2].id) {
        if (this.salemtPromotionObjectSelected !== undefined) {
          this.$refs.formContainer.validate().then(success => {
            if (success) {
              this.$bvModal.show('pay-modal')
            }
          })
        }
      }
    },

    showNotifyModal() {
      if (this.isDisabledOrder !== true) {
        this.$refs.salesNotifyModal.show()
        this.GET_ONLINE_ORDERS_ACTION({ ...this.searchData })
      }
    },

    closeNotifyModal() {
      this.$refs.salesNotifyModal.hide()
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
    },

    getOnlineOrderInfo(id) {
      this.orderOnline.onlineOrderId = id
      this.GET_ONLINE_ORDER_BY_ID_ACTION(`${this.orderOnline.onlineOrderId}`)
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
      this.customer.createdAt = `${formatDateToLocale(val.createdAt)} ${getTimeOfDate(val.createdAt)}`
      this.$emit('getCustomerCreate', val)
    },

    onClickAgreeButton() {
      this.showSearchOnlineModal()
      this.closeNotifyModal()
    },

    getCustomerDefault() {
      this.customer.id = this.customerDefault.id
      this.customer.shopId = this.customerDefault.shopId
      this.customer.firstName = this.customerDefault.firstName
      this.customer.lastName = this.customerDefault.lastName
      this.customer.fullName = `${this.customer.lastName} ${this.customer.firstName}`
      this.customer.phoneNumber = this.customerDefault.mobiPhone
      this.customer.address = this.customerDefault.address
      this.customer.totalBill = this.customerDefault.totalBill ?? 0
      this.customer.scoreCumulated = this.customerDefault.scoreCumulated
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
      this.orderOnline.orderNumber = this.onlineOrder.orderNumber
      this.orderOnline.discountCode = this.onlineOrder.discountCode
      this.orderOnline.discountValue = this.onlineOrder.discountValue
      this.quantity = this.onlineOrder.quantity
      this.totalPrice = this.onlineOrder.totalPrice
      this.$emit('getOnlineCustomer', this.customer)
    },

    onChangeKeyWord() {
      const searchKeywords = {
        searchKeywords: this.search.trim(),
      }
      if (this.search.length >= this.minSearch) {
        this.GET_CUSTOMERS_SALE_ACTION(searchKeywords)
      } else {
        this.customersSearch = [{ data: null }]
        this.search = ''
      }
      this.search = ''
    },

    resetOrderNumber(item) {
      if (item.id === saleData.salemtPromotionObject[0].id) {
        this.orderOnline.orderNumber = ''
      }

      this.$emit('salemtPromotionObjectSelected', item.id)
    },

    onclickChooseCustomer(suggestion) {
      if (suggestion) {
        this.customer.id = suggestion.item.id
        this.customer.code = suggestion.item.code
        this.customer.email = suggestion.item.email
        this.customer.shopId = suggestion.item.shopId
        this.customer.fullName = suggestion.item.fullName
        this.customer.phoneNumber = suggestion.item.phoneNumber
        this.customer.totalBill = suggestion.item.totalBill
        this.customer.address = suggestion.item.address
        this.customer.totalBill = suggestion.item.totalBill ?? 0
        this.customer.scoreCumulated = suggestion.item.scoreCumulated
        this.customer.amountCumulated = suggestion.item.amountCumulated
        this.customer.status = suggestion.item.status
        this.customer.typeId = suggestion.item.customerTypeId
        this.$emit('getIdCustomer', suggestion.item)
      }
      this.customersSearch = [{ data: null }]
      this.search = ''
    },
    getDefaultPromotionObjectSelected() {
      if (this.salemtPromotionObjectOptions.find(data => data.apParamCode === 'OFFLINE')) {
        this.salemtPromotionObjectSelected = this.salemtPromotionObjectOptions.find(data => data.apParamCode === 'OFFLINE').id
        return
      }
      this.salemtPromotionObjectSelected = this.salemtPromotionObjectOptions[0].id
    },
    GetSalemtDeliveryTypeDefault() {
      if (this.salemtDeliveryTypeOptions.find(data => data.apParamCode === 'DELIVERY_001')) {
        this.salemtDeliveryTypeSelected = this.salemtDeliveryTypeOptions.find(data => data.apParamCode === 'DELIVERY_001').id
        return
      }
      this.salemtDeliveryTypeSelected = this.salemtDeliveryTypeOptions[0].id
    },

    disableOnlineOrder() {
    },
    onCollapseCustomersClick() {
      this.isCheckRotate = !this.isCheckRotate
    },
    onCollapseClick() {
      this.isClickRotate = !this.isClickRotate
    },
  },
}
</script>
<style lang="scss" scoped>
  .margin-icon {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .rotate {
    transition: all 0.5s;
    transform: rotate(180deg);
  }
  .rotate-down {
    transition: all 0.5s;
  }
</style>
