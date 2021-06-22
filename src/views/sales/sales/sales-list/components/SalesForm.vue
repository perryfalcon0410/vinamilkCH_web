<template>
  <b-col
    lg
    class="d-print-none bg-white shadow rounded ml-lg-1 mt-sm-1 mt-lg-0"
  >
    <b-form>
      <!-- START - Date and name -->
      <b-row
        class="my-1"
        align-h="between"
      >
        <!-- START - Date  -->
        <b-row
          class="mx-0 "
          align-v="center"
        >
          <b-icon-alarm-fill
            font-scale="2"
            class="mx-1"
          />
          {{ currentDate }}
        </b-row>
        <!-- END - Date  -->

        <!-- START - Name  -->
        <b-row
          class="mx-0 mt-md-1 mt-xl-0 px-1"
          align-v="center"
        >
          <b-icon-person-fill
            font-scale="2"
            class="mr-1"
          />
          {{ customer.fullName }}
        </b-row>
        <!-- END - Name  -->

      </b-row>
      <!-- END - Date and name -->

      <!-- START - Section customer -->
      <b-row
        v-b-toggle.collapseCustomer
        align-v="center"
        class="bg-light"
      >
        <b-icon-people
          font-scale="2"
          class="m-1"
          variant="info"
        />
        Khách hàng
        <b-icon-chevron-down class="ml-auto mx-1" />
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
                :get-suggestion-value="getSuggestionValue"
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
                <b-icon-plus @click="showModalCreate" />
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
              Tiền tích lũy
            </b-col>
            <b-col>
              {{ $formatNumberToLocale(customer.totalBill) }}
            </b-col>
          </b-row>
          <!-- END - Cumulative points -->

          <!-- START - Address -->
          <b-row
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
              Địa chỉ
            </b-col>
            <b-col>
              {{ customer.street }}
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
      >
        <b-icon-truck
          font-scale="2"
          class="m-1"
          variant="info"
        />
        Giao hàng
        <b-icon-chevron-down class="ml-auto mx-1" />
      </b-row>

      <b-collapse
        id="collapseDelivery"
        visible
      >
        <b-col class="px-0 h7">
          <!-- START - Order type -->
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
            </b-col>
          </b-row>
          <!-- END - Order type -->

          <!-- START - Delivery type -->
          <b-row
            class="mt-1 "
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
                  :disabled="salemtPromotionObjectSelected === salemtPromotionId || salemtPromotionObjectSelected === undefined || (orderOnline.onlineOrderId != null && orderOnline.orderNumber.length > 0)"
                />
                <b-input-group-append is-text>
                  <b-icon-three-dots-vertical @click="showNotifyModal" />
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
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
          font-scale="2"
          class="m-1"
          variant="info"
        />
        Thanh toán
      </b-row>

      <b-col class="px-0">
        <!-- START - Product amount -->
        <b-row
          class="mt-1"
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
          class="mt-1"
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
            />

          </b-input-group>
        </b-col>
        <!-- END - Note -->

        <!-- START - Button pay -->
        <b-button
          variant="info"
          class="d-flex w-100 my-1 align-items-center justify-content-center"
          :disabled="orderOnline.orderNumber.length < minOnlineOrder && salemtPromotionObjectSelected !== salemtPromotionId || totalQuantity === 0 || editOnlinePermission === false"
          @click="showPayModal"
        >
          <b-icon-cash-stack
            font-scale="2"
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
        @getCustomerInfo="getCustomerInfo"
      />
      <!-- END - Sales Search Modal -->

    </b-form>
  </b-col>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import saleData from '@/@db/sale'
import commonData from '@/@db/common'
import { formatDateToLocale, getTimeOfDate } from '@core/utils/filter'
import { getCurrentTime } from '@core/utils/utils'
import { VueAutosuggest } from 'vue-autosuggest'
import {
  CUSTOMER,
  // GETTERS
  ERROR_CODE_GETTER,
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
  ONLINE_ORDER_CUSTOMER_BY_ID_GETTER,
  CUSTOMERS_SALE_GETTER,
  GET_PROMOTION_PROGRAMS_GETTER,
  // Action
  GET_ONLINE_ORDER_CUSTOMER_BY_ID_ACTION,
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
  },
  data() {
    return {
      inputSearchFocused: false,
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
        street: null,
        totalBill: null,
        scoreCumulated: null,
        amountCumulated: null,
        isDefault: null,
        status: null,
        typeId: null,
        createdAt: null,
      },

      // online order
      orderOnline: {
        onlineOrderId: null,
        orderNumber: '',
        orderNote: '',
      },
      quantity: null,
      totalPrice: null,
      salemtPromotionObjectSelected: saleData.salemtPromotionObject[0].id,
      salemtDeliveryTypeSelected: saleData.salemtDeliveryType[0].id,
      data: null,

      // products
      tableProductId: null,
      tableProductAmount: null,
      tableProductUnitPrice: null,
      tableProductTotalPrice: null,
      tableProductCode: null,
      products: [],
      promotionPrograms: [],
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
    }
  },
  computed: {
    ...mapGetters(CUSTOMER, {
      ERROR_CODE_GETTER,
      CUSTOMER_BY_ID_GETTER,
      SALEMT_PROMOTION_OBJECT_GETTER,
      SALEMT_DELIVERY_TYPE_GETTER,
      CUSTOMER_DEFAULT_GETTER,
    }),

    ...mapGetters(SALES, {
      ONLINE_ORDER_CUSTOMER_BY_ID_GETTER,
      GET_PROMOTION_PROGRAMS_GETTER,
      CUSTOMERS_SALE_GETTER,
    }),

    getCustomerSearch() {
      if (this.CUSTOMERS_SALE_GETTER.content) {
        return [{
          data: this.CUSTOMERS_SALE_GETTER.content.map(data => ({
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
    salemtPromotionObjectOptions() {
      return this.SALEMT_PROMOTION_OBJECT_GETTER.map(data => ({
        id: data.value,
        label: data.apParamName,
      }))
    },
    salemtDeliveryTypeOptions() {
      return this.SALEMT_DELIVERY_TYPE_GETTER.map(data => ({
        id: data.value,
        label: data.apParamName,
      }))
    },
    onlineOrderCustomer() {
      return this.ONLINE_ORDER_CUSTOMER_BY_ID_GETTER
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
    ERROR_CODE_GETTER() {
      this.checkDuplicationID(this.ERROR_CODE_GETTER())
    },
    salemtPromotionObjectSelected() {
      this.GET_SALEMT_PROMOTION_OBJECT_ACTION({ formId: 1, ctrlId: 4 })
    },
    salemtDeliveryTypeSelected() {
      this.GET_SALEMT_DELIVERY_TYPE_ACTION({ formId: 1, ctrlId: 4 })
    },
    onlineOrderCustomer() {
      this.getOnlineOrderCustomerById()
    },
    customerDefault() {
      this.getCustomerDefault()
      this.customer = { ...this.customerDefault }
    },
    getCustomerSearch() {
      this.customersSearch = [...this.getCustomerSearch]
      this.customer = { ...this.getCustomerSearch }
    },
  },
  mounted() {
    this.GET_SALEMT_PROMOTION_OBJECT_ACTION({ formId: 1, ctrlId: 4 })
    this.GET_SALEMT_DELIVERY_TYPE_ACTION({ formId: 1, ctrlId: 4, salemtDeliveryTypeSelected: this.salemtDeliveryTypeSelected })
    this.GET_CUSTOMER_DEFAULT_ACTION({ formId: 1, ctrlId: 4 })

    window.addEventListener('keydown', e => {
      if (e.key === 'F4') {
        this.$refs.search.$el.querySelector('input').focus()
      }

      if (e.key === 'F8') {
        if (this.totalQuantity === 0 || this.editOnlinePermission === false || this.salemtPromotionObjectSelected === undefined || (this.salemtPromotionObjectSelected === saleData.salemtPromotionObject[1].id && this.orderOnline.orderNumber === '')) {
          this.$root.$emit('bv::hide::modal', 'pay-modal')
        } else {
          this.$root.$emit('bv::show::modal', 'pay-modal')
        }
      }
    })
    // this.$emit('currentCustomer', this.customer)
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
      GET_ONLINE_ORDER_CUSTOMER_BY_ID_ACTION,
      GET_PROMOTION_PROGRAMS_ACTION,
      GET_CUSTOMERS_SALE_ACTION,
    ]),

    showModalCreate() {
      this.$refs.salesCreateModal.$refs.salesCreateModal.show()
    },

    showSearchModal() {
      this.$refs.salesSearchModal.$refs.salesSearchModal.show()
    },

    showSearchOnlineModal() {
      this.$refs.salesOnlineOrderModal.$refs.salesOnlineOrderModal.show()
    },

    showPayModal() {
      // const paramProducts = this.orderProducts.map(data => ({
      //   productId: data.productId,
      //   productCode: data.productCode,
      //   quantity: data.quantity,
      // }))
      // this.GET_PROMOTION_PROGRAMS_ACTION({
      //   customerId: this.customer.id,
      //   orderType: Number(saleData.orderType[0].id),
      //   products: paramProducts,
      // })

      if (this.editOnlinePermission === true) {
        this.$root.$emit('bv::show::modal', 'pay-modal')
      }
    },

    showNotifyModal() {
      if (this.salemtPromotionObjectSelected && this.salemtPromotionObjectSelected !== saleData.salemtPromotionObject[0].id) {
        this.$refs.salesNotifyModal.show()
      }
    },

    closeNotifyModal() {
      this.$refs.salesNotifyModal.hide()
    },

    getCustomerInfo(val) {
      this.customer.id = val.data.id
      this.customer.shopId = val.data.shopId
      this.customer.fullName = val.data.fullName
      this.customer.phoneNumber = val.data.phoneNumber
      this.customer.street = val.data.address
      this.customer.totalBill = val.data.totalBill ?? 0
      this.customer.scoreCumulated = val.data.scoreCumulated
      this.customer.amountCumulated = val.data.amountCumulated
      this.$emit('getCustomerTypeInfo', val.data.customerTypeId)
      this.$emit('getCustomerIdInfo', val.data.id)
      this.inputSearchFocused = false
      this.$emit('currentCustomer', this.customer)
    },

    getOnlineOrderInfo(id) {
      this.orderOnline.onlineOrderId = id
      this.GET_ONLINE_ORDER_CUSTOMER_BY_ID_ACTION(`${this.orderOnline.onlineOrderId}?formId=4&ctrlId=1`)
      this.$emit('getOnlineOrderInfoForm', id)
    },

    getCreateInfo(val) {
      this.customer.id = val.id
      this.customer.shopId = val.shopId
      this.customer.fullName = `${val.lastName} ${val.firstName}`
      this.customer.phoneNumber = val.phoneNumber
      this.customer.street = val.address
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

    getOnlineOrderCustomerById() {
      this.customer.firstName = this.onlineOrderCustomer.customer.firstName
      this.customer.lastName = this.onlineOrderCustomer.customer.lastName
      this.customer.fullName = `${this.onlineOrderCustomer.customer.lastName} ${this.onlineOrderCustomer.customer.firstName}`
      this.customer.phoneNumber = this.onlineOrderCustomer.customer.mobiPhone
      this.customer.street = this.onlineOrderCustomer.customer.address
      this.customer.scoreCumulated = this.onlineOrderCustomer.customer.scoreCumulated
      this.customer.amountCumulated = this.onlineOrderCustomer.customer.amountCumulated
      this.customer.shopId = this.onlineOrderCustomer.customer.shopId
      this.customer.typeId = this.onlineOrderCustomer.customer.customerTypeId
      this.customer.createdAt = `${formatDateToLocale(this.onlineOrderCustomer.customer.createdAt)} ${getTimeOfDate(this.onlineOrderCustomer.customer.createdAt)}`
      this.orderOnline.orderNumber = this.onlineOrderCustomer.orderNumber
      this.quantity = this.onlineOrderCustomer.quantity
      this.totalPrice = this.onlineOrderCustomer.totalPrice
      this.$emit('getOnlineCustomer', this.customer)
    },

    getCustomerDefault() {
      this.customer.id = this.customerDefault.id
      this.customer.shopId = this.customerDefault.shopId
      this.customer.firstName = this.customerDefault.firstName
      this.customer.lastName = this.customerDefault.lastName
      this.customer.fullName = `${this.customer.lastName} ${this.customer.firstName}`
      this.customer.phoneNumber = this.customerDefault.mobiPhone
      this.customer.street = this.customerDefault.address
      this.customer.totalBill = this.customerDefault.totalBill ?? 0
      this.customer.scoreCumulated = this.customerDefault.scoreCumulated
      this.customer.amountCumulated = this.customerDefault.amountCumulated
      this.customer.isDefault = this.customerDefault.isDefault
      this.customer.status = this.customerDefault.status
      this.customer.typeId = this.customerDefault.customerTypeId
      this.customer.createdAt = `${formatDateToLocale(this.customerDefault.createdAt)} ${getTimeOfDate(this.customerDefault.createdAt)}`
      this.$emit('getCustomerDefault', { data: this.customer })
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

    onChangeKeyWord() {
      const searchKeywords = {
        searchKeywords: this.search.trim(),
      }
      if (this.search.length >= this.minSearch) {
        this.GET_CUSTOMERS_SALE_ACTION(searchKeywords)
      } else {
        this.customersSearch = [{ data: null }]
      }
    },

    resetOrderNumber(item) {
      if (item.id === saleData.salemtPromotionObject[0].id) {
        this.orderOnline.orderNumber = ''
      }

      this.$emit('salemtPromotionObjectSelected', item.id)
    },

    onclickChooseCustomer() {
      this.customersSearch = [{ data: null }]
      this.search = null
    },

    getSuggestionValue(suggestion) {
      this.customer.id = suggestion.item.id
      this.customer.code = suggestion.item.code
      this.customer.email = suggestion.item.email
      this.customer.shopId = suggestion.item.shopId
      this.customer.fullName = suggestion.item.fullName
      this.customer.phoneNumber = suggestion.item.phoneNumber
      this.customer.totalBill = suggestion.item.totalBill
      this.customer.street = suggestion.item.address
      this.customer.totalBill = suggestion.item.totalBill
      this.customer.scoreCumulated = suggestion.item.scoreCumulated
      this.customer.amountCumulated = suggestion.item.amountCumulated
      this.customer.status = suggestion.item.status
      this.customer.typeId = suggestion.item.customerTypeId
    },
  },
}
</script>
