<template>
  <!-- START Popup -->
  <b-modal
    id="pay-modal"
    size="xl"
    title="Thanh toán hóa đơn"
    title-class="font-weight-bold text-brand-1"
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
            <strong class="ml-1 text-brand-1">Khuyến mãi</strong>
          </b-row>

          <div
            v-for="(value,index) in tempPromotions"
            :key="index"
          >
            <!-- START - Table Promotion -->
            <b-col class="p-0 mt-1">
              <!-- START - Title -->
              <b-row
                v-b-toggle="'collapse-'+value.programId"
                align-v="center"
                class="mx-0 p-1 bg-brand-1"
              >
                <b-check
                  v-if="value.promotionType === Number(promotionTypeOption[0].id)"
                  v-model="value.isSelected"
                  disabled
                />
                <b-check
                  v-else
                  v-model="value.isSelected"
                />
                <div class="text-white">
                  {{ value.promotionProgramName }}
                </div>
                <b-icon-chevron-down
                  class="ml-auto"
                  color="white"
                />
              </b-row>
              <!-- END - Title -->

              <!-- START - Body -->
              <b-collapse
                :id="'collapse-'+value.programId"
                visible
              >
                <div v-if="value.products.length > 0">
                  <vue-good-table
                    v-if="value.products.length > 0"
                    :columns="columnsAdm"
                    :rows="value.products"
                    style-class="vgt-table bordered"
                    compact-mode
                    line-numbers
                  >
                    <!-- START - Row -->
                    <template
                      slot="table-row"
                      slot-scope="props"
                    >
                      <div v-if="props.column.field === 'quantity'">
                        <b-input-group v-if="value.isEditable || value.promotionType === Number(promotionTypeOption[1].id)">
                          <template #append>
                            <b-input-group-text>{{ props.row.quantityMax }}</b-input-group-text>
                          </template>
                          <b-form-input
                            v-model.number="tempPromotions[index].products[props.row.originalIndex].quantity"
                            @change="onChangeQuantity(value.programId, props)"
                            @keypress="$onlyNumberInput"
                          />
                        </b-input-group>

                        <div
                          v-else
                          class="text-center"
                        >
                          {{ props.row.quantityMax }}
                        </div>
                      </div>
                      <div v-else>
                        {{ props.formattedRow[props.column.field] }}
                      </div>
                    </template>
                    <!-- END - Row -->
                  </vue-good-table>
                </div>
                <div v-else>
                  <b-row
                    class="mx-0 p-1"
                    align-v="center"
                  >
                    <div>Số tiền</div>

                    <b-col cols="3">
                      <b-form-input
                        v-model="value.amount.value"
                        :disabled="value.promotionType === Number(promotionTypeOption[0].id)"
                      />
                    </b-col>

                  </b-row>
                </div>
              </b-collapse>
            <!-- END - Body -->
            </b-col>
          <!-- END - Table Promotion -->
          </div>

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

          <!-- START - Table 4 -->
          <b-col class="p-0 mt-1">
            <!-- START - Title -->
            <b-row
              v-b-toggle.collapseAccumulationBỉthDay
              align-v="center"
              class="bg-brand-1 mx-0 p-1"
            >
              <b-check />
              <div class="text-white">
                Khuyến mãi ZV23.001 - giảm % tiền
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
                    <b-form-input
                      value="20000"
                      disabled
                    />
                  </b-input-group>
                </b-col>

              </b-row>
            </b-collapse>
            <!-- END - Body -->
          </b-col>
          <!-- END - Table 4 -->

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
              class="text-brand-1"
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
                    <strong class="d-inline-flex text-white px-1 ml-1 bg-brand-1 rounded-pill">
                      {{ pay.totalQuantity }}
                    </strong>
                  </strong>

                </b-col>

                <b-col>
                  <b-form-input
                    v-model="pay.totalAmount"
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
                  <b-form-input
                    v-model="pay.promotionAmount"
                    disabled
                  />
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
                      <b-form-input
                        v-model="pay.accumulate.accumulatePoint"
                        disabled
                      />
                    </b-col>

                    <b-col>
                      <b-input-group
                        class="input-group-merge"
                      >
                        <b-form-input
                          v-model="pay.accumulate.accumulateAmount"
                          class="form-control-merge"
                        />
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
                          v-model="pay.voucher.voucherCode"
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
                        v-model="pay.voucher.voucherAmount"
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
                          v-model="pay.discount.discountCode"
                          class="form-control-merge"
                          @keyup.enter="searchDiscount"
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
                        v-model="pay.discount.discountAmount"
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
                    v-model="pay.needPaymentAmount"
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
                        v-model="pay.salePayment.salePaymentType"
                        :options="salePaymentTypeOptions"
                      />
                    </b-col>

                    <b-col>
                      <b-form-input v-model="pay.salePayment.salePaymentAmount" />
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
                    v-model="pay.excessAmount"
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
      </b-row>
    </template>
    <!-- END - Footer -->

    <voucher-modal @getVoucherInfo="getVoucherInfo" />
  </b-modal>
  <!-- End Popup -->
</template>

<script>
import {
  number,
} from '@/@core/utils/validations/validations'
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
  GET_DISCOUNT_BY_CODE_GETTER,
  GET_PROMOTION_FREE_ITEMS_GETTER,
  // ACTIONS
  GET_VOUCHER_BY_ID_ACTION,
  GET_PRODUCTS_ACTION,
  CREATE_SALE_ORDER_ACTION,
  GET_DISCOUNT_BY_CODE_ACTION,
  GET_PROMOTION_FREE_ITEMS_ACTION,
} from '../../store-module/type'
import {
  CUSTOMER,
  // GETTERS
  SALEMT_PAYMENT_TYPE_GETTER,
  // ACTIONS
  GET_SALEMT_PAYMENT_TYPE_ACTION,
} from '../../../sales-customers/store-module/type'
import VoucherModal from '../voucher-modal/VoucherModal.vue'

export default {
  components: {
    VoucherModal,
  },
  props: {
    visible: {
      type: Boolean,
    },
    orderProducts: {
      type: Array,
      default: () => [],
    },
    deliverySelected: {
      type: String,
      default: String,
    },
    orderSelected: {
      type: String,
      default: String,
    },
    customer: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      promotionTypeOption: saleData.promotionType,
      columnsAdm: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tồn kho',
          field: 'stockQuantity',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng tặng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],

      tempPromotions: [
        {
          programId: 1,
          promotionProgramName: 'Khuyến mãi ADM tháng 11.2020',
          products: [
            {
              productId: 1,
              productCode: '04AA30',
              productName: 'STT H.Dâu ADM VNM TP 110',
              quantity: '',
              stockQuantity: 4,
              quantityMax: 3,
            },
            {
              productId: 2,
              productCode: '04AA31',
              productName: 'STT H.Dâu ADM VNM TP 111',
              quantity: '',
              stockQuantity: 4,
              quantityMax: 3,
            },
            {
              productId: 3,
              productCode: '04AA33',
              productName: 'STT H.Dâu ADM VNM TP 111',
              quantity: '',
              stockQuantity: 4,
              quantityMax: 3,
            },
          ],
          amount: {},
          promotionType: 0,
          isSelected: true,
          isUse: true,
          isEditable: true,
        },
        {
          programId: 2,
          promotionProgramName: 'Khuyến mãi XYZ tháng 11.2020',
          products: [
            {
              productId: 4,
              productCode: '05BB31',
              productName: 'STT H.Dâu XYZ VNM TP 110',
              quantity: '',
              stockQuantity: 4,
              quantityMax: 3,
            },
            {
              productId: 5,
              productCode: '05BB32',
              productName: 'STT H.Dâu XYZ VNM TP 110',
              quantity: '',
              stockQuantity: 4,
              quantityMax: 3,
            },
            {
              productId: 6,
              productCode: '05BB33',
              productName: 'STT H.Dâu XYZ VNM TP 110',
              quantity: '',
              stockQuantity: 4,
              quantityMax: 3,
            },
          ],
          amount: {},
          promotionType: 0,
          isSelected: true,
          isUse: true,
          isEditable: false,
        },
        {
          programId: 3,
          promotionProgramName: 'Khuyến mãi AYX tháng 11.2020',
          products: [],
          amount: {
            value: 100000,
            percentage: '',
          },
          promotionType: 0,
          isSelected: true,
          isUse: true,
          isEditable: false,
        },
        {
          programId: 4,
          promotionProgramName: 'Khuyến mãi tay PRM tháng 11.2020',
          products: [
            {
              productId: 7,
              productCode: '05BB31',
              productName: 'STT H.Dâu XYZ VNM TP 110',
              quantity: null,
              stockQuantity: 4,
              quantityMax: 3,
            },
            {
              productId: 8,
              productCode: '05BB32',
              productName: 'STT H.Dâu XYZ VNM TP 110',
              quantity: '',
              stockQuantity: 4,
              quantityMax: 3,
            },
          ],
          amount: {},
          promotionType: 1,
          isSelected: false,
          isUse: true,
          isEditable: false,
        },
        {
          programId: 5,
          promotionProgramName: 'Khuyến mãi tay PRM tháng 11.2020',
          products: [],
          amount: {
            value: 100000,
            percentage: '',
          },
          promotionType: 1,
          isSelected: false,
          isUse: false,
          isEditable: false,
        },
      ],

      salePaymentTypeOptions: saleData.salePaymentType,
      pay: {
        totalQuantity: 0,
        totalAmount: null,
        promotionAmount: null,
        accumulate: {
          accumulatePoint: null,
          accumulateAmount: null,
        },
        voucher: {
          voucherId: null,
          voucherCode: '',
          oucherAmount: null,
        },
        discount: {
          discountCode: '',
          discountAmount: null,
        },
        needPaymentAmount: null,
        salePayment: {
          salePaymentType: saleData.salePaymentType[0].id,
          salePaymentAmount: null,
        },
        excessAmount: null,
        shopId: null,
        salemanId: null,
        totalPaid: null,
        type: 0,
        deliveryType: 1,
        orderType: 0,
        usedRedInvoice: null,
      },
      formId: 5, // hard code permission
      ctrlId: 1, // hard code permission

      // validation rules
      number,
    }
  },
  computed: {
    ...mapGetters(SALES, [
      VOUCHER_BY_ID_GETTER,
      GET_PRODUCTS_GETTER,
      GET_DISCOUNT_BY_CODE_GETTER,
      GET_PROMOTION_FREE_ITEMS_GETTER,
    ]),
    ...mapGetters(CUSTOMER, [
      SALEMT_PAYMENT_TYPE_GETTER,
    ]),

    getVoucher() {
      return this.VOUCHER_BY_ID_GETTER
    },

    getDiscount() {
      if (this.GET_DISCOUNT_BY_CODE_GETTER) {
        return this.GET_DISCOUNT_BY_CODE_GETTER
      }
      return {}
    },

    salemtPaymentTypeOptions() {
      return this.SALEMT_PAYMENT_TYPE_GETTER.map(data => ({
        id: data.value,
        label: data.apParamName,
      }))
    },

    totalQuantity() {
      return this.orderProducts.reduce((sum, item) => sum + Number(item.quantity), 0)
    },

    totalOrderPrice() {
      return this.orderProducts.reduce((sum, item) => sum + Number(item.productTotalPrice), 0)
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
    getPromotionFreeItems() {
      if (this.GET_PROMOTION_FREE_ITEMS_GETTER) {
        return this.GET_PROMOTION_FREE_ITEMS_GETTER
      }
      return {}
    },
  },
  watch: {
    getVoucher() {
      this.pay.voucher.voucherCode = this.getVoucher.voucherCode
      this.pay.voucher.voucherAmount = this.getVoucher.price
    },

    getDiscount() {
      this.pay.discount.discountCode = this.getDiscount.discountCode
      this.pay.discount.discountAmount = this.getDiscount.discountAmount
    },

    // salemtPaymentTypeSelected() {
    //   this.GET_SALEMT_PAYMENT_TYPE_ACTION({ formId: 1, ctrlId: 4 })
    // },
    // orderProducts: {
    //   handler() {
    //     const products = this.orderProducts.map(data => ({
    //       productCode: data.productCode,
    //       productId: data.productId,
    //       quantity: data.quantity,
    //     }))
    //     console.log(products)
    // this.GET_PROMOTION_FREE_ITEMS_ACTION({
    //   productList: products,
    // })
    //   },
    //   deep: true,
    // },
    totalOrderPrice() {
      this.pay.totalAmount = this.totalOrderPrice
    },
    totalQuantity() {
      this.pay.totalQuantity = this.totalQuantity
    },
  },

  mounted() {
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
      GET_PRODUCTS_ACTION,
      CREATE_SALE_ORDER_ACTION,
      GET_DISCOUNT_BY_CODE_ACTION,
      GET_VOUCHER_BY_ID_ACTION,
      GET_PROMOTION_FREE_ITEMS_ACTION,
    ]),
    ...mapActions(CUSTOMER, [
      GET_SALEMT_PAYMENT_TYPE_ACTION,
    ]),

    onVoucherButtonClick() {
      this.$root.$emit('bv::show::modal', 'VoucherModal')
    },

    getVoucherInfo(id) {
      this.pay.voucher.voucherId = id
      const productIds = this.orderProducts.map(item => item.productId)
      const params = {
        ctrlId: 7,
        formId: 5,
      }

      this.GET_VOUCHER_BY_ID_ACTION(`${this.pay.voucher.voucherId}?customerId=${this.customer.id}&productIds=${productIds}`, params)
    },

    searchDiscount() {
      const products = this.orderProducts.map(data => ({
        productId: data.productId,
        quantity: data.quantity,
      }))

      this.GET_DISCOUNT_BY_CODE_ACTION({
        code: this.pay.discount.discountCode,
        customerId: this.customer.id,
        products,
      })
    },

    resetVoucher() {
      this.pay.voucher.voucherCode = ''
      this.pay.voucher.voucherAmount = null
    },

    resetDiscount() {
      this.pay.discount.discountCode = ''
      this.pay.discount.discountAmount = null
    },

    resetOrderPayment() {
      this.voucherCode = null
      this.price = null
      this.payment = 0
    },

    totalPrice(amount, price) {
      return amount * (price || 0)
    },
    onChangeQuantity(id, params) {
      this.tempPromotions = [...this.tempPromotions.map(program => {
        if (program.programId === id) {
          return {
            ...program,
            products: [...program.products.map(product => {
              if (product.productId === params.row.productId) {
                if (Number(product.quantity) < 0) {
                  return {
                    ...product,
                    quantity: 0,
                  }
                }

                if (Number(product.quantity) > Number(product.quantityMax)) {
                  return {
                    ...product,
                    quantity: product.quantityMax,
                  }
                }
              }
              return product
            })],
          }
        }
        return program
      })]
    },
    isPositive(num) {
      if (num >= 0) {
        return true
      }
      return false
    },
    // createSaleOrder() {
    //   this.CREATE_SALE_ORDER_ACTION({
    //     product: {
    //       shopId: this.shopId,
    //       customerId: this.customer.id,
    //       totalPaid: this.totalOrderPrice,
    //       paymentType: this.salemtPaymentTypeSelected,
    //       deliveryType: this.deliverySelected,
    //       orderType: this.orderSelected,
    //       voucherId: this.voucherId,
    //       products: this.orderProducts,
    //       type: 0,
    //       salemanId: 1,
    //       usedRedInvoice: false,
    //     },
    //     onSuccess: () => {
    //       this.$refs.payModal.hide()
    //       this.resetOrderPayment()
    //     },
    //   })
    // },
  },
}
</script>
