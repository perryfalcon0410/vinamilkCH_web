<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <!-- START - Search -->
    <reports-warehouses-input-list-search
      class="d-print-none"
      @updatePageElement="updatePageNumber"
      @updateSearchData="paginationData = {
        ...paginationData,
        ...$event }"
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
          Danh sách phiếu nhập hàng
        </strong>
        <b-button-group>
          <b-button
            class="rounded btn-brand-1 h7"
            variant="someThing"
            :disabled="warehousesInputs.length === 0"
            @click="printReport"
          >
            <b-icon-printer-fill class="mr-50" />
            In
          </b-button>
          <b-button
            class="ml-1 rounded btn-brand-1 h7"
            variant="someThing"
            :disabled="warehousesInputs.length === 0"
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
        class="py-1"
      >
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="warehousesInputs"
          style-class="vgt-table table-horizontal-scroll"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="warehousesInputPagination.totalElements"
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
              v-show="warehousesInputPagination.totalElements"
              v-if="props.column.field === 'quantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalQuantity) }}
            </div>

            <div
              v-show="warehousesInputPagination.totalElements"
              v-else-if="props.column.field === 'packetQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalPacketQuantity) }}
            </div>
            <div
              v-show="warehousesInputPagination.totalElements"
              v-else-if="props.column.field === 'oddQuantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalOddQuantity) }}
            </div>
            <div
              v-show="warehousesInputPagination.totalElements"
              v-else-if="props.column.field === 'amount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(amount) }}
            </div>
            <div
              v-show="warehousesInputPagination.totalElements"
              v-else-if="props.column.field === 'total'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(total) }}
            </div>
          </template>
          <!-- START - Column filter -->
          <!-- START - Custom row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'quantity' || props.column.field === 'packetQuantity' || props.column.field === 'oddQuantity' || props.column.field === 'amount' || props.column.field === 'total'"
              style="padding-right: 4px"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'productName'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Custom row -->
          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="warehousesInputPagination.totalElements"
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
                  {{ (elementSize * pageNumber) > warehousesInputPagination.totalElements ?
                    warehousesInputPagination.totalElements : (elementSize * pageNumber) }}
                  của {{ warehousesInputPagination.totalElements }} mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="warehousesInputPagination.totalElements"
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
    <print-form-shop-import />
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  formatISOtoVNI,
} from '@core/utils/filter'
import PrintFormShopImport from '@core/components/print-form/PrintFormShopImport.vue'
import ReportsWarehousesInputListSearch from './components/ReportsWarehousesInputListSearch.vue'
import {
  REPORT_WAREHOUSES_INPUT,
  // GETTERS
  REPORT_WAREHOUSES_INPUT_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_INPUT_ACTION,
  EXPORT_REPORT_WAREHOUSES_INPUT_ACTION,
  PRINT_SHOP_IMPORT_REPORT_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsWarehousesInputListSearch,
    PrintFormShopImport,
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
        internalNumber: null,
        importType: null,
        fromOrderDate: null,
        fromTransDate: null,
        toOrderDate: null,
        toTransDate: null,
      },
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      columns: [
        {
          label: 'Ngày nhập',
          field: 'transDate',
          thClass: 'text-nowrap scroll-column-header column-first',
          tdClass: 'scroll-column column-first',
        },
        {
          label: 'Loại nhập',
          field: 'inputType',
          thClass: 'text-nowrap scroll-column-header column-second',
          tdClass: 'scroll-column column-second',
        },
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          thClass: 'text-nowrap scroll-column-header column-third',
          tdClass: 'scroll-column column-third',
        },
        {
          label: 'Số PO',
          field: 'poNumber',
          thClass: 'text-nowrap',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          thClass: 'text-nowrap',
        },
        {
          label: 'Ngày hóa đơn',
          field: 'orderDate',
          thClass: 'text-nowrap',
        },
        {
          label: 'Ngành hàng',
          field: 'industry',
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          thClass: 'text-nowrap',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          thClass: 'text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Số lượng packet',
          field: 'packetQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Số lượng lẻ',
          field: 'oddQuantity',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá trước thuế',
          field: 'priceNotVat',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Thành tiền',
          field: 'amount',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá sau thuế',
          field: 'price',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tổng cộng',
          field: 'total',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Quy cách',
          field: 'convfact',
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã nhập hàng',
          field: 'transCode',
          thClass: 'text-nowrap',
        },
        {
          label: 'Cửa hàng',
          field: 'shopName',
          thClass: 'text-nowrap',
        },
        {
          label: 'Chuỗi cửa hàng',
          field: 'shopType',
          thClass: 'text-nowrap',
        },
        {
          label: 'Nhóm sản phẩm',
          field: 'productGroup',
          thClass: 'text-nowrap',
        },
        {
          label: 'Ghi chú',
          field: 'note',
          thClass: 'text-nowrap',
        },
        {
          label: 'Số đơn trả PO',
          field: 'returnCode',
          thClass: 'text-nowrap',
        },
      ],
      warehousesInputs: [],
    }
  },

  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INPUT, [
      REPORT_WAREHOUSES_INPUT_GETTER,
    ]),
    getWarehousesInputs() {
      if (this.REPORT_WAREHOUSES_INPUT_GETTER.content) {
        return this.REPORT_WAREHOUSES_INPUT_GETTER.content.map(data => ({
          transDate: formatISOtoVNI(data.transDate),
          inputType: data.importType,
          redInvoiceNo: data.redInvoiceNo,
          poNumber: data.poNumber,
          internalNumber: data.internalNumber,
          orderDate: formatISOtoVNI(data.orderDate),
          industry: data.productInfoName,
          productCode: data.productCode,
          productName: data.productName,
          quantity: data.quantity,
          packetQuantity: data.wholesale,
          oddQuantity: data.retail,
          priceNotVat: data.priceNotVat,
          amount: data.amount,
          price: data.price,
          total: data.total,
          convfact: data.convfact,
          transCode: data.transCode,
          shopName: data.shopName,
          shopType: data.typeShop,
          productGroup: data.productGroup,
          note: data.note,
          returnCode: data.returnCode,
        }))
      }
      return []
    },
    totalQuantity() {
      return this.warehousesInputs.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
    totalPacketQuantity() {
      return this.warehousesInputs.reduce((accum, item) => accum + Number(item.packetQuantity), 0)
    },
    totalOddQuantity() {
      return this.warehousesInputs.reduce((accum, item) => accum + Number(item.oddQuantity), 0)
    },
    amount() {
      return this.warehousesInputs.reduce((accum, item) => accum + Number(item.amount), 0)
    },
    total() {
      return this.warehousesInputs.reduce((accum, item) => accum + Number(item.total), 0)
    },
    warehousesInputPagination() {
      if (this.REPORT_WAREHOUSES_INPUT_GETTER) {
        return this.REPORT_WAREHOUSES_INPUT_GETTER
      }
      return {}
    },
  },

  watch: {
    getWarehousesInputs() {
      this.warehousesInputs = [...this.getWarehousesInputs]
    },
  },

  mounted() {
  },

  methods: {
    ...mapActions(REPORT_WAREHOUSES_INPUT, [
      GET_REPORT_WAREHOUSES_INPUT_ACTION,
      EXPORT_REPORT_WAREHOUSES_INPUT_ACTION,
      PRINT_SHOP_IMPORT_REPORT_ACTION,
    ]),

    onPaginationChange() {
      this.GET_REPORT_WAREHOUSES_INPUT_ACTION(this.paginationData)
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({
        size: params.currentPerPage,
        page: commonData.pageNumber - 1,
      })
      this.onPaginationChange()
    },
    onClickExcelExportButton() {
      this.EXPORT_REPORT_WAREHOUSES_INPUT_ACTION({
        productCodes: this.paginationData.productCodes,
        internalNumber: this.paginationData.internalNumber,
        importType: this.paginationData.importType,
        fromOrderDate: this.paginationData.fromOrderDate,
        fromDate: this.paginationData.fromDate,
        toOrderDate: this.paginationData.toOrderDate,
        toDate: this.paginationData.toDate,
      })
    },
    updatePageNumber() {
      this.pageNumber = 1
    },
    printReport() {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_SHOP_IMPORT_REPORT_ACTION({
        productCodes: this.paginationData.productCodes,
        internalNumber: this.paginationData.internalNumber,
        importType: this.paginationData.importType,
        fromOrderDate: this.paginationData.fromOrderDate,
        fromDate: this.paginationData.fromDate,
        toOrderDate: this.paginationData.toOrderDate,
        toDate: this.paginationData.toDate,
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },
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
  .table-horizontal-scroll thead tr:last-child th:nth-child(4) {
    left: 252px;
    z-index: 1;
  }
  /* scroll ô filter tùy chỉnh theo số lượng ô*/

  /* tùy chỉnh left khi scroll*/
  .table-horizontal-scroll .column-first {
    left: 35px;
  }
  .table-horizontal-scroll .column-second {
    left: 130px;
  }
  .table-horizontal-scroll .column-third {
    left: 220px;
  }
  /* tùy chỉnh left khi scroll*/
</style>
