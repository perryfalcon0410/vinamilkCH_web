<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Header -->
    <b-row
      class="m-0 d-print-none"
    >
      <b-col
        sm="7"
        xl="4"
        class="px-0 mr-1 shadow mb-1 mr-2 mb-sm-0 form-control-merge"
      >
        <b-input-group class="input-group-merge">
          <b-form-input
            ref="search"
            v-model="searchOptions.keyWord"
            class="form-control-merge"
            placeholder="Tìm sản phẩm (F3)"
            @focus="inputSearchFocused = true"
            @blur="inputSearchFocused = false"
            @keyup="onChangeKeyWord"
          />
          <b-input-group-append
            class="px-0 pb-0 m-0"
            is-text
          >
            <b-form-checkbox
              v-model="checkStockTotal"
            />
          </b-input-group-append>
        </b-input-group>

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
              @click="editPermission ? onclickAddProduct(value) : '' "
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
                <b-form-row>
                  <b-col
                    class="text-dark font-weight-bold"
                    md="10"
                  >
                    {{ value.productName }}
                  </b-col>
                  <b-col
                    class="text-dark font-weight-bold"
                    md="1"
                  >
                    {{ value.productUnitPrice }}
                  </b-col>
                </b-form-row>

                <b-form-row>
                  <b-col
                    class="my-1"
                  >
                    {{ value.productCode }}
                  </b-col>
                </b-form-row>
              </b-col>
              <!-- END - Section Label -->
            </b-row>
          </b-container>
        </b-collapse>
        <!-- END - Product Popup -->

      </b-col>
      <!-- END - Search -->

      <!-- START - Bills -->
      <b-row
        v-for="(bill, index) in bills"
        :key="index"
      >
        <b-button
          variant="light"
          class="d-flex align-items-center justify-content-center rounded shadow mr-1 px-1"
          @click="clickBillButton(bill.id)"
        >
          Hóa đơn {{ index + 1 }}
          <b-icon-x
            class="cursor-pointer ml-1"
            font-scale="1.6"
            @click="onClickDeleteButton(index)"
          />
        </b-button>

        <div>
          <b-icon-plus
            font-scale="2.5"
            class="cursor-pointer"
            @click="onClickAddButton()"
          />
        </div>

      </b-row>
      <!-- END - Bills -->

    </b-row>
    <!-- END - Header -->

    <!-- START - Body -->
    <b-row
      class="d-print-none mx-0 my-1"
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
          :rows="orderProducts"
          style-class="vgt-table striped"
          compact-mode
          line-numbers
          class="shadow"
        >
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
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
            <span
              v-else-if="props.column.field === 'quantity'"
              align-v="center"
              align-h="start"
              class="d-flex align-items-center"
            >
              <b-icon-caret-down-fill
                v-if="editPermission"
                class="cursor-pointer"
                font-scale="1.5"
                @click="decreaseAmount(props.row.productId)"
              />
              <!-- {{ props.row.quantity }} -->
              <b-input
                v-model="orderProducts[props.row.originalIndex].quantity"
                :value="orderProducts[props.row.originalIndex].quantity"
                :number="true"
                maxlength="7"
                class="text-center"
                @change="onChangeQuantity(props.row.originalIndex)"
              />
              <b-icon-caret-up-fill
                v-if="editPermission"
                class="cursor-pointer"
                font-scale="1.5"
                @click="increaseAmount(props.row.productId)"
              />
            </span>
            <!-- END - quantity -->

            <!-- START - tableProductFeature -->
            <div
              v-else-if="props.column.field === 'tableProductFeature'"
            >
              <b-icon-trash-fill
                v-if="editPermission"
                color="red"
                class="cursor-pointer"
                @click="onClickDeleteProduct(props.row.originalIndex)"
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
        <!-- <sales-products
          :product-infos="productInfos"
          :order-products="orderProducts"
          :edit-permission="editPermission"
        /> -->
        <!-- END - List suggestion -->

      </b-col>
      <!-- END - Section Table product and list suggestion-->

      <!-- START - Section Form pay -->
      <sales-form
        :order-products="orderProducts"
        @getOnlineOrderInfoForm="getOnlineOrderInfoForm"
        @getCustomerTypeInfo="getCustomerTypeInfo"
        @getCustomerIdInfo="getCustomerIdInfo"
        @getCustomerDefault="getCustomerDefault"
        @getOnlineCustomer="getOnlineCustomer"
      />
      <!-- END - Section Form pay -->

    </b-row>
    <!-- END - Body -->

    <!-- START - Print form -->
    <print-form-sales-receipt />
    <!-- END - Print form -->

  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import saleData from '@/@db/sale'
import PrintFormSalesReceipt from '@core/components/print-form/PrintFormSalesReceiptV2.vue'
import SalesForm from './components/SalesForm.vue'
// import SalesProducts from './components/SalesProducts.vue'
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
    // SalesProducts,
    PrintFormSalesReceipt,
  },
  data() {
    return {
      inputSearchFocused: false,
      productImage: null,
      checkStockTotal: true,
      customerId: null,
      customer: {},

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
          width: '140px',
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
        checkStockTotal: true,
        catId: null,
        customerId: 507,
        status: null,
        size: 10,
        page: 0,
        formId: 5, // Hard code
        ctrlId: 7, // Hard code
      },
      orderProducts: [],
      productInfos: [],
      productInfoTypeOptions: saleData.productInfoType,
      productsSearch: [],

      isActive: false,
      bills: [
        {
          id: 1,
          products: [],
          active: true,
        },
      ],

      // online order
      id: null,
      editPermission: true,

      // price customer change customerTypeId
      customerType: null,
      productId: null,
      quantity: null,
      customerDefaultTypeId: null,

      orderCurrentId: 1, // Id of order current
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
        checkStockTotal: data.checkStockTotal,
        productName: data.productName,
        productCode: data.productCode,
        productUnit: data.uom1,
        productInventory: data.stockTotal,
        productUnitPrice: data.price,
        quantity: 1,
        productTotalPrice: this.totalPrice(1, Number(data.price)),
        productImage: data.image,
      }))
    },
    getOnlineOrderProducts() {
      return this.ONLINE_ORDER_PRODUCTS_BY_ID_GETTER().map(data => ({
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        productUnit: data.uom1,
        productInventory: data.stockTotal,
        quantity: data.quantity,
        productUnitPrice: data.price,
        productTotalPrice: this.totalPrice(1, Number(data.price)),
      }))
    },
    customerDefault() {
      return this.getCustomerDefault
    },
    onlineCustomer() {
      return this.getOnlineCustomer
    },

    getCustomerTypeProducts() {
      return this.UPDATE_PRICE_TYPE_CUSTOMER_GETTER().map(data => ({
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        productUnit: data.uom1,
        productInventory: data.stockTotal,
        quantity: data.quantity,
        productUnitPrice: data.price,
        productTotalPrice: this.totalPrice(1, Number(data.price)),
      }))
    },

    loginInfo() {
      const login = JSON.parse(localStorage.getItem('userData'))
      return login
    },
  },
  watch: {
    getProductInfos() {
      this.productInfos = [...this.getProductInfos]
    },
    getProductSearch() {
      this.productsSearch = [...this.getProductSearch]
    },
    getProducts() {
      this.orderProducts = [...this.getProducts]
    },
    getCustomerTypeProducts() {
      this.orderProducts = [...this.getCustomerTypeProducts]
    },
    getOnlineOrderProducts() {
      this.orderProducts = [...this.getOnlineOrderProducts]
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

    this.GET_CUSTOMER_DEFAULT_ACTION({ formId: 1, ctrlId: 4 })
  },
  created() {
    window.addEventListener('keydown', e => {
      if (e.key === 'F3') {
        if (e.which === 114) {
          e.preventDefault()
        }
        this.$refs.search.focus()
      }
    })
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
      const index = this.orderProducts.findIndex(i => i.productId === productId)
      this.orderProducts[index].quantity += 1
      this.orderProducts[index].productTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].productUnitPrice))
    },

    decreaseAmount(productId) {
      const index = this.orderProducts.findIndex(i => i.productId === productId)
      this.orderProducts[index].quantity -= 1
      if (this.orderProducts[index].quantity < 0) {
        this.orderProducts[index].quantity = 0
      }

      this.orderProducts[index].productTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].productUnitPrice))
    },

    onClickDeleteProduct(index) {
      this.orderProducts.splice(index, 1)
    },

    onclickAddProduct(index) {
      this.orderProducts.push(index)
    },

    onClickAddButton() {
      const lastIteminBill = this.bills[this.bills.length - 1]
      this.bills.push({
        id: lastIteminBill.id + 1,
        products: [],
        active: false,
      })
    },

    onClickDeleteButton(index) {
      if (index !== 0) {
        this.bills.splice(index, 1)
      }
    },

    onChangeKeyWord() {
      this.searchOptions.checkStockTotal = this.checkStockTotal ? 1 : 0
      this.GET_TOP_SALE_PRODUCTS_ACTION(this.searchOptions)
    },

    getOnlineOrderInfoForm(id) {
      this.id = id
      this.GET_ONLINE_ORDER_PRODUCTS_BY_ID_ACTION(`${this.id}?formId=4&ctrlId=1`)
    },
    onChangeQuantity(index) {
      this.orderProducts[index].productTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].productUnitPrice))
    },
    getCustomerDefault(val) {
      this.customerId = val.data.id
      this.GET_PRODUCTS_ACTION(this.searchOptions)
      const paramGetProductsTopSale = {
        checkStockTotal: this.checkStockTotal ? 1 : 0,
        keyWord: '',
        customerId: this.customerId,
        page: 0,
        size: 10,
      }
      this.GET_TOP_SALE_PRODUCTS_ACTION(paramGetProductsTopSale)

      const { usedShop } = this.loginInfo

      if (val.data.shopId === usedShop.id) {
        if (usedShop.editable) {
          this.editPermission = true
        } else {
          this.editPermission = false
        }
      }
    },

    getOnlineCustomer(val) {
      const { usedShop } = this.loginInfo

      if (val.shopId === usedShop.id) {
        if (usedShop.editable) {
          this.editPermission = true
        } else {
          this.editPermission = false
        }
      }
    },

    getCustomerTypeInfo(id) {
      this.customerType = id
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

    getCustomerIdInfo(id) {
      this.$emit('getCustomerIdInfo', id)
    },

    billHandle(bill, index) {
      return {
        id: bill.id,
        index,
        products: this.orderProducts,
      }
    },

    clickBillButton(billSelectedId) {
      this.bills = this.bills.map(bill => {
        if (bill.id === this.orderCurrentId) {
          return {
            ...bill,
            products: this.orderProducts,
            active: false,
          }
        }
        return bill
      })
      this.bills = this.bills.map(bill => {
        if (bill.id === billSelectedId) {
          this.orderProducts = bill.products
          this.orderCurrentId = billSelectedId
          return {
            ...bill,
            active: true,
          }
        }
        return bill
      })
    },
  },
}
</script>
