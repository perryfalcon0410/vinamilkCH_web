<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-returned-goods-list-search
      class="d-print-none"
      @updateSearchData="updateSearchData"
    />
    <!-- END - Search -->

    <!-- START - Customer list -->
    <div class="v-search bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách đơn trả hàng
        </strong>
        <b-button-group>
          <b-button
            v-if="statusPrintButton().show"
            :disabled="statusPrintButton().disabled || reportReturnRows.length === 0"
            class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center"
            variant="someThing"
            @click="printReport"
          >
            <b-icon-printer-fill />
            In
          </b-button>
          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || reportReturnRows.length === 0"
            class="shadow-brand-1 ml-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center"
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
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          mode="remote"
          :rows="reportReturnRows"
          style-class="vgt-table table-horizontal-scroll report-returngood"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="reportReturnedgoodsPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
          }"
          @on-sort-change="onSortChange"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
        >
          >
          <!-- START - Empty rows -->
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- END - Empty rows -->

          <!-- START - Columns -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'feature'">
              <b-icon-bricks
                v-b-popover.hover="'Thao tác'"
                scale="1.3"
              />
            </div>

            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Columns -->

          <!-- START - Rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'feature'">
              <b-icon-pencil-fill
                v-b-popover.hover="'Chỉnh sửa'"
                class="cursor-pointer"
                @click="navigateToUpdate(props.row.id)"
              />
            </div>
            <div
              v-else-if="props.column.field === 'quantity' ||
                props.column.field ==='amount' ||
                props.column.field ==='refunds' ||
                props.column.field ==='price'"
              class="pr-70"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'productName' ||
                props.column.field ==='reasonForPayment' ||
                props.column.field ==='feedback' ||
                props.column.field ==='fullName' ||
                props.column.field === 'industry'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'quantity'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.totalQuantity) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'amount'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.totalAmount) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'refunds'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.totalRefunds) }}
            </b-row>
          </template>
          <!-- END - Column filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="reportReturnedgoodsPagination.totalElements"
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
                  v-model="paginationData.size"
                  size="sm"
                  :options="perPageSizeOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="reportReturnedgoodsPagination.totalElements"
                :per-page="paginationData.size"
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
    <!-- END - Customer list -->

    <!-- STAT - Print form -->
    <print-form-report-return-goods />
    <!-- END - Print form -->

  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  // getReportReasonTypeslabel,
  resizeAbleTable,
} from '@core/utils/utils'
import {
  preventDefaultWindowPrint,
  hostName,
  checkIpClient,
} from '@core/utils/filter'
import PrintFormReportReturnGoods from '@core/components/print-form/PrintFormReportReturnGoods.vue'
import ReportsReturnedGoodsListSearch from './components/ReportsReturnedGoodsListSearch.vue'
import {
  REPORT_RETURNED_GOODS,
  // Getters
  REPORT_RETURNED_GOODS_GETTER,
  // Actions
  GET_REPORT_RETURNED_GOODS_ACTION,
  EXPORT_REPORT_RETURNED_GOODS_ACTION,
  PRINT_RETURN_GOODS_ACTION,
} from '../store-module/type'
import {
  PRINTERCONFIG,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../auth/printer-configuration-modal/store-module/type'

export default {
  components: {
    ReportsReturnedGoodsListSearch,
    PrintFormReportReturnGoods,
  },
  data() {
    return {
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },
      searchOptions: {
      },
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      reportReturnRows: [],
      reportReturnedgoodsPagination: {},
      totalInfo: {},

      columns: [
        {
          label: 'Mã trả hàng',
          field: 'returnCode',
          sortable: false,
          width: '170px',
          thClass: 'text-nowrap scroll-column-header column-first',
          tdClass: 'ws-nowrap scroll-column column-first',
        },
        {
          label: 'Hóa đơn mua hàng',
          field: 'reciept',
          sortable: false,
          width: '170px',
          thClass: 'text-nowrap scroll-column-header column-second',
          tdClass: 'ws-nowrap scroll-column column-second',
        },
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
          width: '135px',
          thClass: 'text-nowrap scroll-column-header column-third',
          tdClass: 'ws-nowrap scroll-column column-third',
        },
        {
          label: 'Họ tên',
          field: 'fullName',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-4',
          tdClass: 'scroll-column column-4',
        },
        {
          label: 'Ngành hàng',
          field: 'industry',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'ws-nowrap',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-nowrap',
        },

        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-nowrap',
          tdClass: 'ws-nowrap',
        },
        {
          label: 'Giá bán',
          field: 'price',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          thClass: 'text-nowrap',
        },
        {
          label: 'Thành tiền',
          field: 'amount',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          thClass: 'text-nowrap',
          tdClass: 'ws-nowrap',
        },
        {
          label: 'Tiền trả lại',
          field: 'refunds',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          thClass: 'text-nowrap',
          tdClass: 'ws-nowrap',
        },
        {
          label: 'Ngày trả',
          field: 'payDay',
          sortable: false,
          formatFn: value => this.$formatISOtoVNI(value),
          thClass: 'text-nowrap',
          tdClass: 'ws-nowrap',
        },
        {
          label: 'Lý do trả',
          field: 'reasonForPayment',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Thông tin phản hồi',
          field: 'feedback',
          sortable: false,
          thClass: 'text-nowrap',
        },

      ],
      ipAddressCurrent: '',
      ipAddress: '',
    }
  },
  computed: {
    ...mapGetters(REPORT_RETURNED_GOODS, [
      REPORT_RETURNED_GOODS_GETTER,
    ]),
    getReportReturnedgoodLists() {
      if (this.REPORT_RETURNED_GOODS_GETTER.response && this.REPORT_RETURNED_GOODS_GETTER.response.content) {
        return this.REPORT_RETURNED_GOODS_GETTER.response.content.map(data => ({
          returnCode: data.returnCode,
          reciept: data.reciept,
          customerCode: data.customerCode,
          fullName: data.fullName,
          industry: data.industry,
          productCode: data.productCode,
          productName: data.productName,
          unit: data.unit,
          quantity: data.quantity,
          price: data.price,
          amount: data.amount,
          refunds: data.refunds,
          payDay: data.payDay,
          reasonForPayment: data.reasonForPayment,
          feedback: data.feedback,
        }))
      }
      return []
    },
    getTotalInfo() {
      if (this.REPORT_RETURNED_GOODS_GETTER.info) {
        return this.REPORT_RETURNED_GOODS_GETTER.info
      }
      return {}
    },

    getReportReturnedgoodsPagination() {
      if (this.REPORT_RETURNED_GOODS_GETTER.response) {
        return this.REPORT_RETURNED_GOODS_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.reportReturnedgoodsPagination.totalElements
        ? this.reportReturnedgoodsPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.reportReturnedgoodsPagination.totalElements} mục`
    },
  },
  watch: {
    getReportReturnedgoodLists() {
      this.reportReturnRows = [...this.getReportReturnedgoodLists]
    },
    getReportReturnedgoodsPagination() {
      this.reportReturnedgoodsPagination = { ...this.getReportReturnedgoodsPagination }
    },
    getTotalInfo() {
      this.totalInfo = { ...this.getTotalInfo }
    },
  },
  mounted() {
    resizeAbleTable()
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
    ...mapActions(REPORT_RETURNED_GOODS, [
      GET_REPORT_RETURNED_GOODS_ACTION,
      EXPORT_REPORT_RETURNED_GOODS_ACTION,
      PRINT_RETURN_GOODS_ACTION,
    ]),
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),
    handleWindowPrintHotKey(event) {
      const resolve = preventDefaultWindowPrint(event)
      if (resolve) {
        this.printReport()
      }
    },
    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsReturnedGoods', 'ReportsReturnedGoodsExcel')
    },
    statusPrintButton() {
      return this.$permission('ReportsReturnedGoods', 'ReportsReturnedGoodsPrint')
    },

    // END - permission
    // Start - xuat excel
    onClickExcelExportButton() {
      this.EXPORT_REPORT_RETURNED_GOODS_ACTION({ ...this.decentralization, ...this.searchOptions })
    },
    // End - xuat excel

    // printReport
    printReport() {
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
              this.PRINT_RETURN_GOODS_ACTION({
                ...this.searchOptions,
                ...this.decentralization,
                onSuccess: () => { },
              })
            },
          })
        }
      })
    },
    // printReport

    // Start - pagination
    onPaginationChange() {
      this.GET_REPORT_RETURNED_GOODS_ACTION(this.paginationData)
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
  },
}
</script>
<style>
.min-w {
  min-width: 8rem;
}
.report-returngood.table-horizontal-scroll thead tr:first-child th {
  border-bottom: 0px;
}
  /* scroll ô filter tùy chỉnh theo số lượng ô*/
  .report-returngood.table-horizontal-scroll thead tr:last-child th:nth-child(2) {
    left: 34px;
    z-index: 1;
  }
  .report-returngood.table-horizontal-scroll thead tr:last-child th:nth-child(3) {
    left: 204px;
    z-index: 1;
  }
  .report-returngood.table-horizontal-scroll thead tr:last-child th:nth-child(4) {
    left: 373px;
    z-index: 1;
  }
  .report-returngood.table-horizontal-scroll thead tr:last-child th:nth-child(5) {
    left: 508px;
    z-index: 1;
  }
  /* scroll ô filter tùy chỉnh theo số lượng ô*/

  /* tùy chỉnh left khi scroll*/
   .report-returngood.table-horizontal-scroll .column-first {
    left: 34px;
  }
  .report-returngood.table-horizontal-scroll .column-second {
    left: 204px;
  }
  .report-returngood.table-horizontal-scroll .column-third {
    left: 373px;
  }
  .report-returngood.table-horizontal-scroll .column-4 {
    left: 508px;
  }
  /* tùy chỉnh left khi scroll*/
</style>
