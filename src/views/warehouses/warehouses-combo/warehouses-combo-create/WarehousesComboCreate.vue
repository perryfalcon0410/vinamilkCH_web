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
                slot="table-column"
                slot-scope="props"
              >
                <span
                  v-if="props.column.label =='Chức năng'"
                >
                  <b-icon-plus
                    class="ml-1"
                    scale="2"
                    @click="newRow"
                  />
                </span>
              </template>
              <template
                slot="table-row"
                slot-scope="props"
              >
                <span v-if="props.column.field == 'comboCode'">
                  <tree-select
                    v-model="comboListRows[props.index].selected"
                    :options="comboProductOptions"
                    placeholder="Nhập mã hoặc tên sản phẩm"
                    @select="comboSelected"
                    @close="close(props.index)"
                  />
                  {{ comboListRows[props.index].selected }}
                </span>
                <span v-if="props.column.field == 'numProduct'">
                  <b-form-input
                    v-model="comboListRows[props.index].refProductId"
                    type="number"
                    min="0"
                  />
                  {{ comboListRows.refProductId }}
                </span>
                <span v-if="props.column.field == 'price'">
                  <b-form-input
                    :type="number"
                  />
                </span>
                <span v-if="props.column.field == 'comboName'">
                  {{ props.formattedRow[props.column.field] }}
                </span>
                <span v-if="props.column.field == 'function'">
                  <b-icon-trash-fill
                    color="red"
                    class="ml-1"
                    @click="deleteProduct(props.index)"
                  />
                </span>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
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
                  @click="test()"
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
import lodash from 'lodash'
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
} from '../store-module/type'

export default {
  data() {
    return {
      now: getNow(),
      tradingTypeOptions: warehousesData.tradingTypes,
      tradingTypeSelected: null,
      comboCommonInfo: [],

      comboListRows: [
        {
          id: '',
          comboCode: '',
          numProduct: '',
          price: '',
          comboName: '',
          selected: null,
          function: '',
        },
      ],
      // -----------------Combo List-----------------
      comboListColumns: [
        {
          label: 'Mã combo',
          field: 'comboCode',
          sortable: false,
          width: '30%',
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
          field: 'numProduct',
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
      comboExchangeRows: [
        {
          comboCode: 'CB_TET_001',
          productCode: '04DC10',
          exchangeRate: '2',
          quantity: '200',
          price: '6300',
          productName: 'Thức uống cacao lúa mạch 180ml',
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
        comboName: data.productName,
      }))
    },

    comboProductOptions() {
      return this.COMBO_PRODUCTS_GETTER.map(data => ({
        id: data.id,
        label: data.productCode,
      }))
    },

    comboProductsInfo() {
      return this.COMBO_PRODUCTS_INFO_GETTER
    },

    comboExchangeProducts() {
      return this.COMBO_PRODUCTS_DETAILS_GETTER.map(data => ({
        comboCode: data.comboProductCode,
        productCode: data.productCode,
        exchangeRate: data.factor,
        price: data.productPrice,
        productName: data.productName,
      }))
    },

  },
  watch: {

  },
  mounted() {
    this.tradingTypeSelected = this.tradingTypeOptions[0].id
    this.GET_COMBO_PRODUCTS_ACTION({
      formId: 5, // hard code
      ctrlId: 7, // hard code
    })
  },
  methods: {
    ...mapActions(WAREHOUSES_COMBO, [
      GET_COMBO_PRODUCTS_ACTION,
      GET_COMBO_PRODUCTS_DETAILS_ACTION,
    ]),
    newRow() {
      this.comboListRows = [...this.comboListRows,
        {
          comboCode: '',
          numProduct: '',
          price: '',
          comboName: '',
          selected: null,
          function: '',
        },
      ]
    },
    comboSelected(item) {
      if (item.id) {
        this.GET_COMBO_PRODUCTS_DETAILS_ACTION({
          id: item.id,
          formId: 9,
          ctrlId: 6,
        })
      }
    },
    close(index) {
      console.log(this.comboProductsInfo)
      this.comboListRows[index] = lodash.clone(this.comboProductsInfo)
      console.log(this.comboListRows)
    },
    deleteProduct(index) {
      console.log(index)
      this.comboListRows.splice(index, 1)
    },
  },
}
</script>
