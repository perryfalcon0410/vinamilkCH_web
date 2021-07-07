<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Form and list -->
    <validation-observer
      ref="formContainer"
      v-slot="{invalid}"
    >
      <b-col>
        <b-row>
          <!-- START - Form -->
          <b-col
            xl="4"
            class="bg-white shadow rounded mr-xl-1"
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
              v-model="note"
              maxlength="250"
              class="mb-1 h7"
              :disabled="!isTransDate"
            />
            <!-- END -   Note -->
          </b-col>
          <!-- END - Form -->

          <!-- START - List -->
          <b-col
            class="bg-white shadow rounded mt-1 mt-xl-0"
          >
            <div v-if="totalProductQuantity > 0 && !isPoConfirm">
              <!-- START - Table Product -->
              <div class="d-inline-flex rounded-top my-1">
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
                    class="mx-0 h7 text-brand-3 text-right"
                  >
                    {{ $formatNumberToLocale(totalProductQuantity) }}
                  </div>

                  <div
                    v-else-if="props.column.field === 'totalPrice'"
                    class="mx-0 h7 text-brand-3 text-right"
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
                    v-if="props.column.field === 'quantity' || props.column.field === 'totalPrice'"
                    style="padding-right: 4px"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                  <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
              </vue-good-table>
              <!-- END - Table Product -->
            </div>

            <div v-if="totalProductQuantity > 0 && isPoConfirm">
              <!-- START - Table Product -->
              <div class="d-inline-flex rounded-top my-1">
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
                    class="mx-0 h7 text-brand-3 text-right"
                  >
                    {{ $formatNumberToLocale(totalProductQuantity) }}
                  </div>

                  <div
                    v-else-if="props.column.field === 'totalPriceNotVat'"
                    class="mx-0 h7 text-brand-3 text-right"
                  >
                    {{ totalProductPriceNotVat }}
                  </div>

                  <div
                    v-else-if="props.column.field === 'totalPrice'"
                    class="mx-0 h7 text-brand-3 text-right"
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
                    v-if="props.column.field === 'quantity' || props.column.field === 'totalPrice' || props.column.field === 'totalPriceNotVat'"
                    style="padding-right: 4px"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                  <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
              </vue-good-table>
              <!-- END - Table Product -->
            </div>

            <div v-if="showPromotionsTable">
              <!-- START - Table Product promotion -->
              <div class="d-inline-flex rounded-top my-1">
                <strong class="text-brand-1">
                  Hàng khuyến mãi
                </strong>
              </div>

              <vue-good-table
                :columns="columns"
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
                    class="mx-0 h7 text-brand-3 text-right"
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
                    <b-input
                      v-model="props.row.quantity"
                      class="text-right"
                      maxlength="7"
                      :number="true"
                      :value="props.row.quantity"
                      @change="updateQuantity(props.row.originalIndex, props.row.quantity)"
                      @keypress="$onlyNumberInput"
                    />
                  </div>
                  <div
                    v-else-if="props.column.field === 'quantity'"
                    style="padding-right: 4px"
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
                  <div v-else>
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
                  v-model="productSearch"
                  :suggestions="suggestProducts"
                  :input-props="{
                    id:'autosuggest__input',
                    class:'form-control w-25',
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
            <!-- END - Table Product promotion -->

            <!-- START - Button -->
            <b-row class="m-1 justify-content-end">
              <b-button-group>
                <b-button
                  v-if="isTransDate || importType === inputType"
                  class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0 text-uppercase rounded"
                  variant="someThing"
                  :disabled="invalid"
                  @click="updateReceipt"
                >
                  <b-icon
                    icon="download"
                    class="mr-50"
                  />
                  LƯU
                </b-button>

                <b-button
                  class="align-items-button-center h8 ml-1 rounded text-uppercase"
                  @click="navigateBack"
                >
                  <b-icon-x
                    scale="1.5"
                    class="mr-50"
                  />
                  Đóng
                </b-button>
              </b-button-group>
            </b-row>
            <!-- END - Button -->

          </b-col>
          <!-- END - List -->

        </b-row>
      </b-col>
    </validation-observer>
    <!-- END - Form and list -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import toasts from '@core/utils/toasts/toasts'
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
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Tên hàng',
          field: 'name',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'SO No',
          field: 'soNo',
          sortable: false,
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
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá',
          field: 'priceNotVat',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Tên hàng',
          field: 'name',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
        },
        {
          label: 'Thành tiền (chưa VAT)',
          field: 'totalPriceNotVat',
          type: 'number',
          sortable: false,
        },
        {
          label: 'VAT',
          field: 'vat',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thành tiền (VAT)',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'SO No',
          field: 'soNo',
          sortable: false,
        },
        {
          label: '',
          field: 'feature',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
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
          break
        case 2:
          this.billDate = formatISOtoVNI(this.RECEIPT_BY_ID_GETTER.borrowDate)
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
    },
  },

  mounted() {
    this.GET_RECEIPT_BY_ID_ACTION(`${this.id}?type=${this.importType}&formId=5&ctrlId=7`)
    this.GET_PRODUCTS_BY_ID_ACTION(`${this.id}?type=${this.importType}&formId=5&ctrlId=7`)
  },

  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPT_BY_ID_ACTION,
      GET_PRODUCTS_BY_ID_ACTION,
      GET_PRODUCTS_ACTION,
      UPDATE_RECEIPT_ACTION,
    ]),

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
            quantity: 1, // default quantity
            price: 0,
            name: product.item.name,
            totalPrice: 0,
            unit: product.item.unit,
            soNo: '',
          }
          if (index === -1) {
            this.promotions.push(obj)
          } else {
            this.promotions[index].quantity += 1
          }
          this.productSearch = null
          this.suggestProducts = [{ data: null }]
        }
      }
    },
    // END - Search product func
    updateQuantity(index, value) {
      this.promotions[index].quantity = value + 0
    },
    updateReceipt() {
      const updatedPromotions = this.promotions.map(data => ({
        id: data.id,
        productId: data.productId,
        quantity: data.quantity,
      }))
      if (updatedPromotions.findIndex(promotion => promotion.quantity === 0) !== -1) {
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
