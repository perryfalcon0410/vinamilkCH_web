<template>
  <b-container
    fluid
    class="d-flex flex-column p-1"
  >
    <!-- START - Search -->
    <b-col class="bg-primary shadow-lg rounded px-0 pt-1">
      <b-form class="bg-white rounded">
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
              label="Loại xuất "
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
    </b-col>
    <!-- END - Search -->

    <!-- START - Product Export list -->
    <b-col class="px-0 my-1 bg-primary shadow-lg rounded">
      <b-form class="bg-white rounded mt-1 pb-1">
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
                <b-button
                  variant="info"
                  class="rounded-circle ml-1 p-1 "
                >
                  <b-icon-pencil-fill
                    color="blue"
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
    </b-col>
    <!-- END - Product Export list -->
  </b-container>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
// import the styles
import 'vue-good-table/dist/vue-good-table.css'

export default {
  name: 'ArchiveExportList',
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
          field: 'ArchiveExportAmount',
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
      rows: [
        {
          ArchiveExportDate: '',
          ArchiveExportID: '',
          ArchiveExportBillNumber: '',
          ArchiveExportInternalNumber: '',
          ArchiveExportAmount: '6800',
          ArchiveExportMoney: '250.300.000',
          ArchiveExportNote: '',
          ArchiveExportFeature: '',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          ArchiveExportFeature: 'Chỉnh sửa',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          ArchiveExportFeature: 'Chỉnh sửa',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          ArchiveExportFeature: 'Chỉnh sửa',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          ArchiveExportFeature: 'Chỉnh sửa',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          ArchiveExportFeature: 'Chỉnh sửa',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          ArchiveExportFeature: 'Chỉnh sửa',
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
}
</script>
