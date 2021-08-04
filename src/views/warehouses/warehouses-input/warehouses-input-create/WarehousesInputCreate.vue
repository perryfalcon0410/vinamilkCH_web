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
          class="bg-white shadow rounded h7"
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
                  ref="focusInput"
                  v-model="inputTypeSelected"
                  :options="inputTypeOptions"
                  no-options-text="Không có dữ liệu"
                  no-results-text="Không tìm thấy kết quả"
                  placeholder="Chọn loại nhập hàng"
                  @select="setDefaultWarehouse"
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
            Kho hàng <span class="text-danger">*</span>
          </div>
          <b-form-input
            v-show="inputTypeSelected === '1' || (inputTypeSelected === '0' && status !== -1)"
            id="warehouse"
            v-model="defaultWarehouse.warehouseName"
            disabled
          />
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Kho hàng"
          >
            <tree-select
              v-show="inputTypeSelected === '2' || (inputTypeSelected === '0' && status === -1)"
              v-model="warehouseSelected"
              :options="warehousesListOptions"
              placeholder="Nhập kho hàng"
              :state="touched ? passed : null"
              class="h7"
              no-options-text="Không có dữ liệu"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
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
          xl="8"
          class="mt-1 mt-xl-0 px-sm-0 px-md-0"
        >
          <!-- START - Table Product -->
          <div class="bg-white shadow rounded ml-xl-1 mt-xl-0 p-1 h-100">
            <div class="d-inline-flex rounded-top my-1">
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
                    props.column.field ==='totalPriceVat' ||
                    props.column.field ==='totalPrice' ||
                    props.column.field ==='quantity'"
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
                    <cleave
                      :id="rowsProductPromotion[props.row.originalIndex].productCode"
                      v-model="rowsProductPromotion[props.index].quantity"
                      class="form-control h7 text-right"
                      :raw="true"
                      :options="options.number"
                      :state="isPositive(rowsProductPromotion[props.index].quantity)"
                      maxlength="7"
                      @keypress="$onlyNumberInput"
                      @keyup.enter.native="focusInputSearch"
                    />
                  </span>
                  <span v-if="props.column.field === 'price'">
                    {{ $formatNumberToLocale(rowsProductPromotion[props.index].price) }}
                  </span>
                  <span v-if="props.column.field === 'productName'">
                    {{ rowsProductPromotion[props.index].productName }}
                  </span>
                  <span v-if="props.column.field === 'unit'">
                    {{ rowsProductPromotion[props.index].unit }}
                  </span>
                  <span v-if="props.column.field === 'totalPrice'">
                    {{ $formatNumberToLocale(rowsProductPromotion[props.index].totalPrice) }}
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
                    ref="searchProduct"
                    v-model="productSearch"
                    :suggestions="products"
                    :input-props="{
                      id:'autosuggest__input',
                      class:'form-control w-30',
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
          </div>
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
import Cleave from 'vue-cleave-component'
import ConfirmModal from '@/@core/components/confirm-close-modal/ConfirmModal.vue'
import AdjustmentModal from '../components/adjustment-modal/InputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/InputBorrowedModal.vue'
import PoConfirmModal from '../components/po-confirm-modal/InputPoConfirmModal.vue'
import {
  WAREHOUSEINPUT,

  PRODUCTS_GETTER,
  WAREHOUSES_LIST_GETTER,

  CREATE_SALE_IMPORT_ACTION,
  GET_PRODUCTS_ACTION,
  GET_WAREHOUSES_LIST_ACTION,
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
    Cleave,
  },

  data() {
    return {
      disableInput: false,
      componentKey: 0,
      totalPoPromoProduct: 0,
      totalProduct: 0,
      products: [{ data: '' }],
      warehouseSelected: null,

      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },

      defaultWarehouse: {
        warehouseTypeId: null,
        warehouseName: null,
      },
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
          thClass: 'text-nowrap',
          tdClass: 'text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          filterOptions: {
            enabled: true,
          },
          width: '120px',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right text-nowrap',
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right text-nowrap pr-2',
        },
        {
          label: 'Tên hàng',
          field: 'productName',
          sortable: false,
          thClass: 'text-left text-nowrap',
          tdClass: 'text-left text-nowrap',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          type: 'number',
          sortable: false,
          thClass: 'text-center text-nowrap',
          tdClass: 'text-center text-nowrap',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right text-nowrap pr-2',
        },
        {
          label: 'SO No',
          field: 'SoNo',
          sortable: false,
          thClass: 'text-center text-nowrap',
          tdClass: 'text-center text-nowrap',
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
          thClass: 'text-left text-nowrap',
          tdClass: 'text-left text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right text-nowrap',
        },
        {
          label: 'Giá',
          field: 'priceNotVat',
          type: 'number',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right text-nowrap',
        },
        {
          label: 'Tên hàng',
          field: 'productName',
          sortable: false,
          thClass: 'text-left text-nowrap',
          tdClass: 'text-left text-nowrap',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          type: 'number',
          sortable: false,
          thClass: 'text-center text-nowrap',
          tdClass: 'text-center text-nowrap',
        },
        {
          label: 'Thành tiền (chưa VAT)',
          field: 'totalPriceNotVat',
          type: 'number',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right text-nowrap',
        },
        {
          label: 'VAT',
          field: 'vat',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'text-nowrap',
        },
        {
          label: 'Thành tiền (VAT)',
          field: 'totalPriceVat',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right text-nowrap',
        },

        {
          label: 'SO No',
          field: 'soNo',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'text-nowrap',
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
          thClass: 'text-nowrap',
          tdClass: 'text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right text-nowrap',
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right text-nowrap',
        },
        {
          label: 'Tên hàng',
          field: 'productName',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'text-nowrap',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          type: 'number',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'text-nowrap',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right text-nowrap',
        },
        {
          label: 'SO No',
          field: 'SoNo',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'text-nowrap',
        },
      ],
      // END - Adjust Borrow col
      productIdSelected: null,
    }
  },

  computed: {
    ...mapGetters(WAREHOUSEINPUT, [
      PRODUCTS_GETTER,
      WAREHOUSES_LIST_GETTER,
    ]),
    warehousesListOptions() {
      return this.WAREHOUSES_LIST_GETTER.map(data => ({
        id: data.id,
        label: data.wareHouseTypeName,
        default: data.isDefault,
      }))
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
    this.GET_WAREHOUSES_LIST_ACTION({
      ...this.decentralization,
      onSuccess: () => {
        this.warehousesListOptions.forEach(warehouse => {
          if (warehouse.default === 1) {
            this.warehouseSelected = warehouse.id
          }
        })
      },
    })
    this.$nextTick(() => this.$refs.focusInput.$el.querySelector('input').focus())
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
      GET_PRODUCTS_ACTION,
      GET_WAREHOUSES_LIST_ACTION,
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
      const [sysDate, poProducts, ProductInfo, poPromotionProducts, promotionProductsInfo, Snb, poNum, id, warehouseId, warehouseName] = data
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
      this.defaultWarehouse = { warehouseTypeId: warehouseId, warehouseName }
    },
    // ----------------------------Nhap hang-----------------------

    // -----------------------------Nhap dieu chinh------------------------
    dataFromInputAdjust(data) {
      const [sysDate, importAdjustsDetail, importAdjustInfo, id, description, warehouseId, warehouseName] = data
      this.rowsProduct = [...importAdjustsDetail]
      this.note = description
      this.status = 1 // inputTypeSelected
      this.poNo = null // poNumber
      this.poId = id // poId
      this.internalNumber = null
      this.billDate = sysDate
      this.poAdjustInfo = { ...importAdjustInfo }
      this.defaultWarehouse = { warehouseTypeId: warehouseId, warehouseName }
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
    // nhập hàng km tay + nhập vay mượn dùng warehouseType - còn lại dùng warehouseSelected
    create() {
      this.isFieldCanCheck = false
      // this mean status != -1
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
        // if import type = choose poConfirm -> check redInvoice
        if (this.status === 0) {
          this.$refs.formContainer.validate().then(success => {
            if (success) {
              this.CREATE_SALE_IMPORT_ACTION({
                ...obj,
                wareHouseTypeId: this.defaultWarehouse.warehouseTypeId,
              })
            }
          })
        }
        // nhap dieu chinh
        if (this.status === 1) {
          this.CREATE_SALE_IMPORT_ACTION({
            ...obj,
            wareHouseTypeId: this.defaultWarehouse.warehouseTypeId,
          })
        }
        // nhap vay muon
        if (this.status === 2) {
          this.CREATE_SALE_IMPORT_ACTION({
            ...obj,
            wareHouseTypeId: this.warehouseSelected,
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
              wareHouseTypeId: this.warehouseSelected,
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
          // auto focus when choose products
          this.productIdSelected = product.item.productCode
          setTimeout(() => {
            document.getElementById(this.productIdSelected).focus()
          }, 100)
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
    setDefaultWarehouse() {
      this.warehouseSelected = this.warehousesListOptions.find(warehouse => warehouse.default === 1).id
    },
    focusInputSearch() {
      this.$refs.searchProduct.$el.querySelector('input').focus()
      this.$refs.searchProduct.$el.querySelector('input').click()
    },
  },
}
</script>
