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
                            :disabled="!value.isUse"
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
                  <div v-if="value.amount.percentage > 0">
                    <b-row
                      class="mx-0 p-1"
                      align-v="center"
                    >
                      <div>Giảm giá</div>

                      <b-col cols="3">
                        <b-input-group
                          v-model="value.amount.percentage"
                        >
                          <b-form-input
                            v-if="value.amount"
                            v-model="value.amount.amount"
                            disabled
                          />
                        </b-input-group>
                      </b-col>
                    </b-row>
                  </div>
                  <div v-else>
                    <b-row
                      class="mx-0 p-1"
                      align-v="center"
                    >
                      <div>Số tiền</div>

                      <b-col cols="3">
                        <b-form-input
                          v-if="value.amount"
                          v-model="value.amount.amount"
                          :disabled="value.promotionType === Number(promotionTypeOption[0].id) && !value.isUse"
                          @change="onChangePromotionAmout(value.amount.amount, value.amount.maxAmount)"
                        />
                      </b-col>
                    </b-row>
                    <div class="ml-1">
                      Tối đa: {{ value.amount.maxAmount }}
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
                          @change="onChangeVoucherCode"
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
                      <b-form-input
                        v-model="pay.salePayment.salePaymentAmount"
                        @keyup="extraAmountCalculation"
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
                <b-col cols="4">
                  <strong>Tiền thừa trả khách</strong>
                </b-col>

                <b-col>
                  <b-form-input
                    v-model="pay.extraAmount"
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
          variant="none"
          class="d-flex align-items-center text-uppercase btn-brand-1"
          @click="onClickPromotionCalculation()"
        >
          Tính khuyến mãi
        </b-button>
        <b-button
          variant="none"
          class="d-flex align-items-center ml-1 text-uppercase btn-brand-1"
          @click="ok()"
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
          @click="ok()"
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
          :disabled="pay.totalQuantity === 0"
          @click="createSaleOrder"
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
          @click="ok()"
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

    <voucher-modal @getVoucherInfo="getVoucherInfo" />
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
import saleData from '@/@db/sale'

import {
  SALES,
  // GETTERS
  VOUCHER_BY_ID_GETTER,
  GET_PRODUCTS_GETTER,
  GET_DISCOUNT_BY_CODE_GETTER,
  GET_PROMOTION_FREE_ITEMS_GETTER,
  GET_PROMOTION_PROGRAMS_GETTER,
  GET_PROMOTION_CALCULATION_GETTER,
  GET_ITEMS_PRODUCTS_PROGRAM_GETTER,
  GET_VOUCHER_BY_SERIAL_GETTER,

  // ACTIONS
  GET_VOUCHER_BY_ID_ACTION,
  GET_PRODUCTS_ACTION,
  CREATE_SALE_ORDER_ACTION,
  GET_DISCOUNT_BY_CODE_ACTION,
  GET_PROMOTION_FREE_ITEMS_ACTION,
  GET_PROMOTION_PROGRAMS_ACTION,
  GET_PROMOTION_CALCULATION_ACTION,
  GET_ITEMS_PRODUCTS_PROGRAM_ACTION,
  GET_VOUCHER_BY_SERIAL_ACTION,
} from '../../store-module/type'
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
    orderOnline: {
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
          thClass: 'text-left col-2',
          tdClass: 'text-left col-2',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left col-6',
          tdClass: 'text-left col-6',
        },
        {
          label: 'Tồn kho',
          field: 'stockQuantity',
          sortable: false,
          thClass: 'text-center col-2',
          tdClass: 'text-center col-2',
        },
        {
          label: 'Số lượng tặng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          thClass: 'text-center col-2',
          tdClass: 'text-center col-2',
        },
      ],

      promotionPrograms: [],
      test: [],
      cursor: -1,
      cursorProduct: -1,
      salePaymentTypeOptions: saleData.salePaymentType,
      pay: {
        totalQuantity: 0,
        totalAmount: null,
        promotionAmount: 0,
        accumulate: {
          accumulatePoint: null,
          accumulateAmount: 0,
        },
        voucher: {
          voucherId: null,
          voucherCode: '',
          voucherAmount: 0,
        },
        discount: {
          discountCode: '',
          discountAmount: 0,
        },
        needPaymentAmount: 0,
        salePayment: {
          salePaymentType: saleData.salePaymentType[0].id,
          salePaymentAmount: 0,
        },
        extraAmount: null,
      },
      inputSearchFocusedSP: false,
      allProducts: [],
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
      GET_PROMOTION_PROGRAMS_GETTER,
      GET_PROMOTION_CALCULATION_GETTER,
      GET_ITEMS_PRODUCTS_PROGRAM_GETTER,
      GET_VOUCHER_BY_SERIAL_GETTER,
    ]),

    getVoucher() {
      return this.VOUCHER_BY_ID_GETTER
    },

    getDiscount() {
      return this.GET_DISCOUNT_BY_CODE_GETTER
    },

    totalQuantity() {
      return this.orderProducts.reduce((sum, item) => sum + Number(item.quantity), 0)
    },

    totalOrderPrice() {
      return this.orderProducts.reduce((sum, item) => sum + Number(item.productTotalPrice), 0)
    },

    needPayment() {
      return this.pay.totalAmount - this.pay.accumulate.accumulateAmount - this.pay.voucher.voucherAmount - this.pay.discount.discountAmount
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
    getPromotionPrograms() {
      return this.GET_PROMOTION_PROGRAMS_GETTER
    },
    getItemsProduct() {
      return this.GET_ITEMS_PRODUCTS_PROGRAM_GETTER
    },
    getPromotionCalculation() {
      return this.GET_PROMOTION_CALCULATION_GETTER
    },
    getVoucherBySerial() {
      return this.GET_VOUCHER_BY_SERIAL_GETTER
    },
  },
  watch: {
    getVoucher() {
      this.pay.voucher.voucherCode = this.getVoucher.voucherCode
      this.pay.voucher.voucherAmount = this.getVoucher.price
      this.pay.voucher.voucherId = this.getVoucher.id
    },
    getDiscount() {
      this.pay.discount.discountCode = this.getDiscount.discountCode
      this.pay.discount.discountAmount = this.getDiscount.discountAmount
    },
    totalOrderPrice() {
      this.pay.totalAmount = this.totalOrderPrice
    },
    totalQuantity() {
      this.pay.totalQuantity = this.totalQuantity
    },
    getPromotionPrograms() {
      this.promotionPrograms = this.getPromotionPrograms.map(data => ({
        promotionType: data.promotionType,
        isUse: data.isUse,
        programId: data.programId,
        promotionProgramName: data.promotionProgramName,
        contraintType: data.contraintType,
        products: data.products || [],
        amount: data.amount,
        isEditable: data.isEditable,
        isSelected: data.promotionType === Number(this.promotionTypeOption[0].id),
        isInsertItemProducts: (data.products === null && data.amount === null),
      }))
    },
    getItemsProduct() {
      this.allProducts = [...this.getItemsProduct]
    },
    needPayment() {
      this.pay.needPaymentAmount = this.needPayment
    },
    getPromotionCalculation() {
      this.pay.promotionAmount = this.getPromotionCalculation.promotionAmount
      this.pay.needPaymentAmount = this.getPromotionCalculation.paymentAmount
    },
    getVoucherBySerial() {
      this.pay.voucher.voucherCode = this.getVoucherBySerial.serial
      this.pay.voucher.voucherAmount = this.getVoucherBySerial.price
      this.pay.voucher.voucherId = this.getVoucherBySerial.id
    },
  },

  created() {
    window.addEventListener('keydown', e => {
      if (e.key === 'F8') {
        const paramProducts = this.orderProducts.map(data => ({
          productId: data.productId,
          productCode: data.productCode,
          quantity: data.quantity,
        }))
        this.GET_PROMOTION_PROGRAMS_ACTION({
          customerId: this.customer.id,
          orderType: Number(saleData.orderType[0].id),
          products: paramProducts,
        })
        this.$root.$emit('bv::toggle::modal', 'pay-modal')
      }
    })
  },
  mounted() {
    window.addEventListener('keydown', e => {
      if (e.key === 'F9') {
        this.createSaleOrder()
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
      GET_PROMOTION_PROGRAMS_ACTION,
      GET_PROMOTION_CALCULATION_ACTION,
      GET_ITEMS_PRODUCTS_PROGRAM_ACTION,
      GET_VOUCHER_BY_SERIAL_ACTION,
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
      this.pay.voucher.voucherId = null
    },

    resetDiscount() {
      this.pay.discount.discountCode = ''
      this.pay.discount.discountAmount = null
    },

    resetOrderPayment() {
      this.pay.totalQuantity = 0
      this.pay.totalAmount = null
      this.pay.promotionAmount = 0
      this.pay.accumulate.accumulatePoint = null
      this.pay.accumulate.accumulateAmount = 0
      this.pay.needPaymentAmount = 0
      this.pay.salePayment.salePaymentAmount = 0
      this.pay.extraAmount = null
      this.resetVoucher()
      this.resetDiscount()
    },

    totalPrice(amount, price) {
      return amount * (price || 0)
    },
    onChangeQuantity(id, params) {
      this.promotionPrograms = [...this.promotionPrograms.map(program => {
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
    onClickPromotionCalculation() {
      const paramPromotionAmountInfos = this.promotionPrograms.filter(p => p.amount && p.isSelected === true)

      this.GET_PROMOTION_CALCULATION_ACTION({
        customerId: this.customer.id,
        orderType: Number(this.orderSelected),
        totalAmount: this.pay.totalAmount,
        saveAmount: this.pay.accumulate.accumulateAmount,
        voucherAmount: this.pay.voucher.voucherAmount,
        saleOffAmount: this.pay.discount.discountAmount,
        promotionInfo: paramPromotionAmountInfos,
      })
    },
    onChangePromotionAmout(amount, maxAmout) {
      if (amount > maxAmout) {
        toasts.error('Số tiền không được vượt quá số tiền tối đa')
      }
    },
    extraAmountCalculation() {
      this.pay.extraAmount = Number(this.pay.salePayment.salePaymentAmount) - Number(this.pay.needPaymentAmount)
    },
    createSaleOrder() {
      this.promotionPrograms.forEach(program => {
        if (program.contraintType === Number(saleData.constraintType[1].id)) {
          let maxQuantity = 0
          let totalQuantity = 0
          program.products.forEach(product => {
            maxQuantity = product.quantityMax
            totalQuantity += product.quantity
          })
          if (totalQuantity > maxQuantity) {
            toasts.error(`${program.promotionProgramName}tổng sản phẩm không được lớn hơn ${maxQuantity}`)
          }
        }

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
            promotionInfo: this.promotionPrograms,
            totalOrderAmount: this.pay.totalAmount,
            promotionAmount: this.pay.promotionAmount,
            accumulatedAmount: this.pay.accumulate.accumulateAmount,
            discountAmount: this.pay.discount.discountAmount,
            discountCode: this.pay.discount.discountCode,
            voucherAmount: this.pay.voucher.voucherAmount,
            voucherId: this.pay.voucher.voucherId,
            remainAmount: this.pay.needPaymentAmount,
            paymentAmount: this.pay.salePayment.salePaymentAmount,
            extraAmount: this.pay.extraAmount,
          },
          onSuccess: () => {
            this.$root.$emit('bv::hide::modal', 'pay-modal')
            this.resetOrderPayment()
          },
        })
      })
    },
    onChangeVoucherCode() {
      const productIds = this.orderProducts.map(item => item.productId)
      const paramsGetVoucherBySerial = {
        serial: this.pay.voucher.voucherCode,
        customerId: this.customer.id,
        productIds: productIds.toString(),
        ctrlId: this.ctrlId,
        formId: this.formId,
      }

      this.GET_VOUCHER_BY_SERIAL_ACTION(paramsGetVoucherBySerial)
    },
  },
}
</script>
