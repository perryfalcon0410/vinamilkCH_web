<template>
  <b-container
    fluid
    class="p-0 d-print-none"
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
            :component-attr-class-autosuggest-results="(productsSearchLength < 11) ? 'autosuggest__results check-auto-suggesst' : 'autosuggest__results'"
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
                <b-col>
                  <b-form-row>
                    <b-col
                      class="text-brand-3 font-weight-bold"
                      md="10"
                    >
                      {{ suggestion.item.productCode }}
                    </b-col>
                    <b-col
                      class="text-dark font-weight-bold text-right"
                      md="1"
                    >
                      {{ suggestion.item.productUnitPrice }}
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                    <b-col class="h8">
                      {{ suggestion.item.productName }}
                    </b-col>
                  </b-form-row>
                </b-col>
              <!-- END - Section Label -->
              </b-row>
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
        v-for="bill in bills"
        :key="bill.id"
      >
        <b-button-group
          variant="someThing"
          :class="`${bill.class}`"
          class="b-icon-x btn-brand-1 rounded aligns-items-button-center bg-btn-order mr-1 px-1 ml-2"
        >
          <b-button
            variant="someThing"
            :class="`${bill.class}`"
            class="bg-btn-order"
            @click="clickBillButton(bill.id)"
          >
            {{ bill.billName }}
          </b-button>
          <b-icon-x
            v-b-popover.hover="'Xóa'"
            class="cursor-pointer"
            font-scale="1.6"
            @click="onClickDeleteButton(bill.id)"
          />
        </b-button-group>

      </b-row>
      <b-row class="ml-1">
        <div>
          <b-icon-plus
            v-b-popover.hover.right="'Thêm mới hóa đơn'"
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
        class="d-flex flex-column rounded px-0 pr-1"
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
              align-h="end"
              class="mx-0 pr-1"
            >
              {{ $formatNumberToLocale(props.row.productInventory) }}
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
              <b-icon-dash
                class="cursor-pointer"
                font-scale="1.7"
                @click="decreaseAmount(props.row.productId)"
              />
              <b-input
                :id="orderProducts[props.row.originalIndex].productCode"
                ref="focusInputProduct"
                v-model="orderProducts[props.row.originalIndex].quantity"
                :value="orderProducts[props.row.originalIndex].quantity"
                :number="true"
                :disabled="editOnlinePermission === false && onlineOrderId !== null && isOnline === true"
                maxlength="7"
                class="text-center h7 p-input"
                @change="onChangeQuantity(props.row.originalIndex)"
                @keyup.enter="focusInputSearch"
                @keypress="$onlyNumberInput"
              />
              <b-icon-plus
                class="cursor-pointer"
                font-scale="1.7"
                @click="increaseAmount(props.row.productId)"
              />
            </div>
            <!-- END - quantity -->

            <!-- START - tableProductFeature -->
            <div
              v-else-if="props.column.field === 'tableProductFeature'"
            >
              <v-icon-remove
                v-b-popover.hover="'Xóa sản phẩm'"
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

        <!-- START - Notify Modal Close -->
        <b-modal
          ref="salesNotifyModal"
          title="Thông báo"
        >
          Chọn đơn online sẽ xóa dữ liệu đơn hàng hiện tại
          <template #modal-footer>
            <b-button
              variant="someThing"
              class="btn-brand-1"
              @click="onClickAgreeButton()"
            >
              Đồng ý
            </b-button>
            <b-button @click="closeNotifyModal()">
              Đóng
            </b-button>
          </template>
        </b-modal>
        <!-- END - Notify Modal Close -->

      </b-col>
      <!-- END - Section Table product and list suggestion-->

      <!-- START - Section Form pay -->
      <sales-form
        :order-products="orderProducts"
        :bills="bills"
        :is-disabled-order="isDisabledOrder"
        :edit-online-permission="editOnlinePermission"
        :is-disabled="isDisabled"
        :order-number-bill="orderNumber"
        @getOnlineOrderInfoForm="getOnlineOrderInfoForm"
        @getCustomerTypeInfo="getCustomerTypeInfo"
        @getCustomerIdInfo="getCustomerIdInfo"
        @getCustomerDefault="getCustomerDefault"
        @getOnlineCustomer="getOnlineCustomer"
        @getCustomerCreate="getCustomerCreate"
        @currentCustomer="getCurrentCustomer"
        @getSalemtPOSelected="getSalemtPOSelected"
        @getSalemtPOOptions="getSalemtPOOptions"
        @salemtDeliveryTypeSelected="salemtDeliveryTypeSelected"
        @getIdCustomer="getIdCustomer"
        @deleteSaveBill="deleteSaveBill"
        @getOrderNumber="getOrderNumber"
      />
      <!-- END - Section Form pay -->

    </b-row>
    <!-- END - Body -->

  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import toasts from '@/@core/utils/toasts/toasts'
import { VueAutosuggest } from 'vue-autosuggest'
import VIconRemove from '@/@core/components/v-icons/IconRemove.vue'
import saleData from '@/@db/sale'
import SalesForm from './components/SalesForm.vue'
// import SalesProducts from './components/SalesProducts.vue'
import {
  SALES,
  // Getter
  GET_PRODUCTS_GETTER,
  GET_PRODUCT_INFOS_GETTER,
  GET_TOP_SALE_PRODUCTS_GETTER,
  UPDATE_PRICE_TYPE_CUSTOMER_GETTER,
  GET_PRODUCT_BY_BARCODE_GETTER,
  // Action
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_INFOS_ACTION,
  GET_TOP_SALE_PRODUCTS_ACTION,
  UPDATE_PRICE_TYPE_CUSTOMER_ACTION,
  GET_PRODUCT_BY_BARCODE_ACTION,
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
    VIconRemove,
    // SalesProducts,
  },
  data() {
    return {
      productImage: null,
      checkStockTotal: true,
      customerId: null,
      currentCustomerId: null,
      customer: {},
      isCheckShopId: false, // check shop default
      currentCustomer: {},
      defaultCustomer: {},
      currentOrderNumber: {},
      salemtPOOptions: [],
      selectedValue: null,
      checkStock: false,
      isDisabled: false, // check tồn kho disable button thanh toán
      isSelectedProduct: false, // check selected product
      productIdSelected: null,

      columns: [
        {
          label: '',
          field: 'productId',
          sortable: false,
          hidden: true,
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          tdClass: 'align-middle',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          tdClass: 'align-middle',
        },
        {
          label: 'ĐVT',
          field: 'productUnit',
          sortable: false,
          tdClass: 'align-middle',
        },
        {
          label: 'Tồn kho',
          field: 'productInventory',
          formatFn: this.$formatNumberToLocale,
          type: 'number',
          sortable: false,
          tdClass: 'align-middle',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          width: '135px',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center align-middle',
        },
        {
          label: 'Đơn giá',
          field: 'productUnitPrice',
          sortable: false,
          type: 'number',
          tdClass: 'pr-2 align-middle',
        },
        {
          label: 'Thành tiền',
          field: 'productTotalPrice',
          sortable: false,
          type: 'number',
          tdClass: 'pr-2 align-middle',
        },
        {
          label: 'Chức năng',
          field: 'tableProductFeature',
          sortable: false,
          tdClass: 'align-middle',
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
      productsSearchLength: 0,

      isActive: false,
      customerFullName: null, // get bills Name
      billSelected: 1,
      bills: [
        {
          id: 1,
          billName: null,
          products: [],
          customer: {
            fullName: null,
            phoneNumber: null,
            totalBill: null,
            address: null,
            noted: null,
          },
          orderType: {
            id: null,
            label: null,
            apParamCode: null,
          },
          deliveryType: null,
          orderNumber: '',
          active: true,
          class: 'visited-action',
        },
      ],

      // online order
      onlineOrderId: null,
      orderSelected: {},
      deliverySelected: null,
      editOnlinePermission: true,
      editManualPermission: true,
      isOnline: false,
      isDisabledOrder: false,

      // price customer change customerTypeId
      customerType: null,
      productId: null,
      quantity: null,
      productChangePrice: [],
      customerDefaultTypeId: null,
      customerTypeCurent: null,
      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      orderCurrentId: 1, // Id of order current
      loading: false,
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
      GET_PRODUCT_BY_BARCODE_GETTER,
    ]),
    getProducts() {
      return this.GET_PRODUCTS_GETTER.map(data => ({
        productId: data.id,
        productCode: data.productCode,
        productName: data.productName,
        productUnit: data.uom1,
        productInventory: data.stockTotal,
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
            name: '',
            checkStockTotal: data.checkStockTotal,
            productName: data.productName,
            productCode: data.productCode,
            productUnit: data.uom1,
            productInventory: data.stockTotal,
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
        productTotalPrice: this.$formatNumberToLocale(data.totalPrice),
        sumProductTotalPrice: data.totalPrice,
      }))
    },

    loginInfo() {
      const login = JSON.parse(localStorage.getItem('userData'))
      return login
    },

    selectedProduct() {
      return this.salemtPromotionObjectSelected
    },
    getProductByBarcode() {
      return this.GET_PRODUCT_BY_BARCODE_GETTER
    },
  },
  watch: {
    getProductInfos() {
      this.productInfos = [...this.getProductInfos]
    },
    getProductSearch() {
      this.productsSearch = [...this.getProductSearch]
      this.productsSearchLength = this.productsSearch[0].data.length
    },
    getProducts() {
      this.orderProducts = []
    },
    getCustomerTypeProducts() {
      this.orderProducts = [...this.getCustomerTypeProducts]
    },

    getCurrentCustomer() {
      this.currentCustomer = { ...this.getCurrentCustomer }
    },

    getCustomerCreate() {
      this.currentCustomer = { ...this.getCustomerCreate }
    },

    getDefaultCustomer() {
      this.defaultCustomer = { ...this.getDefaultCustomer }
    },

    getOrderNumber() {
      this.currentOrderNumber = { ...this.getOrderNumber }
    },

    getSalemtPOSelected() {
      this.orderSelected = { ...this.getSalemtPOSelected }
    },

    getSalemtPOOptions() {
      this.salemtPOOptions = [...this.getSalemtPOOptions]
    },

    deleteSaveBill() {
      this.bills = [...this.deleteSaveBill]
    },

    selectedProduct() {
      this.selectedValue = this.selectedProduct
    },
    orderProducts() {
      this.orderProducts.forEach(data => {
        if (data.productInventory < 1 || data.productInventory < data.quantity || data.productUnitPrice === null) {
          this.checkStock = true
        }
      })
      if (this.checkStock === true) {
        this.isDisabled = true
        this.checkStock = false
      } else {
        this.isDisabled = false
      }
    },
    getProductByBarcode() {
      const productByBarcode = {
        productId: this.getProductByBarcode.id,
        name: this.getProductByBarcode.productCode,
        productName: this.getProductByBarcode.productName,
        productCode: this.getProductByBarcode.productCode,
        productUnit: this.getProductByBarcode.uom1,
        productInventory: this.getProductByBarcode.stockTotal,
        productUnitPrice: this.$formatNumberToLocale(this.getProductByBarcode.price),
        sumProductUnitPrice: this.getProductByBarcode.price,
        quantity: 1,
        productTotalPrice: this.$formatNumberToLocale(this.totalPrice(1, Number(this.getProductByBarcode.price))),
        sumProductTotalPrice: this.totalPrice(1, Number(this.getProductByBarcode.price)),
        productImage: this.getProductByBarcode.image,
        comboProductId: this.getProductByBarcode.comboProductId,
      }

      const indexProductExisted = this.orderProducts.findIndex(p => p.productId === productByBarcode.productId)
      if (indexProductExisted === -1) {
        this.orderProducts.push(productByBarcode)
      } else {
        this.orderProducts = this.orderProducts.map(product => {
          if (product.productId === productByBarcode.productId) {
            return {
              ...product,
              quantity: product.quantity + 1,
            }
          }
          return product
        })
      }
    },
    customerFullName() {
      this.bills.find(item => item.id === this.billSelected).billName = this.customerFullName
    },
  },

  updated() {
    if (this.isSelectedProduct) {
      // this.$refs.focusInputProduct.focus()
      document.getElementById(this.productIdSelected).focus()
      this.isSelectedProduct = false
    }
  },
  mounted() {
    const index = this.productInfoTypeOptions.findIndex(i => i.name === 'Ngành hàng')
    const paramGetProductInfo = {
      type: Number(this.productInfoTypeOptions[index].id),
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

    // Pass an options object with `eventBus: true` to receive an eventBus back
    // which emits `start` and `finish` events\
    this.$barcodeScanner.setSensitivity(10)
    // Add barcode scan listener and pass the callback function
    this.$barcodeScanner.init(this.onBarcodeScanned)
  },
  destroyed() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy()
  },
  methods: {
    ...mapActions(SALES, [
      GET_PRODUCTS_ACTION,
      GET_PRODUCT_INFOS_ACTION,
      GET_TOP_SALE_PRODUCTS_ACTION,
      UPDATE_PRICE_TYPE_CUSTOMER_ACTION,
      GET_PRODUCT_BY_BARCODE_ACTION,
    ]),
    ...mapActions(CUSTOMER, [
      GET_CUSTOMER_DEFAULT_ACTION,
    ]),

    totalPrice(amount, price) {
      return amount * (price || 0)
    },

    increaseAmount(productId) {
      const index = this.orderProducts.findIndex(i => i.productId === productId)
      if (this.editOnlinePermission === true || this.editManualPermission === true) {
        this.orderProducts[index].quantity += 1
        this.orderProducts[index].productTotalPrice = this.$formatNumberToLocale(this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice)))
        this.orderProducts[index].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))

        if (this.orderProducts[index].productInventory < this.orderProducts[index].quantity) {
          this.isDisabled = true
        } else {
          this.isDisabled = false
        }
      }
    },

    decreaseAmount(productId) {
      const index = this.orderProducts.findIndex(i => i.productId === productId)
      if (this.editOnlinePermission === true || this.editManualPermission === true) {
        this.orderProducts[index].quantity -= 1
        if (this.orderProducts[index].quantity <= 0) {
          this.orderProducts[index].quantity = 1
        }

        this.orderProducts[index].productTotalPrice = this.$formatNumberToLocale(this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice)))
        this.orderProducts[index].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))

        if (this.orderProducts[index].productInventory < this.orderProducts[index].quantity) {
          this.isDisabled = true
        } else {
          this.isDisabled = false
        }
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
      this.searchOptions.size = 10
      if (this.isCheckShopId === true) {
        this.GET_TOP_SALE_PRODUCTS_ACTION(this.searchOptions)
      }
    },

    onChangeKeyWord() {
      if (this.isCheckShopId === true) {
        this.GET_TOP_SALE_PRODUCTS_ACTION(this.searchOptions)
      }
    },
    onclickAddProduct(index) {
      if ((this.editOnlinePermission === true && this.onlineOrderId !== null) || (this.editManualPermission === true && this.onlineOrderId === null) || this.isOnline === false) {
        if (index && index.item) {
          const productIndex = this.orderProducts.findIndex(data => data.productCode === index.item.productCode)
          if (productIndex === -1) {
            this.orderProducts.push(index.item)
          } else {
            this.orderProducts[productIndex].quantity += 1
            this.orderProducts[productIndex].productTotalPrice = this.$formatNumberToLocale(this.totalPrice(Number(this.orderProducts[productIndex].quantity), Number(this.orderProducts[productIndex].sumProductUnitPrice)))
            this.orderProducts[productIndex].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[productIndex].quantity), Number(this.orderProducts[productIndex].sumProductUnitPrice))
          }
          this.productIdSelected = index.item.productCode
          this.isSelectedProduct = true
        }
      }

      if (this.editManualPermission === false && this.onlineOrderId === null && this.isOnline === true) {
        toasts.error('Vui lòng vào chức năng "Đơn online" trên màn hình Bán hàng để chọn đơn hàng online cần xử lý!')
        return
      }

      this.productsSearch = [{ data: null }]
      this.searchOptions.keyWord = null
      // this.isSelectedProduct = true
    },

    getOrderNumber(val) {
      this.currentOrderNumber = val
    },

    onClickAddButton() {
      const lastIteminBill = this.bills[this.bills.length - 1]
      if (lastIteminBill) {
        this.bills.push({
          id: lastIteminBill.id + 1,
          billName: this.defaultCustomer.fullName,
          products: [],
          customer: {
            fullName: this.defaultCustomer.fullName,
            phoneNumber: this.defaultCustomer.mobiPhone,
            totalBill: this.defaultCustomer.totalBill,
            address: this.defaultCustomer.address,
            noted: this.defaultCustomer.noted,
          },
          orderType: {
            id: null,
          },
          deliveryType: null,
          orderNumber: null,
          noted: null,
          active: false,
          class: '',
        })
        this.clickBillButton(lastIteminBill.id + 1)
        return
      }
      this.bills.push({
        id: 1,
        products: [],
        customer: {
          fullName: this.currentCustomer.fullName,
          phoneNumber: this.currentCustomer.phoneNumber,
          totalBill: this.currentCustomer.totalBill,
          address: this.currentCustomer.address,
          noted: this.currentCustomer.noted,
        },
        orderType: {
          id: this.orderSelected.id,
        },
        deliveryType: this.deliverySelected,
        orderNumber: this.currentOrderNumber.orderNumber,
        noted: null,
        active: false,
        class: 'visited-action',
      })
    },

    onClickDeleteButton(id) {
      if (this.bills.length > 1) {
        const index = this.bills.findIndex(item => item.id === id)

        if (index > 0) {
          if (this.bills[index].class === 'visited-action') {
            this.bills[index - 1].class = 'visited-action'
            this.clickBillButton(this.bills[index - 1].id)
          }
        } else {
          this.bills[index + 1].class = 'visited-action'
          this.clickBillButton(this.bills[index + 1].id)
        }
        this.bills.splice(index, 1)
      }
    },

    clickBillButton(billSelectedId) {
      this.billSelected = billSelectedId
      this.bills = this.bills.map(bill => {
        if (bill.id === this.orderCurrentId) {
          return {
            ...bill,
            products: this.orderProducts,
            customer: {
              fullName: this.currentCustomer.fullName,
              phoneNumber: this.currentCustomer.phoneNumber,
              totalBill: this.currentCustomer.totalBill,
              address: this.currentCustomer.address,
              noted: this.currentCustomer.noted,
            },
            orderType: {
              id: this.orderSelected.id,
            },
            deliveryType: this.deliverySelected,
            orderNumber: this.currentOrderNumber.orderNumber,
            active: false,
            class: '',
          }
        }
        return bill
      })
      this.bills = this.bills.map(bill => {
        if (bill.id === billSelectedId) {
          this.orderCurrentId = billSelectedId
          this.orderProducts = bill.products
          this.currentCustomer.fullName = bill.customer.fullName
          this.currentCustomer.phoneNumber = bill.customer.phoneNumber
          this.currentCustomer.totalBill = bill.customer.totalBill
          this.currentCustomer.address = bill.customer.address
          this.currentCustomer.noted = bill.customer.noted
          this.orderSelected.id = bill.orderType.id
          this.deliverySelected = bill.deliveryType
          this.currentOrderNumber.orderNumber = bill.orderNumber
          return {
            ...bill,
            active: true,
            class: 'visited-action',
          }
        }
        return bill
      })
    },

    deleteSaveBill(val) {
      this.bills = val

      if (this.bills.length > 1) {
        const index = this.bills.findIndex(item => item.active)
        if (index > 0) {
          if (this.bills[index].class === 'visited-action') {
            this.bills[index - 1].class = 'visited-action'
            this.clickBillButton(this.bills[index - 1].id)
          }
        } else {
          this.bills[index + 1].class = 'visited-action'
          this.clickBillButton(this.bills[index + 1].id)
        }
        this.bills.splice(index, 1)
      }
    },

    getOnlineOrderInfoForm(val) {
      this.orderProducts = val
    },
    focusInputSearch() {
      this.$refs.search.$el.querySelector('input').focus()
      this.$refs.search.$el.querySelector('input').click()
    },
    onChangeQuantity(index) {
      if (this.orderProducts[index].quantity <= 0) {
        this.orderProducts[index].quantity = 1
      }
      if (this.orderProducts[index].productInventory < this.orderProducts[index].quantity) {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
      this.orderProducts[index].productTotalPrice = this.$formatNumberToLocale(this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice)))
      this.orderProducts[index].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
    },
    getCustomerDefault(val) {
      this.customerTypeCurent = val.customerTypeId
      this.defaultCustomer = val
      this.customerId = val.id
      this.searchOptions.customerId = this.customerId
      this.currentCustomerId = this.customerId
      this.GET_PRODUCTS_ACTION(this.searchOptions)
      this.customerFullName = val.fullName

      // check customers dafault
      if (val.isDefault === true && val.status === 1) {
        this.isCheckShopId = true
      } else {
        this.isCheckShopId = false
      }
    },

    getOnlineCustomer(val) {
      this.onlineOrderId = val.id
      this.searchOptions.customerId = val.id
      this.customerFullName = val.fullName
    },

    getCustomerTypeInfo(val) {
      // check customers dafault
      if (val) {
        this.isCheckShopId = true
      } else {
        this.isCheckShopId = false
      }
      // check customers dafault
      this.customerType = val.customerTypeId
      this.searchOptions.customerId = val.id
      this.customerFullName = val.fullName

      this.productChangePrice = this.orderProducts.map(data => ({
        productId: data.productId,
        quantity: data.quantity,
      }))
      this.UPDATE_PRICE_TYPE_CUSTOMER_ACTION({
        customerTypeId: this.customerType,
        products: this.productChangePrice,
        params: this.decentralization,
      })
    },

    getCurrentCustomer(val) {
      this.currentCustomer = val
    },

    getCustomerCreate(val) {
      this.currentCustomer = val
      this.customerFullName = val.fullName
    },

    getCustomerIdInfo(id) {
      this.$emit('getCustomerIdInfo', id)
    },
    getIdCustomer(data) {
      // check customers dafault
      if (data) {
        this.customerType = data.customerTypeId
        this.isCheckShopId = true
        this.searchOptions.customerId = data.id
        this.editOnlinePermission = true
        this.customerFullName = data.fullName
        if (this.customerTypeCurent !== this.customerType) {
          this.productChangePrice = this.orderProducts.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          }))
          this.UPDATE_PRICE_TYPE_CUSTOMER_ACTION({
            customerTypeId: this.customerType,
            products: this.productChangePrice,
            params: this.decentralization,
          })
          this.customerTypeCurent = this.customerType
        }
      } else {
        this.isCheckShopId = false
      }
    },

    getSalemtPOSelected(val) {
      this.orderSelected = val
      const { usedShop } = this.loginInfo
      if (val.id === '1') {
        this.isOnline = false
        this.onlineOrderId = null
        this.editOnlinePermission = true
        this.editManualPermission = true
      }

      if (val.id !== '1' && this.orderProducts.length > 0) {
        if (val.id !== '1' && usedShop.id === this.currentCustomer.shopId) {
          if (usedShop.manuallyCreatable === false) {
            this.$refs.salesNotifyModal.show()
          }
        }
      }

      if (val.id !== '1') {
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

    salemtDeliveryTypeSelected(val) {
      this.deliverySelected = val
    },

    getSalemtPOOptions(val) {
      this.salemtPOOptions = val
    },

    onClickAgreeButton() {
      this.orderProducts = []
      this.$refs.salesNotifyModal.hide()
      this.isDisabledOrder = true
    },
    closeNotifyModal() {
      this.$refs.salesNotifyModal.hide()
      this.isDisabledOrder = true
    },
    // Create callback function to receive barcode when the scanner is already done
    onBarcodeScanned(barcode) {
      if (barcode.length > 4) {
        this.GET_PRODUCT_BY_BARCODE_ACTION({
          data: {
            customerId: this.searchOptions.customerId,
            barcode: barcode.toString(),
          },
          onSuccess: () => {
          },
          onFailure: () => {
          },
        })
      }
    },
    // Reset to the last barcode before hitting enter (whatever anything in the input box)
    // resetBarcode() {
    //   const barcode = this.$barcodeScanner.getPreviousCode()
    //   console.log(barcode)
    //   // do something...
    // },
  },
}
</script>
<style>
.p-input {
  padding: 0.438rem 0.7rem;
}
.b-icon-x:hover {
  color: black;
}
</style>
