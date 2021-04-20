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
            label-for="billNumber"
          >
            <b-form-input
              id="billNumber"
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
              id="fromDate"
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
            label-for="toDate"
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
            label-for="inputType"
          >
            <b-form-select
              id="inputType"
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
            label-for="searchButton"
          >
            <b-button
              id="searchButton"
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
          :rows="exportWarehouses"
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
              <div v-show="props.index > 0">
                <b-button
                  variant="light"
                  class="rounded-circle p-1 ml-1"
                  @click="onClickPrintButton(props.index)"
                >
                  <b-icon-printer
                    color="blue"
                  />
                </b-button>
                <b-button
                  variant="light"
                  class="rounded-circle ml-1 p-1"
                  @click="onClickUpdateButton(props.row.id,props.row.type)"
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
      id="deleteModal"
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

import {
  EXPORT,
  GET_EXPORTS_GETTER,
  GET_EXPORTS_ACTION,
  PRINT_EXPORT_ACTION,
} from '../store-module/type'

export default {
  components: {
  },
  data() {
    return {
      inputValueBillNumber: '',
      columns: [
        {
          label: 'ID',
          field: 'id',
          hidden: true,
        },
        {
          label: 'Ngày',
          field: 'date',
          sortable: false,
        },
        {
          label: 'Mã xuất hàng',
          field: 'code',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'billNumber',
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
      searchOptions: {
        redInvoiceNo: '',
        fromDate: '',
        toDate: '',
        type: '',
        pageSize: 10,
        pageNumber: 1,
      },
      exportWarehouses: [],
    }
  },
  computed: {
    receiptExports() {
      const datas = this.GET_EXPORTS_GETTER()
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
        id: data.id,
        date: data.transDate === '' ? '' : new Date(data.transDate).toLocaleDateString('vi-VN', options),
        code: data.transCode,
        billNumber: data.redInvoiceNo,
        internalNumber: data.internalNumber,
        quantity: Number(data.totalQuantity).toLocaleString('vi-VN'),
        price: Number(data.totalAmount).toLocaleString('vi-VN'),
        note: data.note,
        feature: 'Chỉnh sửa',
        type: data.receiptType,
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
  watch: {
    receiptExports() {
      this.exportWarehouses = [...this.receiptExports]
    },
  },
  mounted() {
    this.GET_EXPORTS_ACTION(this.searchOptions)
  },
  methods: {
    ...mapState(EXPORT, {
      successStatusDelete: state => state.delete.success,
    }),
    ...mapGetters(EXPORT, [
      GET_EXPORTS_GETTER,
    ]),
    ...mapActions(EXPORT, [
      GET_EXPORTS_ACTION,
      PRINT_EXPORT_ACTION,
    ]),
    selectedRowsChange(params) {
      this.receiptExportSelected = params.selectedRows.map(data => data.id)
    },
    onClickCreateButton() {
      this.$router.push({ name: 'warehouses-output-create' })
    },
    onClickUpdateButton(id, type) {
      this.$router.push({
        name: 'warehouses-output-update',
        params: {
          id,
          type,
        },
      })
    },
    onClickPrintButton(itemIndex) {
      const params = {
        transCode: this.receiptExports[itemIndex].Id,
      }
      this.PRINT_EXPORT_ACTION(params)
    },
  },
}
</script>
