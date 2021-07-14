<template>
  <b-container
    fluid
  >
    <!-- START - Form and list -->
    <validation-observer
      ref="formContainer"
      v-slot="{invalid}"
      slim
    >
      <b-row>
        <!-- START - Form -->
        <b-col
          xl="4"
          class="bg-white shadow rounded mr-xl-1 h7"
        >
          <!-- START - Date -->
          <b-row class="mt-1">
            <b-col cols="4">
              Ngày nhập:
            </b-col>
            <b-col>
              <strong>
                {{ now }}
              </strong>
            </b-col>
          </b-row>
          <!-- END - Date -->

          <!-- START - ID and Type -->
          <b-form-row>
            <b-col>
              <div class="mt-1">
                Mã nhập hàng
              </div>
              <b-form-input
                id="id"
                v-model="id"
                maxlength="40"
                class="h7"
                disabled
              />
            </b-col>

            <b-col>
              <div class="mt-1">
                Loại nhập
              </div>
              <div class="d-flex align-items-center">
                <tree-select
                  v-model="inputTypeSelected"
                  :options="inputTypeOptions"
                  no-options-text="Không có dữ liệu"
                  no-results-text="Không tìm thấy kết quả"
                  placeholder="Chọn loại nhập hàng"
                  @select="clearFormText"
                />
                <b-input-group-append>
                  <b-icon-three-dots-vertical
                    v-b-popover.hover="'Chọn đơn nhập'"
                    scale="1.5"
                    class="cursor-pointer"
                    @click="showModal"
                  />
                </b-input-group-append>
              </div>
            </b-col>
          </b-form-row>
          <!-- END - ID and Type -->

          <!-- START -  Stock  -->
          <div class="mt-1">
            Kho hàng
          </div>
          <b-form-input
            id="warehouse"
            v-model="warehousesType.wareHouseTypeName"
            disabled
          />
          <!-- END -  Stock  -->

          <!-- START - Bill Number and Date -->
          <b-form-row>
            <b-col>
              <validation-provider
                v-slot="{ errors, passed, touched }"
                :rules="inputTypeSelected === '0' ? 'required' : ''"
                name="số hóa đơn"
              >
                <div class="mt-1 h7">
                  Số hóa đơn <sup
                    v-show="inputTypeSelected === '0'"
                    class="text-danger"
                  >*</sup>
                </div>
                <b-form-input
                  v-model.trim="billNumber"
                  class="text-uppercase"
                  maxlength="40"
                  :state="touched && inputTypeSelected === '0' ? passed : null"
                  :disabled="inputTypeSelected !== '0' ? true : false"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>

            <b-col>
              <validation-provider
                v-slot="{ errors, passed, touched }"
                rules="required"
                name="Ngày hóa đơn"
              >
                <div class="mt-1 h7">
                  Ngày hóa đơn <sup
                    v-show="inputTypeSelected === '0'"
                    class="text-danger"
                  >*</sup>
                </div>
                <b-input-group
                  class="input-group-merge"
                >
                  <vue-flat-pickr
                    v-model="billDate"
                    :disabled="disableInput"
                    :config="configDate"
                    :state="touched ? passed : null"
                    class="form-control h7 text-brand-3"
                    placeholder="Chọn ngày"
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
                :rules="`${inputTypeSelected === '0' ? 'required' : ''}`"
                name="số nội bộ"
              >
                <div class="mt-1 h7">
                  Số nội bộ <sup
                    v-show="inputTypeSelected === '0'"
                    class="text-danger"
                  >*</sup>
                </div>
                <b-form-input
                  v-model="internalNumber"
                  :state="touched && inputTypeSelected === '0' ? passed : null"
                  maxlength="40"
                  class="h7"
                  :disabled="disableInput"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col>
              <validation-provider
                v-slot="{ errors, passed, touched }"
                :rules="inputTypeSelected === '0' ? 'required' : ''"
                name="PO No"
              >
                <div class="mt-1 h7">
                  PO No
                  <sup
                    v-show="inputTypeSelected === '0'"
                    class="text-danger"
                  >*</sup>
                </div>
                <b-input-group
                  id="PoNo"
                  class="input-group-merge"
                >
                  <b-form-input
                    v-model="poNo"
                    :state="inputTypeSelected === '0' && touched ? passed : null"
                    class="h7"
                    maxlength="40"
                    :disabled="disableInput"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-form-row>
          <!-- END -   Internal number and PO no -->

          <!-- START -   Note -->
          <div class="mt-1">
            Ghi chú
          </div>
          <b-form-textarea
            id="note"
            v-model="note"
            maxlength="250"
          />
          <!-- END -   Note -->
        </b-col>
        <!-- END - Form -->

        <!-- START - List -->
        <b-col
          class="bg-white shadow rounded mt-1 mt-xl-0"
        >
          <!-- START - Table Product -->
          <div class="d-inline-flex rounded-top px-1 my-1">
            <strong class="text-brand-1">
              Sản phẩm
            </strong>
          </div>

          <vue-good-table
            :columns="columns"
            :rows="rowsProduct"
            style-class="vgt-table striped"
            compact-mode
            line-numbers
          >
            <!-- START - Column filter -->
            <template
              slot="column-filter"
              slot-scope="props"
            >
              <b-row
                v-if="props.column.field === 'productCode' && totalProduct !== 0"
                class="mx-0 h7 text-brand-3"
                align-h="start"
              >
                {{ $formatNumberToLocale(totalProduct) }}
              </b-row>
              <!--START - Choose import po product-->
              <b-row
                v-if="props.column.field === 'quantity'"
                class="mx-50 h7 text-brand-3"
                align-h="end"
              >
                {{
                  $formatNumberToLocale(poProductInfo.totalQuantity || poAdjustInfo.totalQuantity || poBorrowingInfo.totalQuantity)
                }}
              </b-row>
              <b-row
                v-if="props.column.field === 'totalPriceNotVat'"
                class="mx-50 h7 text-brand-3"
                align-h="end"
              >
                {{ $formatNumberToLocale(poProductInfo.totalPriceNotVat) }}
              </b-row>
              <b-row
                v-else-if="props.column.field === 'totalPriceVat'"
                class="mx-50 h7 text-brand-3"
                align-h="end"
              >
                {{ $formatNumberToLocale(poProductInfo.totalPrice) }}
              </b-row>
              <b-row
                v-else-if="props.column.field === 'totalPrice'"
                class="mx-50 h7 text-brand-3"
                align-h="end"
              >
                {{
                  $formatNumberToLocale(poAdjustInfo.totalPrice || poBorrowingInfo.totalPrice)
                }}
              </b-row>
            </template>
            <!-- START - Empty rows -->

            <!-- START - Rows -->
            <template
              slot="table-row"
              slot-scope="props"
            >
              <div
                v-if="props.column.field === 'totalPriceNotVat' ||
                  'totalPriceVat' ||
                  'totalPrice' ||
                  'quantity'"
                class="pr-70"
              >
                {{ props.formattedRow[props.column.field] }}
              </div>
              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
            <!-- END - Rows -->

            <div
              slot="emptystate"
              class="text-center"
            >
              Không có dữ liệu
            </div>
            <!-- END - Empty rows -->
          </vue-good-table>
          <!-- END - Table Product -->

          <br>

          <!-- START - Table Product promotion 1 -->
          <div v-if="isShowPoPromoTable">

            <div class="d-inline-flex rounded-top px-1 my-1">
              <strong class="text-brand-1">
                Hàng khuyến mãi
              </strong>
            </div>

            <vue-good-table
              :columns="poPromotionColumns"
              :rows="rowsProductPromotionLoad"
              style-class="vgt-table"
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

              <!-- START - Custom row -->
              <template
                slot="table-row"
                slot-scope="props"
              >
                <div
                  v-if="props.column.field === 'quantity'"
                  class="pr-70"
                >
                  {{ props.formattedRow[props.column.field] }}
                </div>
                <div v-else>
                  {{ props.formattedRow[props.column.field] }}
                </div>
              </template>
              <!-- END - Custom row -->

              <!-- START - Custom filter -->
              <template
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'productCode'"
                  class="mx-0 h7 text-brand-3"
                  align-h="start"
                >
                  {{ $formatNumberToLocale(totalPoPromoProduct) }}
                </b-row>
                <b-row
                  v-if="props.column.field === 'quantity'"
                  class="mx-50 h7 text-brand-3"
                  align-h="end"
                >
                  {{ $formatNumberToLocale(poPromotionProductsInfo.totalQuantity) }}
                </b-row>

              </template>
              <!-- END - Custom filter -->
            </vue-good-table>
          </div>
          <!-- END - Table Product promotion 1 -->

          <!-- START - Table Product promotion 2 -->
          <div v-if="isShowPoPromoManualTable">

            <div
              class="d-inline-flex rounded-top px-1 my-1"
            >
              <strong class="text-brand-1">
                Hàng khuyến mãi
              </strong>
            </div>

            <vue-good-table
              :columns="poPromotionColumns"
              :rows="rowsProductPromotion"
              style-class="vgt-table striped"
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

              <!-- START - Custom filter -->
              <template
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'quantity'"
                  v-show="totalPromoProductQuantity"
                  class="mx-50 h7 text-brand-3"
                  align-h="end"
                >
                  {{ $formatNumberToLocale(totalPromoProductQuantity) }}
                </b-row>

                <b-row
                  v-else-if="props.column.field === 'productCode'"
                  v-show="totalPromoProduct"
                  class="mx-0 h7 text-brand-3"
                  align-h="start"
                >
                  {{ $formatNumberToLocale(totalPromoProduct) }}
                </b-row>

              </template>
              <!-- END - Custom filter -->

              <!-- START - Custom row-->
              <template
                slot="table-row"
                slot-scope="props"
              >
                <span v-if="props.column.field === 'productCode'">
                  {{ rowsProductPromotion[props.index].productCode }}
                </span>
                <span v-if="props.column.field === 'quantity'">
                  <b-form-input
                    v-model.number="rowsProductPromotion[props.index].quantity"
                    :state="isPositive(rowsProductPromotion[props.index].quantity)"
                    maxlength="7"
                    @keypress="$onlyNumberInput"
                  />
                </span>
                <span v-if="props.column.field === 'price'">
                  {{ rowsProductPromotion[props.index].price }}
                </span>
                <span v-if="props.column.field === 'productName'">
                  {{ rowsProductPromotion[props.index].productName }}
                </span>
                <span v-if="props.column.field === 'unit'">
                  {{ rowsProductPromotion[props.index].unit }}
                </span>
                <span v-if="props.column.field === 'totalPrice'">
                  {{ rowsProductPromotion[props.index].totalPrice }}
                </span>
                <span v-if="props.column.field === 'function'">
                  <b-icon-trash-fill
                    v-b-popover.hover.top="'Xóa'"
                    class="cursor-pointer"
                    scale="1.2"
                    color="red"
                    @click="onClickDeleteButton(props.index)"
                  />
                  {{ count }}
                </span>
              </template>
              <!-- END - Custom row-->

              <!-- START - Table action bottom -->
              <div
                slot="table-actions-bottom"
                class="m-2"
              >
                <vue-autosuggest
                  v-model="productSearch"
                  :suggestions="products"
                  :input-props="{
                    id:'autosuggest__input',
                    class:'form-control w-25',
                    placeholder:'Nhập mã hoặc tên sản phẩm'
                  }"
                  @input="loadProducts"
                  @selected="productSelected"
                >
                  <template slot-scope="{ suggestion }">
                    <div class="cursor-pointer">
                      {{ suggestions }}
                      <b>{{ suggestion.item.productCode }}</b> - {{ suggestion.item.name }}
                    </div>
                  </template>
                </vue-autosuggest>
              </div>
              <!-- END - Table action bottom -->

            </vue-good-table>
          </div>
          <!-- START - Table Product promotion 2 -->

          <!-- START - Button -->
          <b-row class="m-1 justify-content-end">
            <b-button-group>
              <b-button
                v-if="statusSaveButton().show"
                :disabled="statusSaveButton().disabled || invalid"
                class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder mr-1"
                variant="someThing"
                @click="create"
              >
                <b-icon
                  icon="download"
                />
                Nhập hàng
              </b-button>

              <b-button
                class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder"
                @click="navigateBack"
              >
                <b-icon
                  icon="x"
                  scale="1.5"
                />
                Đóng
              </b-button>
            </b-button-group>
          </b-row>
          <!-- END - Button -->

        </b-col>
        <!-- END - List -->

      </b-row>
    </validation-observer>
    <!-- END - Form and list -->

    <!-- START - Modal -->
    <adjustment-modal
      @inputAdjustChange="dataFromInputAdjust($event)"
    />
    <borrowed-modal
      @inputBorrowsChange="dataFormInputBorrow($event)"
    />
    <po-confirm-modal
      @inputChange="dataFromPoConfirm($event)"
      @clearView="clearsViewIfNotImport($event)"
    />
    <confirm-modal
      @ok="routerBack()"
    />
    <!-- END - Modal -->
  </b-container>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  number,
  required,
} from '@/@core/utils/validations/validations'
import { nowDate, formatVniDateToISO } from '@/@core/utils/filter'
import { VueAutosuggest } from 'vue-autosuggest'
import { mapGetters, mapActions } from 'vuex'
import { getNow } from '@core/utils/utils'
import commonData from '@/@db/common'
import toasts from '@core/utils/toasts/toasts'
import warehousesData from '@/@db/warehouses'
import ConfirmModal from '@/@core/components/confirm-close-modal/ConfirmModal.vue'
import AdjustmentModal from '../components/adjustment-modal/InputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/InputBorrowedModal.vue'
import PoConfirmModal from '../components/po-confirm-modal/InputPoConfirmModal.vue'
import {
  WAREHOUSEINPUT,
  WAREHOUSES_TYPE_GETTER,
  PRODUCTS_GETTER,
  GET_WAREHOUSES_TYPE_ACTION,
  CREATE_SALE_IMPORT_ACTION,
  GET_PRODUCTS_ACTION,
} from '../store-module/type'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VueAutosuggest,
    AdjustmentModal,
    BorrowedModal,
    PoConfirmModal,
    ConfirmModal,
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      disableInput: false,
      componentKey: 0,
      totalPoPromoProduct: 0,
      totalProduct: 0,
      products: [{ data: '' }],
      // START - Table promotions
      isShowPoPromoTable: false,
      isShowPoPromoManualTable: true,
      // END - Table promotions

      // START - Search product
      productSearch: null,
      // END - Search product

      // START - decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      // END - decentralization

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      now: getNow(),
      isFieldCanCheck: true,
      // START - Input form
      billNumber: null,
      internalNumber: null,
      billDate: nowDate(),
      poNo: null,
      note: '',
      poId: null,
      inputTypeOptions: warehousesData.inputTypes,
      inputTypeSelected: null,
      // END - Input form

      // START - Modal status
      adjustmentModalVisible: false,
      borrowedModalVisible: false,
      poConfirmModalVisible: false,
      // END - Modal status

      // START - Input Type
      status: -1,
      columns: [],
      // END - Input Type

      // START - Total
      poProductInfo: {},
      poPromotionProductsInfo: {},
      poBorrowingInfo: {},
      poAdjustInfo: {},
      // END - Total

      // START - Validation rules
      number,
      required,
      // END - Validation rules

      // START - PoConfirm
      poPromotionColumns: [
        {
          label: 'Mã hàng',
          field: 'productCode',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          filterOptions: {
            enabled: true,
          },
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tên hàng',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'SO No',
          field: 'SoNo',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: '',
          field: 'function',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      rowsProduct: [],
      poConfirmColumn: [
        {
          label: 'Mã hàng',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Giá',
          field: 'priceNotVat',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tên hàng',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền (chưa VAT)',
          field: 'totalPriceNotVat',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'VAT',
          field: 'vat',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền (VAT)',
          field: 'totalPriceVat',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },

        {
          label: 'SO No',
          field: 'soNo',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      rowsProductPromotion: [],
      // END - PoConfirm

      // START - Adjust Borrow col
      adjustBorrowColumns: [
        {
          label: 'Mã hàng',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tên hàng',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'SO No',
          field: 'SoNo',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      // END - Adjust Borrow col

    }
  },

  computed: {
    ...mapGetters(WAREHOUSEINPUT, [
      WAREHOUSES_TYPE_GETTER,
      PRODUCTS_GETTER,
    ]),
    warehousesType() {
      return this.WAREHOUSES_TYPE_GETTER
    },
    getProducts() {
      if (this.PRODUCTS_GETTER) {
        // để show lên vue-autosuggest thì phải để [{data: value}]
        return [{
          data: this.PRODUCTS_GETTER.map(data => ({
            productId: data.id,
            productCode: data.productCode,
            name: data.productName,
            price: data.price,
            totalPrice: data.stockTotal,
            unit: data.uom1,
          })),
        }]
      }
      return []
    },
    promotionRow() {
      return this.rowsProductPromotion.map(data => ({
        productId: data.productId,
        quantity: data.quantity,
      }))
    },
    totalPromoProduct() {
      return this.rowsProductPromotion.length
    },
    totalPromoProductQuantity() {
      return this.rowsProductPromotion.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
  },

  watch: {
    rowsProduct() {
      this.totalProduct = this.rowsProduct.length
    },
    // render importPoManually-table if poNo = null
    poNo() {
      if (this.inputTypeSelected === '0' && this.status !== 0) {
        this.isShowPoPromoManualTable = true
      } else {
        this.isShowPoPromoManualTable = false
      }
    },
    inputTypeSelected() {
      this.clearAllDataView()
      if (this.inputTypeSelected === '0') {
        this.columns = this.poConfirmColumn
        this.billDate = nowDate()
        this.isShowPoPromoManualTable = true
      } else {
        this.isShowPoPromoTable = false
        this.isShowPoPromoManualTable = false
      }
      if (this.inputTypeSelected !== '0') {
        this.columns = this.adjustBorrowColumns
      }
      if (this.inputTypeSelected === '0' && this.status === -1) {
        this.disableInput = false
      }
    },
    getProducts() {
      this.products = [...this.getProducts]
    },
    status() {
      if (this.inputTypeSelected === '0' && this.status === -1) {
        this.disableInput = false
      } else {
        this.disableInput = true
      }
    },
  },

  mounted() {
    this.inputTypeSelected = this.inputTypeOptions[0].id
    this.GET_WAREHOUSES_TYPE_ACTION({
      ...this.decentralization,
    })
  },

  // before page leave, this will check
  beforeRouteLeave(to, from, next) {
    if (this.isFieldCanCheck) {
      if (this.checkFieldsValueLength()) {
        this.$bvModal.show('confirmModal')
        this.goNext = next
      } else {
        next()
      }
    } else {
      next()
    }
  },

  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      CREATE_SALE_IMPORT_ACTION,
      GET_WAREHOUSES_TYPE_ACTION,
      GET_PRODUCTS_ACTION,
    ]),

    statusSaveButton() {
      return this.$permission('WarehousesInputCreate', 'WarehousesInputCreateSave')
    },

    // clear text in input form in case changes import type
    clearFormText(item) {
      if (item.id !== 0) {
        this.billNumber = null
        this.poNo = null
        this.internalNumber = null
      }
    },
    onClickDeleteButton(index) {
      this.rowsProductPromotion.splice(index, 1)
    },
    showModal() {
      switch (this.inputTypeSelected) {
        case '0':
          this.$bvModal.show('po-confirm-modal')
          break
        case '1':
          this.$bvModal.show('adjustment-modal')
          break
        case '2':
          this.$bvModal.show('borrowed-modal')
          break
        default:
          break
      }
    },
    navigateBack() {
      if (this.checkFieldsValueLength()) {
        this.$bvModal.show('confirmModal')
      } else {
        this.$router.replace({ name: 'warehouses-input' })
      }
    },
    routerBack() {
      this.isFieldCanCheck = false
      this.$router.replace({ name: 'warehouses-input' })
    },
    // ---------------------------Nhap hang-----------------------
    dataFromPoConfirm(data) {
      const [sysDate, poProducts, ProductInfo, poPromotionProducts, promotionProductsInfo, Snb, poNum, id] = data
      this.billDate = sysDate
      this.rowsProduct = [...poProducts]
      this.rowsProductPromotionLoad = [...poPromotionProducts]
      this.poProductInfo = ProductInfo
      this.poPromotionProductsInfo = promotionProductsInfo
      this.status = 0
      this.internalNumber = Snb
      this.poNo = poNum
      this.poId = id
      this.totalPoPromoProduct = this.rowsProductPromotionLoad.length
      // show promotion grid if it's not null
      if (this.rowsProductPromotionLoad.length > 0) {
        this.isShowPoPromoTable = true
      } else {
        this.isShowPoPromoTable = false
      }
    },
    // ----------------------------Nhap hang-----------------------

    // -----------------------------Nhap dieu chinh------------------------
    dataFromInputAdjust(data) {
      const [sysDate, importAdjustsDetail, importAdjustInfo, id, description] = data
      this.rowsProduct = [...importAdjustsDetail]
      this.note = description
      this.status = 1 // inputTypeSelected
      this.poNo = null // poNumber
      this.poId = id // poId
      this.internalNumber = null
      this.billDate = sysDate
      this.poAdjustInfo = { ...importAdjustInfo }
    },
    // -----------------------------Nhap dieu chinh------------------------

    // ------------------------------Nhap vay muon----------------------------
    dataFormInputBorrow(data) {
      const [sysDate, importBorrowsDetail, importBorrowInfo, id, description] = data
      this.rowsProduct = [...importBorrowsDetail]
      this.note = description
      this.billDate = sysDate
      this.status = 2
      this.poNo = null
      this.internalNumber = null
      this.poId = id
      this.poBorrowingInfo = { ...importBorrowInfo }
    },
    // ------------------------------Nhap vay muon----------------------------
    create() {
      this.isFieldCanCheck = false
      // this mean status = 0 || 1 || 2
      if (this.promotionRow.length === 0) {
        const obj = {
          importType: this.status,
          poCoNumber: this.poNo?.trim(),
          internalNumber: this.internalNumber?.trim(),
          redInvoiceNo: this.billNumber?.toUpperCase()?.trim(),
          orderDate: formatVniDateToISO(this.billDate),
          poId: this.poId,
          note: this.note?.trim(),
        }
        if (obj.importType === -1) {
          toasts.error('Cần chọn ít nhất 1 sản phẩm khuyến mãi')
        }
        // status = 1 || 2
        if (obj.poId !== null && this.status !== 0) {
          this.CREATE_SALE_IMPORT_ACTION(obj)
        }
        // if import type = choose poConfirm -> check redInvoice
        if (this.status === 0) {
          this.$refs.formContainer.validate().then(success => {
            if (success) {
              this.CREATE_SALE_IMPORT_ACTION(obj)
            }
          })
        }
      } else {
        this.$refs.formContainer.validate().then(success => {
          if (success) {
            this.CREATE_SALE_IMPORT_ACTION({
              importType: 0,
              poCoNumber: this.poNo?.trim(),
              internalNumber: this.internalNumber?.trim(),
              redInvoiceNo: this.billNumber?.toUpperCase()?.trim(),
              orderDate: formatVniDateToISO(this.billDate),
              note: this.note?.trim(),
              lst: this.promotionRow,
            })
          }
        })
      }
    },
    isPositive(num) {
      if (num >= 0) {
        return true
      }
      return false
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
        const index = this.rowsProductPromotion.findIndex(e => e.productId === product.item.productId)
        if (this.rowsProductPromotion) {
          const obj = {
            productId: product.item.productId,
            productCode: product.item.productCode,
            productName: product.item.name,
            quantity: 1, // default quantity
            price: product.item.price || 0,
            totalPrice: product.item.stockTotal || 0,
            unit: product.item.unit,
          }
          if (index === -1) {
            this.rowsProductPromotion.push(obj)
          } else {
            this.rowsProductPromotion[index].quantity += 1
          }
          this.productSearch = null
          this.products = [{ data: null }]
        }
      }
    },
    // END - Search product func
    clearAllDataView() {
      // rest all total row
      this.rowsProduct = []
      this.poProductInfo = {}
      this.poPromotionProductsInfo = {}
      this.poAdjustInfo = {}
      this.poPromotionProducts = []
      this.poBorrowingInfo = {}
      this.status = -1
      this.note = ''
      this.billDate = nowDate()
      this.poId = null
      this.poNo = null
      this.internalNumber = null
      this.rowsProductPromotion = []
      this.promotionRow = []
      this.totalProduct = null
      this.billNumber = null
    },
    clearsViewIfNotImport(id) {
      if (this.poId === id) {
        this.clearAllDataView()
      }
    },
    checkFieldsValueLength() {
      if (this.billNumber || this.internalNumber
      || this.poNo || this.poId
      || this.rowsProductPromotion.length > 0) {
        return true
      }
      return false
    },
  },
}
</script>
