<template>
  <!-- START Popup -->
  <b-modal
    id="pay-modal"
    ref="payModal"
    size="xl"
    title="Thanh toán hóa đơn"
    title-class="font-weight-bolder text-brand-1 d-print-none"
    content-class="bg-white"
    footer-border-variant="white"
  >
    <!-- START - Body -->
    <b-container
      fluid
      class="px-0 d-print-none"
    >
      <b-row class="mx-0">
        <!-- START - Section table -->
        <b-col
          class="shadow py-1"
        >
          <b-row
            class="mx-0 bg-light p-1 mb-1 w-25 rounded"
            align-v="center"
          >
            <b-icon-gift
              scale="2"
              color="red"
            />
            <strong class="ml-1 text-brand-1 h7">Khuyến mãi</strong>
          </b-row>

          <div
            v-for="(value,index) in promotionPrograms"
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
                  v-model="value.isSelected"
                  :disabled="!value.isUse || (value.promotionType === Number(promotionTypeOption[0].id) && value.isUse)"
                  @change="onChangeCheckProgramPromotion()"
                />
                <div class="text-white">
                  {{ value.promotionProgramName }} <span v-if="value.products.length > 0">- Số suất: {{ $formatNumberToLocale(value.numberLimited) }}</span>
                  <b-icon-shield-exclamation
                    v-if="value.products.length > 0 && !value.isUse"
                    v-b-popover.hover="{variant: 'danger', content: 'Chương trình này không được áp dụng do số suất không đủ'}"
                    class="cursor-pointer ml-1 text-danger"
                    font-scale="1.5"
                  />
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
                    :columns="columnsAdm"
                    :rows="value.products"
                    style-class="vgt-table bordered"
                    compact-mode
                    line-numbers
                  >
                    <!-- START - Empty rows -->
                    <div
                      slot="emptystate"
                      class="text-center"
                    >
                      Không có dữ liệu
                    </div>
                    <!-- END - Empty rows -->
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
                            v-model.number="promotionPrograms[index].products[props.row.originalIndex].quantity"
                            :disabled="!value.isEditable"
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

                    <!-- START - Action bottom -->
                    <div
                      v-if="value.isInsertItemProducts"
                      slot="table-actions-bottom"
                      class="mx-1 my-2 px-2"
                    >
                      <b-form-input
                        v-model="pay.productSearch"
                        class="w-25"
                        placeholder="Nhập mã hoặc tên sản phẩm"
                        type="text"
                        autocomplete="off"
                        :disabled="!value.isUse"
                        @focus="searchProductFocus"
                        @blur="inputSearchFocusedSP = false"
                        @input="loadProducts(value.programId)"
                        @keyup.enter="searchProductKeyEnter"
                        @keydown.up="searchProductKeyUp"
                        @keydown.down="searchProductKeyDown"
                        @click="clickProduct(value.programId)"
                      />
                      <b-collapse
                        v-model="inputSearchFocusedSP"
                        class="position-absolute mr-lg-0 mb-3"
                        style="zIndex:1"
                      >
                        <b-container
                          class="my-1 bg-white rounded border border-primary shadow-lg"
                        >
                          <b-col>
                            <b-row
                              v-for="(product,indexProduct) in allProducts"
                              :key="indexProduct"
                              class="my-1 cursor-pointer"
                              :class="{'item-active': indexProduct === cursorProduct}"
                              @click="selectProduct(value.programId,product)"
                              @mouseover="$event.target.classList.add('item-active')"
                              @mouseout="$event.target.classList.remove('item-active')"
                            >
                              <b>{{ product.productCode }}</b> - {{ product.productName }}
                            </b-row>
                          </b-col>
                        </b-container>
                      </b-collapse>
                    </div>
                    <!-- END - Action bottom -->
                  </vue-good-table>
                </div>
                <div v-else-if="value.amount">
                  <div v-if="value.amount.percentage !== null">
                    <b-row
                      class="mx-0 p-1 h7"
                      align-v="center"
                    >
                      <div>Giảm giá</div>

                      <b-col cols="5">
                        <b-input-group>
                          <b-input-group-prepend
                            v-if="value.amount.percentage > 0"
                            is-text
                          >
                            {{ value.amount.percentage }}%
                          </b-input-group-prepend>
                          <cleave
                            v-model="value.amount.amount"
                            class="form-control"
                            :raw="true"
                            :options="options.number"
                            disabled
                          />
                        </b-input-group>
                      </b-col>
                    </b-row>
                  </div>
                  <div v-else>
                    <b-row
                      class="mx-0 p-1 h7"
                      align-v="center"
                    >
                      <div>Số tiền</div>

                      <b-col cols="3">
                        <cleave
                          v-if="value.amount"
                          v-model="value.amount.amount"
                          class="form-control"
                          :raw="true"
                          :options="options.number"
                          :disabled="value.promotionType === Number(promotionTypeOption[0].id) || !value.isEditable"
                          @change.native="onChangePromotionAmout(value.amount.amount, value.amount.maxAmount)"
                        />
                      </b-col>
                    </b-row>
                    <div
                      v-if="value.amount.maxAmount > 0 || value.amount.maxAmount === null"
                      class="ml-1 h7"
                    >
                      Tối đa: {{ $formatNumberToLocale(value.amount.maxAmount) }}
                    </div>
                  </div>
                </div>
                <div v-else>
                  <vue-good-table
                    :columns="columnsAdm"
                    :rows="value.products"
                    style-class="vgt-table bordered"
                    compact-mode
                    line-numbers
                  >
                    <!-- START - Empty rows -->
                    <div
                      slot="emptystate"
                      class="text-center"
                    >
                      Không có dữ liệu
                    </div>
                    <!-- END - Empty rows -->
                    <!-- START - Action bottom -->
                    <div
                      slot="table-actions-bottom"
                      class="mx-1 my-2 px-2"
                    >
                      <b-form-input
                        v-model="pay.productSearch"
                        class="w-25"
                        placeholder="Nhập mã hoặc tên sản phẩm"
                        type="text"
                        autocomplete="off"
                        @focus="searchProductFocus"
                        @blur="inputSearchFocusedSP = false"
                        @input="loadProducts(value.programId)"
                        @keyup.enter="searchProductKeyEnter"
                        @keydown.up="searchProductKeyUp"
                        @keydown.down="searchProductKeyDown"
                        @click="clickProduct(value.programId)"
                      />
                      <b-collapse
                        v-model="inputSearchFocusedSP"
                        class="position-absolute mr-lg-0 mb-3"
                        style="zIndex:1"
                      >
                        <b-container
                          class="my-1 bg-white rounded border border-primary shadow-lg"
                        >
                          <b-col>
                            <b-row
                              v-for="(product,indexProduct) in allProducts"
                              :key="indexProduct"
                              class="my-1 cursor-pointer"
                              :class="{'item-active': indexProduct === cursorProduct}"
                              @click="selectProduct(value.programId,product)"
                              @mouseover="$event.target.classList.add('item-active')"
                              @mouseout="$event.target.classList.remove('item-active')"
                            >
                              <b>{{ product.productCode }}</b> - {{ product.productName }}
                            </b-row>
                          </b-col>
                        </b-container>
                      </b-collapse>
                    </div>
                    <!-- END - Action bottom -->
                  </vue-good-table>
                </div>
              </b-collapse>
            <!-- END - Body -->
            </b-col>
          <!-- END - Table Promotion -->
          </div>
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
            <strong class="ml-1 h7">Thanh toán</strong>
          </b-row>

          <b-form class="">
            <!-- START - Total price -->
            <b-form-group>
              <b-row
                class="mx-0"
                align-v="center"
              >
                <b-col
                  cols="4"
                  class="h7"
                >
                  <strong>Tổng tiền hàng
                    <strong class="d-inline-flex text-white px-1 ml-1 bg-brand-1 rounded-pill">
                      {{ pay.totalQuantity }}
                    </strong>
                  </strong>

                </b-col>

                <b-col>
                  <!-- <b-form-input
                    v-model="pay.totalAmount"
                    disabled
                  /> -->
                  <cleave
                    v-model="pay.totalAmount"
                    class="form-control"
                    :raw="true"
                    :options="options.number"
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
                <b-col
                  cols="4"
                  class="h7"
                >
                  <strong>Giảm giá</strong>
                </b-col>

                <b-col>
                  <cleave
                    v-model="pay.promotionAmount"
                    class="form-control"
                    :raw="true"
                    :options="options.number"
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
                <b-col
                  cols="4"
                  class="h7"
                >
                  <strong>Tiền tích lũy</strong>
                </b-col>

                <b-col>
                  <b-row no-gutters>
                    <b-col
                      cols="6"
                      class="h7"
                    >
                      <b-form-input
                        v-model="pay.accumulate.accumulatePoint"
                        disabled
                      />
                    </b-col>
                    <b-col
                      cols="6"
                      class="h7"
                    >
                      <cleave
                        v-model.number="pay.accumulate.accumulateAmount"
                        class="form-control pl-1"
                        :raw="true"
                        :options="options.number"
                        maxlenght="20"
                        @keyup.native="onChangeAccumulateAmount()"
                      />
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
                <b-col
                  cols="4"
                  class="h7"
                >
                  <strong>Voucher</strong>
                </b-col>

                <b-col>
                  <b-row
                    no-gutters
                  >
                    <b-col
                      cols="6"
                      class="h7"
                    >
                      <b-input-group class="input-group-merge">
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
                          v-model="pay.voucher.voucherSerials"
                          class="pl-1"
                          readonly
                        />
                      </b-input-group>
                    </b-col>
                    <b-col
                      cols="6"
                      class="h7"
                    >
                      <cleave
                        v-model="pay.voucher.totalVoucherAmount"
                        class="form-control pl-1"
                        :raw="true"
                        :options="options.number"
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
                <b-col
                  cols="4"
                  class="h7"
                >
                  <strong>Mã giảm giá</strong>
                </b-col>

                <b-col>
                  <b-row no-gutters>
                    <b-col>
                      <b-input-group class="input-group-merge">
                        <b-form-input
                          v-model="pay.discount.discountCode"
                          class="form-control-merge"
                          maxlenght="4000"
                          @keyup.enter="searchDiscount"
                        />
                        <b-input-group-append
                          is-text
                        >
                          <b-icon-x
                            scale="1.0"
                            class="cursor-pointer"
                            @click="resetDiscount"
                          />
                        </b-input-group-append>
                      </b-input-group>
                    </b-col>
                    <b-col>
                      <cleave
                        v-model="pay.discount.discountAmount"
                        class="form-control pl-1"
                        :raw="true"
                        :options="options.number"
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
                <b-col
                  cols="4"
                  class="h7"
                >
                  <strong>Khách cần trả</strong>
                </b-col>

                <b-col>
                  <cleave
                    v-model="pay.needPaymentAmount"
                    class="form-control"
                    :raw="true"
                    :options="options.number"
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
                <b-col
                  cols="4"
                  class="h7"
                >
                  <strong>Khách thanh toán</strong>
                </b-col>
                <b-col>
                  <b-row
                    no-gutters
                  >
                    <b-col
                      cols="6"
                      class="h7"
                    >
                      <tree-select
                        v-model="pay.salePayment.salePaymentType"
                        :options="salePaymentTypeOptions"
                      />
                    </b-col>

                    <b-col
                      cols="6"
                      class="h7"
                    >
                      <cleave
                        v-model.number="pay.salePayment.salePaymentAmount"
                        class="form-control"
                        :raw="true"
                        :options="options.number"
                        maxlenght="20"
                        @keyup.native="extraAmountCalculation"
                      />
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
                <b-col
                  cols="4"
                  class="h7"
                >
                  <strong>Tiền thừa trả khách</strong>
                </b-col>

                <b-col>
                  <cleave
                    v-model="pay.extraAmount"
                    class="form-control"
                    :raw="true"
                    :options="options.number"
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
    <template #modal-footer="{}">
      <b-row
        class="mx-auto d-print-none"
      >
        <b-button
          ref="btnPrintSaleOrderTemp"
          variant="none"
          class="d-flex align-items-center ml-1 text-uppercase btn-brand-1"
          :disabled="isDisabledPrintTempBtn"
          @click="printSaleOrderTemp()"
        >
          <b-icon-printer
            class="mr-1"
            scale="1.5"
          />
          In HĐ tạm (F7)
        </b-button>
        <b-button
          variant="none"
          class="d-flex align-items-center mx-1 text-uppercase btn-brand-1"
          :disabled="isDisabledPrintAndPaymentBtn"
          @click="createSaleOrderAndPrint()"
        >
          <b-icon-printer
            class="mr-1"
            scale="1.5"
          />
          Thanh toán - In (F8)
        </b-button>
        <b-button
          variant="none"
          class="d-flex align-items-center text-uppercase btn-brand-1"
          :disabled="isDisabledPaymentBtn"
          @click="createSaleOrder()"
        >
          <b-icon-cash-stack
            class="mr-1"
            scale="1.5"
          />
          Thanh toán (F9)
        </b-button>
        <b-button
          variant="none"
          class="d-flex align-items-center mx-1 text-uppercase btn-brand-1"
          :disabled="isDisabledRePrintBtn"
          @click="rePrintSaleOrder()"
        >
          <b-icon-printer
            class="mr-1"
            scale="1.5"
          />
          In lại hóa đơn (F10)
        </b-button>
        <b-button
          variant="none"
          class="d-flex align-items-center text-uppercase btn-brand-1"
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

    <voucher-modal
      :order-products="orderProducts"
      :customer="customer"
      @getVoucherInfo="getVoucherInfo"
    />

    <!-- START - Print form -->
    <print-form-sales-receipt :sale-order-print-info="saleOrderPrintInfo" />
    <!-- END - Print form -->
  </b-modal>
  <!-- End Popup -->
</template>

<script>
import commonData from '@/@db/common'
import toasts from '@core/utils/toasts/toasts'
import {
  number,
} from '@/@core/utils/validations/validations'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import Cleave from 'vue-cleave-component'
import saleData from '@/@db/sale'
import PrintFormSalesReceipt from '@core/components/print-form/PrintFormSalesReceiptV2.vue'
import {
  SALESRECEIPTS,
  PRINT_SALES_RECEIPT_ACTION,
} from '@/views/sales/sales-receipts/store-module/type'
import {
  SALES,
  // GETTERS
  GET_PRODUCTS_GETTER,
  GET_DISCOUNT_BY_CODE_GETTER,
  GET_PROMOTION_FREE_ITEMS_GETTER,
  GET_PROMOTION_PROGRAMS_GETTER,
  GET_PROMOTION_CALCULATION_GETTER,
  GET_ITEMS_PRODUCTS_PROGRAM_GETTER,
  CREATE_SALE_ORDER_GETTER,
  GET_SALE_PAYMENT_TYPES_GETTER,
  PRINT_SALES_TEMP_GETTER,

  // ACTIONS
  CREATE_SALE_ORDER_ACTION,
  GET_DISCOUNT_BY_CODE_ACTION,
  GET_PROMOTION_FREE_ITEMS_ACTION,
  GET_PROMOTION_PROGRAMS_ACTION,
  GET_PROMOTION_CALCULATION_ACTION,
  GET_ITEMS_PRODUCTS_PROGRAM_ACTION,
  PRINT_SALES_ACTION,
  GET_SALE_PAYMENT_TYPES_ACTION,
  PRINT_SALES_TEMP_ACTION,
} from '../../store-module/type'

import VoucherModal from '../voucher-modal/VoucherModal.vue'

export default {
  components: {
    VoucherModal,
    Cleave,
    PrintFormSalesReceipt,
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
    orderOnline: {
      type: Object,
      default: () => {},
    },
    editOnlinePermission: {
      type: Boolean,
      default: true,
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
          thClass: 'text-left col-2',
          tdClass: 'text-left col-2',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left col-5',
          tdClass: 'text-left col-5',
        },
        {
          label: 'Tồn kho',
          field: 'stockQuantity',
          sortable: false,
          thClass: 'text-center col-2',
          tdClass: 'text-center col-2',
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Số lượng tặng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          thClass: 'text-center col-3',
          tdClass: 'text-center col-3',
        },
      ],

      promotionPrograms: [],
      test: [],
      cursor: -1,
      cursorProduct: -1,
      salePaymentTypeOptions: [],
      pay: {
        saleOrderId: null,
        totalQuantity: 0,
        totalAmount: null,
        promotionAmount: null,
        accumulate: {
          accumulatePoint: null,
          accumulateAmount: null,
        },
        voucher: {
          voucherSerials: '',
          vouchers: [],
          totalVoucherAmount: null,
        },
        discount: {
          discountCode: '',
          discountAmount: 0,
        },
        needPaymentAmount: null,
        salePayment: {
          salePaymentType: '',
          salePaymentAmount: null,
        },
        extraAmount: null,
      },
      inputSearchFocusedSP: false,
      allProducts: [],
      formId: 5, // hard code permission
      ctrlId: 1, // hard code permission
      printSaleData: {},
      // validation rules
      number,

      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },

      // Enable/disable buttons
      isDisabledPrintTempBtn: false,
      isDisabledPrintAndPaymentBtn: false,
      isDisabledPaymentBtn: false,
      isDisabledRePrintBtn: false,

      // Check paid
      isPaid: false,

      saleOrderPrintInfo: {},
      isPrint: false,
    }
  },
  computed: {
    ...mapGetters(SALES, [
      GET_PRODUCTS_GETTER,
      GET_DISCOUNT_BY_CODE_GETTER,
      GET_PROMOTION_FREE_ITEMS_GETTER,
      GET_PROMOTION_PROGRAMS_GETTER,
      GET_PROMOTION_CALCULATION_GETTER,
      GET_ITEMS_PRODUCTS_PROGRAM_GETTER,
      CREATE_SALE_ORDER_GETTER,
      GET_SALE_PAYMENT_TYPES_GETTER,
      PRINT_SALES_TEMP_GETTER,
    ]),

    getDiscount() {
      return this.GET_DISCOUNT_BY_CODE_GETTER
    },

    totalQuantity() {
      return this.orderProducts.reduce((sum, item) => sum + Number(item.quantity), 0)
    },

    totalOrderPrice() {
      return this.orderProducts.reduce((sum, item) => sum + Number(item.sumProductTotalPrice), 0)
    },

    needPayment() {
      return Number(this.pay.totalAmount) - Number(this.pay.promotionAmount) - Number(this.pay.accumulate.accumulateAmount) - Number(this.pay.voucher.totalVoucherAmount) - Number(this.pay.discount.discountAmount)
    },

    getPromotionPrograms() {
      return this.GET_PROMOTION_PROGRAMS_GETTER
    },
    getItemsProduct() {
      return this.GET_ITEMS_PRODUCTS_PROGRAM_GETTER
    },
    getPromotionCalculation() {
      return this.GET_PROMOTION_CALCULATION_GETTER
    },
    getPrintSaleData() {
      return this.PRINT_SALES_GETTER
    },
    getCreateSale() {
      return this.CREATE_SALE_ORDER_GETTER
    },
    getSalePaymentTypes() {
      return this.GET_SALE_PAYMENT_TYPES_GETTER
    },
    getPrintSaleTempData() {
      return this.PRINT_SALES_TEMP_GETTER
    },
  },
  watch: {
    getDiscount() {
      if (this.getDiscount !== null) {
        this.pay.discount.discountCode = this.getDiscount.discountCode
        this.pay.discount.discountAmount = this.getDiscount.discountValue
      } else {
        this.pay.discount.discountAmount = 0
      }
    },
    totalOrderPrice() {
      this.pay.totalAmount = this.totalOrderPrice
    },
    totalQuantity() {
      this.pay.totalQuantity = this.totalQuantity
    },
    getPromotionPrograms() {
      if (this.getPromotionPrograms) {
        this.promotionPrograms = this.getPromotionPrograms.lstSalePromotions.map(data => ({
          promotionType: data.promotionType,
          isUse: data.isUse,
          programId: data.programId,
          promotionProgramName: data.promotionProgramName,
          contraintType: data.contraintType,
          products: data.products || [],
          amount: data.amount,
          programType: data.programType,
          isEditable: data.isEditable,
          numberLimited: data.numberLimited,
          isSelected: data.promotionType === Number(this.promotionTypeOption[0].id) && data.isUse,
          isInsertItemProducts: (data.products === null && data.amount === null),
          levelNumber: data.levelNumber,
          totalQty: data.totalQty,
        }))
        this.pay.promotionAmount = this.getPromotionPrograms.promotionAmount
      }

      // get accumulate
      this.pay.accumulate.accumulateAmount = 0
      this.pay.accumulate.accumulatePoint = this.customer.amountCumulated || null
    },
    getItemsProduct() {
      this.allProducts = [...this.getItemsProduct]
    },
    needPayment() {
      this.pay.needPaymentAmount = Number(this.needPayment)
      if (this.pay.needPaymentAmount < 0) {
        this.pay.needPaymentAmount = 0
      }
      this.extraAmountCalculation()
    },
    getPromotionCalculation() {
      this.pay.promotionAmount = this.getPromotionCalculation.promotionAmount
      this.pay.needPaymentAmount = this.getPromotionCalculation.paymentAmount
      this.extraAmountCalculation()
      if (this.getPromotionCalculation.lstSalePromotions) {
        this.promotionPrograms = [...this.promotionPrograms.map(program => {
          if (program.programType === saleData.programPromotionType[0].label) {
            const indexPromotionCalculationZV19 = this.getPromotionCalculation.lstSalePromotions.findIndex(p => p.programType === saleData.programPromotionType[0].label)
            if (indexPromotionCalculationZV19 !== -1) {
              const promotionCalculationZV19 = this.getPromotionCalculation.lstSalePromotions.find(p => p.programType === saleData.programPromotionType[0].label)
              promotionCalculationZV19.products = promotionCalculationZV19.products || []
              return { ...promotionCalculationZV19, isSelected: true }
            }
          }

          if (program.programType === saleData.programPromotionType[1].label) {
            const indexPromotionCalculationZV20 = this.getPromotionCalculation.lstSalePromotions.findIndex(p => p.programType === saleData.programPromotionType[1].label)
            if (indexPromotionCalculationZV20 !== -1) {
              const promotionCalculationZV20 = this.getPromotionCalculation.lstSalePromotions.find(p => p.programType === saleData.programPromotionType[1].label)
              promotionCalculationZV20.products = promotionCalculationZV20.products || []
              return { ...promotionCalculationZV20, isSelected: true }
            }
          }

          return program
        })]

        const indexZV19lstSalePromotions = this.getPromotionCalculation.lstSalePromotions.findIndex(p => p.programType === saleData.programPromotionType[0].label)
        const indexZV20lstSalePromotions = this.getPromotionCalculation.lstSalePromotions.findIndex(p => p.programType === saleData.programPromotionType[1].label)
        const indexZV21lstSalePromotions = this.getPromotionCalculation.lstSalePromotions.findIndex(p => p.programType === saleData.programPromotionType[2].label)
        if (indexZV19lstSalePromotions === -1) {
          const indexPromotionProgramZV19 = this.promotionPrograms.findIndex(p => p.programType === saleData.programPromotionType[0].label)
          if (indexPromotionProgramZV19) this.promotionPrograms.splice(indexPromotionProgramZV19, 1)
        }
        if (indexZV20lstSalePromotions === -1) {
          const indexPromotionProgramZV20 = this.promotionPrograms.findIndex(p => p.programType === saleData.programPromotionType[1].label)
          if (indexPromotionProgramZV20) this.promotionPrograms.splice(indexPromotionProgramZV20, 1)
        }
        if (indexZV21lstSalePromotions === -1) {
          const indexPromotionProgramZV21 = this.promotionPrograms.findIndex(p => p.programType === saleData.programPromotionType[2].label)
          if (indexPromotionProgramZV21) this.promotionPrograms.splice(indexPromotionProgramZV21, 1)
        }
      } else {
        const indexPromotionProgramZV19 = this.promotionPrograms.findIndex(p => p.programType === saleData.programPromotionType[0].label)
        const indexPromotionProgramZV20 = this.promotionPrograms.findIndex(p => p.programType === saleData.programPromotionType[1].label)
        const indexPromotionProgramZV21 = this.promotionPrograms.findIndex(p => p.programType === saleData.programPromotionType[2].label)
        if (indexPromotionProgramZV19 !== -1) {
          this.promotionPrograms.splice(indexPromotionProgramZV19, 1)
        }
        if (indexPromotionProgramZV20 !== -1) {
          this.promotionPrograms.splice(indexPromotionProgramZV20, 1)
        }
        if (indexPromotionProgramZV21 !== -1) {
          this.promotionPrograms.splice(indexPromotionProgramZV21, 1)
        }
      }
    },
    getPrintSaleData() {
      this.printSaleData = { ...this.getPrintSaleData }
    },
    getCreateSale() {
      if (this.getCreateSale.orderId) {
        toasts.success('Lưu đơn hàng thành công')
        this.pay.saleOrderId = this.getCreateSale.orderId
        if (this.isPrint) {
          this.PRINT_SALES_RECEIPT_ACTION({
            data: {
              salesReceiptId: this.pay.saleOrderId,
              formId: this.formId,
              ctrlId: this.ctrlId,
            },
            onSuccess: () => {
            },
          })
        }
      }
    },
    orderProducts: {
      handler() {
        let isValidProduct = true
        this.orderProducts.forEach(product => {
          if (product.quantity <= 0) {
            isValidProduct = false
          }
        })
        if (isValidProduct) {
          const paramProducts = this.orderProducts.map(data => ({
            productId: data.productId,
            productCode: data.productCode,
            quantity: data.quantity,
          }))
          if (paramProducts.length > 0) {
            this.GET_PROMOTION_PROGRAMS_ACTION({
              customerId: this.customer.id,
              orderType: Number(saleData.orderType[0].id),
              products: paramProducts,
            })
          }
          if (this.pay.discount.discountCode !== '') {
            this.pay.discount.discountCode = ''
            this.pay.discount.discountAmount = 0
          }
        }
      },
      deep: true,
    },
    getSalePaymentTypes() {
      this.salePaymentTypeOptions = [...this.getSalePaymentTypes.map(data => ({
        id: data.value,
        label: data.apParamName,
      }))]
      this.pay.salePayment.salePaymentType = this.salePaymentTypeOptions[0].id
    },
    getPrintSaleTempData() {
      this.saleOrderPrintInfo = { ...this.getPrintSaleTempData }
    },
    customer: {
      handler() {
        this.pay.salePayment.salePaymentAmount = null
        this.pay.extraAmount = null
        // get accumulate
        this.pay.accumulate.accumulateAmount = 0
        this.pay.accumulate.accumulatePoint = this.customer.amountCumulated || null
        this.extraAmountCalculation()
      },
      deep: true,
    },
    'pay.salePayment.salePaymentType': {
      handler() {
        if (this.pay.salePayment.salePaymentType === undefined || this.pay.salePayment.salePaymentType === '') {
          this.isDisabledPaymentBtn = true
          this.isDisabledPrintAndPaymentBtn = true
        } else {
          this.extraAmountCalculation()
        }
      },
      deep: true,
    },
  },

  mounted() {
    this.GET_SALE_PAYMENT_TYPES_ACTION({
      formId: this.formId,
      ctrlId: this.ctrlId,
    })
    this.isDisabledPaymentBtn = true
    this.isDisabledPrintAndPaymentBtn = true
    this.isDisabledRePrintBtn = true
    window.addEventListener('keydown', e => {
      if (e.key === 'F7') {
        if (!this.isPaid) {
          this.printSaleOrderTemp()
        }
      }
      if (e.key === 'F8') {
        if (!this.isPaid && this.pay.extraAmount !== null && Number(this.pay.extraAmount) >= 0 && this.pay.extraAmount !== '') {
          if (this.pay.salePayment.salePaymentType !== undefined) {
            this.createSaleOrderAndPrint()
          }
        }
      }
      if (e.key === 'F9') {
        if (!this.isPaid && this.pay.extraAmount !== null && Number(this.pay.extraAmount) >= 0 && this.pay.extraAmount !== '') {
          if (this.pay.salePayment.salePaymentType !== undefined) {
            this.createSaleOrder()
          }
          this.createSaleOrder()
        }
      }
      if (e.key === 'F10') {
        if (this.isPaid) {
          this.rePrintSaleOrder()
        }
      }
    })
  },
  methods: {
    ...mapActions(SALES, [
      CREATE_SALE_ORDER_ACTION,
      GET_DISCOUNT_BY_CODE_ACTION,
      GET_PROMOTION_FREE_ITEMS_ACTION,
      GET_PROMOTION_PROGRAMS_ACTION,
      GET_PROMOTION_CALCULATION_ACTION,
      GET_ITEMS_PRODUCTS_PROGRAM_ACTION,
      PRINT_SALES_ACTION,
      GET_SALE_PAYMENT_TYPES_ACTION,
      PRINT_SALES_TEMP_ACTION,
    ]),
    ...mapActions(SALESRECEIPTS, [
      PRINT_SALES_RECEIPT_ACTION,
    ]),
    onVoucherButtonClick() {
      this.$bvModal.show('VoucherModal')
    },

    getVoucherInfo(vouchers) {
      this.pay.voucher.vouchers = [...vouchers]
      const productSerials = vouchers.map(item => item.serialNumber)
      let totalVoucherAmount = 0
      this.pay.voucher.voucherSerials = productSerials.toString()
      vouchers.forEach(voucher => {
        totalVoucherAmount += voucher.price
      })
      this.pay.voucher.totalVoucherAmount = totalVoucherAmount
    },

    searchDiscount() {
      const products = this.orderProducts.map(data => ({
        productId: data.productId,
        quantity: data.quantity,
      }))

      this.GET_DISCOUNT_BY_CODE_ACTION({
        data: {
          code: this.pay.discount.discountCode,
          formId: this.formId,
          ctrlId: this.ctrlId,
          dataGetCode: {
            customerId: this.customer.id,
            orderType: Number(this.orderSelected),
            products,
          },
        },
        onSuccess: () => {
        },
        onFailure: () => {
          if (Number(this.pay.discount.discountAmount) === 0) {
            this.pay.discount.discountCode = ''
          }
        },
      })
    },

    resetDiscount() {
      this.pay.discount.discountCode = ''
      this.pay.discount.discountAmount = 0
    },

    onChangeQuantity(id, params) {
      this.promotionPrograms = [...this.promotionPrograms.map(program => {
        if (program.programId === id) {
          if (program.contraintType === Number(saleData.constraintType[1].id)) {
            let maxQuantity = 0
            let totalQuantity = 0
            const productsSameQuantityMax = program.products.filter(i => i.quantityMax === program.products[0].quantityMax)

            if (productsSameQuantityMax.length === program.products.length) {
              program.products.forEach(product => {
                totalQuantity += product.quantity
              })
              maxQuantity = program.products[0].quantityMax
              if (totalQuantity > maxQuantity) {
                toasts.error(`${program.promotionProgramName} tổng tất cả sản phẩm trong chương trình không được lớn hơn ${maxQuantity}`)
              }
              return program
            }
            return {
              ...program,
              isUse: true,
              products: [...program.products.map(product => {
                if (product.productId !== params.row.productId || Number(product.quantity) < 0) {
                  return {
                    ...product,
                    quantity: null,
                  }
                }

                if (Number(product.quantity) > product.quantityMax) {
                  if (program.numberLimited < product.quantityMax) {
                    return {
                      ...product,
                      quantity: Number(program.numberLimited),
                    }
                  }
                  return {
                    ...product,
                    quantity: product.quantityMax,
                  }
                }

                if (program.numberLimited > 0 && Number(product.quantity) > program.numberLimited) {
                  return {
                    ...product,
                    quantity: program.numberLimited,
                  }
                }
                return product
              })],
            }
          }

          return {
            ...program,
            isUse: true,
            products: [...program.products.map(product => {
              if (product.productId === params.row.productId) {
                if (Number(product.quantity) < 0) {
                  return {
                    ...product,
                    quantity: null,
                  }
                }

                if (Number(product.quantity) > product.quantityMax) {
                  if (program.numberLimited < product.quantityMax) {
                    return {
                      ...product,
                      quantity: Number(program.numberLimited),
                    }
                  }
                  return {
                    ...product,
                    quantity: product.quantityMax,
                  }
                }

                if (program.numberLimited > 0 && Number(product.quantity) > program.numberLimited) {
                  return {
                    ...product,
                    quantity: program.numberLimited,
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
    searchProductFocus() {
      this.cursorProduct = -1
      this.inputSearchFocusedSP = this.pay.productSearch !== null && this.pay.productSearch.length >= commonData.minSearchLength
    },
    searchProductKeyUp() {
      if (this.cursorProduct > 0) {
        this.cursorProduct -= 1
      }
    },
    searchProductKeyDown() {
      if (this.cursorProduct < this.allProducts.length) {
        this.cursorProduct += 1
      }
    },
    searchProductKeyEnter() {
      if (this.inputSearchFocusedSP && this.allProducts[this.cursorProduct]) {
        this.selectProduct(this.allProducts[this.cursorProduct])
        this.inputSearchFocusedSP = false
      }
    },
    loadProducts(programId) {
      this.cursorProduct = -1
      if (this.pay.productSearch === null) return
      if (this.pay.productSearch.length >= commonData.minSearchLength) {
        this.inputSearchFocusedSP = true

        this.GET_ITEMS_PRODUCTS_PROGRAM_ACTION({
          keyWord: this.pay.productSearch,
          promotionId: programId,
          formId: this.formId,
          ctrlId: this.ctrlId,
        })
      } else {
        this.inputSearchFocusedSP = false
      }
    },
    clickProduct(programId) {
      if (this.pay.productSearch === null) return
      if (this.pay.productSearch.length >= commonData.minSearchLength) {
        this.GET_ITEMS_PRODUCTS_PROGRAM_ACTION({
          promotionId: programId,
          formId: this.formId,
          ctrlId: this.ctrlId,
        })
      }
    },
    selectProduct(programId, product) {
      this.pay.productSearch = null
      this.promotionPrograms = [...this.promotionPrograms.map(program => {
        if (program.programId === programId) {
          const existedProductIndex = program.products.findIndex(p => p.productCode === product.productCode)
          if (existedProductIndex === -1 || program.products.length === 0) {
            return {
              ...program,
              products: [...program.products.push(product)],
            }
          }
        }
        return program
      })]
    },
    onChangeCheckProgramPromotion() {
      const paramPromotionAmountInfos = this.promotionPrograms.filter(p => (p.amount !== null || p.programType === saleData.programPromotionType[2].label) && p.isSelected && p.isUse)
      const paramOrderRequest = {
        customerId: this.customer.id,
        orderType: Number(this.orderSelected),
        products: this.orderProducts,
      }

      const paramGetPromotionCalculationData = {
        customerId: this.customer.id,
        orderType: Number(this.orderSelected),
        totalOrderAmount: Number(this.pay.totalAmount),
        saveAmount: Number(this.pay.accumulate.accumulateAmount),
        voucherAmount: Number(this.pay.voucher.totalVoucherAmount) || 0,
        saleOffAmount: Number(this.pay.discount.discountAmount),
        promotionInfo: paramPromotionAmountInfos,
        orderRequest: paramOrderRequest,
      }

      this.GET_PROMOTION_CALCULATION_ACTION(paramGetPromotionCalculationData)
    },
    onChangePromotionAmout(amount, maxAmout) {
      if (amount > maxAmout) {
        toasts.error('Số tiền không được vượt quá số tiền tối đa')
      }
    },
    extraAmountCalculation() {
      if (Number.isNaN(Number(this.pay.salePayment.salePaymentAmount))) {
        this.pay.salePayment.salePaymentAmount = 0
      }
      if (this.pay.salePayment.salePaymentAmount === null || this.pay.salePayment.salePaymentAmount === '') {
        this.pay.extraAmount = null
      } else {
        this.pay.extraAmount = Number(this.pay.salePayment.salePaymentAmount) - Number(this.pay.needPaymentAmount)
      }
      if (Number(this.pay.extraAmount) < 0 || this.pay.extraAmount === null) {
        this.isDisabledPaymentBtn = true
        this.isDisabledPrintAndPaymentBtn = true
      } else {
        this.isDisabledPaymentBtn = false
        this.isDisabledPrintAndPaymentBtn = false
      }
      if (this.isPaid) {
        this.isDisabledPaymentBtn = this.isPaid
        this.isDisabledPrintAndPaymentBtn = this.isPaid
      }
    },

    createSaleOrder() {
      let isValid = true
      const parampromotionInfo = this.promotionPrograms.filter(p => p.isUse && p.isSelected)
      parampromotionInfo.forEach(program => {
        program.products.forEach(product => {
          if (program.isEditable) {
            if (product.quantity > product.stockQuantity) {
              isValid = false
              toasts.error(`${program.promotionProgramName} số lượng của ${product.productName} không được lớn hơn số lượng tồn kho`)
            }
          } else if (product.quantityMax > product.stockQuantity) {
            isValid = false
            toasts.error(`${program.promotionProgramName} số lượng của ${product.productName} không được lớn hơn số lượng tồn kho`)
          }
        })
      })

      if (isValid) {
        this.isPrint = false
        this.CREATE_SALE_ORDER_ACTION({
          orderSale: {
            customerId: this.customer.id,
            paymentType: this.pay.salePayment.salePaymentType,
            deliveryType: Number(this.deliverySelected),
            orderType: Number(this.orderSelected),
            note: this.orderOnline.orderNote,
            orderOnlineId: this.orderOnline.onlineOrderId,
            onlineNumber: this.orderOnline.orderNumber,
            products: this.orderProducts,
            promotionInfo: parampromotionInfo,
            totalOrderAmount: Number(this.pay.totalAmount) || 0,
            promotionAmount: Number(this.pay.promotionAmount) || 0,
            accumulatedAmount: Number(this.pay.accumulate.accumulateAmount) || 0,
            discountAmount: Number(this.pay.discount.discountAmount) || 0,
            discountCode: this.pay.discount.discountCode,
            voucherAmount: Number(this.pay.voucher.totalVoucherAmount) || 0,
            vouchers: this.pay.voucher.vouchers,
            paymentAmount: Number(this.pay.needPaymentAmount) || 0,
            remainAmount: Number(this.pay.salePayment.salePaymentAmount) || 0,
            extraAmount: Number(this.pay.extraAmount) || 0,
          },
          onSuccess: () => {
            this.isDisabledRePrintBtn = false
            this.isDisabledPrintAndPaymentBtn = true
            this.isDisabledPrintTempBtn = true
            this.isDisabledPaymentBtn = true
            this.isPaid = true
          },
        })
      }
    },
    createSaleOrderAndPrint() {
      this.createSaleOrder()
      this.isPrint = true
    },
    cancel() {
      if (this.isPaid) {
        this.$router.go(this.$router.currentRoute)
      }
      this.$bvModal.hide('pay-modal')
    },
    onChangeAccumulateAmount() {
      this.pay.accumulate.accumulateAmount = Number.parseInt(this.pay.accumulate.accumulateAmount, 0)
      if (Number(this.pay.accumulate.accumulateAmount) < 0 || Number.isNaN(Number(this.pay.accumulate.accumulateAmount))) {
        this.pay.accumulate.accumulateAmount = 0
      }

      if (Number(this.pay.accumulate.accumulateAmount) > this.customer.amountCumulated) {
        this.pay.accumulate.accumulateAmount = this.customer.amountCumulated
      }
    },
    printSaleOrderTemp() {
      let isValid = true
      const parampromotionInfo = this.promotionPrograms.filter(p => p.isUse && p.isSelected)
      parampromotionInfo.forEach(program => {
        program.products.forEach(product => {
          if (program.isEditable) {
            if (product.quantity > product.stockQuantity) {
              isValid = false
              toasts.error(`${program.promotionProgramName} số lượng của ${product.productName} không được lớn hơn số lượng tồn kho`)
            }
          } else if (product.quantityMax > product.stockQuantity) {
            isValid = false
            toasts.error(`${program.promotionProgramName} số lượng của ${product.productName} không được lớn hơn số lượng tồn kho`)
          }
        })
      })

      if (isValid) {
        this.PRINT_SALES_TEMP_ACTION({
          orderSale: {
            customerId: this.customer.id,
            paymentType: this.pay.salePayment.salePaymentType,
            deliveryType: Number(this.deliverySelected),
            orderType: Number(this.orderSelected),
            note: this.orderOnline.orderNote,
            orderOnlineId: this.orderOnline.onlineOrderId,
            onlineNumber: this.orderOnline.orderNumber,
            products: this.orderProducts,
            promotionInfo: parampromotionInfo,
            totalOrderAmount: Number(this.pay.totalAmount) || 0,
            promotionAmount: Number(this.pay.promotionAmount) || 0,
            accumulatedAmount: Number(this.pay.accumulate.accumulateAmount) || 0,
            discountAmount: Number(this.pay.discount.discountAmount) || 0,
            discountCode: this.pay.discount.discountCode,
            voucherAmount: Number(this.pay.voucher.totalVoucherAmount) || 0,
            vouchers: this.pay.voucher.vouchers,
            paymentAmount: Number(this.pay.needPaymentAmount) || 0,
            remainAmount: Number(this.pay.salePayment.salePaymentAmount) || 0,
            extraAmount: Number(this.pay.extraAmount) || 0,
          },
          onSuccess: () => {
          },
        })
      }
    },
    rePrintSaleOrder() {
      if (this.isPrint) {
        window.print()
      } else {
        this.PRINT_SALES_RECEIPT_ACTION({
          data: {
            salesReceiptId: this.pay.saleOrderId,
            formId: this.formId,
            ctrlId: this.ctrlId,
          },
          onSuccess: () => {
          },
        })
      }
    },
  },
}
</script>
