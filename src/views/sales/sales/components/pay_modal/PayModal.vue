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
    @hidden="cancel()"
  >
    <!-- START - Body -->
    <b-container
      fluid
      class="px-0 d-print-none"
    >
      <b-row class="mx-0">
        <!-- START - Section table -->
        <b-col
          class="shadow py-1 scrollspy-promotion-program"
        >
          <b-row>
            <div
              class="mx-1 bg-light spacing m-bottom pl-2 pr-2 rounded"
              align-v="center"
              align-h="center"
            >
              <b-icon-gift
                scale="1.2"
                color="red"
              />
              <strong
                class="ml-1 text-brand-1 h7 mt-1"
                align-v="center"
              >
                Khuyến mãi
              </strong>
            </div>
          </b-row>
          <!-- START - Promotion Programs-->
          <div
            v-for="(value,index) in promotionPrograms"
            :key="index"
          >
            <!-- START - Table Promotion -->
            <b-col class="p-0">
              <!-- START - Title -->
              <b-row
                v-b-toggle="'collapse-'+value.programId"
                align-v="center"
                class="mx-0 style-padding bg-brand-1"
              >
                <b-check
                  v-model="value.isUse"
                  :disabled="!value.isEditable || value.promotionType === Number(promotionTypeOption[0].id)"
                  @change="onChangeCheckProgramPromotion()"
                />
                <div class="text-white">
                  {{ value.promotionProgramName }} <span>- Số suất: {{ $formatNumberToLocale(value.numberLimited) }}</span>
                  <b-icon-shield-exclamation
                    v-if="(!value.isEditable && !value.isUse && value.promotionType === Number(promotionTypeOption[1].id)) || (value.promotionType === Number(promotionTypeOption[0].id) && !value.isUse)"
                    v-b-popover.hover="{variant: 'danger', content: 'Chương trình này không được áp dụng do số suất không đủ'}"
                    class="cursor-pointer ml-1 text-danger"
                    font-scale="1.5"
                  />
                </div>
                <b-icon-chevron-down
                  class="ml-auto when-opened"
                  color="white"
                />
                <b-icon-chevron-up
                  color="white"
                  class="ml-auto when-closed"
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
                    style-class="vgt-table bordered style-paymodal"
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
                        <b-input-group>
                          <template #append>
                            <b-input-group-text>{{ props.row.quantityMax }}</b-input-group-text>
                          </template>
                          <b-form-input
                            v-model.number="promotionPrograms[index].products[props.row.originalIndex].quantity"
                            :disabled="!value.isEditable"
                            maxlength="7"
                            @change="onChangeQuantity(value.programId, props)"
                            @keypress="$onlyNumberInput"
                          />
                        </b-input-group>
                      </div>
                      <div
                        v-else-if="props.column.field === 'tableProductFeature' && value.promotionType === Number(promotionTypeOption[1].id)"
                        class="mx-0"
                      >
                        <b-icon-x
                          v-b-popover.hover="'Xóa'"
                          scale="2.0"
                          class="cursor-pointer mt-1"
                          color="red"
                          @click="removeProductPromotionProgramHandle(value.programId,props.row.productId)"
                        />
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
                        :disabled="!value.isEditable"
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
                  <div v-if="value.amount.percentage !== 0">
                    <b-row
                      class="mx-0 spacing h7"
                      align-v="center"
                    >
                      <div>Giảm giá</div>

                      <b-col class="max-width">
                        <b-input-group>
                          <b-input-group-prepend
                            v-if="value.amount.percentage > 0"
                            is-text
                          >
                            <span class="word-wrap">{{ value.amount.percentage }}%</span>
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
                      class="mx-0 spacing h7"
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
                          :disabled="!value.isEditable"
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
          <!-- END - Promotion Programs -->
        </b-col>
        <!-- START - Section table -->

        <!-- START - Section Pay -->
        <b-col class="ml-1 shadow py-1">
          <b-row>
            <div
              class="mx-1 bg-light spacing m-bottom pl-2 pr-2 rounded"
              align-v="center"
              align-h="center"
            >
              <b-icon-cash-stack
                scale="1.5"
                class="text-brand-1"
              />
              <strong class="ml-1 h7">Thanh toán</strong>
            </div>
          </b-row>

          <b-form class="">
            <!-- START - Total price -->
            <b-form-group class="style-margin">
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
                    class="form-control h6 mb-0 text-right"
                    :raw="true"
                    :options="options.number"
                    disabled
                  />
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Total price -->

            <!-- START - Discount -->
            <b-form-group class="style-margin">
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
                    class="form-control h6 mb-0 text-right"
                    :raw="true"
                    :options="options.number"
                    disabled
                  />
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Discount -->

            <!-- START - Money accumulated -->
            <b-form-group class="style-margin">
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
                      class="h6 mb-0"
                    >
                      <!-- <b-form-input
                        v-model="pay.accumulate.accumulatePoint"
                        disabled
                      /> -->
                      <cleave
                        v-model.number="pay.accumulate.accumulatePoint"
                        class="form-control pl-1 h6 mb-0 text-right"
                        :raw="true"
                        :options="options.number"
                        disabled
                      />
                    </b-col>
                    <b-col
                      cols="6"
                      class="h7"
                    >
                      <cleave
                        v-model.number="pay.accumulate.accumulateAmount"
                        class="form-control pl-1 h6 mb-0 text-right"
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
            <b-form-group class="style-margin">
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
                      class="h6 mb-0"
                    >
                      <b-input-group class="input-group-merge">
                        <b-input-group-prepend
                          v-b-popover.hover="'Chọn voucher'"
                          is-text
                          class="cursor-pointer text-right"
                          @click="onVoucherButtonClick(pay.isVoucherLocked)"
                        >
                          <b-icon-three-dots-vertical
                            scale="1.5"
                          />
                        </b-input-group-prepend>
                        <b-form-input
                          v-model="pay.voucher.voucherSerials"
                          class="pl-1 h6 mb-0 text-right"
                          readonly
                        />
                        <b-input-group-text>
                          <b-icon-x
                            scale="1.0"
                            class="cursor-pointer"
                            @click="resetVoucher()"
                          />
                        </b-input-group-text>
                      </b-input-group>
                    </b-col>
                    <b-col
                      cols="6"
                      class="h7"
                    >
                      <cleave
                        v-model="pay.voucher.totalVoucherAmount"
                        class="form-control pl-1 h6 mb-0 text-right"
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
            <b-form-group class="style-margin">
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
                          class="form-control-merge text-right"
                          maxlenght="4000"
                          :disabled="isDisabledDiscount"
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
                        class="form-control pl-1 h6 mb-0 text-right"
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
            <b-form-group class="style-margin">
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
                    class="form-control h4 mb-0 font-weight-600 text-right"
                    :raw="true"
                    :options="options.number"
                    disabled
                  />
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Customer need to pay -->

            <!-- START - Payment customers -->
            <b-form-group class="style-margin">
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
                        placeholder="Chọn"
                      />
                    </b-col>

                    <b-col
                      cols="6"
                      class="h6"
                    >
                      <cleave
                        v-model="pay.salePayment.salePaymentAmount"
                        class="form-control h6 text-right"
                        :raw="true"
                        :options="options.number"
                        maxlength="20"
                        @keyup.native="extraAmountCalculation"
                      />
                    </b-col>

                  </b-row>
                </b-col>

              </b-row>
            </b-form-group>
            <!-- END - Payment customers -->

            <!-- START - Excess cash -->
            <b-form-group class="style-margin">
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
                    class="form-control h6 mb-0 text-right"
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
        <!-- START - Print temp  -->
        <b-button
          v-if="statusPrintTmpButton().show"
          ref="btnPrintSaleOrderTemp"
          :disabled="statusPrintTmpButton().disabled || isDisabledPrintTempBtn"
          variant="none"
          class="aligns-items-button-center ml-1 btn-brand-1"
          @click="printSaleOrderTemp()"
        >
          <b-icon-printer
            class="mr-1"
            scale="1.5"
          />
          In HĐ tạm (F7)
        </b-button>
        <!-- END - Print temp  -->

        <!-- START - Pay and print  -->
        <b-button
          v-if="statusPayPrintButton().show"
          :disabled="statusPayPrintButton().disabled || isDisabledPrintAndPaymentBtn"
          variant="none"
          class="aligns-items-button-center mx-1 btn-brand-1"
          @click="createSaleOrderAndPrint()"
        >
          <b-icon-printer
            class="mr-1"
            scale="1.5"
          />
          Thanh toán - In (F8)
        </b-button>
        <!-- END - Pay and print  -->

        <!-- START - Pay  -->
        <b-button
          v-if="statusPayButton().show"
          :disabled="statusPayButton().disabled || isDisabledPaymentBtn"
          variant="none"
          class="aligns-items-button-center btn-brand-1"
          @click="createSaleOrder()"
        >
          <b-icon-cash-stack
            class="mr-1"
            scale="1.5"
          />
          Thanh toán (F9)
        </b-button>
        <!-- END - Pay  -->

        <!-- START - Reprint  -->
        <b-button
          v-if="statusRePrintButton().show"
          :disabled="statusRePrintButton().disabled || isDisabledRePrintBtn"
          variant="none"
          class="aligns-items-button-center mx-1 btn-brand-1"
          @click="rePrintSaleOrder()"
        >
          <b-icon-printer
            class="mr-1"
            scale="1.5"
          />
          In hóa đơn (F10)
        </b-button>
        <!-- END - Reprint  -->

        <!-- START - Close button  -->
        <b-button
          variant="none"
          class="d-flex align-items-center btn-brand-1"
          @click="cancel()"
        >
          <b-icon-x
            scale="2"
            class="mr-1"
          />
          Đóng (ESC)
        </b-button>
        <!-- END - Close button  -->

      </b-row>
    </template>
    <!-- END - Footer -->

    <voucher-modal
      :order-products="orderProducts"
      :customer="customer"
      @getVoucherInfo="getVoucherInfo"
    />

    <!-- START - Print form -->
    <print-form-sales-receipt />
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
    bills: {
      type: Array,
      default: () => [],
    },
    isOpenPayModal: {
      type: Boolean,
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
          thClass: 'text-left text-nowrap font-weight-normal col-2',
          tdClass: 'text-left col-2',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left font-weight-normal col-5',
          tdClass: 'text-left col-5',
        },
        {
          label: 'Tồn kho',
          field: 'stockQuantity',
          sortable: false,
          thClass: 'text-center font-weight-normal col-2',
          tdClass: 'text-center col-2',
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Số lượng tặng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          thClass: 'text-center font-weight-normal col-3',
          tdClass: 'text-center col-3',
        },
        {
          label: '',
          field: 'tableProductFeature',
          sortable: false,
          thClass: 'text-center col-1',
          tdClass: 'text-center col-1',
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
        isVoucherLocked: false,
        promotionAmountExTax: null,
      },
      inputSearchFocusedSP: false,
      allProducts: [],
      decentralization: { // hard code permission
        formId: 5,
        ctrlId: 7,
      },
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

      isPrint: false,
      isSaveSuccess: false,
      isDisabledDiscount: false,
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
  },

  watch: {
    getDiscount() {
      if (this.getDiscount !== null) {
        this.pay.discount.discountAmount = this.getDiscount.amount.amount
      } else {
        this.pay.discount.discountCode = ''
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
      if (this.getPromotionPrograms.lstSalePromotions) {
        this.promotionPrograms = this.getPromotionPrograms.lstSalePromotions.map(data => ({
          promotionType: data.promotionType,
          isUse: data.isUse,
          programId: data.programId,
          programType: data.programType,
          promotionProgramName: data.promotionProgramName,
          promotionProgramCode: data.promotionProgramCode,
          contraintType: data.contraintType,
          products: data.products || [],
          amount: data.amount,
          isEditable: data.isEditable,
          numberLimited: data.numberLimited,
          isInsertItemProducts: (data.products === null && data.amount === null),
          levelNumber: data.levelNumber,
          totalQty: data.totalQty,
          totalAmtExTax: data.totalAmtExTax,
          totalAmtInTax: data.totalAmtInTax,
          zv23Amount: data.zv23Amount,
          isReturn: data.isReturn,
          lstProductId: data.lstProductId,
        }))
        this.pay.promotionAmount = this.getPromotionPrograms.promotionAmount
        this.pay.promotionAmountExTax = this.getPromotionPrograms.promotionAmountExTax || null
        this.pay.isVoucherLocked = this.getPromotionPrograms.lockVoucher
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
      this.pay.salePayment.salePaymentAmount = Number(this.needPayment)
      if (this.pay.needPaymentAmount < 0) {
        this.pay.needPaymentAmount = 0
        this.pay.salePayment.salePaymentAmount = 0
      }

      const totalPromotion = Number(this.pay.accumulate.accumulateAmount) - Number(this.pay.voucher.voucherAmount) - Number(this.pay.discount.discountAmount)
      if (totalPromotion > this.pay.totalAmount) {
        toasts.error('Tổng tiền khuyến mãi đã vượt quá Tổng tiền hàng. Vui lòng kiểm tra lại')
      }
      this.extraAmountCalculation()
    },
    getPromotionCalculation() {
      this.pay.promotionAmount = this.getPromotionCalculation.promotionAmount
      this.pay.promotionAmount = this.getPromotionCalculation.promotionAmountExTax || null
      this.pay.needPaymentAmount = this.getPromotionCalculation.paymentAmount
      this.extraAmountCalculation()
      if (this.getPromotionCalculation.lstSalePromotions) {
        this.promotionPrograms = [...this.promotionPrograms.map(program => {
          if (program.programType === saleData.programPromotionType[0].label) {
            const indexPromotionCalculationZV19 = this.getPromotionCalculation.lstSalePromotions.findIndex(p => p.programType === saleData.programPromotionType[0].label)
            if (indexPromotionCalculationZV19 !== -1) {
              const promotionCalculationZV19 = this.getPromotionCalculation.lstSalePromotions.find(p => p.programType === saleData.programPromotionType[0].label)
              promotionCalculationZV19.products = promotionCalculationZV19.products || []
              return { ...promotionCalculationZV19, isUse: true }
            }
          }

          if (program.programType === saleData.programPromotionType[1].label) {
            const indexPromotionCalculationZV20 = this.getPromotionCalculation.lstSalePromotions.findIndex(p => p.programType === saleData.programPromotionType[1].label)
            if (indexPromotionCalculationZV20 !== -1) {
              const promotionCalculationZV20 = this.getPromotionCalculation.lstSalePromotions.find(p => p.programType === saleData.programPromotionType[1].label)
              promotionCalculationZV20.products = promotionCalculationZV20.products || []
              return { ...promotionCalculationZV20, isUse: true }
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
              params: { ...this.decentralization },
            },
            onSuccess: () => {},
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
              orderType: Number(this.orderSelected),
              products: paramProducts,
              invisibleLoading: true,
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
    customer: {
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
              orderType: Number(this.orderSelected),
              products: paramProducts,
              invisibleLoading: true,
            })
          }
          if (this.pay.discount.discountCode !== '') {
            this.pay.discount.discountCode = ''
            this.pay.discount.discountAmount = 0
          }
        }
        // clean data
        this.pay.extraAmount = null
        this.pay.voucher.voucherSerials = ''
        this.pay.voucher.vouchers = []
        this.pay.voucher.totalVoucherAmount = null
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
    orderSelected: {
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
              orderType: Number(this.orderSelected),
              products: paramProducts,
              invisibleLoading: true,
            })
          }
          if (this.pay.discount.discountCode !== '') {
            this.pay.discount.discountCode = ''
            this.pay.discount.discountAmount = 0
          }
        }
        // clean data
        this.pay.extraAmount = null
        this.pay.voucher.voucherSerials = ''
        this.pay.voucher.vouchers = []
        this.pay.voucher.totalVoucherAmount = null
        // get accumulate
        this.pay.accumulate.accumulateAmount = 0
        this.pay.accumulate.accumulatePoint = this.customer.amountCumulated || null
        this.extraAmountCalculation()
      },
      deep: true,
    },
    orderOnline: {
      handler() {
        if (this.orderOnline.onlineOrderId !== null) {
          this.pay.discount.discountCode = this.orderOnline.discountCode
          this.pay.discount.discountAmount = this.orderOnline.discountValue
        }
      },
      deep: true,
    },
  },
  created() {
    window.addEventListener('keydown', this.keyDown)
  },
  mounted() {
    this.GET_SALE_PAYMENT_TYPES_ACTION({
      ...this.decentralization,
    })
    this.isDisabledPaymentBtn = true
    this.isDisabledPrintAndPaymentBtn = true
    this.isDisabledRePrintBtn = true
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
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

    statusPrintTmpButton() {
      return this.$permission('Sales', 'SalesPrinttmp')
    },
    statusPayPrintButton() {
      return this.$permission('Sales', 'SalesPaymentAndPrinttmp')
    },
    statusPayButton() {
      return this.$permission('Sales', 'SalesPayment')
    },
    statusRePrintButton() {
      return this.$permission('Sales', 'SalesReloadPrint')
    },

    onVoucherButtonClick(isLocked) {
      if (isLocked) {
        toasts.error('Bạn đã nhập sai quá số lần quy định và bị khóa chức năng trong ngày. Vui lòng liên hệ với bộ phận hỗ trợ để được tư vấn.')
      } else if (!isLocked && this.isPaid) {
        toasts.error('Bạn đã thanh toán hoá đơn này, nên sẽ không sử dụng được chức năng này nữa.')
      } else {
        this.$bvModal.show('VoucherModal')
      }
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
      if (this.pay.discount.discountCode !== '') {
        const products = this.orderProducts.map(data => ({
          productId: data.productId,
          quantity: data.quantity,
        }))
        this.GET_DISCOUNT_BY_CODE_ACTION({
          data: {
            ...this.decentralization,
            code: this.pay.discount.discountCode,
            dataGetCode: {
              customerId: this.customer.id,
              orderType: Number(this.orderSelected),
              products,
              promotionAmount: this.pay.promotionAmount,
              promotionAmountExTax: this.pay.promotionAmountExTax,
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
      } else {
        toasts.error('Hãy nhập mã giảm giá')
      }
    },

    resetDiscount() {
      this.pay.discount.discountCode = ''
      this.pay.discount.discountAmount = 0
    },

    resetVoucher() {
      this.pay.voucher.voucherSerials = ''
      this.pay.voucher.vouchers = []
      this.pay.voucher.totalVoucherAmount = null
    },

    onChangeQuantity(id, params) {
      this.promotionPrograms = [...this.promotionPrograms.map(program => {
        if (program.programId === id) {
          // CTKM auto (One Free Item)
          if (program.contraintType === Number(saleData.constraintType[1].id) && program.promotionType === Number(this.promotionTypeOption[0].id)) {
            let totalQuantityOtherProductSelected = 0
            const productsGroup = program.products.filter(i => i.groupOneFreeItem === params.row.groupOneFreeItem)
            const productsSameQuantityMax = productsGroup.filter(i => i.quantityMax === productsGroup[0].quantityMax)
            if (productsSameQuantityMax.length === productsGroup.length) { // Trường hợp cùng cơ số
              productsGroup.forEach(product => {
                if (product.productId !== params.row.productId) {
                  totalQuantityOtherProductSelected += product.quantity
                }
              })
              const remainQuantity = productsGroup[0].quantityMax - totalQuantityOtherProductSelected
              return {
                ...program,
                products: [...program.products.map(product => {
                  if (product.groupOneFreeItem === params.row.groupOneFreeItem) {
                    if (product.productId === params.row.productId) {
                      if (Number(product.quantity) < 0 || product.quantity === '') {
                        return {
                          ...product,
                          quantity: 0,
                        }
                      }

                      if (Number(product.quantity) > remainQuantity) {
                        return {
                          ...product,
                          quantity: remainQuantity,
                        }
                      }
                    }
                  }
                  return product
                })],
              }
            }
            return { // khác cơ số
              ...program,
              products: [...program.products.map(product => {
                if (product.groupOneFreeItem === params.row.groupOneFreeItem) {
                  if (product.productId !== params.row.productId || product.quantity === '') {
                    return {
                      ...product,
                      quantity: 0,
                    }
                  }
                  if (product.productId === params.row.productId && product.quantity === 0) {
                    return {
                      ...product,
                      quantity: 0,
                    }
                  }
                  return {
                    ...product,
                    quantity: params.row.quantityMax,
                  }
                }
                return product
              })],
            }
          }
          // CTKM auto (All free Item) && CTKM handle
          return {
            ...program,
            products: [...program.products.map(product => {
              if (product.groupOneFreeItem === params.row.groupOneFreeItem) {
                if (product.quantity === 0 || product.quantity === '') {
                  return {
                    ...product,
                    quantity: 0,
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
          ...this.decentralization,
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
          ...this.decentralization,
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
    onChangeCheckProgramPromotion(programId) {
      const paramPromotionAmountInfos = this.promotionPrograms.filter(p => (p.amount !== null || p.programType === saleData.programPromotionType[2].label) && p.isUse)
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
        discountCode: this.pay.discount.discountCode,
      }

      this.GET_PROMOTION_CALCULATION_ACTION(paramGetPromotionCalculationData)

      // xử lý phần mã giảm giá
      const programSelected = this.promotionPrograms.find(p => p.programId === programId)
      if (programSelected.products.length === 0 && programSelected.amount !== null) {
        this.resetDiscount()
        this.isDisabledDiscount = false
        toasts.error('Vui lòng nhập lại Mã giảm giá vì có sự thay đổi tiền khuyến mãi')
      }
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
      const paramPromotionInfo = this.promotionPrograms.filter(p => p.isUse)
      paramPromotionInfo.forEach(program => {
        if (program.products.length > 0) {
          program.products.forEach(product => {
            if (program.isEditable) {
              if (product.quantity > product.stockQuantity) {
                isValid = false
                toasts.error(`Tồn kho của ${product.productName} của ${program.promotionProgramName} không đủ. Bạn không thể thực hiện Thanh toán.`)
              }
            } else if (product.quantityMax > product.stockQuantity) {
              isValid = false
              toasts.error(`${program.promotionProgramName} số lượng của ${product.productName} không được lớn hơn số lượng tồn kho`)
            }
          })
        }
      })

      if (isValid) {
        this.isPrint = false
        this.CREATE_SALE_ORDER_ACTION({
          orderSale: {
            customerId: this.customer.id,
            paymentType: this.pay.salePayment.salePaymentType,
            deliveryType: Number(this.deliverySelected),
            orderType: Number(this.orderSelected),
            note: this.orderOnline.note,
            orderOnlineId: this.orderOnline.onlineOrderId,
            onlineNumber: this.orderOnline.orderNumber,
            products: this.orderProducts,
            promotionInfo: paramPromotionInfo,
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
            this.isSaveSuccess = true
          },
        })
      }
    },
    createSaleOrderAndPrint() {
      this.createSaleOrder()
      this.isPrint = true
    },
    cancel() {
      this.isOpenPayModal = false
      if (this.isSaveSuccess === true) {
        if (this.bills.length > 1) {
          this.resetPayModal()
          this.$emit('deleteSaveBill', this.bills)
        }
        if (this.bills.length <= 1) {
          if (this.isPaid) {
            this.$router.go(this.$router.currentRoute)
          }
        }
      }
      this.$emit('changeStateOpenPayModal', false)
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
      const paramPromotionInfo = this.promotionPrograms.filter(p => p.isUse)
      paramPromotionInfo.forEach(program => {
        if (program.products.length > 0) {
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
        }
      })

      if (isValid) {
        this.PRINT_SALES_TEMP_ACTION({
          orderSale: {
            customerId: this.customer.id,
            paymentType: this.pay.salePayment.salePaymentType,
            deliveryType: Number(this.deliverySelected),
            orderType: Number(this.orderSelected),
            note: this.orderOnline.note,
            orderOnlineId: this.orderOnline.onlineOrderId,
            onlineNumber: this.orderOnline.orderNumber,
            products: this.orderProducts,
            promotionInfo: paramPromotionInfo,
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
          onSuccess: () => {},
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
            params: { ...this.decentralization },
          },
          onSuccess: () => {
          },
        })
      }
    },
    removeProductPromotionProgramHandle(programId, productId) {
      this.promotionPrograms = this.promotionPrograms.map(program => {
        if (program.programId === programId) {
          return {
            ...program,
            products: [...program.products.filter(p => p.productId !== productId)],
          }
        }
        return program
      })
    },
    keyDown(e) {
      if (e.key === 'F7' && this.isOpenPayModal) {
        if (!this.isPaid && this.statusPrintTmpButton()) {
          this.printSaleOrderTemp()
        }
      }
      if (e.key === 'F8' && this.isOpenPayModal) {
        if (!this.isPaid && this.statusPayPrintButton() && this.pay.extraAmount !== null && Number(this.pay.extraAmount) >= 0 && this.pay.extraAmount !== '') {
          if (this.pay.salePayment.salePaymentType !== undefined) {
            this.createSaleOrderAndPrint()
          }
        }
      }
      if (e.key === 'F9' && this.isOpenPayModal) {
        if (!this.isPaid && this.statusPayButton() && this.pay.extraAmount !== null && Number(this.pay.extraAmount) >= 0 && this.pay.extraAmount !== '') {
          if (this.pay.salePayment.salePaymentType !== undefined) {
            this.createSaleOrder()
          }
        }
      }
      if (e.key === 'F10' && this.isOpenPayModal) {
        if (this.isPaid && this.statusRePrintButton()) {
          this.rePrintSaleOrder()
        }
      }
    },
    resetPayModal() {
      this.pay.accumulate.accumulatePoint = null
      this.pay.accumulate.accumulateAmount = 0

      this.resetVoucher()
      this.resetDiscount()
      this.isPaid = false
    },
  },
}
</script>

<style scoped>
  .scrollspy-promotion-program {
    position:relative;
    height:500px;
    overflow-y:auto
  }

  .collapsed > .when-opened,
  :not(.collapsed) > .when-closed {
      display: none;
  }
  .style-padding {
    padding: 0.438rem 1rem 0.438rem 1rem;
  }
  .spacing {
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
  .style-margin {
    margin-bottom: 0.7rem !important;
  }
  .m-bottom {
    margin-bottom: 0.5rem !important;
  }
  .max-width {
    max-width: max-content;
  }
  .font-weight-600 {
    font-weight: 600 !important;
  }
</style>
