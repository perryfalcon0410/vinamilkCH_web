<template>
  <b-modal
    id="bill-receipt-modal"
    size="xl"
    title="Chọn hoá đơn bán hàng"
    title-class="text-uppercase font-weight-bold text-brand-1"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <b-container
      fluid
      class="d-flex flex-column"
      @keyup.enter="onClickSearchButton"
    >
      <!-- START - Search -->
      <v-card-actions title="Tìm kiếm">
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div class="h7 mt-sm-1 mt-xl-0">
            {{ 'Khách hàng' }}
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model.trim="searchOptions.customerKeywords"
              class="h7 text-brand-3"
              placeholder="Nhập Mã/SĐT/Tên khách hàng"
              autofocus
              @keyup.enter="onClickSearchButton"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="searchOptions.customerKeywords"
                class="cursor-pointer text-gray"
                @click="searchOptions.customerKeywords = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>

        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div class="h7 mt-sm-1 mt-xl-0">
            {{ 'Số hóa đơn' }}
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model.trim="searchOptions.invoiceNumberKeywords"
              class="h7 text-brand-3"
              placeholder="Nhập số hóa đơn"
              @keyup.enter="onClickSearchButton"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="searchOptions.invoiceNumberKeywords"
                class="cursor-pointer text-gray"
                @click="searchOptions.invoiceNumberKeywords = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>

        <!-- START - Date From -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
          >
            Từ ngày
          </div>
          <b-row
            class="v-flat-pickr-group mx-0"
            align-v="center"
            @keypress="$onlyDateInput"
          >
            <b-icon-x
              v-show="fromDate"
              style="position: absolute; right: 15px"
              class="cursor-pointer text-gray"
              scale="1.3"
              data-clear
            />
            <vue-flat-pickr
              v-model="fromDate"
              :config="configFromDate"
              class="form-control h7"
              placeholder="Chọn ngày"
            />
          </b-row>
        </b-col>
        <!-- END - Date From -->

        <!-- START - Date To -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
          >
            Đến ngày
          </div>
          <b-row
            class="v-flat-pickr-group mx-0"
            align-v="center"
            @keypress="$onlyDateInput"
          >
            <b-icon-x
              v-show="toDate"
              style="position: absolute; right: 15px"
              class="cursor-pointer text-gray"
              scale="1.3"
              data-clear
            />
            <vue-flat-pickr
              v-model="toDate"
              :config="configToDate"
              class="form-control h7"
              placeholder="Chọn ngày"
            />
          </b-row>

        </b-col>
        <!-- END - Date To -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h7 text-white"
            onmousedown="return false;"
            style="cursor: context-menu;"
          >
            Tìm kiếm
          </div>
          <b-button
            id="form-button-search"
            class="shadow-brand-1 bg-brand-1 text-white h8 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
            variant="someThing"
            @click="onClickSearchButton()"
          >
            <b-icon-search class="mr-50" />
            Tìm kiếm
          </b-button>
        </b-col>
      </v-card-actions>
      <!-- END - Search -->

      <!-- START - Coupon list -->
      <b-form
        class="bg-white rounded shadow rounded mt-1"
      >
        <!-- START - Header -->
        <b-row
          class="border-bottom mx-0 px-1"
          align-v="center"
          style="padding: 5px 0"
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
            mode="remote"
            style-class="vgt-table"
            :pagination-options="{
              enabled: true,
              perPage: searchData.size,
              setCurrentPage: searchData.page + 1,
            }"
            compact-mode
            line-numbers
            :total-rows="paging.totalElements"
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
            @on-sort-change="onSortChange"
            @on-page-change="onPageChange"
            @on-per-page-change="onPerPageChange"
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
                v-show="paging.totalElements"
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
                    Số hàng hiển thị
                  </span>
                  <b-form-select
                    v-model="searchData.size"
                    size="sm"
                    :options="perPageSizeOptions"
                    class="mx-1"
                    @input="(value)=>props.perPageChanged({currentPerPage: value})"
                  />
                  <span class="text-nowrap">{{ paginationDetailContent }}</span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="paging.totalElements"
                  :per-page="searchData.size"
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
      <b-form
        v-if="isHidden === true"
        class="bg-white rounded shadow rounded mt-1"
      >
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom px-1 mx-0"
          style="padding: 5px 0"
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
        class="btn-brand-1 aligns-items-button-center h8"
        :disabled="isCheckValue"
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
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
} from '@/@core/utils/filter'
import commonData from '@/@db/common'
import toasts from '@/@core/utils/toasts/toasts'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'

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
    VCardActions,
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
      isCheckValue: true,
      isHidden: false,
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      searchData: {
        size: commonData.perPageSizes[0],
        page: commonData.pageNumber - 1,
        sort: null,
      },
      searchOptions: {
        customerKeywords: '',
        invoiceNumberKeywords: '',
      },
      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      fromDate: earlyMonth(),
      toDate: nowDate(),

      configFromDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      configToDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        minDate: this.fromDate,
      },
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
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Tiền giảm giá',
          field: 'totalPromotion',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tiền tích lũy',
          field: 'customerPurchase',
          type: 'number',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tiền phải trả',
          field: 'total',
          type: 'number',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
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
          type: 'number',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Đơn giá',
          field: 'unitPrice',
          type: 'number',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Thành tiền',
          field: 'totalMoney',
          type: 'number',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
        },
      ],
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      totalElementProduct: 0,
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
        orderDate: data.orderDate,
        totalPromotion: data.totalPromotion,
        customerPurchase: data.customerPurchase,
        amount: data.amount,
        total: data.total,
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
        unitPrice: data.unitPrice,
        totalMoney: data.intoMoney,
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
    paginationDetailContent() {
      const { page, size } = this.searchData
      const { totalElements } = this.paging

      const minPageSize = page === 0 ? 1 : ((page + 1) * size) - size + 1
      const maxPageSize = (size * (page + 1)) > totalElements
        ? totalElements : (size * (page + 1))

      return `${minPageSize} - ${maxPageSize} của ${totalElements} mục`
    },
  },
  watch: {
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
    getBillOfSales() {
      this.billSales = [...this.getBillOfSales]
      this.totalElementBill = this.GET_BILL_OF_SALES_GETTER().billOfSalesPaging.totalElements
    },
    getProductsOfBillSale() {
      this.getProductsOfBillSale.forEach(item => {
        const index = this.productSales.findIndex(data => data.productId === item.productId)
        if (index === -1) {
          this.productSales.push(item)
        } else {
          this.productSales[index].quantity += item.quantity
          this.productSales[index].totalMoney = this.$formatNumberToLocale(this.productSales[index].totalMoneyOriginal + item.totalMoneyOriginal)
        }
      })
      this.totalElementProduct = this.productSales.length
      if (this.productSales.length > 0) {
        this.isCheckValue = false
      } else {
        this.isCheckValue = true
      }
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
  mounted() {
    this.onSearch()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    // this.GET_BILL_OF_SALES_ACTION({ ...this.decentralization })
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
    onSearch() {
      this.searchOption = {
        searchKeywords: this.searchOptions.customerKeywords,
        invoiceNumber: this.searchOptions.invoiceNumberKeywords,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
      }
      this.searchData = { ...this.searchData, ...this.searchOption }
      this.GET_BILL_OF_SALES_ACTION(this.searchData)
    },
    updateSearchData(newProps) {
      this.searchData = { ...this.searchData, ...newProps }
    },
    onClickSearchButton() {
      this.searchOption = {
        searchKeywords: this.searchOptions.customerKeywords,
        invoiceNumber: this.searchOptions.invoiceNumberKeywords,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
      }
      this.updateSearchData({
        // page: commonData.pageNumber - 1,
        ...this.searchOption,
      })
      this.onPaginationChange()
    },
    // func pagination
    onPaginationChange() {
      this.GET_BILL_OF_SALES_ACTION({ ...this.searchData })
    },
    onPageChange(params) {
      this.updateSearchData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updateSearchData({
        size: params.currentPerPage,
        page: commonData.pageNumber - 1,
      })
      this.onPaginationChange()
    },
    // func pagination
    selectionChanged(params) {
      if (params.selectedRows.length === 0) {
        this.isHidden = false
        this.isCheckValue = true
        this.CLEAR_ALL_BILL_OF_SALES_PRODUCTS()
      } else if (params.selectedRows.length > 0) {
        this.isHidden = true
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
        this.GET_INVOICE_DETAIL_ACTION({
          orderCodeList: { orderCodeList: this.orderNumbers.join(',') },
          onSuccess: invoiceDetailData => {
            this.invoiceDetail.customerId = invoiceDetailData.info.customerId
            this.invoiceDetail.customerCode = invoiceDetailData.info.customerCode
            this.invoiceDetail.customerName = invoiceDetailData.info.customerName
            this.invoiceDetail.officeWorking = invoiceDetailData.info.officeWorking
            this.invoiceDetail.officeAddress = invoiceDetailData.info.officeAddress
            this.invoiceDetail.taxCode = invoiceDetailData.info.taxCode
            this.invoiceDetail.shopId = invoiceDetailData.info.shopId
            this.invoiceDetail.totalAmount = invoiceDetailData.info.totalAmount
            this.invoiceDetail.totalQuantity = invoiceDetailData.info.totalQuantity
            this.invoiceDetail.totalValueAddedTax = invoiceDetailData.info.totalValueAddedTax
            this.invoiceDetail.products = invoiceDetailData.response
            this.$emit('productsOfBillSaleData', { invoiceDetail: this.invoiceDetail, saleOrderIds: this.arrSaleOrderIds })
            this.$bvModal.hide('bill-receipt-modal')

            this.isHidden = false
            this.isCheckValue = true
          },
        })
      } else {
        toasts.error('Hóa đơn được chọn không cùng một khách hàng')
      }
    },
  },
}
</script>
