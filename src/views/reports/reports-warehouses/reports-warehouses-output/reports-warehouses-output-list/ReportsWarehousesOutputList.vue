<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-warehouses-output-list-search
      class="d-print-none"
      @updateSearchData="updateSearchData"
      @onClickSearchButton="onClickSearchButton"
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
          Danh sách phiếu xuất hàng
        </strong>
        <b-button-group>
          <b-button
            v-if="statusPrintButton().show"
            :disabled="statusPrintButton().disabled || outputGoodslist.length === 0"
            class="rounded bg-brand-1 text-white h8"
            variant="someThing"
            size="sm"
            @click="onClickPrintExportButton"
          >
            <b-icon-printer-fill />
            In
          </b-button>
          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || outputGoodslist.length === 0"
            class="ml-1 rounded bg-brand-1 text-white h8"
            variant="someThing"
            size="sm"
            @click="onClickExcelExportButton"
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
          mode="remote"
          :rows="outputGoodslist"
          style-class="vgt-table table-horizontal-scroll"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="warehousesExportpagination.totalElements"
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
              v-else-if="props.column.field === 'quantity' ||
                'outpacketQuantity' ||
                'intoPrice' ||
                'finalPrice'"
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
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalValues.totalQuantity) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'packetQuantity'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalValues.totalPacketQuantity) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'outpacketQuantity'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalValues.totalUnitQuantity) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'intoPrice'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalValues.totalAmountNotVat) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'finalPrice'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalValues.totalAmountVat) }}
            </b-row>
          </template>
          <!-- END - Column filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="warehousesExportpagination.totalElements"
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
                :total-rows="warehousesExportpagination.totalElements"
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
          <!-- START - Custom row -->
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
          <!-- END - Custom row -->

        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </div>
    <!-- END - Report Output list -->
    <print-form-report-output-store />
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  preventDefaultWindowPrint,
  hostName,
  checkIpClient,
} from '@core/utils/filter'
import PrintFormReportOutputStore from '@core/components/print-form/PrintFormReportOutputStore.vue'
import ReportsWarehousesOutputListSearch from './components/ReportsWarehousesOutputListSearch.vue'

import {
  REPORT_OUTPUT_GOODS,
  // Getters
  OUTPUT_GOODS_GETTER,
  // Actions
  GET_OUTPUT_GOODS_ACTION,
  EXPORT_OUTPUT_GOODS_ACTION,
  PRINT_OUTPUT_GOODS_ACTION,
} from '../store-module/type'
import {
  PRINTERCONFIG,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../../auth/printer-configuration-modal/store-module/type'

export default {
  components: {
    ReportsWarehousesOutputListSearch,
    PrintFormReportOutputStore,
  },
  data() {
    return {
      isShowDeleteModal: false,
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },
      searchOptions: {
      },
      decentralization: {
        formId: 5, // Hard code
        ctrlId: 7, // Hard code
      },
      columns: [
        {
          label: 'Ngày xuất',
          field: 'transDate',
          width: '120px', // hard width
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-first',
          tdClass: 'min-w scroll-column column-first',
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Loại xuất',
          field: 'exportType',
          width: '120px', // hard width
          sortable: false,
          thClass: 'min-w text-nowrap scroll-column-header column-second',
          tdClass: 'min-w scroll-column column-second',
        },
        {
          label: 'Số hóa đơn',
          field: 'billNumber',
          width: '140px', // hard width
          sortable: false,
          thClass: 'text-nowrap scroll-column-header column-third',
          tdClass: 'min-w scroll-column column-third',
        },
        {
          label: 'Số PO',
          field: 'poNumber',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Ngày hóa đơn',
          field: 'recieptDate',
          formatFn: value => this.$formatISOtoVNI(value),
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Ngành hàng',
          field: 'group',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productId',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          tdClass: 'min-w',
          thClass: 'text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số lượng packet',
          field: 'packetQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số lượng lẻ',
          field: 'outpacketQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá trước thuế',
          field: 'preTaxPrice',
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'intoPrice',
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá sau thuế',
          field: 'afTaxPrice',
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Tổng cộng',
          field: 'finalPrice',
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Quy cách',
          field: 'specifications',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã xuất hàng',
          field: 'importId',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Cửa hàng',
          field: 'store',
          sortable: false,
          tdClass: 'min-w',
          thClass: 'text-nowrap',
        },
        {
          label: 'Chuỗi cửa hàng',
          field: 'chainStore',
          sortable: false,
          tdClass: 'min-w',
          thClass: 'text-nowrap',
        },
        {
          label: 'Nhóm sản phẩm',
          field: 'productGroup',
          sortable: false,
          tdClass: 'min-w',
          thClass: 'text-nowrap',
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
          thClass: 'text-nowrap',
        },
      ],
      outputGoodslist: [],
      totalValues: {},
      warehousesExportpagination: {},
      ipAddressCurrent: '',
      ipAddress: '',
    }
  },
  computed: {
    ...mapGetters(REPORT_OUTPUT_GOODS, [
      OUTPUT_GOODS_GETTER,
    ]),
    getOutputGoodslist() {
      if (this.OUTPUT_GOODS_GETTER.response) {
        return this.OUTPUT_GOODS_GETTER.response.content.map(data => ({
          id: data.id,
          transDate: data.transDate,
          billNumber: data.redInvoiceNo,
          exportType: data.importType,
          poNumber: data.poNumber,
          internalNumber: data.internalNumber,
          recieptDate: data.orderDate,
          group: data.productInfoName,
          productId: data.productCode,
          productName: data.productName,
          quantity: data.quantity,
          packetQuantity: data.wholesale,
          outpacketQuantity: data.retail,
          preTaxPrice: data.priceNotVat,
          intoPrice: data.totalPriceNotVat,
          afTaxPrice: data.price,
          finalPrice: data.totalPriceVat,
          specifications: data.convfact,
          importId: data.transCode,
          store: data.shopName,
          chainStore: data.typeShop,
          productGroup: data.productGroup,
          note: data.note,
        }))
      }
      return []
    },
    getTotalValues() {
      if (this.OUTPUT_GOODS_GETTER.info) {
        return this.OUTPUT_GOODS_GETTER.info
      }
      return {}
    },
    getWarehousesExportpagination() {
      if (this.OUTPUT_GOODS_GETTER.response) {
        return this.OUTPUT_GOODS_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.warehousesExportpagination.totalElements
        ? this.warehousesExportpagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.warehousesExportpagination.totalElements} mục`
    },
  },
  watch: {
    getOutputGoodslist() {
      this.outputGoodslist = [...this.getOutputGoodslist]
    },
    getTotalValues() {
      this.totalValues = { ...this.getTotalValues }
    },
    getWarehousesExportpagination() {
      this.warehousesExportpagination = { ...this.getWarehousesExportpagination }
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
    ...mapActions(REPORT_OUTPUT_GOODS, [
      GET_OUTPUT_GOODS_ACTION,
      EXPORT_OUTPUT_GOODS_ACTION,
      PRINT_OUTPUT_GOODS_ACTION,
    ]),
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),

    handleWindowPrintHotKey(event) {
      const resolve = preventDefaultWindowPrint(event)
      if (resolve) {
        this.onClickPrintExportButton()
      }
    },
    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsWarehousesOutput', 'ReportsWarehousesOutputExcel')
    },
    statusPrintButton() {
      return this.$permission('ReportsWarehousesOutput', 'ReportsWarehousesOutputPrint')
    },

    // END - permission
    // start pagination
    updateSearchData(event) {
      this.searchOptions = event
      this.updatePaginationData({
        ...event,
        page: 0,
      })
      this.onPaginationChange()
    },
    onPaginationChange() {
      this.GET_OUTPUT_GOODS_ACTION({ ...this.paginationData })
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({ size: params.currentPerPage })
      this.onPaginationChange()
    },
    onClickSearchButton() {
      this.pageNumber = 1 // hard code
    },
    // End pâgination
    onClickExcelExportButton() {
      this.EXPORT_OUTPUT_GOODS_ACTION({ ...this.decentralization, ...this.searchOptions })
    },
    onClickPrintExportButton() {
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
              this.PRINT_OUTPUT_GOODS_ACTION({
                ...this.decentralization,
                ...this.searchOptions,
                onSuccess: () => {},
              })
            },
          })
        }
      })
    },
  },
}
</script>
<style>
.min-w {
  min-width: 8rem;
}
  /* scroll ô filter tùy chỉnh theo số lượng ô*/
  .table-horizontal-scroll thead tr:last-child th:nth-child(2) {
    left: 35px;
    z-index: 1;
  }
  .table-horizontal-scroll thead tr:last-child th:nth-child(3) {
    left: 155px;
    z-index: 1;
  }
  .table-horizontal-scroll thead tr:last-child th:nth-child(4) {
    left: 275px;
    z-index: 1;
  }
  /* scroll ô filter tùy chỉnh theo số lượng ô*/

  /* tùy chỉnh left khi scroll*/
   .table-horizontal-scroll .column-first {
    left: 35px;
  }
  .table-horizontal-scroll .column-second {
    left: 155px;
  }
  .table-horizontal-scroll .column-third {
    left: 275px;
  }
  /* tùy chỉnh left khi scroll*/
</style>
