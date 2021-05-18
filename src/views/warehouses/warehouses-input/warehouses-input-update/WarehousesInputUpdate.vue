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
                {{ transDate }} lúc {{ transTime }}
              </b-col>
            </b-row>
            <!-- END - Date -->

            <!-- START - ID and Type -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Mã nhập hàng"
                  label-for="transCode"
                >
                  <b-form-input
                    id="transCode"
                    v-model="transCode"
                    maxlength="40"
                    disabled
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Loại nhập"
                  label-for="importType"
                >
                  <b-form-input
                    id="import-type"
                    v-model="importTypeName"
                    disabled
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
                v-model="wareHouseTypeName"
                disabled
              />
            </b-form-group>
            <!-- END -  Stock  -->

            <!-- START - Bill Number and Date -->
            <b-form-row>
              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  rules="required"
                  name="Số hóa đơn"
                >
                  <div>
                    Số hóa đơn <sup class="text-danger">*</sup>
                  </div>
                  <b-form-input
                    v-model="billNumber"
                    :state="touched ? passed : null"
                    :disabled="!canEdit"
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
                  <div>
                    Ngày hóa đơn <sup class="text-danger">*</sup>
                  </div>
                  <b-input-group
                    id="form-input-bill-date"
                    class="input-group-merge"
                  >
                    <vue-flat-pickr
                      v-model="billDate"
                      :config="configDate"
                      class="form-control h9"
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
                  rules="required"
                  name="Số nội bộ"
                >
                  <div class="mt-1">
                    Số nội bộ <sup class="text-danger">*</sup>
                  </div>
                  <b-form-input
                    v-model="internalNumber"
                    :state="touched ? passed : null"
                    :disabled="!canEdit"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  :rules="importType === '1' ? 'required' : ''"
                  name="PO No"
                >
                  <div class="mt-1">
                    PO No
                    <sup
                      v-show="importType === '1'"
                      class="text-danger"
                    >*</sup>
                  </div>
                  <b-input-group
                    id="PoNo"
                    class="input-group-merge"
                  >
                    <b-form-input
                      v-model="poNumber"
                      :state="importType === '1' && touched ? passed : null"
                      :disabled="!canEdit"
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
            </b-form-row>
            <!-- END -   Internal number and PO no -->

            <!-- START -   Note -->
            <b-form-group
              label="Ghi chú"
              label-class="mt-1"
              label-for="note"
            >
              <b-form-textarea
                id="note"
                v-model="note"
                maxlength="4000"
                :disabled="!isTransDate"
              />
            </b-form-group>
            <!-- END -   Note -->
          </b-col>
          <!-- END - Form -->

          <!-- START - List -->
          <b-col
            class="bg-white shadow rounded mt-1 mt-xl-0"
          >
            <div v-if="totalProductQuantity > 0">
              <!-- START - Table Product -->
              <div class="d-inline-flex rounded-top px-1 my-1">
                <strong>
                  Sản phẩm
                </strong>
              </div>

              <vue-good-table
                :columns="columns"
                :rows="products"
                style-class="vgt-table striped"
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
                  <b-row
                    v-if="props.column.field === 'quantity'"
                    class="mx-0"
                    align-h="end"
                  >
                    {{ totalProductQuantity }}
                  </b-row>

                  <b-row
                    v-else-if="props.column.field === 'totalPrice'"
                    class="mx-0"
                    align-h="end"
                  >
                    {{ totalProductPrice }}
                  </b-row>
                </template>
                <!-- START - Column filter -->
              </vue-good-table>
              <!-- END - Table Product -->
            </div>

            <div v-if="showPromotionsTable">
              <!-- START - Table Product promotion -->
              <div class="d-inline-flex rounded-top px-1 my-1">
                <strong>
                  Hàng khuyến mãi
                </strong>
              </div>

              <vue-good-table
                :columns="columns"
                :rows="promotions"
                style-class="vgt-table striped"
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
                  <b-row
                    v-if="props.column.field === 'quantity'"
                    class="mx-0"
                    align-h="end"
                  >
                    {{ totalPromotionQuantity }}
                  </b-row>

                  <b-row
                    v-else-if="props.column.field === 'totalPrice'"
                    class="mx-0"
                    align-h="end"
                  >
                    {{ totalPromotionPrice }}
                  </b-row>
                </template>
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div v-if="props.column.field === 'quantity' && canEdit">
                    <b-input
                      v-model="props.row.quantity"
                      size="sm"
                      :number="true"
                      :value="props.row.quantity"
                      @change="updateQuantity(props.row.originalIndex, props.row.quantity)"
                    />
                  </div>
                  <div
                    v-else-if="props.column.field === 'feature' && canEdit"
                    align-h="center"
                  >
                    <b-icon-x
                      v-b-popover.hover.top="'Xóa'"
                      class="cursor-pointer ml-1"
                      @click="onClickDeleteButton(props.row.originalIndex)"
                    />
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
                <b-form-input
                  v-model="productSearch"
                  style="width: 30%"
                  placeholder="Nhập mã hoặc tên sản phẩm"
                  type="text"
                  autocomplete="off"
                  @focus="focus"
                  @blur="inputSearchFocusedSP = false"
                  @input="loadProducts"
                  @keyup.enter="keyEnter"
                  @keydown.up="keyUp"
                  @keydown.down="keyDown"
                  @click="click"
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
                        v-for="(product, index) in allProducts"
                        :key="index"
                        class="my-1 cursor-pointer"
                        :class="{'item-active': index === cursor}"
                        @click="selectProduct(product)"
                        @mouseover="$event.target.classList.add('item-active')"
                        @mouseout="$event.target.classList.remove('item-active')"
                      >
                        <b>{{ product.productCode }}</b> - {{ product.productName }}
                      </b-row>
                    </b-col>
                  </b-container>
                </b-collapse>
              </div>
            </div>
            <!-- END - Table Product promotion -->

            <!-- START - Button -->
            <b-row class="m-1 justify-content-end">
              <b-button-group>
                <b-button
                  v-if="isTransDate"
                  class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder"
                  variant="someThing"
                  @click="updateReceipt"
                >
                  <b-icon
                    icon="download"
                    class="mr-1"
                  />
                  LƯU
                </b-button>

                <b-button
                  class="d-flex align-items-center ml-1 rounded text-uppercase"
                  @click="navigateBack"
                >
                  <b-icon-x
                    scale="1.5"
                    class="mr-05"
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
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  number,
  required,
} from '@/@core/utils/validations/validations'
import {
  formatDateToLocale, getTimeOfDate, formatNumberToLocale, replaceDotWithComma,
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
  },
  data() {
    return {
      warehouse: null,
      billNumber: null,
      billDate: null,
      internalNumber: null,
      poNumber: null,
      poId: null,
      note: null,
      transCode: null,
      transDate: null,
      transTime: null,
      wareHouseTypeName: null,
      today: this.$nowDate,
      importTypeName: null,
      warehousesInputOptions: warehousesData.inputTypes,
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        allowInvalidPreload: false,
      },

      // validation rules
      number,
      required,

      columns: [
        {
          label: 'Mã hàng',
          field: 'productCode',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
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
          field: 'name',
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
          field: 'soNo',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      promotions: [],
      cursor: -1,
      productSearch: null,
      inputSearchFocusedSP: false,
      totalPromotionQuantity: 0,
    }
  },

  computed: {
    receipt() {
      return this.RECEIPT_BY_ID_GETTER()
    },
    products() {
      return this.PRODUCTS_BY_ID_GETTER().map(data => ({
        productCode: data.productCode,
        quantity: replaceDotWithComma(formatNumberToLocale(Number(data.quantity))),
        price: replaceDotWithComma(formatNumberToLocale(Number(data.price))),
        name: data.productName,
        unit: data.unit,
        totalPrice: replaceDotWithComma(formatNumberToLocale(Number(data.totalPrice))),
        soNo: data.soNo,
      }))
    },
    totalProductQuantity() {
      return replaceDotWithComma(formatNumberToLocale(Number(this.PRODUCTS_BY_ID_GETTER().reduce((accum, item) => accum + Number(item.quantity), 0))))
    },
    totalProductPrice() {
      return replaceDotWithComma(formatNumberToLocale(Number(this.PRODUCTS_BY_ID_GETTER().reduce((accum, item) => accum + Number(item.totalPrice), 0))))
    },
    getPromotions() {
      return this.PROMOTIONS_BY_ID_GETTER().map(data => ({
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
    },
    getTotalPromotionQuantity() {
      return replaceDotWithComma(formatNumberToLocale(Number(this.promotions.reduce((accum, item) => accum + Number(item.quantity), 0))))
    },
    totalPromotionPrice() {
      return 0
    },
    id() {
      return this.$route.params.id
    },
    importType() {
      return this.$route.params.type
    },
    allProducts() {
      return this.PRODUCTS_GETTER().map(data => ({
        productId: data.id,
        productCode: data.productCode,
        quantity: 1,
        price: 0,
        productName: data.productName,
        unit: data.uom1,
        totalPrice: 0,
        soNo: '',
      }))
    },
    showPromotionsTable() {
      return this.totalPromotionQuantity > 0 || (this.$route.params.type === 0 && this.receipt.poId == null) // hiện table hàng khuyến mãi nếu số lượng > 0 hoặc là phiếu nhập tay khuyến mãi
    },
    isTransDate() {
      return this.today === this.transDate
    },
    canEdit() {
      return this.today === this.transDate && this.$route.params.type === 0 && this.receipt.poId == null
    },
  },

  watch: {
    receipt() {
      this.transCode = this.RECEIPT_BY_ID_GETTER().transCode
      this.transDate = formatDateToLocale(this.RECEIPT_BY_ID_GETTER().transDate)
      this.transTime = getTimeOfDate(this.RECEIPT_BY_ID_GETTER().transDate)
      this.wareHouseTypeName = this.RECEIPT_BY_ID_GETTER().wareHouseTypeName
      this.billNumber = this.RECEIPT_BY_ID_GETTER().redInvoiceNo
      this.billDate = formatDateToLocale(this.RECEIPT_BY_ID_GETTER().orderDate) || formatDateToLocale(this.RECEIPT_BY_ID_GETTER().adjustmentDate) || formatDateToLocale(this.RECEIPT_BY_ID_GETTER().borrowDate)
      this.internalNumber = this.RECEIPT_BY_ID_GETTER().internalNumber
      this.poNumber = this.RECEIPT_BY_ID_GETTER().poNumber
      this.note = this.RECEIPT_BY_ID_GETTER().note
      this.poId = this.RECEIPT_BY_ID_GETTER().poId
      this.importTypeName = this.warehousesInputOptions[this.$route.params.type].label
    },
    getPromotions() {
      this.promotions = [...this.getPromotions]
    },
    getTotalPromotionQuantity() {
      this.totalPromotionQuantity = this.getTotalPromotionQuantity
    },
  },

  mounted() {
    this.GET_RECEIPT_BY_ID_ACTION(`${this.id}?type=${this.importType}&formId=5&ctrlId=7`)
    this.GET_PRODUCTS_BY_ID_ACTION(`${this.id}?type=${this.importType}&formId=5&ctrlId=7`)
  },

  methods: {
    ...mapGetters(WAREHOUSEINPUT, {
      RECEIPT_BY_ID_GETTER,
      PRODUCTS_BY_ID_GETTER,
      PROMOTIONS_BY_ID_GETTER,
      PRODUCTS_GETTER,
    }),
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPT_BY_ID_ACTION,
      GET_PRODUCTS_BY_ID_ACTION,
      GET_PRODUCTS_ACTION,
      UPDATE_RECEIPT_ACTION,
    ]),

    navigateBack() {
      this.$router.back()
    },
    loadProducts() {
      this.cursor = -1
      if (this.productSearch === null) return
      if (this.productSearch.length >= commonData.minSearchLength) {
        this.inputSearchFocusedSP = true

        this.GET_PRODUCTS_ACTION({
          keyWord: this.productSearch?.trim(),
          formId: 5,
          ctrlId: 7,
        })
      } else {
        this.inputSearchFocusedSP = false
      }
    },
    selectProduct(product) {
      this.productSearch = null
      const existedPromotionIndex = this.promotions.findIndex(promotion => promotion.productCode === product.productCode)
      if (existedPromotionIndex === -1) {
        this.promotions.push({
          id: -1,
          productId: product.productId,
          productCode: product.productCode,
          quantity: 1,
          price: product.price,
          name: product.productName,
          unit: product.unit,
          totalPrice: 0,
          soNo: '',
        })
      } else {
        this.promotions[existedPromotionIndex].quantity += product.quantity
      }
    },
    focus() {
      this.cursor = -1
      this.inputSearchFocusedSP = this.productSearch !== null && this.productSearch.length >= commonData.minSearchLength
    },
    keyUp() {
      if (this.cursor > 0) {
        this.cursor -= 1
      }
    },
    keyDown() {
      if (this.cursor < this.allProducts.length) {
        this.cursor += 1
      }
    },
    keyEnter() {
      if (this.inputSearchFocusedSP && this.allProducts[this.cursor]) {
        this.selectProduct(this.allProducts[this.cursor])
        this.inputSearchFocusedSP = false
      }
    },
    updateQuantity(index, value) {
      this.promotions[index].quantity = value + 0
    },
    updateReceipt() {
      const updatedPromotions = this.promotions.map(data => ({
        id: data.id,
        productId: data.productId,
        quantity: data.quantity,
      }))
      this.UPDATE_RECEIPT_ACTION({
        id: this.id,
        type: this.importType,
        note: this.note,
        redInvoiceNo: this.billNumber,
        orderDate: this.billDate,
        internalNumber: this.internalNumber,
        poNumber: this.poNumber,
        lstUpdate: updatedPromotions,
        formId: 5,
        ctrlId: 7,
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
</style>
