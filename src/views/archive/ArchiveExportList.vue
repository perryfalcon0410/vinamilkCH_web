<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <!-- START - Search -->
    <div class="m-1 bg-info shadow-lg rounded">
      <b-form class="bg-white rounded mt-1">
        <label
          for="v-search-form"
          class="m-1 text-info"
        >
          Tìm kiếm
        </label>

        <b-form-row
          class="v-search-form border-top p-1"
        >
          <b-col cols="2">
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

          <b-col cols="2">
            <b-form-group
              class="ml-1"
              label="Thời gian xuất hàng"
              label-for="form-input-date"
            >
              <b-form-datepicker
                id="form-input-date"
                placeholder="chọn từ ngày - đến ngày"
              />
            </b-form-group>
          </b-col>

          <b-col cols="2">
            <b-form-group
              class="ml-1"
              label="Loại xuất"
              label-for="form-input-customer-group"
            >
              <b-form-select
                id="form-input-customer-group"
              />
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group
              class="ml-1"
              label="Tìm kiếm"
              label-for="form-button-search"
            >
              <b-button
                id="form-button-search"
                variant="info"
              >
                <b-icon-search class="mr-1" />
                Tìm kiếm
              </b-button>
            </b-form-group>

          </b-col>

        </b-form-row>
      </b-form>
    </div>
    <!-- END - Search -->

    <!-- START - Customer list -->
    <div class="v-search mx-1 mb-1 bg-info shadow-lg rounded">
      <b-form class="bg-white rounded mt-1 pb-1">
        <b-form-row class="justify-content-between align-items-center border-bottom p-1">
          <label
            for=""
            class="text-info"
          >
            Danh sách phiếu xuất hàng
          </label>
          <b-button
            class="rounded"
            size="md"
            variant="info"
          >
            <b-icon-plus />
            Thêm mới
          </b-button>
        </b-form-row>

        <div class="m-1 mt-1  ">
          <vue-good-table
            :columns="columns"
            :rows="rows"
            style-class="vgt-table striped"
            :pagination-options="{
              enabled: true
            }"
            compact-mode
            line-numbers="true"
          >
            <!-- START - label -->
            <template
              slot="table-column"
              slot-scope="props"
            >
              <span v-if="props.column.label === 'Chức năng'">
                <b-icon-bricks />
              </span>
              <span v-else>
                {{ props.column.label }}
              </span>
            </template>
            <!-- END - label -->

            <!-- START - Edit -->
            <template
              slot="table-row"
              slot-scope="props"
            >
              <span v-if="props.column.field === 'ArchiveExportFeature'">
                <b-icon-pencil-fill />
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          <!-- END - Edit -->

          </vue-good-table>
        </div>
      </b-form>
    </div>
    <!-- END - Customer list -->
  </b-container>
</template>

<script>
import Vue from 'vue'

import VueGoodTablePlugin from 'vue-good-table'
// import the styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin)

export default {
  name: 'ArchiveExportList',
  components: {
  },
  data() {
    return {
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
          customerFeature: '',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          customerFeature: 'Chỉnh sửa',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          customerFeature: 'Chỉnh sửa',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          customerFeature: 'Chỉnh sửa',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          customerFeature: 'Chỉnh sửa',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          customerFeature: 'Chỉnh sửa',
        },
        {
          ArchiveExportDate: '01/10/2020',
          ArchiveExportID: 'CA.CH40235.002',
          ArchiveExportBillNumber: 'IN20201028',
          ArchiveExportInternalNumber: 'IN.CH40235.001',
          ArchiveExportAmount: '1020',
          ArchiveExportMoney: '25.300.000',
          ArchiveExportNote: '',
          customerFeature: 'Chỉnh sửa',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
