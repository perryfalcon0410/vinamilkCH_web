<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-sales-list-search
      class="d-print-none"
      @updateSearchData="updateSearchData"
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
            v-if="statusPrintButton().show"
            :disabled="statusPrintButton().disabled || sales.length === 0"
            class="rounded btn-brand-1 h8"
            variant="someThing"
            @click="onClickPrintButton"
          >
            <b-icon-printer-fill class="mr-50" />
            In
          </b-button>
          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || sales.length === 0"
            class="ml-1 rounded btn-brand-1 h8"
            variant="someThing"
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
          style-class="vgt-table table-horizontal-scroll"
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
              {{ $formatNumberToLocale(totalInfo.totalQuantity) }}
            </div>

            <div
              v-show="salesPagination.totalElements"
              v-else-if="props.column.field === 'total'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.totalTotal) }}
            </div>
            <div
              v-show="salesPagination.totalElements"
              v-else-if="props.column.field === 'promotionNotVAT'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.totalPromotionNotVAT) }}
            </div>
            <div
              v-show="salesPagination.totalElements"
              v-else-if="props.column.field === 'promotion'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.totalPromotion) }}
            </div>
            <div
              v-show="salesPagination.totalElements"
              v-else-if="props.column.field === 'amount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.totalPay) }}
            </div>
          </template>
          <!-- START - Column filter -->
          <!-- START - Custom row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'quantity' || props.column.field === 'total' || props.column.field === 'promotionNotVAT' || props.column.field === 'promotion' || props.column.field === 'amount'"
              style="padding-right: 4px"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'customerName' || props.column.field === 'productName' || props.column.field === 'userName' || props.column.field === 'industry'"
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
  formatISOtoVNI,
  preventDefaultWindowPrint,
  hostName,
  checkIpClient,
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
import {
  PRINTERCONFIG,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../../auth/printer-configuration-modal/store-module/type'

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
          width: '170px',
          thClass: 'text-nowrap scroll-column-header column-first',
          tdClass: 'scroll-column column-first',
        },
        {
          label: 'Ngày bán',
          field: 'sellDate',
          width: '100px',
          thClass: 'text-nowrap scroll-column-header column-second',
          tdClass: 'scroll-column column-second',
        },
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          width: '135px',
          thClass: 'text-nowrap scroll-column-header column-third',
          tdClass: 'scroll-column column-third',
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          thClass: 'text-nowrap scroll-column-header column-fourth',
          tdClass: 'scroll-column column-fourth',
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
          label: 'Chiết khấu (trước VAT)',
          field: 'promotionNotVAT',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Chiết khấu (sau VAT)',
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
      salesPagination: {},
      totalInfo: {},
      ipAddressCurrent: '',
      ipAddress: '',
    }
  },

  computed: {
    ...mapGetters(REPORT_SALES, [
      REPORT_SALES_GETTER,
    ]),
    getSales() {
      if (this.REPORT_SALES_GETTER.response) {
        return this.REPORT_SALES_GETTER.response.content.map(data => ({
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
          promotionNotVAT: data.promotionNotVAT,
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
    getTotalInfo() {
      if (this.REPORT_SALES_GETTER.info) {
        return this.REPORT_SALES_GETTER.info
      }
      return {}
    },
    getSalesPagination() {
      if (this.REPORT_SALES_GETTER.response) {
        return this.REPORT_SALES_GETTER.response
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
    getTotalInfo() {
      this.totalInfo = { ...this.getTotalInfo }
    },
    getSalesPagination() {
      this.salesPagination = { ...this.getSalesPagination }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleWindowPrintHotKey, false)
    hostName().then(res => {
      if (res) {
        this.ipAddress = res.ip || res.query || res.geoplugin_request
      } else {
        this.ipAddress = null
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleWindowPrintHotKey)
  },
  methods: {
    ...mapActions(REPORT_SALES, [
      GET_REPORT_SALES_ACTION,
      EXPORT_REPORT_SALES_ACTION,
      PRINT_REPORT_SALES_ACTION,
    ]),
    handleWindowPrintHotKey(event) {
      const resolve = preventDefaultWindowPrint(event)
      if (resolve) {
        this.onClickPrintButton()
      }
    },
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),

    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsSalesSale', 'ReportsSalesSaleExcel')
    },
    statusPrintButton() {
      return this.$permission('ReportsSalesSale', 'ReportsSalesSalePrint')
    },
    // END - permission

    onPaginationChange() {
      this.GET_REPORT_SALES_ACTION(this.paginationData)
    },

    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },

    onPerPageChange(params) {
      this.updatePaginationData({ size: params.currentPerPage })
      this.onPaginationChange()
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
    updateSearchData(event) {
      this.pageNumber = 1
      this.searchOptions = event
      this.updatePaginationData({
        ...event,
        page: 0,
      })
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
    onClickPrintButton() {
      hostName().then(res => {
        if (res) {
          this.ipAddressCurrent = res.ip || res.query || res.geoplugin_request
        } else {
          this.ipAddressCurrent = null
        }
        if (checkIpClient(this.ipAddress, this.ipAddressCurrent)) {
          this.GET_PRINTER_CLIENT_ACTIONS({
            data: {
              clientId: this.ipAddressCurrent,
            },
            onSuccess: () => {
              this.PRINT_REPORT_SALES_ACTION({
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
                onSuccess: () => {},
              })
            },
          })
        }
      })
    },
  },
}
</script>
<style>
  /* scroll ô filter tùy chỉnh theo số lượng ô*/
  .table-horizontal-scroll thead tr:last-child th:nth-child(2) {
    left: 35px;
    z-index: 1;
  }
  .table-horizontal-scroll thead tr:last-child th:nth-child(3) {
    left: 204px;
    z-index: 1;
  }
  .table-horizontal-scroll thead tr:last-child th:nth-child(4) {
    left: 300px;
    z-index: 1;
  }
  .table-horizontal-scroll thead tr:last-child th:nth-child(5) {
    left: 432px;
    z-index: 1;
  }
  /* scroll ô filter tùy chỉnh theo số lượng ô*/

  /* tùy chỉnh left khi scroll*/
  .table-horizontal-scroll .column-first {
    left: 34px;
  }
  .table-horizontal-scroll .column-second {
    left: 204px;
  }
  .table-horizontal-scroll .column-third {
    left: 300px;
  }
  .table-horizontal-scroll .column-fourth {
    left: 432px;
  }
  /* tùy chỉnh left khi scroll*/
</style>
