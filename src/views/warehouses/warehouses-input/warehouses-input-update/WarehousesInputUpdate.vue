<template>
  <b-container
    fluid
    class="px-1"
  >
    <!-- START - Form and list -->
    <validation-observer
      ref="formContainer"
      v-slot="{invalid}"
    >
      <b-row>
        <!-- START - Form -->
        <b-col
          xl="4"
          class="bg-white shadow rounded h7"
        >
          <!-- START - Date -->
          <b-row class="my-1">
            <b-col cols="4">
              Ngày nhập:
            </b-col>
            <b-col class="font-weight-bold">
              {{ transDateTime }}
            </b-col>
          </b-row>
          <!-- END - Date -->

          <!-- START - ID and Type -->
          <b-form-row>
            <b-col>
              <div>
                Mã nhập hàng
              </div>
              <b-form-input
                id="transCode"
                v-model="transCode"
                maxlength="40"
                disabled
              />
            </b-col>

            <b-col>
              <div>
                Loại nhập
              </div>
              <b-form-input
                id="import-type"
                v-model="importTypeName"
                class="h7"
                disabled
              />
            </b-col>
          </b-form-row>
          <!-- END - ID and Type -->

          <!-- START -  Stock  -->
          <div class="mt-1">
            Kho hàng
          </div>
          <b-form-input
            id="warehouse"
            v-model="wareHouseTypeName"
            class="h7"
            disabled
          />
          <!-- END -  Stock  -->

          <!-- START - Bill Number and Date -->
          <b-form-row>
            <b-col>
              <validation-provider
                v-slot="{ errors, passed, touched }"
                rules="required"
                name="Số hóa đơn"
              >
                <div class="mt-1 h7">
                  Số hóa đơn <sup class="text-danger">*</sup>
                </div>
                <b-form-input
                  ref="focusInputBillNumber"
                  v-model="billNumber"
                  :state="touched ? passed : null"
                  :disabled="importType !== inputType"
                  class="h7 text-uppercase"
                  maxlength="50"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>

            <b-col>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Ngày hóa đơn"
              >
                <div class="mt-1 h7">
                  Ngày hóa đơn <sup class="text-danger">*</sup>
                </div>
                <b-input-group
                  id="form-input-bill-date"
                  class="input-group-merge"
                >
                  <vue-flat-pickr
                    v-model="billDate"
                    :config="configDate"
                    class="form-control h7"
                    placeholder="Chọn ngày"
                    :disabled="!canEdit"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-form-row>
          <!-- END -   Bill Number and Date -->

          <!-- START -   Internal number and PO no -->
          <b-form-row>
            <b-col>
              <validation-provider
                v-slot="{ errors, passed, touched }"
                :rules="importType === borrowType ? null : 'required'"
                name="Số nội bộ"
              >
                <div class="mt-1 h7">
                  Số nội bộ <sup class="text-danger">*</sup>
                </div>
                <b-form-input
                  v-model="internalNumber"
                  :state="touched ? passed : null"
                  :disabled="!canEdit"
                  class="h7"
                  maxlength="50"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>

            <b-col>
              <validation-provider
                v-slot="{ errors, passed, touched }"
                :rules="importType === inputType ? 'required' : null"
                name="PO No"
              >
                <div class="mt-1 h7">
                  PO No
                  <sup
                    v-show="importType === inputType"
                    class="text-danger"
                  >*</sup>
                </div>
                <b-input-group
                  id="PoNo"
                  class="input-group-merge"
                >
                  <b-form-input
                    v-model="poNumber"
                    :state="importType === inputType && touched ? passed : null"
                    :disabled="!canEdit"
                    class="h7"
                    maxlength="50"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-form-row>
          <!-- END -   Internal number and PO no -->

          <!-- START -   Note -->
          <div class="mt-1 h7">
            Ghi chú
          </div>
          <b-form-textarea
            id="note"
            ref="focusInputNote"
            v-model.trim="note"
            maxlength="250"
            class="mb-1 h7"
            :disabled="!isTransDate"
          />
          <!-- END -   Note -->
        </b-col>
        <!-- END - Form -->

        <!-- START - List -->
        <b-col
          xl="8"
          class="px-sm-0 px-md-0"
        >
          <div class="bg-white shadow rounded ml-xl-1 mt-1 mt-xl-0 p-1 h-100">
            <div v-if="totalProductQuantity > 0 && !isPoConfirm">
              <!-- START - Table Product -->
              <div class="d-inline-flex rounded-top px-1 mb-1">
                <strong class="text-brand-1">
                  Sản phẩm
                </strong>
              </div>

              <vue-good-table
                :columns="columns"
                :rows="products"
                style-class="vgt-table"
                compact-mode
                line-numbers
              >
                <div
                  slot="emptystate"
                  class="text-center"
                >
                  Không có dữ liệu
                </div>
                <template
                  slot="table-column"
                  slot-scope="props"
                >
                  <b-row
                    v-if="props.column.field === 'feature'"
                  >
                    <b-icon-bricks
                      v-b-popover.hover="'Thao tác'"
                      scale="1.3"
                      class="ml-3"
                    />
                  </b-row>
                  <div v-else>
                    {{ props.column.label }}
                  </div>
                </template>
                <!-- START - Column filter -->
                <template
                  slot="column-filter"
                  slot-scope="props"
                >
                  <div
                    v-if="props.column.field === 'quantity'"
                    class="mx-50 h7 text-brand-3 text-right"
                  >
                    {{ $formatNumberToLocale(totalProductQuantity) }}
                  </div>

                  <div
                    v-else-if="props.column.field === 'totalPrice'"
                    class="mx-50 h7 text-brand-3 text-right"
                  >
                    {{ totalProductPrice }}
                  </div>

                  <div
                    v-else-if="props.column.field === 'productCode'"
                    class="mx-50 h7 text-brand-3"
                  >
                    {{ totalProductCode }}
                  </div>
                </template>
                <!-- START - Column filter -->
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div
                    v-if="props.column.field === 'quantity' || props.column.field === 'price' || props.column.field === 'totalPrice'"
                    style="padding-right: 6px"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                  <div
                    v-else
                    style="width: max-content; padding-left: 0.05em"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
              </vue-good-table>
              <!-- END - Table Product -->
            </div>

            <div v-if="totalProductQuantity > 0 && isPoConfirm">
              <!-- START - Table Product -->
              <div class="d-inline-flex rounded-top px-1 mb-1">
                <strong class="text-brand-1">
                  Sản phẩm
                </strong>
              </div>

              <vue-good-table
                :columns="inputTypeColumns"
                :rows="products"
                style-class="vgt-table"
                compact-mode
                line-numbers
              >
                <div
                  slot="emptystate"
                  class="text-center"
                >
                  Không có dữ liệu
                </div>
                <template
                  slot="table-column"
                  slot-scope="props"
                >
                  <b-row
                    v-if="props.column.field === 'feature'"
                  >
                    <b-icon-bricks
                      v-b-popover.hover="'Thao tác'"
                      scale="1.3"
                      class="ml-3"
                    />
                  </b-row>
                  <div v-else>
                    {{ props.column.label }}
                  </div>
                </template>
                <!-- START - Column filter -->
                <template
                  slot="column-filter"
                  slot-scope="props"
                >
                  <div
                    v-if="props.column.field === 'quantity'"
                    class="mx-50 h7 text-brand-3 text-right"
                  >
                    {{ $formatNumberToLocale(totalProductQuantity) }}
                  </div>

                  <div
                    v-else-if="props.column.field === 'totalPriceNotVat'"
                    class="mx-50 h7 text-brand-3 text-right"
                  >
                    {{ totalProductPriceNotVat }}
                  </div>

                  <div
                    v-else-if="props.column.field === 'totalPrice'"
                    class="mx-50 h7 text-brand-3 text-right"
                  >
                    {{ totalProductPrice }}
                  </div>

                  <div
                    v-else-if="props.column.field === 'productCode'"
                    class="mx-0 h7 text-brand-3"
                  >
                    {{ totalProductCode }}
                  </div>
                </template>
                <!-- START - Column filter -->
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div
                    v-if="props.column.field === 'totalPriceNotVat' ||
                      props.column.field ==='totalPriceVat' ||
                      props.column.field ==='totalPrice' ||
                      props.column.field === 'vat'"
                    class="pr-70"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                  <div
                    v-else-if="props.column.field === 'quantity'"
                    class="pr-80"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                  <div
                    v-else
                    style="width: max-content"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
              </vue-good-table>
              <!-- END - Table Product -->
            </div>

            <div v-if="showPromotionsTable">
              <!-- START - Table Product promotion -->
              <div class="d-inline-flex rounded-top pt-1 px-1 mb-1">
                <strong class="text-brand-1">
                  Hàng khuyến mãi
                </strong>
              </div>

              <vue-good-table
                :columns="promotionColumns"
                :rows="promotions"
                style-class="vgt-table"
                compact-mode
                line-numbers
              >
                <div
                  slot="emptystate"
                  class="text-center"
                >
                  Không có dữ liệu
                </div>
                <template
                  slot="table-column"
                  slot-scope="props"
                >
                  <div>
                    {{ props.column.label }}
                  </div>
                </template>
                <!-- START - Column filter -->
                <template
                  slot="column-filter"
                  slot-scope="props"
                >
                  <div
                    v-if="props.column.field === 'quantity'"
                    class="mx-0 pr-50 h7 text-brand-3 text-right"
                  >
                    {{ $formatNumberToLocale(totalPromotionQuantity) }}
                  </div>

                  <div
                    v-else-if="props.column.field === 'productCode'"
                    class="mx-0 h7 text-brand-3"
                  >
                    {{ totalPromotionCode }}
                  </div>
                </template>
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div v-if="props.column.field === 'quantity' && canEdit">
                    <cleave
                      :id="promotions[props.row.originalIndex].productCode"
                      v-model="props.row.quantity"
                      class="form-control h7 text-right pr-50"
                      :raw="true"
                      :options="options.number"
                      :value="props.row.quantity"
                      maxlength="7"
                      @keypress="$onlyNumberInput"
                      @keyup.native="updateQuantity(props.row.originalIndex, props.row.quantity)"
                      @keydown.enter.native="focusInputSearch"
                    />
                  </div>
                  <div
                    v-else-if="props.column.field === 'quantity'"
                    style="padding-right: 6px"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                  <div
                    v-else-if="props.column.field === 'feature' && canEdit"
                    align-h="center"
                  >
                    <b-icon-trash-fill
                      v-b-popover.hover.top="'Xóa'"
                      class="cursor-pointer ml-1"
                      color="red"
                      scale="1.2"
                      @click="onClickDeleteButton(props.row.originalIndex)"
                    />
                  </div>
                  <div
                    v-else
                    style="width: max-content"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
                <!-- START - Column filter -->
              </vue-good-table>
            </div>
            <div v-if="canEdit">
              <div
                slot="table-actions-bottom"
                class="mx-1 my-2 px-2"
              >
                <vue-autosuggest
                  ref="searchProduct"
                  v-model="productSearch"
                  :suggestions="suggestProducts"
                  :input-props="{
                    id:'autosuggest__input',
                    class:'form-control w-30',
                    placeholder:'Nhập mã hoặc tên sản phẩm'
                  }"
                  style="cursor: pointer"
                  @input="loadProducts"
                  @selected="productSelected"
                >
                  <template slot-scope="{ suggestion }">
                    <b>{{ suggestion.item.productCode }}</b> - {{ suggestion.item.name }}
                  </template>
                </vue-autosuggest>
              </div>
            </div>
            <!-- START - Button -->
            <b-row
              class="my-1 mx-0 pt-1"
              align-v="center"
              align-h="end"
            >
              <b-button
                v-if=" statusSaveButton().show || isTransDate || importType === inputType"
                :disabled="statusSaveButton().disabled || invalid"
                class="align-items-button-center btn-brand-1 text-uppercase h8"
                variant="someThing"
                @click="updateReceipt"
              >
                <b-icon
                  icon="download"
                  class="mr-50"
                />
                LƯU
              </b-button>
              <b-button
                class="align-items-button-center text-uppercase ml-1 h8"
                @click="navigateBack"
              >
                <b-icon-x
                  scale="1.5"
                  class="mr-50"
                />
                Đóng
              </b-button>
            </b-row>
            <!-- END - Button -->
            <!-- END - Table Product promotion -->
          </div>
        </b-col>
        <!-- END - List -->

      </b-row>
    </validation-observer>
    <!-- END - Form and list -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import toasts from '@core/utils/toasts/toasts'
import Cleave from 'vue-cleave-component'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import { VueAutosuggest } from 'vue-autosuggest'
import {
  number,
  required,
} from '@/@core/utils/validations/validations'
import {
  formatISOtoVNI, formatVniDateToISO, nowDate,
} from '@core/utils/filter'
import warehousesData from '@/@db/warehouses'
import {
  WAREHOUSEINPUT,
  // GETTERS
  RECEIPT_BY_ID_GETTER,
  PRODUCTS_BY_ID_GETTER,
  PROMOTIONS_BY_ID_GETTER,
  PRODUCTS_GETTER,
  // ACTIONS
  GET_RECEIPT_BY_ID_ACTION,
  GET_PRODUCTS_BY_ID_ACTION,
  GET_PRODUCTS_ACTION,
  UPDATE_RECEIPT_ACTION,
} from '../store-module/type'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    VueAutosuggest,
    Cleave,
  },
  data() {
    return {
      warehouse: null,
      billNumber: null,
      billDate: null,
      internalNumber: null,
      poNumber: null,
      poId: Number(this.$route.params.poId),
      note: null,
      transCode: null,
      transDate: null,
      transDateTime: null,
      wareHouseTypeName: null,
      today: nowDate(),
      importTypeName: null,
      warehousesInputOptions: warehousesData.inputTypes,
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        allowInvalidPreload: false,
        altInput: false,
      },

      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },

      // validation rules
      number,
      required,

      columns: [
        {
          label: 'Mã hàng',
          field: 'productCode',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right text-nowrap',
          tdClass: 'pr-1',
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
          tdClass: 'pr-1',
          thClass: 'text-nowrap',
        },
        {
          label: 'Tên hàng',
          field: 'name',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'pr-1',
        },
        {
          label: 'SO No',
          field: 'soNo',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: '',
          field: 'feature',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      promotions: [],
      productSearch: null,
      totalPromotionQuantity: 0,
      totalPromotionCode: 0,
      id: this.$route.params.id,
      importType: Number(this.$route.params.type),
      inputType: Number(warehousesData.inputTypes[0].id), // Loại nhập hàng
      borrowType: Number(warehousesData.inputTypes[2].id), // Loại nhập vay mượn
      suggestProducts: [{ data: '' }],
      // START - decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      // END - decentralization

      inputTypeColumns: [
        {
          label: 'Mã hàng',
          field: 'productCode',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-nowrap',
          tdClass: 'pr-50',
        },
        {
          label: 'Giá',
          field: 'priceNotVat',
          type: 'number',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Tên hàng',
          field: 'name',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Thành tiền (chưa VAT)',
          field: 'totalPriceNotVat',
          type: 'number',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'VAT',
          field: 'vat',
          type: 'number',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Thành tiền (VAT)',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'SO No',
          field: 'soNo',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: '',
          field: 'feature',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],

      promotionColumns: [
        {
          label: 'Mã hàng',
          field: 'productCode',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          tdClass: 'pr-1',
          thClass: 'text-nowrap',
        },
        {
          label: 'Tên hàng',
          field: 'name',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'pl-70',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'pl-70',
        },
        {
          label: '',
          field: 'feature',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      productIdSelected: null,
    }
  },

  computed: {
    ...mapGetters(WAREHOUSEINPUT, {
      RECEIPT_BY_ID_GETTER,
      PRODUCTS_BY_ID_GETTER,
      PROMOTIONS_BY_ID_GETTER,
      PRODUCTS_GETTER,
    }),
    receipt() {
      return this.RECEIPT_BY_ID_GETTER
    },
    products() {
      if (this.PRODUCTS_BY_ID_GETTER) {
        return this.PRODUCTS_BY_ID_GETTER.map(data => ({
          productCode: data.productCode,
          quantity: this.$formatNumberToLocale(data.quantity),
          price: this.$formatNumberToLocale(data.price),
          priceNotVat: this.$formatNumberToLocale(data.priceNotVat),
          name: data.productName,
          unit: data.unit,
          totalPrice: this.$formatNumberToLocale(data.totalPrice),
          totalPriceNotVat: this.$formatNumberToLocale(data.amountNotVat),
          soNo: data.soNo,
          vat: data.vat,
        }))
      }
      return []
    },
    totalProductQuantity() {
      return this.PRODUCTS_BY_ID_GETTER.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
    totalProductPrice() {
      return this.$formatNumberToLocale(this.PRODUCTS_BY_ID_GETTER.reduce((accum, item) => accum + Number(item.totalPrice), 0))
    },
    totalProductPriceNotVat() {
      return this.$formatNumberToLocale(this.PRODUCTS_BY_ID_GETTER.reduce((accum, item) => accum + Number(item.amountNotVat), 0))
    },
    totalProductCode() {
      return this.$formatNumberToLocale(this.PRODUCTS_BY_ID_GETTER.length)
    },
    getPromotions() {
      if (this.PROMOTIONS_BY_ID_GETTER) {
        return this.PROMOTIONS_BY_ID_GETTER.map(data => ({
          id: data.id,
          productId: data.productId,
          productCode: data.productCode,
          quantity: data.quantity,
          price: data.price,
          name: data.productName,
          unit: data.unit,
          totalPrice: data.totalPrice,
          soNo: data.soNo,
        }))
      }
      return []
    },
    getTotalPromotionQuantity() {
      return this.promotions.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
    getTotalPromotionCode() {
      return this.$formatNumberToLocale(this.promotions.length)
    },
    getSuggestProducts() {
      if (this.PRODUCTS_GETTER) {
        return [{
          data: this.PRODUCTS_GETTER.map(data => ({
            productId: data.id,
            productCode: data.productCode,
            price: data.price,
            name: data.productName,
            totalPrice: data.stockTotal,
            unit: data.uom1,
          })),
        }]
      }
      return []
    },
    showPromotionsTable() {
      return this.totalPromotionQuantity > 0 || (this.importType === this.inputType && this.poId === 0) // hiện table hàng khuyến mãi nếu số lượng > 0 hoặc là phiếu nhập tay khuyến mãi
    },
    isTransDate() {
      return this.today === this.transDate
    },
    canEdit() {
      return this.today === this.transDate && this.importType === this.inputType && this.poId === 0
    },
    isPoConfirm() {
      return this.importType === this.inputType && this.poId !== 0
    },
    isBorrowType() {
      return this.importType === this.borrowType
    },
  },

  watch: {
    receipt() {
      this.transCode = this.RECEIPT_BY_ID_GETTER.transCode
      this.transDate = formatISOtoVNI(this.RECEIPT_BY_ID_GETTER.transDate)
      this.transDateTime = formatISOtoVNI(this.RECEIPT_BY_ID_GETTER.transDate, false, true)
      this.wareHouseTypeName = this.RECEIPT_BY_ID_GETTER.wareHouseTypeName
      this.billNumber = this.RECEIPT_BY_ID_GETTER.redInvoiceNo
      this.internalNumber = this.RECEIPT_BY_ID_GETTER.internalNumber
      this.poNumber = this.RECEIPT_BY_ID_GETTER.pocoNumber
      this.note = this.RECEIPT_BY_ID_GETTER.note
      this.importTypeName = this.warehousesInputOptions[this.$route.params.type].label
      switch (this.importType) {
        case 1:
          this.billDate = formatISOtoVNI(this.RECEIPT_BY_ID_GETTER.adjustmentDate)
          this.$nextTick(() => this.$refs.focusInputNote.focus())
          break
        case 2:
          this.billDate = formatISOtoVNI(this.RECEIPT_BY_ID_GETTER.borrowDate)
          this.$nextTick(() => this.$refs.focusInputNote.focus())
          break
        default:
          this.billDate = formatISOtoVNI(this.RECEIPT_BY_ID_GETTER.orderDate)
      }
    },
    getPromotions() {
      this.promotions = [...this.getPromotions]
    },
    getTotalPromotionQuantity() {
      this.totalPromotionQuantity = this.getTotalPromotionQuantity
    },
    getTotalPromotionCode() {
      this.totalPromotionCode = this.getTotalPromotionCode
    },
    getSuggestProducts() {
      this.suggestProducts = [...this.getSuggestProducts]
      if (this.suggestProducts[0].data && this.suggestProducts[0].data.length === 1) {
        this.$nextTick(() => document.getElementById('autosuggest__input').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })))
      }
    },
  },

  mounted() {
    this.GET_RECEIPT_BY_ID_ACTION(`${this.id}?type=${this.importType}&formId=5&ctrlId=7`)
    this.GET_PRODUCTS_BY_ID_ACTION(`${this.id}?type=${this.importType}&formId=5&ctrlId=7`)
    if (this.importType === this.inputType) {
      this.$refs.focusInputBillNumber.focus()
    }
  },

  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPT_BY_ID_ACTION,
      GET_PRODUCTS_BY_ID_ACTION,
      GET_PRODUCTS_ACTION,
      UPDATE_RECEIPT_ACTION,
    ]),

    statusSaveButton() {
      return this.$permission('WarehousesInputUpdate', 'WarehousesInputUpdateSave')
    },

    navigateBack() {
      this.$router.back()
    },
    // START - Search product func
    loadProducts(text) {
      if (text) {
        if (text.length >= commonData.minSearchLength) {
          const searchData = {
            keyWord: text,
            ...this.decentralization,
          }
          this.GET_PRODUCTS_ACTION(searchData)
        }
      }
    },
    productSelected(product) {
      if (product.item) {
        const index = this.promotions.findIndex(e => e.productId === product.item.productId)
        if (this.promotions) {
          const obj = {
            id: -1,
            productId: product.item.productId,
            productCode: product.item.productCode,
            quantity: '01', // default quantity
            name: product.item.name,
            unit: product.item.unit,
          }
          if (index === -1) {
            this.promotions.push(obj)
          } else {
            this.promotions[index].quantity = Number(this.promotions[index].quantity) + 1
          }
          this.productSearch = null
          this.suggestProducts = [{ data: null }]
          // auto focus when choose products
          this.productIdSelected = product.item.productCode
          setTimeout(() => {
            document.getElementById(this.productIdSelected).focus()
          }, 100)
        }
      }
    },
    // END - Search product func
    updateQuantity(index, value) {
      this.promotions[index].quantity = Number(value) + 0
    },
    updateReceipt() {
      const updatedPromotions = this.promotions.map(data => ({
        id: data.id,
        productId: data.productId,
        quantity: data.quantity,
      }))
      if (updatedPromotions.findIndex(promotion => promotion.quantity < 0) !== -1) {
        toasts.error('Số lượng sản phẩm phải lớn hơn 0')
        return
      }
      if (updatedPromotions.length === 0 && this.canEdit) {
        toasts.error('Vui lòng nhập sản phẩm')
        return
      }
      this.$refs.formContainer.validate().then(success => {
        if (success) {
          this.UPDATE_RECEIPT_ACTION({
            id: this.id,
            type: this.importType,
            note: this.note,
            redInvoiceNo: this.billNumber?.toUpperCase()?.trim(),
            orderDate: formatVniDateToISO(this.billDate),
            internalNumber: this.internalNumber?.trim(),
            poCoNumber: this.poNumber?.trim(),
            lstUpdate: updatedPromotions,
            formId: 5,
            ctrlId: 7,
          })
        }
      })
    },
    click() {
      if (this.productSearch === null) return
      if (this.productSearch.length >= commonData.minSearchLength) {
        this.GET_PRODUCTS_ACTION({
          keyWord: this.productSearch?.trim(),
          formId: 5,
          ctrlId: 7,
        })
      }
    },
    onClickDeleteButton(index) {
      this.promotions.splice(index, 1)
    },
    focusInputSearch() {
      this.$refs.searchProduct.$el.querySelector('input').focus()
      this.$refs.searchProduct.$el.querySelector('input').click()
    },
  },
}
</script>
<style>
  .item-active {
    padding-left: 5px;
  }
  table.vgt-table td {
    vertical-align: middle;
  }
</style>
