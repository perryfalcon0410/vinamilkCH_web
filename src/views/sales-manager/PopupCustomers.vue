<template>
  <!-- POPUP Find Customers START -->
  <b-modal
    size="xl"
    title="Tìm kiếm khách hàng"
    :visible="visible"
    hide-footer="true"
  >
    <!-- START - Search -->
    <b-input-group class="input-group-merge my-2 px-3">
      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group
          label="Khách hàng"
          label-for="form-input-customer"
        >
          <b-form-input
            id="form-input-customer"
            placeholder=" Nhập mã/họ tên"
            trim
          />
        </b-form-group>
      </b-col>

      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group
          label="Số điện thoại"
          label-for="form-input-date-from"
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
      >
        <b-form-group
          label="CMND"
          label-for="form-input-date-to"
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
    </b-input-group>
    <!-- END - Search -->

    <!-- Start table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      class="px-4"
      style-class="vgt-table striped"
      :pagination-options="{
        enabled: true
      }"
      compact-mode
      line-numbers
      :search-options="{
        enabled: true,
        externalQuery: searchTerm
      }"
    >
      <template
        slot="table-column"
        slot-scope="props"
      >
        <div
          v-if="props.column.label === 'Chức năng'"
        />
        <div v-else>
          {{ props.column.label }}
        </div>
      </template>

      <template
        slot="table-row"
        slot-scope="props"
      >
        <div v-if="props.column.field === 'Press'">
          <b-button
            variant="info"
            @click="onPress"
          >
            <b-icon-hand-index-thumb />
            Chọn
          </b-button>
        </div>
      </template>
    </vue-good-table>
    <!-- End table -->

    <b-row
      align-h="center"
      class="mt-2"
    >
      <b-button
        @click="visible = !visible"
      >
        <b-row>
          <b-icon-x />
          <h5 class="text-white ">
            Đóng
          </h5>
        </b-row>
      </b-button>
    </b-row>

  </b-modal>
  <!-- POPUP Find Customers End -->
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

export default {
  components: {
    VueGoodTable,
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      modalShow: false,
      searchTerm: '',
      columns: [
        {
          label: 'Mã khách hàng',
          field: 'Code',
          sortable: false,
        },
        {
          label: 'Tên khách hàng',
          field: 'ProgramName',
          sortable: false,
        },
        {
          label: 'Địa chỉ',
          field: 'VoucherCode',
          sortable: false,
        },
        {
          label: 'Số điện thoại',
          field: 'VoucherName',
          sortable: false,
        },
        {
          label: 'Ngày sinh',
          field: 'ArchiveExportAmount',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số CMND',
          field: 'Denominations',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Chức năng',
          field: 'Press',
          sortable: false,
        },
      ],
      rows: [
        {
          Code: 'CUS.001',
          ProgramName: 'Nguyễn xuân diễm',
          VoucherCode: '285 Cách Mạng Tháng Tám, Phường 12, Quận 10, TP.HCM',
          VoucherName: '0913249022',
          ArchiveExportAmount: '28/12/1995',
          Denominations: '212271858',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'CUS.002',
          ProgramName: 'Nguyễn xuân diễm',
          VoucherCode: '161 Trần Quốc Thảo, Phường 9, Quận 3, TP.HCM',
          VoucherName: '0364649982',
          ArchiveExportAmount: '28/12/1995',
          Denominations: '235987146',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'CUS.003',
          ProgramName: 'Đinh nguyễn hồng thắm',
          VoucherCode: '161 Trần Quốc Thảo, Phường 9, Quận 3, TP.HCM',
          VoucherName: '0913249022',
          ArchiveExportAmount: '05/07/1997',
          Denominations: '212271858',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'CUS.004',
          ProgramName: 'Trần xuân diễm',
          VoucherCode: '285 Cách Mạng Tháng Tám, Phường 12, Quận 10, TP.HCM',
          VoucherName: '0979123654',
          ArchiveExportAmount: '05/07/1997',
          Denominations: '235987146',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'CUS.005',
          ProgramName: 'Ngô đình thúy vân',
          VoucherCode: '161 Trần Quốc Thảo, Phường 9, Quận 3, TP.HCM',
          VoucherName: '0913249022',
          ArchiveExportAmount: '01/10/1995',
          Denominations: '234654123',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'CUS.006',
          ProgramName: 'Ưng hạo dân',
          VoucherCode: '161 Trần Quốc Thảo, Phường 9, Quận 3, TP.HCM',
          VoucherName: '0979123654',
          ArchiveExportAmount: '01/10/1995',
          Denominations: '234654123',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'CUS.007',
          ProgramName: 'Ngô bá kiến',
          VoucherCode: '285 Cách Mạng Tháng Tám, Phường 12, Quận 10, TP.HCM',
          VoucherName: '0902345642',
          ArchiveExportAmount: '9/7/1988',
          Denominations: '212271858',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'CUS.008',
          ProgramName: 'Thúy kiều',
          VoucherCode: '285 Cách Mạng Tháng Tám, Phường 12, Quận 10, TP.HCM',
          VoucherName: '0902345642',
          ArchiveExportAmount: '9/7/1988',
          Denominations: '212271858',
          Press: 'Chỉnh sửa',
        },
      ],
    }
  },
  computed: {

  },
  methods: {
    onPress() {
    },
  },
}
</script>
