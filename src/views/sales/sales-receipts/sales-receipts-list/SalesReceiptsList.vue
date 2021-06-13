<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >

    <sales-receipt-list-search
      @onClickSearchButton="onClickSearchButton"
      @updateSearchData="paginationData = {
        ...paginationData,
        ...$event }"
    />

    <b-form class="bg-white rounded shadow rounded my-1 d-print-none">
      <b-row
        class="justify-content-between border-bottom mx-0 px-1"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách hóa đơn bán hàng
        </strong>
        <b-button-group>
          <b-button
            class="btn-brand-1 h8 align-items-button-center"
            variant="someThing"
            @click="onClickPrintButton(1)"
          >
            <b-icon-printer-fill />
            In
          </b-button>
        </b-button-group>
      </b-row>

      <!-- Start table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          mode="remote"
          :rows="salesReceiptList"
          class="pb-1"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          line-numbers
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
            selectionInfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true,
            selectAllByGroup: true,
            multipleColumns: true,
          }"
          :total-rows="salesReceiptsPagination.totalElements"
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
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'totalValue'"
              class="mx-0"
              align-h="end"
            >
              {{ salesReceiptsTotal.allTotal }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'payments'"
              class="mx-0"
              align-h="end"
            >
              {{ (salesReceiptsTotal.totalAmount) }}
            </b-row>
          </template>
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.label === 'Chức năng'">
              <b-icon-bricks class="ml-1" />
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>

          <template
            slot="table-row"
            slot-scope="props"
          >
            <span v-if="props.column.field == 'note'">
              <span>
                <b-icon-file-earmark-excel
                  v-b-popover.hover="props.row.note"
                  class="cursor-pointer"
                  scale="1.5"
                />
              </span>
            </span>

            <span v-else-if="props.column.field == 'noteHdd'">
              <span>
                <b-icon-file-earmark-excel
                  v-b-popover.hover="props.row.noteHdd"
                  class="cursor-pointer"
                  scale="1.5"
                />
              </span>
            </span>
            <span v-else-if="props.column.field == 'press'">
              <span>
                <b-icon-eye-fill
                  v-b-popover.hover="'Chi tiết hóa đơn'"
                  class="cursor-pointer"
                  scale="1.5"
                  @click="showInvoiceDetailModal(props.row.id, props.row.numberBill)"
                />
              </span>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
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

      <invoice-detail-modal
        :visible="isInvoiceDetailModal"
        :information="info"
        :details="detailTable"
        :details-total="detailTableTotal"
        :promotion-details="promotionTable"
        :discount-details="discountTable"
        @close="isInvoiceDetailModal = false"
      />
    </b-form>

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
  formatDateToLocale,
} from '@core/utils/filter'
import lodash from 'lodash'
import commonData from '@/@db/common'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import PrintFormSalesReceipt from '@core/components/print-form/PrintFormSalesReceiptV2.vue'
import {
  // GETTERS
  SALESRECEIPTS,
  SALES_RECEIPTS_GETTER,
  SALES_RECEIPTS_DETAIL_GETTER,
  SALES_RECEIPTS_DETAIL_TOTAL_GETTER,
  SALES_RECEIPTS_DISCOUNT_GETTER,
  SALES_RECEIPTS_PROMOTION_GETTER,
  SALES_RECEIPT_DETAIL_INFOS_GETTER,
  SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER,
  SALES_RECEIPTS_PAGINATION_GETTER,
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
  },
  data() {
    return {
      decentralization: {
        formId: 5,
        ctrlId: 7,
      },
      isInvoiceDetailModal: false,
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      selected: null,

      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },

      columns: [
        {
          label: 'Số hóa đơn',
          field: 'numberBill',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'name',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày bán',
          field: 'dayTime',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tổng giá trị',
          field: 'totalValue',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tiển giảm giá',
          field: 'discountMoney',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-rigt',
        },
        {
          label: 'Tiền tích lũy',
          field: 'moneyAccumulated',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tiền phải trả',
          field: 'payments',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'In HĐ đỏ',
          field: 'print',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Công ty',
          field: 'company',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã số thuế',
          field: 'taxCode',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ghi chú HĐĐ',
          field: 'noteHdd',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Chức năng',
          field: 'press',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(SALESRECEIPTS, [
      SALES_RECEIPTS_GETTER,
      SALES_RECEIPTS_DETAIL_GETTER,
      SALES_RECEIPTS_DETAIL_TOTAL_GETTER,
      SALES_RECEIPTS_DISCOUNT_GETTER,
      SALES_RECEIPTS_PROMOTION_GETTER,
      SALES_RECEIPT_DETAIL_INFOS_GETTER,
      SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER,
      SALES_RECEIPTS_PAGINATION_GETTER,
    ]),
    salesReceiptList() {
      return this.SALES_RECEIPTS_GETTER.map(data => ({
        id: data.id,
        numberBill: data.orderNumber,
        customerCode: data.customerNumber,
        name: data.customerName,
        dayTime: formatDateToLocale(data.orderDate),
        totalValue: this.$formatNumberToLocale(data.amount),
        note: data.note,
        discountMoney: this.$formatNumberToLocale(data.totalPromotion),
        moneyAccumulated: data.accumulation,
        payments: this.$formatNumberToLocale(data.total),
        print: (data.usedRedInvoice === true) ? 'Đã in' : 'Chưa in',
        noteHdd: data.redInvoiceRemark,
        company: data.comName,
        taxCode: data.taxCode,
        address: data.address,
      }))
    },
    salesReceiptsTotal() {
      return lodash.mapValues(this.SALES_RECEIPTS_DETAIL_TOTAL_GETTER, value => this.$formatNumberToLocale(value))
    },

    detailTable() {
      return this.SALES_RECEIPTS_DETAIL_GETTER.map(data => ({
        productCode: data.productCode,
        productName: data.productName,
        unit: data.unit,
        number: data.quantity,
        price: this.$formatNumberToLocale(data.pricePerUnit),
        intoMoney: this.$formatNumberToLocale(data.amount),
        discount: this.$formatNumberToLocale(data.discount),
        bill: this.$formatNumberToLocale(data.payment),
      }))
    },
    detailTableTotal() {
      return lodash.mapValues(this.SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER, value => this.$formatNumberToLocale(value))
    },

    discountTable() {
      return this.SALES_RECEIPTS_DISCOUNT_GETTER
    },
    promotionTable() {
      return this.SALES_RECEIPTS_PROMOTION_GETTER.map(data => ({
        productCode: data.productNumber,
        productName: data.productName,
        number: data.quantity,
        promotionProgram: data.promotionProgramName,
      }))
    },

    // common info in receipt
    info() {
      return lodash.mapValues(this.SALES_RECEIPT_DETAIL_INFOS_GETTER, value => value)
    },

    salesReceiptsPagination() {
      return this.SALES_RECEIPTS_PAGINATION_GETTER
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.salesReceiptsPagination.totalElements
        ? this.salesReceiptsPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.salesReceiptsPagination.totalElements} mục`
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
    showInvoiceDetailModal(id, numberBill) {
      this.isInvoiceDetailModal = !this.isInvoiceDetailModal
      this.GET_SALES_RECEIPTS_DETAIL_ACTION({ saleOrderId: id, orderNumber: numberBill })
    },
    onClickPrintButton(id) {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_SALES_RECEIPT_ACTION({
        data: {
          salesReceiptId: id, // hard code: id của hóa đơn bán hàng
          params: { ...this.decentralization },
        },
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },
    // -------------- pagnigation function--------------
    onPaginationChange() {
      this.GET_SALES_RECEIPTS_ACTION({ ...this.paginationData, ...this.decentralization })
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
    onClickSearchButton() {
      this.pageNumber = 1
    },
    // -------------- pagnigation function--------------
  },
}
</script>
