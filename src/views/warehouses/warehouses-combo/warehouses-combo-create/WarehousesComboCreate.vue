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
                maxlength="4000"
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
              style-class="vgt-table striped"
              compact-mode
              line-numbers
            >
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
                    type="number"
                    min="0"
                    :state="isPositive(comboListRows[props.index].numProduct,props.index)"
                    @change="onChangeQuantity(props.index)"
                  />
                </span>
                <span v-if="props.column.field === 'price'">
                  <b-form-input
                    v-model.number="comboListRows[props.index].price"
                    :state="isPositive(comboListRows[props.index].price,props.index)"
                    type="number"
                    min="0"
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
              <!--START Search bottom bar -->
              <div
                slot="table-actions-bottom"
                class="mx-1 my-2 px-2"
              >
                <tree-select
                  v-model="comboProductSelected"
                  class="w-35"
                  placeholder="Nhập mã hoặc tên sản phẩm"
                  :async="true"
                  :open-on-click="false"
                  :open-on-focus="false"
                  :auto-load-root-options="false"
                  :load-options="loadOptions"
                  @select="onComboSelected"
                >
                  <label
                    slot="option-label"
                    slot-scope="{ node }"
                    :class="labelClassName"
                  >
                    <strong>
                      {{ node.raw.productName }}
                    </strong>
                    <br>
                    {{ node.label }}
                  </label>
                </tree-select>
              </div>
              <!--END Search bottom bar -->
            </vue-good-table>
            <!-- END - Table combo list -->
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
              style-class="vgt-table striped"
              compact-mode
              line-numbers
            />
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
                  variant="someThing"
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
  </b-container>
</template>

<script>
import warehousesData from '@/@db/warehouses'
import { getNow } from '@core/utils/utils'
import commonData from '@/@db/common'
// eslint-disable-next-line no-unused-vars
import moment from 'moment'
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
  data() {
    return {
      componentKey: 0,
      //
      formId: 5,
      ctrlId: 7,
      //
      globalIndex: null,

      now: getNow(),

      tradingTypeOptions: warehousesData.tradingTypes,
      tradingTypeSelected: null,

      transDate: moment().format('YYYY-MM-DD'),
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
    comboDetails() {
      return this.COMBO_PRODUCTS_GETTER.map(data => ({
        id: data.id,
        comboCode: data.productCode,
        numProduct: data.numProduct,
        price: data.productPrice,
        productName: data.productName,
      }))
    },

    comboProductOptions() {
      return this.COMBO_PRODUCTS_GETTER.map(data => ({
        id: Number(data.id),
        label: data.productCode,
        productName: data.productName,
        numProduct: data.numProduct,
        productPrice: data.productPrice,
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
      const index = this.comboListRows.findIndex(e => e.selectedComboId === item.id)
      const obj = {
        id: item.refProductId,
        comboCode: item.label,
        numProduct: item.numProduct || 0,
        price: item.productPrice || 0,
        comboName: item.productName,
        selectedComboId: item.id,
      }
      if (index === -1) {
        this.comboListRows.push(obj)
        const newIndex = this.comboListRows.findIndex(e => e.selectedComboId === item.id)
        this.globalIndex = newIndex
        this.GET_COMBO_PRODUCTS_DETAILS_ACTION({
          id: item.id,
          formId: this.formId,
          ctrlId: this.ctrlId,
        })
      } else {
        this.comboListRows[index].price += obj.price
        this.comboListRows[index].numProduct += obj.numProduct
        this.updateComboExchangeQuantity(index)
      }
    },

    loadOptions({ searchQuery, callback }) {
      if (searchQuery.length >= commonData.minSearchLength - 1) {
        this.GET_COMBO_PRODUCTS_ACTION({
          keyWord: searchQuery.trim(),
          fromId: this.fromId,
          ctrlId: this.ctrlId,
        })
        callback(null, this.comboProductOptions)
      }
    },
    deleteProduct(index) {
      for (let i = 0; i <= this.comboExchangeRows.length - 1; i += 1) {
        if (this.comboExchangeRows[i].comboCode === this.comboListRows[index].comboCode) {
          this.comboExchangeRows.splice(i, 1)
          i -= 1
        }
      }
      this.comboListRows.splice(index, 1)
    },
    save() {
      const obj = {
        details: this.detailsProductFilter,
        note: this.note,
        transDate: this.transDate,
        transType: Number(this.tradingTypeSelected),
        formId: this.formId,
        ctrlId: this.ctrlId,
      }
      console.log(obj)
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
    },
    // Change quantity--------------------------

    isPositive(num) {
      if (num < 0) {
        return false
      }
      return true
    },
  },
}
</script>
