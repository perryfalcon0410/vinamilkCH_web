<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Section earch -->
    <b-form class="bg-white shadow rounded">
      <!-- START - Label -->
      <label
        for="v-search-form"
        class="m-1 text-primary"
      >
        Tìm kiếm
      </label>
      <!-- END - Label -->

      <!-- START - Section form input -->
      <b-row
        class="v-search-form border-top mx-0 py-1"
        align-v="center"
      >
        <!-- START - Inventory code -->
        <b-col
          lg="2"
          md="4"
        >
          <b-form-group
            label="Mã kiểm kê"
            label-for="form-input-inventoryCode"
            :state="validatorCode"
            invalid-feedback="Chỉ bao gồm các ký tự [0-9][a-Z] dấu chấm(.), dấu gạch dưới (_)"
          >
            <b-form-input
              id="form-input-inventoryCode"
              v-model="InventoryCode"
              maxlength="20"
              :state="validatorCode"
              required
              trim
            />
          </b-form-group>
        </b-col>
        <!-- END - Inventory code -->

        <!-- START - Date to -->
        <b-col
          lg="2"
          md="4"
        >
          <b-form-group
            label="Từ ngày"
            label-for="form-input-date-from"
          >
            <b-form-datepicker
              id="form-input-date-from"
              v-model="fromDate"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>
        <!-- END - Date to -->

        <!-- START - Date from -->
        <b-col
          lg="2"
          md="4"
        >
          <b-form-group
            label="Đến ngày"
            label-for="form-input-date-to"
          >
            <b-form-datepicker
              id="form-input-date-to"
              v-model="toDate"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>
        <!-- END - Date from -->

        <!-- START - Warehouse -->
        <b-col
          lg="2"
          md="4"
        >
          <b-form-group
            label="Kho"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
            />
          </b-form-group>
        </b-col>
        <!-- END - Warehouse -->

        <!-- START - Button take inventory -->
        <b-button
          id="form-button-search"
          variant="primary"
          class="mx-1"
        >
          Lấy tồn kho
        </b-button>
        <!-- END - Button take inventory -->

        <!-- START - Button import -->
        <b-button
          id="form-button-search"
          variant="primary"
          class="mx-1"
          @click="isImportModalShow = !isImportModalShow"
        >
          <b-icon-arrow-repeat
            scale="1.5"
            class="mr-1"
          />
          Import
        </b-button>
        <!-- END - Button import -->

      </b-row>
      <!-- END - Section form input -->

    </b-form>
    <!-- END - Section search -->

    <!-- START - Section product Import list -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form class="border-bottom p-1">
        <label
          for="listProduct"
          class="text-primary"
        >
          Danh sách sản phẩm kiểm kê
        </label>
      </b-form>
      <!-- END - Title -->

      <!-- START - Body -->
      <b-col
        id="listProduct"
        class="py-1"
      >
        <!-- START - Table -->
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
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'InstockAmount'"
              class="mx-0"
              align-h="end"
            >
              380,986
            </b-row>

            <b-row
              v-else-if="props.column.field === 'TotalPrice'"
              class="mx-0"
              align-h="end"
            >
              3,851,900,000
            </b-row>

            <b-row
              v-else-if="props.column.field === 'InventoryPacket'"
              class="mx-0"
              align-h="end"
            >
              0
            </b-row>

            <b-row
              v-else-if="props.column.field === 'InventoryOdd'"
              class="mx-0"
              align-h="end"
            >
              0
            </b-row>

            <b-row
              v-else-if="props.column.field === 'InventoryTotal'"
              class="mx-0"
              align-h="end"
            >
              0
            </b-row>

            <b-row
              v-else-if="props.column.field === 'Unequal'"
              class="mx-0"
              align-h="end"
            >
              -5.000
            </b-row>
          </template>
          <!-- START - Column filter -->

          <!-- START - Row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'InventoryPacket'">
              <b-input />
            </div>

            <div v-else-if="props.column.field === 'InventoryOdd'">
              <b-input />
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->
        </vue-good-table>
        <!-- END - Table -->

        <!-- START - Button group -->
        <b-button-group class="float-right my-1">
          <b-button variant="primary">
            <b-icon-download />
            Lưu
          </b-button>

          <b-button
            variant="primary"
            class="mx-1"
          >
            <b-icon-file-earmark-excel-fill />
            Xuất Excel
          </b-button>

          <b-button @click="onClickCloseButton()">
            <b-icon-x />
            Đóng
          </b-button>
        </b-button-group>
        <!-- END - Button group -->

      </b-col>
      <!-- END - Body -->

    </b-form>
    <!-- END - Section product Import list -->

    <!-- START - Modal import -->
    <import-modal :visible="isImportModalShow" />
    <!-- END - Modal import -->
  </b-container>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

import ImportModal from '../components/ImportModal.vue'

export default {
  components: {
    VueGoodTable,
    ImportModal,
  },

  data() {
    return {
      fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDate: new Date(),
      InventoryCode: '',
      isImportModalShow: false,
      columns: [
        {
          label: 'Ngành hàng',
          field: 'Category',
          sortable: false,
        },
        {
          label: 'Mã SP',
          field: 'ProductCode',
          sortable: false,
        },
        {
          label: 'Tên SP',
          field: 'ProductName',
          sortable: false,
          filterOptions: {
            enabled: true,
            placeholder: 'Nhập mã hoặc tên sản phẩm',
          },
          width: '280px',
        },
        {
          label: 'Số lượng tồn kho',
          field: 'InstockAmount',
          type: 'number',
          width: '120px',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá',
          field: 'Price',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'TotalPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'SL packet kiểm kê',
          field: 'InventoryPacket',
          type: 'number',
          width: '120px',
          sortable: false,
        },
        {
          label: 'SL lẻ kiểm kê',
          field: 'InventoryOdd',
          type: 'number',
          width: '120px',
          sortable: false,
        },
        {
          label: 'Tổng SL kiểm kê',
          field: 'InventoryTotal',
          type: 'number',
          width: '120px',
          sortable: false,
        },
        {
          label: 'Chênh lệch',
          field: 'Unequal',
          type: 'number',
          sortable: false,
        },
        {
          label: 'ĐVT packet',
          field: 'PacketUnit',
          sortable: false,
        },
        {
          label: 'Quy đổi',
          field: 'Exchange',
          type: 'number',
          sortable: false,
        },
        {
          label: 'ĐVT lẻ',
          field: 'OddUnit',
          type: 'number',
          sortable: false,
        },
      ],
      rows: [
        {
          Category: 'A',
          ProductCode: '01CX01',
          ProductName: 'SĐCĐ Ông Thọ chữ xanh 380g',
          InstockAmount: '1,000',
          Price: '23,210',
          TotalPrice: '23,210,000',
          InventoryPacket: '',
          InventoryOdd: '',
          InventoryTotal: '0',
          Unequal: '-1,000',
          PacketUnit: 'Thùng',
          Exchange: '24',
          OddUnit: 'Hộp',
        },
        {
          Category: 'A',
          ProductCode: '01CX01',
          ProductName: 'SĐCĐ Ông Thọ chữ xanh 380g',
          InstockAmount: '1,000',
          Price: '23,210',
          TotalPrice: '23,210,000',
          InventoryPacket: '',
          InventoryOdd: '',
          InventoryTotal: '0',
          Unequal: '-1,000',
          PacketUnit: 'Thùng',
          Exchange: '24',
          OddUnit: 'Hộp',
        },
        {
          Category: 'A',
          ProductCode: '01CX01',
          ProductName: 'SĐCĐ Ông Thọ chữ xanh 380g',
          InstockAmount: '1,000',
          Price: '23,210',
          TotalPrice: '23,210,000',
          InventoryPacket: '',
          InventoryOdd: '',
          InventoryTotal: '0',
          Unequal: '-1,000',
          PacketUnit: 'Thùng',
          Exchange: '24',
          OddUnit: 'Hộp',
        },
        {
          Category: 'A',
          ProductCode: '01CX01',
          ProductName: 'SĐCĐ Ông Thọ chữ xanh 380g',
          InstockAmount: '1,000',
          Price: '23,210',
          TotalPrice: '23,210,000',
          InventoryPacket: '',
          InventoryOdd: '',
          InventoryTotal: '0',
          Unequal: '-1,000',
          PacketUnit: 'Thùng',
          Exchange: '24',
          OddUnit: 'Hộp',
        },
      ],
    }
  },

  computed: {
    validatorCode() {
      const validID = /^([\w\\.]{0,40})$/
      const result = validID.test(this.InventoryCode)
      if (this.InventoryCode.length >= 1) {
        return result
      }
      return null
    },
  },

  methods: {
    onClickCloseButton() {
      this.$router.back()
    },
  },
}
</script>
