<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <b-form class="bg-white shadow rounded">
      <div
        class="m-1 text-primary"
      >
        <strong>
          Tìm kiếm
        </strong>
      </div>

      <b-form-row
        class="border-top p-1"
      >
        <b-col
          lg="2"
          md
        >
          <b-form-group
            label="Số hóa đơn"
            label-for="BillNumber"
          >
            <b-form-input
              id="BillNumber"
              v-model="billNumber"
              maxlength="20"
              trim
            />
          </b-form-group>
        </b-col>

        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Từ ngày"
            label-for="FromDate"
          >
            <b-form-datepicker
              id="FromDate"
              v-model="fromDate"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>

        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Đến ngày"
            label-for="ToDate"
          >
            <b-form-datepicker
              id="ToDate"
              v-model="toDate"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>

        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Loại xuất"
            label-for="InputType"
          >
            <b-form-select
              id="InputType"
              v-model="inputTypes"
            >
              <b-form-select-option value="">
                Tất cả
              </b-form-select-option>
              <b-form-select-option value="1">
                xuất trả hàng
              </b-form-select-option>
              <b-form-select-option value="2">
                xuất điều chỉnh
              </b-form-select-option>
              <b-form-select-option value="3">
                xuất vay mượn
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col
          md="12"
          lg="4"
        >
          <b-form-group
            class="ml-lg-1"
            label="Tìm kiếm"
            label-for="SearchButton"
          >
            <b-button
              id="SearchButton"
              variant="primary"
            >
              <b-icon-search class="mr-1" />
              Tìm kiếm
            </b-button>
          </b-form-group>
        </b-col>

      </b-form-row>
    </b-form>
    <!-- END - Search -->

    <!-- START - Product  list -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form-row class="justify-content-between align-items-center border-bottom p-1">
        <strong
          class="text-primary"
        >
          Danh sách phiếu xuất hàng
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
          :rows="receiptExports"
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
              v-if="props.column.field === 'Feature'"
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
              v-if="props.column.field === 'Feature'"
              align-h="center"
            >
              <div v-show="props.index > 0">
                <b-button
                  variant="light"
                  class="rounded-circle p-1 ml-1"
                >
                  <b-icon-printer
                    color="blue"
                  />
                </b-button>
                <b-button
                  variant="light"
                  class="rounded-circle ml-1 p-1"
                  @click="onClickUpdateButton"
                >
                  <b-icon-pencil-fill
                    color="blue"
                  />
                </b-button>
                <b-button
                  v-b-modal.DeleteModal
                  variant="light"
                  class="rounded-circle ml-1 p-1"
                >
                  <b-icon-trash-fill
                    color="red"
                  />
                </b-button>
              </div>
            </b-row>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->

        </vue-good-table>
      </b-col>
      <!-- END - Table -->

    </b-form>
    <!-- END - Product  list -->

    <!-- START - Product Modal Delete -->
    <b-modal
      id="DeleteModal"
      title="Thông báo"
    >
      Bạn có muốn xóa đợt xuất hàng?
    </b-modal>
    <!-- END - Product Modal Delete -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState,
} from 'vuex'
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import {
  RECEIPTEXPORT,
  RECEIPTEXPORTS_GETTER,
  GET_RECEIPTEXPORTS_ACTION,
} from '../store-module/type'

export default {
  components: {
    VueGoodTable,
  },
  data() {
    return {
      valueDateFrom: new Date(),
      valueDateTo: new Date(),
      inputValueBillNumber: '',
      columns: [
        {
          label: 'ID',
          field: 'ID',
          hidden: true,
        },
        {
          label: 'Ngày',
          field: 'Date',
          sortable: false,
        },
        {
          label: 'Mã xuất hàng',
          field: 'Id',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'BillNumber',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số nội bộ',
          field: 'InternalNumber',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số tiền',
          field: 'Price',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Ghi chú',
          field: 'Note',
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'Feature',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    receiptExports() {
      const datas = this.RECEIPTEXPORTS_GETTER()
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
      const totalQuantity = datas.reduce((accum, item) => accum + Number(item.totalQuantity), 0)
      const totalMoney = datas.reduce((accum, item) => accum + Number(item.totalAmount), 0)
      const firstItem = {
        id: '',
        transDate: '',
        transCode: '',
        redInvoiceNo: '',
        internalNumber: '',
        totalQuantity,
        totalAmount: totalMoney,
        note: '',
      }

      datas.unshift(firstItem)
      return datas.map(data => ({
        ID: data.id,
        Date: data.transDate === '' ? '' : new Date(data.transDate).toLocaleDateString('vi-VN', options),
        Id: data.transCode,
        BillNumber: data.redInvoiceNo,
        InternalNumber: data.internalNumber,
        Quantity: Number(data.totalQuantity).toLocaleString('vi-VN'),
        Price: Number(data.totalAmount).toLocaleString('vi-VN'),
        Note: data.note,
        Feature: 'Chỉnh sửa',
      }))
    },
  },
  stateInputBillNumber() {
    const validBillNumber = /^(\d{0,20})$/
    const result = validBillNumber.test(this.inputValueBillNumber)
    if (this.inputValueBillNumber.length >= 1) {
      return result
    }
    return null
  },
  mounted() {
    this.GET_RECEIPTEXPORTS_ACTION({})
  },
  methods: {
    ...mapState(RECEIPTEXPORT, {
      successStatusDelete: state => state.delete.success,
    }),
    ...mapGetters(RECEIPTEXPORT, [
      RECEIPTEXPORTS_GETTER,
    ]),
    ...mapActions(RECEIPTEXPORT, [
      GET_RECEIPTEXPORTS_ACTION,
    ]),
    selectedRowsChange(params) {
      this.receiptExportSelected = params.selectedRows.map(data => data.id)
    },
    onClickCreateButton() {
      this.$router.push({ name: 'warehouses-output-create' })
    },
    onClickUpdateButton() {
      this.$router.push({ name: 'warehouses-output-update' })
    },
  },
}
</script>
