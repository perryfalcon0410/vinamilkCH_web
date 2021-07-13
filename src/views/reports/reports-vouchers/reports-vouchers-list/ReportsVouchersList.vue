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
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã chương trình voucher',
          field: 'voucherProgramCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên chương trình voucher',
          field: 'voucherProgramName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã voucher',
          field: 'voucherCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên voucher',
          field: 'voucherName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Serial',
          field: 'serial',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mệnh giá',
          field: 'price',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Người chuyển cửa hàng',
          field: 'author',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày chuyển cửa hàng',
          field: 'changeDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Khách hàng sử dụng',
          field: 'customerUsed',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Đơn hàng sử dụng',
          field: 'orderUsed',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Cửa hàng sử dụng',
          field: 'storeOrdered',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày sử dụng',
          field: 'dateUsed',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Doanh số',
          field: 'sales',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'function',
          field: 'function',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
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
          price: this.$formatNumberToLocale(data.price),
          author: data.changeUser,
          changeDate: data.changeDate,
          customerUsed: data.customerCode,
          orderUsed: data.orderNumber,
          storeOrdered: data.orderShopCode,
          dateUsed: data.orderDate,
          sales: this.$formatNumberToLocale(data.orderAmount),
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
  },
  watch: {
    getReportVouchersUsed() {
      this.rows = [...this.getReportVouchersUsed]
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
