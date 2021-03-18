<template>
  <!-- POPUP Voucher START -->
  <b-modal
    size="xl"
    title="Chọn voucher"
    :visible="visible"
    busy="false"
  >
    <p class="ml-3">
      Voucher
    </p>
    <!-- START - Search -->
    <b-input-group class="input-group-merge my-2 px-3">
      <b-input-group-prepend is-text>
        <b-icon-search />
      </b-input-group-prepend>
      <b-form-input
        v-model="searchTerm"
        type="text"
        placeholder="Nhập mã/ tên/ serial"
        maxlength="20"
      />
    </b-input-group>
    <!-- END - Search -->

    <!-- Start table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      class="px-3"
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
  </b-modal>
  <!-- POPUP VOUCHER End -->
</template>

<script>

import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import Vue from 'vue'

Vue.use(VueGoodTablePlugin)

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
    },

  },
  data() {
    return {
      searchTerm: '',
      columns: [
        {
          label: 'Mã chương trình voucher',
          field: 'Code',
          sortable: false,
        },
        {
          label: 'Tên chương trình voucher',
          field: 'ProgramName',
          sortable: false,
        },
        {
          label: 'Mã voucher',
          field: 'VoucherCode',
          sortable: false,
        },
        {
          label: 'Tên voucher',
          field: 'VoucherName',
          sortable: false,
        },
        {
          label: 'Số serial',
          field: 'ArchiveExportAmount',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Mệnh giá',
          field: 'Denominations',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thời gian hiệu lực',
          field: 'Time',
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
          Code: 'PHVC0001',
          ProgramName: 'PHVC0002',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '649268',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0003',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '54349268',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0004',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '4549268',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '3549268',
          Denominations: '50,000',
          Time: '01/11/2021 - 30/11/2021',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '43249268',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '454268',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
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
