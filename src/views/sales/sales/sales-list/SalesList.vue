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
    <!--  :rows="id ? onlineOrderProducts : products"  :rows="customerTypeProducts" customerType -->
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
          :rows="id ? onlineOrderProducts : (customerType ? customerTypeProducts : products)"
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
              v-if="props.column.field === 'productInventory'"
              align-v="center"
              class="mx-0"
            >
              {{ props.row.productInventory }}
              <b-icon-shield-exclamation
                v-if="props.row.productInventory < props.row.quantity"
                color="red"
                class="cursor-pointer ml-1"
                font-scale="1.5"
              />
            </b-row>
            <!-- END - tableProductInventory -->

            <!-- START - quantity -->
            <b-row
              v-else-if="props.column.field === 'quantity'"
              align-v="center"
              align-h="start"
              class="mx-0"
            >
              <b-icon-caret-down-fill
                class="cursor-pointer mr-1"
                font-scale="1.5"
                @click="decreaseAmount(props.row.productId)"
              />
              {{ props.row.quantity }}
              <b-icon-caret-up-fill
                class="cursor-pointer ml-1"
                font-scale="1.5"
                @click="increaseAmount(props.row.productId)"
              />
            </b-row>
            <!-- END - quantity -->

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
      <sales-form
        @getOnlineOrderInfoForm="getOnlineOrderInfoForm"
        @getCustomerTypeInfo="getCustomerTypeInfo"
      />
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
  ONLINE_ORDER_PRODUCTS_BY_ID_GETTER,
  UPDATE_PRICE_TYPE_CUSTOMER_GETTER,
  // Action
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_INFOS_ACTION,
  GET_TOP_SALE_PRODUCTS_ACTION,
  GET_ONLINE_ORDER_PRODUCTS_BY_ID_ACTION,
  UPDATE_PRICE_TYPE_CUSTOMER_ACTION,
} from '../store-module/type'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMER_DEFAULT_GETTER,
  // Action
  GET_CUSTOMER_DEFAULT_ACTION,
} from '../../sales-customers/store-module/type'

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
          label: '',
          field: 'productId',
          sortable: false,
          hidden: true,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'ĐVT',
          field: 'productUnit',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tồn kho',
          field: 'productInventory',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Đơn giá',
          field: 'productUnitPrice',
          sortable: false,
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'productTotalPrice',
          sortable: false,
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
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

      // online order
      id: null,

      // price customer change customerTypeId
      customerType: null,
      productId: null,
      quantity: null,
      customerDefaultTypeId: null,
    }
  },
  computed: {
    ...mapGetters(CUSTOMER, [
      CUSTOMER_DEFAULT_GETTER,
    ]),
    getProducts() {
      return this.GET_PRODUCTS_GETTER().map(data => ({
        productId: data.id,
        productCode: data.productCode,
        productName: data.productName,
        productUnit: data.uom1,
        productInventory: data.stockTotal,
        quantity: 1,
        productUnitPrice: data.price,
        productTotalPrice: this.totalPrice(1, Number(data.price)),
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
    onlineOrderProducts() {
      return this.ONLINE_ORDER_PRODUCTS_BY_ID_GETTER().map(data => ({
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        productUnit: data.uom1,
        productInventory: data.stockTotal,
        quantity: 1,
        productUnitPrice: data.price,
        productTotalPrice: this.totalPrice(1, Number(data.price)),
      }))
    },
    customerDefault() {
      return this.CUSTOMER_DEFAULT_GETTER
    },

    customerTypeProducts() {
      return this.UPDATE_PRICE_TYPE_CUSTOMER_GETTER().map(data => ({
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        productUnit: data.uom1,
        productInventory: data.stockTotal,
        quantity: 1,
        productUnitPrice: data.price,
        productTotalPrice: this.totalPrice(1, Number(data.price)),
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
    customerDefault() {
      this.getCustomerDefault()
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
    this.GET_CUSTOMER_DEFAULT_ACTION({ formId: 1, ctrlId: 4 })
  },
  created() {
  },
  methods: {
    ...mapGetters(SALES, [
      GET_PRODUCTS_GETTER,
      GET_PRODUCT_INFOS_GETTER,
      GET_TOP_SALE_PRODUCTS_GETTER,
      ONLINE_ORDER_PRODUCTS_BY_ID_GETTER,
      UPDATE_PRICE_TYPE_CUSTOMER_GETTER,
    ]),
    ...mapActions(SALES, [
      GET_PRODUCTS_ACTION,
      GET_PRODUCT_INFOS_ACTION,
      GET_TOP_SALE_PRODUCTS_ACTION,
      GET_ONLINE_ORDER_PRODUCTS_BY_ID_ACTION,
      UPDATE_PRICE_TYPE_CUSTOMER_ACTION,
    ]),
    ...mapActions(CUSTOMER, [
      GET_CUSTOMER_DEFAULT_ACTION,
    ]),

    totalPrice(amount, price) {
      return amount * (price || 0)
    },

    increaseAmount(productId) {
      const index = this.products.findIndex(i => i.productId === productId)
      this.products[index].quantity += 1
      this.products[index].productTotalPrice = this.totalPrice(Number(this.products[index].quantity), Number(this.products[index].productUnitPrice))
    },

    decreaseAmount(productId) {
      const index = this.products.findIndex(i => i.productId === productId)
      this.products[index].quantity -= 1
      if (this.products[index].quantity < 0) {
        this.products[index].quantity = 0
      }

      this.products[index].productTotalPrice = this.totalPrice(Number(this.products[index].quantity), Number(this.products[index].productUnitPrice))
    },

    onChangeKeyWord() {
      this.GET_TOP_SALE_PRODUCTS_ACTION(this.searchOptions)
    },

    getOnlineOrderInfoForm(id) {
      this.id = id
      this.GET_ONLINE_ORDER_PRODUCTS_BY_ID_ACTION(`${this.id}?formId=4&ctrlId=1`)
    },

    getCustomerDefault() {
      this.customerDefaultTypeId = this.customerDefault.customerTypeId
    },

    getCustomerTypeInfo(id) {
      this.customerType = id
      console.log('customerTypeId from SalesForm', id)
      console.log('customerDefaultTypeId', this.customerDefaultTypeId)

      const listProducts = this.getProducts
      const customerTypeId = id
      const params = {
        formId: 4, // Hard code
        ctrlId: 1, // // Hard code
      }
      if (id !== this.customerDefaultTypeId) {
        this.UPDATE_PRICE_TYPE_CUSTOMER_ACTION({
          customerTypeId,
          listProducts,
          params,
        })
      }
    },
  },
}
</script>
