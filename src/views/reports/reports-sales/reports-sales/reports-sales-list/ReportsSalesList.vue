<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-sales-list-search
      class="d-print-none"
      @updatePageElement="updatePageNumber"
      @updateSearchData="paginationData = {
        ...paginationData,
        ...$event }"
    />
    <!-- END - Search -->

    <!-- START - Report Output list -->
    <div class="bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách báo cáo bán hàng
        </strong>
        <b-button-group>
          <b-button
            class="rounded btn-brand-1 h8"
            variant="someThing"
            :disabled="sales.length === 0"
            @click="onClickPrintButton"
          >
            <b-icon-printer-fill class="mr-50" />
            In
          </b-button>
          <b-button
            class="ml-1 rounded btn-brand-1 h8"
            variant="someThing"
            :disabled="sales.length === 0"
            @click="onClickExcelExportButton"
          >
            <b-icon-file-earmark-x-fill class="mr-50" />
            Xuất excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col
        class="py-1"
      >
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="sales"
          style-class="vgt-table"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="salesPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
            initialSortBy: [{field: 'transDate', type: 'desc'}]
          }"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
        >
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <div
              v-show="salesPagination.totalElements"
              v-if="props.column.field === 'quantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalQuantity) }}
            </div>

            <div
              v-show="salesPagination.totalElements"
              v-else-if="props.column.field === 'total'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(total) }}
            </div>
            <div
              v-show="salesPagination.totalElements"
              v-else-if="props.column.field === 'promotion'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalPromotion) }}
            </div>
            <div
              v-show="salesPagination.totalElements"
              v-else-if="props.column.field === 'amount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalAmount) }}
            </div>
          </template>
          <!-- START - Column filter -->
          <!-- START - Custom row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'quantity' || props.column.field === 'total' || props.column.field === 'promotion' || props.column.field === 'amount'"
              style="padding-right: 4px"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'customerName' || props.column.field === 'productName' || props.column.field === 'userName'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Custom row -->
          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="salesPagination.totalElements"
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
                  v-model="elementSize"
                  size="sm"
                  :options="paginationOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="salesPagination.totalElements"
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
    </div>
    <!-- END - Report Output list -->

    <!-- STAT - Print form -->
    <print-form-report-sales />
    <!-- END - Print form -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  formatISOtoVNI, reverseVniDate,
} from '@core/utils/filter'
import PrintFormReportSales from '@core/components/print-form/PrintFormReportSales.vue'
import ReportsSalesListSearch from './components/ReportsSalesListSearch.vue'
import {
  REPORT_SALES,
  // GETTERS
  REPORT_SALES_GETTER,
  // ACTIONS
  GET_REPORT_SALES_ACTION,
  EXPORT_REPORT_SALES_ACTION,
  PRINT_REPORT_SALES_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsSalesListSearch,
    PrintFormReportSales,
  },

  data() {
    return {
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },
      searchOptions: {
        productCodes: null,
        internalNumber: null,
        importType: null,
        fromOrderDate: null,
        fromTransDate: null,
        toOrderDate: null,
        toTransDate: null,
      },
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      columns: [
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          thClass: 'text-nowrap',
        },
        {
          label: 'Ngày bán',
          field: 'sellDate',
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          thClass: 'text-nowrap',
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          thClass: 'text-nowrap',
        },
        {
          label: 'Điện thoại',
          field: 'phoneNumber',
          thClass: 'text-nowrap',
        },
        {
          label: 'Ngành hàng',
          field: 'industry',
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          thClass: 'text-nowrap',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          thClass: 'text-nowrap',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          thClass: 'text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá bán',
          field: 'price',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tổng cộng',
          field: 'total',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Khuyến mãi',
          field: 'promotion',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Thanh toán',
          field: 'amount',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Mã nhân viên',
          field: 'userCode',
          thClass: 'text-nowrap',
        },
        {
          label: 'Tên nhân viên',
          field: 'userName',
          thClass: 'text-nowrap',
        },
        {
          label: 'Nhóm sản phẩm',
          field: 'productGroup',
          thClass: 'text-nowrap',
        },
        {
          label: 'Số đơn online',
          field: 'onlineCode',
          thClass: 'text-nowrap',
        },
        {
          label: 'Kênh bán',
          field: 'sellChannel',
          thClass: 'text-nowrap',
        },
      ],
      sales: [],
    }
  },

  computed: {
    ...mapGetters(REPORT_SALES, [
      REPORT_SALES_GETTER,
    ]),
    getSales() {
      if (this.REPORT_SALES_GETTER.content) {
        return this.REPORT_SALES_GETTER.content.map(data => ({
          redInvoiceNo: data.orderNumber,
          sellDate: formatISOtoVNI(data.orderDate),
          customerCode: data.customerCode,
          customerName: data.customerName,
          phoneNumber: data.numberPhone,
          industry: data.industry,
          productCode: data.productCode,
          productName: data.productName,
          unit: data.unit,
          quantity: data.quantity,
          price: data.price,
          total: data.total,
          promotion: data.promotion,
          amount: data.pay,
          userCode: data.employeeCode,
          userName: data.employeeName,
          productGroup: data.productGroups,
          onlineCode: data.onlineNumber,
          sellChannel: data.salesChannel,
        }))
      }
      return []
    },
    totalQuantity() {
      return this.sales.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
    total() {
      return this.sales.reduce((accum, item) => accum + Number(item.total), 0)
    },
    totalPromotion() {
      return this.sales.reduce((accum, item) => accum + Number(item.promotion), 0)
    },
    totalAmount() {
      return this.sales.reduce((accum, item) => accum + Number(item.amount), 0)
    },
    salesPagination() {
      if (this.REPORT_SALES_GETTER) {
        return this.REPORT_SALES_GETTER
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.elementSize) - this.elementSize + 1
      const maxPageSize = (this.elementSize * this.pageNumber) > this.salesPagination.totalElements
        ? this.salesPagination.totalElements : (this.elementSize * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.salesPagination.totalElements} mục`
    },
  },

  watch: {
    getSales() {
      this.sales = [...this.getSales]
    },
  },

  mounted() {
  },

  methods: {
    ...mapActions(REPORT_SALES, [
      GET_REPORT_SALES_ACTION,
      EXPORT_REPORT_SALES_ACTION,
      PRINT_REPORT_SALES_ACTION,
    ]),

    onPaginationChange() {
      this.GET_REPORT_SALES_ACTION(this.paginationData)
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({ size: params.currentPerPage })
      this.onPaginationChange()
    },
    onClickExcelExportButton() {
      this.EXPORT_REPORT_SALES_ACTION({
        collecter: this.paginationData.collecter,
        customerKW: this.paginationData.customerKW?.trim(),
        fromDate: this.paginationData.fromDate,
        toDate: this.paginationData.toDate,
        fromInvoiceSales: this.paginationData.fromInvoiceSales,
        toInvoiceSales: this.paginationData.toInvoiceSales,
        orderNumber: this.paginationData.orderNumber?.trim(),
        phoneNumber: this.paginationData.phoneNumber?.trim(),
        productKW: this.paginationData.productKW?.trim(),
        salesChannel: this.paginationData.salesChannel,
        formId: 1,
        ctrlId: 1,
      })
    },
    updatePageNumber() {
      this.pageNumber = 1
    },
    onClickPrintButton() {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_REPORT_SALES_ACTION({
        collecter: this.paginationData.collecter,
        customerKW: this.paginationData.customerKW?.trim(),
        fromDate: reverseVniDate(this.paginationData.fromDate),
        toDate: reverseVniDate(this.paginationData.toDate),
        fromInvoiceSales: this.paginationData.fromInvoiceSales,
        toInvoiceSales: this.paginationData.toInvoiceSales,
        orderNumber: this.paginationData.orderNumber?.trim(),
        phoneNumber: this.paginationData.phoneNumber?.trim(),
        productKW: this.paginationData.productKW?.trim(),
        salesChannel: this.paginationData.salesChannel,
        formId: 1,
        ctrlId: 1,
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },
  },
}
</script>
<style>
  .name-width {
    width: max-content;
    max-width: 400px;
  }
</style>
