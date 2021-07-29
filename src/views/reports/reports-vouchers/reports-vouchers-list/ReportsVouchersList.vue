<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - search -->
    <list-search
      :per-page-size="paginationData.size"
      @updateSearchData="updateSearchData"
      @onClickSearchButton="onClickSearchButton"
    />
    <!-- END - search -->

    <!-- START - Voucher list -->
    <b-form class="v-search bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách voucher đã sử dụng
        </strong>
        <b-button-group>
          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled"
            class="shadow-brand-1 ml-1 h8 rounded bg-brand-1 text-white font-weight-bolder height-button-brand-1 align-items-button-center"
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
      <b-col class="py-1 rp-voucher">
        <vue-good-table
          :columns="columns"
          mode="remote"
          :rows="rows"
          style-class="vgt-table report-voucher table-horizontal-scroll"
          :style="cssProps"
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
          <!-- START - Empty rows -->
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- END - Empty rows -->

          <!-- START - Rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'price' || props.column.field === 'sales'"
              class="pr-70"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->

          <!-- START - Header filter -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'storeCode'"
              ref="first"
            >
              {{ props.column.label }}
            </div>
            <div
              v-else-if="props.column.field === 'voucherProgramCode'"
              ref="second"
            >
              {{ props.column.label }}
            </div>
            <div
              v-else
            >
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Header filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="reportPurchasesDetailsPagination.totalElements"
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
                :total-rows="reportPurchasesDetailsPagination.totalElements"
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
    </b-form>
    <!-- END - Voucher list -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import ListSearch from '../components/ListSearch.vue'
import {
  REPORT_VOUCHERS,
  // Getters
  REPORT_VOUCHERS_USED_GETTER,
  // Actions
  GET_REPORT_VOUCHERS_USED_ACTION,
  EXPORT_REPORT_VOUCHERS_USED_ACTION,
} from '../store-module/type'

export default {
  components: {
    ListSearch,
  },
  data() {
    return {
      colWidth: {
        firstCol: 0,
        secondCol: 0,
      },
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },
      searchData: {},
      rows: [],
      columns: [
        {
          label: 'Mã cửa hàng',
          field: 'storeCode',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-first',
          tdClass: 'scroll-column column-first',
        },
        {
          label: 'Mã chương trình voucher',
          field: 'voucherProgramCode',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-second',
          tdClass: 'scroll-column column-second',
        },
        {
          label: 'Tên chương trình voucher',
          field: 'voucherProgramName',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-third',
          tdClass: 'scroll-column column-third',
        },
        {
          label: 'Mã voucher',
          field: 'voucherCode',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Tên voucher',
          field: 'voucherName',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Serial',
          field: 'serial',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Mệnh giá',
          field: 'price',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Người chuyển cửa hàng',
          field: 'author',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Ngày chuyển cửa hàng',
          field: 'changeDate',
          sortable: false,
          formatFn: value => this.$formatISOtoVNI(value),
          thClass: 'text-nowrap',
        },
        {
          label: 'Khách hàng sử dụng',
          field: 'customerUsed',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Đơn hàng sử dụng',
          field: 'orderUsed',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Cửa hàng sử dụng',
          field: 'storeOrdered',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Ngày sử dụng',
          field: 'dateUsed',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Doanh số',
          field: 'sales',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(REPORT_VOUCHERS, [
      REPORT_VOUCHERS_USED_GETTER,
    ]),
    getReportVouchersUsed() {
      if (this.REPORT_VOUCHERS_USED_GETTER.content) {
        return this.REPORT_VOUCHERS_USED_GETTER.content.map(data => ({
          storeCode: data.shopCode,
          voucherCode: data.voucherCode,
          voucherName: data.voucherName,
          serial: data.serial,
          price: data.price,
          author: data.changeUser,
          changeDate: data.changeDate,
          customerUsed: data.customerCode,
          orderUsed: data.orderNumber,
          storeOrdered: data.orderShopCode,
          dateUsed: data.orderDate,
          sales: data.orderAmount,
          voucherProgramCode: data.voucherProgramCode,
          voucherProgramName: data.voucherProgramName,
        }))
      }
      return []
    },
    reportPurchasesDetailsPagination() {
      if (this.REPORT_VOUCHERS_USED_GETTER) {
        return this.REPORT_VOUCHERS_USED_GETTER
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.reportPurchasesDetailsPagination.totalElements
        ? this.reportPurchasesDetailsPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.reportPurchasesDetailsPagination.totalElements} mục`
    },
    cssProps() {
      return {
        '--second-col': `${this.colWidth.firstCol + 19}px`,
        '--third-col': `${this.colWidth.firstCol + this.colWidth.secondCol + 18}px`,
      }
    },
  },
  watch: {
    getReportVouchersUsed() {
      this.rows = [...this.getReportVouchersUsed]
      this.$nextTick(() => {
        this.colWidth.firstCol = this.$refs.first.offsetParent.offsetWidth
        this.colWidth.secondCol = this.$refs.second.offsetParent.offsetWidth
      })
    },
  },
  methods: {
    ...mapActions(REPORT_VOUCHERS, [
      GET_REPORT_VOUCHERS_USED_ACTION,
      EXPORT_REPORT_VOUCHERS_USED_ACTION,
    ]),

    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsVouchers', 'ReportsVouchersExcel')
    },

    // END - permission
    exportReport() {
      this.EXPORT_REPORT_VOUCHERS_USED_ACTION({ ...this.searchData })
    },
    // pagnigation functions
    updateSearchData(event) {
      this.searchData = { ...event }
      this.paginationData = {
        ...this.paginationData,
        ...event,
      }
    },
    onPaginationChange() {
      this.GET_REPORT_VOUCHERS_USED_ACTION({ ...this.paginationData })
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
}
</script>
<style lang="scss">
  .rp-voucher {
    .table-horizontal-scroll thead tr:last-child th {
      background: inherit;
    }
  }
  /* scroll ô filter tùy chỉnh theo số lượng ô*/
  .report-voucher.table-horizontal-scroll thead tr:last-child th:nth-child(2) {
    left: 22px;
    z-index: 1;
    position: sticky;
  }
  .report-voucher.table-horizontal-scroll thead tr:last-child th:nth-child(3) {
    left: var(--second-col);
    z-index: 1;
  }
  .report-voucher.table-horizontal-scroll thead tr:last-child th:nth-child(4) {
    left: var(--third-col);
    z-index: 1;
  }
  /* scroll ô filter tùy chỉnh theo số lượng ô*/
  /* tùy chỉnh left khi scroll*/
  .report-voucher.table-horizontal-scroll .column-first {
    left: 22px;
  }
  .report-voucher.table-horizontal-scroll .column-second {
    left: var(--second-col);
  }
  .report-voucher.table-horizontal-scroll .column-third {
    left: var(--third-col);
  }
  /* tùy chỉnh left khi scroll*/
</style>
