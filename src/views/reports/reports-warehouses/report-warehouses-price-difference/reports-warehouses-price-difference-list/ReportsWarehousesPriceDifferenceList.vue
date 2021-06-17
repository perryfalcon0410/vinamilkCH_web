<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >

    <!-- START - Search -->
    <reports-warehouses-output-list-search
      class="d-print-none"
      @updateSearchData="updateSearchData"
      @onClickSearchButton="onClickSearchButton"
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
          Danh sách phiếu nhập xuất kho
        </strong>
        <b-button-group>
          <b-button
            class="btn-brand-1 h9 align-items-button-center rounded ml-1"
            variant="someThing"
            @click="onClickPrintButton"
          >
            <b-icon-printer-fill class="mr-50" />
            In
          </b-button>
          <b-button
            class="btn-brand-1 h9 align-items-button-center rounded ml-1"
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
          :rows="differencePriceRows"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="differncePricePagination.totalElements"
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
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'quantity'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.totalQuantity) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'totalInput'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.totalPriceInput) }}
            </b-row>
          </template>
          <!-- START - Column filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="differncePricePagination.totalElements"
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
                :total-rows="differncePricePagination.totalElements"
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
    <print-form-report-diff-price />
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
import PrintFormReportDiffPrice from '@core/components/print-form/PrintFormReportDiffPrice.vue'
import ReportsWarehousesOutputListSearch from './components/ReportsWarehousesOutputListSearch.vue'
import {
  REPORT_WAREHOUSES_DIFFERENCE_PRICE,
  // GETTERS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
  EXPORT_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
  PRINT_REPORT_DIFFERENCE_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsWarehousesOutputListSearch,
    PrintFormReportDiffPrice,
  },
  data() {
    return {
      searchData: {},
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      differencePriceRows: [],
      columns: [
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày hóa đơn',
          field: 'orderDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số PO',
          field: 'poNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã nhập hàng',
          field: 'receptCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-right',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá đầu vào (VAT)',
          field: 'inputPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền vào',
          field: 'totalInput',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá đầu ra (VAT)',
          field: 'outputPrice',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền ra',
          field: 'totalOutput',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Chênh lệch',
          field: 'priceChange',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
      ],
    }
  },

  computed: {
    ...mapGetters(REPORT_WAREHOUSES_DIFFERENCE_PRICE, [
      GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER,
    ]),
    getDifferencePriceLists() {
      if (this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.response && this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.response.content) {
        return this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.response.content.map(data => ({
          id: data.id,
          redInvoiceNo: data.redInvoiceNo,
          poNumber: data.poNumber,
          internalNumber: data.internalNumber,
          transDate: this.$formatISOtoVNI(data.transDate),
          orderDate: this.$formatISOtoVNI(data.orderDate),
          productCode: data.productCode,
          productName: data.productName,
          unit: data.unit,
          quantity: this.$formatNumberToLocale(data.quantity),
          inputPrice: this.$formatNumberToLocale(data.inputPrice),
          totalInput: this.$formatNumberToLocale(data.totalInput),
          outputPrice: this.$formatNumberToLocale(data.outputPrice),
          totalOutput: this.$formatNumberToLocale(data.totalOutput),
          priceChange: this.$formatNumberToLocale(data.priceChange),
        }))
      }
      return []
    },
    totalInfo() {
      if (this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.info) {
        return this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.info
      }
      return {}
    },
    differncePricePagination() {
      if (this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.response) {
        return this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.differncePricePagination.totalElements
        ? this.differncePricePagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.differncePricePagination.totalElements} mục`
    },

  },
  watch: {
    getDifferencePriceLists() {
      this.differencePriceRows = [...this.getDifferencePriceLists]
    },
  },
  mounted() {
    resizeAbleTable()
  },

  methods: {
    ...mapActions(REPORT_WAREHOUSES_DIFFERENCE_PRICE, [
      GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
      EXPORT_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
      PRINT_REPORT_DIFFERENCE_ACTION,
    ]),
    onClickPrintButton() {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_REPORT_DIFFERENCE_ACTION({
        ...this.searchData,
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },
    onClickExcelExportButton() {
      this.EXPORT_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION({ ...this.decentralization, ...this.searchData })
    },

    // Start - pagination
    updateSearchData(event) {
      this.paginationData = {
        ...this.paginationData,
        ...event,
      }
      this.searchData = event
      this.pageNumber = 1
    },
    onPaginationChange() {
      this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION({ ...this.paginationData, ...this.decentralization })
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
    // End - pagination
  },
}
</script>
