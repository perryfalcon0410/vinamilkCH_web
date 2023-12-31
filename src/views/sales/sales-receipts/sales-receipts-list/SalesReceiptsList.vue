<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >

    <sales-receipt-list-search
      @onSearchClick="onSearchClick"
    />

    <div class="bg-white rounded shadow rounded my-1 d-print-none">
      <b-row
        class="justify-content-between border-bottom mx-0 px-1"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách hóa đơn bán hàng
        </strong>
      </b-row>

      <!-- Start table -->
      <b-col class="py-1 sales-receipt">
        <vue-good-table
          :columns="columns"
          mode="remote"
          :rows="salesReceiptList"
          class="pb-1"
          style-class="vgt-table table-horizontal-scroll sales-class custom-table"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          :style="cssProps"
          :sort-options="{
            enabled: false,
            multipleColumns: false,
          }"
          :total-rows="salesReceiptsPagination.totalElements"
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

          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'amount'"
              v-show="salesReceiptsTotal.totalAmount"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(salesReceiptsTotal.totalAmount) }}
            </b-row>
            <b-row
              v-if="props.column.field === 'totalPromotion'"
              v-show="salesReceiptsTotal.allPromotion"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(salesReceiptsTotal.allPromotion) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'total'"
              v-show="salesReceiptsTotal.allTotal"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(salesReceiptsTotal.allTotal) }}
            </b-row>
          </template>

          <template
            slot="table-column"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'feature'"
            >
              <b-icon-bricks scale="1.25" />
            </div>
            <div
              v-else-if="props.column.label === 'Số hóa đơn'"
              ref="orderNumber"
            >
              {{ props.column.label }}
            </div>
            <div
              v-else-if="props.column.label === 'Mã khách hàng'"
              ref="customerNumber"
            >
              {{ props.column.label }}
            </div>
            <div
              v-else-if="props.column.label === 'Họ tên'"
              ref="customerName"
            >
              {{ props.column.label }}
            </div>
            <b-row v-else-if="props.column.field === 'index'" />
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>

          <template
            slot="table-row"
            slot-scope="props"
          >
            <div
              v-if="props.column.field == 'feature'"
            >
              <span class="pr-1">
                <v-icon-printer
                  v-if="statusPrintButton().show"
                  :disabled="statusPrintButton().disabled"
                  popover-content="In hóa đơn"
                  @click="onClickPrintButton(props.row.id)"
                />
              </span>
              <span>
                <v-icon-detail
                  v-if="statusDetailButton().show"
                  :disabled="statusDetailButton().disabled"
                  popover-content="Chi tiết hóa đơn"
                  @click="showInvoiceDetailModal(props.row.id, props.row.orderNumber)"
                />
              </span>
            </div>
            <div
              v-else-if="props.column.field === 'totalPromotion' || props.column.field === 'customerPurchase'"
              class="pr-70"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'amount' || props.column.field === 'total'"
              class="pr-70"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'customerNumber'"
              class="customerName-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'customerName'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'note' || props.column.field === 'redInvoiceRemark'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'index'"
              class="align-middle"
            >
              {{ paginationData.page === 0 || isNaN(paginationData.page) ? props.index + 1 : paginationData.page*paginationData.size + (props.index + 1) }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="salesReceiptsPagination.totalElements"
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
                :total-rows="salesReceiptsPagination.totalElements"
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
      <!-- End table -->
    </div>

    <!-- START - Modal  -->
    <invoice-detail-modal
      :information="info"
      :details="detailGrid"
      :details-total="detailTableTotal"
      :promotion-details="promotionGrid"
      :discount-details="discountGrid"
    />
    <!-- END - Modal  -->

    <!-- START - Print form -->
    <print-form-sales-receipt />
    <!-- END - Print form -->
  </b-container>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  earlyMonth,
  nowDate,
  hostName,
  checkIpClient,
} from '@core/utils/filter'
import commonData from '@/@db/common'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import PrintFormSalesReceipt from '@core/components/print-form/PrintFormSalesReceiptV2.vue'
// Icons
import VIconPrinter from '@core/components/v-icons/IconPrinter.vue'
import VIconDetail from '@core/components/v-icons/IconDetail.vue'
import {
  // GETTERS
  SALESRECEIPTS,
  SALES_RECEIPTS_GETTER,
  SALES_RECEIPTS_DETAIL_GETTER,
  // ACTIONS
  GET_SALES_RECEIPTS_ACTION,
  GET_SALES_RECEIPTS_DETAIL_ACTION,
  PRINT_SALES_RECEIPT_ACTION,
} from '../store-module/type'
import {
  PRINTERCONFIG,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../auth/printer-configuration-modal/store-module/type'
import InvoiceDetailModal from '../components/InvoiceDetailModal.vue'
import SalesReceiptListSearch from './components/SalesReceiptListSearch.vue'

export default {
  components: {
    InvoiceDetailModal,
    SalesReceiptListSearch,
    PrintFormSalesReceipt,
    VIconDetail,
    VIconPrinter,
  },

  data() {
    return {
      decentralization: {
        formId: 5,
        ctrlId: 7,
      },
      isInvoiceDetailModal: false,
      valueDateFrom: earlyMonth(),
      valueDateTo: nowDate(),
      selected: null,
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber - 1,
        sort: null,
      },

      selectedRows: [], // array receipt
      columns: [
        {
          label: 'index',
          field: 'index',
          width: '35px',
          thClass: 'ws-nowrap scroll-column-header column-index',
          tdClass: 'scroll-column align-middle column-index',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'orderNumber',
          sortable: true,
          thClass: 'ws-nowrap scroll-column-header column-first',
          tdClass: 'scroll-column align-middle column-first',
        },
        {
          label: 'Mã khách hàng',
          field: 'customerNumber',
          sortable: false,
          thClass: 'ws-nowrap scroll-column-header column-second',
          tdClass: 'scroll-column align-middle column-second',
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          sortable: false,
          thClass: 'scroll-column-header column-third ws-nowrap',
          tdClass: 'scroll-column align-middle column-third',
        },
        {
          label: 'Ngày bán',
          field: 'orderDate',
          sortable: true,
          thClass: 'text-center ws-nowrap scroll-column-header column-4',
          tdClass: 'text-center align-middle scroll-column column-4',
          formatFn: value => this.$formatISOtoVNI(value, true, false),
        },
        {
          label: 'Tổng giá trị',
          field: 'amount',
          sortable: false,
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right ws-nowrap',
          tdClass: 'text-right align-middle',
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Tiền giảm giá',
          field: 'totalPromotion',
          type: 'number',
          sortable: false,
          thClass: 'text-right ws-nowrap',
          tdClass: 'text-right align-middle',
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Tiền tích lũy',
          field: 'customerPurchase',
          type: 'number',
          sortable: false,
          thClass: 'text-right ws-nowrap',
          tdClass: 'text-right align-middle',
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Tiền phải trả',
          field: 'total',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right ws-nowrap',
          tdClass: 'text-right align-middle',
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left align-middle',
        },
        {
          label: 'Loại đơn hàng',
          field: 'orderTypeName',
          sortable: false,
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left align-middle',
        },
        {
          label: 'Số đơn hàng',
          field: 'onlineNumber',
          sortable: false,
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left align-middle',
        },
        {
          label: 'In HĐ đỏ',
          field: 'usedRedInvoice',
          sortable: false,
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left align-middle',
          formatFn: value => (value === true ? 'Đã in ' : 'Chưa in'),
        },
        {
          label: 'Công ty',
          field: 'redInvoiceCompanyName',
          sortable: false,
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left ws-nowrap align-middle',
        },
        {
          label: 'Mã số thuế',
          field: 'redInvoiceTaxCode',
          sortable: false,
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left ws-nowrap align-middle',
        },
        {
          label: 'Địa chỉ',
          field: 'redInvoiceAddress',
          sortable: false,
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left ws-nowrap align-middle',
        },
        {
          label: 'Ghi chú HĐĐ',
          sortable: false,
          field: 'redInvoiceRemark',
          thClass: 'text-left text-nowrap align-middle',
          tdClass: 'text-left',
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
          width: '60px',
          thClass: 'text-center move-header',
          tdClass: 'text-center move-column align-middle',
        },
      ],

      salesReceiptList: [],
      numberBillWidth: 0,
      customerCodeWidth: 0,
      customerNameWidth: 0,
      ipAddressCurrent: '',
      ipAddress: '',
    }
  },

  computed: {
    ...mapGetters(SALESRECEIPTS, [
      SALES_RECEIPTS_GETTER,
      SALES_RECEIPTS_DETAIL_GETTER,
    ]),
    getSalesReceiptList() {
      if (this.SALES_RECEIPTS_GETTER.response) {
        return this.SALES_RECEIPTS_GETTER.response.content.map(data => ({
          id: data.id,
          orderNumber: data.orderNumber,
          customerNumber: data.customerNumber,
          customerName: data.customerName,
          orderDate: data.orderDate,
          amount: data.amount,
          note: data.note,
          totalPromotion: data.totalPromotion,
          customerPurchase: data.customerPurchase,
          total: data.total,
          usedRedInvoice: data.usedRedInvoice,
          redInvoiceRemark: data.redInvoiceRemark,
          redInvoiceCompanyName: data.redInvoiceCompanyName,
          redInvoiceTaxCode: data.redInvoiceTaxCode,
          redInvoiceAddress: data.redInvoiceAddress,
          orderTypeName: data.orderTypeName,
          onlineNumber: data.onlineNumber,
        }))
      }
      return []
    },
    salesReceiptsTotal() {
      if (this.SALES_RECEIPTS_GETTER.info) {
        return this.SALES_RECEIPTS_GETTER.info
      }
      return {}
    },

    detailGrid() {
      if (this.SALES_RECEIPTS_DETAIL_GETTER.orderDetail) {
        return this.SALES_RECEIPTS_DETAIL_GETTER.orderDetail.response.map(data => ({
          productCode: data.productCode,
          productName: data.productName,
          unit: data.unit,
          number: data.quantity,
          price: data.pricePerUnit,
          intoMoney: data.amount,
          discount: data.discount,
          bill: data.payment,
        }))
      }
      return []
    },
    detailTableTotal() {
      if (this.SALES_RECEIPTS_DETAIL_GETTER.orderDetail) {
        return this.SALES_RECEIPTS_DETAIL_GETTER.orderDetail.info
      }
      return {}
    },

    discountGrid() {
      if (this.SALES_RECEIPTS_DETAIL_GETTER.discount) {
        return this.SALES_RECEIPTS_DETAIL_GETTER.discount
      }
      return []
    },
    promotionGrid() {
      if (this.SALES_RECEIPTS_DETAIL_GETTER.promotion) {
        return this.SALES_RECEIPTS_DETAIL_GETTER.promotion.map(data => ({
          productCode: data.productNumber,
          productName: data.productName,
          number: data.quantity,
          promotionProgram: data.promotionProgramName,
        }))
      }
      return []
    },

    // common info in receipt
    info() {
      if (this.SALES_RECEIPTS_DETAIL_GETTER.infos) {
        return this.SALES_RECEIPTS_DETAIL_GETTER.infos
      }
      return {}
    },

    salesReceiptsPagination() {
      if (this.SALES_RECEIPTS_GETTER.response) {
        return this.SALES_RECEIPTS_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const { size } = this.paginationData
      const { totalElements } = this.salesReceiptsPagination

      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * size) - size + 1
      const maxPageSize = (size * this.pageNumber) > totalElements
        ? totalElements : (size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${totalElements} mục`
    },
    cssProps() {
      return {
        '--customer-code': `${this.numberBillWidth + 33}px`,
        '--customer-customerName': `${this.numberBillWidth + this.customerCodeWidth + 33}px`,
        '--date': `${this.numberBillWidth + this.customerCodeWidth + this.customerNameWidth + 32}px`,
      }
    },
  },

  watch: {
    getSalesReceiptList() {
      this.salesReceiptList = [...this.getSalesReceiptList]
      this.$nextTick(() => {
        this.numberBillWidth = this.$refs.orderNumber.offsetParent.offsetWidth
        this.customerCodeWidth = this.$refs.customerNumber.offsetParent.offsetWidth
        this.customerNameWidth = this.$refs.customerName.offsetParent.offsetWidth
      })
    },
  },

  mounted() {
    resizeAbleTable()
    hostName().then(res => {
      if (res) {
        this.ipAddress = res.ip || res.query || res.geoplugin_request
      } else {
        this.ipAddress = null
      }
    })
  },
  methods: {
    ...mapActions(SALESRECEIPTS, [
      GET_SALES_RECEIPTS_ACTION,
      GET_SALES_RECEIPTS_DETAIL_ACTION,
      PRINT_SALES_RECEIPT_ACTION,
    ]),
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),

    statusPrintButton() {
      return this.$permission('SalesReceipts', 'SalesReceiptsPrint')
    },
    statusDetailButton() {
      return this.$permission('SalesReceipts', 'SalesReceiptsDetail')
    },

    showInvoiceDetailModal(id, orderNumber) {
      this.GET_SALES_RECEIPTS_DETAIL_ACTION({ saleOrderId: id, orderNumber })
      this.$bvModal.show('detail-modal')
    },

    onClickPrintButton(id) {
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
              this.PRINT_SALES_RECEIPT_ACTION({
                data: {
                  salesReceiptId: id,
                  params: { ...this.decentralization },
                },
                onSuccess: () => {},
              })
            },
          })
        }
      })
    },

    // START - Vue Good Table func
    updateSearchData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onSearchClick(event) {
      this.updateSearchData({
        ...event,
      })
      this.onPaginationChange()
    },
    onPaginationChange(data, params) {
      this.updateSearchData(data)
      this.GET_SALES_RECEIPTS_ACTION({ ...this.paginationData, ...params })
    },
    onPageChange(params) {
      this.updateSearchData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updateSearchData({
        size: params.currentPerPage,
      })
      this.onPaginationChange()
    },
    onSortChange(params) {
      params.forEach((item, index) => {
        if (item.type === 'none') {
          params.splice(index, 1)
        }
      })
      if (params.length === 1) {
        this.updateSearchData({
          sort: `${params[0].field},${params[0].type}`,
        })
      } else {
        this.updateSearchData({
          sort: null,
        })
      }
      if (params.length >= 2) {
        this.updateSearchData({
          sort: [...params],
        })
      }
      this.onPaginationChange()
    },
    // END - Vue Good Table func
  },

}
</script>
<style lang="scss">
  // .sales-receipt {
  //   .vgt-table thead th {
  //     border-bottom-style: none;
  //   }
  // }
  .move-header {
    position: sticky !important;
    right: -2px;
    top: 0.9px;
    z-index: 1;
    background: #d7e1f2 !important;
  }
  .move-column {
    position: sticky;
    right: -2px;
    z-index: 99;
    background: inherit;
  }
  .custom-table thead tr:last-child th:last-child {
    position: sticky;
    right: -1px;
    z-index: 99;
    background: #fff;
  }

  .custom-table.vgt-table thead tr:first-child th {
    border-bottom: 0px;
  }
  // code fix scroll tablet
  @media only screen and (min-width: 800px) {
    // fix issue scroll tablet
    .sales-class.table-horizontal-scroll {
      .scroll-column-header {
        // style scroll header
        position: -webkit-sticky;
        position: sticky !important;
        top: 0.9px;
        z-index: 1;
      }
      .scroll-column {
        // style scroll columns
        position: -webkit-sticky;
        position: sticky;
        background: inherit;
      }

      // style scroll columns line-number
      tr th.line-numbers {
        position: -webkit-sticky;
        position: sticky;
        left: -1px;
        background: inherit !important;
      }
      thead tr th.line-numbers {
        position: -webkit-sticky;
        position: sticky !important;
        left: -1px;
        top: 0.9px;
        z-index: 1;
      }
      thead tr:last-child th:first-child {
        left: -1px;
        // background: #fff !important;
        z-index: 1;
      }
      // style scroll columns line-number

      // style scroll row filter
      thead tr:last-child th {
        position: -webkit-sticky;
        position: sticky !important;
      }
    }
    // fix issue scroll tablet

    .sales-class.table-horizontal-scroll thead tr:last-child th:nth-child(1) {
      left: -1px;
      z-index: 1;
    }
    .sales-class.table-horizontal-scroll thead tr:last-child th:nth-child(2) {
      left: 34px;
      z-index: 1;
    }
    .sales-class.table-horizontal-scroll thead tr:last-child th:nth-child(3) {
      left: var(--customer-code);
      z-index: 1;
    }
    .sales-class.table-horizontal-scroll thead tr:last-child th:nth-child(4) {
      /* left: 163px; */
      left: var(--customer-customerName);
      z-index: 1;
    }
    .sales-class.table-horizontal-scroll thead tr:last-child th:nth-child(5) {
      left: var(--date);
      /* left: 310px; */
      z-index: 1;
    }

    .sales-class.table-horizontal-scroll .column-index {
      left: -1px;
    }
    .sales-class.table-horizontal-scroll .column-first {
      left: 34px;
    }
    .sales-class.table-horizontal-scroll .column-second {
      left: var(--customer-code);
    }
    .sales-class.table-horizontal-scroll .column-third {
      left: var(--customer-customerName);
    }
    .sales-class.table-horizontal-scroll .column-4 {
      left: var(--date);
    }
  }
</style>
