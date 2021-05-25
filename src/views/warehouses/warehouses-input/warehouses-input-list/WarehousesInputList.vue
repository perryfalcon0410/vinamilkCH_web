<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <warehouses-input-list-search
      @updateSearchData="paginationData = {
        ...paginationData,
        ...$event }"
    />
    <!-- END - Search -->

    <!-- START - Product  list -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-row
        class="justify-content-between align-items-center border-bottom px-1 mx-0"
        style="padding: 5px 0"
      >
        <strong
          class="text-brand-1"
        >
          Danh sách phiếu nhập hàng
        </strong>
        <b-button
          class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
          variant="someThing"
          @click="onClickCreateButton"
        >
          <b-icon-plus
            scale="2"
            class="mr-05"
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
            <b-row
              v-if="props.column.field === 'feature'"
              class="mx-0"
            >
              <b-icon-bricks
                v-b-popover.hover="'Thao tác'"
                scale="1.3"
                class="ml-3"
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
                @click="onClickPrintButton(props.row.id)"
              />
              <b-icon-eye-fill
                v-b-popover.hover.top="'Xem chi tiết'"
                class="cursor-pointer ml-1"
                scale="1.4"
                @click="onClickUpdateButton(props.row.id, props.row.receiptType, props.row.poId)"
              />
              <b-icon-trash-fill
                v-b-popover.hover.top="'Xóa'"
                class="cursor-pointer ml-1"
                color="red"
                scale="1.4"
                @click="onClickDeleteButton(props.row.id, props.row.receiptType, props.row.transDate, props.row.originalIndex)"
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
                <span
                  class="text-nowrap"
                >{{ pageNumber === 1 ? 1 : (pageNumber * elementSize) - elementSize +1 }}
                  -
                  {{ (elementSize * pageNumber) > receiptPagination.totalElements ?
                    receiptPagination.totalElements : (elementSize * pageNumber) }}
                  của {{ receiptPagination.totalElements }} mục </span>
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
      Bạn có muốn xóa đợt nhập hàng?
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
  </b-container>
</template>

<script>
import warehousesData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  formatISOtoVNI, reverseVniDate,
} from '@core/utils/filter'
import toasts from '@core/utils/toasts/toasts'
import WarehousesInputListSearch from './components/WarehousesInputListSearch.vue'
import {
  WAREHOUSEINPUT,
  // GETTERS
  RECEIPTS_GETTER,
  // ACTIONS
  GET_RECEIPTS_ACTION,
  EXPORT_RECEIPTS_ACTION,
  REMOVE_RECEIPT_ACTION,
  PRINT_WAREHOUSES_INPUT_ACTION,
} from '../store-module/type'

export default {
  components: {
    WarehousesInputListSearch,
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
      elementSize: warehousesData.pagination[0],
      pageNumber: 1,
      paginationOptions: warehousesData.pagination,
      paginationData: {},
      receipts: [],

      columns: [
        {
          label: 'Ngày',
          field: 'transDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mã nhập hàng',
          field: 'transCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          type: 'number',
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
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số tiền',
          field: 'price',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-right',
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
          thClass: 'text-center',
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
  },

  watch: {
    getReceipts() {
      this.receipts = [...this.getReceipts]
    },
    pageNumber() {
      this.paginationData.page = this.pageNumber - 1
      this.onPaginationChange()
    },
    elementSize() {
      this.paginationData.size = this.elementSize
      this.onPaginationChange()
    },
    paginationData() {
      this.pageNumber = 1
      this.onPaginationChange()
    },
  },

  mounted() {
    this.GET_RECEIPTS_ACTION({
      fromDate: reverseVniDate(this.fromDate),
      toDate: reverseVniDate(this.toDate),
      formId: 5,
      ctrlId: 7,
    })
  },

  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPTS_ACTION,
      EXPORT_RECEIPTS_ACTION,
      REMOVE_RECEIPT_ACTION,
      PRINT_WAREHOUSES_INPUT_ACTION,
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
      const params = {
        transCode: id,
      }
      this.PRINT_WAREHOUSES_INPUT_ACTION(params)
    },
    onClickDeleteButton(id, type, date, index) {
      this.selectedReceiptId = id
      this.selectedReceiptType = type
      this.selectedReceiptIndex = index
      if (type === 1) { // Loại giao dịch nhập điều chỉnh
        toasts.error('Bạn không được phép xóa giao dịch nhập điều chỉnh')
      } else if (date === formatISOtoVNI(new Date())) {
        this.isDeleteModalShow = !this.isDeleteModalShow
      } else {
        toasts.error('Đã quá thời hạn xóa')
      }
    },
    confirmDelete() {
      this.REMOVE_RECEIPT_ACTION(`${this.selectedReceiptId}?type=${this.selectedReceiptType}&formId=5&ctrlId=7`)
      this.isDeleteModalShow = !this.isDeleteModalShow
      this.receipts.splice(this.selectedReceiptIndex, 1)
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
  },
}
</script>
