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
            :component-attr-class-autosuggest-results="(productsSearchLength < 10) ? 'autosuggest__results check-auto-suggesst' : 'autosuggest__results'"
            @keyup.enter="onChangeKeyWord"
            @selected="onClickAddProduct"
            @focus="focusInputProduct"
            @blur="blurInputSearch"
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
                :disabled="(currentOrderNumber.onlineOrderId !== null && currentOrderNumber.orderNumber !== null && editOnlinePermission === false)"
                maxlength="7"
                class="text-center h7 p-input"
                @change="onChangeQuantity(props.row.originalIndex)"
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

            <!-- START - tableProductUnitPrice -->
            <b-row
              v-else-if="props.column.field === 'productUnitPrice'"
              align-v="center"
              align-h="end"
              class="mx-0 pr-1"
            >
              {{ $formatNumberToLocale(props.row.productUnitPrice) }}
              <b-icon-shield-exclamation
                v-if="props.row.productUnitPrice === 0"
                color="red"
                class="cursor-pointer ml-icon"
                font-scale="1.5"
              />
            </b-row>
            <!-- END - tableProductUnitPrice -->

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

        <!-- START - Notify Modal Leave Page -->
        <b-modal
          ref="salesNotifyLeaveModal"
          title="Thông báo"
        >
          Đơn hàng vẫn chưa được thanh toán, bạn có thực sự muốn chuyển sang chức năng khác không ?
          <template #modal-footer>
            <b-button
              variant="someThing"
              class="btn-brand-1"
              @click="onClickAgreeLeaveButton()"
            >
              Đồng ý
            </b-button>
            <b-button @click="closeNotifyLeaveModal()">
              Đóng
            </b-button>
          </template>
        </b-modal>
        <!-- END - Notify Modal Leave Page -->

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
        :is-new-button="isNewButton"
        :is-open-pay-modal="isOpenPayModal"
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
        @getSearchOption="getSearchOption"
        @checkApParramCode="checkApParramCode"
        @changeStateOpenPayModal="changeStateOpenPayModal"
        @focusInputCustomer="focusInputCustomer"
        @focusInputNote="focusInputNote"
        @focusOrderOnline="focusOrderOnline"
        @blurInputSearchCustomers="blurInputSearchCustomer"
      />
      <!-- END - Section Form pay -->

    </b-row>
    <!-- END - Body -->

    <loading
      class="d-print-none"
      :active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      loader="spinner"
      color="#315899"
      opacity="0"
    />
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
import Loading from 'vue-loading-overlay'
import { sendToCustomerDisplay } from '@core/utils/utils'
import { removeVietnameseTones } from '@core/utils/filter'
import SalesForm from './components/SalesForm.vue'
// import SalesProducts from './components/SalesProducts.vue'
import {
  SALES,
  // Getter
  GET_PRODUCTS_GETTER,
  GET_PRODUCT_INFOS_GETTER,
  GET_TOP_SALE_PRODUCTS_GETTER,
  UPDATE_PRICE_TYPE_CUSTOMER_GETTER,
  GET_EDIT_ONLINE_PERMISSION_GETTER,

  // Action
  GET_PRODUCTS_ACTION,
  GET_TOP_SALE_PRODUCTS_ACTION,
  UPDATE_PRICE_TYPE_CUSTOMER_ACTION,
  GET_EDIT_ONLINE_PERMISSION_ACTION,
} from '../store-module/type'

export default {
  components: {
    VueAutosuggest,
    SalesForm,
    VIconRemove,
    // SalesProducts,
    Loading,
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
      currentOrderNumber: {
        onlineOrderId: null,
        orderNumber: null,
        note: null,
      },
      currentSearchModalOption: {},
      salemtPOOptions: [],
      selectedValue: null,
      checkStock: false,
      isDisabled: false, // check tồn kho disable button thanh toán
      isSelectedProduct: false, // check selected product
      productIdSelected: null,
      minSearch: commonData.minSearchLength,
      goNext: () => {},

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
        size: commonData.minSearchSize,
        page: 0,
        checkBarcode: true,
      },
      orderProducts: [],
      productInfos: [],
      productInfoTypeOptions: saleData.productInfoType,
      productsSearch: [{ data: '' }],
      productsSearchLength: 0,

      isActive: false,
      customerFullName: null, // get bills Name
      billSelected: 1,
      billFirst: 1,
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
            code: null,
          },
          orderType: {
            value: null,
          },
          deliveryType: {
            value: null,
          },
          searchModalOption: {
            searchKeywords: null,
            phoneNumber: null,
            idNo: null,
          },
          orderId: null,
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
      isOffline: true,
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
      paging: 0,
      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      orderCurrentId: 1, // Id of order current
      isLoading: false,
      disableOnline: false,
      isNewButton: false,
      productsRow: [],
      totalPageProductsSearch: 0,
      keyWordExist: '',
      arrDateTime: [],
      keyWordExistCheckDateTime: '',
      runBarcode: true,
      isOpenPayModal: false,
    }
  },
  computed: {
    ...mapGetters(SALES, [
      GET_PRODUCTS_GETTER,
      GET_PRODUCT_INFOS_GETTER,
      GET_TOP_SALE_PRODUCTS_GETTER,
      UPDATE_PRICE_TYPE_CUSTOMER_GETTER,
      GET_EDIT_ONLINE_PERMISSION_GETTER,
    ]),
    getProducts() {
      return this.GET_PRODUCTS_GETTER.map(data => ({
        productId: data.id,
        productCode: data.productCode,
        productName: data.productName,
        productUnit: data.uom1,
        productInventory: data.stockTotal ? data.stockTotal : 0,
        quantity: 1,
        productUnitPrice: data.price ? data.price : 0,
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
    getTopSaleProduct() {
      if (this.GET_TOP_SALE_PRODUCTS_GETTER) {
        return this.GET_TOP_SALE_PRODUCTS_GETTER
      }
      return {}
    },
    // getProductSearch() {
    //   if (this.GET_TOP_SALE_PRODUCTS_GETTER.content) {
    //     return this.GET_TOP_SALE_PRODUCTS_GETTER
    //   }
    //   return []
    // },
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
          productInventory: data.stockTotal ? data.stockTotal : 0,
          quantity: data.quantity,
          productUnitPrice: data.price ? data.price : 0,
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
    getEditOnlinePermission() {
      return this.GET_EDIT_ONLINE_PERMISSION_GETTER
    },
  },
  watch: {
    getProductInfos() {
      this.productInfos = [...this.getProductInfos]
    },
    getTopSaleProduct() {
      if (this.getTopSaleProduct.content) {
        if (this.getTopSaleProduct.content.length === 1 && this.searchOptions.checkBarcode === true) {
          const productByBarcode = {
            productId: this.getTopSaleProduct.content[0].id,
            name: this.getTopSaleProduct.content[0].productCode,
            productName: this.getTopSaleProduct.content[0].productName,
            productCode: this.getTopSaleProduct.content[0].productCode,
            productUnit: this.getTopSaleProduct.content[0].uom1,
            productInventory: this.getTopSaleProduct.content[0].stockTotal,
            productUnitPrice: this.getTopSaleProduct.content[0].price,
            sumProductUnitPrice: this.getTopSaleProduct.content[0].price,
            quantity: null,
            productTotalPrice: this.totalPrice(1, Number(this.getTopSaleProduct.content[0].price)),
            sumProductTotalPrice: this.totalPrice(1, Number(this.getTopSaleProduct.content[0].price)),
            productImage: this.getTopSaleProduct.content[0].image,
            comboProductId: this.getTopSaleProduct.content[0].comboProductId,
            nameText: this.getTopSaleProduct.content[0].nameText,
            barCode: this.getTopSaleProduct.content[0].barCode,
          }
          const indexProductExisted = this.orderProducts.findIndex(p => p.productId === productByBarcode.productId)
          if (indexProductExisted === -1) {
            this.orderProducts.push(productByBarcode)
          }

          this.productIdSelected = productByBarcode.productCode
          setTimeout(() => {
            document.getElementById(this.productIdSelected).focus()
            document.getElementById(this.productIdSelected).select()
          }, 100)

          this.searchOptions.keyWord = ''
        } else {
          this.getTopSaleProduct.content.forEach(data => {
            if (!this.productsRow.find(item => item.productId === data.id)) {
              this.productsRow.push({
                productId: data.id,
                checkStockTotal: data.checkStockTotal,
                name: this.searchOptions.keyWord,
                productName: data.productName,
                productCode: data.productCode,
                productUnit: data.uom1,
                productInventory: data.stockTotal,
                productUnitPrice: data.price,
                sumProductUnitPrice: data.price,
                quantity: null,
                productTotalPrice: this.totalPrice(0, Number(data.price)),
                sumProductTotalPrice: this.totalPrice(1, Number(data.price)),
                productImage: data.image,
                comboProductId: data.comboProductId,
                nameText: data.nameText,
                barCode: data.barCode,
              })
            }
          })
          this.productsSearch = [{
            data: this.productsRow,
          }]
          this.productsSearchLength = this.productsSearch[0].data.length
          if (this.productsSearch[0].data && this.productsSearch[0].data.length === 1) {
            this.$nextTick(() => document.getElementById('autosuggest__input_product').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })))
          }
        }
      }
      if (this.getTopSaleProduct.totalPages) {
        if (this.getTopSaleProduct.totalPages !== this.totalPageProductsSearch) {
          this.totalPageProductsSearch = this.getTopSaleProduct.totalPages
          if (this.totalPageProductsSearch > 1) {
            // eslint-disable-next-line no-plusplus
            for (let i = 1; i < this.totalPageProductsSearch; i++) {
              this.callTopSaleProductsAction(i)
            }
          } else {
            this.isLoading = false
            this.$nextTick(() => {
              document.getElementById('autosuggest__input_product').focus()
              document.getElementById('autosuggest__input_product').click()
            })
          }
        } else if (this.searchOptions.keyWord !== this.searchOptions.keyWordExist) {
          let productsFiltered = this.productsRow.filter(product => (product.productCode || '').toLowerCase().includes(this.searchOptions.keyWord.trim().toLowerCase())
                                                            || (product.productName || '').toLowerCase().includes(this.searchOptions.keyWord.trim().toLowerCase()) || (product.barCode || '').toLowerCase().includes(this.searchOptions.keyWord.trim().toLowerCase()))
          productsFiltered = [...productsFiltered.map(item => ({
            ...item,
            name: this.searchOptions.keyWord,
          }))]
          this.productsSearch = [{
            data: productsFiltered,
          }]

          this.productsSearchLength = this.productsSearch[0].data.length
          if (this.productsSearch[0].data && this.productsSearch[0].data.length === 1) {
            this.$nextTick(() => document.getElementById('autosuggest__input_product').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })))
          }
        }
      } else {
        this.isLoading = false
        this.$nextTick(() => document.getElementById('autosuggest__input_product').focus())
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

    selectedProduct() {
      this.selectedValue = this.selectedProduct
    },
    orderProducts() {
      this.orderProducts.forEach(data => {
        if (data.productUnitPrice === null) {
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
    customerFullName() {
      if (this.customerFullName !== '') {
        this.bills.find(item => item.id === this.billSelected).billName = this.customerFullName
        this.customerFullName = ''
      }
    },
    getEditOnlinePermission() {
      this.editManualPermission = this.getEditOnlinePermission.manuallyCreatable
      this.editOnlinePermission = this.getEditOnlinePermission.editable
    },
    // runBarcode: {
    //   handler() {
    //     console.log(this.runBarcode)
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    this.GET_EDIT_ONLINE_PERMISSION_ACTION()
    sendToCustomerDisplay('Kinh chao quy khach', true)
    sendToCustomerDisplay('                  ', false)
  },
  // before page leave, this will check
  beforeRouteLeave(to, from, next) {
    if (this.checkProductNotPay()) {
      this.$refs.salesNotifyLeaveModal.show()
      this.goNext = next
    } else {
      next()
    }
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
    // which emits `start` and `finish` events
    this.$barcodeScanner.setSensitivity(30)
    // Add barcode scan listener and pass the callback function
    this.$barcodeScanner.init(this.onBarcodeScanned)
    // const eventBus = this.$barcodeScanner.init(this.onBarcodeScanned, { eventBus: true })
    // if (eventBus) {
    //   eventBus.$on('start', () => { console.log('start') })
    //   eventBus.$on('finish', () => { console.log('end') })
    // }
  },
  destroyed() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy()
  },
  methods: {
    ...mapActions(SALES, [
      GET_PRODUCTS_ACTION,
      GET_TOP_SALE_PRODUCTS_ACTION,
      UPDATE_PRICE_TYPE_CUSTOMER_ACTION,
      GET_EDIT_ONLINE_PERMISSION_ACTION,
    ]),

    totalPrice(amount, price) {
      return amount * (price || 0)
    },

    increaseAmount(productId) {
      const index = this.orderProducts.findIndex(i => i.productId === productId)
      if (this.isOffline === true
        || (this.isOffline === false && this.currentOrderNumber.onlineOrderId === null && this.editManualPermission === true)
        || (this.currentOrderNumber.onlineOrderId !== null && this.currentOrderNumber.orderNumber !== null && this.editOnlinePermission === true)
        || (this.isOffline === false && this.currentOrderNumber.onlineOrderId === null && this.editOnlinePermission === true && this.editManualPermission === true)
        || (this.currentOrderNumber.onlineOrderId !== null && this.currentOrderNumber.orderNumber !== null && this.editOnlinePermission === true && this.editManualPermission === true)) {
        this.orderProducts[index].quantity += 1
        this.orderProducts[index].productTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
        this.orderProducts[index].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
      }
    },

    decreaseAmount(productId) {
      const index = this.orderProducts.findIndex(i => i.productId === productId)
      if (this.isOffline === true
        || (this.isOffline === false && this.currentOrderNumber.onlineOrderId === null && this.editManualPermission === true)
        || (this.currentOrderNumber.onlineOrderId !== null && this.currentOrderNumber.orderNumber !== null && this.editOnlinePermission === true)
        || (this.isOffline === false && this.currentOrderNumber.onlineOrderId === null && this.editOnlinePermission === true && this.editManualPermission === true)
        || (this.currentOrderNumber.onlineOrderId !== null && this.currentOrderNumber.orderNumber !== null && this.editOnlinePermission === true && this.editManualPermission === true)) {
        this.orderProducts[index].quantity -= 1
        if (this.orderProducts[index].quantity <= 0) {
          this.orderProducts[index].quantity = 0
        }

        this.orderProducts[index].productTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
        this.orderProducts[index].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
      }
    },

    onClickDeleteProduct(index) {
      if (this.isOffline === true
        || (this.isOffline === false && this.currentOrderNumber.onlineOrderId === null && this.editManualPermission === true)
        || (this.currentOrderNumber.onlineOrderId !== null && this.currentOrderNumber.orderNumber !== null && this.editOnlinePermission === true)
        || (this.isOffline === false && this.currentOrderNumber.onlineOrderId === null && this.editOnlinePermission === true && this.editManualPermission === true)
        || (this.currentOrderNumber.onlineOrderId !== null && this.currentOrderNumber.orderNumber !== null && this.editOnlinePermission === true && this.editManualPermission === true)) {
        this.orderProducts.splice(index, 1)
      }
    },
    // check shop default
    focusInputProduct() {
      this.searchOptions.checkBarcode = false
      this.runBarcode = true
      if (this.isSelectedProduct) {
        this.productsSearch = [{ data: null }]
        this.isSelectedProduct = false
      }
    },
    blurInputSearch() {
      if (this.searchOptions.keyWord.length < this.minSearch) {
        this.productsSearch = [{ data: null }]
      }
      this.searchOptions.checkBarcode = true
      this.searchOptions.runBarcode = true
    },

    blurInputSearchCustomer() {
      this.$nextTick(() => document.getElementById('autosuggest__input_product').blur())
      this.runBarcode = true
    },

    // Create callback function to receve barcode when the scanner is already done
    onBarcodeScanned(barcode) {
      if (!this.isOpenPayModal && this.runBarcode && barcode.length > 4) {
        this.searchOptions.keyWord = ''
        let barcodeParam = barcode
        if (barcodeParam.includes('Enter')) { // remove Enter keyword after scan barcode
          barcodeParam = barcodeParam.slice(0, -5)
        }
        if (this.searchOptions.checkBarcode) {
          if (this.editOnlinePermission || this.isOffline === true || (this.editManualPermission && this.onlineOrderId === null)) {
            this.searchOptions.keyWord = barcodeParam
            this.productsSearch = [{ data: null }]
            this.productsRow = []
            this.totalPageProductsSearch = 0
            this.callTopSaleProductsAction(0)
          }
        } else if (this.searchOptions.keyWord !== barcodeParam) {
          this.searchOptions.keyWord = barcodeParam
          this.searchOptions.checkBarcode = true
          this.onChangeKeyWord()
        }
      }
    },
    onChangeKeyWord() {
      if (this.searchOptions.keyWord < 1) {
        this.keyWordExist = ''
        this.productsSearch = [{ data: null }]
        this.productsRow = []
        this.totalPageProductsSearch = 0
      }
      if (this.searchOptions.keyWord.length >= this.minSearch) {
        let keywordSplice = this.searchOptions.keyWord
        if (this.keyWordExist.length > 0) {
          keywordSplice = keywordSplice.slice(0, this.keyWordExist.length)
        }
        if (this.keyWordExist !== keywordSplice) {
          // this.runBarcode = false
          this.productsSearch = [{ data: null }]
          this.productsRow = []
          this.totalPageProductsSearch = 0
          if (this.isCheckShopId) {
            this.keyWordExist = this.searchOptions.keyWord
            this.isLoading = true
            this.totalPageProductsSearch = 0
            this.callTopSaleProductsAction(this.searchOptions.page)
            const el = document.querySelector(':focus')
            if (el) {
              el.blur()
              this.searchOptions.checkBarcode = false
            }
          } else {
            toasts.error('Vui lòng chọn khách hàng trước khi chọn sản phẩm')
          }
        } else if (this.productsRow.length > 0) {
          let productsFiltered = this.productsRow.filter(product => (product.productCode || '').toLowerCase().includes(this.searchOptions.keyWord.trim().toLowerCase())
                                                            || (product.productName || '').toLowerCase().includes(this.searchOptions.keyWord.trim().toLowerCase()) || (product.barCode || '').toLowerCase().includes(this.searchOptions.keyWord.trim().toLowerCase()))
          productsFiltered = [...productsFiltered.map(item => ({
            ...item,
            name: this.searchOptions.keyWord,
          }))]
          this.productsSearch = [{
            data: productsFiltered,
          }]

          this.productsSearchLength = this.productsSearch[0].data.length
          if (this.productsSearch[0].data && this.productsSearch[0].data.length === 1) {
            this.$nextTick(() => document.getElementById('autosuggest__input_product').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })))
          }
        }
      }
    },
    callTopSaleProductsAction(page) {
      let keyWordSearch = this.searchOptions.keyWord
      this.searchOptions.checkStockTotal = this.checkStockTotal ? 1 : 0
      this.searchOptions.customerId = this.currentCustomer.id
      if (this.keyWordExist.length > 0) {
        keyWordSearch = this.keyWordExist
      }
      this.GET_TOP_SALE_PRODUCTS_ACTION({
        data: {
          ...this.searchOptions,
          page,
          keyWord: keyWordSearch,
        },
        onSuccess: () => {
          if (page + 1 === this.totalPageProductsSearch) {
            this.isLoading = false
            this.$nextTick(() => document.getElementById('autosuggest__input_product').focus())
          }
        },
      })
    },

    onClickAddProduct(index) {
      if (index === null) {
        this.$refs.search.$el.querySelector('input').focus()
        this.$refs.search.$el.querySelector('input').click()
      } else {
        // check permission online order manual or online order from system to add product
        if (this.isOffline === true
        || (this.isOffline === false && this.currentOrderNumber.onlineOrderId === null && this.editManualPermission === true)
        || (this.currentOrderNumber.onlineOrderId !== null && this.currentOrderNumber.orderNumber !== null && this.editOnlinePermission === true)
        || (this.isOffline === false && this.currentOrderNumber.onlineOrderId === null && this.editOnlinePermission === true && this.editManualPermission === true)
        || (this.currentOrderNumber.onlineOrderId !== null && this.currentOrderNumber.orderNumber !== null && this.editOnlinePermission === true && this.editManualPermission === true)) {
          if (index && index.item) {
            const productIndex = this.orderProducts.findIndex(data => data.productCode === index.item.productCode)
            if (productIndex === -1) {
              this.orderProducts.push(index.item)
            }
            this.searchOptions.keyWord = ''
            this.isSelectedProduct = true
            this.productsSearch = [{ data: null }]
            this.productIdSelected = index.item.productCode
            this.productsRow = []
            this.keyWordExist = ''
            sendToCustomerDisplay(removeVietnameseTones(index.item.productName, true), true)
            sendToCustomerDisplay('                                         ', true)
            setTimeout(() => {
              document.getElementById(this.productIdSelected).focus()
              document.getElementById(this.productIdSelected).select()
            }, 100)
          } else {
            this.$refs.search.$el.querySelector('input').click()
          }
        }
        this.productsSearch = [{ data: null }]
        // not have permission edit online order manual
        if ((!this.editManualPermission && this.onlineOrderId === null && this.isOffline === false)) {
          toasts.error('Vui lòng vào chức năng "Đơn online" trên màn hình Bán hàng để chọn đơn hàng online cần xử lý!')
        }
      }
    },

    getOrderNumber(val) {
      if (val) {
        this.currentOrderNumber = val
        this.onlineOrderId = val.onlineOrderId

        this.bills = this.bills.map(bill => {
          if (this.currentOrderNumber.onlineOrderId !== null && this.currentOrderNumber.orderNumber !== null) {
            if (bill.id === this.orderCurrentId) {
              return {
                ...bill,
                orderType: {
                  value: val.type.value,
                },
                orderId: val.onlineOrderId,
              }
            }
          }

          return bill
        })
      }
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
            code: this.defaultCustomer.customerCode,
          },
          orderType: {
            value: this.defaultPOSelected,
          },
          deliveryType: {
            value: this.defaultDTSelected,
          },
          searchModalOption: {
            searchKeywords: null,
            phoneNumber: null,
            idNo: null,
          },
          orderId: null,
          orderNumber: null,
          note: null,
          active: false,
          class: '',
        })
        this.customerFullName = ''
        this.isNewButton = true
        this.clickBillButton(lastIteminBill.id + 1)
      } else {
        this.bills.push({
          id: 1,
          products: [],
          customer: {
            id: this.defaultCustomer.id,
            fullName: this.defaultCustomer.fullName,
            phoneNumber: this.defaultCustomer.phoneNumber,
            totalBill: this.defaultCustomer.totalBill,
            address: this.defaultCustomer.address,
            code: this.defaultCustomer.customerCode,
          },
          orderType: {
            value: this.defaultPOSelected,
          },
          deliveryType: {
            value: this.defaultDTSelected,
          },
          searchModalOption: {
            searchKeywords: null,
            phoneNumber: null,
            idNo: null,
          },
          orderId: null,
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
              code: this.currentCustomer.code,
            },
            orderId: this.currentOrderNumber.onlineOrderId,
            orderNumber: this.currentOrderNumber.orderNumber,
            note: this.currentOrderNumber.note,
            searchModalOption: {
              searchKeywords: this.currentSearchModalOption.searchKeywords,
              phoneNumber: this.currentSearchModalOption.phoneNumber,
              idNo: this.currentSearchModalOption.idNo,
            },
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
          this.currentCustomer.code = bill.customer.code
          this.currentCustomer.address = bill.customer.address
          this.currentOrderNumber.onlineOrderId = bill.orderId
          this.currentOrderNumber.orderNumber = bill.orderNumber
          this.currentOrderNumber.note = bill.note
          this.currentSearchModalOption.searchKeywords = bill.searchModalOption.searchKeywords
          this.currentSearchModalOption.phoneNumber = bill.searchModalOption.phoneNumber
          this.currentSearchModalOption.idNo = bill.searchModalOption.idNo
          this.onlineOrderId = bill.orderNumber

          if (this.onlineOrderId === undefined) {
            this.onlineOrderId = null
          }

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
    onChangeQuantity(index) {
      if (this.orderProducts[index].quantity <= 0) {
        this.orderProducts[index].quantity = 0
      }
      this.orderProducts[index].productTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
      this.orderProducts[index].sumProductTotalPrice = this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice))
      const totalPriceShow = this.$formatNumberToLocale(this.totalPrice(Number(this.orderProducts[index].quantity), Number(this.orderProducts[index].sumProductUnitPrice)))
      sendToCustomerDisplay(removeVietnameseTones(this.orderProducts[index].productName, true), true)
      sendToCustomerDisplay(this.formatTextDisplayCustomer(this.$formatNumberToLocale(this.orderProducts[index].quantity), totalPriceShow), true)
    },
    getCustomerDefault(val) {
      this.customerTypeCurent = val.customerTypeId
      this.defaultCustomer = val
      this.customerId = val.id
      this.searchOptions.customerId = this.customerId
      this.currentCustomerId = this.customerId
      this.customerFullName = val.fullName

      // check customers dafault
      if (val) {
        this.isCheckShopId = true
      } else {
        this.isCheckShopId = false
      }
    },

    getOnlineCustomer(val) {
      this.searchOptions.customerId = val.id
      this.customerFullName = val.fullName
    },

    getCustomerTypeInfo(val) {
      // check customers dafault
      if (val) {
        this.isCheckShopId = true
        this.customerType = val.customerTypeId
        this.searchOptions.customerId = val.id
        this.customerFullName = val.fullName

        // update price product when different type id customer
        if (this.orderProducts.length > 0) {
          this.productChangePrice = this.orderProducts.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            productName: item.productName,
            productCode: item.productCode,
          }))
          this.UPDATE_PRICE_TYPE_CUSTOMER_ACTION({
            customerTypeId: this.customerType,
            products: this.productChangePrice,
            params: this.decentralization,
          })
        }
        this.$refs.search.$el.querySelector('input').focus()
      } else {
        this.isCheckShopId = false
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
        if (this.getEditOnlinePermission.editable) {
          this.editOnlinePermission = true
        } else {
          this.editOnlinePermission = false
        }
        // update price product when different type id customer
        if (this.customerTypeCurent !== this.customerType) {
          if (this.orderProducts.length > 0) {
            this.productChangePrice = this.orderProducts.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              productName: item.productName,
              productCode: item.productCode,
            }))
            this.UPDATE_PRICE_TYPE_CUSTOMER_ACTION({
              customerTypeId: this.customerType,
              products: this.productChangePrice,
              params: this.decentralization,
            })
            this.customerTypeCurent = this.customerType
          }
          this.customerTypeCurent = this.customerType
        }
        this.$refs.search.$el.querySelector('input').focus()
      } else {
        this.isCheckShopId = false
      }
    },

    getSalemtPOSelected(val) {
      this.orderSelected = val
      if (this.orderSelected.apParamCode.includes('ONLINE')) {
        if ((this.currentOrderNumber.onlineOrderId === null && this.editManualPermission === false)
          || (this.currentOrderNumber.onlineOrderId !== null && this.editOnlinePermission === false)) {
          this.disableOnline = true
        }
      } else {
        this.disableOnline = false
        this.isOffline = true
        this.onlineOrderId = null
      }
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
    onClickAgreeLeaveButton() {
      this.goNext()
    },
    closeNotifyLeaveModal() {
      this.$refs.salesNotifyLeaveModal.hide()
    },
    checkProductNotPay() {
      const billHaveProduct = this.bills.some(item => item.products.length > 0)
      if (this.orderProducts.length > 0 || billHaveProduct) {
        return true
      }
      return false
    },

    getSearchOption(val) {
      this.currentSearchModalOption = val
    },

    checkApParramCode(val) {
      this.isOffline = val
    },
    formatTextDisplayCustomer(quantity, amount) {
      if (quantity === null || quantity === 0 || amount === null || amount === 0) {
        return '                      '
      }

      let spaceText = ''
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < saleData.sizeTextDisplayCustomer - (quantity.toString().length + amount.toString().length); i++) {
        spaceText += ' '
      }
      return `${quantity.toString()}${spaceText}${amount.toString()}`
    },
    changeStateOpenPayModal(state) {
      this.isOpenPayModal = state
    },
    focusInputCustomer() {
      this.runBarcode = false
    },
    focusInputNote() {
      this.runBarcode = false
    },
    focusOrderOnline() {
      this.runBarcode = false
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
