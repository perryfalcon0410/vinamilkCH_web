<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <b-card
      no-body
      class="mb-1"
    >
      <!-- Start Button Option Search -->
      <b-card-header
        header-tag="header"
        class="p-1 d-flex"
        role="tab"
      >
        <b-button
          v-b-toggle.accordion-2
          block
          variant="light"
        >
          <b-row>
            <label
              class="text-primary mr-auto"
            >
              Tìm kiếm
            </label>
            <b-icon-chevron-down />
          </b-row>
        </b-button>
      </b-card-header>
      <!-- End Button Option Search -->

      <b-collapse
        id="accordion-2"
        accordion="my-accordion"
        visible
      >
        <b-card-body>

          <!-- START - Search -->
          <b-form-row
            class="v-search-form border-top"
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
                label="Trạng thái"
                label-for="form-input-customer"
              >
                <b-form-select
                  v-model="selected"
                  :options="options"
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
                  id="form-button-search"
                  variant="primary"
                  @click="search()"
                >
                  <b-icon-search />
                  Tìm kiếm
                </b-button>
              </b-form-group>
            </b-col>
          </b-form-row>
          <!-- END - Search -->

        </b-card-body>
      </b-collapse>
    </b-card>

    <!-- Start Add Bill -->
    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <label class="text-primary">
          Danh sách đơn trả hàng
        </label>
        <b-button-group>
          <b-button
            class="rounded"
            variant="primary"
          >
            <b-icon-printer-fill />
            In
          </b-button>
        </b-button-group>
      </b-row>
      <!-- End Add Bill -->

      <!-- Start table -->
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
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true,
            selectAllByGroup: true,
            multipleColumns: true,
          }"
        >

          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.label === 'Chức năng'">
              <b-icon-bricks class="ml-1" />
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>

          <template
            slot="table-row"
            slot-scope="props"
          >
            <span v-if="props.column.field == 'Note'">
              <span style="font-weight: bold; color: blue;">
                <div v-if="props.row.Note == '1'">
                  <b-button
                    variant="light"
                    class="rounded-circle px-1"
                  >
                    <b-icon-search />
                  </b-button>
                </div>
              </span>
            </span>

            <span v-else-if="props.column.field == 'NoteHĐĐ'">
              <span style="font-weight: bold; color: blue;">
                <div v-if="props.row.NoteHĐĐ == '1'">
                  <b-button
                    variant="light"
                    class="rounded-circle px-1"
                  >
                    <b-icon-search />
                  </b-button>
                </div>
              </span>
            </span>

            <span v-else-if="props.column.field == 'Press'">
              <span style="font-weight: bold; color: blue;">
                <div v-if="props.row.Press == '1'">
                  <b-button
                    variant="light"
                    class="rounded-circle px-1"
                  >
                    <b-icon-hand-index-thumb />
                  </b-button>
                </div>
              </span>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>

        </vue-good-table>
      </b-col>
    <!-- End table -->
    </b-form>
    <!-- END - DayTime list -->
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
      selected: null,
      options: [
        { value: 1, text: 'Tất cả' },
        { value: 2, text: 'Đã in' },
        { value: 3, text: 'Chưa in' },
      ],
      columns: [
        {
          label: 'Số hóa đơn',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Mã khách hàng',
          field: 'CustomerCode',
          sortable: false,
        },
        {
          label: 'Họ tên',
          field: 'Name',
          sortable: false,
        },
        {
          label: 'Ngày bán',
          field: 'DayTime',
          sortable: false,
        },
        {
          label: 'Tổng giá trị',
          field: 'TotalValue',
          sortable: false,
        },
        {
          label: 'Tiển giảm giá',
          field: 'DiscountMoney',
          sortable: false,
        },
        {
          label: 'Tiền tích lũy',
          field: 'MoneyAccumulated',
          sortable: false,
        },
        {
          label: 'Tiền phải trả',
          field: 'Payments',
          sortable: false,
        },
        {
          label: 'Ghi chú',
          field: 'Note',
          sortable: false,
        },
        {
          label: 'In HĐ đỏ',
          field: 'In',
          sortable: false,
        },
        {
          label: 'Công ty',
          field: 'Company',
          sortable: false,
        },
        {
          label: 'Mã số thuế',
          field: 'TaxCode',
          sortable: false,
        },
        {
          label: 'Địa chỉ',
          field: 'Address',
          sortable: false,
        },
        {
          label: 'Ghi chú HĐĐ',
          field: 'NoteHĐĐ',
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
          NumberBill: '',
          CustomerCode: '',
          Name: '',
          DayTime: '',
          TotalValue: '794,484',
          DiscountMoney: '',
          MoneyAccumulated: '',
          Payments: '794,484',
          Note: '',
          In: '',
          Company: '',
          TaxCode: '',
          Address: '',
          NoteHĐĐ: '',
          Press: '',
        },
        {
          NumberBill: 'HD001',
          CustomerCode: 'CUS.CH40235.001',
          Name: 'Phan Bảo Châu',
          DayTime: '01/10/2020',
          TotalValue: '16,800',
          DiscountMoney: '01/10/2020',
          MoneyAccumulated: '794,484',
          Payments: '16,800',
          Note: '1',
          In: '',
          Company: '',
          TaxCode: '',
          Address: '',
          NoteHĐĐ: '',
          Press: '1',
        },
        {
          NumberBill: 'HD001',
          CustomerCode: 'CUS.CH40235.001',
          Name: 'Phan Bảo Châu',
          DayTime: '01/10/2020',
          TotalValue: '200,812',
          DiscountMoney: '01/10/2020',
          MoneyAccumulated: '794,484',
          Payments: '200,812',
          Note: '',
          In: 'Đã in',
          Company: 'Công ty TNHH Tekc',
          TaxCode: '1000023687',
          Address: 'Sô 10, đường Tân Trào, Phường Tân Phú, Quận 7',
          NoteHĐĐ: '1',
          Press: '',
        },
      ],
    }
  },
  computed: {
  },
  methods: {
    tdClassFunc(row) {
      if (row.field > 5) {
        return 'red-class'
      }
      return 'green-class'
    },
  },
}
</script>
