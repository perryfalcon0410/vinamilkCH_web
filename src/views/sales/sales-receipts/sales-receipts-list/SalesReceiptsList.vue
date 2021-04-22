<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <b-card
      no-body
      class="mb-1"
    >
      <div
        class="m-1 text-primary"
      >
        <strong>
          Tìm kiếm
        </strong>
      </div>

      <b-collapse
        id="accordion-2"
        accordion="my-accordion"
        visible
      >
        <b-card-body>

          <!-- START - Search -->
          <b-form-row
            class="v-search-form border-top"
          >
            <b-col
              xl
              sm="4"
              md="3"
              class="mt-1"
            >
              <b-form-group
                label="Khách hàng"
                label-for="form-input-customer"
              >
                <b-form-input
                  id="form-input-customer"
                />
              </b-form-group>
            </b-col>

            <b-col
              xl
              sm="4"
              md="3"
              class="mt-1"
            >
              <b-form-group
                label="Số hóa đơn"
                label-for="form-input-customer"
              >
                <b-form-input
                  id="form-input-customer"
                  trim
                />
              </b-form-group>
            </b-col>

            <b-col
              xl
              sm="4"
              md="3"
              class="mt-1"
            >
              <b-form-group
                label="Trạng thái"
                label-for="form-input-customer"
              >
                <b-form-select
                  v-model="selected"
                  :options="state"
                />
              </b-form-group>
            </b-col>

            <b-col
              xl
              sm="4"
              md="3"
              class="mt-1"
            >
              <b-form-group
                label="Từ ngày"
                label-for="form-input-date-from"
              >
                <b-form-datepicker
                  id="form-input-date-from"
                  v-model="valueDateFrom"
                  :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                  locale="vi"
                />
              </b-form-group>
            </b-col>

            <b-col
              xl
              sm="4"
              md="3"
              class="mt-1"
            >
              <b-form-group
                label="Đến ngày"
                label-for="form-input-date-to"
              >
                <b-form-datepicker
                  id="form-input-date-to"
                  v-model="valueDateTo"
                  :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                  locale="vi"
                />
              </b-form-group>
            </b-col>

            <b-col
              xl
              sm="4"
              md="3"
              class="mt-1"
            >
              <b-form-group
                label="Tìm kiếm"
                label-for="form-button-search"
              >
                <b-button
                  id="form-button-search"
                  variant="primary"
                  @click="search()"
                >
                  <b-icon-search />
                  Tìm kiếm
                </b-button>
              </b-form-group>
            </b-col>
          </b-form-row>
          <!-- END - Search -->

        </b-card-body>
      </b-collapse>
    </b-card>

    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <div
          class="m-1 text-primary"
        >
          <strong>
            Danh sách hóa đơn bán hàng
          </strong>
        </div>
        <b-button-group>
          <b-button
            class="rounded"
            variant="primary"
          >
            <b-icon-printer-fill />
            in
          </b-button>
        </b-button-group>
      </b-row>
      <!-- End Add Bill -->

      <!-- Start table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="salesReceiptList"
          class="pb-1"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true
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
        >
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'totalValue'"
              class="mx-0"
              align-h="end"
            >
              {{ salesReceiptsTotal.totalAmount }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'payments'"
              class="mx-0"
              align-h="end"
            >
              {{ salesReceiptsTotal.allTotal }}
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
                <b-button
                  v-b-tooltip.hover
                  :title="props.row.note"
                  variant="light"
                  class="rounded-circle p-1 ml-1"
                >
                  <b-icon-file-earmark-excel
                    color="blue"
                  />
                </b-button>
              </span>
            </span>

            <span v-else-if="props.column.field == 'noteHdd'">
              <span>
                <b-button
                  v-b-tooltip.hover
                  :title="props.row.noteHdd"
                  variant="light"
                  class="rounded-circle p-1 ml-1"
                >
                  <b-icon-file-earmark-excel
                    color="blue"
                  />
                </b-button>
              </span>
            </span>

            <span v-else-if="props.column.field == 'press'">
              <span>
                <b-button
                  variant="light"
                  class="rounded-circle p-1 ml-1"
                  @click="showInvoiceDetailModal(props.row.id, props.row.NumberBill)"
                >
                  <b-icon-eye-fill
                    color="blue"
                  />
                </b-button>
              </span>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </b-col>
    <!-- End table -->

    </b-form>
    <invoice-detail-modal
      :visible="isInvoiceDetailModal"
      :information="info"
      :details="detailTable"
      :details-total="detailTableTotal"
      :promotiondetails="promotionTable"
      :discount-details="discountTable"
      @modalIsOff="isOff"
    />
  </b-container>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatDateToLocale } from '@core/utils/filter'
import printOptions from '@/@db/receipt'
import {
  SALESRECEIPTS,
  SALES_RECEIPTS_GETTER,
  SALES_RECEIPTS_DETAIL_GETTER,
  SALES_RECEIPTS_DETAIL_TOTAL_GETTER,
  SALES_RECEIPTS_DISCOUNT_GETTER,
  SALES_RECEIPTS_PROMOTION_GETTER,
  SALES_RECEIPTS_DETAIL_INFOS_GETTER,
  SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER,
  GET_SALES_RECEIPTS_ACTION,
  GET_SALES_RECEIPTS_DETAIL_ACTION,
} from '../store-module/type'

import InvoiceDetailModal from '../components/InvoiceDetailModal.vue'

export default {
  components: {
    InvoiceDetailModal,
  },
  data() {
    return {
      state: printOptions.printOptions,
      isInvoiceDetailModal: false,
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      selected: null,
      columns: [
        {
          label: 'Số hóa đơn',
          field: 'numberBill',
          sortable: false,
        },
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
        },
        {
          label: 'Họ tên',
          field: 'name',
          sortable: false,
        },
        {
          label: 'Ngày bán',
          field: 'dayTime',
          sortable: false,
        },
        {
          label: 'Tổng giá trị',
          field: 'totalValue',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Tiển giảm giá',
          field: 'discountMoney',
          sortable: false,
        },
        {
          label: 'Tiền tích lũy',
          field: 'moneyAccumulated',
          sortable: false,
        },
        {
          label: 'Tiền phải trả',
          field: 'payments',
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
          label: 'In HĐ đỏ',
          field: 'print',
          sortable: false,
        },
        {
          label: 'Công ty',
          field: 'company',
          sortable: false,
        },
        {
          label: 'Mã số thuế',
          field: 'taxCode',
          sortable: false,
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
        },
        {
          label: 'Ghi chú HĐĐ',
          field: 'noteHdd',
          sortable: false,
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
    salesReceiptList() {
      return this.SALES_RECEIPT_GETTER().map(data => ({
        id: data.id,
        numberBill: data.orderNumber,
        customerCode: data.customerNumber,
        name: data.customerName,
        dayTime: formatDateToLocale(data.orderDate),
        totalValue: data.total,
        note: data.note,
        discountMoney: data.discount,
        moneyAccumulated: data.accumulation,
        payments: data.total,
        print: (data.redReceipt === true) ? 'Đã in' : 'Chưa in',
        noteHdd: data.noteRed,
        company: data.comName,
        taxCode: data.taxCode,
        address: data.address,
      }))
    },
    salesReceiptsTotal() {
      return this.SALES_RECEIPTS_INFO_GETTER()
    },

    detailTable() {
      return this.SALES_RECEIPTS_DETAIL_GETTER().map(data => ({
        productCode: data.productCode,
        productName: data.productName,
        unit: data.unit,
        number: data.quantity,
        price: Number(data.pricePerUnit).toLocaleString('vi-VN'),
        intoMoney: Number(data.amount).toLocaleString('vi-VN'),
        discount: Number(data.discount).toLocaleString('vi-VN'),
        bill: Number(data.payment).toLocaleString('vi-VN'),
      }))
    },
    detailTableTotal() {
      return this.SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER()
    },

    discountTable() {
      return this.SALES_RECEIPT_DISCOUNT_GETTER()
    },
    promotionTable() {
      return this.SALES_RECEIPT_PROMOTION_GETTER().map(data => ({
        ProductCode: data.productNumber,
        ProductName: data.productName,
        Number: data.quantity,
        promotionProgram: data.promotionProgramName,
      }))
    },

    // common info in receipt
    info() {
      return this.SALES_RECEIPT_DETAIL_INFOS_GETTER().map(data => ({
        orderNumber: data.orderNumber,
        customerName: data.customerName,
        saleMan: data.saleMan,
        orderDate: data.orderDate,
        total: data.total,
        totalPaid: data.totalPaid,
        balance: data.balance,
      }))
    },
  },
  mounted() {
    this.GET_SALES_RECEIPTS_ACTION()
  },
  methods: {
    ...mapGetters(SALESRECEIPTS, [
      SALES_RECEIPTS_GETTER,
      SALES_RECEIPTS_DETAIL_GETTER,
      SALES_RECEIPTS_DETAIL_TOTAL_GETTER,
      SALES_RECEIPTS_DISCOUNT_GETTER,
      SALES_RECEIPTS_PROMOTION_GETTER,
      SALES_RECEIPTS_DETAIL_INFOS_GETTER,
      SALES_RECEIPTS_DETAIL_TOTAL_INFOS_GETTER,
    ]),
    ...mapActions(SALESRECEIPTS, [
      GET_SALES_RECEIPTS_ACTION,
      GET_SALES_RECEIPTS_DETAIL_ACTION,
    ]),
    showInvoiceDetailModal(id, orderNumber) {
      this.isInvoiceDetailModal = !this.isInvoiceDetailModal
      this.GET_SALES_RECEIPTS_DETAIL_ACTION({ saleOrderId: id, orderNumber })
    },
    isOff(state) {
      this.isInvoiceDetailModal = state
    },
  },
}
</script>
