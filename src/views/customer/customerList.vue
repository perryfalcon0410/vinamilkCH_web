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
          <b-col>
            <b-form-group
              label="Khách hàng"
              label-for="form-input-customer"
            >
              <b-form-input
                id="form-input-customer"
                placeholder=" Nhập họ tên/ mã"
                trim
              />
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group
              class="ml-1"
              label="Thời gian tạo"
              label-for="form-input-date"
            >
              <b-form-datepicker
                id="form-input-date"
                placeholder="chọn từ ngày - đến ngày"
              />
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group
              class="ml-1"
              label="Nhóm khách hàng"
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
              label="Trạng thái"
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
              label="Giới tính"
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
              label="Khu vực"
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
            Danh sách khách hàng
          </label>
          <b-button-group class="">
            <b-button
              class="rounded"
              size="md"
              variant="info"
            >
              <b-icon-plus />
              Thêm mới
            </b-button>
            <b-button
              class="ml-1 rounded"
              size="md"
              variant="info"
            >
              <b-icon-file-earmark-x-fill />
              Xuất Excel
            </b-button>
            <b-button
              class="ml-1 rounded"
              size="md"
              variant="danger"
            >
              <b-icon-trash-fill />
              Xóa
            </b-button>
          </b-button-group>
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
            :select-options="{
              enabled: true,
              selectOnCheckboxOnly: true,
              selectionInfoClass: 'custom-class',
              selectionText: 'rows selected',
              clearSelectionText: 'clear',
              disableSelectInfo: true,
              selectAllByGroup: true,
            }"
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
              <span v-if="props.column.field === 'customerFeature'">
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
  name: 'Cusomter',
  components: {
  },
  data() {
    return {
      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerID',
          sortable: false,
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          sortable: false,
        },
        {
          label: 'Điện thoại',
          field: 'customerPhone',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Ngày sinh',
          field: 'customerBirthDay',
          sortable: false,
        },
        {
          label: 'Giới tính',
          field: 'customerGender',
          sortable: false,
        },
        {
          label: 'Trạng thái',
          field: 'customerState',
          type: 'boolean',
          sortable: false,
          formatFn: this.formatFn,
          html: true,
        },
        {
          label: 'Nhóm',
          field: 'customerGroup',
          sortable: false,
        },
        {
          label: 'Ngày tạo',
          field: 'customerDate',
          sortable: false,
        },
        {
          label: 'Chức năng',
          field: 'customerFeature',
          sortable: false,
        },
      ],
      rows: [
        {
          customerID: 'CUS.CH40235.001',
          customerName: 'Phan Bảo Châu',
          customerPhone: '0345392726',
          customerBirthDay: '02/08/1985',
          customerGender: 'Nam',
          customerState: 'Hoạt động',
          customerGroup: 'Khách hàng thân thiết',
          customerDate: '01/10/2020',
          customerFeature: 'Chỉnh sửa',
        },
        {
          customerID: 'CUS.CH40235.001',
          customerName: 'Phan Bảo Châu',
          customerPhone: '0345392726',
          customerBirthDay: '02/08/1985',
          customerGender: 'Nam',
          customerState: 'Hoạt động',
          customerGroup: 'Khách hàng thân thiết',
          customerDate: '01/10/2020',
        },
        {
          customerID: 'CUS.CH40235.001',
          customerName: 'Phan Bảo Châu',
          customerPhone: '0345392726',
          customerBirthDay: '02/08/1985',
          customerGender: 'Nam',
          customerState: 'Hoạt động',
          customerGroup: 'Khách hàng thân thiết',
          customerDate: '01/10/2020',
        },
        {
          customerID: 'CUS.CH40235.001',
          customerName: 'Phan Bảo Châu',
          customerPhone: '0345392726',
          customerBirthDay: '02/08/1985',
          customerGender: 'Nam',
          customerState: 'Hoạt động',
          customerGroup: 'Khách hàng thân thiết',
          customerDate: '01/10/2020',
        },
        {
          customerID: 'CUS.CH40235.001',
          customerName: 'Phan Bảo Châu',
          customerPhone: '0345392726',
          customerBirthDay: '02/08/1985',
          customerGender: 'Nam',
          customerState: 'Hoạt động',
          customerGroup: 'Khách hàng thân thiết',
          customerDate: '01/10/2020',
        },
        {
          customerID: 'CUS.CH40235.001',
          customerName: 'Phan Bảo Châu',
          customerPhone: '0345392726',
          customerBirthDay: '02/08/1985',
          customerGender: 'Nam',
          customerState: 'Hoạt động',
          customerGroup: 'Khách hàng thân thiết',
          customerDate: '01/10/2020',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
