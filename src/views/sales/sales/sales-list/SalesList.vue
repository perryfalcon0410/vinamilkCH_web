<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 d-print-none"
    >
      <!-- START - Search -->
      <b-col
        xl="4"
        sm="7"
        class="shadow px-0 mb-1 mr-2 mb-sm-0 h7"
      >
        <b-row
          class="mx-0"
          align-v="center"
        >
          <vue-autosuggest
            ref="search"
            v-model="searchOptions.keyWord"
            :suggestions="productsSearch"
            class="w-100"
            :input-props="{
              id:'autosuggest__input_product',
              class:'form-control pr-3 h7',
              placeholder:'Tìm sản phẩm (F3)',
            }"
            :salemt-promotion-object-selected="salemtPromotionObjectSelected"
            @input="onChangeKeyWord"
            @selected="onclickAddProduct"
            @focus="focusInputProduct"
            @click="checkShopId"
          >
            <template
              slot-scope="{ suggestion }"
            >
              <b-row class="mx-0">
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
                      {{ suggestion.item.productName }}
                    </b-col>
                    <b-col
                      class="text-dark font-weight-bold"
                      md="1"
                    >
                      {{ suggestion.item.productUnitPrice }}
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                    <b-col>
                      {{ suggestion.item.productCode }}
                    </b-col>
                  </b-form-row>
                </b-col>
              <!-- END - Section Label -->
              </b-row>
            <!-- <b>{{ suggestion.item.productCode }}</b> - {{ suggestion.item.productName }} -->
            </template>
          </vue-autosuggest>
          <b-form-checkbox
            v-model="checkStockTotal"
            v-b-popover.hover="'Hiển thị sản phẩm có tồn kho'"
            style="position: absolute; right: 5px"
          />
        </b-row>

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
          max-height="600px"
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
            <div
              v-else-if="props.column.field === 'quantity'"
              align-v="center"
              align-h="start"
              class="d-flex align-items-center"
            >
              <b-icon-caret-down-fill
                class="cursor-pointer"
                font-scale="1.5"
                @click="decreaseAmount(props.row.productId)"
              />
              <b-input
                ref="abc"
                v-model="orderProducts[props.row.originalIndex].quantity"
                :value="orderProducts[props.row.originalIndex].quantity"
                :number="true"
                :disabled="editOnlinePermission === false && onlineOrderId !== null && isOnline === true"
                maxlength="7"
                class="text-center h7"
                @change="onChangeQuantity(props.row.originalIndex)"
                @keypress="$onlyNumberInput"
              />
              <b-icon-caret-up-fill
                class="cursor-pointer"
                font-scale="1.5"
                @click="increaseAmount(props.row.productId)"
              />
            </div>
            <!-- END - quantity -->

            <!-- START - tableProductFeature -->
            <div
              v-else-if="props.column.field === 'tableProductFeature'"
            >
              <b-icon-trash-fill
                v-b-popover.hover="'Xóa sản phẩm'"
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
        :edit-online-permission="editOnlinePermission"
        @getOnlineOrderInfoForm="getOnlineOrderInfoForm"
        @getCustomerTypeInfo="getCustomerTypeInfo"
        @getCustomerIdInfo="getCustomerIdInfo"
        @getCustomerDefault="getCustomerDefault"
        @getOnlineCustomer="getOnlineCustomer"
        @getCustomerCreate="getCustomerCreate"
        @currentCustomer="getCurrentCustomer"
        @salemtPromotionObjectSelected="salemtPromotionObjectSelected"
        @getIdCustomer="getIdCustomer"
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
import toasts from '@/@core/utils/toasts/toasts'
import { VueAutosuggest } from 'vue-autosuggest'
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
  UPDATE_PRICE_TYPE_CUSTOMER_GETTER,
  // Action
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_INFOS_ACTION,
  GET_TOP_SALE_PRODUCTS_ACTION,
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
    VueAutosuggest,
    SalesForm,
    // SalesProducts,
    PrintFormSalesReceipt,
  },
  data() {
    return {
      productImage: null,
      checkStockTotal: true,
      customerId: null,
      customer: {},
      isCheckShopId: false, // check shop default
      currentCustomer: {},
      selectedValue: null,

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
          width: '100px',
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
        customerId: null,
        status: null,
        size: 10,
        page: 0,
        formId: 5, // Hard code
        ctrlId: 7, // Hard code
      },
      orderProducts: [],
      productInfos: [],
      productInfoTypeOptions: saleData.productInfoType,
      productsSearch: [{ data: '' }],

      isActive: false,
      bills: [
        {
          id: 1,
          products: [],
          active: true,
        },
      ],

      // online order
      onlineOrderId: null,
      orderSelected: null,
      editOnlinePermission: true,
      editManualPermission: true,
      isOnline: false,

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
    ...mapGetters(SALES, [
      GET_PRODUCTS_GETTER,
      GET_PRODUCT_INFOS_GETTER,
      GET_TOP_SALE_PRODUCTS_GETTER,
      UPDATE_PRICE_TYPE_CUSTOMER_GETTER,
    ]),
    getProducts() {
      return this.GET_PRODUCTS_GETTER.map(data => ({
        productId: data.id,
        productCode: data.productCode,
        productName: data.productName,
        productUnit: data.uom1,
        productInventory: this.$formatNumberToLocale(data.stockTotal),
        quantity: 1,
        productUnitPrice: this.$formatNumberToLocale(data.price),
        sumProductUnitPrice: data.price,
        productTotalPrice: this.$formatNumberToLocale(this.totalPrice(1, Number(data.price))),
        sumProductTotalPrice: this.totalPrice(1, Number(data.price)),
      }))
    },
    getProductInfos() {
      return this.GET_PRODUCT_INFOS_GETTER.map(data => ({
        catId: data.id,
        productInfoCode: data.productInfoCode,
        productInfoName: data.productInfoName,

      }))
    },
    getProductSearch() {
      if (this.GET_TOP_SALE_PRODUCTS_GETTER) {
        return [{
          data: this.GET_TOP_SALE_PRODUCTS_GETTER.map(data => ({
            productId: data.id,
            name: data.productCode,
            checkStockTotal: data.checkStockTotal,
            productName: data.productName,
            productCode: data.productCode,
            productUnit: data.uom1,
            productInventory: this.$formatNumberToLocale(data.stockTotal),
            productUnitPrice: this.$formatNumberToLocale(data.price),
            sumProductUnitPrice: data.price,
            quantity: 1,
            productTotalPrice: this.$formatNumberToLocale(this.totalPrice(1, Number(data.price))),
            sumProductTotalPrice: this.totalPrice(1, Number(data.price)),
            productImage: data.image,
          })),
        }]
      }
      return []
    },
    customerDefault() {
      return this.getCustomerDefault
    },
    onlineCustomer() {
      return this.getOnlineCustomer
    },

    getCustomerTypeProducts() {
      return this.UPDATE_PRICE_TYPE_CUSTOMER_GETTER.map(data => ({
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        productUnit: data.uom1,
        productInventory: data.stockTotal,
        quantity: data.quantity,
        productUnitPrice: this.$formatNumberToLocale(data.price),
        sumProductUnitPrice: data.price,
        productTotalPrice: this.$formatNumberToLocale(this.totalPrice(1, Number(data.price))),
        sumProductTotalPrice: this.totalPrice(1, Number(data.price)),
      }))
    },

    loginInfo() {
      const login = JSON.parse(localStorage.getItem('userData'))
      return login
    },

    selectedProduct() {
      return this.salemtPromotionObjectSelected
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
      this.orderProducts = []
    },
    getCustomerTypeProducts() {
      this.orderProducts = [...this.getCustomerTypeProducts]
    },
    // getOnlineOrderProducts() {
    //   this.orderProducts = [...this.getOnlineOrderProducts]
    // },

    getCurrentCustomer() {
      this.currentCustomer = { ...this.getCurrentCustomer }
    },

    selectedProduct() {
      this.selectedValue = this.selectedProduct
    },
  },
  mounted() {
    // this.GET_PRODUCTS_ACTION(this.searchOptions)
    const index = this.productInfoTypeOptions.findIndex(i => i.name === 'Ngành hàng')
    const paramGetProductInfo = {
      type: Number(this.productInfoTypeOptions[index].id),
      // formId: 5, // Hard code
      // ctrlId: 7, // Hard code
    }
    this.GET_PRODUCT_INFOS_ACTION(paramGetProductInfo)
  },
  created() {
    window.addEventListener('keydown', e => {
      if (e.key === 'F3') {
        if (this.$refs.search && this.$refs.search.$el) {
          this.$refs.search.$el.querySelector('input').focus()
          this.$refs.search.$el.querySelector('input').click()
        }
        if (e.which === 114) {
          e.preventDefault()
        }
      }
    })
  },
  methods: {
    ...mapActions(SALES, [
      GET_PRODUCTS_ACTION,
      GET_PRODUCT_INFOS_ACTION,
      GET_TOP_SALE_PRODUCTS_ACTION,
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
      if (this.editOnlinePermission === true) {
        this.orderProducts[index].quantity += 1
        this.orderProducts[index].productTotalPrice = this.$formatNumberToLocale(this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice)))
        this.orderProducts[index].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
      }
    },

    decreaseAmount(productId) {
      const index = this.orderProducts.findIndex(i => i.productId === productId)
      if (this.editOnlinePermission === true) {
        this.orderProducts[index].quantity -= 1
        if (this.orderProducts[index].quantity <= 0) {
          this.orderProducts[index].quantity = 1
        }

        this.orderProducts[index].productTotalPrice = this.$formatNumberToLocale(this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice)))
        this.orderProducts[index].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
      }
    },

    onClickDeleteProduct(index) {
      if (this.editOnlinePermission === true) {
        this.orderProducts.splice(index, 1)
      }
    },
    // check shop default
    focusInputProduct() {
      if (this.isCheckShopId === false) {
        toasts.error('Vui lòng chọn khách hàng trước khi chọn sản phẩm')
      }
    },
    checkShopId() {
      this.searchOptions.checkStockTotal = this.checkStockTotal ? 1 : 0
      if (this.isCheckShopId === true) {
        this.GET_TOP_SALE_PRODUCTS_ACTION(this.searchOptions)
      }
    },

    onChangeKeyWord() {
      if (this.isCheckShopId === true) {
        // this.searchOptions.checkStockTotal = this.checkStockTotal ? 1 : 0
        this.GET_TOP_SALE_PRODUCTS_ACTION(this.searchOptions)
      }
    },
    onclickAddProduct(index) {
      if ((this.editOnlinePermission === true && this.onlineOrderId !== null) || (this.editManualPermission === true && this.onlineOrderId === null) || this.isOnline === false) {
        if (index.item) {
          const productIndex = this.orderProducts.findIndex(data => data.productCode === index.item.productCode)
          if (productIndex === -1) {
            this.orderProducts.push(index.item)
          } else {
            this.orderProducts[productIndex].quantity += 1
            this.orderProducts[productIndex].productTotalPrice = this.$formatNumberToLocale(this.totalPrice(Number(this.orderProducts[productIndex].quantity), Number(this.orderProducts[productIndex].sumProductUnitPrice)))
            this.orderProducts[productIndex].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[productIndex].quantity), Number(this.orderProducts[productIndex].sumProductUnitPrice))
          }
        }
      }

      if (this.editManualPermission === false && this.onlineOrderId === null && this.isOnline === true) {
        toasts.error('Vui lòng vào chức năng "Đơn online" trên màn hình Bán hàng để chọn đơn hàng online cần xử lý!')
        return
      }

      this.productsSearch = [{ data: null }]
      this.searchOptions.keyWord = null
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

    getOnlineOrderInfoForm(val) {
      this.orderProducts = val
    },
    onChangeQuantity(index) {
      if (this.orderProducts[index].quantity <= 0) {
        this.orderProducts[index].quantity = 1
      }
      this.orderProducts[index].productTotalPrice = this.$formatNumberToLocale(this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice)))
      this.orderProducts[index].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
    },
    getCustomerDefault(val) {
      this.customerId = val.id
      this.searchOptions.customerId = this.customerId
      this.GET_PRODUCTS_ACTION(this.searchOptions)

      // check customers dafault
      if (val.isDefault === true && val.status === 1) {
        this.isCheckShopId = true
      } else {
        this.isCheckShopId = false
      }
    },

    getOnlineCustomer(val) {
      this.onlineOrderId = val.id
    },

    getCustomerTypeInfo(id) {
      this.customerType = id
      // const listProducts = this.getProducts
      // const customerTypeId = id
      // const params = {
      //   formId: 4, // Hard code
      //   ctrlId: 1, // // Hard code
      // }
      // if (id !== this.currentCustomer) {
      //   this.UPDATE_PRICE_TYPE_CUSTOMER_ACTION({
      //     customerTypeId,
      //     listProducts,
      //     params,
      //   })
      // }
    },

    getCurrentCustomer(val) {
      this.currentCustomer = val
    },

    getCustomerIdInfo(id) {
      this.$emit('getCustomerIdInfo', id)
    },
    getIdCustomer(data) {
      // check customers dafault
      if (data) {
        this.isCheckShopId = true
        this.searchOptions.customerId = data.id
        this.editOnlinePermission = true
      } else {
        this.isCheckShopId = false
      }
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

    salemtPromotionObjectSelected(val) {
      this.orderSelected = val
      const { usedShop } = this.loginInfo
      if (val === '1') {
        this.isOnline = false
        this.onlineOrderId = null
        this.editOnlinePermission = true
        this.editManualPermission = true
      }
      if (val === '2') {
        this.isOnline = true
        this.onlineOrderId = null
        if (usedShop.id === this.currentCustomer.shopId) {
          if (usedShop.manuallyCreatable === false) {
            this.editManualPermission = false
          } else {
            this.editManualPermission = true
          }
          if (usedShop.editable === false) {
            this.editOnlinePermission = false
          } else {
            this.editOnlinePermission = true
          }
        }
      }
    },
  },
}
</script>
