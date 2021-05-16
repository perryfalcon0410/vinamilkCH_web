<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chọn hoá đơn bán hàng"
    title-class="text-uppercase font-weight-bold text-brand-1"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <!-- START - Search -->
      <b-form class="bg-white shadow rounded">
        <b-row
          v-b-toggle.collapseDelivery
          class="text-primary mx-0 p-1"
          align-v="center"
          align-h="between"
        >
          <strong class="text-brand-1">Tìm kiếm</strong>

          <b-icon-chevron-down
            scale="1.3"
            color="#203181"
          />
        </b-row>
        <b-collapse
          id="collapseDelivery"
          visible
        >
          <b-form-row
            class="border-top p-1"
          >
            <b-col
              xl
              sm="4"
              md="3"
            >
              <div class="h8 mt-sm-1 mt-xl-0">
                {{ 'Khách hàng' }}
              </div>
              <b-form-input
                v-model="searchOptions.customerKeywords"
                class="h8 text-brand-3"
                placeholder="Nhập khách hàng"
                trim
              />
            </b-col>

            <b-col
              xl
              sm="4"
              md="3"
            >
              <div>
                {{ 'Số hóa đơn' }}
              </div>
              <b-form-input
                v-model="searchOptions.invoiceNumberKeywords"
                trim
              />
            </b-col>
            <b-col
              xl
              sm="6"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Từ ngày
              </div>
              <b-input-group
                class="input-group-merge"
              >
                <vue-flat-pickr
                  v-model="searchOptions.fromDate"
                  :config="configDate"
                  class="form-control h8 text-brand-3"
                  placeholder="Chọn ngày"
                />
                <b-input-group-append
                  is-text
                >
                  <b-icon-x
                    v-show="searchOptions.fromDate"
                    class="cursor-pointer text-gray"
                    @click="searchOptions.fromDate = null"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-col>

            <b-col
              xl
              sm="6"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Đến ngày
              </div>
              <b-input-group
                class="input-group-merge"
              >
                <vue-flat-pickr
                  v-model="searchOptions.toDate"
                  :config="configDate"
                  class="form-control h8 text-brand-3"
                  placeholder="Chọn ngày"
                />
                <b-input-group-append
                  is-text
                >
                  <b-icon-x
                    v-show="searchOptions.toDate"
                    class="cursor-pointer text-gray"
                    @click="searchOptions.toDate = null"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <b-col
              xl
              sm="6"
              md="12"
            >
              <div
                class="h8 text-white"
                onmousedown="return false;"
                style="cursor: context-menu;"
              >
                Tìm kiếm
              </div>
              <b-button
                id="form-button-search"
                class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
                variant="someThing"
                @click="onClickSearchButton()"
              >
                <b-icon-search class="mr-1" />
                Tìm kiếm
              </b-button>
            </b-col>
          </b-form-row>
        </b-collapse>
      </b-form>
      <!-- END - Search -->

      <!-- START - Coupon list -->
      <b-form class="bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <strong class="text-brand-1"> Danh sách hóa đơn bán hàng </strong>
        </b-row>
        <!-- END - Header -->

        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            ref="bill-of-sales-table"
            :columns="columnsInvoice"
            :rows="billSales"
            style-class="vgt-table bordered"
            :pagination-options="{
              enabled: true,
              perPage: elementSize
            }"
            compact-mode
            :select-options="{
              enabled: true,
              selectOnCheckboxOnly: true,
              selectionInfoClass: 'custom-class',
              clearSelectionText: 'clear',
              disableSelectInfo: true,
              selectAllByGroup: true,
              multipleColumns: true,
            }"
            @on-selected-rows-change="selectionChanged"
          >
            <template
              slot="table-row"
              slot-scope="props"
            >
              <span v-if="props.column.field == 'billNumber'">
                <span>
                  {{ props.row.billNumber }}
                </span>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
            <!-- START - Empty rows -->
            <div
              slot="emptystate"
              class="text-center"
            >
              Không có dữ liệu
            </div>
            <!-- END - Empty rows -->
            <!-- START - Pagination -->
            <template
              slot="pagination-bottom"
              slot-scope="props"
            >
              <b-row
                class="v-pagination px-1 mx-0"
                align-h="between"
                align-v="center"
              >
                <div
                  class="d-flex align-items-center"
                >
                  <span
                    class="text-nowrap"
                  >
                    Hiển thị 1 đến
                  </span>
                  <b-form-select
                    v-model="elementSize"
                    size="sm"
                    :options="paginationOptions"
                    class="mx-1 mt-1 mb-1"
                    @input="(value)=>props.perPageChanged({currentPerPage: value})"
                  />
                  <span
                    class="text-nowrap"
                  > trong {{ totalElementBill }} mục </span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="totalElementBill"
                  :per-page="elementSize"
                  first-number
                  last-number
                  align="right"
                  prev-class="prev-item"
                  next-class="next-item"
                  class="mt-1"
                  @input="(value)=>props.pageChanged({currentPage: value})"
                >
                  <template slot="prev-text">
                    <feather-icon
                      icon="ChevronLeftIcon"
                      size="18"
                    />
                  </template>
                  <template slot="next-text">
                    <feather-icon
                      icon="ChevronRightIcon"
                      size="18"
                    />
                  </template>
                </b-pagination>
              </b-row>
            </template>
          <!-- END - Pagination -->
          </vue-good-table>
        </b-col>
        <!-- END - Table -->
      </b-form>
      <!-- END - Coupon list -->

      <!-- START - Product list -->
      <b-form class="bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <strong class="text-brand-1"> Danh sách sản phẩm </strong>
        </b-row>
        <!-- END - Header -->

        <!-- START - Table Products -->
        <b-col class="py-1">
          <vue-good-table
            ref="bill-of-sales-table"
            :columns="columnsProducts"
            :rows="productSales"
            style-class="vgt-table striped"
            compact-mode
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
            <!-- START - Pagination -->
            <template
              slot="pagination-bottom"
              slot-scope="props"
            >
              <b-row
                class="v-pagination px-1 mx-0"
                align-h="between"
                align-v="center"
              >
                <div
                  class="d-flex align-items-center"
                >
                  <span
                    class="text-nowrap"
                  >
                    Hiển thị 1 đến
                  </span>
                  <b-form-select
                    v-model="elementSize"
                    size="sm"
                    :options="paginationOptions"
                    class="mx-1 mt-1 mb-1"
                    @input="(value)=>props.perPageChanged({currentPerPage: value})"
                  />
                  <span
                    class="text-nowrap"
                  > trong {{ totalElementProduct }} mục </span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="totalElementProducts"
                  :per-page="elementSize"
                  first-number
                  last-number
                  align="right"
                  prev-class="prev-item"
                  next-class="next-item"
                  class="mt-1"
                  @input="(value)=>props.pageChanged({currentPage: value})"
                >
                  <template slot="prev-text">
                    <feather-icon
                      icon="ChevronLeftIcon"
                      size="18"
                    />
                  </template>
                  <template slot="next-text">
                    <feather-icon
                      icon="ChevronRightIcon"
                      size="18"
                    />
                  </template>
                </b-pagination>
              </b-row>
            </template>
          <!-- END - Pagination -->
          </vue-good-table>
        </b-col>
      <!-- END - Table Products-->
      </b-form>
      <!-- END - Product list -->
    </b-container>
    <template #modal-footer>
      <b-button
        variant="someThing"
        class="btn-brand-1 aligns-items-button-center"
        @click="onClickChooseButton()"
      >
        Chọn
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex'
import { formatDateToLocale, reverseVniDate, formatNumberToLocale } from '@/@core/utils/filter'
import commonData from '@/@db/common'
import toasts from '@/@core/utils/toasts/toasts'
import {
  RED_INVOICE,
  // GETTER
  GET_BILL_OF_SALES_GETTER,
  GET_PRODUCTS_IN_SELECTED_BILL_GETTER,
  GET_INVOICE_DETAIL_GETTER,
  GET_INVOICE_DETAIL_INFO_GETTER,
  // MUTATIONS
  CLEAR_BILL_OF_SALE_PRODUCTS_UNCHECKED,
  CLEAR_ALL_BILL_OF_SALES_PRODUCTS,
  // ACTION
  GET_BILL_OF_SALES_ACTION,
  GET_PRODUCTS_IN_SELECTED_BILL_ACTION,
  GET_INVOICE_DETAIL_ACTION,
} from '../../store-module/type'

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      elementSize: commonData.pagination[0],
      pageNumber: commonData.pageNumber,
      paginationOptions: commonData.pagination,
      searchOptions: {
        customerKeywords: '',
        fromDate: null,
        toDate: null,
        invoiceNumberKeywords: '',
      },
      formId: 5, // hard code
      ctrlId: 7, // hard code
      billSales: [],
      billSalesSelected: [],
      productSales: [],
      columnsInvoice: [
        {
          label: 'STT',
          field: 'stt',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'orderNumber',
          sortable: false,
        },
        {
          label: 'Mã khách hàng',
          field: 'customerNumber',
          sortable: false,
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          sortable: false,
        },
        {
          label: 'Ngày bán',
          field: 'orderDate',
          sortable: false,
        },
        {
          label: 'Tiền giảm giá',
          field: 'totalPromotion',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Tiền tích lũy',
          field: 'customerPurchase',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Tiền phải trả',
          field: 'total',
          type: 'number',
          sortable: false,
        },
      ],
      columnsProducts: [
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
          label: 'ĐVT',
          field: 'productUnit',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
        },
        {
          label: 'Đơn giá',
          field: 'unitPrice',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'totalMoney',
          sortable: false,
        },
      ],
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      totalElementProduct: null,
      totalElementBill: null,
      arrSaleOrderIds: [],
      orderNumbers: [],
      invoiceDetail: {
        customerId: null,
        customerCode: '',
        customerName: '',
        officeWorking: '',
        officeAddress: '',
        taxCode: '',
        products: [],
      },
    }
  },
  computed: {
    getBillOfSales() {
      return this.GET_BILL_OF_SALES_GETTER().billOfSales.map((data, index) => ({
        orderNumber: data.orderNumber,
        customerNumber: data.customerNumber,
        customerName: data.customerName,
        orderDate: formatDateToLocale(data.orderDate),
        totalPromotion: formatNumberToLocale(data.totalPromotion),
        customerPurchase: data.customerPurchase,
        amount: data.amount,
        total: formatNumberToLocale(data.total),
        stt: index + 1,
        saleOrderId: data.saleOrderID,
      }))
    },
    paging() {
      return this.GET_BILL_OF_SALES_GETTER().billOfSalesPaging
    },
    getProductsOfBillSale() {
      return this.GET_PRODUCTS_IN_SELECTED_BILL_GETTER().map(data => ({
        productId: data.id,
        productName: data.productName,
        productCode: data.productCode,
        productUnit: data.uom1,
        quantity: data.quantity,
        unitPrice: formatNumberToLocale(data.unitPrice),
        totalMoney: formatNumberToLocale(data.intoMoney),
        unitPriceOriginal: data.unitPrice,
        totalMoneyOriginal: data.intoMoney,
        groupVat: data.groupVat,
      }))
    },
    getInvoiceDetailInfo() {
      return this.GET_INVOICE_DETAIL_GETTER().info
    },
    getInvoiceDetail() {
      return this.GET_INVOICE_DETAIL_GETTER().response
    },
  },
  watch: {
    getBillOfSales() {
      this.billSales = [...this.getBillOfSales]
      this.totalElementBill = this.GET_BILL_OF_SALES_GETTER().billOfSalesPaging.totalElements
    },
    pageNumber() {
      this.onPaginationChange()
    },
    elementSize() {
      this.onPaginationChange()
    },
    getProductsOfBillSale() {
      this.productSales.push(...this.getProductsOfBillSale)
      this.totalElementProduct = this.productSales.length
    },
    getInvoiceDetailInfo() {
      const invoiceDetailInfoData = { ...this.getInvoiceDetailInfo }
      this.invoiceDetail.customerId = invoiceDetailInfoData.customerId
      this.invoiceDetail.customerCode = invoiceDetailInfoData.customerCode
      this.invoiceDetail.customerName = invoiceDetailInfoData.customerName
      this.invoiceDetail.officeWorking = invoiceDetailInfoData.officeWorking
      this.invoiceDetail.officeAddress = invoiceDetailInfoData.officeAddress
      this.invoiceDetail.taxCode = invoiceDetailInfoData.taxCode
      this.invoiceDetail.shopId = invoiceDetailInfoData.shopId
      this.invoiceDetail.totalAmount = invoiceDetailInfoData.totalAmount
      this.invoiceDetail.totalQuantity = invoiceDetailInfoData.totalQuantity
      this.invoiceDetail.totalValueAddedTax = invoiceDetailInfoData.totalValueAddedTax
      this.invoiceDetail.products = [...this.getInvoiceDetail]
    },
  },
  beforeMount() {
    this.searchOptions.fromDate = this.$earlyMonth
    this.searchOptions.toDate = this.$nowDate
  },
  mounted() {
    const paramGetBillOfSale = {
      formId: this.formId,
      ctrlId: this.ctrlId,
    }
    this.GET_BILL_OF_SALES_ACTION(paramGetBillOfSale)
  },
  methods: {
    ...mapGetters(RED_INVOICE, [
      GET_BILL_OF_SALES_GETTER,
      GET_PRODUCTS_IN_SELECTED_BILL_GETTER,
      GET_INVOICE_DETAIL_GETTER,
      GET_INVOICE_DETAIL_INFO_GETTER,
    ]),
    ...mapActions(RED_INVOICE, [
      GET_BILL_OF_SALES_ACTION,
      GET_PRODUCTS_IN_SELECTED_BILL_ACTION,
      GET_INVOICE_DETAIL_ACTION,
    ]),
    ...mapMutations(RED_INVOICE, [
      CLEAR_ALL_BILL_OF_SALES_PRODUCTS,
      CLEAR_BILL_OF_SALE_PRODUCTS_UNCHECKED,
    ]),
    onPaginationChange() {
      const searchBillOfSales = {
        fromDate: reverseVniDate(this.searchOptions.fromDate),
        toDate: reverseVniDate(this.searchOptions.toDate),
        searchKeywords: this.searchOptions.customerKeywords,
        invoiceNumber: this.searchOptions.invoiceNumberKeywords,
      }

      this.GET_BILL_OF_SALES_ACTION({
        ...searchBillOfSales,
        size: this.elementSize,
        page: this.pageNumber,
        formId: this.formId,
        ctrlId: this.ctrlId,
      })
    },
    onClickSearchButton() {
      const searchBillOfSales = {
        fromDate: reverseVniDate(this.searchOptions.fromDate),
        toDate: reverseVniDate(this.searchOptions.toDate),
        searchKeywords: this.searchOptions.customerKeywords,
        invoiceNumber: this.searchOptions.invoiceNumberKeywords,
      }

      this.GET_BILL_OF_SALES_ACTION({
        ...searchBillOfSales,
        size: this.elementSize,
        page: this.pageNumber,
        formId: this.formId,
        ctrlId: this.ctrlId,
      })
    },
    selectionChanged(params) {
      if (params.selectedRows.length === 0) {
        this.CLEAR_ALL_BILL_OF_SALES_PRODUCTS()
      } else if (params.selectedRows.length > 0) {
        this.productSales = []
        this.billSalesSelected = []
        this.arrSaleOrderIds = []
        this.orderNumbers = []
        params.selectedRows.forEach(item => {
          this.billSalesSelected.push(item)
          this.arrSaleOrderIds.push(item.saleOrderId)
          this.orderNumbers.push(item.orderNumber)
          this.GET_PRODUCTS_IN_SELECTED_BILL_ACTION({
            orderCode: item.orderNumber,
            formId: this.formId,
            ctrlId: this.ctrlId,
          })
        })
      }
    },
    onClickChooseButton() {
      const filterBillSalesSelected = this.billSalesSelected.filter(i => i.customerNumber === this.billSalesSelected[0].customerNumber)
      if (filterBillSalesSelected.length === this.billSalesSelected.length) {
        this.visible = false
        this.GET_INVOICE_DETAIL_ACTION({ orderCodeList: this.orderNumbers.join(',') })
        this.$emit('productsOfBillSaleData', { invoiceDetail: this.invoiceDetail, saleOrderIds: this.arrSaleOrderIds })
      } else {
        toasts.error('Hóa đơn được chọn không cùng một khách hàng')
      }
    },
  },
}
</script>
