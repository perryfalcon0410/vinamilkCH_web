<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <warehouses-input-list-search />
    <!-- END - Search -->

    <!-- START - Product  list -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form-row class="justify-content-between align-items-center border-bottom p-1">
        <strong
          class="text-primary"
        >
          Danh sách phiếu nhập hàng
        </strong>
        <b-button
          class="rounded"
          size="md"
          variant="primary"
          @click="onClickCreateButton"
        >
          <b-icon-plus />
          Thêm mới
        </b-button>
      </b-form-row>
      <!-- END - Title -->

      <!-- START - Table -->
      <b-col
        class="py-1"
      >
        <vue-good-table
          :columns="columns"
          :rows="receipts"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true
          }"
          compact-mode
          line-numbers
        >
          <!-- START - Column -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'feature'"
              align-h="center"
            >
              <b-icon-bricks />
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
              align-h="center"
            >
              <b-button
                variant="light"
                class="rounded-circle p-1 ml-1"
                @click="onClickPrintButton(props.row.id)"
              >
                <b-icon-printer
                  color="blue"
                />
              </b-button>
              <b-button
                variant="light"
                class="rounded-circle ml-1 p-1"
                @click="onClickUpdateButton(props.row.id, props.row.receiptType)"
              >
                <div>
                  <b-icon-eye-fill
                    color="blue"
                  />
                </div>
              </b-button>
              <b-button
                variant="light"
                class="rounded-circle ml-1 p-1"
                @click="onClickDeleteButton(props.row.id, props.row.receiptType, props.row.transDate)"
              >
                <b-icon-trash-fill
                  color="red"
                />
              </b-button>
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
              v-if="props.column.field === 'quantity'"
              class="mx-0"
              align-h="end"
            >
              {{ totalQuantity }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'price'"
              class="mx-0"
              align-h="end"
            >
              {{ totalPrice }}
            </b-row>
          </template>
          <!-- START - Column filter -->
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
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatDateToLocale } from '@core/utils/filter'
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

      fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDate: new Date(),
      billNumber: '',
      inputTypes: '',
      selectedReceiptId: '',
      selectedReceiptType: '',

      columns: [
        {
          label: 'Ngày',
          field: 'transDate',
          sortable: false,
        },
        {
          label: 'Mã nhập hàng',
          field: 'transCode',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số tiền',
          field: 'price',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
        },
      ],
    }
  },

  computed: {
    receipts() {
      return this.RECEIPTS_GETTER().map(data => ({
        id: data.id,
        transDate: formatDateToLocale(data.transDate),
        transCode: data.transCode,
        redInvoiceNo: data.redInvoiceNo,
        internalNumber: data.internalNumber,
        quantity: data.totalQuantity,
        price: data.totalAmount,
        note: data.note,
        feature: '',
        receiptType: data.receiptType,
        poId: data.poId,
      }))
    },
    totalQuantity() {
      return this.receipts.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
    totalPrice() {
      return this.receipts.reduce((accum, item) => accum + Number(item.price), 0)
    },
  },

  mounted() {
    this.GET_RECEIPTS_ACTION()
  },

  methods: {
    ...mapGetters(WAREHOUSEINPUT, [
      RECEIPTS_GETTER,
    ]),
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPTS_ACTION,
      EXPORT_RECEIPTS_ACTION,
      REMOVE_RECEIPT_ACTION,
      PRINT_WAREHOUSES_INPUT_ACTION,
    ]),

    onClickCreateButton() {
      this.$router.push({ name: 'warehouses-input-create' })
    },
    onClickUpdateButton(id, type) {
      this.$router.push({
        name: 'warehouses-input-update',
        params: {
          id,
          type,
        },
      })
    },
    onClickPrintButton(id) {
      const params = {
        transCode: id,
      }
      this.PRINT_WAREHOUSES_INPUT_ACTION(params)
    },
    onClickDeleteButton(id, type, date) {
      this.selectedReceiptId = id
      this.selectedReceiptType = type
      if (type === 1) { // Loại giao dịch nhập điều chỉnh
        toasts.error('Bạn không được phép xóa giao dịch nhập điều chỉnh')
      } else if (date === formatDateToLocale(new Date())) {
        this.isDeleteModalShow = !this.isDeleteModalShow
      } else {
        toasts.error('Đã quá thời hạn chỉnh sửa')
      }
    },
    confirmDelete() {
      this.REMOVE_RECEIPT_ACTION(`${this.selectedReceiptId}?type=${this.selectedReceiptType}`)
      this.isDeleteModalShow = !this.isDeleteModalShow
    },
  },
}
</script>
