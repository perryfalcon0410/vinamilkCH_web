<template>
  <!-- START Popup -->
  <b-modal
    ref="payModal"
    size="xl"
    :visible="visible"
    title="Thanh toán hóa đơn"
    title-class="font-weight-bold text-primary"
    content-class="bg-white"
    footer-border-variant="white"
    hide-header-close
  >
    <!-- START - Body -->
    <b-container
      fluid
      class="px-0"
    >
      <b-row class="mx-0">
        <!-- START - Section table -->
        <b-col class="shadow py-1">
          <b-row
            class="mx-0 bg-light p-1 mb-1 w-25 rounded"
            align-v="center"
          >
            <b-icon-gift
              scale="2"
              color="red"
            />
            <strong class="ml-1">Khuyến mãi</strong>
          </b-row>

          <!-- START - Table 1 -->
          <b-col class="p-0">
            <!-- START - Title -->
            <b-row
              v-b-toggle.collapseAdmVoucher
              align-v="center"
              class="bg-primary mx-0 p-1"
            >
              <b-check />
              <div class="text-white">
                Khuyến mãi ADM tháng 11.2020
              </div>
              <b-icon-chevron-down
                class="ml-auto"
                color="white"
              />
            </b-row>
            <!-- END - Title -->

            <!-- START - Body -->
            <b-collapse
              id="collapseAdmVoucher"
              visible
            >
              <vue-good-table
                :columns="columnsAdm"
                :rows="rowsAdm"
                style-class="vgt-table bordered"
                compact-mode
                line-numbers
              >
                <!-- START - Row -->
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div v-if="props.column.field === 'GiftsAmount'">
                    <b-input-group
                      append="3"
                    >
                      <b-form-input />
                    </b-input-group>
                  </div>
                  <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
                <!-- END - Row -->
              </vue-good-table>
            </b-collapse>
            <!-- END - Body -->
          </b-col>
          <!-- END - Table 1 -->

          <!-- START - Table 2 -->
          <b-col class="p-0 mt-1">
            <!-- START - Title -->
            <b-row
              v-b-toggle.collapsePrmProduct
              align-v="center"
              class="bg-primary mx-0 p-1"
            >
              <b-check />
              <div class="text-white">
                Khuyến mãi tay PRM.001 - tặng sản phẩm
              </div>
              <b-icon-chevron-down
                class="ml-auto"
                color="white"
              />
            </b-row>
            <!-- END - Title -->

            <!-- START - Body -->
            <b-collapse
              id="collapsePrmProduct"
              visible
            >
              <vue-good-table
                :columns="columnsPrmProduct"
                :rows="rowsPrmProduct"
                style-class="vgt-table bordered"
                compact-mode
                line-numbers
              >
                <!-- START - Row -->
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div v-if="props.column.field === 'GiftsAmount'">
                    <b-input-group
                      append="3"
                    >
                      <b-form-input />
                    </b-input-group>
                  </div>
                  <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
                <!-- END - Row -->
              </vue-good-table>
            </b-collapse>
            <!-- END - Body -->
          </b-col>
          <!-- END - Table 2 -->

          <!-- START - Table 3 -->
          <b-col class="p-0 mt-1">
            <!-- START - Title -->
            <b-row
              v-b-toggle.collapsePrmMoney
              align-v="center"
              class="bg-primary mx-0 p-1"
            >
              <b-check />
              <div class="text-white">
                Khuyến mãi tay PRM.001 - tặng tiền
              </div>
              <b-icon-chevron-down
                class="ml-auto"
                color="white"
              />
            </b-row>
            <!-- END - Title -->

            <!-- START - Body -->
            <b-collapse
              id="collapsePrmMoney"
              visible
            >
              <b-row
                class="mx-0 p-1"
                align-v="center"
              >
                <div>Số tiền</div>
                <b-col cols="3">
                  <b-input />
                </b-col>
              </b-row>
            </b-collapse>
            <!-- END - Body -->
          </b-col>
          <!-- END - Table 3 -->

          <!-- START - Table 4 -->
          <b-col class="p-0 mt-1">
            <!-- START - Title -->
            <b-row
              v-b-toggle.collapseAccumulationBỉthDay
              align-v="center"
              class="bg-primary mx-0 p-1"
            >
              <b-check />
              <div class="text-white">
                Tích lũy - Quà sinh nhật 2021
              </div>
              <b-icon-chevron-down
                class="ml-auto"
                color="white"
              />
            </b-row>
            <!-- END - Title -->

            <!-- START - Body -->
            <b-collapse
              id="collapseAccumulationBỉthDay"
              visible
            >
              <b-row
                class="mx-0 p-1"
                align-v="center"
              >
                <div>Giảm giá</div>

                <b-col cols="3">
                  <b-input-group
                    prepend="20%"
                  >
                    <b-form-input disabled />
                  </b-input-group>
                </b-col>

              </b-row>
            </b-collapse>
            <!-- END - Body -->
          </b-col>
          <!-- END - Table 4 -->

          <!-- START - Table 5 -->
          <b-col class="p-0 mt-1">
            <!-- START - Title -->
            <b-row
              v-b-toggle.collapseAccumulationNewYear
              align-v="center"
              class="bg-primary mx-0 p-1"
            >
              <b-check />
              <div class="text-white">
                Tích lũy - Quà tết 2021
              </div>
              <b-icon-chevron-down
                class="ml-auto"
                color="white"
              />
            </b-row>
            <!-- END - Title -->

            <!-- START - Body -->
            <b-collapse
              id="collapseAccumulationNewYear"
              visible
            >
              <b-row
                class="mx-0 p-1"
                align-v="center"
              >
                <div>Giảm giá</div>

                <b-col cols="3">
                  <b-form-input disabled />
                </b-col>
              </b-row>

              <div class="ml-1">
                Quà tặng <i class="ml-1">01 bộ tô chén dĩa Minh Long</i>
              </div>

            </b-collapse>
            <!-- END - Body -->
          </b-col>
          <!-- END - Table 5 -->

        </b-col>
        <!-- START - Section table -->

        <!-- START - Section Pay -->
        <b-col class="ml-1 shadow py-1">
          <b-row
            class="mx-0 bg-light p-1 mb-1 w-25 rounded"
            align-v="center"
          >
            <b-icon-cash-stack
              scale="2"
              color="blue"
            />
            <strong class="ml-1">Thanh toán</strong>
          </b-row>

          <b-form class="">
            <!-- START - Total price -->
            <b-form-group>
              <b-row
                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Tổng tiền hàng
                    <strong class="d-inline-flex text-white px-1 ml-1 bg-primary rounded-pill">
                      {{ totalQuantity }}
                    </strong>
                  </strong>

                </b-col>

                <b-col>
                  <b-form-input
                    v-model="totalOrderPrice"
                    disabled
                  />
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Total price -->

            <!-- START - Discount -->
            <b-form-group>
              <b-row
                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Giảm giá</strong>
                </b-col>

                <b-col>
                  <b-form-input disabled />
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Discount -->

            <!-- START - Money accumulated -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Tiền tích lũy</strong>
                </b-col>

                <b-col>
                  <b-row
                    no-gutters
                  >
                    <b-col>
                      <b-form-input disabled />
                    </b-col>

                    <b-col>
                      <b-input-group
                        class="input-group-merge"
                      >
                        <b-form-input class="form-control-merge" />
                      </b-input-group>
                    </b-col>

                  </b-row>
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Money accumulated -->

            <!-- START - Voucher -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Voucher</strong>
                </b-col>

                <b-col class="">
                  <b-row
                    no-gutters
                  >

                    <b-col>
                      <b-input-group
                        class="input-group-merge"
                      >
                        <b-input-group-prepend
                          is-text
                          class="cursor-pointer"
                          @click="onVoucherButtonClick()"
                        >
                          <b-icon-three-dots-vertical
                            scale="1.5"
                          />
                        </b-input-group-prepend>
                        <b-form-input
                          v-model="voucherCode"
                          class="form-control-merge"
                        />
                        <b-input-group-append is-text>
                          <b-icon-x
                            scale="1.5"
                            class="cursor-pointer"
                            @click="resetVoucher"
                          />
                        </b-input-group-append>
                      </b-input-group>
                    </b-col>

                    <b-col>
                      <b-form-input
                        v-model="price"
                        disabled
                      />
                    </b-col>

                  </b-row>
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Voucher -->

            <!-- START - Discount code -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Mã giảm giá</strong>
                </b-col>

                <b-col class="">
                  <b-row
                    no-gutters
                  >

                    <b-col>
                      <b-input-group
                        class="input-group-merge"
                      >
                        <b-form-input
                          class="form-control-merge"
                          @keyup.enter="getDiscount"
                        />
                        <b-input-group-append
                          is-text
                        >
                          <b-icon-x
                            scale="1.5"
                            class="cursor-pointer"
                            @click="resetDiscount"
                          />
                        </b-input-group-append>
                      </b-input-group>
                    </b-col>

                    <b-col>
                      <b-form-input
                        v-model="discountAmount"
                        disabled
                      />
                    </b-col>

                  </b-row>
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Discount code -->

            <!-- START - Customer need to pay -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Khách cần trả</strong>
                </b-col>

                <b-col>
                  <b-form-input
                    v-model="needPayment"
                    disabled
                  />
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Customer need to pay -->

            <!-- START - Payment customers -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Khách thanh toán</strong>
                </b-col>
                <b-col>
                  <b-row
                    no-gutters
                  >
                    <b-col>
                      <tree-select
                        v-model="salemtPaymentTypeSelected"
                        :options="salemtPaymentTypeOptions"
                      />
                    </b-col>

                    <b-col>
                      <b-form-input v-model="payment" />
                    </b-col>

                  </b-row>
                </b-col>

              </b-row>
            </b-form-group>
            <!-- END - Payment customers -->

            <!-- START - Excess cash -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Tiền thừa trả khách</strong>
                </b-col>

                <b-col>
                  <b-form-input
                    v-model="changePayment"
                    disabled
                  />
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Excess cash -->

          </b-form>

        </b-col>
        <!-- START - Section Pay -->
      </b-row>
    </b-container>
    <!-- END - Body -->

    <!-- START - Footer -->
    <template #modal-footer="{ ok, cancel }">
      <b-row
        class="mx-auto"
      >
        <b-button
          variant="primary"
          class="d-flex align-items-center text-uppercase"
          @click="ok()"
        >
          <b-icon-printer
            class="mr-1"
            scale="1.5"
          />
          In HĐ tạm (F7)
        </b-button>
        <b-button
          variant="primary"
          class="d-flex align-items-center mx-1 text-uppercase"
          @click="ok()"
        >
          <b-icon-printer
            class="mr-1"
            scale="1.5"
          />
          Thanh toán - In (F8)
        </b-button>
        <b-button
          variant="primary"
          class="d-flex align-items-center text-uppercase"
          @click="createSaleOrder"
        >
          <b-icon-cash-stack
            class="mr-1"
            scale="1.5"
          />
          Thanh toán (F9)
        </b-button>
        <b-button
          variant="primary"
          class="d-flex align-items-center mx-1 text-uppercase"
          @click="ok()"
        >
          <b-icon-printer
            class="mr-1"
            scale="1.5"
          />
          In lại hóa đơn (F10)
        </b-button>
        <b-button
          variant="secondary"
          class="d-flex align-items-center text-uppercase"
          @click="cancel()"
        >
          <b-icon-x
            scale="2"
            class="mr-1"
          />
          Đóng (ESC)
        </b-button>
        <sales-list />
        <sales-form />
      </b-row>
    </template>
    <!-- END - Footer -->

    <voucher-modal @getVoucherInfo="getVoucherInfo" />
  </b-modal>
  <!-- End Popup -->
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import saleData from '@/@db/sale'

import {
  SALES,
  // GETTERS
  VOUCHER_BY_ID_GETTER,
  GET_PRODUCTS_GETTER,
  CREATE_SALE_ORDER_GETTER,
  GET_DISCOUNT_BY_CODE_GETTER,
  // ACTIONS
  GET_VOUCHER_BY_ID_ACTION,
  GET_PRODUCTS_ACTION,
  CREATE_SALE_ORDER_ACTION,
  GET_DISCOUNT_BY_CODE_ACTION,
} from '../../store-module/type'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMER_DEFAULT_GETTER,
  SALEMT_PAYMENT_TYPE_GETTER,
  // ACTIONS
  GET_CUSTOMER_DEFAULT_ACTION,
  GET_SALEMT_PAYMENT_TYPE_ACTION,
} from '../../../sales-customers/store-module/type'
import VoucherModal from '../voucher-modal/VoucherModal.vue'
import SalesList from '../../sales-list/SalesList.vue'
import SalesForm from '../../sales-list/components/SalesForm.vue'

export default {
  components: {
    VoucherModal,
    SalesList,
    SalesForm,
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      isVoucherModalShow: false,
      searchTerm: '',
      columnsAdm: [
        {
          label: 'Mã sản phẩm',
          field: 'ProductCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'Số lượng tặng',
          field: 'GiftsAmount',
          sortable: false,
          type: 'number',
        },
      ],
      rowsAdm: [
        {
          ProductCode: '04AA30',
          ProductName: 'STT H.Dâu ADM VNM TP 110',
          GiftsAmount: '',
        },
        {
          ProductCode: '04AA30',
          ProductName: 'STT H.Dâu ADM VNM TP 110',
          GiftsAmount: '',
        },
        {
          ProductCode: '04AA30',
          ProductName: 'STT H.Dâu ADM VNM TP 110',
          GiftsAmount: '',
        },
      ],
      columnsPrmProduct: [
        {
          label: 'Mã sản phẩm',
          field: 'ProductCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'Số lượng tặng',
          field: 'GiftsAmount',
          sortable: false,
          type: 'number',
        },
      ],
      rowsPrmProduct: [
        {
          ProductCode: '04AA30',
          ProductName: 'STT H.Dâu ADM VNM TP 110',
          GiftsAmount: '',
        },
      ],

      // aparams
      salemtPaymentTypeSelected: saleData.salePaymentType[0].id,

      // voucher
      voucherId: null,
      voucherCode: null,
      price: 0,

      // payment
      productId: null,
      quantity: null,
      productUnitPrice: null,
      productTotalPrice: null,
      productCode: null,
      products: [],
      saleOrderProducts: [],
      payment: 0,

      // discount
      discountCode: null,
      discountAmount: null,

      shopId: null,
      customerId: null,
      salemanId: null,
      wareHouseTypeId: null,
      totalPaid: null,
      type: 0,
      paymentType: 0,
      deliveryType: 1,
      orderType: 0,
      usedRedInvoice: null,
      isFreeItem: false,
      zmPromotion: 0,
    }
  },
  computed: {
    ...mapGetters(SALES, [
      VOUCHER_BY_ID_GETTER,
      GET_PRODUCTS_GETTER,
      CREATE_SALE_ORDER_GETTER,
      GET_DISCOUNT_BY_CODE_GETTER,
    ]),
    ...mapGetters(CUSTOMER, [
      CUSTOMER_DEFAULT_GETTER,
      SALEMT_PAYMENT_TYPE_GETTER,
    ]),

    voucher() {
      return this.VOUCHER_BY_ID_GETTER
    },

    discount() {
      return this.GET_DISCOUNT_BY_CODE_GETTER
    },

    customerDefault() {
      return this.CUSTOMER_DEFAULT_GETTER
    },

    salemtPaymentTypeOptions() {
      return this.SALEMT_PAYMENT_TYPE_GETTER.map(data => ({
        id: data.value,
        label: data.apParamName,
      }))
    },

    getProducts() {
      return this.GET_PRODUCTS_GETTER.map(data => ({
        productCode: data.productCode,
        productId: data.id,
        quantity: this.$formatNumberToLocale(1),
        isFreeItem: false,
        zmPromotion: 0,
        productUnitPrice: this.$formatNumberToLocale(data.price),
        productTotalPrice: Number(this.totalPrice(1, Number(data.price))),
      }))
    },

    getSaleOrderProducts() {
      return this.GET_PRODUCTS_GETTER.map(data => ({
        productId: data.id,
        quantity: 1,
        isFreeItem: false,
        zmPromotion: 0,
      }))
    },

    totalQuantity() {
      return this.getProducts.reduce((sum, item) => sum + Number(item.quantity), 0)
    },

    totalOrderPrice() {
      return this.getProducts.reduce((sum, item) => sum + Number(item.productTotalPrice), 0)
    },

    needPayment() {
      return this.totalOrderPrice - this.price - this.discountAmount
    },

    changePayment() {
      const change = 0
      if (this.payment !== 0) {
        if (this.payment > this.needPayment) {
          return Number(this.payment) - Number(this.needPayment)
        }
      }
      return change
    },
  },
  watch: {
    voucher() {
      this.getVoucherById()
    },

    discount() {
      this.getDiscount()
    },

    customerDefault() {
      this.getCustomerDefault()
    },

    getProducts() {
      this.products = [...this.getProducts]
    },

    getSaleOrderProducts() {
      this.saleOrderProducts = [...this.getSaleOrderProducts]
    },

    salemtPaymentTypeSelected() {
      this.GET_SALEMT_PAYMENT_TYPE_ACTION({ formId: 1, ctrlId: 4 })
    },
  },
  mounted() {
    this.GET_PRODUCTS_ACTION({ formId: 5, ctrlId: 1, customerTypeId: 1 })
    this.GET_CUSTOMER_DEFAULT_ACTION({ formId: 1, ctrlId: 4 })
    this.GET_SALEMT_PAYMENT_TYPE_ACTION({ formId: 1, ctrlId: 4 })
  },
  created() {
    window.addEventListener('keydown', e => {
      if (e.key === 'F8') {
        this.$refs.payModal.show()
      }
    })
  },
  methods: {
    ...mapActions(SALES, [
      GET_VOUCHER_BY_ID_ACTION,
      GET_PRODUCTS_ACTION,
      CREATE_SALE_ORDER_ACTION,
      GET_DISCOUNT_BY_CODE_ACTION,
    ]),
    ...mapActions(CUSTOMER, [
      GET_CUSTOMER_DEFAULT_ACTION,
      GET_SALEMT_PAYMENT_TYPE_ACTION,
    ]),

    onVoucherButtonClick() {
      this.$root.$emit('bv::show::modal', 'VoucherModal')
    },

    getCustomerDefault() {
      this.customerId = this.customerDefault.id
      this.shopId = this.customerDefault.shopId
    },

    getVoucherInfo(id) {
      this.voucherId = id
      const productIds = this.getProducts.map(item => item.productId)
      const params = {
        ctrlId: 7,
        formId: 5,
      }

      this.GET_VOUCHER_BY_ID_ACTION(`${this.voucherId}?customerId=${this.customerId}&productIds=${productIds}`, params)
    },

    getVoucherById() {
      this.voucherCode = this.voucher.voucherCode
      this.price = this.voucher.price
    },

    getDiscount() {
      this.discountCode = this.discount.discountCode
      this.discountAmount = this.discount.discountAmount

      const paramsGetDiscount = {
        formId: 5, // Hard code
        ctrlId: 7, // Hard code
      }
      this.GET_DISCOUNT_BY_CODE_ACTION('CODE0003', paramsGetDiscount)
    },

    resetVoucher() {
      this.voucherCode = null
      this.price = null
    },

    resetDiscount() {
      this.discountCode = null
    },

    resetOrderPayment() {
      this.voucherCode = null
      this.price = null
      this.payment = 0
    },

    totalPrice(amount, price) {
      return amount * (price || 0)
    },

    createSaleOrder() {
      this.CREATE_SALE_ORDER_ACTION({
        product: {
          shopId: this.shopId,
          customerId: this.customerId,
          totalPaid: this.totalOrderPrice,
          paymentType: this.salemtPaymentTypeSelected,
          deliveryType: 1, // Hard code
          orderType: 0, // Hard code
          usedRedInvoice: false,
          voucherId: this.voucherId,
          products: this.getProducts,
        },
        onSuccess: () => {
          this.$refs.payModal.hide()
          this.resetOrderPayment()
        },
      })
    },
  },
}
</script>
