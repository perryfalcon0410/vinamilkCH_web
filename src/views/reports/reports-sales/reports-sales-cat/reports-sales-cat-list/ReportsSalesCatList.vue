<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-sales-cat-list-search
      class="d-print-none"
      :per-page-size="paginationData.size"
      @updateSearchData="updateSearchData"
      @onClickSearchButton="onClickSearchButton($event)"
    />
    <!-- END - Search -->

    <!-- START - sale receipt list -->
    <div class="v-search bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Doanh số CAT
        </strong>
        <b-button-group>
          <b-button
            v-if="statusPrintButton().show"
            :disabled="statusPrintButton().disabled || reportSalesCatList.length === 0"
            class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center"
            variant="someThing"
            @click="printReport"
          >
            <b-icon-printer-fill />
            In
          </b-button>
          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || reportSalesCatList.length === 0"
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
          :rows="reportSalesCatList"
          mode="remote"
          style-class="vgt-table striped"
          compact-mode
          line-numbers
          :sort-options="{
            enabled: false,
            multipleColumns: true,
          }"
          :total-rows="reportSalesCatPagination.totalElements"
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
            <b-row
              v-if="props.column.field === 'frequency'"
              class="h7 text-brand-3 mx-50"
              align-h="end"
            >
              {{ $formatNumberToLocale(getTotalInfo[3]) }}
            </b-row>
            <b-col
              v-for="(item,index) in labelName"
              :key="index"
            >
              <b-row
                v-if="props.column.field === `${item.field}`"
                class="h7 text-brand-3 pr-50"
                align-h="end"
              >
                {{ $formatNumberToLocale(totalQuantity[index]) }}
              </b-row>
            </b-col>
            <b-row
              v-if="props.column.field === 'sumTotal'"
              class="h7 text-brand-3 mx-50"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalQuantity[totalQuantity.length-1]) }}
            </b-row>
          </template>
          <!-- END - Column filter -->

          <!-- START - Row filter -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'sumTotal' || props.column.field === 'frequency'"
              class="pr-70"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'customerName'"
              class="name-width word-wrap"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'address'"
              class="name-width word-wrap"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="reportSalesCatPagination.totalElements"
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
                :total-rows="reportSalesCatPagination.totalElements"
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
    </div>
    <!-- END - sale receipt list -->

    <!-- STAT - Print form -->
    <print-form-sales-report-by-cat />
    <!-- END - Print form -->
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
import {
  preventDefaultWindowPrint,
} from '@core/utils/filter'
import PrintFormSalesReportByCat from '@core/components/print-form/PrintFormSalesReportByCat.vue'
import ReportsSalesCatListSearch from './components/ReportsSalesCatListSearch.vue'
import {
  REPORT_SALES_CAT,
  // Getters
  REPORT_SALES_CAT_GETTER,
  // Actions
  GET_REPORT_SALES_CAT_ACTION,
  EXPORT_REPORT_SALES_CAT_ACTION,
  PRINT_REPORT_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsSalesCatListSearch,
    PrintFormSalesReportByCat,
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
      reportSalesCatList: [],
      initalCol: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Họ tên',
          field: 'customerName',
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
          label: 'Tần suất',
          field: 'frequency',
          sortable: false,
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
      ],
      lastCol: {
        label: 'Tổng cộng',
        field: 'sumTotal',
        sortable: false,
        type: 'number',
        thClass: 'text-nowrap',
        formatFn: this.$formatNumberToLocale,
      },
    }
  },
  computed: {
    ...mapGetters(REPORT_SALES_CAT, [
      REPORT_SALES_CAT_GETTER,
    ]),
    reportSalesCatPagination() {
      if (this.REPORT_SALES_CAT_GETTER && this.REPORT_SALES_CAT_GETTER.response) {
        return this.REPORT_SALES_CAT_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.reportSalesCatPagination.totalElements
        ? this.reportSalesCatPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.reportSalesCatPagination.totalElements} mục`
    },
    getReportSalesCatCatories() {
      if (this.REPORT_SALES_CAT_GETTER && this.REPORT_SALES_CAT_GETTER.category) {
        return this.REPORT_SALES_CAT_GETTER.category
      }
      return {}
    },
    getReportSalesCat() {
      if (this.REPORT_SALES_CAT_GETTER.response) {
        return this.REPORT_SALES_CAT_GETTER.response.content.map(data => ({
          customerCode: data[0],
          customerName: data[1],
          address: data[2],
          frequency: data[3],
        }))
      }
      return []
    },
    getReportSalesCatPrices() {
      if (this.REPORT_SALES_CAT_GETTER.response) {
        return this.REPORT_SALES_CAT_GETTER.response.content
      }
      return []
    },
    getTotalInfo() {
      if (this.REPORT_SALES_CAT_GETTER.totals) {
        return this.REPORT_SALES_CAT_GETTER.totals
      }
      return {}
    },
  },
  watch: {
    // add columns dynamically
    getReportSalesCatCatories() {
      this.labelName = []
      this.columns = [...this.initalCol]
      if (this.getReportSalesCatCatories.length > 0) {
        this.getReportSalesCatCatories.forEach((item, index) => {
          const obj = {
            index,
            label: item,
            field: `${index + 4}`,
            sortable: false,
            type: 'number',
            filterOptions: {
              enabled: true,
            },
            thClass: 'text-nowrap',
            tdClass: 'px-2',
            formatFn: this.$formatNumberToLocale,
          }
          this.labelName.push(obj)
          this.columns.push(obj)
        })
        this.columns.push(this.lastCol)
      }
    },
    getReportSalesCat() {
      this.reportSalesCatList = [...this.getReportSalesCat]
    },
    getTotalInfo() {
      this.totalQuantity = []
      if (this.getTotalInfo.length > 0) {
        this.getTotalInfo.forEach((item, index) => {
          if (index > 3) {
            this.totalQuantity.push(item)
          }
        })
      }
    },
    getReportSalesCatPrices() {
      for (let i = 0; i <= this.reportSalesCatList.length - 1; i += 1) {
        for (let j = 3; j <= this.getReportSalesCatPrices[i].length - 1; j += 1) {
          if (j < this.getReportSalesCatPrices[i].length - 1) {
            this.reportSalesCatList[i][j] = this.getReportSalesCatPrices[i][j]
          } else {
            this.reportSalesCatList[i].sumTotal = this.getReportSalesCatPrices[i][j]
          }
        }
      }
    },
  },
  mounted() {
    this.columns = [...this.initalCol]
    resizeAbleTable()
    document.addEventListener('keydown', this.handleWindowPrintHotKey, false)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleWindowPrintHotKey)
  },
  methods: {
    ...mapActions(REPORT_SALES_CAT, [
      GET_REPORT_SALES_CAT_ACTION,
      EXPORT_REPORT_SALES_CAT_ACTION,
      PRINT_REPORT_ACTION,
    ]),
    handleWindowPrintHotKey(event) {
      const resolve = preventDefaultWindowPrint(event)
      if (resolve) {
        this.printReport()
      }
    },
    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsSalesCatSale', 'ReportsSalesAmountCATExcel')
    },
    statusPrintButton() {
      return this.$permission('ReportsSalesCatSale', 'ReportsSalesAmountCATPrint')
    },

    // END - permission
    onClickExcelExportButton() {
      this.EXPORT_REPORT_SALES_CAT_ACTION({
        ...this.searchData,
        ...this.decentralization,
      })
    },

    // printReport
    printReport() {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_REPORT_ACTION({
        ...this.searchData,
        ...this.decentralization,
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
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
      this.GET_REPORT_SALES_CAT_ACTION(this.paginationData)
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
