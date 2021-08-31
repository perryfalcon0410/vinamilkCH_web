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
      <b-col>
        <!-- START - Form and Table -->
        <b-row>
          <!-- START - Form -->
          <b-col
            xl="4"
            class="bg-white shadow rounded mr-xl-1"
          >
            <!-- START -  Date  -->
            <b-row class="my-1">
              <b-col cols="4">
                Ngày biên bản:
              </b-col>
              <b-col class="font-weight-bold">
                <strong>
                  {{ exchangeGoodsInfo.minuteDate }}
                </strong>
              </b-col>
            </b-row>
            <!-- END -  Date -->

            <!-- START -  Number -->
            <validation-provider
              v-slot="{ errors, passed, touched }"
              rules="code|required"
              name="số biên bản"
            >
              <div class="mt-2">
                Số biên bản <sup class="text-danger">*</sup>
              </div>
              <b-form-input
                ref="focusInput"
                v-model.trim="exchangeGoodsInfo.transCode"
                :state="touched ? passed : null"
                maxlength="40"
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
                ref="focusCustomer"
                v-model="customerName"
                maxlength="40"
                :state="touched ? passed : null"
                :suggestions="customers"
                :input-props="{
                  id:'autosuggest__input',
                  class:'form-control',
                  placeholder:'Nhập mã hoặc tên khách hàng'
                }"
                @keyup.enter="customerOptions"
                @input="changeInput"
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
              v-slot="{ errors }"
              rules="required"
              name="địa chỉ"
            >
              <div class="mt-1">
                Địa chỉ <sup class="text-danger">*</sup>
              </div>
              <b-input
                v-model.trim="customerInfo.customerAddress"
                maxlength="200"
                readonly
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
            <!-- END -  Address-->

            <!-- START -  Phone number -->
            <validation-provider
              v-slot="{ errors}"
              rules="required"
              name="số điện thoại"
            >
              <div class="mt-1">
                Số điện thoại <sup class="text-danger">*</sup>
              </div>
              <b-form-input
                v-model.trim="customerInfo.customerPhone"
                maxlength="10"
                readonly
                @keypress="$onlyNumberInput"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
            <!-- END -  Phone number -->

            <!-- START -  Reason -->
            <b-form-group class="mt-1">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="lý do"
              >
                <div>
                  Lý do <sup class="text-danger">*</sup>
                </div>
                <tree-select
                  v-model="reasonObj.reasonSelected"
                  :options="reasonObj.reasonOptions"
                  placeholder="Chọn lý do"
                  no-options-text="Không có dữ liệu"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
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
                <div
                  v-if="props.column.field === 'feature'"
                  hidden
                >
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
                  class="mx-0 h7 text-brand-3"
                >
                  {{ $formatNumberToLocale(totalProducts) }}
                </div>

                <div
                  v-else-if="props.column.field === 'productAmount'"
                  class="mx-50 h7 text-brand-3 text-right"
                >
                  {{ $formatNumberToLocale(totalQuantity) }}
                </div>

                <div
                  v-else-if="props.column.field === 'productPriceTotal'"
                  class="mx-50 h7 text-brand-3 text-right"
                >
                  {{ $formatNumberToLocale(totalMoney) }}
                </div>
              </template>
              <!-- END - Custom filter -->

              <!-- START - Custom row -->
              <template
                slot="table-row"
                slot-scope="props"
              >
                <div v-if="props.column.field == 'productAmount'">
                  <cleave
                    :id="damagedProduct[props.row.originalIndex].productCode"
                    v-model.trim="damagedProduct[props.index].productQuantity"
                    class="form-control text-right"
                    :raw="true"
                    :options="options.number"
                    maxlength="7"
                    @keypress.native="$onlyNumberInput"
                    @keyup.native="onChangeQuantity(damagedProduct[props.index])"
                    @keydown.enter.native="focusInputSearch"
                  />
                </div>

                <div
                  v-if="props.column.field === 'feature'"
                >
                  <b-icon-trash-fill
                    v-b-popover.hover.top="'Xóa'"
                    class="cursor-pointer"
                    scale="1.3"
                    color="red"
                    @click="onClickDeleteButton(props.row.originalIndex)"
                  />
                </div>

                <div
                  v-else-if="props.column.field === 'productPrice' || props.column.field === 'productPriceTotal'"
                  class="pr-70"
                >
                  {{ props.formattedRow[props.column.field] }}
                </div>

                <div v-else>
                  {{ props.formattedRow[props.column.field] }}
                </div>
              </template>
              <!-- END - Custom row -->

              <!-- START - Table Footer -->
              <div
                slot="table-actions-bottom"
                class="m-2"
              >
                <!-- START - Prodduct input -->
                <vue-autosuggest
                  ref="searchProduct"
                  v-model="productInfos.productName"
                  :suggestions="products"
                  :input-props="{
                    id:'autosuggest_product__input',
                    class:'form-control w-30',
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
                  class="btn-brand-1 rounded text-uppercase aligns-items-button-center h8"
                  @click="onClickSaveButton"
                >
                  <b-icon-download
                    class="mr-50"
                  />
                  Lưu
                </b-button>

                <b-button
                  class="btn-brand-1 ml-1 rounded text-uppercase aligns-items-button-center h8"
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
      </b-col>
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
  required,
} from '@/@core/utils/validations/validations'
import { VueAutosuggest } from 'vue-autosuggest'
import Cleave from 'vue-cleave-component'
import toasts from '@core/utils/toasts/toasts'
import { getNow } from '@/@core/utils/utils'
import {
  WAREHOUSES_EXCHANGE_DAMAGED_GOODS,
  // GETTERS
  CUSTOMERS_GETTER,
  PRODUCTS_GETTER,
  EXCHANGE_DAMAGED_GOODS_REASONS_GETTER,
  UPDATE_PRICE_PRODUCT_GETTER,
  // ACTIONS
  CREATE_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_CUSTOMERS_ACTION,
  GET_PRODUCTS_ACTION,
  GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION,
  UPDATE_PRICE_PRODUCT_ACTION,
} from '../store-module/type'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    VueAutosuggest,
    Cleave,
  },

  data() {
    return {
      // validation rules
      code,
      required,

      goNext: () => {},
      isModalShow: false, // Modal xác nhận rời đi.
      isFieldCheck: true,
      customers: [{ data: '' }],
      products: [{ data: '' }],
      negativeCheck: true,
      newSearch: '',
      oldSearch: '',
      allowCallAPI: true,

      reasonObj: {
        reasonSelected: null,
        reasonOptions: [],
      },

      decentralization: {
        formId: 5,
        ctrlId: 7,
      },
      customerId: '',
      customerName: '',
      customerInfo: {
        customerCode: '',
        customerAddress: '',
        customerPhone: '',
        customerTypeId: '',
        status: 1, // để kiểm tra khách hàng còn hoạt động không
      },
      exchangeGoodsInfo: {
        transCode: '',
        shopId: '',
        reasonId: '',
        quantity: 0,
        totalAmount: 0,
        minuteDate: getNow(),
        lstExchangeDetail: [
          {
            productCode: '',
            productName: '',
            price: 0,
            quantity: 0,
            totalPrice: 0,
            unit: '',
          },
        ],
      },
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'productDVT',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'productPrice',
          type: 'number',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Số lượng',
          field: 'productAmount',
          type: 'number',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Thành tiền',
          field: 'productPriceTotal',
          type: 'number',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
          tdClass: 'align-middle',
        },
      ],
      productInfos: {
        productName: null,
      },
      damagedProduct: [],
      productIdSelected: null,
      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },
    }
  },

  computed: {
    ...mapGetters(WAREHOUSES_EXCHANGE_DAMAGED_GOODS, [
      CUSTOMERS_GETTER,
      EXCHANGE_DAMAGED_GOODS_REASONS_GETTER,
      PRODUCTS_GETTER,
      UPDATE_PRICE_PRODUCT_GETTER,
    ]),

    getReasonOptions() {
      return this.EXCHANGE_DAMAGED_GOODS_REASONS_GETTER.map(data => ({
        id: data.id,
        label: data.categoryName,
      }))
    },
    getChangePriceProduct() {
      return this.UPDATE_PRICE_PRODUCT_GETTER.map(data => ({
        id: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        productDVT: data.uom1,
        productPrice: data.price,
        productQuantity: data.quantity,
        productPriceTotal: data.totalPrice,
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
      }))
    },

    getProducts() {
      return [{
        data: this.PRODUCTS_GETTER.map(data => ({
          id: data.id,
          productCode: data.productCode,
          name: data.productName,
          productDVT: data.uom1,
          productPrice: data.price,
          productQuantity: data.totalAmount,
          productPriceTotal: data.price * data.totalAmount,
          count: null,
        })),
      }]
    },

    totalProducts() {
      return this.damagedProduct.reduce(accum => accum + 1, 0)
    },
    totalQuantity() {
      return this.damagedProduct.reduce((accum, item) => accum + Number(item.productQuantity), 0)
    },
    totalMoney() {
      return this.damagedProduct.reduce((accum, item) => accum + Number(item.productPriceTotal), 0)
    },
  },

  watch: {
    getReasonOptions() {
      this.reasonObj.reasonOptions = [...this.getReasonOptions]
    },
    getCustomers() {
      this.customers = [...this.getCustomers]
    },
    getProducts() {
      this.products = [...this.getProducts]
    },
    customerId() {
      this.UPDATE_PRICE_PRODUCT_ACTION({
        customerTypeId: this.customerInfo.customerTypeId,
        products: this.damagedProduct.map(item => ({
          productId: item.id,
          quantity: item.productQuantity,
        })) || [],
        params: this.decentralization,
      })
    },
    getChangePriceProduct() {
      this.damagedProduct = [...this.getChangePriceProduct]
    },
    customerName(newSearch, oldSearch) {
      this.newSearch = newSearch
      this.oldSearch = oldSearch
    },
  },

  mounted() {
    this.GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION({ ...this.decentralization })
    this.$refs.focusInput.focus()
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
      CREATE_EXCHANGE_DAMAGED_GOODS_ACTION,
      GET_CUSTOMERS_ACTION,
      GET_PRODUCTS_ACTION,
      GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION,
      UPDATE_PRICE_PRODUCT_ACTION,
    ]),

    statusSaveButton() {
      return this.$permission('WarehousesExchangeDamagedGoodsCreate', 'WarehousesExchangeDamagedGoodsCreateSave')
    },

    createDamagedGoods() {
      this.$refs.formContainer.validate().then(success => {
        if (success && this.checkDuplicatesName() > -1) {
          if (this.damagedProduct.findIndex(item => item.productQuantity < 0) === -1) {
            if (this.damagedProduct.length > 0) {
              this.CREATE_EXCHANGE_DAMAGED_GOODS_ACTION({
                damagedGoodsData: {
                  transCode: this.exchangeGoodsInfo.transCode,
                  customerId: this.customerId,
                  reasonId: this.reasonObj.reasonSelected,
                  lstExchangeDetail: this.damagedProduct.map(item => ({
                    productId: item.id,
                    productCode: item.productCode,
                    productName: item.productName,
                    quantity: item.productQuantity,
                  })),
                },
                onSuccess: () => {
                  this.navigateBack()
                },
              })
            } else toasts.error('Vui lòng thêm sản phẩm')
          } else toasts.error('Không được nhập số âm')
        } else toasts.error('Khách hàng không tồn tại')
      })
    },

    checkDuplicatesName() {
      return this.getAllCustomer.findIndex(x => x.customerName === this.customerName)
    },
    checkNegativeNumber() {
      this.negativeCheck = true
      this.damagedProduct.forEach(item => {
        if (this.negativeCheck) {
          if (item.productQuantity < 0) {
            this.negativeCheck = false
          } else this.negativeCheck = true
        }
      })
    },

    customerOptions() {
      if (this.customerName) {
        if (this.customerName.length >= commonData.minSearchLength) {
          if (this.allowCallAPI) {
            const searchData = {
              searchKeywords: this.customerName,
              status: this.customerInfo.status,
              ...this.decentralization,
            }
            this.GET_CUSTOMERS_ACTION(searchData)
          }
        }
      } else this.customers = [{ data: null }]
      this.allowCallAPI = false
    },
    selectCustomer(customer) {
      if (customer && customer.item) {
        this.customerId = customer.item.customerId
        this.customerInfo.customerCode = customer.item.customerCode
        this.customerName = customer.item.name
        this.customerInfo.customerAddress = customer.item.address
        this.customerInfo.customerPhone = customer.item.mobilePhone
        this.customerInfo.customerTypeId = customer.item.customerTypeId
        this.customers = [{ data: null }]
      } else this.$refs.focusCustomer.$el.querySelector('input').click()
    },

    loadProducts(text) {
      if (text) {
        if (text.length >= commonData.minSearchLength) {
          const searchData = {
            keyWord: text,
            customerId: this.customerId || null,
            ...this.decentralization,
          }
          this.GET_PRODUCTS_ACTION(searchData)
        }
      }
    },

    selectProduct(product) {
      if (product && product.item) {
        const existedProductIndex = this.damagedProduct.findIndex(damagedProduct => damagedProduct.productCode === product.item.productCode)
        if (this.damagedProduct) {
          const obj = {
            count: this.damagedProduct.length,
            id: product.item.id,
            productCode: product.item.productCode,
            productName: product.item.name,
            productDVT: product.item.productDVT,
            productPrice: product.item.productPrice,
            productQuantity: '01',
            productPriceTotal: null,
          }
          if (existedProductIndex === -1) {
            obj.productPriceTotal = obj.productPrice * Number(obj.productQuantity)
            this.damagedProduct.push(obj)
          } else {
            this.damagedProduct[existedProductIndex].productQuantity = Number(this.damagedProduct[existedProductIndex].productQuantity) + Number(obj.productQuantity)
            this.damagedProduct[existedProductIndex].productPriceTotal = Number(obj.productPrice) * this.damagedProduct[existedProductIndex].productQuantity
          }
          this.productInfos.productName = null
          this.products = [{ data: null }]
          // auto focus when choose products
          this.productIdSelected = product.item.productCode
          setTimeout(() => {
            document.getElementById(this.productIdSelected).focus()
          }, 100)
        }
      } else this.$refs.searchProduct.$el.querySelector('input').click()
    },

    onChangeQuantity(props) {
      const existedProductIndex = this.damagedProduct.findIndex(damagedProduct => damagedProduct.productCode === props.productCode)
      this.damagedProduct[existedProductIndex].productPriceTotal = Number(props.productPrice) * this.damagedProduct[existedProductIndex].productQuantity
    },

    onClickDeleteButton(index) {
      this.damagedProduct.splice(index, 1)
    },
    checkFieldsValueLength() {
      if (
        // START FORM
        this.exchangeGoodsInfo.transCode
        || this.customerName
        || this.customerInfo.customerAddress
        || this.customerInfo.customerPhone
        || this.reasonObj.reasonSelected
      ) {
        return true
      }
      return false
    },

    onClickAgreeButton() {
      this.isModalShow = !this.isModalShow
      this.goNext()
    },

    onClickSaveButton() {
      this.isFieldCheck = false
      this.checkDuplicatesName()
      this.checkNegativeNumber()
      this.createDamagedGoods()
    },

    navigateBack() {
      this.$router.replace({ name: 'warehouses-exchange-damaged-goods' })
    },

    focusInputSearch() {
      this.$refs.searchProduct.$el.querySelector('input').focus()
      this.$refs.searchProduct.$el.querySelector('input').click()
    },
    changeInput() {
      if (this.newSearch !== this.oldSearch) {
        this.allowCallAPI = true
      }
    },
  },
}
</script>
