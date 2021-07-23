<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <warehouses-input-list-search
      class="d-print-none"
      @updateSearchData="updateSearchData"
    />
    <!-- END - Search -->

    <!-- START - Product list -->
    <div class="bg-white rounded shadow rounded my-1 d-print-none">
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
          v-if="statusCreateButton().show"
          :disabled="statusCreateButton().disabled"
          class="btn-brand-1 h8 align-items-button-center rounded"
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
          style-class="vgt-table"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="receiptPagination.totalElements"
          :sort-options="{
            enabled: true,
          }"
          @on-sort-change="onSortChange"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
        >
          <!-- START - Empty row -->
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- END - Empty row -->

          <!-- START - Custom column -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'feature'"
              hidden
            >
              <v-icon-manipulation />
            </b-row>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Custom column -->

          <!-- START - Custom row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'feature'"
              class="mx-0"
            >
              <v-icon-printer
                v-if="statusPrintButton().show"
                :disabled="statusPrintButton().disabled"
                @click="onClickPrintButton(props.row)"
              />
              <v-icon-edit
                v-if="statusUpdateButton().show"
                :disabled="statusUpdateButton().disabled"
                class="ml-1"
                popover-position="top"
                @click="onClickUpdateButton(props.row.id, props.row.inputTypes, props.row.poId)"
              />
              <v-icon-remove
                v-show="$formatISOtoVNI(props.row.transDate) === nowDate && statusDeleteButton().show"
                :disabled="statusDeleteButton().disabled"
                class="ml-1"
                @click="onClickDeleteButton(props.row.id, props.row.inputTypes, props.row.originalIndex, props.row.transCode)"
              />
            </b-row>
            <div
              v-else-if="props.column.field === 'quantity' || props.column.field === 'price'"
              style="padding-right: 4px"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Custom row -->

          <!-- START - Custom filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <div
              v-show="receiptPagination.totalElements"
              v-if="props.column.field === 'quantity'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.totalQuantity) }}
            </div>

            <div
              v-show="receiptPagination.totalElements"
              v-else-if="props.column.field === 'price'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.totalPrice) }}
            </div>
          </template>
          <!-- START - Custom filter -->

          <!-- START - Custom Pagination -->
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
          <!-- END - Custom Pagination -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->

    </div>
    <!-- END - Product  list -->

    <!-- START - Product Modal Delete -->
    <b-modal
      v-model="isDeleteModalShow"
      title="Thông báo"
    >
      Bạn có muốn xóa đợt nhập hàng {{ selectedReceiptCode }}?
      <template #modal-footer>
        <b-button
          variant="someThing"
          class="btn-brand-1 aligns-items-button-center"
          @click="confirmDelete"
        >
          Đồng ý
        </b-button>
        <b-button
          class="aligns-items-button-center ml-1"
          @click="isDeleteModalShow = !isDeleteModalShow"
        >
          Đóng
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
  resizeAbleTable,
} from '@core/utils/utils'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  nowDate,
} from '@/@core/utils/filter'
import PrintFormInputOrder from '@core/components/print-form/PrintFormInputOrder.vue'
// Icons
import VIconManipulation from '@core/components/v-icons/IconManipulation.vue'
import VIconRemove from '@/@core/components/v-icons/IconRemove.vue'
import VIconEdit from '@core/components/v-icons/IconEdit.vue'
import VIconPrinter from '@core/components/v-icons/IconPrinter.vue'

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
    VIconEdit,
    VIconManipulation,
    VIconRemove,
    VIconPrinter,
  },

  data() {
    return {
      isDeleteModalShow: false,

      selectedReceiptId: '',
      selectedReceiptType: '',
      selectedReceiptIndex: '',
      selectedReceiptCode: '',
      nowDate: nowDate(),
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
          formatFn: value => this.$formatISOtoVNI(value),
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã nhập hàng',
          field: 'transCode',
          thClass: 'text-nowrap',
        },
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          thClass: 'text-nowrap',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
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
          label: 'Số tiền',
          field: 'price',
          type: 'number',
          thClass: 'text-nowrap',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Loại nhập',
          field: 'inputTypes',
          thClass: 'text-nowrap',
          formatFn: this.$getInputTypeslabel,
        },
        {
          label: 'Ghi chú',
          field: 'note',
          thClass: 'text-nowrap',
          width: '300px',
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'feature',
          thClass: 'text-center',
          tdClass: 'text-center',
          width: '90px',
          sortable: false,
        },
      ],
    }
  },

  computed: {
    ...mapGetters(WAREHOUSEINPUT, [
      RECEIPTS_GETTER,
    ]),
    getReceipts() {
      if (this.RECEIPTS_GETTER.response) {
        return this.RECEIPTS_GETTER.response.content.map(data => ({
          id: data.id,
          transDate: data.transDate,
          transCode: data.transCode,
          redInvoiceNo: data.redInvoiceNo,
          internalNumber: data.internalNumber,
          quantity: data.totalQuantity,
          price: data.totalAmount,
          inputTypes: data.receiptType,
          note: data.note,
          poId: data.poId || 0,
        }))
      }
      return []
    },
    totalInfo() {
      if (this.RECEIPTS_GETTER.info) {
        return this.RECEIPTS_GETTER.info
      }
      return {}
    },
    receiptPagination() {
      if (this.RECEIPTS_GETTER.response) {
        return this.RECEIPTS_GETTER.response
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

    statusCreateButton() {
      return this.$permission('WarehousesInput', 'WarehousesInputCreate')
    },
    statusUpdateButton() {
      return this.$permission('WarehousesInput', 'WarehousesInputUpdate')
    },
    statusDeleteButton() {
      return this.$permission('WarehousesInput', 'WarehousesInputDelete')
    },
    statusPrintButton() {
      return this.$permission('WarehousesInput', 'WarehousesInputPrint')
    },

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
    onClickPrintButton(inputOrderData) {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_OUT_IN_PUT_ORDER_ACTION({
        data: {
          transCode: inputOrderData.id,
          params: { ...this.decentralization, receiptType: inputOrderData.inputTypes },
        },
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },
    onClickDeleteButton(id, type, index, code) {
      this.selectedReceiptId = id
      this.selectedReceiptType = type
      this.selectedReceiptIndex = index
      this.selectedReceiptCode = code
      this.isDeleteModalShow = !this.isDeleteModalShow
    },
    confirmDelete() {
      const paramsDelete = {
        id: this.selectedReceiptId,
        type: this.selectedReceiptType,
      }
      this.REMOVE_RECEIPT_ACTION({
        data: { ...paramsDelete },
        onSuccess: () => {
          this.receipts.splice(this.selectedReceiptIndex, 1)
          this.receiptPagination.totalElements -= 1
        },
      })
      this.isDeleteModalShow = !this.isDeleteModalShow
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
      this.updatePaginationData({ size: params.currentPerPage })
      this.onPaginationChange()
    },
    updateSearchData(event) {
      this.pageNumber = 1
      this.updatePaginationData({
        ...event,
      })
    },
  },
}
</script>
