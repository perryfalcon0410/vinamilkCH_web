<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-customers-list-search
      :per-page-size="paginationData.size"
      @updateSearchData="updateSearchData"
      @onClickSearchButton="onClickSearchButton"
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
          Danh sách khách hàng
        </strong>
        <b-button-group>
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
          style-class="vgt-table report-customers table-horizontal-scroll"
          :style="cssProps"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="reportCustomersPagination.totalElements"
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
            <div
              v-if="props.column.label === 'Họ tên'"
              ref="fullName"
            >
              {{ props.column.label }}
            </div>
            <div
              v-else-if="props.column.label === 'Điện thoại'"
              ref="mobiPhone"
            >
              {{ props.column.label }}
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
            <div
              v-if="props.column.field === 'fullName' || props.column.field === 'address'"
              class="line-overflow name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'saleAmount'"
              class="text-right pr-70 text-nowrap"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else
              style="width: max-content"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <span
              v-if="props.column.field === 'saleAmount'"
              class="mx-50 text-brand-3 h7"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.totalSaleAmount) }}
            </span>
          </template>
          <!-- END - Column filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="reportCustomersPagination.totalElements"
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
                :total-rows="reportCustomersPagination.totalElements"
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
import ReportsCustomersListSearch from './components/ReportsCustomersListSearch.vue'
import {
  REPORT_CUSTOMERS,
  // Getters
  REPORT_CUSTOMERS_GETTER,
  // Actions
  GET_REPORT_CUSTOMERS_ACTION,
  EXPORT_REPORT_CUSTOMERS_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsCustomersListSearch,
  },
  data() {
    return {
      thirdColLeftAttr: 310,
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },
      searchOptions: {},
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      reportReturnRows: [],

      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-first',
          tdClass: 'scroll-column column-first',
        },
        {
          label: 'Họ tên',
          field: 'fullName',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-second',
          tdClass: 'scroll-column column-second',
        },
        {
          label: 'Điện thoại',
          field: 'mobiPhone',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-third',
          tdClass: 'scroll-column column-third',
        },
        {
          label: 'Ngày sinh',
          field: 'birthDay',
          sortable: false,
          thClass: 'text-nowrap',
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Giới tính',
          field: 'gender',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Trạng thái',
          field: 'status',
          sortable: false,
          thClass: 'text-nowrap',
        },

        {
          label: 'Nhóm',
          field: 'cusTypeName',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Ngày tạo',
          field: 'createdAt',
          sortable: false,
          thClass: 'text-nowrap',
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Ngày mua hàng cuối',
          field: 'lastOrderDate',
          sortable: false,
          thClass: 'text-nowrap',
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Doanh số',
          field: 'saleAmount',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-nowrap',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(REPORT_CUSTOMERS, [
      REPORT_CUSTOMERS_GETTER,
    ]),
    getReportCustomerLists() {
      if (this.REPORT_CUSTOMERS_GETTER.response) {
        return this.REPORT_CUSTOMERS_GETTER.response.content.map(data => ({
          customerCode: data.customerCode,
          fullName: data.fullName,
          mobiPhone: data.mobiPhone,
          birthDay: data.birthDay,
          gender: data.gender,
          address: data.address,
          status: data.status,
          cusTypeName: data.cusTypeName,
          createdAt: data.createdAt,
          lastOrderDate: data.lastOrderDate,
          saleAmount: data.saleAmount,
        }))
      }
      return []
    },
    totalInfo() {
      if (this.REPORT_CUSTOMERS_GETTER.info) {
        return this.REPORT_CUSTOMERS_GETTER.info
      }
      return {}
    },

    reportCustomersPagination() {
      if (this.REPORT_CUSTOMERS_GETTER.response) {
        return this.REPORT_CUSTOMERS_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.reportCustomersPagination.totalElements
        ? this.reportCustomersPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.reportCustomersPagination.totalElements} mục`
    },
    cssProps() {
      return {
        '--left': this.thirdColLeftAttr,
      }
    },
  },
  watch: {
    getReportCustomerLists() {
      this.reportReturnRows = [...this.getReportCustomerLists]
      this.$nextTick(() => {
        this.thirdColLeftAttr = `${this.$refs.fullName.offsetParent.offsetWidth + this.$refs.mobiPhone.offsetParent.offsetWidth + 55}px`
      })
    },
  },

  mounted() {
    resizeAbleTable()
  },
  methods: {
    ...mapActions(REPORT_CUSTOMERS, [
      GET_REPORT_CUSTOMERS_ACTION,
      EXPORT_REPORT_CUSTOMERS_ACTION,
    ]),

    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsCustomersTrade', 'ReportsCustomersTradeExcel')
    },

    // END - permission
    // Start - xuat excel
    onClickExcelExportButton() {
      this.EXPORT_REPORT_CUSTOMERS_ACTION({ ...this.searchOptions })
    },
    // End - xuat excel

    // Start - pagination
    updateSearchData(event) {
      this.searchOptions = { ...event }
      this.paginationData = {
        ...this.paginationData,
        ...event,
      }
    },
    onPaginationChange() {
      this.GET_REPORT_CUSTOMERS_ACTION({ ...this.paginationData, ...this.decentralization })
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
    onClickSearchButton() {
      this.pageNumber = 1 // hard code
    },
  },
}
</script>
<style scoped>
.line-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<style>
  /* scroll ô filter tùy chỉnh theo số lượng ô*/
  .report-customers.table-horizontal-scroll thead tr:last-child th:nth-child(2) {
    left: 30px;
    z-index: 1;
  }
  .report-customers.table-horizontal-scroll thead tr:last-child th:nth-child(3) {
    left: 155px;
    z-index: 1;
  }
  .report-customers.table-horizontal-scroll thead tr:last-child th:nth-child(4) {
    left: var(--left);
    z-index: 1;
  }
  /* scroll ô filter tùy chỉnh theo số lượng ô*/
  /* tùy chỉnh left khi scroll*/
  .report-customers.table-horizontal-scroll .column-first {
    left: 30px;
  }
  .report-customers.table-horizontal-scroll .column-second {
    left: 155px;
  }
  .report-customers.table-horizontal-scroll .column-third {
    left: var(--left);
  }
  /* tùy chỉnh left khi scroll*/
</style>
