<template>
  <b-container
    fluid
    class="p-0 px-1"
  >
    <!-- START - Form and list -->
    <validation-observer
      ref="formContainer"
      v-slot="{invalid}"
      slim
    >
      <b-row>
        <!-- START - Form -->
        <b-col
          xl="3"
          class="d-flex flex-column bg-white shadow rounded mr-xl-1"
        >
          <div class="w-100 text-center text-brand-1">
            <strong>Thông tin hóa đơn</strong>
          </div>

          <!-- START - Archive Export ID and Type -->
          <b-form-row>
            <b-col>
              <div class="h7 mt-1">
                Mã khách hàng
              </div>
              <vue-autosuggest
                v-model="redBill.customerCode"
                maxlength="200"
                :suggestions="customers"
                :input-props="{
                  id:'autosuggest__input_customers',
                  class:'form-control',
                }"
                @input="loadCustomers"
                @selected="selectCustomer"
              >
                <template
                  slot-scope="{ suggestion }"
                >
                  <b-row>
                    <!-- START - Section Label -->
                    <b-col>

                      <b-form-row>
                        <b-col
                          class="my-1"
                        >
                          <b>{{ suggestion.item.customerName }}</b>
                        </b-col>
                      </b-form-row>
                      <b-form-row>
                        <b-col
                          class="text-dark font-weight-bold"
                          md="10"
                        >
                          {{ suggestion.item.customerCode }} - {{ suggestion.item.mobiPhone }}
                        </b-col>
                      </b-form-row>
                    </b-col>
                  <!-- END - Section Label -->
                  </b-row>
                  <!-- <div class="cursor-pointer"> -->

                  <!-- <b>{{ suggestion.item.productCode }}</b> - {{ suggestion.item.productName }} -->
                  <!-- </div> -->
                </template>
              </vue-autosuggest>
            </b-col>

            <b-col>
              <div class="h7 mt-1">
                Tên khách hàng
              </div>
              <b-form-input
                v-model="redBill.customerName"
                maxlength="200"
                disabled
              />
            </b-col>
          </b-form-row>
          <!-- END - Archive Export ID and Type -->

          <!-- START - Archive Export Bill Number and Date -->
          <b-form-row>
            <b-col>
              <div class="h7 mt-1">
                Số hoá đơn
              </div>
              <b-form-input
                v-model="redBill.billNumber"
                maxlength="20"
              />
            </b-col>
            <b-col @keypress="$onlyDateInput">
              <validation-provider
                v-slot="{ errors, touched, passed }"
                rules="required|dateFormatVNI"
                name="ngày in"
              >
                <div class="h7 mt-1">
                  Ngày in <span class="text-danger">*</span>
                </div>
                <b-form-group
                  class="m-0"
                  :state="touched ? passed : null"
                >
                  <vue-flat-pickr
                    v-model="redBill.printDate"
                    :config="configDate"
                    class="form-control h7 text-brand-3"
                    placeholder="Chọn ngày"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-form-row>
          <!-- END - Archive Export Bill Number and Date -->

          <!-- START - Archive Export ID and Type -->
          <b-form-row>
            <b-col>
              <validation-provider
                v-slot="{ errors, passed, touched }"
                rules="required"
                name="tên đơn vị"
              >
                <div class="h7 mt-1">
                  Tên đơn vị <span class="text-danger">*</span>
                </div>
                <b-form-input
                  v-model="redBill.officeWorking"
                  :state="touched ? passed : null"
                  maxlength="200"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>

            <b-col>
              <validation-provider
                v-slot="{ errors, passed, touched }"
                rules="required"
                name="mã số thuế"
              >
                <div class="h7 mt-1">
                  Mã số thuế <span class="text-danger">*</span>
                </div>
                <b-form-input
                  v-model="redBill.taxCode"
                  :state="touched ? passed : null"
                  maxlength="40"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-form-row>
          <!-- END - Archive Export ID and Type -->

          <!-- START - Archive Export Archive -->
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="địa chỉ cơ quan"
          >
            <div class="h7 mt-1">
              Địa chỉ cơ quan <span class="text-danger">*</span>
            </div>
            <b-form-input
              v-model="redBill.officeAddress"
              :state="touched ? passed : null"
              maxlength="200"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END - Archive Export Archive -->

          <!-- START - Archive Export Internal number and PO no -->
          <b-form-row>
            <b-col>
              <div class="h7 mt-1">
                Người mua hàng
              </div>
              <b-form-input
                v-model="redBill.buyer"
                maxlength="200"
                required
              />
            </b-col>

            <b-col>
              <div class="h7 mt-1">
                Hình thức thanh toán
              </div>
              <tree-select
                id="payment-type"
                v-model="redBill.paymentType"
                :options="saleOptions"
                :searchable="false"
                no-options-text="Không có dữ liệu"
              />
            </b-col>
          </b-form-row>
          <!-- END - Archive Export Internal number and PO no -->

          <!-- START - Archive Export Note -->
          <div class="h7 mt-1">
            Ghi chú
          </div>
          <b-form-textarea
            v-model="redBill.note"
            maxlength="4000"
            class="mb-1"
          />
          <!-- END - Archive Export Note -->
        </b-col>
        <!-- END - Form -->

        <!-- START - List -->
        <b-col class="d-flex flex-column bg-white shadow rounded mt-1 mt-xl-0 px-0">
          <!-- START - Header table -->
          <b-row
            class="border-bottom mx-0 px-1"
            style="padding: 5px 0"
            align-v="center"
            align-h="between"
          >
            <strong class="text-brand-1 ">
              Danh sách sản phẩm
            </strong>
            <b-button
              variant="someThing"
              class="btn-brand-1 h7"
              @click="showBillOfSaleList"
            >
              Chọn HĐBH
            </b-button>
          </b-row>
          <!-- END - Header table -->

          <b-col class="py-1">
            <!-- START - Table Product -->
            <vue-good-table
              :columns="columns"
              :rows="products"
              style-class="vgt-table striped"
              line-numbers
            >
              <!-- START - Empty rows -->
              <div
                slot="emptystate"
                class="text-center"
              >
                Không có dữ liệu
              </div>
              <!-- END - Empty rows -->

              <!-- START - Custome row -->
              <template
                slot="table-row"
                slot-scope="props"
              >
                <div v-if="props.column.field === 'quantity'">
                  <b-form-input
                    v-model.number="products[props.row.originalIndex].quantity"
                    maxlength="7"
                    type="text"
                    @keypress="$onlyNumberInput"
                    @change="onChangeQuantityAndPrice(props.row.originalIndex)"
                  />
                </div>
                <div v-else-if="props.column.field === 'productPrice'">
                  <b-form-input
                    v-model.number="products[props.row.originalIndex].productPrice"
                    maxlength="20"
                    type="text"
                    @keypress="$onlyNumberInput"
                    @input="onInputValue(props.row.originalIndex)"
                    @change="onChangeQuantityAndPrice(props.row.originalIndex)"
                  />
                </div>
                <div v-else-if="props.column.field === 'vat'">
                  <b-col>
                    <b-form-input
                      v-model="products[props.row.originalIndex].vat"
                      maxlength="3"
                      @input="checkValue(props.row.originalIndex)"
                      @keypress="$onlyNumberInput"
                      @change="onChangeVAT(props.row.originalIndex)"
                    />
                  </b-col>
                </div>
                <div v-else-if="props.column.field === 'note'">
                  <b-col class="align-middle">
                    <b-form-input
                      v-model="products[props.row.originalIndex].note"
                      maxlength="4000"
                    />
                  </b-col>
                </div>
                <div v-else-if="props.column.field === 'button'">
                  <div v-if="props.row.button === '1'">
                    <!-- <b-icon-trash-fill
                      v-b-popover.hover.top="'Xóa'"
                      class="cursor-pointer"
                      color="red"
                      scale="1.2"
                    /> -->
                    <b-button
                      variant="light"
                      class="rounded-circle px-1"
                      @click="onClickDeleteItem(props.row.originalIndex)"
                    >
                      <b-icon-trash-fill
                        v-b-popover.hover.top="'Xóa'"
                        class="cursor-pointer"
                        color="red"
                      />
                    </b-button>
                  </div>
                </div>
                <div v-else>
                  {{ props.formattedRow[props.column.field] }}
                </div>
              </template>
              <!-- END - Custome row -->

              <!-- START - Custome filter -->
              <template
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'quantity'"
                  class="h7 px-0 mx-1"
                  align-h="center"
                >
                  {{ $formatNumberToLocale(totalQuantity) }}
                </b-row>

                <b-row
                  v-else-if="props.column.field === 'productPriceTotal'"
                  class="h7 px-0 mx-0"
                  align-h="end"
                >
                  {{ $formatNumberToLocale(totalPriceTotal) }}
                </b-row>
                <b-row
                  v-else-if="props.column.field === 'productExported'"
                  class="h7 px-0 mx-0"
                  align-h="end"
                >
                  {{ $formatNumberToLocale(totalProductExported) }}
                </b-row>
              </template>
              <!-- END - Custome filter -->
              <!-- START - Action bottom -->
              <div
                slot="table-actions-bottom"
                class="m-2"
              >
                <vue-autosuggest
                  v-model="productSearch"
                  :suggestions="productRows"
                  :input-props="{
                    id:'autosuggest__input',
                    class:'form-control w-25 h7',
                    placeholder:'Nhập mã hoặc tên sản phẩm'
                  }"
                  @input="loadProducts"
                  @selected="selectProduct"
                >
                  <template
                    slot-scope="{ suggestion }"
                  >
                    <div class="cursor-pointer">
                      <b>{{ suggestion.item.productCode }}</b> - {{ suggestion.item.productName }}
                    </div>
                  </template>
                </vue-autosuggest>
              </div>
              <!-- END - Action bottom -->

            </vue-good-table>
            <!-- END - Table Product -->

            <!-- START - Button -->
            <b-row
              class="mx-0 mt-1"
              align-v="center"
              align-h="end"
            >
              <b-button
                variant="none"
                class="btn-brand-1 aligns-items-button-center"
                :disabled="invalid"
                @click="onClickCreateBill()"
              >
                <b-icon
                  icon="file-earmark-text-fill"
                  class="mr-50"
                />
                Lưu
              </b-button>

              <b-button
                variant="none"
                class="ml-1 btn-brand-1 aligns-items-button-center"
                :disabled="invalid"
                @click="onClickCreateBill()"
              >
                <b-icon
                  icon="printer-fill"
                  class="mr-50"
                />
                Lưu & In
              </b-button>

              <b-button
                class="ml-1 btn-brand-1 aligns-items-button-center"
                @click="routeBack"
              >
                <b-icon-x
                  class="mr-50"
                  scale="1.5"
                />
                Đóng
              </b-button>
            </b-row>
          <!-- END - Button -->
          </b-col>

        </b-col>
        <!-- END - List -->
      </b-row>
    </validation-observer>
    <!-- END - Form and list -->

    <bill-receipts-modal @productsOfBillSaleData="insertProducsFromBillSales($event)" />
  </b-container>
</template>

<script>
import toasts from '@/@core/utils/toasts/toasts'
import commonData from '@/@db/common'
import redBillData from '@/@db/redBill'
import { VueAutosuggest } from 'vue-autosuggest'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  number,
  required,
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import { formatVniDateToISO } from '@/@core/utils/filter'
import saleData from '@/@db/sale'
import BillReceiptsModal from './components/BillReceiptsModal.vue'
import {
  // GETTERS
  RED_INVOICE,
  CUSTOMERS_GETTER,
  PRODUCTS_GETTER,
  // ACTIONS
  GET_CUSTOMERS_ACTION,
  GET_PRODUCTS_ACTION,
  CREATE_RED_BILL_ACTION,
} from '../store-module/type'

export default {
  components: {
    VueAutosuggest,
    BillReceiptsModal,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      isDisabled: false,
      inputSearchFocusedSP: false,
      inputSearchFocusedKH: false,
      saleOptions: saleData.salePaymentType,
      entryAdjustmentModalVisible: false,
      entryBorrowedModalVisible: false,
      entryCouponModalVisible: false,
      totalQuantity: '',
      totalPriceTotal: '',
      totalProductExported: '',
      redBill: {
        customerId: null,
        customerCode: '',
        customerName: '',
        billNumber: '',
        printDate: '',
        officeWorking: '',
        taxCode: '',
        officeAddress: '',
        buyer: '',
        paymentType: saleData.salePaymentType[0].id,
        note: '',
        shopId: 0,
      },
      productSearch: null,
      quantityPerBox: redBillData.quantityPerBox,
      products: [],
      productRows: [{ data: '' }],
      customers: [{ data: '' }],
      saleOrderIds: [],
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          thClass: 'text-left',
          tdClass: 'text-left align-middle',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          thClass: 'text-left',
          tdClass: 'text-left align-middle',
          sortable: false,
        },
        {
          label: 'Ngành hàng',
          field: 'industry',
          thClass: 'text-center',
          tdClass: 'text-center align-middle',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'productDVT',
          thClass: 'text-center',
          tdClass: 'text-center align-middle',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          thClass: 'text-center',
          tdClass: 'text-right align-middle',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Đơn giá',
          field: 'productPrice',
          thClass: 'text-center',
          tdClass: 'text-right align-middle',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'productPriceTotal',
          thClass: 'text-right',
          tdClass: 'text-right align-middle',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'VAT %',
          field: 'vat',
          thClass: 'text-center',
          tdClass: 'text-right align-middle',
          sortable: false,
        },
        {
          label: 'Tiền thuế GTGT',
          field: 'productExported',
          thClass: 'text-right',
          tdClass: 'text-right align-middle',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Ghi chú',
          field: 'note',
          thClass: 'text-center',
          tdClass: 'text-left align-middle',
          sortable: false,
        },
        {
          label: '',
          field: 'button',
          thClass: 'text-center',
          tdClass: 'align-middle',
          sortable: false,
        },
      ],
      formId: 5, // Hard Code
      ctrlId: 7, // Hard Code

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },

      // validation rules
      number,
      required,
      dateFormatVNI,
    }
  },
  computed: {
    getCustomers() {
      if (this.CUSTOMERS_GETTER()) {
        return [{
          data: this.CUSTOMERS_GETTER().map(data => ({
            name: data.customerCode,
            id: data.id,
            customerCode: data.customerCode,
            customerName: `${data.lastName} ${data.firstName}`,
            officeWorking: data.officeAddress,
            officeAddress: data.officeAddress,
            taxCode: data.taxCode,
            mobiPhone: data.mobiPhone,
          })),
        }]
      }
      return []
    },
    allProducts() {
      return [{
        data: this.PRODUCTS_GETTER().map(data => ({
          name: data.productCode,
          productId: data.id,
          productCode: data.productCode,
          productName: data.productName,
          groupVat: data.groupVat,
          unit: data.uom1,
          quantity: 1,
          price: data.price,
          vat: data.vat,
          vatAmount: data.vatAmount,
          note: data.note,
        })),
      }]
    },
    getTotalQuantity() {
      return this.products.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
    getTotalPriceTotal() {
      return this.products.reduce((accum, item) => accum + Number(item.productPriceTotalOriginal), 0)
    },
    getTotalProductExported() {
      return this.products.reduce((accum, item) => accum + Number(item.productExportedOriginal), 0)
    },
  },
  watch: {
    getCustomers() {
      this.customers = [...this.getCustomers]
    },
    allProducts() {
      this.productRows = [...this.allProducts]
    },
    getTotalQuantity() {
      this.totalQuantity = this.getTotalQuantity
    },
    getTotalPriceTotal() {
      this.totalPriceTotal = this.getTotalPriceTotal
    },
    getTotalProductExported() {
      this.totalProductExported = this.getTotalProductExported
    },
  },
  beforeMount() {
    this.redBill.printDate = this.$nowDate
  },
  mounted() {
    // this.GET_CUSTOMERS_ACTION({
    //   formId: this.formId,
    //   ctrlId: this.ctrlId,
    // })
  },
  methods: {
    ...mapGetters(RED_INVOICE, [
      CUSTOMERS_GETTER,
      PRODUCTS_GETTER,
    ]),
    ...mapActions(RED_INVOICE, [
      GET_CUSTOMERS_ACTION,
      GET_PRODUCTS_ACTION,
      CREATE_RED_BILL_ACTION,
    ]),
    routeBack() {
      this.$router.back()
    },
    showBillOfSaleList() {
      this.$root.$emit('bv::toggle::modal', 'bill-receipt-modal')
    },
    loadCustomers() {
      if (this.redBill.customerCode.length >= commonData.minSearchLength) {
        const searchData = {
          searchKeywords: this.redBill.customerCode?.trim(),
        }

        this.GET_CUSTOMERS_ACTION({ ...searchData, isShop: true })
      } else {
        this.customers = [{ data: null }]
      }
    },
    selectCustomer(customer) {
      if (customer && customer.item) {
        this.redBill.customerCode = customer.item.customerCode
        this.redBill.customerId = customer.item.id
        this.redBill.customerName = customer.item.customerName
        this.redBill.officeWorking = customer.item.officeWorking
        this.redBill.officeAddress = customer.item.officeAddress
        this.redBill.taxCode = customer.item.taxCode
      }
      this.customers = [{ data: null }]
    },
    // choose products func
    loadProducts() {
      if (this.productSearch.length >= commonData.minSearchLength) {
        this.GET_PRODUCTS_ACTION({
          keyWord: this.productSearch?.trim(),
          formId: this.formId,
          ctrlId: this.ctrlId,
        })
      } else {
        this.productRows = [{ data: null }]
      }
    },
    selectProduct(product) {
      if (product && product.item) {
        const existedProductIndex = this.products.findIndex(products => products.productCode === product.productCode)
        if (existedProductIndex === -1) {
          this.products.push({
            productId: product.item.productId,
            productCode: product.item.productCode,
            productName: product.item.productName,
            industry: product.item.groupVat,
            productDVT: product.item.unit,
            quantity: 1,
            productPrice: this.$formatNumberToLocale(product.item.price),
            productPriceTotal: this.$formatNumberToLocale(product.item.price),
            productPriceOriginal: product.item.price,
            productPriceTotalOriginal: product.item.price,
            vat: product.item.vat,
            productExported: this.$formatNumberToLocale(product.item.vatAmount),
            productExportedOriginal: product.item.vatAmount,
            sumProductExportedOriginal: product.item.vatAmount,
            note: product.item.note,
            button: '1',
          })
        } else {
          this.products[existedProductIndex].quantity += product.item.quantity
          this.onChangeQuantityAndPrice(existedProductIndex)
          this.onChangeVAT(existedProductIndex)
          this.totalQuantity = this.products.reduce((accum, i) => accum + Number(i.quantity), 0)
        }
      }
      this.productSearch = null
      this.productRows = [{ data: null }]
    },
    insertProducsFromBillSales(invoiceData) {
      const invoiceDetail = { ...invoiceData.invoiceDetail }
      // Lấy dữ liệu sản phẩm từ HDBH
      if (invoiceData.invoiceDetail) {
        this.products = invoiceData.invoiceDetail.products.map(data => ({
          productId: data.productId,
          productCode: data.productCode,
          productName: data.productName,
          industry: data.groupVat,
          productDVT: data.uom1,
          quantity: data.quantity,
          productPrice: this.$formatNumberToLocale(data.priceNotVat),
          productPriceTotal: this.$formatNumberToLocale(data.quantity * data.priceNotVat),
          productPriceOriginal: data.priceNotVat,
          productPriceTotalOriginal: data.quantity * data.priceNotVat,
          vat: data.vat,
          productExported: this.$formatNumberToLocale((data.quantity * data.priceNotVat * data.vat) / 100), // tính giá VAT (SL*PRICE)*VAT/100%
          productExportedOriginal: (data.quantity * data.priceNotVat * data.vat) / 100,
          sumProductExportedOriginal: (data.quantity * data.priceNotVat * data.vat) / 100,
          note: `${Math.floor(data.quantity / this.quantityPerBox)}T${data.quantity % this.quantityPerBox}`,
          button: '1',
        }))
        // Lấy dữ liệu khách hàng từ HDBH
        this.redBill.customerId = invoiceDetail.customerId
        this.redBill.customerName = invoiceDetail.customerName
        this.redBill.customerCode = invoiceDetail.customerCode
        this.redBill.officeWorking = invoiceDetail.officeWorking
        this.redBill.officeAddress = invoiceDetail.officeAddress
        this.redBill.taxCode = invoiceDetail.taxCode
        this.redBill.shopId = invoiceDetail.shopId
        // check disabled feild customerCode
        if (this.redBill.customerCode) {
          this.isDisabled = true
        }
        this.totalQuantity = this.products.reduce((accum, i) => accum + Number(i.quantity), 0)
        this.totalPriceTotal = this.products.reduce((accum, i) => accum + Number(i.productPriceTotalOriginal), 0)
        this.totalProductExported = this.products.reduce((accum, i) => accum + Number(i.sumProductExportedOriginal), 0)
      }

      this.saleOrderIds = invoiceData.saleOrderIds
    },
    taxMoney(money, vat) {
      return (money * (vat / 100))
    },
    checkValue(index) {
      if (this.products[index].vat > 100) {
        this.products[index].vat = 100
      }
    },
    onInputValue(index) {
      this.products[index].productPriceOriginal = Number(this.products[index].productPrice)
    },
    onChangeQuantityAndPrice(index) {
      this.products[index].note = `${Math.floor(this.products[index].quantity / this.quantityPerBox)}T${this.products[index].quantity % this.quantityPerBox}`
      this.products[index].productPriceTotal = this.$formatNumberToLocale(Number(this.products[index].quantity) * Number(this.products[index].productPriceOriginal))
      this.products[index].productPriceTotalOriginal = Number(this.products[index].quantity) * Number(this.products[index].productPriceOriginal)
      this.products[index].productExported = this.$formatNumberToLocale(parseInt(Number(this.products[index].productPriceTotalOriginal) * (Number(this.products[index].vat) / 100), 10))
      this.totalQuantity = this.products.reduce((accum, i) => accum + Number(i.quantity), 0)
      this.totalPriceTotal = this.products.reduce((accum, i) => accum + Number(i.productPriceTotalOriginal), 0)
      this.products[index].sumProductExportedOriginal = Number(this.products[index].productPriceTotalOriginal) * (Number(this.products[index].vat) / 100)
      this.totalProductExported = this.products.reduce((accum, i) => accum + Number(i.sumProductExportedOriginal), 0)
    },
    onChangeVAT(index) {
      this.products[index].productExported = this.$formatNumberToLocale(parseInt(Number(this.products[index].productPriceTotalOriginal) * (Number(this.products[index].vat) / 100), 10))
      this.products[index].sumProductExportedOriginal = Number(this.products[index].productPriceTotalOriginal) * (Number(this.products[index].vat) / 100)
      this.totalProductExported = this.products.reduce((accum, i) => accum + Number(i.sumProductExportedOriginal), 0)
    },
    onClickCreateBill() {
      const productsData = this.products.map(data => ({
        quantity: data.quantity,
        groupVat: data.industry,
        priceNotVat: data.productPriceOriginal,
        productId: data.productId,
        vat: data.vat,
        noteRedInvoiceDetail: data.note,
      }))
      const paramsCreateRedInvoice = {
        customerId: this.redBill.customerId,
        printDate: formatVniDateToISO(this.redBill.printDate),
        officeWorking: this.redBill.officeWorking,
        officeAddress: this.redBill.officeAddress,
        taxCode: this.redBill.taxCode,
        redInvoiceNumber: this.redBill.billNumber,
        totalQuantity: this.totalQuantity,
        totalMoney: this.totalPriceTotal,
        amountTotal: this.totalPriceTotal + this.totalProductExported,
        paymentType: this.redBill.paymentType,
        buyerName: this.redBill.buyer,
        noteRedInvoice: this.redBill.note,
        shopId: this.redBill.shopId,
        productDataDTOS: productsData,
        saleOrderId: this.saleOrderIds,
      }
      if (productsData.length > 0) {
        this.CREATE_RED_BILL_ACTION({
          paramsCreateRedInvoice,
          onSuccess: () => {
            this.$router.replace({ name: 'sales-red-bills' })
          },
        })
        return
      }
      toasts.error('Hóa đơn cần chứa ít nhất một sản phẩm')
    },
    onClickDeleteItem(index) {
      this.products.splice(index, 1)
    },
  },
}
</script>
<style>
  .item-active {
    padding-left: 5px;
  }
</style>
