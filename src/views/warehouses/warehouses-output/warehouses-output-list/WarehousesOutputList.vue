<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <b-form class="bg-white shadow rounded">
      <label
        for="v-search-form"
        class="m-1 text-primary"
      >
        Tìm kiếm
      </label>

      <b-form-row
        class="v-search-form border-top p-1"
      >
        <b-col
          lg="2"
          md
        >
          <b-form-group
            label="Số hóa đơn"
            label-for="form-input-customer"
            :state="stateInputBillNumber"
            invalid-feedback="Chỉ bao gồm ký tự [0-9]"
          >
            <b-form-input
              id="form-input-customer"
              v-model="inputValueBillNumber"
              maxlength="20"
              :state="stateInputBillNumber"
              required
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
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
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
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Loại xuất"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
            >
              <b-form-select-option value="">
                Tất cả
              </b-form-select-option>
              <b-form-select-option value="0">
                Xuất trả hàng
              </b-form-select-option>
              <b-form-select-option value="1">
                Xuất điều chỉnh
              </b-form-select-option>
              <b-form-select-option value="1">
                Xuất vay mượn
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
            label-for="form-button-search"
          >
            <b-button
              id="form-button-search"
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

    <!-- START - Product export list -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form-row class="justify-content-between align-items-center border-bottom p-1">
        <label
          for="listProduct"
          class="text-primary"
        >
          Danh sách phiếu xuất hàng
        </label>
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
        id="listProduct"
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
          <!-- START - label -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.label === 'Chức năng'">
              <b-icon-bricks />
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - label -->

          <!-- START - Feature -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'ArchiveExportFeature'">
              <div v-show="props.index > 0">
                <b-button
                  variant="info"
                  class="rounded-circle p-1 ml-1"
                >
                  <b-icon-printer
                    color="blue"
                  />
                </b-button>
                <b-button
                  variant="info"
                  class="rounded-circle ml-1 p-1"
                  @click="onClickUpdateButton"
                >
                  <b-icon-pencil-fill
                    color="blue"
                  />
                </b-button>
                <b-button
                  v-b-modal.modal-delete
                  variant="info"
                  class="rounded-circle ml-1 p-1"
                >
                  <b-icon-x
                    color="red"
                  />
                </b-button>
              </div>
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Feature -->

        </vue-good-table>
      </b-col>
      <!-- END - Table -->

    </b-form>
    <!-- END - Product Export list -->

    <!-- START - Export Product Modal Delete -->
    <b-modal
      id="modal-delete"
      title="Thông báo"
    >
      Bạn có muốn xóa đợt xuất hàng?
    </b-modal>
    <!-- END - Export Product Modal Delete -->
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
          field: 'ArchiveExportDate',
          sortable: false,
        },
        {
          label: 'Mã xuất hàng',
          field: 'ArchiveExportID',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'ArchiveExportBillNumber',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số nội bộ',
          field: 'ArchiveExportInternalNumber',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'ArchiveExportQuantity',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số tiền',
          field: 'ArchiveExportMoney',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Ghi chú',
          field: 'ArchiveExportNote',
          sortable: false,
        },
        {
          label: 'Chức năng',
          field: 'ArchiveExportFeature',
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
      console.log(datas)
      return datas.map(data => ({
        ID: data.id,
        ArchiveExportDate: data.transDate === '' ? '' : new Date(data.transDate).toLocaleDateString('vi-VN', options),
        ArchiveExportID: data.transCode,
        ArchiveExportBillNumber: data.redInvoiceNo,
        ArchiveExportInternalNumber: data.internalNumber,
        ArchiveExportQuantity: Number(data.totalQuantity).toLocaleString('vi-VN'),
        ArchiveExportMoney: Number(data.totalAmount).toLocaleString('vi-VN'),
        ArchiveExportNote: data.note,
        ArchiveExportFeature: 'Chỉnh sửa',
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
    // navigateToCreate() {
    //   this.$router.push({ name: 'sales-customers-create' })
    // },
    // navigateToUpdate() {
    //   this.$router.push({ name: 'sales-customers-update' })
    // },
  },
}
</script>
