<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >

    <!-- START - Search -->
    <reports-warehouses-adjustment-list-search
      @updateSearchData="updateSearchData"
    />
    <!-- END - Search -->

    <div class="bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách phiếu nhập xuất kho
        </strong>
        <b-button-group>
          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || promotionRows.length === 0"
            class="btn-brand-1 h8 align-items-button-center rounded ml-1"
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
          mode="remote"
          :columns="columns"
          :rows="promotionRows"
          style-class="vgt-table table-horizontal-scroll"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="adjustmentPagination.totalElements"
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
              v-if="props.column.field === 'productName'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->

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
              v-else-if="props.column.field === 'payment'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.totalPrice) }}
            </b-row>
          </template>
          <!-- START - Column filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="adjustmentPagination.totalElements"
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
                :total-rows="adjustmentPagination.totalElements"
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
  </b-container>
</template>
<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import commonData from '@/@db/common'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import ReportsWarehousesAdjustmentListSearch from './components/ReportsWarehousesAdjustmentListSearch.vue'
import {
  REPORT_WAREHOUSES_ADJUSTMENTS,
  REPORT_WAREHOUSES_ADJUSTMENTS_GETTER,
  GET_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION,
  EXPORT_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsWarehousesAdjustmentListSearch,
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
      promotionDatas: [],
      searchData: {},
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      promotionRows: [],
      adjustmentPagination: {},
      totalInfo: {},

      columns: [
        {
          label: 'Mã cửa hàng',
          field: 'shopCode',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-first',
          tdClass: 'scroll-column column-first',
        },
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-second',
          tdClass: 'scroll-column column-second',
        },
        {
          label: 'Ngày hóa đơn',
          field: 'adjustmentDate',
          formatFn: value => this.$formatISOtoVNI(value),
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Loại hóa đơn',
          field: 'adjustmentType',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Ngành hàng',
          field: 'productInfoName',
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
          label: 'ĐVT',
          field: 'dvt',
          sortable: false,
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
          tdClass: 'pr-2',
        },
        {
          label: 'Đơn giá',
          field: 'price',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          thClass: 'text-nowrap',
          tdClass: 'pr-2',
        },
        {
          label: 'Thanh toán',
          field: 'payment',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          thClass: 'text-nowrap',
          tdClass: 'pr-2',
        },

        {
          label: 'chức năng',
          field: 'feature',
          hidden: 'true',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
    }
  },

  computed: {
    ...mapGetters(REPORT_WAREHOUSES_ADJUSTMENTS, [
      REPORT_WAREHOUSES_ADJUSTMENTS_GETTER,
    ]),
    getAdjustmentLists() {
      if (this.REPORT_WAREHOUSES_ADJUSTMENTS_GETTER.response && this.REPORT_WAREHOUSES_ADJUSTMENTS_GETTER.response.content) {
        return this.REPORT_WAREHOUSES_ADJUSTMENTS_GETTER.response.content.map(data => ({
          shopCode: data.shopCode,
          redInvoiceNo: data.redInvoiceNo,
          adjustmentType: data.typess,
          productInfoName: data.productInfoName,
          productCode: data.productCode,
          productName: data.productName,
          dvt: data.uom1,
          quantity: data.quantity,
          price: data.price,
          payment: data.total,
          adjustmentDate: data.adjustmentDate,
        }))
      }
      return []
    },
    getTotalInfo() {
      if (this.REPORT_WAREHOUSES_ADJUSTMENTS_GETTER.info) {
        return this.REPORT_WAREHOUSES_ADJUSTMENTS_GETTER.info
      }
      return {}
    },
    getAdjustmentPagination() {
      if (this.REPORT_WAREHOUSES_ADJUSTMENTS_GETTER.response) {
        return this.REPORT_WAREHOUSES_ADJUSTMENTS_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.adjustmentPagination.totalElements
        ? this.adjustmentPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.adjustmentPagination.totalElements} mục`
    },

  },
  watch: {
    getAdjustmentLists() {
      this.promotionRows = [...this.getAdjustmentLists]
    },
    getTotalInfo() {
      this.totalInfo = { ...this.getTotalInfo }
    },
    getAdjustmentPagination() {
      this.adjustmentPagination = { ...this.getAdjustmentPagination }
    },
  },
  mounted() {
    resizeAbleTable()
  },

  methods: {
    ...mapActions(REPORT_WAREHOUSES_ADJUSTMENTS, [
      GET_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION,
      EXPORT_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION,
    ]),

    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsWarehousesAdjustment', 'ReportsWarehousesAdjustmentExcel')
    },

    // END - permission

    onClickExcelExportButton() {
      this.EXPORT_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION({ ...this.decentralization, ...this.searchData })
    },

    // Start - pagination
    onPaginationChange() {
      this.GET_REPORT_WAREHOUSES_ADJUSTMENTS_ACTION(this.paginationData)
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
      this.searchData = event
      this.updatePaginationData({
        ...event,
        page: 0,
      })
      this.onPaginationChange()
    },
    // End - pagination
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
    left: 140px;
    z-index: 1;
  }
  /* scroll ô filter tùy chỉnh theo số lượng ô*/

  /* tùy chỉnh left khi scroll*/
  .table-horizontal-scroll .column-first {
    left: 35px;
  }
  .table-horizontal-scroll .column-second {
    left: 140px;
  }
  /* tùy chỉnh left khi scroll*/
</style>
