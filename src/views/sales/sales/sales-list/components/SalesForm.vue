<template>
  <b-col
    lg
    class="bg-white shadow rounded ml-lg-1 mt-sm-1 mt-lg-0"
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
          04/11/2020 19:24
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
          {{ fullName }}
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
        <b-col class="px-0">
          <!-- START - Search -->
          <b-input-group class="input-group-merge mt-1">
            <b-input-group-prepend is-text>
              <b-icon-search />
            </b-input-group-prepend>
            <b-form-input
              placeholder="Tìm khách hàng (F4)"
              @click="showSearchModal"
            />
            <sales-search-modal
              ref="salesSearchModal"
              @getCustomerInfo="getCustomerInfo"
            />
            <b-input-group-append is-text>
              <b-icon-plus @click="showModalCreate" />
              <sales-create-modal
                ref="salesCreateModal"
                @getCreateInfo="getCreateInfo"
              />
            </b-input-group-append>
          </b-input-group>
          <!-- END - Search -->

          <!-- START - Customer Popup -->
          <b-collapse
            v-model="inputSearchFocused"
            class="position-absolute w-100"
            style="zIndex:1"
          >
            <b-container
              class="my-1 bg-white rounded border border-primary shadow-lg"
            >
              <b-col
                v-for="(n,index) in 6"
                :key="index"
                class="px-0 my-1"
              >
                <!-- START - Section Content -->
                <b-col
                  class="text-dark font-weight-bold px-0"
                >
                  Nguyễn Xuân Điểm
                </b-col>
                <b-col class="text-dark px-0">
                  CUS.BN40011.0001 - 0979604450
                </b-col>
                <!-- END - Section Content -->
              </b-col>
            </b-container>
          </b-collapse>
          <!-- END - Customer Popup -->

          <!-- START - Phone Number -->
          <b-row
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
              Điện thoại
            </b-col>
            <b-col>
              {{ phoneNumber }}
            </b-col>
          </b-row>
          <!-- END - Phone Number -->

          <!-- START - Cumulative points -->
          <b-row
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
              Điểm tích lũy
            </b-col>
            <b-col>
              {{ totalBill }}
            </b-col>
          </b-row>
          <!-- END - Cumulative points -->

          <!-- START - Address -->
          <b-row
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
              Điạ chỉ
            </b-col>
            <b-col>
              {{ address }}
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
        <b-col class="px-0">
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
              />
            </b-col>
          </b-row>
          <!-- END - Order type -->

          <!-- START - Delivery type -->
          <b-row
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
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
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
              Số đơn online
            </b-col>
            <b-col>
              <b-input-group class="input-group-merge">
                <b-form-input :disabled="salemtPromotionObjectSelected === '1'" />
                <b-input-group-append is-text>
                  <b-icon-three-dots-vertical @click="showNotifyModal" />
                  <sales-online-orders-modal
                    ref="salesOnlineOrderModal"
                    @getOnlineOrderInfo="getOnlineOrderInfo"
                  />
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
            {{ quantity }}
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
            {{ totalPrice }}
          </b-col>
        </b-row>
        <!-- END - Temporary calculation -->

        <!-- START - Note -->
        <b-col class="px-0 mt-1">
          <b-input-group class="input-group-merge">

            <b-input-group-prepend is-text>
              <b-icon-pencil-fill />
            </b-input-group-prepend>
            <b-form-input placeholder="Ghi chú" />

          </b-input-group>
        </b-col>
        <!-- END - Note -->

        <!-- START - Button pay -->
        <b-button
          variant="info"
          class="d-flex w-100 my-1 align-items-center justify-content-center"
          @click="showPayModal"
        >
          <b-icon-cash-stack
            font-scale="2"
            class="mr-1"
          />
          Thanh toán (F8)
          <pay-modal ref="payModal" />
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

    </b-form>
  </b-col>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import saleData from '@/@db/sale'
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
  // Action
  GET_ONLINE_ORDER_CUSTOMER_BY_ID_ACTION,
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
  },
  data() {
    return {
      inputSearchFocused: false,
      isShowSalesSearchModal: false,

      // customer
      id: null,
      firstName: null,
      lastName: null,
      fullName: null,
      phoneNumber: null,
      address: null,
      totalBill: null,

      // online order
      onlineOrderId: null,
      quantity: null,
      totalPrice: null,
      salemtPromotionObjectSelected: saleData.salemtPromotionObject[0].id,
      salemtDeliveryTypeSelected: saleData.salemtDeliveryType[0].id,

      // products
      tableProductId: null,
      tableProductAmount: null,
      tableProductUnitPrice: null,
      tableProductTotalPrice: null,
      tableProductCode: null,
      products: [],

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
    }),

    customer() {
      return this.CUSTOMER_BY_ID_GETTER()
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
  },
  watch: {
    ERROR_CODE_GETTER() {
      this.checkDuplicationID(this.ERROR_CODE_GETTER())
    },
    salemtPromotionObjectSelected() {
      this.GET_SALEMT_PROMOTION_OBJECT_ACTION({ formId: 1, ctrlId: 4 })
    },
    salemtDeliveryTypeSelected() {
      this.GET_SALEMT_PROMOTION_OBJECT_ACTION({ formId: 1, ctrlId: 4 })
    },
    onlineOrderCustomer() {
      this.getOnlineOrderCustomerById()
    },
    customerDefault() {
      this.getCustomerDefault()
    },
  },
  mounted() {
    this.GET_CUSTOMER_BY_ID_ACTION(`${this.customerId}`)
    this.GET_SALEMT_PROMOTION_OBJECT_ACTION({ formId: 1, ctrlId: 4 })
    this.GET_SALEMT_DELIVERY_TYPE_ACTION({ formId: 1, ctrlId: 4 })
    this.GET_CUSTOMER_DEFAULT_ACTION({ formId: 1, ctrlId: 4 })
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
      this.$refs.payModal.$refs.payModal.show()
    },

    showNotifyModal() {
      if (this.salemtPromotionObjectSelected !== saleData.salemtPromotionObject[0].id) {
        this.$refs.salesNotifyModal.show()
      }
    },

    closeNotifyModal() {
      this.$refs.salesNotifyModal.hide()
    },

    getCustomerInfo(val) {
      this.fullName = val.data.fullName
      this.phoneNumber = val.data.phoneNumber
      this.address = val.data.address
      this.totalBill = val.data.totalBill ?? 0
    },

    getOnlineOrderInfo(id) {
      this.onlineOrderId = id
      this.GET_ONLINE_ORDER_CUSTOMER_BY_ID_ACTION(`${this.onlineOrderId}?formId=4&ctrlId=1`)
      this.$emit('getOnlineOrderInfoForm', id)
    },

    getCreateInfo(val) {
      this.fullName = `${val.lastName} ${val.firstName}`
      this.phoneNumber = val.phoneNumber
      this.address = val.address
      this.totalBill = val.totalBill ?? 0
    },

    onClickAgreeButton() {
      this.showSearchOnlineModal()
      this.closeNotifyModal()
    },

    getOnlineOrderCustomerById() {
      this.firstName = this.onlineOrderCustomer.customer.firstName
      this.lastName = this.onlineOrderCustomer.customer.lastName
      this.fullName = `${this.lastName} ${this.firstName}`
      this.phoneNumber = this.onlineOrderCustomer.customer.mobiPhone
      this.address = this.onlineOrderCustomer.customer.address
      this.quantity = this.onlineOrderCustomer.quantity
      this.totalPrice = this.onlineOrderCustomer.totalPrice
    },

    getCustomerDefault() {
      this.firstName = this.customerDefault.firstName
      this.lastName = this.customerDefault.lastName
      this.fullName = `${this.lastName} ${this.firstName}`
      this.phoneNumber = this.customerDefault.mobiPhone
      this.address = this.customerDefault.address
      this.totalBill = this.customerDefault.totalBill ?? 0
    },
  },
}
</script>
