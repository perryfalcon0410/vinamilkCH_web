<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-sales-amount-receipt-per-customers-list-search
      :per-page-size="paginationData.size"
      @updateSearchData="updateSearchData"
      @onClickSearchButton="onClickSearchButton($event)"
    />
    <!-- END - Search -->

    <!-- START - sale receipt list -->
    <b-form class="v-search bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Doanh số hóa đơn theo khách hàng
        </strong>
        <b-button
          class="shadow-brand-1 ml-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
          variant="someThing"
          @click="onClickExcelExportButton"
        >
          <b-icon-file-earmark-x-fill class="mr-50" />
          Xuất excel
        </b-button>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="reportQuantityReceiptsList"
          mode="remote"
          style-class="vgt-table striped"
          compact-mode
          line-numbers
          :sort-options="{
            enabled: false,
            multipleColumns: true,
          }"
          :total-rows="reportSalesSaleReceiptPagination.totalElements"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          @on-sort-change="onSortChange"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
        >
          <!-- START - Empty rows -->
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- END - Empty rows -->
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-col
              v-for="item in labelName"
              :key="item.index"
            >
              <b-row
                v-if="props.column.field === `${item.field}`"
                class="mx-0"
                align-h="end"
              >
                {{ (totalQuantity[item.index]) }}
              </b-row>
            </b-col>
            <b-row
              v-if="props.column.field === 'sumTotal'"
              class="mx-0"
              align-h="end"
            >
              {{ (totalQuantity[totalQuantity.length-1]) }}
            </b-row>
          </template>
          <!-- END - Column filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="reportSalesSaleReceiptPagination.totalElements"
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
                :total-rows="reportSalesSaleReceiptPagination.totalElements"
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
    </b-form>
    <!-- END - sale receipt list -->
  </b-container>
</template>

<script>
import {
  resizeAbleTable,
} from '@core/utils/utils'
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import ReportsSalesAmountReceiptPerCustomersListSearch from './components/ReportsSalesAmountReceiptPerCustomersListSearch.vue'
import {
  REPORT_SALES_QUANTITY_SALE_RECEIPT,
  // Getters
  REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER,
  REPORT_SALES_QUANTITY_SALE_RECEIPT_CONTENT_GETTER,
  // Actions
  GET_REPORT_SALES_QUANTITY_SALE_RECEIPTS_ACTION,
  EXPORT_REPORT_SALES_QUANTITY_RECEIPT_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsSalesAmountReceiptPerCustomersListSearch,
  },
  data() {
    return {
      // pagination
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },
      // pagination
      labelName: [],
      totalQuantity: [],
      searchData: {},
      columns: [],
      reportQuantityReceiptsList: [],
      initalCol: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      lastCol: {
        label: 'Tổng cộng',
        field: 'sumTotal',
        sortable: false,
        filterOptions: {
          enabled: true,
        },
        thClass: 'text-right',
        tdClass: 'text-right',
      },
    }
  },
  computed: {
    ...mapGetters(REPORT_SALES_QUANTITY_SALE_RECEIPT, [
      REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER,
      REPORT_SALES_QUANTITY_SALE_RECEIPT_CONTENT_GETTER,
    ]),
    getTotalInfo() {
      if (this.REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER.totals) {
        return this.REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER.totals
      }
      return {}
    },
    reportSalesSaleReceiptPagination() {
      if (this.REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER && this.REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER.response) {
        return this.REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.reportSalesSaleReceiptPagination.totalElements
        ? this.reportSalesSaleReceiptPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.reportSalesSaleReceiptPagination.totalElements} mục`
    },
    getReportSalesReceiptQuantityDates() {
      if (this.REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER && this.REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER.dates) {
        return this.REPORT_SALES__QUANTITY_SALE_RECEIPT_GETTER.dates
      }
      return {}
    },
    getReportSalesReceiptQuantity() {
      return this.REPORT_SALES_QUANTITY_SALE_RECEIPT_CONTENT_GETTER.map(data => ({
        customerCode: data[0],
        customerName: data[1],
        address: data[2],
      }))
    },
    getReportSalesReceiptQuantityPrice() {
      return this.REPORT_SALES_QUANTITY_SALE_RECEIPT_CONTENT_GETTER
    },
  },
  watch: {
    // add columns dynamically
    getReportSalesReceiptQuantityDates() {
      this.labelName = []
      this.columns = [...this.initalCol]
      this.getReportSalesReceiptQuantityDates.forEach((item, index) => {
        const obj = {
          index,
          label: item,
          field: `${index + 3}`,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        }
        this.labelName.push(obj)
        this.columns.push(obj)
      })
      this.columns.push(this.lastCol)
    },
    getReportSalesReceiptQuantity() {
      this.reportQuantityReceiptsList = [...this.getReportSalesReceiptQuantity]
    },
    getReportSalesReceiptQuantityPrice() {
      for (let i = 0; i <= this.reportQuantityReceiptsList.length - 1; i += 1) {
        for (let j = 3; j <= this.getReportSalesReceiptQuantityPrice[i].length - 1; j += 1) {
          if (j < this.getReportSalesReceiptQuantityPrice[i].length - 1) {
            this.reportQuantityReceiptsList[i][j] = this.getReportSalesReceiptQuantityPrice[i][j]
          } else {
            this.reportQuantityReceiptsList[i].sumTotal = this.getReportSalesReceiptQuantityPrice[i][j]
          }
        }
      }
    },
    getTotalInfo() {
      this.totalQuantity = []
      this.getTotalInfo.forEach((item, index) => {
        if (index > 2) {
          this.totalQuantity.push(item)
        }
      })
    },
  },
  mounted() {
    resizeAbleTable()
  },
  methods: {
    ...mapActions(REPORT_SALES_QUANTITY_SALE_RECEIPT, [
      GET_REPORT_SALES_QUANTITY_SALE_RECEIPTS_ACTION,
      EXPORT_REPORT_SALES_QUANTITY_RECEIPT_ACTION,
    ]),
    onClickExcelExportButton() {
      this.EXPORT_REPORT_SALES_QUANTITY_RECEIPT_ACTION({
        ...this.searchData,
        ...this.decentralization,
      })
    },
    // pagination funcs
    updateSearchData(event) {
      this.searchData = { ...event }
      this.paginationData = {
        ...this.paginationData,
        ...event,
      }
    },
    onPaginationChange() {
      this.GET_REPORT_SALES_QUANTITY_SALE_RECEIPTS_ACTION(this.paginationData)
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onClickSearchButton() {
      this.pageNumber = 1
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
    // pagigation funcs
  },
}
</script>
