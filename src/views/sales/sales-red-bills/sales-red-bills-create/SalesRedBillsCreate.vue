<template>
  <b-container
    fluid
    class="p-0 px-1"
  >
    <!-- START - Form and list -->
    <validation-observer
      ref="formContainer"
      v-slot="{invalid}"
      class="d-print-none"
      slim
    >
      <b-row class="d-print-none">
        <!-- START - Form -->
        <b-col
          cols="3"
          class="d-flex flex-column bg-white shadow rounded"
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
                ref="focusInput"
                v-model="redBill.customerCode"
                maxlength="200"
                :suggestions="customers"
                :input-props="{
                  id:'autosuggest__input_customers',
                  class:'form-control',
                  disabled: isDisabled ? true : false,
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
              <div class="h7 mt-1 d-print-none">
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
          <b-form-row class="d-print-none">
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
                  maxlength="250"
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
              maxlength="250"
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
            maxlength="250"
            class="mb-1"
          />
          <!-- END - Archive Export Note -->
        </b-col>
        <!-- END - Form -->

        <!-- START - List -->
        <b-col
          cols="9"
          class="d-flex flex-column mt-1 mt-xl-0 pl-1"
        >
          <!-- START - Header table -->
          <div class=" bg-white shadow rounded">
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

            <b-col class="py-1">
              <!-- START - Table Product -->
              <vue-good-table
                :columns="columns"
                :rows="products"
                style-class="vgt-table table-horizontal-scroll custom-table"
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
                  <div
                    v-if="props.column.field === 'productName'"
                    class="name-width"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                  <div v-else-if="props.column.field === 'quantity'">
                    <b-form-input
                      :id="products[props.row.originalIndex].productCode"
                      v-model.number="products[props.row.originalIndex].quantity"
                      class="style-input text-right"
                      maxlength="7"
                      type="text"
                      @keypress="$onlyNumberInput"
                      @input="onInputValueQuantity(props.row.originalIndex)"
                      @change="onChangeQuantityAndPrice(props.row.originalIndex)"
                      @keyup.enter="focusInputSearch"
                    />
                  </div>
                  <div v-else-if="props.column.field === 'productPrice'">
                    <cleave
                      v-model="products[props.row.originalIndex].productPrice"
                      class="form-control"
                      maxlength="20"
                      :raw="true"
                      :options="options.number"
                      @keypress.native="$onlyNumberInput"
                      @keyup.native="onChangePrice(props.row.originalIndex)"
                      @keyup.enter.native="focusInputSearch"
                    />
                  </div>
                  <div v-else-if="props.column.field === 'vat'">
                    <b-col>
                      <b-form-input
                        v-model="products[props.row.originalIndex].vat"
                        class="style-input text-right"
                        maxlength="3"
                        @input="checkValue(props.row.originalIndex)"
                        @keypress="$onlyNumberInput"
                        @change="onChangeVAT(props.row.originalIndex)"
                        @keyup.enter="focusInputSearch"
                      />
                    </b-col>
                  </div>
                  <div v-else-if="props.column.field === 'note'">
                    <b-col class="align-middle">
                      <b-form-input
                        v-model="products[props.row.originalIndex].note"
                        class="style-input"
                        maxlength="250"
                        @keyup.enter="focusInputSearch"
                      />
                    </b-col>
                  </div>
                  <div v-else-if="props.column.field === 'button'">
                    <div v-if="props.row.button === '1'">
                      <b-icon-trash-fill
                        v-b-popover.hover.top="'Xóa'"
                        class="cursor-pointer"
                        color="red"
                        scale="1.2"
                        @click="onClickDeleteItem(props.row.originalIndex)"
                      />
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
                    v-show="products.length > 0"
                    class="h7 px-0 mx-10"
                    align-h="end"
                  >
                    {{ $formatNumberToLocale(totalQuantity) }}
                  </b-row>

                  <b-row
                    v-else-if="props.column.field === 'productPriceTotal'"
                    v-show="products.length > 0"
                    class="h7 mx-50"
                    align-h="end"
                  >
                    {{ $formatNumberToLocale(totalPriceTotal) }}
                  </b-row>
                  <b-row
                    v-else-if="props.column.field === 'productExported'"
                    v-show="products.length > 0"
                    class="h7 px-0 mx-50"
                    align-h="end"
                  >
                    {{ (totalProductExported ? $formatNumberToLocale(totalProductExported.toFixed(0)) : $formatNumberToLocale(totalProductExported)) }}
                  </b-row>
                </template>
                <!-- END - Custome filter -->
                <!-- START - Action bottom -->
                <div
                  slot="table-actions-bottom"
                  class="m-2"
                >
                  <vue-autosuggest
                    ref="searchProduct"
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
                  v-if="statusSaveButton().show"
                  :disabled="statusSaveButton().disabled || invalid"
                  variant="none"
                  class="btn-brand-1 aligns-items-button-center"
                  @click="onClickCreateBill()"
                >
                  <b-icon
                    icon="file-earmark-text-fill"
                    class="mr-50"
                  />
                  Lưu
                </b-button>

                <b-button
                  v-if="statusSavePrintButton().show"
                  :disabled="statusSavePrintButton().disabled || invalid"
                  variant="none"
                  class="ml-1 btn-brand-1 aligns-items-button-center"
                  @click="onClickCreateAndPrintBill()"
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
          </div>
          <!-- END - Header table -->

        </b-col>
        <!-- END - List -->
      </b-row>
    </validation-observer>
    <!-- END - Form and list -->

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

    <bill-receipts-modal @productsOfBillSaleData="insertProducsFromBillSales($event)" />

    <!-- START - Print form -->
    <print-form-red-bills />
    <!-- END - Print form -->
  </b-container>
</template>

<script>
import toasts from '@/@core/utils/toasts/toasts'
import commonData from '@/@db/common'
import redBillData from '@/@db/redBill'
import {
  nowDate,
  formatVniDateToISO,
} from '@/@core/utils/filter'
import Cleave from 'vue-cleave-component'
import PrintFormRedBills from '@core/components/print-form/PrintFormRedBills.vue'
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

import saleData from '@/@db/sale'
import BillReceiptsModal from './components/BillReceiptsModal.vue'
import {
  // GETTERS
  RED_INVOICE,
  CUSTOMERS_GETTER,
  PRODUCTS_GETTER,
  ID_CREATE_RED_INVOICES_GETTER_GETTER,
  // ACTIONS
  GET_CUSTOMERS_ACTION,
  GET_PRODUCTS_ACTION,
  CREATE_RED_BILL_ACTION,
  PRINT_RED_INVOICES_ACTION,
} from '../store-module/type'

export default {
  components: {
    VueAutosuggest,
    BillReceiptsModal,
    ValidationProvider,
    ValidationObserver,
    PrintFormRedBills,
    Cleave,
  },

  data() {
    return {
      idCreate: {},
      isPrintData: false,
      isDisabled: false,
      isModalShow: false,
      isFieldCheck: true,
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
        printDate: nowDate(),
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

      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          width: '120px',
          thClass: 'text-nowrap scroll-column-header column-first',
          tdClass: 'align-middle scroll-column column-first',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          thClass: 'text-nowrap  scroll-column-header column-second',
          tdClass: 'align-middle scroll-column column-second',
          sortable: false,
        },
        {
          label: 'Ngành hàng',
          field: 'industry',
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'productDVT',
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          width: '80px',
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Đơn giá',
          field: 'productPrice',
          type: 'number',
          width: '120px',
          thClass: 'text-nowrap',
          tdClass: ' align-middle px-1',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'productPriceTotal',
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'align-middle pr-2',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'VAT %',
          field: 'vat',
          type: 'number',
          width: '90px',
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
          sortable: false,
        },
        {
          label: 'Tiền thuế GTGT',
          field: 'productExported',
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'align-middle pr-2',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Ghi chú',
          field: 'note',
          width: '150px',
          thClass: 'text-nowrap',
          tdClass: 'align-middle px-1',
          sortable: false,
        },
        {
          label: '',
          field: 'button',
          thClass: 'move-header text-center',
          tdClass: 'move-column align-middle',
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
      productIdSelected: null,
    }
  },

  computed: {
    ...mapGetters(RED_INVOICE, [
      CUSTOMERS_GETTER,
      PRODUCTS_GETTER,
      ID_CREATE_RED_INVOICES_GETTER_GETTER,
    ]),
    getCustomers() {
      if (this.CUSTOMERS_GETTER) {
        return [{
          data: this.CUSTOMERS_GETTER.map(data => ({
            name: data.customerCode,
            id: data.id,
            customerCode: data.customerCode,
            customerName: `${data.lastName} ${data.firstName}`,
            officeWorking: data.workingOffice,
            officeAddress: data.officeAddress,
            taxCode: data.taxCode,
            mobiPhone: data.mobiPhone,
          })),
        }]
      }
      return []
    },
    allProducts() {
      if (this.PRODUCTS_GETTER) {
        return [{
          data: this.PRODUCTS_GETTER.map(data => ({
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
      }
      return [{ data: '' }]
    },
    getIdCreateRedinvoice() {
      if (this.ID_CREATE_RED_INVOICES_GETTER_GETTER) {
        return this.ID_CREATE_RED_INVOICES_GETTER_GETTER
      }
      return {}
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
    getIdCreateRedinvoice() {
      this.idCreate = { ...this.getIdCreateRedinvoice }
      if (this.isPrintData) {
        this.PRINT_RED_INVOICES_ACTION({
          data: {
            id: this.idCreate.id,
            params: { ...this.decentralization },
          },
          onSuccess: () => {
          },
        })
        this.$router.replace({ name: 'sales-red-bills' })
      }
    },
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

  mounted() {
    // this.GET_CUSTOMERS_ACTION({
    //   formId: this.formId,
    //   ctrlId: this.ctrlId,
    // })
    this.$refs.focusInput.$el.querySelector('input').focus()
  },

  methods: {
    ...mapActions(RED_INVOICE, [
      GET_CUSTOMERS_ACTION,
      GET_PRODUCTS_ACTION,
      CREATE_RED_BILL_ACTION,
      PRINT_RED_INVOICES_ACTION,
    ]),

    statusSaveButton() {
      return this.$permission('SalesRedBillsCreate', 'RedBillsCreateSave')
    },
    statusSavePrintButton() {
      return this.$permission('SalesRedBillsCreate', 'RedBillsCreateSave&Print')
    },

    routeBack() {
      this.$router.back()
    },

    onClickAgreeButton() {
      this.isModalShow = !this.isModalShow
      this.goNext()
    },
    checkFieldsValueLength() {
      if (
        // START FORM
        this.redBill.customerId
        || (this.products.length > 0)
      ) {
        return true
      }
      return false
    },

    showBillOfSaleList() {
      this.$bvModal.show('bill-receipt-modal')
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
        const existedProductIndex = this.products.findIndex(products => products.productCode === product.item.productCode)
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
            note: '0T1',
            button: '1',
          })
        } else {
          this.products[existedProductIndex].quantity += product.item.quantity
          // Công thức: ghi chú sp = (SL / quantityPerBox(=24))'T'(SL % quantityPerBox(=24))
          // Gải thích: Ghi chú sp theo quy tắc: thùng T lẻ (24sp là 1 thùng)
          this.products[existedProductIndex].note = `${Math.floor(this.products[existedProductIndex].quantity / this.quantityPerBox)}T${this.products[existedProductIndex].quantity % this.quantityPerBox}`
          this.onChangeQuantityAndPrice(existedProductIndex)
          this.onChangeVAT(existedProductIndex)
          this.totalQuantity = this.products.reduce((accum, i) => accum + Number(i.quantity), 0)
        }
        // auto focus when choose products
        this.productIdSelected = product.item.productCode
        setTimeout(() => {
          document.getElementById(this.productIdSelected).focus()
        }, 100)
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
        this.totalQuantity = this.products.reduce((accum, i) => accum + Number(i.quantity), 0)
        this.totalPriceTotal = this.products.reduce((accum, i) => accum + Number(i.productPriceTotalOriginal), 0)
        this.totalProductExported = this.products.reduce((accum, i) => accum + Number(i.sumProductExportedOriginal), 0)
      }

      this.saleOrderIds = invoiceData.saleOrderIds
      this.isDisabled = true
    },
    taxMoney(money, vat) {
      return (money * (vat / 100))
    },
    checkValue(index) {
      if (this.products[index].vat === '0') {
        this.products[index].vat = 1
      }
      if (this.products[index].vat > 100) {
        this.products[index].vat = 100
      }
    },
    onInputValueProductPrice(index) {
      if (this.products[index].productPrice === 0) {
        this.products[index].productPrice = 1
      }
      // this.products[index].productPrice = Number(this.products[index].productPriceOriginal)
    },
    onInputValueQuantity(index) {
      if (this.products[index].quantity === 0) {
        this.products[index].quantity = 1
      }
    },
    onChangePrice(index) {
      if (this.products[index].productPrice === '0') {
        this.products[index].productPrice = 1
        this.products[index].productPriceOriginal = 1
      }
      this.products[index].productPriceOriginal = Number(this.products[index].productPrice)
      this.products[index].productPriceTotal = this.$formatNumberToLocale(Number(this.products[index].quantity) * Number(this.products[index].productPrice))
      this.products[index].productPriceTotalOriginal = Number(this.products[index].quantity) * Number(this.products[index].productPrice)
      this.products[index].productExported = this.$formatNumberToLocale(parseInt(Number(this.products[index].productPriceTotalOriginal) * (Number(this.products[index].vat) / 100), 10))
      this.totalPriceTotal = this.products.reduce((accum, i) => accum + Number(i.productPriceTotalOriginal), 0)
      this.products[index].sumProductExportedOriginal = Number(this.products[index].productPriceTotalOriginal) * (Number(this.products[index].vat) / 100)
      this.totalProductExported = this.products.reduce((accum, i) => accum + Number(i.sumProductExportedOriginal), 0)
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
      if (productsData.findIndex(product => product.quantity === '') !== -1) {
        toasts.error('Số lượng không được để trống')
        return
      }
      if (productsData.findIndex(product => product.priceNotVat === '') !== -1) {
        toasts.error('Đơn giá không được để trống')
        return
      }
      if (productsData.findIndex(product => product.vat === '') !== -1) {
        toasts.error('VAT không được để trống')
        return
      }
      if (productsData.length > 0) {
        this.isFieldCheck = false
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
    onClickCreateAndPrintBill() {
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
      if (productsData.findIndex(product => product.quantity === '') !== -1) {
        toasts.error('Số lượng không được để trống')
        return
      }
      if (productsData.findIndex(product => product.priceNotVat === '') !== -1) {
        toasts.error('Đơn giá không được để trống')
        return
      }
      if (productsData.findIndex(product => product.vat === '') !== -1) {
        toasts.error('VAT không được để trống')
        return
      }
      if (productsData.length > 0) {
        this.CREATE_RED_BILL_ACTION({
          paramsCreateRedInvoice,
          onSuccess: () => {
            this.isPrintData = true
            this.isFieldCheck = false
          },
        })
        return
      }
      toasts.error('Hóa đơn cần chứa ít nhất một sản phẩm')
    },
    onClickDeleteItem(index) {
      this.products.splice(index, 1)
    },
    focusInputSearch() {
      this.$refs.searchProduct.$el.querySelector('input').focus()
      this.$refs.searchProduct.$el.querySelector('input').click()
    },
  },
}
</script>
<style>
  .item-active {
    padding-left: 5px;
  }
  .style-input {
    padding: 0.438rem 0.5rem;
  }

.custom-table.vgt-table thead tr:first-child th {
  border-bottom: 0px;
}
  .custom-table thead tr:last-child th:last-child {
    position: sticky;
    right: -1px;
    z-index: 99;
    background: #fff;
  }
  .move-header {
    position: sticky !important;
    right: -1px;
    top: auto;
    z-index: 99;
    background: #315899 !important;
  }
  .move-column {
    position: sticky;
    right: -1px;
    z-index: 99;
    background: inherit;
  }

  .custom-table.table-horizontal-scroll thead tr:last-child th:nth-child(2) {
    left: 34px;
    z-index: 1;
    background: #fff;
  }
  .custom-table.table-horizontal-scroll thead tr:last-child th:nth-child(3) {
    left: 153px;
    z-index: 1;
    background: #fff;
  }

  .custom-table.table-horizontal-scroll .column-first {
    left: 34px;
    z-index: 1;
  }
  .custom-table.table-horizontal-scroll .column-second {
    left: 153px;
    z-index: 1;
  }
</style>
