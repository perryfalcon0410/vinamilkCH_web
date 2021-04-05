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
            label="Loại nhập"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
            />
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

    <!-- START - Product Import list -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form-row class="justify-content-between align-items-center border-bottom p-1">
        <label
          for="listProduct"
          class="text-primary"
        >
          Danh sách phiếu nhập hàng
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
          :rows="rows"
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
            <div v-if="props.column.field === 'ArchiveImportFeature'">
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
            <div v-if="props.column.field === 'ArchiveImportFeature'">
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
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Feature -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->

    </b-form>
    <!-- END - Product Import list -->

    <!-- START - Import Product Modal Delete -->
    <b-modal
      id="modal-delete"
      title="Thông báo"
    >
      Bạn có muốn xóa đợt nhập hàng?
    </b-modal>
    <!-- END - Import Product Modal Delete -->
  </b-container>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

export default {
  components: {
    VueGoodTable,
  },
  data() {
    return {
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      inputValueBillNumber: '',
      columns: [
        {
          label: 'Ngày',
          field: 'ArchiveImportDate',
          sortable: false,
        },
        {
          label: 'Mã nhập hàng',
          field: 'ArchiveImportID',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'ArchiveImportBillNumber',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số nội bộ',
          field: 'ArchiveImportInternalNumber',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'ArchiveImportAmount',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số tiền',
          field: 'ArchiveImportMoney',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Ghi chú',
          field: 'ArchiveImportNote',
          sortable: false,
        },
        {
          label: 'Chức năng',
          field: 'ArchiveImportFeature',
          sortable: false,
        },
      ],
      rows: [
        {
          ArchiveImportDate: '',
          ArchiveImportID: '',
          ArchiveImportBillNumber: '',
          ArchiveImportInternalNumber: '',
          ArchiveImportAmount: '6800',
          ArchiveImportMoney: '250.300.000',
          ArchiveImportNote: '',
          ArchiveImportFeature: '',
        },
        {
          ArchiveImportDate: '01/10/2020',
          ArchiveImportID: 'CA.CH40235.002',
          ArchiveImportBillNumber: 'IN20201028',
          ArchiveImportInternalNumber: 'IN.CH40235.001',
          ArchiveImportAmount: '1020',
          ArchiveImportMoney: '25.300.000',
          ArchiveImportNote: '',
          ArchiveImportFeature: 'Chỉnh sửa',
        },
        {
          ArchiveImportDate: '01/10/2020',
          ArchiveImportID: 'CA.CH40235.002',
          ArchiveImportBillNumber: 'IN20201028',
          ArchiveImportInternalNumber: 'IN.CH40235.001',
          ArchiveImportAmount: '1020',
          ArchiveImportMoney: '25.300.000',
          ArchiveImportNote: '',
          ArchiveImportFeature: 'Chỉnh sửa',
        },
        {
          ArchiveImportDate: '01/10/2020',
          ArchiveImportID: 'CA.CH40235.002',
          ArchiveImportBillNumber: 'IN20201028',
          ArchiveImportInternalNumber: 'IN.CH40235.001',
          ArchiveImportAmount: '1020',
          ArchiveImportMoney: '25.300.000',
          ArchiveImportNote: '',
          ArchiveImportFeature: 'Chỉnh sửa',
        },
        {
          ArchiveImportDate: '01/10/2020',
          ArchiveImportID: 'CA.CH40235.002',
          ArchiveImportBillNumber: 'IN20201028',
          ArchiveImportInternalNumber: 'IN.CH40235.001',
          ArchiveImportAmount: '1020',
          ArchiveImportMoney: '25.300.000',
          ArchiveImportNote: '',
          ArchiveImportFeature: 'Chỉnh sửa',
        },
        {
          ArchiveImportDate: '01/10/2020',
          ArchiveImportID: 'CA.CH40235.002',
          ArchiveImportBillNumber: 'IN20201028',
          ArchiveImportInternalNumber: 'IN.CH40235.001',
          ArchiveImportAmount: '1020',
          ArchiveImportMoney: '25.300.000',
          ArchiveImportNote: '',
          ArchiveImportFeature: 'Chỉnh sửa',
        },
        {
          ArchiveImportDate: '01/10/2020',
          ArchiveImportID: 'CA.CH40235.002',
          ArchiveImportBillNumber: 'IN20201028',
          ArchiveImportInternalNumber: 'IN.CH40235.001',
          ArchiveImportAmount: '1020',
          ArchiveImportMoney: '25.300.000',
          ArchiveImportNote: '',
          ArchiveImportFeature: 'Chỉnh sửa',
        },
      ],
    }
  },
  computed: {
    stateInputBillNumber() {
      const validBillNumber = /^(\d{0,20})$/
      const result = validBillNumber.test(this.inputValueBillNumber)
      if (this.inputValueBillNumber.length >= 1) {
        return result
      }
      return null
    },
  },
  methods: {
    onClickCreateButton() {
      this.$router.push({ name: 'warehouses-input-create' })
    },
    onClickUpdateButton() {
      this.$router.push({ name: 'warehouses-input-update' })
    },
  },
}
</script>
