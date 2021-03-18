<template>
  <!-- POPUP Voucher START -->
  <b-modal
    id="modal-center"
    size="xl"
    :visible="visible"
    hide-footer="true"
    centered
    title="Chọn đơn hàng Online"
  >
    <!-- START - Search -->
    <b-form-row
      class="mt-1 mx-3"
    >
      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group
          label="Số hóa đơn"
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
      >
        <b-form-group
          label="Số hóa đơn"
          label-for="form-input-customer"
        >
          <b-form-select
            v-model="selected"
            :options="optionsStore"
          />
        </b-form-group>

      </b-col>

      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group
          label="Ngày đặt hàng từ"
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
      >
        <b-button
          id="form-button-search"
          class="mt-2"
          variant="primary"
          @click="search()"
        >
          <b-icon-search />
          Tìm kiếm
        </b-button>
      </b-col>
    </b-form-row>

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
            CHỌN ĐƠN
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
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      selected: null,
      optionsStore: [
        { text: 'Chưa xử lý' },
        { text: 'Đã xử lý' },
      ],
      modalShow: false,
      searchTerm: '',
      columns: [
        {
          label: 'Số hóa đơn',
          field: 'Code',
          sortable: false,
        },
        {
          label: 'Ngày hóa đơn',
          field: 'ProgramName',
          sortable: false,
        },
        {
          label: 'Thông tin hóa đơn',
          field: 'VoucherCode',
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
          Code: 'ONL.001',
          ProgramName: '01/10/2020',
          VoucherCode: '',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'ONL.001',
          ProgramName: '01/10/2020',
          VoucherCode: 'HO6FEFV70A',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'ONL.001',
          ProgramName: '01/10/2020',
          VoucherCode: 'HO6FEFV70A',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'ONL.001',
          ProgramName: '01/10/2020',
          VoucherCode: 'HO6FEFV70A',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'ONL.001',
          ProgramName: '01/10/2020',
          VoucherCode: 'HO6FEFV70A',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'ONL.001',
          ProgramName: '01/10/2020',
          VoucherCode: 'HO6FEFV70A',
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
