<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-warehouses-input-output-inventory-list-search
      class="d-print-none"
      @updateSearchData="updateSearchData"
    />
    <!-- END - Search -->

    <!-- START - Report Output list -->
    <div class="bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Xuất nhập tồn
        </strong>
        <b-button-group>
          <b-button
            v-if="statusPrintButton().show"
            :disabled="statusPrintButton().disabled || warehousesInputOutputInventory.length === 0"
            class="rounded btn-brand-1 h8"
            variant="someThing"
            @click="printReport"
          >
            <b-icon-printer-fill class="mr-50" />
            In
          </b-button>
          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || warehousesInputOutputInventory.length === 0"
            class="ml-1 rounded btn-brand-1 h8"
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
      <b-col
        class="py-1 d-print-none"
      >
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="warehousesInputOutputInventory"
          style-class="vgt-table report table-horizontal-scroll"
          :style="cssProps"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="warehousesInputOutputInventoryPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
            initialSortBy: [{field: 'transDate', type: 'desc'}]
          }"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
        >
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-if="props.column.field === 'beginningQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.beginningQty) }}
            </div>

            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'beginningAmount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.beginningAmount) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'impTotalQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.impTotalQty) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'impQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.impQty) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'impAmount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.impAmount) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'impAdjustmentQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.impAdjustmentQty) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'impAdjustmentAmount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.impAdjustmentAmount) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'expTotalQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.expTotalQty) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'expSalesQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.expSalesQty) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'expSalesAmount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.expSalesAmount) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'expPromotionQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.expPromotionQty) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'expPromotionAmount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.expPromotionAmount) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'expAdjustmentQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.expAdjustmentQty) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'expAdjustmentAmount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.expAdjustmentAmount) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'expExchangeQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.expExchangeQty) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'expExchangeAmount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.expExchangeAmount) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'endingQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.endingQty) }}
            </div>
            <div
              v-show="warehousesInputOutputInventoryPagination.totalElements"
              v-else-if="props.column.field === 'endingAmount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.endingAmount) }}
            </div>
          </template>
          <!-- START - Column filter -->
          <!-- START - Custom row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'beginningQuantity' || props.column.field === 'beginningAmount' || props.column.field === 'impTotalQuantity' || props.column.field === 'impQuantity'
                || props.column.field === 'impAmount' || props.column.field === 'impAdjustmentQuantity' || props.column.field === 'impAdjustmentAmount' || props.column.field === 'expTotalQuantity'
                || props.column.field === 'expSalesQuantity' || props.column.field === 'expSalesAmount' || props.column.field === 'expPromotionQuantity' || props.column.field === 'expPromotionAmount'
                || props.column.field === 'expAdjustmentQuantity' || props.column.field === 'expAdjustmentAmount' || props.column.field === 'expExchangeQuantity' || props.column.field === 'expExchangeAmount'
                || props.column.field === 'endingQuantity' || props.column.field === 'endingAmount'"
              style="padding-right: 4px"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'productName' || props.column.field === 'industry'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Custom row -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'industry'"
              ref="first"
            >
              {{ props.column.label }}
            </div>
            <div
              v-else-if="props.column.field === 'productCode'"
              ref="second"
            >
              {{ props.column.label }}
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="warehousesInputOutputInventoryPagination.totalElements"
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
                >{{ pageNumber === 1 ? 1 : (pageNumber * elementSize) - elementSize +1 }}
                  -
                  {{ (elementSize * pageNumber) > warehousesInputOutputInventoryPagination.totalElements ?
                    warehousesInputOutputInventoryPagination.totalElements : (elementSize * pageNumber) }}
                  của {{ warehousesInputOutputInventoryPagination.totalElements }} mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="warehousesInputOutputInventoryPagination.totalElements"
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
    <!-- END - Report Output list -->
    <print-form-input-output-inventory />
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  preventDefaultWindowPrint,
  hostName,
  checkIpClient,
} from '@core/utils/filter'
import PrintFormInputOutputInventory from '@core/components/print-form/PrintFormInputOutputInventory.vue'
import ReportsWarehousesInputOutputInventoryListSearch from './components/ReportsWarehousesInputOutputInventoryListSearch.vue'
import {
  REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY,
  // GETTERS
  REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_GETTER,
  PRINT_INPUT_OUTPUT_INVENTORY_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION,
  EXPORT_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION,
  PRINT_INPUT_OUTPUT_INVENTORY_ACTION,
} from '../store-module/type'
import {
  PRINTERCONFIG,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../../auth/printer-configuration-modal/store-module/type'

export default {
  components: {
    ReportsWarehousesInputOutputInventoryListSearch,
    PrintFormInputOutputInventory,
  },

  data() {
    return {
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },
      searchOptions: {
        productCodes: null,
        fromDate: null,
        toDate: null,
      },
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      columns: [
        {
          label: 'Ngành hàng',
          field: 'industry',
          thClass: 'text-nowrap scroll-column-header column-first',
          tdClass: 'scroll-column column-first',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          thClass: 'text-nowrap scroll-column-header column-second',
          tdClass: 'scroll-column column-second',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          thClass: 'text-nowrap scroll-column-header column-third',
          tdClass: 'scroll-column column-third',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          thClass: 'text-nowrap',
        },
        {
          label: 'Tồn đầu kỳ',
          field: 'beginningQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá đầu kỳ',
          field: 'beginningPrice',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Thành tiền đầu kỳ',
          field: 'beginningAmount',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tổng nhập trong kỳ',
          field: 'impTotalQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Nhập mua hàng',
          field: 'impQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá trị nhập mua hàng',
          field: 'impAmount',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Nhập điều chỉnh',
          field: 'impAdjustmentQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá trị nhập điều chỉnh',
          field: 'impAdjustmentAmount',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tổng xuất trong kỳ',
          field: 'expTotalQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Xuất bán hàng',
          field: 'expSalesQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá trị xuất bán hàng',
          field: 'expSalesAmount',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Xuất khuyến mãi',
          field: 'expPromotionQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá trị xuất khuyến mãi',
          field: 'expPromotionAmount',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Xuất điều chỉnh',
          field: 'expAdjustmentQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá trị xuất điều chỉnh',
          field: 'expAdjustmentAmount',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Xuất trả hàng',
          field: 'expExchangeQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá trị xuất trả hàng',
          field: 'expExchangeAmount',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tồn cuối kỳ',
          field: 'endingQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá cuối kỳ',
          field: 'endingPrice',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Thành tiền cuối kỳ',
          field: 'endingAmount',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
      ],
      warehousesInputOutputInventory: [],
      warehousesInputOutputInventoryPagination: {},
      totalInfo: {},
      firstCol: 0,
      secondCol: 0,
      ipAddressCurrent: '',
      ipAddress: '',
    }
  },

  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY, [
      REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_GETTER,
      PRINT_INPUT_OUTPUT_INVENTORY_GETTER,
    ]),
    getwarehousesInputOutputInventory() {
      if (this.REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_GETTER.response) {
        return this.REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_GETTER.response.content.map(data => ({
          industry: data.catName,
          productCode: data.productCode,
          productName: data.productName,
          unit: data.uom,
          beginningQuantity: data.beginningQty,
          beginningPrice: data.beginningPrice,
          beginningAmount: data.beginningAmount,
          impTotalQuantity: data.impTotalQty,
          impQuantity: data.impQty,
          impAmount: data.impAmount,
          impAdjustmentQuantity: data.impAdjustmentQty,
          impAdjustmentAmount: data.impAdjustmentAmount,
          expTotalQuantity: data.expTotalQty,
          expSalesQuantity: data.expSalesQty,
          expSalesAmount: data.expSalesAmount,
          expPromotionQuantity: data.expPromotionQty,
          expPromotionAmount: data.expPromotionAmount,
          expAdjustmentQuantity: data.expAdjustmentQty,
          expAdjustmentAmount: data.expAdjustmentAmount,
          expExchangeQuantity: data.expExchangeQty,
          expExchangeAmount: data.expExchangeAmount,
          endingQuantity: data.endingQty,
          endingPrice: data.endingPrice,
          endingAmount: data.endingAmount,
        }))
      }
      return []
    },
    getTotalInfo() {
      if (this.REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_GETTER.info) {
        return this.REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_GETTER.info
      }
      return {}
    },
    getWarehousesInputOutputInventoryPagination() {
      if (this.REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_GETTER.response) {
        return this.REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_GETTER.response
      }
      return {}
    },
    getPrintData() {
      return this.PRINT_INPUT_OUTPUT_INVENTORY_GETTER
    },
    cssProps() {
      return {
        '--second-col': `${this.firstCol + 20}px`,
        '--third-col': `${this.firstCol + this.secondCol + 10}px`,
      }
    },
  },
  watch: {
    getwarehousesInputOutputInventory() {
      this.warehousesInputOutputInventory = [...this.getwarehousesInputOutputInventory]
      this.$nextTick(() => {
        this.firstCol = this.$refs.first.offsetParent.offsetWidth
        this.secondCol = this.$refs.second.offsetParent.offsetWidth
      })
    },
    getTotalInfo() {
      this.totalInfo = { ...this.getTotalInfo }
    },
    getWarehousesInputOutputInventoryPagination() {
      this.warehousesInputOutputInventoryPagination = { ...this.getWarehousesInputOutputInventoryPagination }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleWindowPrintHotKey, false)
    hostName().then(res => {
      if (res) {
        this.ipAddress = res.ip || res.query || res.geoplugin_request
      } else {
        this.ipAddress = null
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleWindowPrintHotKey)
  },

  methods: {
    ...mapActions(REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY, [
      GET_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION,
      EXPORT_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION,
      PRINT_INPUT_OUTPUT_INVENTORY_ACTION,
    ]),
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),
    handleWindowPrintHotKey(event) {
      const resolve = preventDefaultWindowPrint(event)
      if (resolve) {
        this.printReport()
      }
    },
    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsWarehousesInputOutputInventory', 'ReportsWarehousesInputOutputInventoryExcel')
    },
    statusPrintButton() {
      return this.$permission('ReportsWarehousesInputOutputInventory', 'ReportsWarehousesInputOutputInventoryPrint')
    },

    // END - permission

    onPaginationChange() {
      this.GET_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION(this.paginationData)
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
      this.searchOptions = event
      this.updatePaginationData({
        ...event,
        page: 0,
      })
      this.onPaginationChange()
    },

    onClickExcelExportButton() {
      this.EXPORT_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION({
        productCodes: this.paginationData.productCodes,
        fromDate: this.paginationData.fromDate,
        toDate: this.paginationData.toDate,
        warehouseTypeId: this.paginationData.warehouseTypeId,
      })
    },
    printReport() {
      hostName().then(res => {
        if (res) {
          this.ipAddressCurrent = res.ip || res.query || res.geoplugin_request
        } else {
          this.ipAddressCurrent = null
        }
        if (checkIpClient(this.ipAddress, this.ipAddressCurrent)) {
          this.GET_PRINTER_CLIENT_ACTIONS({
            data: {
              clientId: this.ipAddressCurrent,
            },
            onSuccess: () => {
              this.PRINT_INPUT_OUTPUT_INVENTORY_ACTION({
                fromDate: this.paginationData.fromDate,
                toDate: this.paginationData.toDate,
                productCodes: this.paginationData.productCodes,
                warehouseTypeId: this.paginationData.warehouseTypeId,
                ...this.decentralization,
                onSuccess: () => {
                },
              })
            },
          })
        }
      })
    },
  },
}
</script>
<style lang="scss">
  /* scroll ô filter tùy chỉnh theo số lượng ô*/
  .report.table-horizontal-scroll thead tr:last-child th:nth-child(2) {
    left: 35px;
    z-index: 1;
  }
  .report.table-horizontal-scroll thead tr:last-child th:nth-child(3) {
    left: var(--second-col);
    z-index: 1;
  }
  .report.table-horizontal-scroll thead tr:last-child th:nth-child(4) {
    left: var(--third-col);
    z-index: 1;
  }
  /* scroll ô filter tùy chỉnh theo số lượng ô*/

  /* tùy chỉnh left khi scroll*/
  .report.table-horizontal-scroll .column-first {
    left: 35px;
  }
  .report.table-horizontal-scroll .column-second {
    left: var(--second-col);
  }
  .report.table-horizontal-scroll .column-third {
    left: var(--third-col);
  }
  /* tùy chỉnh left khi scroll*/
  .vgt-table thead th {
    border-bottom-style: none;
  }
</style>
