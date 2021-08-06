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
              placeholder:'Tìm sản phẩm (F3) - Vui lòng nhập ít nhất 4 kí tự',
            }"
            :component-attr-class-autosuggest-results="(productsSearchLength < 11) ? 'autosuggest__results check-auto-suggesst' : 'autosuggest__results'"
            :salemt-promotion-object-selected="salemtPromotionObjectSelected"
            @input="onChangeKeyWord"
            @selected="onclickAddProduct"
            @focus="focusInputProduct"
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
                      {{ $formatNumberToLocale(suggestion.item.productUnitPrice) }}
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
            v-b-popover.hover.top="'Xóa'"
            class="cursor-pointer"
            font-scale="1.6"
            @click="onClickDeleteButton(bill.id)"
          />
        </b-button-group>

      </b-row>
      <b-row class="ml-1">
        <div>
          <b-icon-plus
            v-b-popover.hover.top="'Thêm mới hóa đơn'"
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
                class="cursor-pointer ml-icon"
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
                @input="onInputChangeQuantity(props.row.originalIndex)"
                @keydown.enter="focusInputSearch"
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
        :edit-manual-permission="editManualPermission"
        :is-disabled="isDisabled"
        :order-number-bill="orderNumber"
        :order-current-id="orderCurrentId"
        @getOnlineOrderInfoForm="getOnlineOrderInfoForm"
        @getCustomerTypeInfo="getCustomerTypeInfo"
        @getCustomerIdInfo="getCustomerIdInfo"
        @getCustomerDefault="getCustomerDefault"
        @getOnlineCustomer="getOnlineCustomer"
        @getCustomerCreate="getCustomerCreate"
        @currentCustomer="getCurrentCustomer"
        @defaultPromotionObjectSelected="getDefaultPromotionObjectSelected"
        @defaultDeliveryTypeSelected="getDefaultDeliveryTypeSelected"
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
import commonData from '@/@db/common'
import { getUserData } from '@/auth/utils'
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
  GET_EDIT_ONLINE_PERMISSION_GETTER,

  // Action
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_INFOS_ACTION,
  GET_TOP_SALE_PRODUCTS_ACTION,
  UPDATE_PRICE_TYPE_CUSTOMER_ACTION,
  GET_PRODUCT_BY_BARCODE_ACTION,
  GET_EDIT_ONLINE_PERMISSION_ACTION,
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
      minSearch: commonData.minSearchLength,

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
          width: '105px',
          sortable: false,
          thClass: 'text-nowrap',
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
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Thành tiền',
          field: 'productTotalPrice',
          sortable: false,
          type: 'number',
          tdClass: 'pr-2 align-middle',
          formatFn: value => this.$formatNumberToLocale(value),
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
          },
          orderType: {
            value: null,
          },
          deliveryType: {
            value: null,
          },
          orderNumber: null,
          note: null,
          active: true,
          class: 'visited-action',
        },
      ],

      // online order
      onlineOrderId: null,
      orderSelected: {},
      deliverySelected: {},
      editOnlinePermission: true,
      editManualPermission: true,
      isOnline: false,
      isDisabledOrder: false,
      defaultPOSelected: null,
      defaultDTSelected: null,

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
      GET_EDIT_ONLINE_PERMISSION_GETTER,
    ]),
    getProducts() {
      return this.GET_PRODUCTS_GETTER.map(data => ({
        productId: data.id,
        productCode: data.productCode,
        productName: data.productName,
        productUnit: data.uom1,
        productInventory: data.stockTotal,
        quantity: 1,
        productUnitPrice: data.price,
        sumProductUnitPrice: data.price,
        productTotalPrice: this.totalPrice(1, Number(data.price)),
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
            productUnitPrice: data.price,
            sumProductUnitPrice: data.price,
            quantity: 1,
            productTotalPrice: this.totalPrice(1, Number(data.price)),
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
      if (this.UPDATE_PRICE_TYPE_CUSTOMER_GETTER) {
        return this.UPDATE_PRICE_TYPE_CUSTOMER_GETTER.map(data => ({
          productId: data.productId,
          productCode: data.productCode,
          productName: data.productName,
          productUnit: data.uom1,
          productInventory: data.stockTotal,
          quantity: data.quantity,
          productUnitPrice: data.price,
          sumProductUnitPrice: data.price,
          productTotalPrice: data.totalPrice,
          sumProductTotalPrice: data.totalPrice,
        }))
      }
      return []
    },

    loginInfo() {
      const login = getUserData()
      return login
    },

    selectedProduct() {
      return this.salemtPromotionObjectSelected
    },
    getProductByBarcode() {
      return this.GET_PRODUCT_BY_BARCODE_GETTER
    },
    getEditOnlinePermission() {
      return this.GET_EDIT_ONLINE_PERMISSION_GETTER
    },
  },
  watch: {
    getProductInfos() {
      this.productInfos = [...this.getProductInfos]
    },
    getProductSearch() {
      this.productsSearch = [...this.getProductSearch]
      this.productsSearchLength = this.productsSearch[0].data.length
      if (this.productsSearch[0].data && this.productsSearch[0].data.length === 1) {
        this.$nextTick(() => document.getElementById('autosuggest__input_product').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })))
      }
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
        productUnitPrice: this.getProductByBarcode.price,
        sumProductUnitPrice: this.getProductByBarcode.price,
        quantity: 1,
        productTotalPrice: this.totalPrice(1, Number(this.getProductByBarcode.price)),
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
    getEditOnlinePermission() {
      this.editManualPermission = this.getEditOnlinePermission.manuallyCreatable
      this.editOnlinePermission = this.getEditOnlinePermission.editable
    },
  },

  mounted() {
    const index = this.productInfoTypeOptions.findIndex(i => i.name === 'Ngành hàng')
    const paramGetProductInfo = {
      type: Number(this.productInfoTypeOptions[index].id),
    }
    this.GET_PRODUCT_INFOS_ACTION(paramGetProductInfo)
    this.GET_EDIT_ONLINE_PERMISSION_ACTION()
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
      GET_EDIT_ONLINE_PERMISSION_ACTION,
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
        this.orderProducts[index].productTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
        this.orderProducts[index].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))

        if (this.orderProducts[index].productInventory <= this.orderProducts[index].quantity) {
          this.orderProducts[index].quantity = this.orderProducts[index].productInventory
        }
      }
    },

    decreaseAmount(productId) {
      const index = this.orderProducts.findIndex(i => i.productId === productId)
      if (this.editOnlinePermission === true) {
        this.orderProducts[index].quantity -= 1
        if (this.orderProducts[index].quantity <= 0) {
          this.orderProducts[index].quantity = 1
        }

        this.orderProducts[index].productTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
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

    onChangeKeyWord() {
      this.searchOptions.checkStockTotal = this.checkStockTotal ? 1 : 0
      if (this.isCheckShopId === true && this.searchOptions.keyWord.length >= this.minSearch) {
        this.GET_TOP_SALE_PRODUCTS_ACTION({
          data: { ...this.searchOptions },
          onSuccess: () => {},
        })
      }
    },

    onclickAddProduct(index) {
      // check permission online order manual or online order from system to add product
      if (this.editOnlinePermission === true) {
        if (index && index.item) {
          const productIndex = this.orderProducts.findIndex(data => data.productCode === index.item.productCode)
          if (productIndex === -1) {
            this.orderProducts.push(index.item)
          } else {
            this.orderProducts[productIndex].productInventory = index.item.productInventory
            if (this.orderProducts[productIndex].productInventory <= this.orderProducts[productIndex].quantity) {
              this.orderProducts[productIndex].quantity = this.orderProducts[productIndex].productInventory
            } else {
              this.orderProducts[productIndex].quantity += 1
            }
            this.orderProducts[productIndex].productUnitPrice = index.item.productUnitPrice
            this.orderProducts[productIndex].sumProductUnitPrice = index.item.sumProductUnitPrice
            this.orderProducts[productIndex].productTotalPrice = this.totalPrice(Number(this.orderProducts[productIndex].quantity), Number(this.orderProducts[productIndex].sumProductUnitPrice))
            this.orderProducts[productIndex].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[productIndex].quantity), Number(this.orderProducts[productIndex].sumProductUnitPrice))
          }
          this.productIdSelected = index.item.productCode
          this.isSelectedProduct = true
          setTimeout(() => {
            document.getElementById(this.productIdSelected).focus()
          }, 100)
        }
      }

      // not have permission edit online order manual
      if (this.editManualPermission === false && this.onlineOrderId === null && this.isOnline === true) {
        toasts.error('Vui lòng vào chức năng "Đơn online" trên màn hình Bán hàng để chọn đơn hàng online cần xử lý!')
        return
      }

      this.productsSearch = [{ data: null }]
      this.searchOptions.keyWord = null
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
            id: this.defaultCustomer.id,
            fullName: this.defaultCustomer.fullName,
            phoneNumber: this.defaultCustomer.mobiPhone,
            totalBill: this.defaultCustomer.totalBill,
            address: this.defaultCustomer.address,
          },
          orderType: {
            value: this.defaultPOSelected,
          },
          deliveryType: {
            value: this.defaultDTSelected,
          },
          orderNumber: null,
          note: null,
          active: false,
          class: '',
        })
        this.clickBillButton(lastIteminBill.id + 1)
      } else {
        this.bills.push({
          id: 1,
          products: [],
          customer: {
            id: this.defaultCustomer.id,
            fullName: this.currentCustomer.fullName,
            phoneNumber: this.currentCustomer.phoneNumber,
            totalBill: this.currentCustomer.totalBill,
            address: this.currentCustomer.address,
          },
          orderType: {
            value: this.defaultPOSelected,
          },
          deliveryType: {
            value: this.defaultDTSelected,
          },
          orderNumber: null,
          note: null,
          active: false,
          class: 'visited-action',
        })
      }
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
              id: this.currentCustomer.id,
              fullName: this.currentCustomer.fullName,
              phoneNumber: this.currentCustomer.phoneNumber,
              totalBill: this.currentCustomer.totalBill,
              address: this.currentCustomer.address,
            },
            orderNumber: this.currentOrderNumber.orderNumber,
            note: this.currentOrderNumber.note,
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
          this.currentCustomer.id = bill.customer.id
          this.currentCustomer.fullName = bill.customer.fullName
          this.currentCustomer.phoneNumber = bill.customer.phoneNumber
          this.currentCustomer.totalBill = bill.customer.totalBill
          this.currentCustomer.address = bill.customer.address
          this.currentOrderNumber.orderNumber = bill.orderNumber
          this.currentOrderNumber.note = bill.note
          return {
            ...bill,
            active: true,
            class: 'visited-action',
          }
        }
        return bill
      })
    },

    deleteSaveBill() {
      this.onClickDeleteButton(this.orderCurrentId)
    },

    getOnlineOrderInfoForm(val) {
      this.orderProducts = val
    },
    focusInputSearch() {
      this.$refs.search.$el.querySelector('input').focus()
      this.$refs.search.$el.querySelector('input').click()
    },
    onInputChangeQuantity(index) {
      if (this.orderProducts[index].productInventory < this.orderProducts[index].quantity) {
        this.isDisabled = true
        return
      }
      this.isDisabled = false
    },
    onChangeQuantity(index) {
      if (this.orderProducts[index].quantity <= 0) {
        this.orderProducts[index].quantity = 1
      }
      if (this.orderProducts[index].productInventory < this.orderProducts[index].quantity) {
        this.isDisabled = false
        this.orderProducts[index].quantity = this.orderProducts[index].productInventory
      }
      this.orderProducts[index].productTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
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
      if (this.productChangePrice.length > 0) {
        this.UPDATE_PRICE_TYPE_CUSTOMER_ACTION({
          customerTypeId: this.customerType,
          products: this.productChangePrice,
          params: this.decentralization,
        })
      }
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
        // update price product when different type id customer
        if (this.customerTypeCurent !== this.customerType) {
          if (this.orderProducts.length > 0) {
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
        }
      } else {
        this.isCheckShopId = false
      }
    },

    getSalemtPOSelected(val) {
      this.orderSelected = val
      // assgin value of order type to current bill being selected
      this.bills = this.bills.map(bill => {
        if (bill.id === this.orderCurrentId) {
          return {
            ...bill,
            orderType: {
              value: val.id,
            },
          }
        }
        return bill
      })

      const { usedShop } = this.loginInfo
      // have permission edit online order manual and online order from system
      if (val.id === this.defaultPOSelected) {
        this.isOnline = false
        this.onlineOrderId = null
      } else {
        this.isOnline = true
        this.onlineOrderId = null
        if (this.orderProducts.length > 0) {
          if (val.id !== this.defaultPOSelected && usedShop.id === this.currentCustomer.shopId) {
            if (!this.editOnlinePermission) {
              this.$refs.salesNotifyModal.show()
            }
          }
        }
      }
    },

    salemtDeliveryTypeSelected(val) {
      this.deliverySelected = val
      // assgin value of delivery type to current bill being selected
      this.bills = this.bills.map(bill => {
        if (bill.id === this.orderCurrentId) {
          return {
            ...bill,
            deliveryType: {
              value: val.id,
            },
          }
        }
        return bill
      })
    },

    getSalemtPOOptions(val) {
      this.salemtPOOptions = val
    },

    getDefaultPromotionObjectSelected(val) {
      this.defaultPOSelected = val
      this.bills = this.bills.map(bill => {
        if (bill.id === this.orderCurrentId) {
          return {
            ...bill,
            orderType: {
              value: val,
            },
          }
        }
        return bill
      })
    },

    getDefaultDeliveryTypeSelected(val) {
      this.defaultDTSelected = val
      this.bills = this.bills.map(bill => {
        if (bill.id === this.orderCurrentId) {
          return {
            ...bill,
            deliveryType: {
              value: val,
            },
          }
        }
        return bill
      })
    },

    onClickAgreeButton() {
      this.orderProducts = []
      this.currentOrderNumber.orderNumber = null
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
.ml-icon {
  margin-left: 0.2rem;
}
</style>
