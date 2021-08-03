<template>
  <b-container
    fluid
    class="px-0"
  >
    <!-- START - Form Container-->
    <validation-observer
      ref="formContainer"
      v-slot="{invalid}"
      slim
    >
      <!-- START - Form and Table -->
      <b-row>
        <!-- START - Form -->
        <b-col
          xl="3"
          class="bg-white shadow rounded mr-xl-1 py-1"
        >
          <!-- START -  Date  -->
          <div>
            Ngày biên bản: <strong>{{ exchangeGoodsInfo.transDate }} lúc {{ exchangeGoodsInfo.transTime }}</strong>
          </div>
          <!-- END -  Date -->

          <!-- START -  Number -->
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="code|required"
            name="số biên bản"
          >
            <div class="mt-1">
              Số biên bản <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model.trim="exchangeGoodsInfo.transCode"
              :state="touched ? passed : null"
              maxlength="40"
              disabled
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END -  Number -->

          <!-- START -  Customer -->
          <validation-provider
            v-slot="{ errors, passed, touched}"
            rules="required"
            name="khách hàng"
          >
            <div class="mt-1">
              Khách hàng <sup class="text-danger">*</sup>
            </div>
            <vue-autosuggest
              ref="focusInput"
              v-model="customerInfo.customerName"
              maxlength="40"
              :state="touched ? passed : null"
              :suggestions="customers"
              :input-props="{
                id:'autosuggest__input',
                class:'form-control',
                placeholder:'Nhập mã hoặc tên khách hàng',
              }"
              @input="customerOptions"
              @selected="selectCustomer"
            >

              <template slot-scope="{ suggestion }">
                <div class="cursor-pointer">
                  {{ suggestions }}
                  <div>
                    <b>{{ suggestion.item.name }}</b>
                  </div>
                  <div>{{ suggestion.item.customerCode }} - {{ suggestion.item.mobilePhone }}</div>
                </div>
              </template>
            </vue-autosuggest>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END -  Customer -->

          <!-- START -  Address-->
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="địa chỉ"
          >
            <div class="mt-1">
              Địa chỉ <sup class="text-danger">*</sup>
            </div>
            <b-input
              v-model.trim="customerInfo.customerAddress"
              :state="touched ? passed : null"
              maxlength="200"
              readonly
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END -  Address-->

          <!-- START -  Phone number -->
          <validation-provider
            v-slot="{ errors, passed,touched }"
            rules="phoneNumber|required"
            name="số điện thoại"
          >
            <div class="mt-1">
              Số điện thoại <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model.trim="customerInfo.customerPhone"
              :state="touched ? passed : null"
              maxlength="10"
              readonly
              @keypress="$onlyNumberInput"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END -  Phone number -->

          <!-- START -  Reason -->
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="lý do"
          >
            <div class="mt-1">
              Lý do <sup class="text-danger">*</sup>
            </div>
            <tree-select
              v-model="exchangeGoodsInfo.reasonId"
              :options="reasonObj.reasonOptions"
              placeholder="Chọn lý do"
              no-options-text="Không có dữ liệu"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        <!-- END -  Reason -->

        </b-col>
        <!-- END - Form -->

        <!-- START - Table -->
        <b-col class="bg-white shadow rounded mt-1 mt-xl-0 p-1">
          <!-- START - Table Product -->
          <vue-good-table
            :columns="columns"
            :rows="damagedProduct"
            style-class="vgt-table striped"
            compact-mode
            line-numbers
          >
            <!-- START - Empty rows -->
            <div
              slot="emptystate"
              class="text-center"
            >
              Vui lòng nhập sản phẩm
            </div>
            <!-- END - Empty rows -->

            <!-- START - Custom column -->
            <template
              slot="table-column"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'feature'">
                <b-icon-bricks
                  v-b-popover.hover="'Thao tác'"
                  class="cursor-pointer"
                  scale="1.3"
                  hidden
                />
              </div>
              <div v-else>
                {{ props.column.label }}
              </div>
            </template>
            <!-- END - Custom column -->

            <!-- START - Custom filter -->
            <template
              slot="column-filter"
              slot-scope="props"
            >
              <div
                v-if="props.column.field === 'productCode'"
              >
                {{ $formatNumberToLocale(totalProducts) }}
              </div>

              <b-row
                v-else-if="props.column.field === 'productAmount'"
                class="mx-0"
                align-h="end"
              >
                {{ $formatNumberToLocale(totalQuantity) }}
              </b-row>

              <b-row
                v-else-if="props.column.field === 'totalPrice'"
                class="mx-0"
                align-h="end"
              >
                {{ $formatNumberToLocale(totalMoney) }}
              </b-row>
            </template>
            <!-- END - Custom filter -->

            <!-- START - Custom row -->
            <template
              slot="table-row"
              slot-scope="props"
            >
              <div v-if="props.column.field == 'productAmount'">
                <b-form-input
                  :id="damagedProduct[props.row.originalIndex].productCode"
                  v-model.trim="damagedProduct[props.index].quantity"
                  maxlength="10"
                  class="text-right"
                  @keypress="$onlyNumberInput"
                  @change="onChangeQuantity(damagedProduct[props.index])"
                  @keyup.enter="focusInputSearch"
                />
              </div>

              <div v-if="props.column.field === 'feature'">
                <b-icon-trash-fill
                  v-b-popover.hover.top="'Xóa'"
                  class="cursor-pointer"
                  scale="1.3"
                  color="red"
                  @click="onClickDeleteButton(props.row.originalIndex)"
                />
              </div>

              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
            <!-- END - Custom row -->

            <!-- START - Table Footer -->
            <!-- START - Table Footer -->
            <div
              slot="table-actions-bottom"
              class="m-2"
            >
              <!-- START - Prodduct input -->
              <vue-autosuggest
                ref="searchProduct"
                v-model.trim="productInfos.productName"
                :suggestions="products"
                :input-props="{
                  id:'autosuggest_product__input',
                  class:'form-control w-25',
                  placeholder:'Nhập mã hoặc tên sản phẩm'
                }"
                @input="loadProducts"
                @selected="selectProduct"
              >
                <template
                  slot-scope="{ suggestion }"
                  class="mw-25"
                >
                  <div class="cursor-pointer">
                    {{ suggestions }}
                    <b>{{ suggestion.item.productCode }}</b> - {{ suggestion.item.name }}
                  </div>
                </template>
              </vue-autosuggest>
              <!-- END - Prodduct input -->
            </div>
            <!-- END - Table Footer -->

          </vue-good-table>
          <!-- END - Table Product -->

          <!-- START - Button -->
          <b-row class="m-1 justify-content-end">
            <b-button-group>
              <b-button
                v-if="statusSaveButton().show"
                :disabled="statusSaveButton().disabled || invalid"
                variant="someThing"
                class="btn-brand-1 rounded text-uppercase aligns-items-button-center"
                @click="onClickSaveButton()"
              >
                <b-icon-download
                  class="mr-50"
                />
                Lưu
              </b-button>

              <b-button
                class="btn-brand-1 ml-1 rounded text-uppercase aligns-items-button-center"
                @click="navigateBack"
              >
                <b-icon-x
                  class="mr-50"
                  scale="1.5"
                />
                Đóng
              </b-button>
            </b-button-group>
          </b-row>
        <!-- END - Button -->
        </b-col>
      <!-- END - Table -->

      </b-row>
    <!-- END - Form and Table -->

    </validation-observer>
    <!-- END - Form Container-->

    <!-- START - Customer Modal Close -->
    <b-modal
      v-model="isModalShow"
      title="Thông báo"
    >
      Thông tin sẽ không được cập nhật khi rời trang
      <template #modal-footer>
        <b-button
          variant="someThing"
          class="btn-brand-1 aligns-items-button-center"
          @click="onClickAgreeButton()"
        >
          Đồng ý
        </b-button>
        <b-button
          class="aligns-items-button-center"
          @click="isModalShow = !isModalShow"
        >
          Đóng
        </b-button>
      </template>
    </b-modal>
    <!-- END - Customer Modal Close -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  code,
  phoneNumber,
  required,
} from '@/@core/utils/validations/validations'
import { VueAutosuggest } from 'vue-autosuggest'
import toasts from '@core/utils/toasts/toasts'
// import { getNow } from '@/@core/utils/utils'
import {
  formatISOtoVNI,
  getTimeOfDate,
} from '@/@core/utils/filter'
import {
  WAREHOUSES_EXCHANGE_DAMAGED_GOODS,
  // GETTERS
  CUSTOMERS_GETTER,
  PRODUCTS_GETTER,
  EXCHANGE_DAMAGED_GOODS_REASONS_GETTER,
  EXCHANGE_DAMAGED_GOODS_BY_ID_GETTER,
  DAMAGED_GOODS_GETTER,
  UPDATE_PRICE_PRODUCT_GETTER,
  // ACTIONS
  GET_CUSTOMERS_ACTION,
  GET_PRODUCTS_ACTION,
  GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION,
  GET_EXCHANGE_DAMAGED_GOODS_BY_ID_ACTION,
  UPDATE_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_DAMAGED_GOODS_ACTION,
  UPDATE_PRICE_PRODUCT_ACTION,
} from '../store-module/type'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    VueAutosuggest,
  },

  data() {
    return {
      // validation rules
      code,
      phoneNumber,
      required,

      exchangeDamagedGoodsId: `${this.$route.params.id}`,

      goNext: () => {},
      isModalShow: false, // Modal xác nhận rời đi.
      isFieldCheck: true,
      customers: [{ data: '' }],
      products: [{ data: '' }],

      reasonObj: {
        reasonOptions: [],
      },

      decentralization: {
        formId: 5,
        ctrlId: 7,
      },
      listDamagedProducts: [],
      customerId: '',
      customerInfo: {
        customerCode: '',
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        customerTypeId: '',
        status: 1, // Kiểm tra khách hàng có hoạt động không
      },
      exchangeGoodsInfo: {
        customerId: '',
        transCode: '',
        shopId: '',
        reasonId: '',
        reason: '',
        quantity: 0,
        totalAmount: 0,
        lstExchangeDetail: [
          {
            id: '',
            productCode: '',
            productId: '',
            productName: '',
            quantity: 0,
            totalPrice: 0,
            productDVT: '',
          },
        ],
      },
      columns: [
        {
          label: 'Mã hàng',
          field: 'productCode',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-left',
          tdClass: 'text-left align-middle',
        },
        {
          label: 'Tên hàng',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left align-middle',
        },
        {
          label: 'ĐVT',
          field: 'productDVT',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right align-middle',
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
          thClass: 'text-right',
          tdClass: 'text-right align-middle',
        },
        {
          label: 'Số lượng ',
          field: 'productAmount',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right align-middle',
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
          tdClass: 'align-middle',
        },
      ],
      productInfos: {
        productName: '',
      },
      damagedProduct: [],
      productIdSelected: null,
    }
  },

  computed: {
    ...mapGetters(WAREHOUSES_EXCHANGE_DAMAGED_GOODS, [
      CUSTOMERS_GETTER,
      EXCHANGE_DAMAGED_GOODS_REASONS_GETTER,
      PRODUCTS_GETTER,
      EXCHANGE_DAMAGED_GOODS_BY_ID_GETTER,
      DAMAGED_GOODS_GETTER,
      UPDATE_PRICE_PRODUCT_GETTER,
    ]),

    exchangeDamagedGoods() {
      return this.EXCHANGE_DAMAGED_GOODS_BY_ID_GETTER
    },

    getReasonOptions() {
      return this.EXCHANGE_DAMAGED_GOODS_REASONS_GETTER.map(data => ({
        id: data.id,
        label: data.categoryName,
      }))
    },

    getCustomers() {
      return [{
        data: this.CUSTOMERS_GETTER.map(data => ({
          customerId: data.id,
          customerCode: data.customerCode,
          name: data.fullName,
          address: data.address,
          mobilePhone: data.mobiPhone,
          customerTypeId: data.customerTypeId,
        })),
      }]
    },

    getAllCustomer() {
      return this.CUSTOMERS_GETTER.map(data => ({
        customerId: data.id,
        customerCode: data.customerCode,
        customerName: data.fullName,
        address: data.address,
        mobilePhone: data.mobiPhone,
      }))
    },

    getProducts() {
      return [{
        data: this.PRODUCTS_GETTER.map(data => ({
          id: data.id,
          productCode: data.productCode,
          name: data.productName,
          productDVT: data.uom1,
          price: data.price,
          quantity: data.totalAmount,
          totalPrice: data.price * data.totalAmount,
          count: null,
        })),
      }]
    },

    getChangePriceProduct() {
      return this.UPDATE_PRICE_PRODUCT_GETTER.map(data => ({
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        productDVT: data.uom1,
        price: data.price,
        quantity: data.quantity,
        totalPrice: data.totalPrice,
      }))
    },

    totalProducts() {
      return this.damagedProduct.reduce(accum => accum + 1, 0)
    },
    totalQuantity() {
      return this.damagedProduct.reduce((accum, item) => accum + Number(item.quantity), 0) || 0
    },
    totalMoney() {
      return this.damagedProduct.reduce((accum, item) => accum + Number(item.totalPrice), 0) || 0
    },
  },

  watch: {
    getReasonOptions() {
      this.reasonObj.reasonOptions = [...this.getReasonOptions]
    },
    exchangeDamagedGoods() {
      this.getExchangeDamagedGoodsById()
    },
    getCustomers() {
      this.customers = [...this.getCustomers]
    },
    getProducts() {
      this.products = [...this.getProducts]
    },
    getChangePriceProduct() {
      this.damagedProduct = [...this.getChangePriceProduct]
    },
  },

  mounted() {
    this.GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION({ ...this.decentralization })
    this.GET_EXCHANGE_DAMAGED_GOODS_BY_ID_ACTION(`${this.exchangeDamagedGoodsId}`)
    this.$refs.focusInput.$el.querySelector('input').focus()
  },

  // before page leave this will check input
  beforeRouteLeave(to, from, next) {
    if (this.isFieldCheck) {
      if (this.checkFieldsValueLength()) {
        this.isModalShow = !this.isModalShow
        this.goNext = next
      } else {
        next()
      }
    } else {
      next()
    }
  },

  methods: {
    ...mapActions(WAREHOUSES_EXCHANGE_DAMAGED_GOODS, [
      GET_CUSTOMERS_ACTION,
      GET_PRODUCTS_ACTION,
      GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION,
      GET_EXCHANGE_DAMAGED_GOODS_BY_ID_ACTION,
      UPDATE_EXCHANGE_DAMAGED_GOODS_ACTION,
      GET_DAMAGED_GOODS_ACTION,
      UPDATE_PRICE_PRODUCT_ACTION,
    ]),

    statusSaveButton() {
      return this.$permission('WarehousesExchangeDamagedGoodsUpdate', 'WarehousesExchangeDamagedGoodsUpdateSave')
    },

    getExchangeDamagedGoodsById() {
      if (this.exchangeDamagedGoods) {
        // START - Exchange Damaged Goods
        this.exchangeGoodsInfo.transCode = this.exchangeDamagedGoods.transCode
        this.exchangeGoodsInfo.transDate = formatISOtoVNI(this.exchangeDamagedGoods.transDate)
        this.exchangeGoodsInfo.transTime = getTimeOfDate(this.exchangeDamagedGoods.transDate)
        this.exchangeGoodsInfo.shopId = this.exchangeDamagedGoods.shopId
        this.customerId = this.exchangeDamagedGoods.customerId
        this.customerInfo.customerName = this.exchangeDamagedGoods.customerName
        this.customerInfo.customerAddress = this.exchangeDamagedGoods.customerAddress
        this.customerInfo.customerPhone = this.exchangeDamagedGoods.customerPhone
        this.exchangeGoodsInfo.reasonId = this.exchangeDamagedGoods.reasonId
        this.exchangeGoodsInfo.reason = this.exchangeDamagedGoods.reason
        this.exchangeGoodsInfo.quantity = this.exchangeDamagedGoods.quantity
        this.exchangeGoodsInfo.totalAmount = this.exchangeDamagedGoods.totalAmount
        this.damagedProduct = this.exchangeDamagedGoods.listProducts.map(data => ({
          id: data.id,
          productId: data.productId,
          productCode: data.productCode,
          productName: data.productName,
          productDVT: data.unit,
          price: data.price,
          type: 1,
          quantity: data.quantity,
          totalPrice: data.totalPrice,
        }))
        // END - Exchange Damaged Goods
      }
      this.GET_CUSTOMERS_ACTION({ searchKeywords: this.customerInfo.customerName })
      this.listDamagedProducts = this.damagedProduct.map(data => ({
        id: data.id,
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        type: data.type,
        quantity: data.quantity,
      }))
    },

    updateExchangeDamagedGoods() {
      this.$refs.formContainer.validate().then(success => {
        if (success && this.checkDuplicatesName() > -1) {
          if (this.damagedProduct.length > 0) {
            this.UPDATE_EXCHANGE_DAMAGED_GOODS_ACTION({
              exchangeDamagedGoods: {
                customerId: this.customerId,
                id: this.exchangeDamagedGoodsId,
                lstExchangeDetail: this.listDamagedProducts.map(data => ({
                  id: data.id,
                  productId: data.productId,
                  productCode: data.productCode,
                  productName: data.productName,
                  quantity: data.quantity,
                  type: data.type,
                })),
                reason: this.exchangeGoodsInfo.reason,
                reasonId: this.exchangeGoodsInfo.reasonId,
                transCode: this.exchangeGoodsInfo.transCode,
              },
              onSuccess: () => {
                this.navigateBack()
              },
            })
          } else toasts.error('Vui lòng thêm sản phẩm')
        } else toasts.error('Khách hàng không tồn tại')
      })
    },

    customerOptions(text) {
      if (text) {
        if (text.length >= commonData.minSearchLength) {
          const searchData = {
            searchKeywords: text,
            status: this.customerInfo.status,
            ...this.decentralization,
          }
          this.GET_CUSTOMERS_ACTION(searchData)
        }
      }
    },

    selectCustomer(customer) {
      if (customer.item) {
        this.customerId = customer.item.customerId
        this.customerInfo.customerCode = customer.item.customerCode
        this.customerInfo.customerName = customer.item.name
        this.customerInfo.customerAddress = customer.item.address
        this.customerInfo.customerPhone = customer.item.mobilePhone
        this.customerInfo.customerTypeId = customer.item.customerTypeId
        this.UPDATE_PRICE_PRODUCT_ACTION({
          customerTypeId: this.customerInfo.customerTypeId,
          products: this.damagedProduct.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })) || [],
          params: this.decentralization,
        })
        this.customers = [{ data: null }]
      }
    },

    loadProducts(text) {
      if (text) {
        if (text.length >= commonData.minSearchLength) {
          const searchData = {
            keyWord: this.productInfos.productName,
            customerId: this.customerId || null,
            ...this.decentralization,
          }
          this.GET_PRODUCTS_ACTION(searchData)
        }
      }
    },

    selectProduct(product) {
      const existedProductIndex = this.damagedProduct.findIndex(damagedProduct => damagedProduct.productCode === product.item.productCode)
      if (this.damagedProduct) {
        const obj = {
          count: this.damagedProduct.length,
          id: null,
          productId: product.item.id,
          productCode: product.item.productCode,
          productName: product.item.name,
          productDVT: product.item.productDVT,
          price: product.item.price,
          quantity: 1,
          totalPrice: null,
          type: 0,
        }
        if (existedProductIndex === -1) {
          obj.totalPrice = obj.price * obj.quantity
          this.damagedProduct.push(obj)
          this.listDamagedProducts.push(obj)
        } else {
          this.damagedProduct[existedProductIndex].quantity = Number(this.damagedProduct[existedProductIndex].quantity) + 1
          this.damagedProduct[existedProductIndex].totalPrice = Number(obj.price) * this.damagedProduct[existedProductIndex].quantity
        }
        this.productInfos.productName = null
        this.products = [{ data: null }]
        // auto focus when choose products
        this.productIdSelected = product.item.productCode
        setTimeout(() => {
          document.getElementById(this.productIdSelected).focus()
        }, 100)
      }
    },

    onChangeQuantity(props) {
      const existedProductIndex = this.damagedProduct.findIndex(damagedProduct => damagedProduct.productCode === props.productCode)
      const existedIndex = this.listDamagedProducts.findIndex(damagedProduct => damagedProduct.productCode === props.productCode)
      this.damagedProduct[existedProductIndex].totalPrice = Number(props.price) * this.damagedProduct[existedProductIndex].quantity
      this.listDamagedProducts[existedIndex].quantity = Number(props.quantity)
    },

    clearCustomer() {
      this.customerInfo.customerName = ''
    },

    clearProduct() {
      this.productInfos.productName = ''
    },

    onClickDeleteButton(index) {
      this.listDamagedProducts.forEach((item, i) => {
        if (this.damagedProduct[index].productId === item.productId) {
          this.listDamagedProducts[i].type = 2
        }
        if (item.id === null && item.type === 2) {
          this.listDamagedProducts.splice(i, 1)
        }
      })
      this.damagedProduct.splice(index, 1)
    },
    checkFieldsValueLength() {
      if (
        // START FORM
        this.exchangeGoodsInfo.transCode
        || this.customerInfo.customerName
        || this.customerInfo.customerAddress
        || this.customerInfo.customerPhone
        || this.exchangeGoodsInfo.reasonId
      ) {
        return true
      }
      return false
    },

    onClickAgreeButton() {
      this.isModalShow = !this.isModalShow
      this.goNext()
    },

    checkDuplicatesName() {
      return this.getAllCustomer.findIndex(x => x.customerName === this.customerInfo.customerName)
    },

    onClickSaveButton() {
      this.isFieldCheck = false
      this.checkDuplicatesName()
      this.updateExchangeDamagedGoods()
    },

    navigateBack() {
      this.$router.replace({ name: 'warehouses-exchange-damaged-goods' })
    },

    focusInputSearch() {
      this.$refs.searchProduct.$el.querySelector('input').focus()
      this.$refs.searchProduct.$el.querySelector('input').click()
    },
  },
}
</script>
