<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Header -->
    <b-row
      class="m-0"
    >
      <!-- START - Search -->
      <b-col
        sm="7"
        xl="4"
        class="px-0 mr-1 shadow mb-1 mb-sm-0"
      >
        <b-input
          v-model="searchOptions.keyWord"
          placeholder="Tìm sản phẩm (F3)"
          @focus="inputSearchFocused = true"
          @blur="inputSearchFocused = false"
          @keyup="onChangeKeyWord"
        />

        <!-- START - Product Popup -->
        <b-collapse
          v-model="inputSearchFocused"
          class="position-absolute w-100"
          style="zIndex:1"
        >
          <b-container
            class="my-1 px-1 bg-white rounded border border-primary shadow-lg"
          >
            <b-row
              v-for="(value,index) in productsSearch"
              :key="index"
              class="mx-0 my-1"
            >
              <!-- START - Section Image -->
              <b-col
                cols="2"
                class="px-0"
              >
                <b-img-lazy
                  src="https://pngimg.com/uploads/nuclear_bomb/nuclear_bomb_PNG18.png"
                  fluid
                  width="60px"
                />
              </b-col>
              <!-- END - Section Image -->

              <!-- START - Section Label -->
              <b-col>
                <b-col
                  class="text-dark"
                >
                  {{ value.productName }}
                </b-col>
                <b-col
                  class="my-1"
                >
                  {{ value.productCode }}
                </b-col>
                <b-col class="text-dark font-weight-bold">
                  {{ value.productPrice }}
                </b-col>
              </b-col>
            <!-- END - Section Label -->
            </b-row>
          </b-container>
        </b-collapse>
        <!-- END - Product Popup -->

      </b-col>
      <!-- END - Search -->

      <!-- START - Bills -->
      <div
        class="d-flex align-items-center justify-content-center bg-white rounded shadow mr-1 px-1"
      >
        Hóa đơn 1
        <b-icon-x
          class="cursor-pointer ml-1"
          font-scale="1.6"
        />
      </div>

      <div
        class="d-flex align-items-center justify-content-center bg-white rounded shadow mr-1 px-1"
      >
        Hóa đơn 2
        <b-icon-x
          class="cursor-pointer ml-1"
          font-scale="1.6"
        />
      </div>

      <div>
        <b-icon-plus
          font-scale="2.5"
          class="cursor-pointer"
        />
      </div>
      <!-- END - Bills -->

    </b-row>
    <!-- END - Header -->

    <!-- START - Body -->
    <b-row
      class="mx-0 my-1"
    >
      <!-- START - Section Table product and list suggestion  -->
      <b-col
        sm="12"
        lg="8"
        class="d-flex flex-column rounded px-0"
      >
        <!-- START - Table product -->
        <vue-good-table
          :columns="columns"
          :rows="onlineOrderByIds"
          style-class="vgt-table striped"
          compact-mode
          line-numbers
          class="shadow"
        >
          <!-- START - Columns -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'tableProductFeature'"
            >
              <b-icon-bricks />
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Columns -->

          <!-- START - Rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >

            <!-- START - tableProductInventory -->
            <b-row
              v-if="props.column.field === 'tableProductInventory'"
              align-v="center"
              align-h="end"
              class="mx-0"
            >
              {{ props.row.tableProductInventory }}
              <b-icon-shield-exclamation
                v-if="props.row.tableProductInventory < props.row.tableProductAmount"
                color="red"
                class="cursor-pointer ml-1"
                font-scale="1.5"
              />
            </b-row>
            <!-- END - tableProductInventory -->

            <!-- START - tableProductAmount -->
            <b-row
              v-else-if="props.column.field === 'tableProductAmount'"
              align-v="center"
              align-h="end"
              class="mx-0"
            >
              <b-icon-caret-down-fill
                class="cursor-pointer mr-1"
                font-scale="1.5"
                @click="decreaseAmount(props.row.tableProductId)"
              />
              {{ props.row.tableProductAmount }}
              <b-icon-caret-up-fill
                class="cursor-pointer ml-1"
                font-scale="1.5"
                @click="increaseAmount(props.row.tableProductId)"
              />
            </b-row>
            <!-- END - tableProductAmount -->

            <!-- START - tableProductFeature -->
            <div
              v-else-if="props.column.field === 'tableProductFeature'"
            >
              <b-icon-trash-fill
                color="red"
                class="cursor-pointer"
              />
            </div>
            <!-- END - tableProductFeature -->

            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->

        </vue-good-table>
        <!-- END - Table product -->

        <!-- START - List suggestion -->
        <sales-products :product-infos="productInfos" />
        <!-- END - List suggestion -->

      </b-col>
      <!-- END - Section Table product and list suggestion-->

      <!-- START - Section Form pay -->
      <sales-form @getOnlineOrderInfoForm="getOnlineOrderInfoForm" />
      <!-- END - Section Form pay -->

    </b-row>
    <!-- END - Body -->

  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import saleData from '@/@db/sale'
import SalesForm from './components/SalesForm.vue'
import SalesProducts from './components/SalesProducts.vue'
import {
  SALES,
  // Getter
  GET_PRODUCTS_GETTER,
  GET_PRODUCT_INFOS_GETTER,
  GET_TOP_SALE_PRODUCTS_GETTER,
  ONLINE_ORDER_BY_ID_GETTER,
  // Action
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_INFOS_ACTION,
  GET_TOP_SALE_PRODUCTS_ACTION,
  GET_ONLINE_ORDER_BY_ID_ACTION,
} from '../store-module/type'

export default {
  components: {
    SalesForm,
    SalesProducts,
  },
  data() {
    return {
      inputSearchFocused: false,

      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'tableProductId',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'tableProductName',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'tableProductUnit',
          sortable: false,
        },
        {
          label: 'Tồn kho',
          field: 'tableProductInventory',
          type: 'number',
          sortable: false,
          width: '80px',
        },
        {
          label: 'Số lượng',
          field: 'tableProductAmount',
          type: 'number',
          sortable: false,
          width: '120px',
        },
        {
          label: 'Đơn giá',
          field: 'tableProductUnitPrice',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'tableProductTotalPrice',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Chức năng',
          field: 'tableProductFeature',
          sortable: false,
        },
      ],

      searchOptions: {
        keyWord: '',
        catId: null,
        customerTypeId: 1,
        status: null,
        size: 10,
        page: 0,
        formId: 5, // Hard code
        ctrlId: 7, // Hard code
      },
      products: [],
      productInfos: [],
      productInfoTypeOptions: saleData.productInfoType,
      productsSearch: [],

      // column online order product
      onlineOrderId: '',
      onlineOrderColumns: [
        {
          label: 'Mã sản phẩm',
          field: 'orderTableProductId',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'orderTableProductName',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'orderTableProductUnit',
          sortable: false,
        },
        {
          label: 'Tồn kho',
          field: 'orderTableProductInventory',
          type: 'number',
          sortable: false,
          width: '80px',
        },
        {
          label: 'Số lượng',
          field: 'orderTableProductAmount',
          type: 'number',
          sortable: false,
          width: '120px',
        },
        {
          label: 'Đơn giá',
          field: 'orderTableProductUnitPrice',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'orderTableProductTotalPrice',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Chức năng',
          field: 'orderTableProductFeature',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    getProducts() {
      return this.GET_PRODUCTS_GETTER().map(data => ({
        tableProductId: data.id,
        tableProductName: data.productName,
        tableProductUnit: data.uom1,
        tableProductInventory: data.stockTotal,
        tableProductAmount: 1,
        tableProductUnitPrice: data.price,
        tableProductTotalPrice: this.totalPrice(1, Number(data.price)),
        tableProductCode: data.productCode,
      }))
    },
    getProductInfos() {
      return this.GET_PRODUCT_INFOS_GETTER().map(data => ({
        catId: data.id,
        productInfoCode: data.productInfoCode,
        productInfoName: data.productInfoName,

      }))
    },
    getProductSearch() {
      return this.GET_TOP_SALE_PRODUCTS_GETTER().map(data => ({
        productName: data.productName,
        productPrice: data.price,
        productCode: data.productCode,
      }))
    },
    onlineOrderByIds() {
      return this.ONLINE_ORDER_BY_ID_GETTER().map(data => ({
        // orderTableProductId: data.id,
        // orderTableProductName: data.productName,
        // orderTableProductUnit: data.uom1,
        // orderTableProductInventory: data.stockTotal,
        // orderTableProductAmount: 1,
        // orderTableProductUnitPrice: data.price,
        // orderTableProductTotalPrice: this.totalPrice(1, Number(data.price)),
        // orderTableProductCode: data.productCode,
        tableProductId: data.id,
        tableProductCode: data.productCode,
        tableProductName: data.productName,
        tableProductUnit: data.uom1,
        tableProductInventory: data.stockTotal,
        tableProductAmount: 1,
        tableProductUnitPrice: data.price,
        tableProductTotalPrice: this.totalPrice(1, Number(data.price)),
      }))
    },
  },
  watch: {
    getProducts() {
      this.products = [...this.getProducts]
    },
    getProductInfos() {
      this.productInfos = [...this.getProductInfos]
    },
    getProductSearch() {
      this.productsSearch = [...this.getProductSearch]
    },
  },
  mounted() {
    this.GET_PRODUCTS_ACTION(this.searchOptions)
    const index = this.productInfoTypeOptions.findIndex(i => i.name === 'Ngành hàng')
    const paramGetProductInfo = {
      type: Number(this.productInfoTypeOptions[index].id),
      // formId: 5, // Hard code
      // ctrlId: 7, // Hard code
    }
    this.GET_PRODUCT_INFOS_ACTION(paramGetProductInfo)

    const paramGetProductsTopSale = {
      keyWord: '',
      customerTypeId: 1, // Hard code
      page: 0,
      size: 10,
      // formId: 5, // Hard code
      // ctrlId: 7, // Hard code
    }
    this.GET_TOP_SALE_PRODUCTS_ACTION(paramGetProductsTopSale)

    this.GET_ONLINE_ORDER_BY_ID_ACTION('21?formId=4&ctrlId=1')
  },
  methods: {
    ...mapGetters(SALES, [
      GET_PRODUCTS_GETTER,
      GET_PRODUCT_INFOS_GETTER,
      GET_TOP_SALE_PRODUCTS_GETTER,
      ONLINE_ORDER_BY_ID_GETTER,
    ]),
    ...mapActions(SALES, [
      GET_PRODUCTS_ACTION,
      GET_PRODUCT_INFOS_ACTION,
      GET_TOP_SALE_PRODUCTS_ACTION,
      GET_ONLINE_ORDER_BY_ID_ACTION,
    ]),
    totalPrice(amount, price) {
      return amount * (price || 0)
    },
    increaseAmount(productId) {
      const index = this.products.findIndex(i => i.tableProductId === productId)
      this.products[index].tableProductAmount += 1
      this.products[index].tableProductTotalPrice = this.totalPrice(Number(this.products[index].tableProductAmount), Number(this.products[index].tableProductUnitPrice))
    },
    decreaseAmount(productId) {
      const index = this.products.findIndex(i => i.tableProductId === productId)
      this.products[index].tableProductAmount -= 1
      if (this.products[index].tableProductAmount < 0) {
        this.products[index].tableProductAmount = 0
      }

      this.products[index].tableProductTotalPrice = this.totalPrice(Number(this.products[index].tableProductAmount), Number(this.products[index].tableProductUnitPrice))
    },
    onChangeKeyWord() {
      this.GET_TOP_SALE_PRODUCTS_ACTION(this.searchOptions)
    },

    getOnlineOrderInfoForm(val) {
      console.log(val.id)
      this.onlineOrderId = val.id
    },
  },
}
</script>
