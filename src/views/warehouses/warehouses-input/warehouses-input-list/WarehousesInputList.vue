<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <warehouses-input-list-search
      class="d-print-none"
      @updatePageElement="updatePageNumber"
      @updateSearchData="paginationData = {
        ...paginationData,
        ...$event }"
    />
    <!-- END - Search -->

    <!-- START - Product list -->
    <b-form class="bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Title -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong
          class="text-brand-1"
        >
          Danh sách phiếu nhập hàng
        </strong>
        <b-button
          class="btn-brand-1 h9 align-items-button-center rounded"
          variant="someThing"
          @click="onClickCreateButton"
        >
          <b-icon-plus
            scale="2"
            class="mr-50"
          />
          Thêm mới
        </b-button>
      </b-row>
      <!-- END - Title -->

      <!-- START - Table -->
      <b-col
        class="py-1"
      >
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="receipts"
          style-class="vgt-table bordered"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="receiptPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
            initialSortBy: [{field: 'nameText', type: 'desc'}]
          }"
          @on-sort-change="onSortChange"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
        >
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- START - Column -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <b-row v-if="props.column.field === 'feature'">
              <b-icon-bricks
                v-b-popover.hover="'Thao tác'"
                scale="1.3"
                class="ml-4"
              />
            </b-row>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Column -->

          <!-- START - Row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'feature'"
              class="mx-0"
            >
              <b-icon-printer
                v-b-popover.hover.top="'In phiếu'"
                class="cursor-pointer ml-1"
                scale="1.4"
                @click="onClickPrintButton(props.row.transCode)"
              />
              <b-icon-eye-fill
                v-b-popover.hover.top="'Xem chi tiết'"
                class="cursor-pointer ml-1"
                scale="1.4"
                @click="onClickUpdateButton(props.row.id, props.row.receiptType, props.row.poId)"
              />
              <b-icon-trash-fill
                v-show="props.row.transDate === $nowDate"
                v-b-popover.hover.top="'Xóa'"
                class="cursor-pointer ml-1"
                color="red"
                scale="1.4"
                @click="onClickDeleteButton(props.row.id, props.row.receiptType, props.row.transDate, props.row.originalIndex, props.row.transCode)"
              />
            </b-row>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-show="receiptPagination.totalElements"
              v-if="props.column.field === 'quantity'"
              class="mx-0"
              align-h="end"
            >
              {{ totalQuantity }}
            </b-row>

            <b-row
              v-show="receiptPagination.totalElements"
              v-else-if="props.column.field === 'price'"
              class="mx-0"
              align-h="end"
            >
              {{ totalPrice }}
            </b-row>
          </template>
          <!-- START - Column filter -->
          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="receiptPagination.totalElements"
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
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="receiptPagination.totalElements"
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

    </b-form>
    <!-- END - Product  list -->

    <!-- START - Product Modal Delete -->
    <b-modal
      v-model="isDeleteModalShow"
      title="Thông báo"
    >
      Bạn có muốn xóa đợt nhập hàng {{ selectedReceiptCode }}?
      <template #modal-footer>
        <b-button
          @click="isDeleteModalShow = !isDeleteModalShow"
        >
          Hủy
        </b-button>
        <b-button
          variant="primary"
          @click="confirmDelete"
        >
          Xóa
        </b-button>
      </template>

    </b-modal>
    <!-- END - Product Modal Delete -->

    <!-- STAT - Print form -->
    <print-form-input-order />
    <!-- END - Print form -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import {
  formatISOtoVNI,
} from '@core/utils/filter'
import PrintFormInputOrder from '@core/components/print-form/PrintFormInputOrder.vue'
import WarehousesInputListSearch from './components/WarehousesInputListSearch.vue'
import {
  WAREHOUSEINPUT,
  // GETTERS
  RECEIPTS_GETTER,
  // ACTIONS
  GET_RECEIPTS_ACTION,
  EXPORT_RECEIPTS_ACTION,
  REMOVE_RECEIPT_ACTION,
  PRINT_OUT_IN_PUT_ORDER_ACTION,
} from '../store-module/type'

export default {
  components: {
    WarehousesInputListSearch,
    PrintFormInputOrder,
  },
  data() {
    return {
      isDeleteModalShow: false,

      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      billNumber: '',
      inputTypes: '',
      selectedReceiptId: '',
      selectedReceiptType: '',
      selectedReceiptIndex: '',
      selectedReceiptCode: '',
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },
      receipts: [],
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      columns: [
        {
          label: 'Ngày',
          field: 'transDate',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã nhập hàng',
          field: 'transCode',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-left',
          tdClass: 'text-right',
        },
        {
          label: 'Số tiền',
          field: 'price',
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-left',
          tdClass: 'text-right',
        },
        {
          label: 'Ghi chú',
          field: 'note',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Thao tác',
          field: 'feature',
          thClass: 'text-left',
          tdClass: 'text-center',
          width: '100px',
        },
      ],
    }
  },

  computed: {
    ...mapGetters(WAREHOUSEINPUT, [
      RECEIPTS_GETTER,
    ]),
    getReceipts() {
      if (this.RECEIPTS_GETTER.content) {
        return this.RECEIPTS_GETTER.content.map(data => ({
          id: data.id,
          transDate: formatISOtoVNI(data.transDate),
          transCode: data.transCode,
          redInvoiceNo: data.redInvoiceNo,
          internalNumber: data.internalNumber,
          quantity: this.$formatNumberToLocale(data.totalQuantity),
          receiptQuantity: data.totalQuantity,
          price: this.$formatNumberToLocale(data.totalAmount),
          receiptPrice: data.totalAmount,
          note: data.note,
          feature: '',
          receiptType: data.receiptType,
          poId: data.poId || 0,
        }))
      }
      return []
    },
    totalQuantity() {
      return this.$formatNumberToLocale(this.receipts.reduce((accum, item) => accum + Number(item.receiptQuantity), 0))
    },
    totalPrice() {
      return this.$formatNumberToLocale(this.receipts.reduce((accum, item) => accum + Number(item.receiptPrice), 0))
    },
    receiptPagination() {
      if (this.RECEIPTS_GETTER) {
        return this.RECEIPTS_GETTER
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.elementSize) - this.elementSize + 1
      const maxPageSize = (this.elementSize * this.pageNumber) > this.receiptPagination.totalElements
        ? this.receiptPagination.totalElements : (this.elementSize * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.receiptPagination.totalElements} mục`
    },
  },

  watch: {
    getReceipts() {
      this.receipts = [...this.getReceipts]
    },
  },

  mounted() {
    resizeAbleTable()
  },

  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPTS_ACTION,
      EXPORT_RECEIPTS_ACTION,
      REMOVE_RECEIPT_ACTION,
      PRINT_OUT_IN_PUT_ORDER_ACTION,
    ]),

    onClickCreateButton() {
      this.$router.push({ name: 'warehouses-input-create' })
    },
    onClickUpdateButton(id, type, poId) {
      this.$router.push({
        name: 'warehouses-input-update',
        params: {
          id,
          type,
          poId,
        },
      })
    },
    onClickPrintButton(id) {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_OUT_IN_PUT_ORDER_ACTION({
        data: {
          transCode: id,
          params: { ...this.decentralization },
        },
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },
    onClickDeleteButton(id, type, date, index, code) {
      this.selectedReceiptId = id
      this.selectedReceiptType = type
      this.selectedReceiptIndex = index
      this.selectedReceiptCode = code
      this.isDeleteModalShow = !this.isDeleteModalShow
    },
    confirmDelete() {
      this.REMOVE_RECEIPT_ACTION(`${this.selectedReceiptId}?type=${this.selectedReceiptType}&formId=5&ctrlId=7`)
      this.isDeleteModalShow = !this.isDeleteModalShow
      this.receipts.splice(this.selectedReceiptIndex, 1)
      this.receiptPagination.totalElements -= 1
    },
    onPaginationChange() {
      this.GET_RECEIPTS_ACTION(this.paginationData)
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
    updatePageNumber() {
      this.pageNumber = 1
    },
  },
}
</script>
