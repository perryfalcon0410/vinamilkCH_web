<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >

    <!-- START - Search -->
    <reports-customers-non-transactional-list-search
      class="d-print-none"
      @updateSearchData="updateSearchData"
    />
    <!-- END - Search -->

    <div class="bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách khách hàng không giao dịch
        </strong>
        <b-button-group>
          <b-button
            v-if="statusPrintButton().show"
            :disabled="statusPrintButton().disabled || customerNonTransRows.length === 0"
            class="btn-brand-1 h8 align-items-button-center rounded ml-1"
            variant="someThing"
            @click="onClickPrintButton"
          >
            <b-icon-file-earmark-x-fill class="mr-05" />
            In
          </b-button>
          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || customerNonTransRows.length === 0"
            class="btn-brand-1 h8 align-items-button-center rounded ml-1"
            variant="someThing"
            @click="onClickExcelExportButton"
          >
            <b-icon-file-earmark-x-fill class="mr-05" />
            Xuất excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1 d-print-none">
        <vue-good-table
          :columns="columns"
          mode="remote"
          :rows="customerNonTransRows"
          style-class="vgt-table"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="customerNonTransPagination.totalElements"
          :sort-options="{
            enabled: false,
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
              v-if="props.column.field ==='address'"
              class="name-width word-wrap"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="customerNonTransPagination.totalElements"
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
                  :options="perPageSizeOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="customerNonTransPagination.totalElements"
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

    <!-- STAT - Print form -->
    <print-form-report-customer-no-order />
    <!-- END - Print form -->
  </b-container>
</template>
<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import commonData from '@/@db/common'
import {
  earlyMonth,
  nowDate,
  preventDefaultWindowPrint,
} from '@/@core/utils/filter'
import {
  resizeAbleTable,
} from '@core/utils/utils'

import PrintFormReportCustomerNoOrder from '@core/components/print-form/PrintFormReportCustomerNoOrder.vue'
import ReportsCustomersNonTransactionalListSearch from './components/ReportsCustomersNonTransactionalListSearch.vue'
import {
  REPORT_CUSTOMERS_NON_TRANSACTIONAL,

  // Getters
  REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER,

  // Actions
  GET_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION,
  EXPORT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION,
  PRINT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsCustomersNonTransactionalListSearch,
    PrintFormReportCustomerNoOrder,
  },
  data() {
    return {
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: 1,
      elementSize: commonData.perPageSizes[0],
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },
      searchData: {
        fromDate: earlyMonth(),
        toDate: nowDate(),
      },
      customerNonTransRows: [],
      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          sortable: false,
        },
        {
          label: 'Điện thoại',
          field: 'phoneNumber',
          sortable: false,
        },
        {
          label: 'Ngày sinh',
          field: 'dateOfBirth',
          sortable: false,
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Giới tính',
          field: 'gender',
          sortable: false,
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
        },
      ],
      customerNonTransPagination: {},
    }
  },

  computed: {
    ...mapGetters(REPORT_CUSTOMERS_NON_TRANSACTIONAL, [
      REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER,
    ]),
    getCustomerNonTrans() {
      if (this.REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER.content) {
        return this.REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER.content.map(data => ({
          customerCode: data.customerCode,
          customerName: data.customerName,
          phoneNumber: data.phone,
          dateOfBirth: data.birthDay,
          gender: data.gender,
          address: data.address,
        }))
      }
      return []
    },
    getCustomerNonTransPagination() {
      if (this.REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER) {
        return this.REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.elementSize) - this.elementSize + 1
      const maxPageSize = (this.elementSize * this.pageNumber) > this.customerNonTransPagination.totalElements
        ? this.customerNonTransPagination.totalElements : (this.elementSize * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.customerNonTransPagination.totalElements} mục`
    },
  },
  watch: {
    getCustomerNonTrans() {
      this.customerNonTransRows = [...this.getCustomerNonTrans]
    },
    getCustomerNonTransPagination() {
      this.customerNonTransPagination = { ...this.getCustomerNonTransPagination }
    },
  },
  mounted() {
    resizeAbleTable()
    document.addEventListener('keydown', this.handleWindowPrintHotKey, false)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleWindowPrintHotKey)
  },

  methods: {
    ...mapActions(REPORT_CUSTOMERS_NON_TRANSACTIONAL, [
      EXPORT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION,
      GET_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION,
      PRINT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION,
    ]),
    handleWindowPrintHotKey(event) {
      const resolve = preventDefaultWindowPrint(event)
      if (resolve) {
        this.onClickPrintButton()
      }
    },
    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsCustomersNonTransactional', 'ReportsCustomersNonTransactionalExcel')
    },
    statusPrintButton() {
      return this.$permission('ReportsCustomersNonTransactional', 'ReportsCustomersNonTransactionalPrint')
    },

    // END - permission
    // Start - pagination
    onPaginationChange() {
      this.GET_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION(this.paginationData)
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },

    onPerPageChange(params) {
      this.updatePaginationData({ page: 0, size: params.currentPerPage })
      this.onPaginationChange()
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    updateSearchData(event) {
      this.pageNumber = 1
      this.searchData = event
      this.updatePaginationData({
        ...event,
      })
    },
    // Start - xuat excel
    onClickExcelExportButton() {
      this.EXPORT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION({ ...this.decentralization, ...this.searchData })
    },
    onClickPrintButton() {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_REPORTS_CUSTOMERS_NON_TRANSACTIONAL_ACTION({
        fromDate: this.searchData.fromDate,
        toDate: this.searchData.toDate,
        formId: this.searchData.formId,
        ctrlId: this.searchData.ctrlId,
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },
  },
}
</script>
