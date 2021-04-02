<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <!-- START - Search -->
    <b-card
      no-body
      class="mb-1"
    >
      <!-- Start Button Option Search -->
      <label
        for="v-search-form"
        class="text-primary m-1"
      >
        Tìm kiếm
      </label>
      <!-- End Button Option Search -->

      <!-- START - Search -->
      <b-card-body>
        <b-form-row
          class="border-top"
        >
          <b-col
            xl
            sm="4"
            md="3"
            class="mt-1"
          >
            <b-form-group
              label="Khách hàng"
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
            class="mt-1"
          >
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
          <b-col
            xl
            sm="4"
            md="3"
            class="mt-1"
          >
            <b-form-group
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
            xl
            sm="4"
            md="3"
            class="mt-1"
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
            class="mt-1"
          >
            <b-form-group
              label="Tìm kiếm"
              label-for="form-button-search"
            >
              <b-button
                variant="primary"
              >
                <b-icon-search />
                Tìm kiếm
              </b-button>
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-card-body>
      <!-- END - Search -->

    </b-card>
    <!-- END - Search -->

    <!-- START - Customer list -->
    <b-form class=" bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <label class="text-primary w-25">
          Danh sách hóa đơn đỏ
        </label>

        <!-- Start Button Head -->
        <b-button-group>
          <b-form-radio-group
            v-model="selected"
            :options="options"
            class="mt-1 "
            value-field="item"
            text-field="name"
          />
          <b-button
            class="rounded"
            variant="danger"
          >
            <b-icon-printer-fill />
            IN HĐ
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="primary"
          >
            <b-icon-file-earmark-x-fill />
            Xuất Excel
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="primary"
          >
            <b-icon-arrow-clockwise />
            Cập nhật HĐ
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="primary"
            @click="addSaleRedBillsCreate"
          >
            <b-icon-plus />
            Thêm mới
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="primary"
          >
            <b-icon-trash />
            Xóa
          </b-button>
        </b-button-group>
        <!-- End Button Head -->
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="rows"
          class="pb-1"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true
          }"
          line-numbers
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
            selectionInfoClass: 'custom-class',
            clearSelectionText: 'clear',
            disableSelectInfo: true,
            selectAllByGroup: true,
            multipleColumns: true,
          }"
        />
      </b-col>
      <!-- END - Table -->
    </b-form>
    <!-- END - Customer list -->
    <bill-of-sale-list :visible="valueShowModalBillOfSaleList" />
  </b-container>
</template>

<script>
import Vue from 'vue'
import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin)

export default {
  name: 'CusomterList',
  components: {
  },
  data() {
    return {
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      searchTerm: '',
      valueShowModalBillOfSaleList: false,
      selected: 'A',
      options: [
        { item: 'A', name: 'Mẫu DVKH' },
        { item: 'B', name: 'Mẫu HĐĐT' },
      ],
      columns: [
        {
          label: 'Số hóa đơn đỏ',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tên công ty',
          field: 'Company',
          sortable: false,
        },
        {
          label: 'Địa chỉ',
          field: 'Address',
          sortable: false,
        },
        {
          label: 'Mã số thuế',
          field: 'VATCode',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Number',
          sortable: false,
        },
        {
          label: 'Tiền hàng',
          field: 'GoodsMoney',
          sortable: false,
        },
        {
          label: 'Tiền thuế GTGT',
          field: 'GTGT',
          sortable: false,
        },
        {
          label: 'Tổng cộng tiền',
          field: 'TotalMoney',
          sortable: false,
        },
        {
          label: 'Ngày in',
          field: 'Date',
          sortable: false,
        },
        {
          label: 'Ghi chú HĐĐ đỏ',
          field: 'NoteHĐĐ',
          sortable: false,
        },
      ],
      rows: [
        {
          NumberBill: '',
          Company: '',
          Address: '',
          VATCode: '',
          Number: '192',
          GoodsMoney: '102,900',
          GTGT: '794,484',
          TotalMoney: '794,484',
          Date: '',
          NoteHĐĐ: '',
        },
        {
          NumberBill: 'HD001',
          Company: 'Công ty TNHH Teks',
          Address: 'Sô 10, đường Tân Trào, Phường Tân Phú, Quận 7',
          VATCode: '1000023687',
          Number: '16',
          GoodsMoney: '8,400',
          GTGT: '16,800',
          TotalMoney: '16,800',
          Date: '',
          NoteHĐĐ: '',
        },
        {
          NumberBill: 'HD002',
          Company: 'Công ty TNHH Teks',
          Address: 'Sô 10, đường Tân Trào, Phường Tân Phú, Quận 7',
          VATCode: '1000023687',
          Number: '16',
          GoodsMoney: '8,400',
          GTGT: '16,800',
          TotalMoney: '16,800',
          Date: '',
          NoteHĐĐ: '',
        },
        {
          NumberBill: 'HD003',
          Company: 'Công ty TNHH Teks',
          Address: 'Sô 10, đường Tân Trào, Phường Tân Phú, Quận 7',
          VATCode: '1000023687',
          Number: '16',
          GoodsMoney: '8,400',
          GTGT: '16,800',
          TotalMoney: '16,800',
          Date: '',
          NoteHĐĐ: '',
        },
      ],
    }
  },
  computed: {
  },
  methods: {
    addSaleRedBillsCreate() {
      this.$router.push({ name: 'sales-red-bills-create' })
    },
  },
}
</script>
