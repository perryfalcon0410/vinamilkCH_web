<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Form and list -->
    <validation-observer
      ref="formContainer"
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
                <strong>
                  {{ now }}
                </strong>
              </b-col>
            </b-row>
            <!-- END - Date -->

            <!-- START - ID and Type -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Mã nhập hàng"
                  label-for="id"
                >
                  <b-form-input
                    id="id"
                    v-model="id"
                    maxlength="40"
                    disabled
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Loại nhập"
                  label-for="id"
                >
                  <tree-select
                    v-model="inputTypeSelected"
                    :options="inputTypeOptions"
                    @select="clearFormText"
                  />
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - ID and Type -->

            <!-- START -  Stock  -->
            <b-form-group
              label="Kho hàng"
              label-for="warehouse"
            >
              <b-form-input
                id="warehouse"
                v-model="warehousesType.wareHouseTypeName"
                disabled
              />
            </b-form-group>
            <!-- END -  Stock  -->

            <!-- START - Bill Number and Date -->
            <b-form-row>
              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  :rules="`${inputTypeSelected === '0' ? 'required' : ''}`"
                  name="số hóa đơn"
                >
                  <div class="h9">
                    Số hóa đơn <sup
                      v-show="inputTypeSelected === '0'"
                      class="text-danger"
                    >*</sup>
                  </div>
                  <b-form-input
                    v-model="billNumber"
                    :state="touched && inputTypeSelected === '0' ? passed : null"
                    :disabled="inputTypeSelected != '0' ? true : false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col>
                <validation-provider
                  rules="required"
                >
                  <div class="h9">
                    Ngày hóa đơn <sup
                      v-show="inputTypeSelected === '0'"
                      class="text-danger"
                    >*</sup>
                  </div>
                  <b-input-group
                    class="input-group-merge"
                  >
                    <vue-flat-pickr
                      id="form-input-date-from"
                      v-model="billDate"
                      :disabled="inputTypeSelected != '0' ? true : false"
                      :config="configDate"
                      class="form-control h8 text-brand-3"
                      placeholder="Chọn ngày"
                    />

                  </b-input-group>
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
                  <div class="mt-1 h9">
                    Số nội bộ <sup
                      v-show="inputTypeSelected === '0'"
                      class="text-danger"
                    >*</sup>
                  </div>
                  <b-form-input
                    v-model="internalNumber"
                    :state="touched && inputTypeSelected === '0' ? passed : null"
                    :disabled="inputTypeSelected !== '0' ? true : false"
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
                  <div class="mt-1 h9">
                    POCo No
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
                      :disabled="inputTypeSelected != '0' ? true : false"
                    />
                    <b-input-group-append
                      v-b-popover.hover="'Chọn đơn nhập'"
                      is-text
                      class="cursor-pointer"
                    >
                      <b-icon-three-dots-vertical
                        @click="showModal"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
            </b-form-row>
            <!-- END -   Internal number and PO no -->

            <!-- START -   Note -->
            <b-form-group
              label="Ghi chú"
              class="mt-1"
              label-for="note"
            >
              <b-form-textarea
                id="note"
                v-model="note"
                maxlength="250"
              />
            </b-form-group>
            <!-- END -   Note -->
          </b-col>
          <!-- END - Form -->

          <!-- START - List -->
          <b-col
            class="bg-white shadow rounded mt-1 mt-xl-0"
          >
            <!-- START - Table Product -->
            <div class="d-inline-flex rounded-top px-1 my-1">
              <strong>
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
                <!--START - Choose import po product-->
                <b-row
                  v-if="props.column.field === 'quantity'"
                  class="mx-0"
                  align-h="center"
                >
                  {{ $formatNumberToLocale(poProductInfo.totalQuantity) ||
                    $formatNumberToLocale(poAdjustInfo.totalQuantity) ||
                    $formatNumberToLocale(poBorrowingInfo.totalQuantity)
                  }}
                </b-row>
                <b-row
                  v-else-if="props.column.field === 'totalPriceVat'"
                  class="mx-0"
                  align-h="end"
                >
                  {{ $formatNumberToLocale(poProductInfo.totalPrice) }}
                </b-row>
              </template>
              <!-- START - Empty rows -->
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
            <!-- START - Table Product promotion -->
            <div v-if="isShowPoPromoTable">
              <div class="d-inline-flex rounded-top px-1 my-1">
                <strong>
                  Hàng khuyến mãi
                </strong>
              </div>
              <!--if-PoConfirm-->
              <vue-good-table
                :columns="poPromotionColumns"
                :rows="rowsProductPromotionLoad"
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
                    v-if="props.column.field === 'quantity'"
                    class="mx-0"
                    align-h="center"
                  >
                    {{ $formatNumberToLocale(poPromotionProductsInfo.totalQuantity) }}
                  </b-row>

                  <b-row
                    v-else-if="props.column.field === 'totalPrice'"
                    class="mx-0"
                    align-h="end"
                  >
                    {{ $formatNumberToLocale(poPromotionProductsInfo.totalPrice) }}
                  </b-row>

                </template>
                <!-- START - Empty rows -->
                <div
                  slot="emptystate"
                  class="text-center"
                >
                  Không có dữ liệu
                </div>
              <!-- END - Empty rows -->
              </vue-good-table>
            </div>
            <!--START input Po-->
            <div v-if="isShowPoPromoManualTable">
              <div
                class="d-inline-flex rounded-top px-1 my-1"
              >
                <strong>
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
                <template
                  slot="column-filter"
                  slot-scope="props"
                >
                  <b-row
                    v-if="props.column.field === 'quantity'"
                    class="mx-0"
                    align-h="center"
                  >
                    {{ totalPromoProductQuantity }}
                  </b-row>

                  <b-row
                    v-else-if="props.column.field === 'productCode'"
                    class="mx-0"
                    align-h="center"
                  >
                    {{ totalPromoProduct }}
                  </b-row>

                </template>
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
                      class="cursor-pointer mt-05"
                      scale="1.5"
                      color="red"
                      @click="onClickDeleteButton(props.index)"
                    />
                    {{ count }}
                  </span>
                </template>
                <!-- START - Empty rows -->
                <div
                  slot="emptystate"
                  class="text-center"
                >
                  Không có dữ liệu
                </div>
                <!-- END - Empty rows -->
                <div
                  slot="table-actions-bottom"
                  class="mx-1 my-2 px-2"
                >
                  <b-form-input
                    v-model="productSearch"
                    class="w-25"
                    placeholder="Nhập mã hoặc tên sản phẩm"
                    type="text"
                    autocomplete="off"
                    @focus="focusProduct"
                    @input="loadProducts"
                    @blur="isFocusedInputProduct = true"
                    @keyup="loadProducts"
                  />
                  <b-collapse
                    v-model.trim="isFocusedInputProduct"
                    class="position-absolute mr-lg-0 mb-3"
                    style="zIndex:1"
                  >
                    <b-container
                      class="my-1 bg-white rounded border border-primary shadow-lg"
                    >
                      <b-row
                        v-for="(product, index) in allProducts"
                        :key="index"
                        class="my-1 cursor-pointer"
                        :class="{'item-active': index === cursorProduct}"
                        @click="productSelected(product)"
                        @mouseover="$event.target.classList.add('item-active')"
                        @mouseout="$event.target.classList.remove('item-active')"
                      >
                        <b>{{ product.productCode }}</b> - {{ product.productName }}
                      </b-row>
                    </b-container>
                  </b-collapse>
                </div>
              </vue-good-table>
            </div>
            <!--END input Po-->
            <!--if-PoConfirm-->

            <!-- END - Table Product promotion -->

            <!-- START - Button -->
            <b-row class="m-1 justify-content-end">
              <b-button-group>
                <b-button
                  class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder mr-1"
                  variant="someThing"
                  @click="create"
                >
                  <b-icon
                    icon="download"
                  />
                  Nhập hàng
                </b-button>

                <b-button
                  class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
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
      </b-col>
    </validation-observer>
    <!-- END - Form and list -->

    <!-- START - Modal -->
    <adjustment-modal
      :visible="adjustmentModalVisible"
      @inputAdjustChange="dataFromInputAdjust($event)"
      @close="adjustmentModalVisible = false"
    />
    <borrowed-modal
      :visible="borrowedModalVisible"
      @inputBorrowsChange="dataFormInputBorrow($event)"
      @close="borrowedModalVisible = false"
    />
    <po-confirm-modal
      :visible="poConfirmModalVisible"
      @inputChange="dataFromPoConfirm($event)"
      @close="poConfirmModalVisible = false"
    />
    <confirm-close-modal
      :visible="showConfirmCloseModal"
      @close="showConfirmCloseModal = false"
    >
    <!-- END - Modal -->
    </confirm-close-modal>
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
import { mapGetters, mapActions } from 'vuex'
import { getNow } from '@core/utils/utils'
import commonData from '@/@db/common'
// eslint-disable-next-line no-unused-vars
import toasts from '@core/utils/toasts/toasts'
import warehousesData from '@/@db/warehouses'
import ConfirmCloseModal from '@core/components/confirm-close-modal/ConfirmCloseModal.vue'
import { formatVniDateToISO } from '@/@core/utils/filter'
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
    AdjustmentModal,
    BorrowedModal,
    PoConfirmModal,
    ConfirmCloseModal,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      // grid - state
      isShowPoPromoTable: false,
      isShowPoPromoManualTable: true,
      // grid - state

      // search product
      productSearch: null,
      isFocusedInputProduct: false,
      cursorProduct: -1,
      // search product
      //
      formId: 5,
      ctrlId: 7,
      //
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      now: getNow(),
      // --------------input form--------------
      billNumber: '',
      internalNumber: '',
      billDate: this.$nowDate,
      poNo: null,
      note: '',
      poId: null,
      inputTypeOptions: warehousesData.inputTypes,
      inputTypeSelected: null,
      // --------------input form--------------

      // --------------modal state--------------
      adjustmentModalVisible: false,
      borrowedModalVisible: false,
      poConfirmModalVisible: false,
      showConfirmCloseModal: false,
      // --------------modal state--------------

      // --------------input type--------------
      status: null,
      columns: [],
      // --------------input type--------------

      // --------------Total-------------
      poProductInfo: {},
      poPromotionProductsInfo: {},
      poBorrowingInfo: {},
      poAdjustInfo: {},
      // --------------Total-------------

      length: 1,
      // validation rules
      number,
      required,
      // -------------------------PoConfirm--------------------------
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
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-center',
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
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-center',
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
          thClass: 'text-center',
          tdClass: 'text-center',
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
      // -------------------------PoConfirm--------------------------
      // --------------------------Adjust-Borrow-col-------------------
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
          thClass: 'text-center',
          tdClass: 'text-center',
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
    }
  },
  computed: {
    warehousesType() {
      return this.WAREHOUSES_TYPE_GETTER()
    },
    allProducts() {
      return this.PRODUCTS_GETTER()
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

    // render importPoManually-table if poNo = null
    poNo() {
      if (this.inputTypeSelected === '0' && this.status !== 0) {
        this.isShowPoPromoManualTable = true
      } else {
        this.isShowPoPromoManualTable = false
      }
    },
    inputTypeSelected() {
      // rest all total row
      this.productSearch = null
      this.rowsProduct = []
      this.poProductInfo = {}
      this.poPromotionProductsInfo = {}
      this.poAdjustInfo = {}
      this.poPromotionProducts = []
      this.poBorrowingInfo = {}
      this.status = null
      this.note = ''
      this.poId = null
      this.rowsProductPromotion = []
      this.promotionRow = []
      if (this.inputTypeSelected === '0') {
        this.columns = this.poConfirmColumn
        this.billDate = this.$nowDate
        this.isShowPoPromoManualTable = true
      } else {
        this.isShowPoPromoTable = false
        this.isShowPoPromoManualTable = false
      }
      if (this.inputTypeSelected !== '0') {
        this.columns = this.adjustBorrowColumns
      }
    },
  },
  mounted() {
    this.inputTypeSelected = this.inputTypeOptions[0].id
    this.GET_WAREHOUSES_TYPE_ACTION({
      formId: this.formId,
      ctrlId: this.ctrlId,
    })
  },
  methods: {
    ...mapGetters(WAREHOUSEINPUT, [
      WAREHOUSES_TYPE_GETTER,
      PRODUCTS_GETTER,
    ]),
    ...mapActions(WAREHOUSEINPUT, [
      CREATE_SALE_IMPORT_ACTION,
      GET_WAREHOUSES_TYPE_ACTION,
      GET_PRODUCTS_ACTION,
    ]),
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
          this.poConfirmModalVisible = true
          break
        case '1':
          this.adjustmentModalVisible = true
          break
        case '2':
          this.borrowedModalVisible = true
          break
        default:
          break
      }
    },
    navigateBack() {
      if (this.status === null && this.promotionRow.length === 0 && !this.billNumber && !this.internalNumber && !this.poNo) {
        this.$router.replace({ name: 'warehouses-input' })
      } else {
        this.showConfirmCloseModal = true
      }
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
      if (this.promotionRow.length === 0) {
        const obj = {
          importType: this.status,
          poCoNumber: this.poNo,
          internalNumber: this.internalNumber,
          redInvoiceNo: this.billNumber,
          orderDate: formatVniDateToISO(this.billDate),
          poId: this.poId,
          note: this.note,
        }
        if (obj.poId !== null && this.status !== 0) {
          this.CREATE_SALE_IMPORT_ACTION(obj)
        } else {
          toasts.error('Cần chọn ít nhất 1 sản phẩm khuyến mãi')
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
              poCoNumber: this.poNo,
              internalNumber: this.internalNumber,
              redInvoiceNo: this.billNumber,
              orderDate: formatVniDateToISO(this.billDate),
              note: this.note,
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
    // --------------search product functions --------------
    focusProduct() {
      this.cursorProduct = -1
      if (this.productSearch) {
        this.isFocusedInputProduct = this.productSearch.length >= commonData.minSearchLength
      }
    },
    keyUp() {
      if (this.cursor > 0) {
        this.cursor -= 1
      }
    },
    loadProducts() {
      this.cursorProduct = -1
      if (this.productSearch.length >= commonData.minSearchLength) {
        this.isFocusedInputProduct = true
        const searchData = {
          keyWord: this.productSearch,
          formId: this.formId,
          ctrlId: this.ctrlId,
        }
        this.GET_PRODUCTS_ACTION(searchData)
      }
    },
    productSelected(product) {
      const index = this.rowsProductPromotion.findIndex(e => e.productId === product.id)
      if (this.rowsProductPromotion) {
        const obj = {
          productId: product.id,
          productCode: product.productCode,
          productName: product.productName,
          quantity: 1, // default quantity
          price: product.price || 0,
          totalPrice: product.stockTotal || 0,
          unit: product.uom1,
        }
        if (index === -1) {
          this.rowsProductPromotion.push(obj)
        } else {
          this.rowsProductPromotion[index].quantity += 1
        }
      }
      this.isFocusedInputProduct = false
      this.productSearch = null
    },
    // --------------search product functions --------------
  },
}
</script>
