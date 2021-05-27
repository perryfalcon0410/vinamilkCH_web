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
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END -  Number -->

          <!-- START -  Customer -->
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="tên khách hàng"
          >
            <div class="mt-1">
              Khách hàng <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model.trim="customerInfo.customerName"
              maxlength="40"
              :state="touched ? passed : null"
              @focus="focusCustomer"
              @blur="isFocusedInputCustomer = false"
              @input="customerOptions"
            />
            <small class="text-danger">{{ errors[0] }}</small>
            <!-- START - Popup customers -->
            <b-collapse
              v-model="isFocusedInputCustomer"
              class="position-absolute mr-lg-0 w-md-75"
              style="zIndex:1"
            >
              <b-container
                class="my-1 bg-white rounded border border-primary shadow-lg"
              >
                <b-col>
                  <b-row
                    v-for="(customer, index) in customers"
                    :key="index"
                    class="d-flex flex-column my-1 cursor-pointer"
                    :class="{'item-active': index === cursorCustomer}"
                    @click="selectCustomer(customer)"
                  >
                    <div>
                      <b>{{ customer.customerName }}</b>
                    </div>
                    <div>{{ customer.customerCode }} - {{ customer.mobilePhone }}</div>
                  </b-row>
                </b-col>
              </b-container>
            </b-collapse>
            <!-- END - Popup customers -->
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
                  @click="onClickFeature()"
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
              <span v-if="props.column.field == 'productAmount'">
                <div v-if="props.row.productAmount != ''">
                  <b-form-input
                    v-model.trim="damagedProduct[props.index].quantity"
                    maxlength="10"
                    @keypress="$onlyNumberInput"
                    @change="onChangeQuantity(damagedProduct[props.index])"
                  />
                </div>
              </span>

              <div v-if="props.column.field === 'feature' && isDisabledFeature">
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
            <template slot="table-actions-bottom">
              <!-- START - Prodduct input -->
              <b-col
                cols="5"
                class="my-1"
              >
                <b-form-input
                  v-model.trim="productInfos.productName"
                  placeholder="Nhập mã hoặc tên sản phẩm"
                  @focus="focusProduct"
                  @input="loadProducts"
                  @blur="isFocusedInputProduct = false"
                  @keyup="loadProducts"
                />
                <!-- START - Product Popup -->
                <b-collapse
                  v-model.trim="isFocusedInputProduct"
                  class="position-absolute w-80"
                  style="zIndex:1"
                >
                  <b-container
                    class="my-1 px-1 bg-white rounded border border-primary shadow-lg"
                  >
                    <b-col>
                      <b-row
                        v-for="(product, index) in products"
                        :key="index"
                        class="mx-0 my-1 border-bottom cursor-pointer"
                        :class="{'item-active': index === cursorProduct}"
                        @click="selectProduct(product)"
                      >
                        <!-- START - Section Label -->
                        <b-col>
                          <b-col
                            class="text-dark"
                          >
                            <strong> {{ product.productName }}</strong>
                          </b-col>
                          <b-col
                            class="my-1"
                          >
                            {{ product.productCode }}
                          </b-col>
                        </b-col>
                      <!-- END - Section Label -->
                      </b-row>
                    </b-col>
                  </b-container>
                </b-collapse>
                <!-- END - Product Popup -->

              </b-col>
              <!-- END - Prodduct input -->

            </template>
            <!-- END - Table Footer -->

          </vue-good-table>
          <!-- END - Table Product -->

          <!-- START - Button -->
          <b-row class="m-1 justify-content-end">
            <b-button-group>
              <b-button
                variant="someThing"
                class="btn-brand-1 rounded text-uppercase aligns-items-button-center"
                :disabled="invalid"
                @click="onClickSaveButton()"
              >
                <b-icon-download
                  class="mr-05"
                />
                Lưu
              </b-button>

              <b-button
                class="btn-brand-1 ml-1 rounded text-uppercase aligns-items-button-center"
                @click="navigateBack"
              >
                <b-icon-x
                  class="mr-05"
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
import toasts from '@core/utils/toasts/toasts'
// import { getNow } from '@/@core/utils/utils'
import {
  formatVniDateToISO,
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
  // ACTIONS
  GET_CUSTOMERS_ACTION,
  GET_PRODUCTS_ACTION,
  GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION,
  GET_EXCHANGE_DAMAGED_GOODS_BY_ID_ACTION,
  UPDATE_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_DAMAGED_GOODS_ACTION,
} from '../store-module/type'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
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
      isDisabledFeature: true,
      isFocusedInputProduct: false,
      isFocusedInputCustomer: false,
      cursorCustomer: -1, // Con trỏ chuột ở pop up = -1
      cursorProduct: -1,

      reasonObj: {
        reasonOptions: [],
      },

      decentralization: {
        formId: 5,
        ctrlId: 7,
      },
      customerInfo: {
        customerId: '',
        customerName: '',
        customerAddress: '',
        customerPhone: '',
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
            unit: '',
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
          tdClass: 'text-left',
        },
        {
          label: 'Tên hàng',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'ĐVT',
          field: 'productDVT',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Số lượng ',
          field: 'productAmount',
          type: 'number',
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
          type: 'number',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-right',
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
        },
      ],
      productInfos: {
        productName: '',
      },
      damagedProduct: [
      ],
    }
  },

  computed: {
    ...mapGetters(WAREHOUSES_EXCHANGE_DAMAGED_GOODS, [
      CUSTOMERS_GETTER,
      EXCHANGE_DAMAGED_GOODS_REASONS_GETTER,
      PRODUCTS_GETTER,
      EXCHANGE_DAMAGED_GOODS_BY_ID_GETTER,
      DAMAGED_GOODS_GETTER,
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

    customers() {
      return this.CUSTOMERS_GETTER.map(data => ({
        customerId: data.id,
        customerCode: data.customerCode,
        customerName: `${data.lastName} ${data.firstName}`,
        address: data.address,
        mobilePhone: data.mobiPhone,
      }))
    },

    products() {
      return this.PRODUCTS_GETTER.map(data => ({
        id: data.id,
        productCode: data.productCode,
        productName: data.productName,
        productDVT: data.uom1,
        price: data.price,
        quantity: data.totalAmount,
        totalPrice: data.price * data.totalAmount,
        count: null,
      }))
    },

    totalProducts() {
      return this.damagedProduct.reduce(accum => accum + 1, 0)
    },
    totalQuantity() {
      return this.damagedProduct.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
    totalMoney() {
      return this.damagedProduct.reduce((accum, item) => accum + Number(item.totalPrice), 0)
    },
  },

  watch: {
    getReasonOptions() {
      this.reasonObj.reasonOptions = [...this.getReasonOptions]
    },
    exchangeDamagedGoods() {
      this.getExchangeDamagedGoodsById()
    },
  },

  mounted() {
    this.GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION({ ...this.decentralization })
    this.GET_EXCHANGE_DAMAGED_GOODS_BY_ID_ACTION(`${this.exchangeDamagedGoodsId}`)
    this.customerOptions()
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
    ]),

    getExchangeDamagedGoodsById() {
      if (this.exchangeDamagedGoods) {
        // START - Exchange Damaged Goods
        this.exchangeGoodsInfo.transCode = this.exchangeDamagedGoods.transCode
        this.exchangeGoodsInfo.transDate = formatISOtoVNI(this.exchangeDamagedGoods.transDate)
        this.exchangeGoodsInfo.transTime = getTimeOfDate(this.exchangeDamagedGoods.transDate)
        this.exchangeGoodsInfo.shopId = this.exchangeDamagedGoods.shopId
        this.exchangeGoodsInfo.customerId = this.exchangeDamagedGoods.customerId
        this.customerInfo.customerName = this.exchangeDamagedGoods.customerName
        this.customerInfo.customerAddress = this.exchangeDamagedGoods.customerAddress
        this.customerInfo.customerPhone = this.exchangeDamagedGoods.customerPhone
        this.exchangeGoodsInfo.reasonId = this.exchangeDamagedGoods.reasonId
        this.exchangeGoodsInfo.reason = this.exchangeDamagedGoods.reason
        this.exchangeGoodsInfo.quantity = this.exchangeDamagedGoods.quantity
        this.exchangeGoodsInfo.totalAmount = this.exchangeDamagedGoods.totalAmount
        this.damagedProduct = [...this.exchangeDamagedGoods.listProducts]
        this.customerOptions()
        // END - Exchange Damaged Goods
      }
    },

    updateExchangeDamagedGoods() {
      this.$refs.formContainer.validate().then(success => {
        if (success && this.checkDuplicatesName() > -1) {
          this.UPDATE_EXCHANGE_DAMAGED_GOODS_ACTION({
            exchangeDamagedGoods: {
              customerId: this.exchangeGoodsInfo.customerId,
              id: this.exchangeDamagedGoodsId,
              lstExchangeDetail: [...this.damagedProduct],
              quantity: this.exchangeGoodsInfo.quantity,
              reason: this.exchangeGoodsInfo.reason,
              reasonId: this.exchangeGoodsInfo.reasonId,
              shopId: this.exchangeGoodsInfo.shopId,
              totalAmount: this.exchangeGoodsInfo.totalAmount,
              transCode: this.exchangeGoodsInfo.transCode,
              transDate: formatVniDateToISO(this.exchangeGoodsInfo.transDate),
            },
            onSuccess: () => {
              this.navigateBack()
            },
          })
        } else toasts.error('Khách hàng không tồn tại')
      })
    },

    customerOptions() {
      this.cursorCustomer = -1
      if (this.customerInfo.customerName.length >= commonData.minSearchLength) {
        this.isFocusedInputCustomer = true
        const searchData = {
          searchKeywords: this.customerInfo.customerName.trim().toLowerCase(),
          status: this.customerInfo.status,
        }
        this.GET_CUSTOMERS_ACTION(searchData)
      } else {
        this.isFocusedInputCustomer = false
      }
    },

    selectCustomer(customer) {
      this.customerInfo.customerId = customer.customerId
      this.customerInfo.customerCode = customer.customerCode
      this.customerInfo.customerName = customer.customerName
      this.customerInfo.customerAddress = customer.address
      this.customerInfo.customerPhone = customer.mobilePhone
    },

    loadProducts() {
      this.cursorProduct = -1
      if (this.productInfos.productName.length >= commonData.minSearchLength) {
        this.isFocusedInputProduct = true
        const searchData = {
          keyWord: this.productInfos.productName,
          customerTypeId: 1, // hard code vì api bảo thế để chạy trơn tru, sau này sửa lại
          ...this.decentralization,
        }
        this.GET_PRODUCTS_ACTION(searchData)
      } else {
        this.isFocusedInputProduct = false
      }
    },

    selectProduct(product) {
      this.productInfos.productName = null
      const existedProductIndex = this.damagedProduct.findIndex(damagedProduct => damagedProduct.productCode === product.productCode)
      if (this.damagedProduct) {
        const obj = {
          count: this.damagedProduct.length,
          id: product.id,
          productCode: product.productCode,
          productName: product.productName,
          productDVT: product.productDVT,
          price: product.price,
          quantity: 1,
          totalPrice: null,
        }
        if (existedProductIndex === -1) {
          obj.totalPrice = obj.price * obj.quantity
          this.damagedProduct.push(obj)
        } else {
          this.damagedProduct[existedProductIndex].quantity = Number(this.damagedProduct[existedProductIndex].quantity) + obj.quantity
          this.damagedProduct[existedProductIndex].totalPrice = Number(obj.price) * this.damagedProduct[existedProductIndex].quantity
        }
      }
    },

    onChangeQuantity(props) {
      const existedProductIndex = this.damagedProduct.findIndex(damagedProduct => damagedProduct.productCode === props.productCode)
      this.damagedProduct[existedProductIndex].totalPrice = Number(props.price) * this.damagedProduct[existedProductIndex].quantity
    },

    focusCustomer() {
      this.cursorCustomer = -1
      if (this.customerInfo.customerName) {
        this.isFocusedInputCustomer = this.customerInfo.customerName.length >= commonData.minSearchLength
      }
    },

    focusProduct() {
      this.cursorProduct = -1
      if (this.productInfos.productName) {
        this.isFocusedInputProduct = this.productInfos.productName.length >= commonData.minSearchLength
      }
    },

    onClickDeleteButton(index) {
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
      return this.customers.findIndex(x => x.customerName.toLowerCase() === this.customerInfo.customerName.toLowerCase())
    },

    onClickSaveButton() {
      this.isFieldCheck = false
      this.checkDuplicatesName()
      this.updateExchangeDamagedGoods()
    },

    onClickFeature() {
      this.isDisabledFeature = !this.isDisabledFeature
    },

    navigateBack() {
      this.$router.replace({ name: 'warehouses-exchange-damaged-goods' })
    },
  },
}
</script>

<style>
  .item-active {
    padding-left: 5px;
  }
</style>
