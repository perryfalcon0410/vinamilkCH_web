<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <list-search
      class="d-print-none"
      :per-page-size="paginationData.size"
      @onClickSearchButton="onClickSearchButton($event)"
      @updateSearchData="paginationData = {
        ...paginationData,
        ...$event }"
    />

    <div class="bg-white rounded shadow rounded my-1 d-print-none">
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Tồn kho sản phẩm
        </strong>
        <b-button-group>
          <b-button
            v-if="statusPrintButton().show"
            :disabled="statusPrintButton().disabled || rows.length === 0"
            class="shadow-brand-1 ml-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center"
            variant="someThing"
            @click="printReport"
          >
            <b-icon-printer-fill />
            In
          </b-button>
          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || rows.length === 0"
            class="shadow-brand-1 ml-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center"
            variant="someThing"
            @click="exportExcel"
          >
            <b-icon-file-earmark-x-fill />
            Xuất Excel
          </b-button>
        </b-button-group>
      </b-row>
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="rows"
          style-class="vgt-table report-customers table-horizontal-scroll"
          :style="cssProps"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          :total-rows="reportInventoryPagination.totalElements"
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
            <div
              v-else-if="props.column.label === 'Ngành hàng'"
              ref="first"
            >
              {{ props.column.label }}
            </div>
            <div
              v-else-if="props.column.label === 'Mã sản phẩm'"
              ref="second"
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
            <div v-if="props.column.field === 'feature'">
              <b-icon-pencil-fill
                class="cursor-pointer"
                @click="navigateToUpdate(props.row.id)"
              />
            </div>
            <div
              v-else-if="props.column.field ==='productName' ||
                props.column.field ==='specification' ||
                props.column.field ==='shop' ||
                props.column.field === 'productCategory'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field ==='totalAmount' ||
                props.column.field ==='stockQuantity' ||
                props.column.field ==='packetQuantity' ||
                props.column.field ==='unitQuantity' ||
                props.column.field ==='minInventory' ||
                props.column.field ==='maxInventory'"
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
              v-if="props.column.field === 'stockQuantity'"
              class="h7 mx-50 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(reportInventoryInfo.totalQuantity) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'packetQuantity'"
              class="h7 mx-50 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(reportInventoryInfo.totalPackageQuantity) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'unitQuantity'"
              class="h7 mx-50 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(reportInventoryInfo.totalUnitQuantity) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'totalAmount'"
              class="h7 mx-50 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(reportInventoryInfo.totalAmount) }}
            </b-row>
          </template>
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="reportInventoryPagination.totalElements"
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
                :total-rows="reportInventoryPagination.totalElements"
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
    </div>
    <print-form-report-inventory />
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import PrintFormReportInventory from '@core/components/print-form/PrintFormReportInventory.vue'
import ListSearch from './components/ListSearch.vue'
import {
  REPORT_WAREHOUSES_INVENTORY,

  REPORT_WAREHOUSES_INVENTORY_GETTER,
  REPORT_WAREHOUSES_INVENTORY_INFO_GETTER,
  REPORT_WAREHOUSES_INVENTORY_PAGINATION_GETTER,

  GET_REPORT_WAREHOUSES_INVENTORY_ACTION,
  EXPORT_REPORT_INVENTORIES_ACTION,
  PRINT_REPORT_INVENTORY_ACTION,
} from '../store-module/type'

export default {
  components: {
    ListSearch,
    PrintFormReportInventory,
  },
  data() {
    return {
      colWidth: {
        firstCol: 0,
        secondCol: 0,
      },

      pageNumber: 1,
      elementSize: commonData.perPageSizes[0],
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      stockDate: this.$nowDate,
      columns: [
        {
          label: 'Ngành hàng',
          field: 'productCategory',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-first',
          tdClass: 'scroll-column column-first',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-second',
          tdClass: 'scroll-column column-second',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-third',
          tdClass: 'scroll-column column-third',
        },
        {
          label: 'Số lượng',
          field: 'stockQuantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Số lượng packet',
          field: 'packetQuantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Số lượng lẻ',
          field: 'unitQuantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'totalAmount',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Quy cách',
          field: 'specification',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Cửa hàng',
          field: 'shop',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Chuỗi cửa hàng',
          field: 'shopType',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Nhóm sản phẩm',
          field: 'productGroup',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Tồn kho min',
          field: 'minInventory',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Tồn kho max',
          field: 'maxInventory',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Báo cáo',
          field: 'warning',
          sortable: false,
          thClass: 'text-nowrap',
        },
      ],
      rows: [],
      reportInventoryInfo: {},
      reportInventoryPagination: {},
    }
  },
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INVENTORY, [
      REPORT_WAREHOUSES_INVENTORY_GETTER,
      REPORT_WAREHOUSES_INVENTORY_INFO_GETTER,
      REPORT_WAREHOUSES_INVENTORY_PAGINATION_GETTER,
    ]),
    reportInventory() {
      return this.REPORT_WAREHOUSES_INVENTORY_GETTER.map(data => ({
        productCategory: data.productCategory,
        productCode: data.productCode,
        productName: data.productName,
        stockQuantity: this.$formatNumberToLocale(data.stockQuantity) || 0,
        packetQuantity: this.$formatNumberToLocale(data.packetQuantity) || 0,
        unitQuantity: this.$formatNumberToLocale(data.unitQuantity) || 0,
        price: this.$formatNumberToLocale(data.price),
        totalAmount: this.$formatNumberToLocale(data.totalAmount) || 0,
        specification: `${data.packetUnit} ${data.convfact} ${data.unit}`,
        shop: data.shop,
        shopType: data.shopType,
        productGroup: data.productGroup,
        minInventory: this.$formatNumberToLocale(data.minInventory),
        maxInventory: this.$formatNumberToLocale(data.maxInventory),
        warning: data.warning,
      }))
    },
    getReportInventoryInfo() {
      if (this.REPORT_WAREHOUSES_INVENTORY_INFO_GETTER) {
        return this.REPORT_WAREHOUSES_INVENTORY_INFO_GETTER
      }
      return {}
    },
    getReportInventoryPagination() {
      if (this.REPORT_WAREHOUSES_INVENTORY_PAGINATION_GETTER) {
        return this.REPORT_WAREHOUSES_INVENTORY_PAGINATION_GETTER
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.elementSize) - this.elementSize + 1
      const maxPageSize = (this.elementSize * this.pageNumber) > this.reportInventoryPagination.totalElements
        ? this.reportInventoryPagination.totalElements : (this.elementSize * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.reportInventoryPagination.totalElements} mục`
    },

    cssProps() {
      return {
        '--second-col': `${this.colWidth.firstCol + 30}px`,
        '--third-col': `${this.colWidth.firstCol + this.colWidth.secondCol + 30}px`,
      }
    },
  },
  watch: {
    reportInventory() {
      this.rows = [...this.reportInventory]
      this.$nextTick(() => {
        this.colWidth.firstCol = this.$refs.first.offsetParent.offsetWidth
        this.colWidth.secondCol = this.$refs.second.offsetParent.offsetWidth
      })
    },
    getReportInventoryInfo() {
      this.reportInventoryInfo = { ...this.getReportInventoryInfo }
    },
    getReportInventoryPagination() {
      this.reportInventoryPagination = { ...this.getReportInventoryPagination }
    },
  },
  methods: {
    exportExcel() {
      this.EXPORT_REPORT_INVENTORIES_ACTION({
        productCodes: this.paginationData.productCodes,
        stockDate: this.paginationData.stockDate,
        warehouseTypeId: this.paginationData.warehouseTypeId,
        ...this.decentralization,
      })
    },
    ...mapActions(REPORT_WAREHOUSES_INVENTORY, [
      GET_REPORT_WAREHOUSES_INVENTORY_ACTION,
      EXPORT_REPORT_INVENTORIES_ACTION,
      PRINT_REPORT_INVENTORY_ACTION,
    ]),

    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsWarehousesInventory', 'ReportsWarehousesInventoryExcel')
    },
    statusPrintButton() {
      return this.$permission('ReportsWarehousesInventory', 'ReportsWarehousesInventoryPrint')
    },

    // END - permission
    printReport() {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_REPORT_INVENTORY_ACTION({
        productCodes: this.paginationData.productCodes,
        stockDate: this.paginationData.stockDate,
        warehouseTypeId: this.paginationData.warehouseTypeId,
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },
    // pagnigation funcs
    onPaginationChange() {
      this.GET_REPORT_WAREHOUSES_INVENTORY_ACTION(this.paginationData)
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
  .report-customers.table-horizontal-scroll thead tr:last-child th:nth-child(2) {
    left: 30px;
    z-index: 1;
    position: sticky;
  }
  .report-customers.table-horizontal-scroll thead tr:last-child th:nth-child(3) {
    left: var(--second-col);
    z-index: 1;
  }
  .report-customers.table-horizontal-scroll thead tr:last-child th:nth-child(4) {
    left: var(--third-col);
    z-index: 1;
  }
  /* scroll ô filter tùy chỉnh theo số lượng ô*/
  /* tùy chỉnh left khi scroll*/
  .report-customers.table-horizontal-scroll .column-first {
    left: 30px;
  }
  .report-customers.table-horizontal-scroll .column-second {
    left: var(--second-col);
  }
  .report-customers.table-horizontal-scroll .column-third {
    left: var(--third-col);
  }
  /* tùy chỉnh left khi scroll*/
</style>
