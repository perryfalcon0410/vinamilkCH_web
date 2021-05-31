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
          xl="4"
          class="d-flex flex-column bg-white shadow rounded mr-xl-1"
        >
          <div class="w-100 text-center text-brand-1">
            <strong>Thông tin hóa đơn</strong>
          </div>

          <!-- START - Archive Export ID and Type -->
          <b-form-row>
            <b-col>
              <div class="h8 mt-1">
                Mã khách hàng
              </div>
              <b-form-input
                v-model="redBill.customerCode"
                maxlength="40"
                @focus="focus"
                @blur="inputSearchFocusedKH = false"
                @input="loadCustomers"
                @keyup.enter="keyEnter"
                @keydown.up="keyUp"
                @keydown.down="keyDown"
              />
              <b-collapse
                v-model="inputSearchFocusedKH"
                class="position-absolute mr-lg-0 mb-3"
                style="zIndex:1;"
              >
                <b-container
                  class="my-1 bg-white rounded border border-primary shadow-lg"
                >
                  <b-col>
                    <b-row
                      v-for="(customer, index) in customers"
                      :key="index"
                      class="my-1 cursor-pointer"
                      :class="{'item-active': index === cursor}"
                      @click="selectCustomer(customer)"
                      @mouseover="$event.target.classList.add('item-active')"
                      @mouseout="$event.target.classList.remove('item-active')"
                    >
                      <b>{{ customer.customerName }}</b>
                      {{ customer.customerCode }} - {{ customer.mobiPhone }}
                    </b-row>
                  </b-col>
                </b-container>
              </b-collapse>
            </b-col>

            <b-col>
              <div class="h8 mt-1">
                Tên khách hàng
              </div>
              <b-form-input
                v-model="redBill.customerName"
                maxlength="40"
                disabled
              />
            </b-col>
          </b-form-row>
          <!-- END - Archive Export ID and Type -->

          <!-- START - Archive Export Bill Number and Date -->
          <b-form-row>
            <b-col>
              <div class="h8 mt-1">
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
                <div class="h8 mt-1">
                  Ngày in <span class="text-danger">*</span>
                </div>
                <b-form-group
                  class="m-0"
                  :state="touched ? passed : null"
                >
                  <vue-flat-pickr
                    v-model="redBill.printDate"
                    :config="configDate"
                    class="form-control h8 text-brand-3"
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
                <div class="h8 mt-1">
                  Tên đơn vị <span class="text-danger">*</span>
                </div>
                <b-form-input
                  v-model="redBill.officeWorking"
                  :state="touched ? passed : null"
                  maxlength="40"
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
                <div class="h8 mt-1">
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
            <div class="h8 mt-1">
              Địa chỉ cơ quan <span class="text-danger">*</span>
            </div>
            <b-form-input
              v-model="redBill.officeAddress"
              :state="touched ? passed : null"
              maxlength="40"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END - Archive Export Archive -->

          <!-- START - Archive Export Internal number and PO no -->
          <b-form-row>
            <b-col>
              <div class="h8 mt-1">
                Người mua hàng
              </div>
              <b-form-input
                v-model="redBill.buyer"
                maxlength="20"
                required
              />
            </b-col>

            <b-col>
              <div class="h8 mt-1">
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
          <div class="h8 mt-1">
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
              class="btn-brand-1 h8"
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
              <!-- START - Action bottom -->
              <div
                slot="table-actions-bottom"
                class="mx-1 my-2 px-2"
              >
                <b-form-input
                  v-model="productSearch"
                  class="w-25"
                  placeholder="Nhập mã hoặc tên sản phẩm"
                  type="text"
                  autocomplete="off"
                  @focus="searchProductFocus"
                  @blur="inputSearchFocusedSP = false"
                  @input="loadProducts"
                  @keyup.enter="searchProductKeyEnter"
                  @keydown.up="searchProductKeyUp"
                  @keydown.down="searchProductKeyDown"
                  @click="click"
                />
                <b-collapse
                  v-model="inputSearchFocusedSP"
                  class="position-absolute mr-lg-0 mb-3"
                  style="zIndex:1"
                >
                  <b-container
                    class="my-1 bg-white rounded border border-primary shadow-lg"
                  >
                    <b-col>
                      <b-row
                        v-for="(product, index) in allProducts"
                        :key="index"
                        class="my-1 cursor-pointer"
                        :class="{'item-active': index === cursorProduct}"
                        @click="selectProduct(product)"
                        @mouseover="$event.target.classList.add('item-active')"
                        @mouseout="$event.target.classList.remove('item-active')"
                      >
                        <b>{{ product.productCode }}</b> - {{ product.productName }}
                      </b-row>
                    </b-col>
                  </b-container>
                </b-collapse>
              </div>
              <!-- END - Action bottom -->

              <!-- START - Custome row -->
              <template
                slot="table-row"
                slot-scope="props"
              >
                <div v-if="props.column.field == 'quantity'">
                  <b-form-input
                    v-model="products[props.row.originalIndex].quantity"
                    type="text"
                    @change="onChangeQuantityAndPrice(props.row.originalIndex)"
                  />
                </div>
                <div v-else-if="props.column.field == 'productPrice'">
                  <b-form-input
                    v-model="products[props.row.originalIndex].productPrice"
                    type="text"
                    @change="onChangeQuantityAndPrice(props.row.originalIndex)"
                  />
                </div>
                <div v-else-if="props.column.field == 'vat'">
                  <b-col>
                    <b-form-input
                      v-model="products[props.row.originalIndex].vat"
                      type="text"
                      @change="onChangeVAT(props.row.originalIndex)"
                    />
                  </b-col>
                </div>
                <div v-else-if="props.column.field == 'button'">
                  <div v-if="props.row.button == '1'">
                    <b-button
                      variant="light"
                      class="rounded-circle px-1"
                      @click="onClickDeleteItem(props.row.originalIndex)"
                    >
                      <b-icon-x />
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
                  class="h7"
                  align-h="center"
                >
                  {{ totalQuantity }}
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
                  class="mr-05"
                />
                Lưu
              </b-button>

              <b-button
                variant="none"
                class="ml-1 btn-brand-1 aligns-items-button-center"
                :disabled="invalid"
              >
                <b-icon
                  icon="printer-fill"
                  class="mr-05"
                />
                LƯU & IN
              </b-button>

              <b-button
                class="ml-1 btn-brand-1 aligns-items-button-center"
                @click="routeBack"
              >
                <b-icon-x
                  class="mr-05"
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
import commonData from '@/@db/common'
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
import { formatVniDateToISO, formatNumberToLocale } from '@/@core/utils/filter'
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
    BillReceiptsModal,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      inputSearchFocusedSP: false,
      inputSearchFocusedKH: false,
      saleOptions: saleData.salePaymentType,
      entryAdjustmentModalVisible: false,
      entryBorrowedModalVisible: false,
      entryCouponModalVisible: false,
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
      cursor: -1,
      cursorProduct: -1,
      productSearch: null,
      products: [],
      saleOrderIds: [],
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'Ngành hàng',
          field: 'industry',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'productDVT',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Đơn giá',
          field: 'productPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'productPriceTotal',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'VAT %',
          field: 'vat',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Tiền thuế GTGT',
          field: 'productExported',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
        },
        {
          label: '',
          field: 'button',
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
    customers() {
      if (this.CUSTOMERS_GETTER()) {
        return this.CUSTOMERS_GETTER().map(data => ({
          id: data.id,
          customerCode: data.customerCode,
          customerName: `${data.lastName} ${data.firstName}`,
          officeWorking: data.officeWorking,
          officeAddress: data.officeAddress,
          taxCode: data.taxCode,
          mobiPhone: data.mobiPhone,
        }))
      }
      return []
    },
    allProducts() {
      return this.PRODUCTS_GETTER().map(data => ({
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
      }))
    },
    totalQuantity() {
      if (this.products.reduce((accum, item) => accum + Number(item.quantity), 0) !== 0) {
        return this.products.reduce((accum, item) => accum + Number(item.quantity), 0)
      }
      return ''
    },
    totalPriceTotal() {
      if (this.products.reduce((accum, item) => accum + Number(item.productPriceOriginal), 0) !== 0) {
        return this.products.reduce((accum, item) => accum + Number(item.productPriceOriginal), 0)
      }
      return ''
    },
    totalProductExported() {
      if (this.products.reduce((accum, item) => accum + Number(item.productExportedOriginal), 0) !== 0) {
        return this.products.reduce((accum, item) => accum + Number(item.productExportedOriginal), 0)
      }
      return ''
    },
  },
  beforeMount() {
    // this.redBill.printDate = this.$nowDate
  },
  mounted() {
    this.GET_CUSTOMERS_ACTION({
      formId: this.formId,
      ctrlId: this.ctrlId,
    })
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
      this.cursor = -1
      if (this.redBill.customerCode.length >= commonData.minSearchLength) {
        this.inputSearchFocusedKH = true
        const searchData = {
          searchKeywords: this.redBill.customerCode?.trim(),
        }

        this.GET_CUSTOMERS_ACTION(searchData)
      } else {
        this.inputSearchFocusedKH = false
      }
    },
    selectCustomer(customer) {
      this.redBill.customerCode = customer.customerCode
      this.redBill.customerName = customer.customerName
      this.redBill.officeWorking = customer.officeWorking
      this.redBill.officeAddress = customer.officeAddress
      this.redBill.taxCode = customer.taxCode
    },
    focus() {
      this.cursor = -1
      this.inputSearchFocusedKH = this.redBill.customerCode.length >= commonData.minSearchLength
    },
    keyUp() {
      if (this.cursor > 0) {
        this.cursor -= 1
      }
    },
    keyDown() {
      if (this.cursor < this.customers.length) {
        this.cursor += 1
      }
    },
    keyEnter() {
      if (this.inputSearchFocusedKH && this.customers[this.cursor]) {
        this.selectCustomer(this.customers[this.cursor])
        this.inputSearchFocusedKH = false
      }
    },
    loadProducts() {
      this.cursorProduct = -1
      if (this.productSearch === null) return
      if (this.productSearch.length >= commonData.minSearchLength) {
        this.inputSearchFocusedSP = true

        this.GET_PRODUCTS_ACTION({
          keyWord: this.productSearch?.trim(),
          formId: this.formId,
          ctrlId: this.ctrlId,
        })
      } else {
        this.inputSearchFocusedSP = false
      }
    },
    selectProduct(product) {
      this.productSearch = null
      const existedProductIndex = this.products.findIndex(products => products.productCode === product.productCode)
      if (existedProductIndex === -1) {
        this.products.push({
          productId: product.id,
          productCode: product.productCode,
          productName: product.productName,
          industry: product.groupVat,
          productDVT: product.unit,
          quantity: 1,
          productPrice: formatNumberToLocale(product.price),
          productPriceTotal: formatNumberToLocale(product.price),
          productPriceOriginal: product.price,
          productPriceTotalOriginal: product.price,
          vat: product.vat,
          productExported: formatNumberToLocale(product.vatAmount),
          productExportedOriginal: product.vatAmount,
          note: product.note,
          button: '1',
        })
      } else {
        this.products[existedProductIndex].quantity += product.quantity
        this.onChangeQuantityAndPrice(existedProductIndex)
        this.onChangeVAT(existedProductIndex)
      }
    },
    searchProductFocus() {
      this.cursorProduct = -1
      this.inputSearchFocusedSP = this.productSearch !== null && this.productSearch.length >= commonData.minSearchLength
    },
    searchProductKeyUp() {
      if (this.cursorProduct > 0) {
        this.cursorProduct -= 1
      }
    },
    searchProductKeyDown() {
      if (this.cursorProduct < this.allProducts.length) {
        this.cursorProduct += 1
      }
    },
    searchProductKeyEnter() {
      if (this.inputSearchFocusedSP && this.allProducts[this.cursorProduct]) {
        this.selectProduct(this.allProducts[this.cursorProduct])
        this.inputSearchFocusedSP = false
      }
    },
    click() {
      if (this.productSearch === null) return
      if (this.productSearch.length >= commonData.minSearchLength) {
        this.GET_PRODUCTS_ACTION({
          keyWord: this.productSearch?.trim(),
          formId: this.formId,
          ctrlId: this.ctrlId,
        })
      }
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
          productDVT: data.productUnit,
          quantity: data.quantity,
          productPrice: formatNumberToLocale(data.priceNotVat),
          productPriceTotal: formatNumberToLocale(data.amountNotVat),
          productPriceOriginal: data.priceNotVat,
          productPriceTotalOriginal: data.amountNotVat,
          vat: data.vat,
          productExported: formatNumberToLocale(data.valueAddedTax),
          productExportedOriginal: data.valueAddedTax,
          note: '',
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
      }

      this.saleOrderIds = invoiceData.saleOrderIds
    },
    taxMoney(money, vat) {
      return (money * (vat / 100))
    },
    onChangeQuantityAndPrice(index) {
      this.products[index].productPriceTotal = formatNumberToLocale(Number(this.products[index].quantity) * Number(this.products[index].productPriceOriginal))
      this.products[index].productPriceTotalOriginal = Number(this.products[index].quantity) * Number(this.products[index].productPriceOriginal)
      this.products[index].productExported = formatNumberToLocale(parseInt(Number(this.products[index].productPriceTotalOriginal) * (Number(this.products[index].vat) / 100), 10))
    },
    onChangeVAT(index) {
      this.products[index].productExported = formatNumberToLocale(parseInt(Number(this.products[index].productPriceTotalOriginal) * (Number(this.products[index].vat) / 100), 10))
    },
    onClickCreateBill() {
      const productsData = this.products.map(data => ({
        quantity: data.quantity,
        groupVat: data.industry,
        priceNotVat: data.productPriceOriginal,
        productId: data.productId,
        vat: data.vat,
      }))

      const paramsCreateRedInvoice = {
        amountTotal: this.totalPriceTotal,
        buyerName: this.redBill.buyer,
        customerId: this.redBill.customerId,
        note: this.redBill.note,
        officeAddress: this.redBill.officeAddress,
        officeWorking: this.redBill.officeWorking,
        paymentType: this.redBill.paymentType,
        printDate: formatVniDateToISO(this.redBill.printDate),
        productDataDTOS: productsData,
        redInvoiceNumber: this.redBill.billNumber,
        saleOrderId: this.saleOrderIds,
        shopId: this.redBill.shopId,
        taxCode: this.redBill.taxCode,
        totalQuantity: this.totalQuantity,
        totalMoney: this.totalPriceTotal,
      }
      console.log(paramsCreateRedInvoice)
      // this.CREATE_RED_BILL_ACTION(paramsCreateRedInvoice)
      // this.$router.replace({ name: 'sales-red-bills' })
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
