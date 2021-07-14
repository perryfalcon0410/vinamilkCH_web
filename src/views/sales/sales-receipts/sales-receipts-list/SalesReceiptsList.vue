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
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          mode="remote"
          :rows="salesReceiptList"
          class="pb-1"
          style-class="vgt-table"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          line-numbers
          :sort-options="{
            enabled: false,
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
              v-if="props.column.field === 'totalValue'"
              v-show="salesReceiptsTotal.totalAmount"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(salesReceiptsTotal.totalAmount) }}
            </b-row>
            <b-row
              v-if="props.column.field === 'discountMoney'"
              v-show="salesReceiptsTotal.allPromotion"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(salesReceiptsTotal.allPromotion) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'payments'"
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
              v-if="props.column.field == 'feature'"
            >
              <b-icon-bricks scale="1.25" />
            </div>
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
                  @click="showInvoiceDetailModal(props.row.id, props.row.numberBill)"
                />
              </span>
            </div>
            <div
              v-else-if="props.column.field === 'discountMoney' || props.column.field === 'moneyAccumulated'"
              class="pr-70"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'totalValue' || props.column.field === 'payments'"
              class="pr-70"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'name' || props.column.field === 'note' || props.column.field === 'noteHdd'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
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
        page: this.pageNumber,
        sort: null,
      },

      selectedRows: [], // array receipt
      searchData: {
        size: commonData.perPageSizes[0],
        page: commonData.pageNumber - 1,
        sort: null,
      },
      columns: [
        {
          label: 'Số hóa đơn',
          field: 'numberBill',
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left',
        },
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'name',
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày bán',
          field: 'dayTime',
          thClass: 'text-center ws-nowrap',
          tdClass: 'text-center',
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Tổng giá trị',
          field: 'totalValue',
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right ws-nowrap',
          tdClass: 'text-right',
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Tiền giảm giá',
          field: 'discountMoney',
          type: 'number',
          thClass: 'text-right ws-nowrap',
          tdClass: 'text-right',
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Tiền tích lũy',
          field: 'moneyAccumulated',
          type: 'number',
          thClass: 'text-right ws-nowrap',
          tdClass: 'text-right',
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Tiền phải trả',
          field: 'payments',
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right ws-nowrap',
          tdClass: 'text-right',
          formatFn: value => this.$formatNumberToLocale(value),
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
          thClass: 'text-center ws-nowrap',
          tdClass: 'text-center',
        },
        {
          label: 'In HĐ đỏ',
          field: 'print',
          thClass: 'text-center ws-nowrap',
          tdClass: 'text-center',
          formatFn: value => (value === true ? 'Đã in ' : 'Chưa in'),
        },
        {
          label: 'Công ty',
          field: 'company',
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left ws-nowrap',
        },
        {
          label: 'Mã số thuế',
          field: 'taxCode',
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left ws-nowrap',
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left ws-nowrap',
        },
        {
          label: 'Ghi chú HĐĐ',
          field: 'noteHdd',
          sortable: false,
          thClass: 'text-center text-nowrap',
          tdClass: 'text-center',
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
          width: '60px',
          thClass: 'text-center move-header',
          tdClass: 'text-center move-column',
        },
      ],

      salesReceiptList: [],
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
          numberBill: data.orderNumber,
          customerCode: data.customerNumber,
          name: data.customerName,
          dayTime: data.orderDate,
          totalValue: data.amount,
          note: data.note,
          discountMoney: data.totalPromotion,
          moneyAccumulated: data.customerPurchase,
          payments: data.total,
          print: data.usedRedInvoice,
          noteHdd: data.redInvoiceRemark,
          company: data.redInvoiceCompanyName,
          taxCode: data.redInvoiceTaxCode,
          address: data.radInvoiceAddress,
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
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.salesReceiptsPagination.totalElements
        ? this.salesReceiptsPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.salesReceiptsPagination.totalElements} mục`
    },
  },

  watch: {
    getSalesReceiptList() {
      this.salesReceiptList = [...this.getSalesReceiptList]
    },
  },

  mounted() {
    resizeAbleTable()
  },

  methods: {
    ...mapActions(SALESRECEIPTS, [
      GET_SALES_RECEIPTS_ACTION,
      GET_SALES_RECEIPTS_DETAIL_ACTION,
      PRINT_SALES_RECEIPT_ACTION,
    ]),

    statusPrintButton() {
      return this.$permission('SalesReceipts', 'SalesReceiptsPrint')
    },
    statusDetailButton() {
      return this.$permission('SalesReceipts', 'SalesReceiptsDetail')
    },

    showInvoiceDetailModal(id, numberBill) {
      this.GET_SALES_RECEIPTS_DETAIL_ACTION({ saleOrderId: id, orderNumber: numberBill })
      this.$bvModal.show('detail-modal')
    },

    onClickPrintButton(id) {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_SALES_RECEIPT_ACTION({
        data: {
          salesReceiptId: id,
          params: { ...this.decentralization },
        },
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },

    // START - Vue Good Table func
    updateSearchData(newProps) {
      this.searchData = { ...this.searchData, ...newProps }
    },
    onSearchClick(event) {
      this.updateSearchData({
        // page: commonData.pageNumber - 1,
        ...event,
      })
      this.onPaginationChange()
      this.pageNumber = commonData.pageNumber // temp
    },
    onPaginationChange() {
      this.GET_SALES_RECEIPTS_ACTION({ ...this.searchData, ...this.decentralization })
    },
    onPageChange(params) {
      this.updateSearchData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updateSearchData({
        size: params.currentPerPage,
        page: commonData.pageNumber - 1,
      })
      this.onPaginationChange()
    },
    onSortChange(params) {
      this.updateSearchData({
        sort: `${params[0].field},${params[0].type}`,
      })
      this.onPaginationChange()
    },
    // END - Vue Good Table func
  },

}
</script>
<style lang="scss">
.move-header {
  position: sticky !important;
  right: 0;
  top: auto;
  z-index: 99;
  background: #315899 !important;
}
.move-column {
  position: sticky;
  right: 0;
  z-index: 99;
  background: inherit;
}
</style>
