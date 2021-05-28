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
                  label="Mã giao dịch"
                  label-for="id"
                >
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
                  label="Loại giao dịch"
                  label-for="id"
                >
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
              label="Ghi chú"
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
            <!-- START - Table combo list -->
            <div class="d-inline-flex rounded-top px-1 my-1">
              <strong>
                Danh sách combo
              </strong>
            </div>
            <vue-good-table
              :columns="comboListColumns"
              :rows="comboListRows"
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
              <template
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'numProduct'"
                  class="mx-0"
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
                    maxlength="10"
                    :state="isPricePositive(comboListRows[props.index].numProduct,props.index)"
                    @change="onChangeQuantity(props.row.originalIndex)"
                    @keypress="$onlyNumberInput"
                  />
                </span>
                <span v-if="props.column.field === 'price'">
                  <b-form-input
                    v-model.number="comboListRows[props.index].price"
                    :state="isPositive(comboListRows[props.index].price,props.index)"
                    maxlength="10"
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

              <!-- START - Table Footer -->
              <template slot="table-actions-bottom">
                <!-- START - Prodduct input -->
                <b-col
                  cols="5"
                  class="my-1"
                >
                  <b-form-input
                    v-model.trim="productInfos.productName"
                    placeholder="Nhập mã hoặc tên sản phẩm"
                    @focus="focusProduct"
                    @input="loadProducts"
                    @blur="isFocusedInputProduct = false"
                    @keyup.enter="keyEnter"
                    @keydown.up="keyUp"
                    @keydown.down="keyDown"
                  />
                  <!-- START - Product Popup -->
                  <b-collapse
                    v-model.trim="isFocusedInputProduct"
                    class="position-absolute w-80"
                    style="zIndex:1"
                  >
                    <b-container
                      class="my-1 px-1 bg-white rounded border border-primary shadow-lg"
                    >
                      <b-col>
                        <b-row
                          v-for="(product, index) in products"
                          :key="index"
                          class="mx-0 my-1 border-bottom cursor-pointer"
                          :class="{'item-active': index === cursor}"
                          @click="onComboSelected(product)"
                          @mouseover="$event.target.classList.add('item-active')"
                          @mouseout="$event.target.classList.remove('item-active')"
                        >
                          <!-- START - Section Label -->
                          <b-col>
                            <b-col
                              class="text-dark"
                            >
                              <strong> {{ product.productName }}</strong>
                              <br>
                              {{ product.label }}
                              <!-- END - Section Label -->
                            </b-col>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-container>
                  </b-collapse>
                <!-- END - Product Popup -->

                </b-col>
              <!-- END - Prodduct input -->

              </template>
            </vue-good-table>
            <!-- END - Table Footer -->
            <br>
            <!-- START - Table combo exchange -->
            <div class="d-inline-flex rounded-top px-1 my-1">
              <strong>
                Quy đổi combo
              </strong>
            </div>
            <vue-good-table
              :key="componentKey"
              :columns="comboExchangeColumns"
              :rows="comboExchangeRows"
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
              <template
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'quantity'"
                  class="mx-0"
                  align-h="end"
                >
                  {{ $formatNumberToLocale(totalExchangeQuantity) }}
                </b-row>
              </template>
            </vue-good-table>
            <!-- END - Table combo exchange -->
            <!-- START - Button -->
            <b-row class="mr-0 my-1 justify-content-end">
              <b-button-group>
                <b-button
                  class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center mr-1"
                  variant="someThing"
                  @click="save"
                >
                  <b-icon
                    icon="download"
                  />
                  Lưu
                </b-button>

                <b-button
                  class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
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

import ConfirmCloseModal from '@core/components/confirm-close-modal/ConfirmCloseModal.vue'
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
    ConfirmCloseModal,
  },
  data() {
    return {
      showConfirmCloseModal: false,
      componentKey: 0,
      totalExchangeQuantity: 0,
      // Search combo
      isFocusedInputProduct: false,
      productInfos: {
        productName: null,
      },
      cursorCustomer: -1, // Con trỏ chuột ở pop up = -1
      cursor: -1,
      // Search Combo
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
      comboProductQuery: null,
      comboProductSelected: null,
      // Search options
      // -----------------Combo List-----------------
      comboListColumns: [
        {
          label: 'Mã combo',
          field: 'comboCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'numProduct',
          filterOptions: {
            enabled: true,
          },
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tên combo',
          field: 'comboName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Chức năng',
          field: 'function',
          sortable: false,
        },
      ],
      // -----------------Combo List-----------------

      // -----------------Combo Exchange-----------------
      comboExchangeColumns: [
        {
          label: 'Mã combo',
          field: 'comboCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tỉ lệ quy đổi',
          field: 'exchangeRate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          filterOptions: {
            enabled: true,
          },
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
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

    products() {
      return this.COMBO_PRODUCTS_GETTER.map(data => ({
        id: Number(data.id),
        label: data.productCode,
        productName: data.productName,
        numProduct: data.numProduct,
        productPrice: data.productPrice,
        status: data.status,
      }))
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

    onComboSelected(item) {
      this.productInfos.productName = null
      const index = this.comboListRows.findIndex(e => e.selectedComboId === item.id)
      const obj = {
        id: item.id,
        comboCode: item.label,
        numProduct: 1,
        price: item.productPrice || 0,
        comboName: item.productName,
        selectedComboId: item.id,
        status: item.status,
      }
      if (index === -1) {
        this.comboListRows.push(obj)
        const newIndex = this.comboListRows.findIndex(e => e.selectedComboId === item.id)
        this.globalIndex = newIndex
        this.GET_COMBO_PRODUCTS_DETAILS_ACTION({
          id: item.id,
          status: 1, // TRINH THAI bảo thế
          formId: this.formId,
          ctrlId: this.ctrlId,
        })
      } else {
        this.comboListRows[index].numProduct += obj.numProduct
        this.updateComboExchangeQuantity(index)
        this.totalExchangeQuantity = this.comboExchangeRows.reduce((accum, i) => accum + Number(i.quantity), 0)
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
      if (this.comboListRows.length > 0) {
        this.showConfirmCloseModal = true
      } else {
        this.$router.push({ name: 'warehouses-combo' })
      }
    },

    focusProduct() {
      if (this.productInfos.productName) {
        this.isFocusedInputProduct = this.productInfos.productName.length >= commonData.minSearchLength
      }
    },
    keyUp() {
      if (this.cursor > 0) {
        this.cursor -= 1
      }
    },
    keyDown() {
      if (this.cursor < this.products.length) {
        this.cursor += 1
      }
    },
    keyEnter() {
      if (this.isFocusedInputProduct && this.products[this.cursor]) {
        this.selectProduct(this.products[this.cursor])
        this.isFocusedInputProduct = false
      }
    },
    loadProducts() {
      this.cursor = -1
      if (this.productInfos.productName.length >= commonData.minSearchLength) {
        this.isFocusedInputProduct = true
        const searchData = {
          keyWord: this.productInfos.productName,
          formId: this.formId,
          ctrlId: this.ctrlId,
        }
        this.GET_COMBO_PRODUCTS_ACTION(searchData)
      } else {
        this.isFocusedInputProduct = false
      }
    },
  },
}
</script>
