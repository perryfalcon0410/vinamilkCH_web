<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >

    <!-- START - Search -->
    <list-search
      class="d-print-none"
      :per-page-size="paginationData.size"
      @updateSearchData="updateSearchData"
      @onClickSearchButton="onClickSearchButton"
    />
    <!-- END - Search -->

    <!-- START - Input receipt list -->
    <div class="v-search bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách hóa đơn nhập hàng
        </strong>
        <b-button-group>
          <b-button
            v-show="statusPrintButton().show"
            :disabled="statusPrintButton().disabled || rows.length === 0"
            class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center"
            variant="someThing"
            @click="printReport"
          >
            <b-icon-printer-fill />
            In
          </b-button>
          <b-button
            v-show="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || rows.length === 0"
            class="shadow-brand-1 ml-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center"
            variant="someThing"
            @click="exportReport"
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
          :rows="rows"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
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

          <!-- START - Header filter -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <span v-if="props.column.label =='function'">
              <b-icon-bricks
                v-b-popover.hover="'Thao tác'"
                scale="1.3"
              />
            </span>
            <span v-else>
              {{ props.column.label }}
            </span>
          </template>
          <!-- END - Header filter -->

          <!-- START - Rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'totalPrice'"
              class="pr-70"
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
              v-if="props.column.field === 'totalPrice'"
              v-show="totalInfo"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.totalAmount) }}
            </b-row>
          </template>
          <!-- END - Column filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="reportInputReceiptDetailsPagination.totalElements"
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
                :total-rows="reportInputReceiptDetailsPagination.totalElements"
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
    <!-- END - Input receipt list-->

    <!-- STAT - Print form -->
    <print-form-report-input-orders-detail />
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
  resizeAbleTable,
} from '@core/utils/utils'
import PrintFormReportInputOrdersDetail from '@core/components/print-form/PrintFormReportInputOrdersDetail.vue'
import ListSearch from '../components/ListSearch.vue'
import {
  REPORT_PURCHASES,
  // Getters
  REPORT_INPUT_RECEIPT_DETAILS_GETTER,
  // Actions
  GET_REPORT_INPUT_RECEIPT_DETAILS_ACTION,
  EXPORT_REPORT_INPUT_RECEIPT_DETAILS_ACTION,
  PRINT_REPORT_INPUT_RECEIPT_DETAILS_ACTION,
} from '../store-module/type'

export default {
  components: {
    ListSearch,
    PrintFormReportInputOrdersDetail,
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
      searchData: {},
      formId: 5,
      ctrlId: 7,
      columns: [
        {
          label: 'Số PO',
          field: 'poNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số hóa đơn',
          field: 'receiptNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày hóa đơn',
          field: 'receiptDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Ngày thanh toán',
          field: 'paidDate',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số tiền',
          field: 'totalPrice',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'HDKM',
          field: 'hdkm',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
      rows: [],
      totalInfo: {},
      reportInputReceiptDetailsPagination: {},
    }
  },

  computed: {
    ...mapGetters(REPORT_PURCHASES, [
      REPORT_INPUT_RECEIPT_DETAILS_GETTER,
    ]),
    getReportInputReceiptDetails() {
      if (this.REPORT_INPUT_RECEIPT_DETAILS_GETTER.response) {
        return this.REPORT_INPUT_RECEIPT_DETAILS_GETTER.response.content.map(data => ({
          poNumber: data.poNumber,
          internalNumber: data.internalNumber,
          receiptNumber: data.redInvoiceNo,
          receiptDate: data.billDate,
          paidDate: data.dateOfPayment,
          totalPrice: this.$formatNumberToLocale(data.totalAmount),
          hdkm: data.promotionalOrders,
        }))
      }
      return []
    },

    getTotalInfo() {
      if (this.REPORT_INPUT_RECEIPT_DETAILS_GETTER.info) {
        return this.REPORT_INPUT_RECEIPT_DETAILS_GETTER.info
      }
      return {}
    },
    getReportInputReceiptDetailsPagination() {
      if (this.REPORT_INPUT_RECEIPT_DETAILS_GETTER.response) {
        return this.REPORT_INPUT_RECEIPT_DETAILS_GETTER.response
      }
      return {}
    },

    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.reportInputReceiptDetailsPagination.totalElements
        ? this.reportInputReceiptDetailsPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.reportInputReceiptDetailsPagination.totalElements} mục`
    },
  },
  watch: {
    getReportInputReceiptDetails() {
      this.rows = [...this.getReportInputReceiptDetails]
    },
    getTotalInfo() {
      this.totalInfo = { ...this.getTotalInfo }
    },
    getReportInputReceiptDetailsPagination() {
      this.reportInputReceiptDetailsPagination = { ...this.getReportInputReceiptDetailsPagination }
    },
  },
  mounted() {
    resizeAbleTable()
  },
  methods: {
    printReport() {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_REPORT_INPUT_RECEIPT_DETAILS_ACTION({
        ...this.searchData,
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },
    exportReport() {
      this.EXPORT_REPORT_INPUT_RECEIPT_DETAILS_ACTION(this.searchData)
    },
    ...mapActions(REPORT_PURCHASES, [
      GET_REPORT_INPUT_RECEIPT_DETAILS_ACTION,
      EXPORT_REPORT_INPUT_RECEIPT_DETAILS_ACTION,
      PRINT_REPORT_INPUT_RECEIPT_DETAILS_ACTION,
    ]),

    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsWarehouseInputDetails', 'ReportsWarehouseInputDetailsExcel')
    },
    statusPrintButton() {
      return this.$permission('ReportsWarehouseInputDetails', 'ReportsWarehouseInputDetailsPrint')
    },
    // END - permission

    // pagnigation functions
    updateSearchData(event) {
      this.searchData = { ...event }
      this.paginationData = {
        ...this.paginationData,
        ...event,
      }
    },
    onPaginationChange() {
      this.GET_REPORT_INPUT_RECEIPT_DETAILS_ACTION({ ...this.paginationData })
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.paginationData.size = params.currentPerPage
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
    onClickSearchButton() {
      this.pageNumber = 1 // hard code
    },
  },
  // pagnigation functions
}
</script>
