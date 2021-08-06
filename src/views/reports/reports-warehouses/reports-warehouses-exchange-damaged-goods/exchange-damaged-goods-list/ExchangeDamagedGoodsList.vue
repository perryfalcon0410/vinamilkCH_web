<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <!-- START - Search -->
    <list-search
      :per-page-size="paginationData.size"
      @updateSearchData="updateSearchData"
      @onClickSearchButton="onClickSearchButton($event)"
    />
    <!-- END - Search -->

    <!-- START - List -->
    <div class="bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách biên bản đổi hàng hỏng
        </strong>
        <b-button-group>
          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || reportInventory.length === 0"
            class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder"
            variant="someThing"
            size="sm"
            @click="exportExcel"
          >
            <b-icon-file-earmark-x-fill />
            Xuất Excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="rows"
          style-class="vgt-table report table-horizontal-scroll"
          :style="cssProps"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          :total-rows="reportExchangePagnigation.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
          }"
          compact-mode
          line-numbers
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

          <!-- START - Columns -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.label === 'Chức năng'">
              <b-icon-bricks />
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
                class="cursor-pointer"
                @click="navigateToUpdate(props.row.id)"
              />
            </div>
            <div
              v-else-if="props.column.field === 'customerName' ||
                props.column.field === 'address' ||
                props.column.field === 'productName' ||
                props.column.field === 'reason'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'amount' || props.column.field === 'quantity'"
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
              v-if="props.column.field === 'quantity'"
              class="mx-50 text-brand-3 h7"
              align-h="end"
            >
              {{ $formatNumberToLocale(total[7]) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'amount'"
              class="mx-50 text-brand-3 h7"
              align-h="end"
            >
              {{ $formatNumberToLocale(total[8]) }}
            </b-row>
          </template>
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'transNumber'"
              ref="transNumber"
            >
              {{ props.column.label }}
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="reportExchangePagnigation.totalElements"
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
                <span
                  class="text-nowrap"
                >
                  {{ paginationDetailContent }}
                </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="reportExchangePagnigation.totalElements"
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
          <!-- START - Column filter -->
        </vue-good-table>
      </b-col>
    <!-- END - Table -->
    </div>
    <!-- END - List -->

  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import { formatISOtoVNI } from '@/@core/utils/filter'
import ListSearch from './components/ListSearch.vue'
import {
  REPORT_EXCHANGE_DAMAGED_GOODS,
  // GETTERS
  REPORT_EXCHANGE_DAMAGED_GOODS_GETTER,
  // ACTIONS
  GET_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION,
  EXPORT_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION,
} from '../store-module/type'

export default {
  components: {
    ListSearch,
  },
  data() {
    return {
      pageNumber: 1,
      elementSize: commonData.perPageSizes[0],
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },
      formId: 1,
      ctrlId: 1,
      searchData: {},
      columns: [
        {
          label: 'Ngày biên bản',
          field: 'transDate',
          width: '120px',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-first',
          tdClass: 'scroll-column column-first',
        },
        {
          label: 'Số biên bản',
          field: 'transNumber',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-second',
          tdClass: 'scroll-column column-second',
        },
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          width: '135px',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-third',
          tdClass: 'scroll-column column-third',
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-fourth',
          tdClass: 'scroll-column column-fourth',
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-nowrap',

        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'amount',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Lý do',
          field: 'reason',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Điện thoại',
          field: 'phoneNumber',
          sortable: false,
          thClass: 'text-nowrap',
        },
      ],
      rows: [],
      total: [],
      reportExchangePagnigation: {},
      transNumberCol: 0,
    }
  },
  computed: {
    ...mapGetters(REPORT_EXCHANGE_DAMAGED_GOODS, [
      REPORT_EXCHANGE_DAMAGED_GOODS_GETTER,
    ]),
    reportInventory() {
      if (this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.response) {
        return this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.response.content.map(data => ({
          transDate: formatISOtoVNI(data[0]),
          transNumber: data[1],
          customerCode: data[2],
          customerName: data[3],
          address: data[4],
          productCode: data[5],
          productName: data[6],
          quantity: this.$formatNumberToLocale(data[7]),
          amount: this.$formatNumberToLocale(data[8]),
          reason: data[9],
          phoneNumber: data[10],
        }))
      }
      return []
    },
    getTotal() {
      if (this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.totals) {
        return this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.totals
      }
      return []
    },
    getReportExchangePagnigation() {
      if (this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.response) {
        return this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.elementSize) - this.elementSize + 1
      const maxPageSize = (this.elementSize * this.pageNumber) > this.reportExchangePagnigation.totalElements
        ? this.reportExchangePagnigation.totalElements : (this.elementSize * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.reportExchangePagnigation.totalElements} mục`
    },
    cssProps() {
      return {
        '--third-col': `${this.transNumberCol + 145}px`,
        '--fourth-col': `${this.transNumberCol + 270}px`,
      }
    },
  },
  watch: {
    reportInventory() {
      this.rows = [...this.reportInventory]
      this.$nextTick(() => {
        this.transNumberCol = this.$refs.transNumber.offsetParent.offsetWidth
      })
    },
    getTotal() {
      this.total = [...this.getTotal]
    },
    getReportExchangePagnigation() {
      this.reportExchangePagnigation = { ...this.getReportExchangePagnigation }
    },
  },
  methods: {
    exportExcel() {
      this.EXPORT_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION(this.searchData)
    },
    ...mapActions(REPORT_EXCHANGE_DAMAGED_GOODS, [
      GET_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION,
      EXPORT_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION,
    ]),

    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsWarehousesExchangeDamagedGoods', 'ReportsWarehousesExchangeDamagedGoodsExcel')
    },

    // END - permission
    // pagnigation funcs
    updateSearchData(event) {
      this.paginationData = {
        ...this.paginationData,
        ...event,
      }
      this.searchData = { ...event }
    },
    onPaginationChange() {
      this.GET_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION(this.paginationData)
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
      this.paginationData.size = params.currentPerPage
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
    // pagnigation funcs
  },
}
</script>
<style>
  /* scroll ô filter tùy chỉnh theo số lượng ô*/
  .report.table-horizontal-scroll thead tr:last-child th:nth-child(2) {
    left: 35px;
    z-index: 1;
  }
  .report.table-horizontal-scroll thead tr:last-child th:nth-child(3) {
    left: 140px;
    z-index: 1;
  }
  .report.table-horizontal-scroll thead tr:last-child th:nth-child(4) {
    left: var(--third-col);
    z-index: 1;
  }
  .report.table-horizontal-scroll thead tr:last-child th:nth-child(5) {
    left: var(--fourth-col);
    z-index: 1;
  }
  /* scroll ô filter tùy chỉnh theo số lượng ô*/

  /* tùy chỉnh left khi scroll*/
  .report.table-horizontal-scroll .column-first {
    left: 33px;
  }
  .report.table-horizontal-scroll .column-second {
    left: 150px;
  }
  .report.table-horizontal-scroll .column-third {
    left: var(--third-col);
  }
  .report.table-horizontal-scroll .column-fourth {
    left: var(--fourth-col);
  }
  /* tùy chỉnh left khi scroll*/
</style>
