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
                <b-form-group
                  label-for="id"
                >
                  <div
                    class="mt-sm-1 mt-xl-0"
                  >
                    Mã giao dịch
                  </div>
                  <b-form-input
                    id="id"
                    v-model="id"
                    maxlength="40"
                    trim
                    disabled
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label-for="id"
                >
                  <div
                    class="mt-sm-1 mt-xl-0"
                  >
                    Loại giao dịch
                  </div>
                  <tree-select
                    v-model="tradingTypeSelected"
                    :options="tradingTypeOptions"
                    no-options-text="Không có dữ liệu"
                  />
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - ID and Type -->

            <!-- START -   Note -->
            <b-form-group
              label-for="note"
            >
              <div
                class="mt-sm-1 mt-xl-0"
              >
                Ghi chú
              </div>
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
            <!-- START - Table combo list -->
            <div class="d-inline-flex rounded-top px-1 my-1">
              <strong class="text-brand-1">
                Danh sách combo
              </strong>
            </div>
            <vue-good-table
              :columns="comboListColumns"
              :rows="comboListRows"
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
              <template
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'numProduct'"
                  v-show="totalQuantity"
                  class="mx-0 h7 text-brand-3"
                  align-h="end"
                >
                  {{ $formatNumberToLocale(totalQuantity) }}
                </b-row>
              </template>
              <template
                slot="table-row"
                slot-scope="props"
              >
                <span v-if="props.column.field === 'comboCode'">
                  {{ comboListRows[props.index].comboCode }}
                </span>
                <span v-if="props.column.field === 'numProduct'">
                  <b-form-input
                    v-model.number="comboListRows[props.index].numProduct"
                    maxlength="7"
                    :state="isPricePositive(comboListRows[props.index].numProduct,props.index)"
                    @change="onChangeQuantity(props.row.originalIndex)"
                    @keyup.enter="onChangeQuantity(props.row.originalIndex)"
                    @keypress="$onlyNumberInput"
                  />
                </span>
                <span v-if="props.column.field === 'price'">
                  <b-form-input
                    v-model.number="comboListRows[props.index].price"
                    :state="isPositive(comboListRows[props.index].price,props.index)"
                    maxlength="12"
                    @keypress="$onlyNumberInput"
                  />
                </span>
                <span v-if="props.column.field === 'comboName'">
                  {{ comboListRows[props.index].comboName }}
                </span>
                <span v-if="props.column.field === 'function'">
                  <b-icon-trash-fill
                    color="red"
                    class="ml-1"
                    @click="deleteProduct(props.index)"
                  />
                </span>
              </template>

              <!-- START - Table action bottom -->
              <div
                slot="table-actions-bottom"
                class="m-2"
              >
                <vue-autosuggest
                  v-model="comboSearchQuery"
                  :suggestions="products"
                  :input-props="{
                    id:'autosuggest__input',
                    class:'form-control w-25',
                    placeholder:'Nhập mã hoặc tên sản phẩm'
                  }"
                  @input="loadProducts"
                  @selected="onComboSelected"
                >
                  <template slot-scope="{ suggestion }">
                    <div class="cursor-pointer">
                      <b>{{ suggestion.item.productCode }}</b> - {{ suggestion.item.productName }}
                    </div>
                  </template>
                </vue-autosuggest>
              </div>
              <!-- END - Table action bottom -->

            </vue-good-table>
            <!-- END - Table Footer -->
            <br>
            <!-- START - Table combo exchange -->
            <div class="d-inline-flex rounded-top px-1 my-1">
              <strong class="text-brand-1">
                Quy đổi combo
              </strong>
            </div>
            <vue-good-table
              :key="componentKey"
              :columns="comboExchangeColumns"
              :rows="comboExchangeRows"
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
              <template
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'quantity'"
                  v-show="totalExchangeQuantity"
                  class="mx-0 h7 text-brand-3"
                  align-h="end"
                >
                  {{ $formatNumberToLocale(totalExchangeQuantity) }}
                </b-row>
              </template>
              <template
                slot="table-row"
                slot-scope="props"
              >
                <div v-if="props.column.field === 'quantity'">
                  {{ props.formattedRow[props.column.field] }}
                </div>
              </template>
            </vue-good-table>
            <!-- END - Table combo exchange -->
            <!-- START - Button -->
            <b-row class="mr-0 my-1 justify-content-end">
              <b-button-group>
                <b-button
                  class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center mr-1"
                  variant="someThing"
                  @click="save"
                >
                  <b-icon
                    icon="download"
                  />
                  Lưu
                </b-button>

                <b-button
                  class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center"
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
            <!-- END - List -->

          </b-col>
        </b-row>
      </b-col>
    </validation-observer>
    <confirm-close-modal
      :visible="showConfirmCloseModal"
      @close="showConfirmCloseModal = false"
    />
  </b-container>
</template>

<script>
import warehousesData from '@/@db/warehouses'
import { formatVniDateToISO } from '@/@core/utils/filter'
import { getNow } from '@/@core/utils/utils'
import commonData from '@/@db/common'
import { VueAutosuggest } from 'vue-autosuggest'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  WAREHOUSES_COMBO,
  COMBO_PRODUCTS_GETTER,
  COMBO_PRODUCTS_INFO_GETTER,
  COMBO_PRODUCTS_DETAILS_GETTER,
  GET_COMBO_PRODUCTS_ACTION,
  GET_COMBO_PRODUCTS_DETAILS_ACTION,
  CREATE_COMBO_PRODUCT_ACTION,
} from '../store-module/type'

export default {
  components: {
    VueAutosuggest,
  },
  data() {
    return {
      showConfirmCloseModal: false,
      componentKey: 0,
      totalExchangeQuantity: 0,
      // Search combo
      //
      formId: 5,
      ctrlId: 7,
      //
      globalIndex: null,

      now: getNow(),

      tradingTypeOptions: warehousesData.tradingTypes,
      tradingTypeSelected: null,

      transDate: this.$nowDate,
      comboExchangeRows: [],
      comboListRows: [],

      note: null,
      // Search options
      comboSearchQuery: null,
      products: [{ data: '' }],
      // Search options
      // -----------------Combo List-----------------
      comboListColumns: [
        {
          label: 'Mã combo',
          field: 'comboCode',
          sortable: false,
          type: 'number',
          thClass: 'text-left',
          tdClass: 'text-left',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Số lượng',
          field: 'numProduct',
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          filterOptions: {
            enabled: true,
          },
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tên combo',
          field: 'comboName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: '',
          field: 'function',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      // -----------------Combo List-----------------

      // -----------------Combo Exchange-----------------
      comboExchangeColumns: [
        {
          label: 'Mã combo',
          field: 'comboCode',
          sortable: false,
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
        },
        {
          label: 'Tỉ lệ quy đổi',
          field: 'exchangeRate',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          filterOptions: {
            enabled: true,
          },
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
      ],
      // -----------------Combo Exchange-----------------
    }
  },
  computed: {
    ...mapGetters(WAREHOUSES_COMBO, [
      COMBO_PRODUCTS_GETTER,
      COMBO_PRODUCTS_INFO_GETTER,
      COMBO_PRODUCTS_DETAILS_GETTER,
    ]),

    getProducts() {
      if (this.COMBO_PRODUCTS_GETTER) {
        return [{
          data: this.COMBO_PRODUCTS_GETTER.map(data => ({
            name: data.productCode,
            id: data.id,
            productCode: data.productCode,
            numProduct: 1,
            productPrice: data.productPrice,
            productName: data.productName,
            status: data.status,
          })),
        }]
      }
      return []
    },

    comboProductsInfo() {
      return this.COMBO_PRODUCTS_INFO_GETTER
    },

    comboExchangeProducts() {
      return this.COMBO_PRODUCTS_DETAILS_GETTER.map(data => ({
        id: data.id,
        comboCode: data.comboProductCode,
        productCode: data.productCode,
        exchangeRate: data.factor,
        price: data.productPrice,
        productName: data.productName,
      }))
    },
    detailsProductFilter() {
      return this.comboListRows.map(data => ({
        comboProductId: data.id,
        price: data.price,
        quantity: data.numProduct,
      }))
    },
    totalQuantity() {
      return this.comboListRows.reduce((accum, item) => accum + Number(item.numProduct), 0)
    },
    getTotalExchangeQuantity() {
      return this.comboExchangeRows.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
  },
  watch: {
    comboExchangeProducts() {
      this.comboExchangeRows = this.comboExchangeRows.concat(this.comboExchangeProducts)
      this.comboExchangeRows.forEach(e => {
        if (e.comboCode === this.comboListRows[this.globalIndex].comboCode) {
          e.quantity = this.comboListRows[this.globalIndex].numProduct * e.exchangeRate
        }
      })
    },
    getTotalExchangeQuantity() {
      this.totalExchangeQuantity = this.getTotalExchangeQuantity
    },
    getProducts() {
      this.products = [...this.getProducts]
    },
  },
  mounted() {
    this.tradingTypeSelected = this.tradingTypeOptions[0].id
  },
  methods: {
    ...mapActions(WAREHOUSES_COMBO, [
      GET_COMBO_PRODUCTS_ACTION,
      GET_COMBO_PRODUCTS_DETAILS_ACTION,
      CREATE_COMBO_PRODUCT_ACTION,
    ]),

    onComboSelected(combo) {
      if (combo) {
        const index = this.comboListRows.findIndex(e => e.selectedComboId === combo.item.id)
        const obj = {
          id: combo.item.id,
          comboCode: combo.item.productCode,
          numProduct: 1,
          price: combo.item.productPrice || 0,
          comboName: combo.item.productName,
          selectedComboId: combo.item.id,
          status: combo.item.status,
        }
        if (index === -1) {
          this.comboListRows.push(obj)
          const newIndex = this.comboListRows.findIndex(e => e.selectedComboId === combo.item.id)
          this.globalIndex = newIndex
          this.GET_COMBO_PRODUCTS_DETAILS_ACTION({
            id: combo.item.id,
            status: 1,
            formId: this.formId,
            ctrlId: this.ctrlId,
          })
        } else {
          this.comboListRows[index].numProduct += obj.numProduct
          this.updateComboExchangeQuantity(index)
          this.totalExchangeQuantity = this.comboExchangeRows.reduce((accum, i) => accum + Number(i.quantity), 0)
        }
        this.comboSearchQuery = null
        this.products = [{ data: null }]
      }
    },
    deleteProduct(index) {
      this.comboExchangeRows = this.comboExchangeRows.filter(e => e.comboCode !== this.comboListRows[index].comboCode)
      this.comboListRows.splice(index, 1)
    },
    save() {
      const obj = {
        details: this.detailsProductFilter,
        note: this.note,
        transDate: formatVniDateToISO(this.transDate),
        transType: Number(this.tradingTypeSelected),
        formId: this.formId,
        ctrlId: this.ctrlId,
      }
      this.CREATE_COMBO_PRODUCT_ACTION(obj)
    },
    // Change quantity--------------------------
    updateComboExchangeQuantity(index) {
      this.comboExchangeRows.forEach(e => {
        if (e.comboCode === this.comboListRows[index].comboCode) {
          e.quantity = this.comboListRows[index].numProduct * e.exchangeRate
        }
      })
      this.componentKey += 1
    },
    onChangeQuantity(index) {
      this.updateComboExchangeQuantity(index)
      this.totalExchangeQuantity = this.comboExchangeRows.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
    // Change quantity--------------------------

    isPositive(num) {
      if (num <= 0) {
        return false
      }
      return true
    },
    isPricePositive(num, index) {
      if (num <= 0) {
        this.comboListRows[index].quantity = 1
        return false
      }
      return true
    },
    navigateBack() {
      this.$router.push({ name: 'warehouses-combo' })
    },
    loadProducts(text) {
      if (text.length >= commonData.minSearchLength) {
        const searchData = {
          keyWord: text,
          formId: this.formId,
          ctrlId: this.ctrlId,
        }
        this.GET_COMBO_PRODUCTS_ACTION(searchData)
      }
    },
  },
}
</script>
