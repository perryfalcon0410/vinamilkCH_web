<template>
  <!-- START Popup -->
  <b-modal
    id="pay-modal"
    ref="payModal"
    size="xl"
    title="Thanh toán hóa đơn"
    title-class="font-weight-bolder text-brand-1"
    header-class="d-print-none"
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
          <!-- START - Promotion Programs-->
          <div
            v-for="(value,index) in promotionPrograms"
            :key="index"
          >
            <!-- START - Table Promotion -->
            <b-col class="p-0">
              <b-row v-if="value.programId === firstItemProgramGroupOne">
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
                    {{ promotionTypeOption[0].label }}
                  </strong>
                </div>
              </b-row>
              <b-row
                v-else-if="value.programId === firstItemProgramGroupTwo"
                class="mt-1"
              >
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
                    {{ promotionTypeOption[1].label }}
                  </strong>
                </div>
              </b-row>
              <b-row
                v-else-if="value.programId === firstItemProgramGroupThree"
                class="mt-1"
              >
                <div
                  class="mx-1 bg-light spacing m-bottom pl-2 pr-2 rounded"
                  align-v="center"
                  align-h="center"
                  @click="openPromotionProgramsGroup()"
                >
                  <b-icon-gift
                    scale="1.2"
                    color="red"
                  />
                  <strong
                    class="ml-1 text-brand-1 h7 mt-1"
                    align-v="center"
                  >
                    {{ promotionTypeOption[2].label }}
                  </strong>
                </div>
              </b-row>
              <!-- START - Title -->
              <b-row
                v-show="value.expand"
                align-v="center"
                class="mx-0 style-padding bg-brand-1"
              >
                <b-check
                  v-model="value.isUse"
                  :disabled="(!value.isEditable || value.promotionType === Number(promotionTypeOption[0].id)) || isPaid"
                  @change="onChangeCheckProgramPromotion(value.programId)"
                />
                <div class="text-white">
                  {{ value.promotionProgramCode }} - {{ value.promotionProgramName }}
                  <span v-show="value.maxShopQty !== null">
                    <b-icon-shield-exclamation
                      v-if="(value.numberLimited !== 0) && (value.receiveShopQty + value.orderInQty <= value.maxShopQty)"
                      v-b-popover.hover="{variant: 'info', content: `<p>Thông tin số suất:</p><p>- Được phân bố: ${$formatNumberToLocale(value.maxShopQty) || 'Không giới hạn'}</p><p>- Đã sử dụng: ${$formatNumberToLocale(value.receiveShopQty) || 0}</p><p>- Còn lại: ${$formatNumberToLocale(value.numberLimited) || 'Không giới hạn'}</p>`, html: true}"
                      class="cursor-pointer ml-1"
                      color="white"
                      font-scale="1.5"
                    />
                    <b-icon-shield-exclamation
                      v-else
                      v-b-popover.hover="{variant: 'danger', content: `<p>Chương trình này không được áp dụng do đã hết số suất khuyến mãi</p><p>Thông tin số suất:</p><p>- Được phân bố: ${$formatNumberToLocale(value.maxShopQty)}</p><p>- Đã sử dụng: ${$formatNumberToLocale(value.receiveShopQty)}</p><p>- Còn lại: ${$formatNumberToLocale(value.numberLimited)}</p>`, html: true}"
                      class="cursor-pointer ml-1 text-danger"
                      font-scale="1.5"
                    />
                  </span>
                </div>
                <div
                  v-b-toggle="'collapse-'+value.programId"
                  class="ml-auto"
                >
                  <b-icon-chevron-down
                    class="when-opened"
                    color="white"
                  />
                  <b-icon-chevron-up
                    color="white"
                    class="when-closed"
                  />
                </div>

              </b-row>
              <!-- END - Title -->

              <!-- START - Body -->
              <b-collapse
                v-show="value.expand"
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
                          <template
                            v-if="value.promotionType === Number(promotionTypeOption[0].id)"
                            #append
                          >
                            <b-input-group-text>{{ $formatNumberToLocale(props.row.quantityMax) }}</b-input-group-text>
                          </template>
                          <b-form-input
                            :id="promotionPrograms[index].products[props.row.originalIndex].productCode+'_'+value.programId"
                            v-model.number="promotionPrograms[index].products[props.row.originalIndex].quantity"
                            :disabled="!value.isEditable || isPaid"
                            maxlength="7"
                            @change="onChangeQuantity(value.programId, props)"
                            @keypress="$onlyNumberInput"
                            @keyup="onKeyUpEnterChangeQuantity(props.row.originalIndex,value.programId, value.products, $event)"
                          />
                        </b-input-group>
                      </div>
                      <div
                        v-else-if="props.column.field === 'tableProductFeature' && value.promotionType === Number(promotionTypeOption[1].id)"
                        class="mx-0"
                      >
                        <b-icon-x
                          v-if="!isPaid"
                          v-b-popover.hover="'Xóa'"
                          scale="2.0"
                          class="cursor-pointer mt-1"
                          color="red"
                          @click="removeProductPromotionProgramHandle(value.programId,props.row.productId)"
                        />
                        <b-icon-x
                          v-else
                          v-b-popover.hover="'Xóa'"
                          scale="2.0"
                          class="cursor-pointer mt-1"
                          color="red"
                        />
                      </div>
                      <div v-else>
                        {{ props.formattedRow[props.column.field] }}
                      </div>
                    </template>
                    <!-- END - Row -->

                    <!-- START - Action bottom -->
                    <div
                      v-show="value.isInsertItemProducts"
                      slot="table-actions-bottom"
                      class="mx-1 my-2 px-2"
                    >
                      <vue-autosuggest
                        ref="searchProductPayModal"
                        v-model="value.productSearch"
                        :suggestions="allProducts"
                        :input-props="{
                          id:'autosuggest__product_' + value.programId,
                          class:'form-control w-50',
                          placeholder:'Nhập mã hoặc tên sản phẩm',
                        }"
                        :disabled="!value.isEditable || isPaid"
                        @input="loadProducts(value.programId, value.productSearch)"
                        @selected="selectProduct(value.programId, $event)"
                      >
                        <template slot-scope="{ suggestion }">
                          <div class="cursor-pointer">
                            {{ suggestions }}
                            <b>{{ suggestion.item.productCode }}</b> - {{ suggestion.item.productName }}
                          </div>
                        </template>
                      </vue-autosuggest>
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
                          :disabled="!value.isEditable || isPaid"
                          @change.native="onChangePromotionAmout(value.programId, value.amount.amount, value.amount.maxAmount)"
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
                      <vue-autosuggest
                        ref="searchProductPayModal"
                        v-model="value.productSearch"
                        :suggestions="allProducts"
                        :input-props="{
                          id:'autosuggest__product_' + value.programId,
                          class:'form-control w-50',
                          placeholder:'Nhập mã hoặc tên sản phẩm'
                        }"
                        :disabled="isPaid"
                        @input="loadProducts(value.programId, value.productSearch)"
                        @selected="selectProduct(value.programId, $event)"
                      >
                        <template slot-scope="{ suggestion }">
                          <div class="cursor-pointer">
                            {{ suggestions }}
                            <b>{{ suggestion.item.productCode }}</b> - {{ suggestion.item.productName }}
                          </div>
                        </template>
                      </vue-autosuggest>
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
                        :disabled="totalQuantity === 0"
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
                      <b-input-group
                        v-if="!isPaid"
                        class="input-group-merge"
                      >
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
                      <b-input-group
                        v-else
                        class="input-group-merge"
                      >
                        <b-input-group-prepend
                          v-b-popover.hover="'Chọn voucher'"
                          is-text
                          class="cursor-pointer text-right"
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
                          :disabled="isDisabledDiscount || totalQuantity === 0"
                          @keyup.enter="searchDiscount"
                        />
                        <b-input-group-append
                          v-if="!isPaid"
                          is-text
                        >
                          <b-icon-x
                            scale="1.0"
                            class="cursor-pointer"
                            @click="resetDiscount"
                          />
                        </b-input-group-append>
                        <b-input-group-append
                          v-else
                          is-text
                        >
                          <b-icon-x
                            scale="1.0"
                            class="cursor-pointer"
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
                        maxlength="15"
                        :disabled="totalQuantity === 0"
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
    <template
      #modal-footer="{}"
    >
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
      @getIsLockedVoucher="getIsLockedVoucher"
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
import { VueAutosuggest } from 'vue-autosuggest'
import {
  number,
} from '@/@core/utils/validations/validations'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  hostName,
  checkIpClient,
  preventDefaultWindowPrint,
} from '@core/utils/filter'
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
import {
  PRINTERCONFIG,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../../auth/printer-configuration-modal/store-module/type'

import VoucherModal from '../voucher-modal/VoucherModal.vue'

export default {
  components: {
    VoucherModal,
    Cleave,
    PrintFormSalesReceipt,
    VueAutosuggest,
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
      isMouseDown: false,
      offset: [0, 0],
      promotionTypeOption: saleData.promotionType,
      columnsAdm: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left text-nowrap align-middle font-weight-700 col-2',
          tdClass: 'text-left col-2',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left text-nowrap align-middle font-weight-700 col-5',
          tdClass: 'text-left col-5',
        },
        {
          label: 'Tồn kho',
          field: 'stockQuantity',
          sortable: false,
          thClass: 'text-center text-nowrap align-middle font-weight-700 col-2',
          tdClass: 'text-center col-2',
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Số lượng tặng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          thClass: 'text-center text-nowrap align-middle font-weight-700 col-3',
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
      allProducts: [{ data: '' }],
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
      isLoading: false,
      ipAddress: '',
      ipAddressCurrent: '',
      isLockedVoucher: false,
      isUseChecked: [],
      productKeyWord: '',
      programIdSelected: null,
      firstItemProgramGroupOne: null,
      firstItemProgramGroupTwo: null,
      firstItemProgramGroupThree: null,
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
          affected: data.affected,
          reCalculated: data.reCalculated,
          productSearch: '',
          maxShopQty: data.maxShopQty, // số xuất phân bổ
          receiveShopQty: data.receiveShopQty, // Đã sử dụng
          // eslint-disable-next-line no-nested-ternary
          orderInQty: data.totalQty !== null ? data.totalQty : data.amount !== null ? data.amount.amount : 0, // số suất trong đơn hàng
          groupPromotion: '',
          expand: true,
        }))
        this.pay.promotionAmount = this.getPromotionPrograms.promotionAmount
        this.pay.promotionAmountExTax = this.getPromotionPrograms.promotionAmountExTax || null
        this.pay.isVoucherLocked = this.getPromotionPrograms.lockVoucher
      }
      this.sortPromotionProgram()
      // get accumulate
      this.pay.accumulate.accumulateAmount = 0
      this.pay.accumulate.accumulatePoint = this.customer.scoreCumulated || null

      this.isDisabledPrintTempBtn = false
      this.isDisabledPaymentBtn = false
      this.isDisabledPrintAndPaymentBtn = false
      this.isDisabledRePrintBtn = true
      this.isLoading = false

      document.getElementById('pay-modal___BV_modal_header_').addEventListener('mousemove', this.mouseMove)
      document.getElementById('pay-modal___BV_modal_header_').addEventListener('mousedown', this.mouseDown)
      document.getElementById('pay-modal___BV_modal_header_').addEventListener('mouseup', this.mouseUp)
    },
    getItemsProduct() {
      // để show lên vue-autosuggest thì phải để [{data: value}]
      const getItemProductProgram = [...this.getItemsProduct.map(data => ({
        groupOneFreeItem: data.groupOneFreeItem,
        levelNumber: data.levelNumber,
        productCode: data.productCode,
        productId: data.productId,
        productName: data.productName,
        quantity: null,
        quantityMax: data.quantityMax,
        stockQuantity: data.stockQuantity,
        name: this.productKeyWord,
      }))]
      this.allProducts = [{
        data: getItemProductProgram,
      }]
      if (this.allProducts[0].data && this.allProducts[0].data.length === 1) {
        const elementAutosuggestProductId = `autosuggest__product_${this.programIdSelected}`
        this.$nextTick(() => {
          setTimeout(() => {
            document.getElementById(elementAutosuggestProductId).dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 }))
          }, 100)
        })
      }
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
      // get promotion amount from API
      this.pay.promotionAmount = this.getPromotionCalculation.promotionAmount
      this.pay.promotionAmountExTax = this.getPromotionCalculation.promotionAmountExTax || null
      this.pay.needPaymentAmount = this.getPromotionCalculation.paymentAmount
      this.extraAmountCalculation()
      if (this.getPromotionCalculation.lstSalePromotions) {
        const promotionAfterReCalculate = this.getPromotionCalculation.lstSalePromotions
        const promotionPrgramsReCalculated = [...this.promotionPrograms.map(program => {
          // Update promotion program
          // Khi API tính KM trả data về thì những CTKM có affected = true
          // có nằm trong list trả về thì update.
          // không có sẽ remove nó đi.
          if (program.affected) {
            const programInPromotionCalculation = promotionAfterReCalculate.find(p => p.programId === program.programId)
            if (programInPromotionCalculation !== undefined) {
              programInPromotionCalculation.products = programInPromotionCalculation.products || [] // Phải để products là mảng rỗng không thôi vẽ layout lại sẽ lỗi
              return {
                ...programInPromotionCalculation,
                productSearch: '',
                // eslint-disable-next-line no-nested-ternary
                orderInQty: programInPromotionCalculation.totalQty !== null ? programInPromotionCalculation.totalQty : programInPromotionCalculation.amount !== null ? programInPromotionCalculation.amount.amount : 0,
                isUse: true,
              }
            }
            return null
          }
          return program
        })]
        this.promotionPrograms = [...promotionPrgramsReCalculated.filter(i => i !== null)]
      }
      this.sortPromotionProgram()
    },
    getPrintSaleData() {
      this.printSaleData = { ...this.getPrintSaleData }
    },
    getCreateSale() {
      if (this.getCreateSale.orderId) {
        toasts.success('Lưu đơn hàng thành công')
        this.pay.saleOrderId = this.getCreateSale.orderId
        if (this.isPrint) {
          hostName().then(res => {
            if (res) {
              this.ipAddressCurrent = res.ip || res.query || res.geoplugin_request
            } else {
              this.ipAddressCurrent = null
            }
            if (checkIpClient(this.ipAddress, this.ipAddressCurrent)) {
              this.GET_PRINTER_CLIENT_ACTIONS({
                data: {
                  clientId: this.ipAddressCurrent,
                },
                onSuccess: () => {
                  this.PRINT_SALES_RECEIPT_ACTION({
                    data: {
                      salesReceiptId: this.pay.saleOrderId,
                      params: { ...this.decentralization },
                    },
                    onSuccess: () => {},
                  })
                },
              })
            }
          })
        }
      }
    },

    getSalePaymentTypes() {
      this.salePaymentTypeOptions = [...this.getSalePaymentTypes.map(data => ({
        id: data.value,
        label: data.apParamName,
      }))]
      this.pay.salePayment.salePaymentType = this.salePaymentTypeOptions[0].id
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

    // orderOnline: {
    //   handler() {
    //     if (this.orderOnline.onlineOrderId !== null) {
    //       this.pay.discount.discountCode = this.orderOnline.discountCode
    //       this.pay.discount.discountAmount = this.orderOnline.discountValue
    //     }
    //   },
    //   deep: true,
    // },
    isOpenPayModal: {
      handler() {
        if (this.isOpenPayModal) {
          const paramProducts = this.orderProducts.map(data => ({
            productId: data.productId,
            productCode: data.productCode,
            quantity: data.quantity,
          }))
          this.GET_PROMOTION_PROGRAMS_ACTION({
            data: {
              customerId: this.customer.id,
              orderType: Number(this.orderSelected),
              products: paramProducts,
              invisibleLoading: false,
            },
            onSuccess: () => {},
            onFailure: () => {
              this.cancel()
            },
          })
          if (this.pay.discount.discountCode !== '') {
            this.pay.discount.discountCode = ''
            this.pay.discount.discountAmount = 0
          }
          this.isDisabledPrintTempBtn = true
          this.isDisabledPaymentBtn = true
          this.isDisabledPaymentBtn = true
          this.isDisabledRePrintBtn = true
          // clean data
          this.pay.extraAmount = null
          this.resetVoucher()
          this.resetDiscount()
          // get accumulate
          this.pay.accumulate.accumulateAmount = 0
          this.pay.accumulate.accumulatePoint = this.customer.scoreCumulated || null
          this.isLoading = true
          this.extraAmountCalculation()

          this.GET_SALE_PAYMENT_TYPES_ACTION({
            ...this.decentralization,
          })
        }
      },
      deep: true,
    },
    promotionPrograms: {
      handler() {
        this.isUseChecked = this.promotionPrograms.filter(p => p.isUse)
        if (this.totalQuantity === 0) {
          if (this.isUseChecked.length === 0) {
            this.isDisabledPrintTempBtn = true
            this.isDisabledPrintAndPaymentBtn = true
            this.isDisabledPaymentBtn = true
          } else {
            this.isDisabledPrintAndPaymentBtn = false
            this.isDisabledPrintTempBtn = false
            this.isDisabledPaymentBtn = false
          }
        }
      },
      deep: true,
    },
  },

  // created() {
  //   window.onload = () => {
  //     window.addEventListener('keydown', this.keyDown)
  //   }
  // },

  mounted() {
    this.isDisabledPaymentBtn = true
    this.isDisabledPrintAndPaymentBtn = true
    this.isDisabledRePrintBtn = true
    hostName().then(res => {
      if (res) {
        this.ipAddress = res.ip || res.query || res.geoplugin_request
      } else {
        this.ipAddress = null
      }
    })
    window.addEventListener('keydown', this.keyDown)
  },

  // destroyed() {
  //   window.removeEventListener('keydown', this.keyDown, false)
  // },

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
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),

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

    mouseDown(e) {
      this.isMouseDown = true
      const el = document.getElementById('pay-modal___BV_modal_content_')
      this.offset = [
        el.offsetLeft - e.clientX,
        el.offsetTop - e.clientY,
      ]
    },

    mouseUp() {
      this.isMouseDown = false
    },

    mouseMove(e) {
      const el = document.getElementById('pay-modal___BV_modal_content_')
      if (this.isMouseDown) {
        const mousePosition = {
          x: e.clientX,
          y: e.clientY,
        }
        el.style.left = `${mousePosition.x + this.offset[0]}px`
        el.style.top = `${mousePosition.y + this.offset[1]}px`
      }
    },

    onVoucherButtonClick(isLocked) {
      if (isLocked || this.isLockedVoucher === true) {
        toasts.error('Bạn đã nhập sai quá số lần quy định và bị khóa chức năng trong ngày. Vui lòng liên hệ với bộ phận hỗ trợ để được tư vấn.')
      } else if (!isLocked && this.isPaid) {
        toasts.error('Bạn đã thanh toán hoá đơn này, nên sẽ không sử dụng được chức năng này nữa.')
      } else if (this.totalQuantity === null || this.totalQuantity === 0) {
        this.$bvModal.hide('VoucherModal')
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
            isUse: true,
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
      this.sortPromotionProgram()
    },

    loadProducts(programId, keyWord) {
      this.allProducts = [{ data: null }]
      this.productKeyWord = keyWord
      if (keyWord !== null && !this.isPaid) {
        if (keyWord.length >= commonData.minSearchLength) {
          this.programIdSelected = programId
          this.GET_ITEMS_PRODUCTS_PROGRAM_ACTION({
            keyWord,
            promotionId: programId,
            customerId: this.customer.id,
            ...this.decentralization,
          })
        }
      }
    },
    selectProduct(programId, suggestion) {
      this.pay.productSearch = ''
      this.allProducts = [{ data: null }]
      let productCodeFocus = ''
      this.promotionPrograms = [...this.promotionPrograms.map(program => {
        if (program.programId === programId) {
          const existedProductIndex = program.products.findIndex(p => p.productCode === suggestion.item.productCode)
          if (existedProductIndex === -1 || program.products.length === 0) {
            const arrProduct = program.products
            arrProduct.push({
              groupOneFreeItem: suggestion.item.groupOneFreeItem,
              levelNumber: suggestion.item.levelNumber,
              productCode: suggestion.item.productCode,
              productId: suggestion.item.productId,
              productName: suggestion.item.productName,
              quantity: suggestion.item.quantity,
              quantityMax: program.numberLimited ? program.numberLimited : suggestion.item.stockQuantity,
              stockQuantity: suggestion.item.stockQuantity,
            })
            return {
              ...program,
              products: [...program.products.map(product => {
                if (product.productCode === suggestion.item.productCode) {
                  return {
                    ...product,
                    quantity: Number(product.quantity) + 1,
                  }
                }
                return product
              })],
            }
          }
        }
        return program
      })]
      productCodeFocus = `${suggestion.item.productCode}_${programId}`
      setTimeout(() => {
        document.getElementById(productCodeFocus).focus()
      }, 200)
    },
    onChangeCheckProgramPromotion(programId) {
      const programChecked = this.promotionPrograms.find(program => program.programId === programId)
      if (programChecked.amount !== null && programChecked.promotionType === Number(this.promotionTypeOption[1].id)) {
        if (Number(programChecked.amount.amount) > Number(programChecked.amount.maxAmount) && programChecked.amount.maxAmount > 0) {
          toasts.error('Số tiền không được vượt quá số tiền tối đa')
          this.promotionPrograms = [...this.promotionPrograms.map(program => {
            if (program.programId === programId) {
              return {
                ...program,
                isUse: false,
              }
            }
            return program
          })]
          this.sortPromotionProgram()
        } else {
          const paramPromotionAmountInfos = this.promotionPrograms.filter(p => p.reCalculated && p.isUse)
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
            if (this.pay.discount.discountCode !== '' && this.pay.discount.discountCode !== null) {
              this.resetDiscount()
              this.isDisabledDiscount = false
              toasts.error('Vui lòng nhập lại Mã giảm giá vì có sự thay đổi tiền khuyến mãi')
            }
          }
        }
      }
    },
    onChangePromotionAmout(programId, amount, maxAmount) {
      if (amount > maxAmount) {
        toasts.error('Số tiền không được vượt quá số tiền tối đa')
        this.promotionPrograms = [...this.promotionPrograms.map(program => {
          if (program.programId === programId) {
            return {
              ...program,
              isUse: false,
            }
          }
          return program
        })]
        this.sortPromotionProgram()
      } else {
        this.promotionPrograms = [...this.promotionPrograms.map(program => {
          if (program.programId === programId) {
            return {
              ...program,
              isUse: true,
            }
          }
          return program
        })]
        this.onChangeCheckProgramPromotion(programId)
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
      if ((Number(this.pay.extraAmount) < 0 || this.pay.extraAmount === null)) {
        this.isDisabledPrintTempBtn = true
        this.isDisabledPaymentBtn = true
        this.isDisabledPrintAndPaymentBtn = true
      } else if (this.isLoading) {
        this.isDisabledPrintTempBtn = true
        this.isDisabledPaymentBtn = true
        this.isDisabledPrintAndPaymentBtn = true
      } else {
        this.isDisabledPrintTempBtn = false
        this.isDisabledPaymentBtn = false
        this.isDisabledPrintAndPaymentBtn = false
      }
      if (this.isPaid) {
        this.isDisabledPrintTempBtn = this.isPaid
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
        this.isDisabledRePrintBtn = false
        this.isDisabledPrintAndPaymentBtn = true
        this.isDisabledPrintTempBtn = true
        this.isDisabledPaymentBtn = true
        this.isPaid = true
        this.isSaveSuccess = true
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
            this.isLoading = false
          },
          onFailure: () => {
            this.isDisabledRePrintBtn = true
            this.isDisabledPrintAndPaymentBtn = false
            this.isDisabledPrintTempBtn = false
            this.isDisabledPaymentBtn = false
            this.isPaid = false
            this.isSaveSuccess = false
          },
        })
      }
    },
    createSaleOrderAndPrint() {
      this.createSaleOrder()
      this.isPrint = this.isPaid
      this.isLoading = false
    },
    cancel() {
      this.isOpenPayModal = false
      if (this.isSaveSuccess) {
        if (this.isPaid) {
          if (this.bills.length > 1) {
            this.resetPayModal()
            this.$emit('deleteSaveBill')
          } else {
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

      if (Number(this.pay.accumulate.accumulateAmount) > this.customer.scoreCumulated) {
        this.pay.accumulate.accumulateAmount = this.customer.scoreCumulated
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
        hostName().then(res => {
          if (res) {
            this.ipAddressCurrent = res.ip || res.query || res.geoplugin_request
          } else {
            this.ipAddressCurrent = null
          }
          if (checkIpClient(this.ipAddress, this.ipAddressCurrent)) {
            this.GET_PRINTER_CLIENT_ACTIONS({
              data: {
                clientId: this.ipAddressCurrent,
              },
              onSuccess: () => {
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
              },
            })
          }
        })
      }
    },
    rePrintSaleOrder() {
      hostName().then(res => {
        if (res) {
          this.ipAddressCurrent = res.ip || res.query || res.geoplugin_request
        } else {
          this.ipAddressCurrent = null
        }
        if (checkIpClient(this.ipAddress, this.ipAddressCurrent)) {
          this.GET_PRINTER_CLIENT_ACTIONS({
            data: {
              clientId: this.ipAddressCurrent,
            },
            onSuccess: () => {
              this.PRINT_SALES_RECEIPT_ACTION({
                data: {
                  salesReceiptId: this.pay.saleOrderId,
                  params: { ...this.decentralization },
                },
                onSuccess: () => {},
              })
            },
          })
        }
      })
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
      if (e.key === 'F7' && this.isOpenPayModal && this.totalQuantity > 0 && !this.isLoading) {
        if (!this.isPaid && this.statusPrintTmpButton() && this.pay.extraAmount !== null && Number(this.pay.extraAmount) >= 0 && this.pay.extraAmount !== '') {
          this.printSaleOrderTemp()
        }
      }
      if (e.key === 'F8' && this.isOpenPayModal && this.totalQuantity > 0 && !this.isLoading) {
        if (!this.isPaid && this.statusPayPrintButton() && this.pay.extraAmount !== null && Number(this.pay.extraAmount) >= 0 && this.pay.extraAmount !== '') {
          if (this.pay.salePayment.salePaymentType !== undefined) {
            this.isLoading = true
            this.createSaleOrderAndPrint()
          }
        }
      }
      if (e.key === 'F9' && this.isOpenPayModal && this.totalQuantity > 0 && !this.isLoading) {
        if (!this.isPaid && this.statusPayButton() && this.pay.extraAmount !== null && Number(this.pay.extraAmount) >= 0 && this.pay.extraAmount !== '') {
          if (this.pay.salePayment.salePaymentType !== undefined) {
            this.isLoading = true
            this.createSaleOrder()
          }
        }
      }
      if (e.key === 'F10' && this.isOpenPayModal) {
        if (this.isPaid && this.statusRePrintButton()) {
          this.rePrintSaleOrder()
        }
      }
      const resolve = preventDefaultWindowPrint(e)
      if (resolve && this.isPaid === false && this.statusPrintTmpButton()) {
        this.printSaleOrderTemp()
      }
      if (resolve && this.isPaid === true && this.statusRePrintButton()) {
        this.rePrintSaleOrder()
      }
    },
    resetPayModal() {
      this.pay.accumulate.accumulatePoint = null
      this.pay.accumulate.accumulateAmount = 0

      this.resetVoucher()
      this.resetDiscount()
      this.isPaid = false
      this.pay.saleOrderId = null
      this.isPrint = false
      this.isSaveSuccess = false
      this.isDisabledDiscount = false
      // Enable/disable buttons
      this.isDisabledPrintTempBtn = false
      this.isDisabledRePrintBtn = true
      this.isDisabledPaymentBtn = true
      this.isDisabledPrintAndPaymentBtn = true
    },
    getIsLockedVoucher(val) {
      this.isLockedVoucher = val
    },
    onKeyUpEnterChangeQuantity(index, programId, products, e) {
      let elementIdProductNext = `${products[index].productCode}_${programId}`
      if (index < products.length - 1) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
          elementIdProductNext = `${products[index + 1].productCode}_${programId}`
        } else if (e.key === 'ArrowUp' && index !== 0) {
          elementIdProductNext = `${products[index - 1].productCode}_${programId}`
        }
        document.getElementById(elementIdProductNext).focus()
      } else if (index === products.length - 1) {
        if (e.key === 'Enter') {
          elementIdProductNext = `autosuggest__product_${programId}`
        } else if (e.key === 'ArrowUp') {
          elementIdProductNext = `${products[index - 1].productCode}_${programId}`
        }
        document.getElementById(elementIdProductNext).focus()
      }
    },
    sortPromotionProgram() {
      this.firstItemProgramGroupOne = null
      this.firstItemProgramGroupTwo = null
      this.firstItemProgramGroupThree = null
      this.promotionPrograms = [...this.promotionPrograms.map(program => {
        // Nếu là CTKM auto thì gán là nhóm 1
        // Còn nếu là CTKM bằng tay thì
        //  . isUse = true thì là khuyến mãi nhóm 2
        //  . isUser = false thì là khuyến mãi nhóm 3
        if (program.promotionType === Number(this.promotionTypeOption[0].id)) {
          if (this.firstItemProgramGroupOne === null) {
            this.firstItemProgramGroupOne = program.programId
          }
          return {
            ...program,
            groupPromotion: this.promotionTypeOption[0].id,
          }
        }
        if (program.isUse) {
          if (this.firstItemProgramGroupTwo === null) {
            this.firstItemProgramGroupTwo = program.programId
          }
          return {
            ...program,
            groupPromotion: this.promotionTypeOption[1].id,
          }
        }
        if (this.firstItemProgramGroupThree === null) {
          this.firstItemProgramGroupThree = program.programId
        }
        return {
          ...program,
          groupPromotion: this.promotionTypeOption[2].id,
          expand: false,
        }
      })]
      this.promotionPrograms = this.promotionPrograms.sort((a, b) => a.groupPromotion - b.groupPromotion)
    },
    openPromotionProgramsGroup() {
      this.promotionPrograms = [...this.promotionPrograms.map(program => {
        if (program.groupPromotion === this.promotionTypeOption[2].id) {
          return {
            ...program,
            expand: !program.expand,
          }
        }
        return program
      })]
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
  .font-weight-700 {
    font-weight: 700 !important;
  }
</style>
