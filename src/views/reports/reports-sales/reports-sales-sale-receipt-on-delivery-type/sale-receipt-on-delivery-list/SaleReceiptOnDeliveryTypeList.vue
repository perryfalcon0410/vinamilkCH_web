<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <list-search
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
          Doanh số hóa đơn theo loại giao hàng
        </strong>
        <b-button
          class="shadow-brand-1 ml-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center"
          variant="someThing"
          :disabled="reportsSalesReceiptOnDeliveryType.length === 0"
          @click="onClickExcelExportButton"
        >
          <b-icon-file-earmark-x-fill class="mr-50" />
          Xuất excel
        </b-button>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="reportsSalesReceiptOnDeliveryType"
          mode="remote"
          style-class="vgt-table striped"
          compact-mode
          line-numbers
          :sort-options="{
            enabled: false,
            multipleColumns: true,
          }"
          :total-rows="reportSalesSaleReceiptPagination.totalElements"
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

          <!-- START - Rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'pay' || props.column.field === 'sales'"
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
              v-if="props.column.field === 'receiptCode'"
              v-show="totalInfo"
              class="h7 text-brand-3 px-80"
              align-h="start"
            >
              {{ $formatNumberToLocale(totalInfo.saleOrder) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'sales'"
              v-show="totalInfo"
              class="h7 text-brand-3 mx-50"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.totalAmount) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'pay'"
              v-show="totalInfo"
              class="h7 text-brand-3 mx-50"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.allTotal) }}
            </b-row>
          </template>
          <!-- START - Column filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="reportSalesSaleReceiptPagination.totalElements"
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
                :total-rows="reportSalesSaleReceiptPagination.totalElements"
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
import { formatISOtoVNI } from '@/@core/utils/filter'
import ListSearch from '../components/ListSearch.vue'
import {
  REPORT_SALES_SALE_ON_DELIVERY_TYPE,
  // GETTERS,
  REPORT_SALES_SALE_ON_DELIVERY_TYPE_GETTER,
  REPORT_SALES_DELIVERY_TYPES_CONTENT_GETTER,
  // ACTIONS
  EXPORT_REPORT_SALE_ON_DELIVERY_TYPE_ACTION,
  GET_SALE_ON_DELIVERY_TYPE_ACTION,
} from '../store-module/type'

export default {
  components: {
    ListSearch,
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
      searchData: {},
      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số hóa đơn',
          field: 'receiptCode',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày hóa đơn',
          field: 'receiptDate',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Doanh số',
          field: 'sales',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thanh toán',
          field: 'pay',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Loại giao hàng',
          field: 'deliveryType',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số đơn online',
          field: 'onlineReceipt',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Kênh bán',
          field: 'channel',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã cửa hàng',
          field: 'storeCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên cửa hàng',
          field: 'storeName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(REPORT_SALES_SALE_ON_DELIVERY_TYPE, [
      REPORT_SALES_SALE_ON_DELIVERY_TYPE_GETTER,
      REPORT_SALES_DELIVERY_TYPES_CONTENT_GETTER,
    ]),
    reportsSalesReceiptOnDeliveryType() {
      return this.REPORT_SALES_DELIVERY_TYPES_CONTENT_GETTER.map(data => ({
        customerCode: data.customerCode,
        customerName: data.customerName,
        address: data.customerAddress,
        receiptCode: data.orderNumber,
        receiptDate: formatISOtoVNI(data.orderDate),
        sales: this.$formatNumberToLocale(data.amount),
        pay: this.$formatNumberToLocale(data.total),
        deliveryType: data.deliveryType,
        onlineReceipt: data.onlineNumber,
        channel: data.type,
        storeCode: data.shopCode,
        storeName: data.shopName,
      }))
    },
    totalInfo() {
      if (this.REPORT_SALES_SALE_ON_DELIVERY_TYPE_GETTER.info) {
        return this.REPORT_SALES_SALE_ON_DELIVERY_TYPE_GETTER.info
      }
      return {}
    },
    reportSalesSaleReceiptPagination() {
      if (this.REPORT_SALES_SALE_ON_DELIVERY_TYPE_GETTER.response) {
        return this.REPORT_SALES_SALE_ON_DELIVERY_TYPE_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.reportSalesSaleReceiptPagination.totalElements
        ? this.reportSalesSaleReceiptPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.reportSalesSaleReceiptPagination.totalElements} mục`
    },

  },
  mounted() {
    resizeAbleTable()
  },
  methods: {
    ...mapActions(REPORT_SALES_SALE_ON_DELIVERY_TYPE, [
      EXPORT_REPORT_SALE_ON_DELIVERY_TYPE_ACTION,
      GET_SALE_ON_DELIVERY_TYPE_ACTION,
    ]),

    onClickExcelExportButton() {
      this.EXPORT_REPORT_SALE_ON_DELIVERY_TYPE_ACTION({
        ...this.searchData,
        ...this.decentralization,
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
      this.GET_SALE_ON_DELIVERY_TYPE_ACTION(this.paginationData)
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
    // pagigation funcs
  },
}
</script>
